-- ═══════════════════════════════════════════════════════════════════════════
-- SCHEMA AECMI — BASE DE DATOS COMPLETA
-- Plataforma de gestión de certificaciones BIM
-- ─────────────────────────────────────────────────────────────────────────
-- Ejecutar en Supabase SQL Editor (una sola vez en base de datos limpia).
-- Si necesitas re-ejecutar, lanza primero la sección DROP al final del archivo.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────
-- 0. EXTENSIONES
-- ─────────────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ═══════════════════════════════════════════════════════════════════════════
-- 1. TABLAS DE AUTENTICACIÓN Y USUARIOS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.users (
  id                  UUID          PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               TEXT          NOT NULL UNIQUE,
  first_name          TEXT          NOT NULL DEFAULT '',
  last_name           TEXT          NOT NULL DEFAULT '',
  phone               TEXT,
  company             TEXT,
  country             TEXT,
  profile_picture_url TEXT,
  bio                 TEXT,
  role                TEXT          NOT NULL DEFAULT 'client'
                        CHECK (role IN ('admin', 'staff', 'client')),
  is_active           BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  deleted_at          TIMESTAMPTZ
);

COMMENT ON TABLE  public.users IS 'Perfil extendido de usuarios; espeja auth.users vía trigger.';
COMMENT ON COLUMN public.users.role IS 'admin | staff | client';
COMMENT ON COLUMN public.users.deleted_at IS 'Soft delete — NULL = activo.';


-- ═══════════════════════════════════════════════════════════════════════════
-- 2. TABLAS DE CERTIFICACIONES (CATÁLOGO)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.certifications_catalog (
  id                     UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                   TEXT          NOT NULL UNIQUE
                           CHECK (name IN (
                             'Information_Delivery_Manager',
                             'BIM_Design_Manager',
                             'BIM_Construction_Manager'
                           )),
  display_name           TEXT          NOT NULL,
  description            TEXT,
  icon_color             TEXT          DEFAULT '#0057A8',
  fee                    NUMERIC(10,2) NOT NULL DEFAULT 0,
  currency               TEXT          NOT NULL DEFAULT 'EUR',
  duration_days          INTEGER       NOT NULL DEFAULT 365,
  exam_duration_minutes  INTEGER       NOT NULL DEFAULT 90,
  requirements           TEXT,
  is_active              BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at             TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.certifications_catalog IS 'Catálogo de tipos de certificación disponibles.';


-- ═══════════════════════════════════════════════════════════════════════════
-- 3. TABLAS DE SOLICITUDES
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.certifications_applications (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id          UUID        NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  certification_id UUID        NOT NULL REFERENCES public.certifications_catalog(id),
  status           TEXT        NOT NULL DEFAULT 'pending'
                     CHECK (status IN (
                       'pending', 'in_review', 'approved', 'rejected',
                       'exam_scheduled', 'exam_passed', 'certified'
                     )),

  -- Información de la solicitud
  certification_type          VARCHAR(100),
  professional_experience     TEXT,
  education_details           TEXT,
  years_of_experience         INT,

  -- Revisión
  notes                       TEXT,
  admin_notes                 TEXT,
  rejection_reason            TEXT,
  reviewed_by                 UUID        REFERENCES public.users(id),
  reviewed_at                 TIMESTAMPTZ,

  -- Examen
  exam_date                   TIMESTAMPTZ,
  exam_attempts               INT         NOT NULL DEFAULT 0,
  exam_passed                 BOOLEAN     NOT NULL DEFAULT FALSE,
  exam_score                  INT,

  -- Entrevista
  interview_date              DATE,
  interview_time              TIME,
  interview_result            VARCHAR(50),

  -- Pago
  payment_status              VARCHAR(50) NOT NULL DEFAULT 'pending',
  payment_amount              DECIMAL(10,2),
  payment_date                TIMESTAMPTZ,

  -- Certificado emitido
  certificate_url             TEXT,
  certification_issued_date   DATE,
  certification_expiry_date   DATE,
  certification_code          VARCHAR(100) UNIQUE,
  qr_code                     VARCHAR(50)  UNIQUE,
  qr_image                    VARCHAR(500),

  -- Visibilidad pública
  is_public_listed            BOOLEAN     NOT NULL DEFAULT FALSE,
  public_profile_url          VARCHAR(200),

  -- Timestamps
  submitted_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  public.certifications_applications IS 'Solicitudes de certificación enviadas por clientes.';
COMMENT ON COLUMN public.certifications_applications.status IS 'Ciclo de vida: pending → in_review → approved/rejected → exam_scheduled → exam_passed → certified.';


-- ═══════════════════════════════════════════════════════════════════════════
-- 4. TABLAS DE DOCUMENTOS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.documents (
  id               UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id   UUID        NOT NULL REFERENCES public.certifications_applications(id) ON DELETE CASCADE,
  uploaded_by      UUID        NOT NULL REFERENCES public.users(id),
  document_type    TEXT        NOT NULL
                     CHECK (document_type IN ('cv', 'portfolio', 'id_document', 'payment_proof', 'education', 'experience', 'other')),
  file_name        TEXT        NOT NULL,
  file_path        TEXT        NOT NULL,
  file_size        INTEGER,
  mime_type        TEXT,
  status           TEXT        NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at       TIMESTAMPTZ
);

COMMENT ON TABLE  public.documents IS 'Documentos adjuntos a solicitudes de certificación.';
COMMENT ON COLUMN public.documents.file_path IS 'Ruta dentro del bucket application-documents de Supabase Storage.';
COMMENT ON COLUMN public.documents.deleted_at IS 'Soft delete — NULL = activo.';


-- ═══════════════════════════════════════════════════════════════════════════
-- 5. TABLAS DE PAGOS
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.payments (
  id               UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id   UUID          NOT NULL REFERENCES public.certifications_applications(id) ON DELETE CASCADE,
  user_id          UUID          NOT NULL REFERENCES public.users(id),
  amount           NUMERIC(10,2) NOT NULL,
  currency         TEXT          NOT NULL DEFAULT 'EUR',
  method           TEXT          NOT NULL DEFAULT 'transfer'
                     CHECK (method IN ('card', 'transfer', 'stripe', 'other')),
  status           TEXT          NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id   TEXT,
  receipt_url      TEXT,
  paid_at          TIMESTAMPTZ,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.payments IS 'Registro de pagos asociados a solicitudes.';


-- ═══════════════════════════════════════════════════════════════════════════
-- 6. TABLAS DE COMUNICACIÓN
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  subject      TEXT,
  message      TEXT        NOT NULL,
  is_read      BOOLEAN     NOT NULL DEFAULT FALSE,
  replied_at   TIMESTAMPTZ,
  replied_by   UUID        REFERENCES public.users(id),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.contact_messages IS 'Mensajes enviados desde el formulario de contacto público.';

-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.notifications (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID        NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title        TEXT        NOT NULL,
  body         TEXT        NOT NULL,
  type         TEXT        NOT NULL DEFAULT 'info'
                 CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read      BOOLEAN     NOT NULL DEFAULT FALSE,
  link         TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.notifications IS 'Notificaciones en-app para usuarios.';


-- ═══════════════════════════════════════════════════════════════════════════
-- 7. TABLAS DE AUDITORÍA Y CONFIGURACIÓN
-- ═══════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id     UUID        REFERENCES public.users(id) ON DELETE SET NULL,
  action       TEXT        NOT NULL,
  table_name   TEXT,
  record_id    UUID,
  old_data     JSONB,
  new_data     JSONB,
  ip_address   INET,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.audit_logs IS 'Registro de auditoría de acciones críticas.';

-- ─────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.site_settings (
  key          TEXT PRIMARY KEY,
  value        JSONB        NOT NULL,
  description  TEXT,
  updated_by   UUID         REFERENCES public.users(id),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.site_settings IS 'Configuración global de la plataforma (clave-valor JSON).';


-- ═══════════════════════════════════════════════════════════════════════════
-- 8. FUNCIONES Y TRIGGERS
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────
-- 8a. is_admin() — helper SECURITY DEFINER para evitar recursión en RLS
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
      AND role = 'admin'
      AND is_active = TRUE
      AND deleted_at IS NULL
  );
$$;

COMMENT ON FUNCTION public.is_admin() IS 'SECURITY DEFINER: devuelve TRUE si el usuario autenticado es admin. Usar en políticas RLS para evitar recursión.';

-- ─────────────────────────────────────────────────────────────────────────
-- 8b. updated_at auto-refresh trigger
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER trg_certifications_catalog_updated_at
  BEFORE UPDATE ON public.certifications_catalog
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER trg_applications_updated_at
  BEFORE UPDATE ON public.certifications_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER trg_documents_updated_at
  BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE TRIGGER trg_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ─────────────────────────────────────────────────────────────────────────
-- 8c. on_auth_user_created — sincroniza auth.users → public.users
-- ─────────────────────────────────────────────────────────────────────────
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
    'client',   -- ⚠️ SIEMPRE client. Nunca leer role de raw_user_meta_data (lo controla el cliente).
    TRUE
  )
  -- Si el email ya existía (placeholder legítimo aún en estado 'client'), vincula el
  -- id real de auth. El WHERE impide secuestrar filas ya elevadas (admin/staff).
  ON CONFLICT (email) DO UPDATE
    SET id         = EXCLUDED.id,
        first_name = COALESCE(EXCLUDED.first_name, public.users.first_name),
        last_name  = COALESCE(EXCLUDED.last_name,  public.users.last_name),
        updated_at = NOW()
    WHERE public.users.role = 'client';
  RETURN NEW;
END;
$$;

-- Eliminar trigger previo si existe para evitar duplicados
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Trigger AFTER INSERT en auth.users. Crea el perfil SIEMPRE con role=client; la promoción a admin/staff se hace fuera de banda.';

-- ─────────────────────────────────────────────────────────────────────────
-- 8d. enforce_user_self_update — defensa en profundidad contra escalada
-- ─────────────────────────────────────────────────────────────────────────
-- Impide que un usuario autenticado no-admin altere su columna role o is_active,
-- incluso si se le reconcede GRANT UPDATE por error.
CREATE OR REPLACE FUNCTION public.enforce_user_self_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (NEW.role IS DISTINCT FROM OLD.role
      OR NEW.is_active IS DISTINCT FROM OLD.is_active)
     AND auth.uid() IS NOT NULL
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

COMMENT ON FUNCTION public.enforce_user_self_update() IS 'Defensa en profundidad: bloquea que un no-admin cambie role o is_active.';

-- ─────────────────────────────────────────────────────────────────────────
-- 8d. count_application_documents(app_id UUID) → INTEGER
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.count_application_documents(app_id UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::INTEGER
  FROM public.documents
  WHERE application_id = app_id
    AND deleted_at IS NULL;
$$;

COMMENT ON FUNCTION public.count_application_documents(UUID) IS 'Devuelve el número de documentos activos de una solicitud.';

-- ─────────────────────────────────────────────────────────────────────────
-- 8e. get_user_applications(uid UUID) → TABLE
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.get_user_applications(uid UUID)
RETURNS TABLE (
  id               UUID,
  cert_name        TEXT,
  cert_display     TEXT,
  status           TEXT,
  submitted_at     TIMESTAMPTZ,
  updated_at       TIMESTAMPTZ,
  document_count   INTEGER
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    a.id,
    c.name,
    c.display_name,
    a.status,
    a.submitted_at,
    a.updated_at,
    public.count_application_documents(a.id)
  FROM public.certifications_applications a
  JOIN public.certifications_catalog c ON c.id = a.certification_id
  WHERE a.user_id = uid
  ORDER BY a.submitted_at DESC;
$$;

COMMENT ON FUNCTION public.get_user_applications(UUID) IS 'Devuelve todas las solicitudes con datos del catálogo y conteo de documentos para un usuario dado.';


-- ═══════════════════════════════════════════════════════════════════════════
-- 9. ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════════════════

-- Activar RLS en todas las tablas
ALTER TABLE public.users                      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications_catalog     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings              ENABLE ROW LEVEL SECURITY;

-- ─────────────────────────────────────────────────────────────────────────
-- users
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "users: admin ve todo"         ON public.users;
DROP POLICY IF EXISTS "users: cliente ve el suyo"    ON public.users;
DROP POLICY IF EXISTS "users: cliente edita el suyo" ON public.users;
DROP POLICY IF EXISTS "users: trigger inserta"       ON public.users;

CREATE POLICY "users: admin ve todo"
  ON public.users FOR SELECT
  USING (public.is_admin());

CREATE POLICY "users: cliente ve el suyo"
  ON public.users FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "users: cliente edita el suyo"
  ON public.users FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Restricción a nivel de COLUMNA: el usuario solo puede editar columnas de perfil.
-- role / is_active / email / id / timestamps quedan fuera de su alcance a nivel de
-- motor (los cambia solo un admin vía service_role). Complementa a la política RLS.
REVOKE UPDATE ON public.users FROM authenticated;
GRANT  UPDATE (first_name, last_name, phone, company, country, profile_picture_url, bio)
  ON public.users TO authenticated;
REVOKE UPDATE ON public.users FROM anon;

-- NOTA: no existe política de INSERT para anon/authenticated. El trigger
-- handle_new_user es SECURITY DEFINER y hace bypass de RLS, por lo que no la
-- necesita. Añadir "INSERT ... WITH CHECK (TRUE)" permitiría a cualquiera
-- pre-insertar filas arbitrarias en public.users — NO hacerlo.

-- ─────────────────────────────────────────────────────────────────────────
-- certifications_catalog
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "catalog: lectura pública"   ON public.certifications_catalog;
DROP POLICY IF EXISTS "catalog: admin gestiona"    ON public.certifications_catalog;

CREATE POLICY "catalog: lectura pública"
  ON public.certifications_catalog FOR SELECT
  USING (is_active = TRUE OR public.is_admin());

CREATE POLICY "catalog: admin gestiona"
  ON public.certifications_catalog FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- certifications_applications
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "apps: admin ve todo"         ON public.certifications_applications;
DROP POLICY IF EXISTS "apps: admin actualiza"       ON public.certifications_applications;
DROP POLICY IF EXISTS "apps: cliente ve el suyo"    ON public.certifications_applications;
DROP POLICY IF EXISTS "apps: cliente inserta"       ON public.certifications_applications;

CREATE POLICY "apps: admin ve todo"
  ON public.certifications_applications FOR SELECT
  USING (public.is_admin());

CREATE POLICY "apps: admin actualiza"
  ON public.certifications_applications FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "apps: cliente ve el suyo"
  ON public.certifications_applications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "apps: cliente inserta"
  ON public.certifications_applications FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────────────────────
-- documents
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "docs: admin ve todo"         ON public.documents;
DROP POLICY IF EXISTS "docs: admin actualiza"       ON public.documents;
DROP POLICY IF EXISTS "docs: cliente ve el suyo"    ON public.documents;
DROP POLICY IF EXISTS "docs: cliente inserta"       ON public.documents;

CREATE POLICY "docs: admin ve todo"
  ON public.documents FOR SELECT
  USING (public.is_admin());

CREATE POLICY "docs: admin actualiza"
  ON public.documents FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "docs: cliente ve el suyo"
  ON public.documents FOR SELECT
  USING (uploaded_by = auth.uid());

CREATE POLICY "docs: cliente inserta"
  ON public.documents FOR INSERT
  WITH CHECK (uploaded_by = auth.uid());

-- ─────────────────────────────────────────────────────────────────────────
-- payments
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "payments: admin ve todo"      ON public.payments;
DROP POLICY IF EXISTS "payments: cliente ve el suyo" ON public.payments;

CREATE POLICY "payments: admin ve todo"
  ON public.payments FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "payments: cliente ve el suyo"
  ON public.payments FOR SELECT
  USING (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────────────────────
-- contact_messages
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "contact: admin ve todo"    ON public.contact_messages;
DROP POLICY IF EXISTS "contact: inserción pública" ON public.contact_messages;

CREATE POLICY "contact: admin ve todo"
  ON public.contact_messages FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "contact: inserción pública"
  ON public.contact_messages FOR INSERT
  WITH CHECK (TRUE);

-- ─────────────────────────────────────────────────────────────────────────
-- notifications
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "notif: admin gestiona"      ON public.notifications;
DROP POLICY IF EXISTS "notif: usuario ve el suyo"  ON public.notifications;
DROP POLICY IF EXISTS "notif: usuario marca leída" ON public.notifications;

CREATE POLICY "notif: admin gestiona"
  ON public.notifications FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "notif: usuario ve el suyo"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "notif: usuario marca leída"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ─────────────────────────────────────────────────────────────────────────
-- audit_logs (solo admins)
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "audit: solo admin" ON public.audit_logs;

CREATE POLICY "audit: solo admin"
  ON public.audit_logs FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ─────────────────────────────────────────────────────────────────────────
-- site_settings (solo admins)
-- ─────────────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "settings: solo admin" ON public.site_settings;

CREATE POLICY "settings: solo admin"
  ON public.site_settings FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());


-- ═══════════════════════════════════════════════════════════════════════════
-- 10. VISTAS
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────
-- 10a. vw_active_certifications
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.vw_active_certifications AS
SELECT
  id,
  name,
  display_name,
  description,
  icon_color,
  fee,
  currency,
  duration_days,
  exam_duration_minutes,
  requirements
FROM public.certifications_catalog
WHERE is_active = TRUE
ORDER BY display_name;

COMMENT ON VIEW public.vw_active_certifications IS 'Catálogo filtrado: solo certificaciones activas.';

-- ─────────────────────────────────────────────────────────────────────────
-- 10b. vw_pending_applications (vista para panel de administración)
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.vw_pending_applications AS
SELECT
  a.id,
  a.status,
  a.submitted_at,
  a.updated_at,
  u.email          AS user_email,
  u.first_name     AS user_first_name,
  u.last_name      AS user_last_name,
  u.company        AS user_company,
  c.display_name   AS cert_display_name,
  c.name           AS cert_name,
  public.count_application_documents(a.id) AS document_count
FROM public.certifications_applications a
JOIN public.users u ON u.id = a.user_id
JOIN public.certifications_catalog c ON c.id = a.certification_id
WHERE a.status IN ('pending', 'in_review')
ORDER BY a.submitted_at ASC;

COMMENT ON VIEW public.vw_pending_applications IS 'Solicitudes pendientes de revisión con datos de usuario y certificación.';

-- ─────────────────────────────────────────────────────────────────────────
-- 10c. vw_user_dashboard_stats (estadísticas por usuario para el dashboard)
-- ─────────────────────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.vw_user_dashboard_stats AS
SELECT
  u.id                                                                 AS user_id,
  u.email,
  u.first_name,
  u.last_name,
  COUNT(a.id)                                                          AS total_applications,
  COUNT(a.id) FILTER (WHERE a.status NOT IN ('certified', 'rejected')) AS active_applications,
  COUNT(a.id) FILTER (WHERE a.status = 'certified')                   AS certified_count,
  COUNT(a.id) FILTER (WHERE a.status = 'rejected')                    AS rejected_count,
  COUNT(a.id) FILTER (WHERE a.status = 'pending')                     AS pending_count
FROM public.users u
LEFT JOIN public.certifications_applications a ON a.user_id = u.id
GROUP BY u.id, u.email, u.first_name, u.last_name;

COMMENT ON VIEW public.vw_user_dashboard_stats IS 'Estadísticas de solicitudes agrupadas por usuario. Admin: todos. Client: filtrar por user_id via RLS en tablas base.';


-- ═══════════════════════════════════════════════════════════════════════════
-- 11. DATOS DE PRUEBA
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────
-- 11a. Catálogo de certificaciones
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO public.certifications_catalog
  (name, display_name, description, icon_color, fee, currency, duration_days, exam_duration_minutes, requirements, is_active)
VALUES
  (
    'Information_Delivery_Manager',
    'Information Delivery Manager (IDM)',
    'Certifica la capacidad de gestionar y coordinar la entrega de información en proyectos BIM, asegurando el cumplimiento de estándares ISO 19650.',
    '#0057A8',
    850.00, 'EUR', 730, 90,
    'Mínimo 3 años de experiencia en gestión de información BIM. Conocimiento de ISO 19650. Presentación de portfolio con 2 proyectos documentados.',
    TRUE
  ),
  (
    'BIM_Design_Manager',
    'BIM Design Manager (BDM)',
    'Acredita la competencia en la gestión y coordinación del diseño arquitectónico y de ingeniería mediante metodología BIM.',
    '#0096D6',
    950.00, 'EUR', 730, 90,
    'Mínimo 4 años de experiencia como coordinador BIM en fase de diseño. Dominio de Revit, ArchiCAD o software BIM equivalente. Portfolio de proyectos coordinados.',
    TRUE
  ),
  (
    'BIM_Construction_Manager',
    'BIM Construction Manager (BCM)',
    'Certifica la gestión BIM en la fase de construcción, incluyendo coordinación de modelos, 4D/5D y seguimiento de obra.',
    '#00A36C',
    1050.00, 'EUR', 730, 120,
    'Mínimo 4 años de experiencia en construcción con BIM. Experiencia en coordinación de modelos multi-disciplina. Conocimiento de procesos constructivos y normativas locales.',
    TRUE
  )
ON CONFLICT (name) DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────
-- 11b. Usuarios de prueba
-- NOTA: Estos registros se crean directamente en public.users para pruebas.
-- En producción, el trigger on_auth_user_created los crea automáticamente
-- al registrarse en auth.users.
-- Sustituye los UUIDs por los IDs reales de auth.users si ya existen.
-- ─────────────────────────────────────────────────────────────────────────

-- Primero, sincroniza cualquier usuario que ya exista en auth.users
INSERT INTO public.users (id, email, first_name, last_name, role, is_active)
SELECT
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'first_name', split_part(au.email, '@', 1)),
  COALESCE(au.raw_user_meta_data->>'last_name', ''),
  'client',
  TRUE
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Asignar rol admin al email de administración principal
-- ⚠️  Cambia este email por el real de tu cuenta admin
UPDATE public.users
SET role = 'admin'
WHERE email = 'admin@aecmi.es';

-- ─────────────────────────────────────────────────────────────────────────
-- 11c. Configuración inicial del sitio
-- ─────────────────────────────────────────────────────────────────────────
INSERT INTO public.site_settings (key, value, description)
VALUES
  ('platform_name',     '"AECMI"',                                        'Nombre de la plataforma'),
  ('contact_email',     '"info@aecmi.es"',                                'Email de contacto principal'),
  ('max_file_size_mb',  '10',                                              'Tamaño máximo de archivo en MB'),
  ('allowed_mime_types','["application/pdf","image/jpeg","image/png"]',    'Tipos MIME permitidos en uploads'),
  ('maintenance_mode',  'false',                                           'Modo mantenimiento activo')
ON CONFLICT (key) DO NOTHING;


-- ═══════════════════════════════════════════════════════════════════════════
-- 12. ÍNDICES (rendimiento)
-- ═══════════════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_users_email         ON public.users (email);
CREATE INDEX IF NOT EXISTS idx_users_role          ON public.users (role);
CREATE INDEX IF NOT EXISTS idx_apps_user_id        ON public.certifications_applications (user_id);
CREATE INDEX IF NOT EXISTS idx_apps_status         ON public.certifications_applications (status);
CREATE INDEX IF NOT EXISTS idx_apps_submitted_at   ON public.certifications_applications (submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_docs_application_id ON public.documents (application_id);
CREATE INDEX IF NOT EXISTS idx_docs_uploaded_by    ON public.documents (uploaded_by);
CREATE INDEX IF NOT EXISTS idx_payments_user_id    ON public.payments (user_id);
CREATE INDEX IF NOT EXISTS idx_notif_user_id       ON public.notifications (user_id);
CREATE INDEX IF NOT EXISTS idx_notif_is_read       ON public.notifications (is_read);
CREATE INDEX IF NOT EXISTS idx_audit_actor_id      ON public.audit_logs (actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_created_at    ON public.audit_logs (created_at DESC);


-- ═══════════════════════════════════════════════════════════════════════════
-- FIN DEL SCHEMA
-- ═══════════════════════════════════════════════════════════════════════════
-- Para verificar:
--   SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
--   SELECT proname FROM pg_proc WHERE pronamespace = 'public'::regnamespace;
-- ═══════════════════════════════════════════════════════════════════════════
