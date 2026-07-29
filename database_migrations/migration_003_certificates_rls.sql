-- ═══════════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN 003: Versionado + RLS de certificates / certificate_renewals
-- ═══════════════════════════════════════════════════════════════════════════════
-- Fecha: 2026-07-29
-- Estas tablas NO estaban versionadas en el repo. Este DDL se reconstruye a partir
-- de cómo las usa el código (columnas de select/insert/update). Cierra el hallazgo
-- #4 (RLS en certificates) y #14 (PII pública).
--
-- ⚠️ PRODUCCIÓN: la tabla ya existe allí. NO apliques el CREATE TABLE a ciegas;
--    compara este esquema con el real y aplica SOLO la sección de RLS (parte 2)
--    tras confirmar que las columnas coinciden. En STAGING (vacío) se aplica entero.
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- PARTE 1 — Tablas (reconstruidas del uso en código). Idempotente.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.certificates (
  id                 UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  certification_type TEXT          NOT NULL CHECK (certification_type IN ('IDM','BDM','BCM')),
  certification_code TEXT          NOT NULL UNIQUE,
  full_name          TEXT          NOT NULL,
  email              TEXT          NOT NULL,
  organization       TEXT,
  exam_score         NUMERIC(5,2),
  issue_date         DATE          NOT NULL DEFAULT CURRENT_DATE,
  expiry_date        DATE,
  status             TEXT          NOT NULL DEFAULT 'active'
                       CHECK (status IN ('active','revoked','expired')),
  user_id            UUID          REFERENCES public.users(id) ON DELETE SET NULL,
  issued_by_admin    UUID          REFERENCES public.users(id) ON DELETE SET NULL,
  qr_code            TEXT,
  qr_data            TEXT,
  renewal_price      NUMERIC(10,2) DEFAULT 299.99,
  can_renew          BOOLEAN       NOT NULL DEFAULT TRUE,
  renewal_count      INTEGER       NOT NULL DEFAULT 0,
  last_renewed_at    TIMESTAMPTZ,
  created_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certificates_user_id ON public.certificates (user_id);
CREATE INDEX IF NOT EXISTS idx_certificates_code    ON public.certificates (certification_code);
CREATE INDEX IF NOT EXISTS idx_certificates_email   ON public.certificates (email);

CREATE TABLE IF NOT EXISTS public.certificate_renewals (
  id                UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  certificate_id    UUID          NOT NULL REFERENCES public.certificates(id) ON DELETE CASCADE,
  user_id           UUID          REFERENCES public.users(id) ON DELETE SET NULL,
  old_expiry_date   DATE,
  new_expiry_date   DATE,
  amount            NUMERIC(10,2),
  payment_method    TEXT,
  stripe_payment_id TEXT,
  status            TEXT          NOT NULL DEFAULT 'completed',
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_renewals_cert ON public.certificate_renewals (certificate_id);
CREATE INDEX IF NOT EXISTS idx_renewals_user ON public.certificate_renewals (user_id);

-- updated_at automático (la función set_updated_at existe en el schema base)
DROP TRIGGER IF EXISTS trg_certificates_updated_at ON public.certificates;
CREATE TRIGGER trg_certificates_updated_at
  BEFORE UPDATE ON public.certificates
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────────
-- PARTE 2 — RLS
-- ─────────────────────────────────────────────────────────────────────────────
-- Modelo: el dueño (user_id = auth.uid()) ve sus certificados; el admin ve todo.
-- La verificación pública (por código/id) y la emisión NO pasan por aquí: van por
-- API server-side con service_role (bypass RLS) devolviendo solo campos no sensibles.
ALTER TABLE public.certificates         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_renewals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "cert: dueño o admin ve"  ON public.certificates;
CREATE POLICY "cert: dueño o admin ve"
  ON public.certificates FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "cert: admin gestiona"     ON public.certificates;
CREATE POLICY "cert: admin gestiona"
  ON public.certificates FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "renov: dueño o admin ve"  ON public.certificate_renewals;
CREATE POLICY "renov: dueño o admin ve"
  ON public.certificate_renewals FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "renov: admin gestiona"    ON public.certificate_renewals;
CREATE POLICY "renov: admin gestiona"
  ON public.certificate_renewals FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ═══════════════════════════════════════════════════════════════════════════════
-- FIN MIGRACIÓN 003
-- ═══════════════════════════════════════════════════════════════════════════════
