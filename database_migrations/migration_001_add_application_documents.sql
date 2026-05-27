-- ═══════════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN 001: Índices y campos para solicitudes de certificación
-- ═══════════════════════════════════════════════════════════════════════════════
-- Fecha: 2026-05-26
-- Descripción: Añade índices de rendimiento y asegura que los campos de
--              solicitud existen en certifications_applications.
-- Ejecutar en: Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════════

-- ========================================
-- 1. ASEGURAR CAMPOS EXISTEN
-- ========================================
-- Estos campos ya fueron creados en database_schema.sql completo.
-- Esta migración es idempotente por si se ejecuta en un proyecto
-- que solo tiene el schema base anterior.

DO $$
BEGIN
    -- professional_experience
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'certifications_applications'
        AND column_name = 'professional_experience'
    ) THEN
        ALTER TABLE public.certifications_applications
        ADD COLUMN professional_experience TEXT;
    END IF;

    -- education_details
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'certifications_applications'
        AND column_name = 'education_details'
    ) THEN
        ALTER TABLE public.certifications_applications
        ADD COLUMN education_details TEXT;
    END IF;

    -- years_of_experience
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'certifications_applications'
        AND column_name = 'years_of_experience'
    ) THEN
        ALTER TABLE public.certifications_applications
        ADD COLUMN years_of_experience INT;
    END IF;

    -- certification_type
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'certifications_applications'
        AND column_name = 'certification_type'
    ) THEN
        ALTER TABLE public.certifications_applications
        ADD COLUMN certification_type VARCHAR(100) NOT NULL DEFAULT '';
    END IF;
END $$;

-- ========================================
-- 2. ÍNDICES DE RENDIMIENTO
-- ========================================

-- Búsquedas por usuario + estado (dashboard client/admin)
CREATE INDEX IF NOT EXISTS idx_cert_apps_user_id_status
ON public.certifications_applications(user_id, status);

-- Listar aplicaciones de un usuario ordenadas por fecha
CREATE INDEX IF NOT EXISTS idx_cert_apps_user_submitted
ON public.certifications_applications(user_id, submitted_at DESC);

-- Búsquedas por tipo de certificación
CREATE INDEX IF NOT EXISTS idx_cert_apps_cert_type
ON public.certifications_applications(certification_type);

-- Búsquedas por usuario + tipo de certificación
CREATE INDEX IF NOT EXISTS idx_cert_apps_user_cert_type
ON public.certifications_applications(user_id, certification_type);

-- ========================================
-- 3. FUNCIÓN AUXILIAR: Verificar documentos de una solicitud
-- ========================================

CREATE OR REPLACE FUNCTION public.count_application_documents(app_id UUID)
RETURNS INTEGER AS $$
DECLARE
    doc_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO doc_count
    FROM public.documents
    WHERE application_id = app_id;
    RETURN doc_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION public.count_application_documents IS 'Cuenta cuántos documentos tiene una solicitud';

-- ========================================
-- 4. ACTUALIZAR VISTA DE CERTIFICACIONES ACTIVAS
-- ========================================

CREATE OR REPLACE VIEW public.vw_active_certifications AS
SELECT 
    ca.id,
    u.id AS user_id,
    u.first_name,
    u.last_name,
    CONCAT(u.first_name, ' ', u.last_name) AS professional_name,
    u.email,
    u.country,
    u.company,
    cc.display_name AS certification_name,
    cc.name AS certification_key,
    ca.certification_type,
    ca.status,
    ca.certification_issued_date,
    ca.certification_expiry_date,
    ca.certification_code,
    ca.qr_code,
    ca.is_public_listed,
    ca.public_profile_url,
    ca.years_of_experience,
    ca.submitted_at,
    CASE 
        WHEN ca.certification_expiry_date < CURRENT_DATE THEN 'expired'
        WHEN ca.certification_expiry_date < CURRENT_DATE + INTERVAL '90 days' THEN 'due'
        ELSE 'active'
    END AS expiry_status,
    public.count_application_documents(ca.id) AS document_count
FROM public.certifications_applications ca
JOIN public.users u ON ca.user_id = u.id
JOIN public.certifications_catalog cc ON ca.certification_id = cc.id
WHERE ca.status = 'certified' AND u.is_active = true;

COMMENT ON VIEW public.vw_active_certifications IS 'Vista de profesionales certificados con estado de vencimiento y conteo de documentos';

-- ========================================
-- 5. VISTA: Solicitudes pendientes del admin
-- ========================================

CREATE OR REPLACE VIEW public.vw_pending_applications AS
SELECT 
    ca.id,
    u.id AS user_id,
    u.first_name,
    u.last_name,
    CONCAT(u.first_name, ' ', u.last_name) AS applicant_name,
    u.email,
    u.phone,
    u.country,
    u.company,
    cc.display_name AS certification_name,
    ca.certification_type,
    ca.status,
    ca.years_of_experience,
    ca.professional_experience,
    ca.education_details,
    ca.submitted_at,
    ca.payment_status,
    ca.admin_notes,
    public.count_application_documents(ca.id) AS document_count
FROM public.certifications_applications ca
JOIN public.users u ON ca.user_id = u.id
JOIN public.certifications_catalog cc ON ca.certification_id = cc.id
WHERE ca.status IN ('pending', 'in_review', 'approved')
ORDER BY ca.submitted_at DESC;

COMMENT ON VIEW public.vw_pending_applications IS 'Vista de solicitudes pendientes para revisión administrativa';

-- ========================================
-- FIN DE MIGRACIÓN 001
-- ========================================
