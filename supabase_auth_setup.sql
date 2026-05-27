-- ═══════════════════════════════════════════════════════════════════════════════
-- AECMI — SQL de configuración de Auth y Roles
-- Ejecutar en Supabase SQL Editor (https://app.supabase.com → SQL Editor)
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── 1. VERIFICAR USUARIOS EN public.users ───────────────────────────────────
-- Muestra qué usuarios existen y cuál es su rol actual
SELECT id, email, first_name, last_name, role, is_active, created_at
FROM public.users
ORDER BY created_at DESC;


-- ─── 2. VER TODOS LOS USUARIOS DE AUTH ───────────────────────────────────────
-- Muestra los usuarios registrados en Supabase Auth
SELECT id, email, created_at, last_sign_in_at
FROM auth.users
ORDER BY created_at DESC;


-- ─── 3. SINCRONIZAR auth.users → public.users (si faltan registros) ──────────
-- Inserta en public.users los usuarios que existen en auth.users pero no en public.users
INSERT INTO public.users (id, email, first_name, last_name, role, is_active)
SELECT
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'first_name', split_part(au.email, '@', 1)) AS first_name,
  COALESCE(au.raw_user_meta_data->>'last_name', '') AS last_name,
  'client' AS role,
  TRUE AS is_active
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;


-- ─── 4. ASIGNAR ROL ADMIN ────────────────────────────────────────────────────
-- Cambia el rol de admin@aecmi.com a 'admin'
-- (ajusta el email si es diferente en tu BD)
UPDATE public.users
SET role = 'admin'
WHERE email = 'admin@aecmi.com';

-- Si el email del admin es diferente, actualiza aquí:
-- UPDATE public.users SET role = 'admin' WHERE email = 'adin@aecmi.com';


-- ─── 5. VERIFICAR ROLES FINALES ──────────────────────────────────────────────
SELECT email, role, first_name, last_name
FROM public.users
ORDER BY role, email;


-- ─── 6. TRIGGER: sincronizar automáticamente al registrarse ─────────────────
-- Este trigger crea el registro en public.users cada vez que alguien se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'client',
    TRUE
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Crear trigger si no existe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ─── 7. RLS: Políticas de Row Level Security ─────────────────────────────────
-- Permite que cada usuario solo lea sus propios datos

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Usuarios pueden ver y editar su propio perfil
DROP POLICY IF EXISTS "Users: own profile" ON public.users;
CREATE POLICY "Users: own profile"
  ON public.users FOR ALL
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins pueden ver todos los usuarios
DROP POLICY IF EXISTS "Admins: view all users" ON public.users;
CREATE POLICY "Admins: view all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Solicitudes: cliente solo ve las suyas
ALTER TABLE public.certifications_applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Applications: own" ON public.certifications_applications;
CREATE POLICY "Applications: own"
  ON public.certifications_applications FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins: all applications" ON public.certifications_applications;
CREATE POLICY "Admins: all applications"
  ON public.certifications_applications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Documentos: cliente solo ve los suyos (via application)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Documents: own application" ON public.documents;
CREATE POLICY "Documents: own application"
  ON public.documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.certifications_applications ca
      WHERE ca.id = application_id AND ca.user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Admins: all documents" ON public.documents;
CREATE POLICY "Admins: all documents"
  ON public.documents FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
