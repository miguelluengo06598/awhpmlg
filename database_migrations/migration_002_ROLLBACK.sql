-- ═══════════════════════════════════════════════════════════════════════════════
-- ROLLBACK DE EMERGENCIA de migration_002
-- ═══════════════════════════════════════════════════════════════════════════════
-- ⚠️ ESTO REABRE LAS VULNERABILIDADES DE ESCALADA A ADMIN.
-- Úsalo SOLO si migration_002 rompiera un flujo legítimo en producción y necesites
-- restaurar el servicio de inmediato. Restaura el estado exacto previo a la migración.
-- Después, corrige la causa y vuelve a aplicar migration_002.
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1. Restaurar grants de UPDATE completos (revierte los column-grants)
GRANT UPDATE ON public.users TO authenticated;
GRANT UPDATE ON public.users TO anon;

-- 2. Eliminar el trigger guard y su función
DROP TRIGGER IF EXISTS trg_users_guard_self_update ON public.users;
DROP FUNCTION IF EXISTS public.enforce_user_self_update();

-- 3. Restaurar la política de INSERT abierta
DROP POLICY IF EXISTS "users: trigger inserta" ON public.users;
CREATE POLICY "users: trigger inserta"
  ON public.users FOR INSERT
  WITH CHECK (TRUE);

-- 4. Restaurar el trigger handle_new_user ORIGINAL (vulnerable)
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
    COALESCE(NEW.raw_user_meta_data->>'role', 'client'),
    TRUE
  )
  ON CONFLICT (email) DO UPDATE
    SET id         = EXCLUDED.id,
        first_name = COALESCE(EXCLUDED.first_name, public.users.first_name),
        last_name  = COALESCE(EXCLUDED.last_name,  public.users.last_name),
        updated_at = NOW();
  RETURN NEW;
END;
$$;

-- ═══════════════════════════════════════════════════════════════════════════════
-- FIN ROLLBACK
-- ═══════════════════════════════════════════════════════════════════════════════
