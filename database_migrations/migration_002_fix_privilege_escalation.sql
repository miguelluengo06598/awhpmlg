-- ═══════════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN 002: Corrección de escalada de privilegios a admin (FASE 1 — CRÍTICO)
-- ═══════════════════════════════════════════════════════════════════════════════
-- Fecha: 2026-07-29
-- Ejecutar en: Supabase SQL Editor
-- Idempotente: sí (puede re-ejecutarse sin efectos secundarios).
--
-- Cierra TRES vías independientes por las que cualquier visitante podía
-- convertirse en administrador:
--   #1  El trigger handle_new_user copiaba raw_user_meta_data->>'role'
--       (controlado por el cliente en signUp) directamente a public.users.
--   #2  La política RLS de UPDATE permitía a un usuario cambiar sus propias
--       columnas role / is_active (no había restricción a nivel de columna).
--   #3  La política de INSERT "users: trigger inserta" con WITH CHECK (TRUE)
--       permitía a anon/authenticated pre-insertar filas arbitrarias, y el
--       ON CONFLICT (email) podía usarse para secuestrar una fila admin.
-- ═══════════════════════════════════════════════════════════════════════════════

-- ───────────────────────────────────────────────────────────────────────────────
-- #1 + #3b — Trigger endurecido: rol SIEMPRE 'client' desde signup; el conflicto
--            por email nunca secuestra una fila con rol elevado.
-- ───────────────────────────────────────────────────────────────────────────────
-- El rol de un usuario NUNCA debe provenir de metadatos controlados por el cliente.
-- La promoción a 'admin'/'staff' se hace fuera de banda (service_role / dashboard).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'client',   -- ⚠️ SIEMPRE client. Nunca leer role de raw_user_meta_data.
    TRUE
  )
  -- Si el email ya existía (placeholder legítimo aún en estado 'client'),
  -- vincula el id real de auth. El WHERE impide secuestrar filas ya elevadas
  -- (admin/staff): un atacante no puede registrarse con el email de un admin
  -- placeholder para heredar su rol.
  ON CONFLICT (email) DO UPDATE
    SET id         = EXCLUDED.id,
        first_name = COALESCE(EXCLUDED.first_name, public.users.first_name),
        last_name  = COALESCE(EXCLUDED.last_name,  public.users.last_name),
        updated_at = NOW()
    WHERE public.users.role = 'client';
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.handle_new_user() IS
  'Trigger AFTER INSERT en auth.users. Crea el perfil SIEMPRE con role=client. '
  'La promoción a admin/staff se realiza exclusivamente fuera de banda (service_role/dashboard).';

-- ───────────────────────────────────────────────────────────────────────────────
-- #3 — Eliminar la política de INSERT abierta.
-- ───────────────────────────────────────────────────────────────────────────────
-- El trigger es SECURITY DEFINER (owner = postgres) y por tanto YA hace bypass de
-- RLS: no necesita esta política para insertar. El rol service_role también hace
-- bypass de RLS. Sin política permisiva de INSERT, anon/authenticated no pueden
-- insertar filas en public.users (RLS deniega por defecto).
DROP POLICY IF EXISTS "users: trigger inserta" ON public.users;

-- ───────────────────────────────────────────────────────────────────────────────
-- #2 — Restricción a nivel de COLUMNA en el UPDATE del usuario normal.
-- ───────────────────────────────────────────────────────────────────────────────
-- Capa 1 (privilegios de columna): el rol `authenticated` solo puede actualizar
-- columnas de perfil. role / is_active / email / id / timestamps quedan fuera de
-- su alcance a nivel de motor, con independencia de lo que permita RLS.
REVOKE UPDATE ON public.users FROM authenticated;
GRANT  UPDATE (first_name, last_name, phone, company, country, profile_picture_url, bio)
  ON public.users TO authenticated;

-- Por seguridad, anon no debe poder actualizar nada.
REVOKE UPDATE ON public.users FROM anon;

-- Capa 2 (defensa en profundidad — trigger guard): aunque alguien reconceda
-- GRANT UPDATE por error en el futuro, este trigger rechaza que un no-admin
-- modifique role / is_active. is_admin() es SECURITY DEFINER y no recursa.
CREATE OR REPLACE FUNCTION public.enforce_user_self_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Un cambio de role o is_active solo es válido si lo realiza un admin
  -- (o un proceso con bypass de RLS: service_role / SECURITY DEFINER, en cuyo
  --  caso auth.uid() es NULL y is_admin() es FALSE, por eso se exige igualdad).
  IF (NEW.role IS DISTINCT FROM OLD.role
      OR NEW.is_active IS DISTINCT FROM OLD.is_active)
     AND auth.uid() IS NOT NULL      -- hay un usuario autenticado detrás
     AND NOT public.is_admin() THEN
    RAISE EXCEPTION 'No autorizado: no puedes modificar role ni is_active.'
      USING ERRCODE = 'insufficient_privilege';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_users_guard_self_update ON public.users;
CREATE TRIGGER trg_users_guard_self_update
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.enforce_user_self_update();

COMMENT ON FUNCTION public.enforce_user_self_update() IS
  'Defensa en profundidad: impide que un usuario autenticado no-admin altere '
  'su columna role o is_active, incluso si se le reconcede GRANT UPDATE por error.';

-- ───────────────────────────────────────────────────────────────────────────────
-- AUDITORÍA (NO destructivo) — revisa quién es admin/staff tras la corrección.
-- ───────────────────────────────────────────────────────────────────────────────
-- Ejecuta este SELECT manualmente y confirma que CADA fila es un admin legítimo.
-- Si aparece alguien que escaló por las vías anteriores, degrádalo a mano:
--     UPDATE public.users SET role = 'client' WHERE id = '<uuid>';
-- (No se degrada nada automáticamente para no tocar admins legítimos.)
--
--   SELECT id, email, role, is_active, created_at
--   FROM public.users
--   WHERE role IN ('admin', 'staff')
--   ORDER BY created_at;

-- ═══════════════════════════════════════════════════════════════════════════════
-- FIN MIGRACIÓN 002
-- ═══════════════════════════════════════════════════════════════════════════════
