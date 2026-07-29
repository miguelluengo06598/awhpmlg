-- ═══════════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN 004: Eliminar la política SELECT pública de certificates (#4 / #14)
-- ═══════════════════════════════════════════════════════════════════════════════
-- Fecha: 2026-07-29
-- Contexto: en PRODUCCIÓN, public.certificates tiene una política permisiva
--   [SELECT] "Anyone can view certificate by qr_code"  USING (true)  TO {public}
-- que permite a CUALQUIER anónimo volcar toda la tabla (email, exam_score,
-- organization…). Verificado en prod: anon lee las 6 filas.
--
-- ⚠️ ORDEN OBLIGATORIO — NO ejecutar antes del deploy:
--   1. Desplegar la rama con las rutas que usan service_role para la verificación
--      pública (app/api/certificate/[qrCode]/route.ts y app/api/admin/certificates
--      GET). Sin esto, eliminar la política ROMPE la verificación pública y el
--      panel admin (usan el cliente anónimo, que depende de esta política).
--   2. Confirmar que la verificación pública funciona tras el deploy.
--   3. ENTONCES ejecutar esta migración.
--
-- Tras aplicarla, la única política SELECT restante es "Users see own certificates"
-- (dueño o admin). La verificación pública sigue funcionando porque va por API
-- server-side con service_role (bypass RLS). Anon deja de ver nada.
-- ═══════════════════════════════════════════════════════════════════════════════

DROP POLICY IF EXISTS "Anyone can view certificate by qr_code" ON public.certificates;

-- Verificación post-aplicación (debe devolver solo "Users see own certificates"):
--   SELECT policyname FROM pg_policies
--   WHERE tablename='certificates' AND cmd='SELECT';
-- ═══════════════════════════════════════════════════════════════════════════════
