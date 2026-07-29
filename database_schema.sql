-- ═══════════════════════════════════════════════════════════════════════════════
-- AECMI - ESQUEMA COMPLETO DE BASE DE DATOS PARA SUPABASE
-- ═══════════════════════════════════════════════════════════════════════════════
-- Ejecutar en Supabase SQL Editor (SQL Editor → New query → Run)
-- Es idempotente (usa IF NOT EXISTS) y puede ejecutarse múltiples veces.
-- ═══════════════════════════════════════════════════════════════════════════════

-- Habilitar extensión UUID si no está activa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ═══════════════════════════════════════════════════════════════════════════════
-- 1. TABLA: users
-- Almacena los usuarios registrados en la plataforma.
-- Se sincroniza con auth.users de Supabase mediante trigger.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(30),
    company VARCHAR(255),
    country VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'client' CHECK (role IN ('admin', 'client', 'staff')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    profile_picture_url VARCHAR(500),
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE public.users IS 'Usuarios registrados en la plataforma AECMI';
COMMENT ON COLUMN public.users.role IS 'Rol del usuario: admin, client o staff';

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_is_active ON public.users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON public.users(created_at);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 2. TABLA: certifications_catalog
-- Catálogo de certificaciones disponibles en AECMI.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.certifications_catalog (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE CHECK (name IN ('Information_Delivery_Manager', 'BIM_Design_Manager', 'BIM_Construction_Manager')),
    display_name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_color VARCHAR(20) DEFAULT 'blue',
    fee DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    duration_days INTEGER,
    exam_duration_minutes INTEGER,
    requirements TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.certifications_catalog IS 'Catálogo de certificaciones BIM disponibles';

CREATE INDEX IF NOT EXISTS idx_certifications_catalog_name ON public.certifications_catalog(name);
CREATE INDEX IF NOT EXISTS idx_certifications_catalog_is_active ON public.certifications_catalog(is_active);

-- Datos iniciales del catálogo
INSERT INTO public.certifications_catalog (name, display_name, description, icon_color, fee, currency, duration_days, exam_duration_minutes, requirements, is_active)
VALUES 
    (
        'Information_Delivery_Manager',
        'Information Delivery Manager',
        'Especialista en gestión estratégica de información en proyectos BIM. Gestión de procesos, protocolos de información, CDE y cumplimiento ISO 19650.',
        'blue',
        450.00,
        'EUR',
        90,
        120,
        'Experiencia mínima de 3 años en gestión de información BIM. Conocimiento de estándares ISO 19650.',
        TRUE
    ),
    (
        'BIM_Design_Manager',
        'BIM Design Manager',
        'Coordinador de procesos BIM en fase de diseño. Coordinación interdisciplinar, auditoría de modelos y gestión de incidencias.',
        'green',
        450.00,
        'EUR',
        90,
        120,
        'Experiencia mínima de 3 años en coordinación BIM de diseño. Dominio de herramientas de modelado federado.',
        TRUE
    ),
    (
        'BIM_Construction_Manager',
        'BIM Construction Manager',
        'Especialista en implantación BIM en fase de construcción. Coordinación en obra, control de calidad y gestión documental.',
        'orange',
        450.00,
        'EUR',
        90,
        120,
        'Experiencia mínima de 3 años en gestión BIM en obra. Conocimiento de planificación 4D/5D y BEP.',
        TRUE
    )
ON CONFLICT (name) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 3. TABLA: certifications_applications
-- Solicitudes de certificación realizadas por los usuarios.
-- Contiene todo el flujo: solicitud, revisión, pago, examen, entrevista, emisión, QR.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.certifications_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Relación con usuario y certificación
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    certification_id UUID NOT NULL REFERENCES public.certifications_catalog(id) ON DELETE RESTRICT,
    certification_type VARCHAR(100) NOT NULL,

    -- Estado de la solicitud
    status VARCHAR(30) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'in_review', 'approved', 'rejected', 'exam_scheduled', 'exam_passed', 'certified')),

    -- Información profesional del solicitante
    professional_experience TEXT,
    education_details TEXT,
    years_of_experience INTEGER,

    -- Fechas de gestión
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,

    -- Pagos
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_amount DECIMAL(10, 2),
    payment_date TIMESTAMP WITH TIME ZONE,

    -- Examen
    exam_date DATE,
    exam_time TIME,
    exam_location VARCHAR(255),
    exam_attempts INTEGER DEFAULT 0,
    exam_passed BOOLEAN DEFAULT FALSE,
    exam_score INTEGER,

    -- Entrevista
    interview_date DATE,
    interview_time TIME,
    interview_result VARCHAR(20) CHECK (interview_result IN ('pending', 'passed', 'failed')),

    -- Certificación emitida
    certification_issued_date DATE,
    certification_expiry_date DATE,
    certification_code VARCHAR(50) UNIQUE,

    -- Código QR y verificación
    qr_code VARCHAR(50) UNIQUE,
    qr_image VARCHAR(500),
    is_public_listed BOOLEAN DEFAULT false,
    public_profile_url VARCHAR(200),

    -- Notas administrativas
    admin_notes TEXT,
    rejection_reason TEXT,

    -- Auditoría
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.certifications_applications IS 'Solicitudes de certificación BIM con flujo completo de evaluación';
COMMENT ON COLUMN public.certifications_applications.status IS 'Estado del flujo: pending, in_review, approved, rejected, exam_scheduled, exam_passed, certified';
COMMENT ON COLUMN public.certifications_applications.reviewed_by IS 'Administrador que revisó la solicitud';
COMMENT ON COLUMN public.certifications_applications.qr_code IS 'Código QR único para verificación pública';
COMMENT ON COLUMN public.certifications_applications.is_public_listed IS 'Si aparece en el registro público de certificados';

-- Índices para optimizar consultas frecuentes
CREATE INDEX IF NOT EXISTS idx_cert_apps_user_id ON public.certifications_applications(user_id);
CREATE INDEX IF NOT EXISTS idx_cert_apps_certification_id ON public.certifications_applications(certification_id);
CREATE INDEX IF NOT EXISTS idx_cert_apps_status ON public.certifications_applications(status);
CREATE INDEX IF NOT EXISTS idx_cert_apps_payment_status ON public.certifications_applications(payment_status);
CREATE INDEX IF NOT EXISTS idx_cert_apps_submitted_at ON public.certifications_applications(submitted_at);
CREATE INDEX IF NOT EXISTS idx_cert_apps_exam_date ON public.certifications_applications(exam_date);
CREATE INDEX IF NOT EXISTS idx_cert_apps_reviewed_by ON public.certifications_applications(reviewed_by);
CREATE INDEX IF NOT EXISTS idx_cert_apps_cert_code ON public.certifications_applications(certification_code);
CREATE INDEX IF NOT EXISTS idx_cert_apps_qr_code ON public.certifications_applications(qr_code);
CREATE INDEX IF NOT EXISTS idx_cert_apps_is_public ON public.certifications_applications(is_public_listed);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 4. TABLA: documents
-- Documentos adjuntos a una solicitud de certificación.
-- Los archivos físicos se almacenan en Supabase Storage; aquí solo la metadata.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES public.certifications_applications(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size INTEGER,
    document_type VARCHAR(30) NOT NULL DEFAULT 'other' 
        CHECK (document_type IN ('cv', 'education', 'experience', 'portfolio', 'other')),
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES public.users(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    deleted_at TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE public.documents IS 'Documentos subidos por los candidatos (CV, títulos, portfolio, etc.)';
COMMENT ON COLUMN public.documents.file_url IS 'URL pública o signed URL del archivo en Supabase Storage';

CREATE INDEX IF NOT EXISTS idx_documents_application_id ON public.documents(application_id);
CREATE INDEX IF NOT EXISTS idx_documents_document_type ON public.documents(document_type);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 5. TABLA: payments
-- Registro de pagos asociados a solicitudes de certificación.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID NOT NULL REFERENCES public.certifications_applications(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    payment_method VARCHAR(20) CHECK (payment_method IN ('card', 'transfer', 'other')),
    transaction_id VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    invoice_number VARCHAR(100),
    invoice_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    paid_at TIMESTAMP WITH TIME ZONE
);

COMMENT ON TABLE public.payments IS 'Pagos realizados por los candidatos para sus solicitudes';
COMMENT ON COLUMN public.payments.stripe_payment_intent_id IS 'ID del PaymentIntent de Stripe (opcional)';

CREATE INDEX IF NOT EXISTS idx_payments_application_id ON public.payments(application_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON public.payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON public.payments(created_at);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 6. TABLA: contact_messages
-- Mensajes recibidos desde el formulario de contacto público.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30),
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
    response TEXT,
    responded_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    responded_at TIMESTAMP WITH TIME ZONE,
    priority VARCHAR(20) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.contact_messages IS 'Mensajes enviados desde el formulario de contacto de la web';
COMMENT ON COLUMN public.contact_messages.status IS 'Estado del mensaje: new, read, responded';

CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON public.contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_messages_responded_by ON public.contact_messages(responded_by);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 7. TABLA: audit_logs
-- Registro de auditoría de acciones importantes en la plataforma.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id VARCHAR(255),
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.audit_logs IS 'Registro de auditoría de acciones en la plataforma';

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity_type ON public.audit_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 8. TABLA: notifications
-- Notificaciones internas para los usuarios.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('application_status', 'exam_scheduled', 'payment_received', 'message_received', 'certification_issued', 'renewal_due')),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.notifications IS 'Notificaciones internas para usuarios';

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 9. TABLA: site_settings
-- Configuración global del sitio (precios, textos, toggles).
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(20) CHECK (type IN ('string', 'number', 'boolean', 'json')),
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.site_settings IS 'Configuración global del sitio AECMI';

CREATE INDEX IF NOT EXISTS idx_site_settings_key ON public.site_settings(key);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 10. FUNCIÓN: actualizar updated_at automáticamente
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para tablas con updated_at
DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_cert_catalog_updated_at ON public.certifications_catalog;
CREATE TRIGGER trg_cert_catalog_updated_at
    BEFORE UPDATE ON public.certifications_catalog
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_cert_apps_updated_at ON public.certifications_applications;
CREATE TRIGGER trg_cert_apps_updated_at
    BEFORE UPDATE ON public.certifications_applications
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_payments_updated_at ON public.payments;
CREATE TRIGGER trg_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS trg_contact_messages_updated_at ON public.contact_messages;
CREATE TRIGGER trg_contact_messages_updated_at
    BEFORE UPDATE ON public.contact_messages
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- ═══════════════════════════════════════════════════════════════════════════════
-- 11. FUNCIÓN: sincronizar auth.users → public.users
-- Se ejecuta automáticamente cuando un usuario se registra en Supabase Auth.
-- ═══════════════════════════════════════════════════════════════════════════════
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (
        id,
        email,
        first_name,
        last_name,
        role,
        is_active,
        created_at
    )
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'first_name', ''),
        COALESCE(new.raw_user_meta_data->>'last_name', ''),
        COALESCE(new.raw_user_meta_data->>'role', 'client'),
        true,
        NOW()
    )
    ON CONFLICT (id) DO NOTHING;
    
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: al crear usuario en auth.users, crear en public.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ═══════════════════════════════════════════════════════════════════════════════
-- 12. VISTA: vw_active_certifications
-- Profesionales certificados con estado calculado de vencimiento.
-- ═══════════════════════════════════════════════════════════════════════════════
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
    ca.status,
    ca.certification_issued_date,
    ca.certification_expiry_date,
    ca.certification_code,
    ca.qr_code,
    ca.is_public_listed,
    ca.public_profile_url,
    CASE 
        WHEN ca.certification_expiry_date < CURRENT_DATE THEN 'expired'
        WHEN ca.certification_expiry_date < CURRENT_DATE + INTERVAL '90 days' THEN 'due'
        ELSE 'active'
    END AS expiry_status
FROM public.certifications_applications ca
JOIN public.users u ON ca.user_id = u.id
JOIN public.certifications_catalog cc ON ca.certification_id = cc.id
WHERE ca.status = 'certified' AND u.is_active = true;

COMMENT ON VIEW public.vw_active_certifications IS 'Vista de profesionales certificados con estado de vencimiento calculado';

-- ═══════════════════════════════════════════════════════════════════════════════
-- 13. ROW LEVEL SECURITY (RLS) - Políticas de acceso
-- ═══════════════════════════════════════════════════════════════════════════════

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas existentes para evitar duplicados (idempotencia)
DO $$
BEGIN
    -- users
    DROP POLICY IF EXISTS "Users can view own data" ON public.users;
    DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
    DROP POLICY IF EXISTS "Users can update own data" ON public.users;
    
    -- certifications_applications
    DROP POLICY IF EXISTS "Users can view own applications" ON public.certifications_applications;
    DROP POLICY IF EXISTS "Admins can view all applications" ON public.certifications_applications;
    DROP POLICY IF EXISTS "Users can create own applications" ON public.certifications_applications;
    DROP POLICY IF EXISTS "Admins can update all applications" ON public.certifications_applications;
    
    -- documents
    DROP POLICY IF EXISTS "Users can view own documents" ON public.documents;
    DROP POLICY IF EXISTS "Admins can view all documents" ON public.documents;
    
    -- payments
    DROP POLICY IF EXISTS "Users can view own payments" ON public.payments;
    DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;
    
    -- notifications
    DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
    
    -- contact_messages (solo admin)
    DROP POLICY IF EXISTS "Admins can manage contact messages" ON public.contact_messages;
    
    -- audit_logs (solo admin)
    DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
END $$;

-- POLÍTICAS: users
CREATE POLICY "Users can view own data"
    ON public.users FOR SELECT
    USING (auth.uid() = id OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can update own data"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

-- POLÍTICAS: certifications_applications
CREATE POLICY "Users can view own applications"
    ON public.certifications_applications FOR SELECT
    USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Users can create own applications"
    ON public.certifications_applications FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can update all applications"
    ON public.certifications_applications FOR UPDATE
    USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- POLÍTICAS: documents
CREATE POLICY "Users can view own documents"
    ON public.documents FOR SELECT
    USING (
        application_id IN (SELECT id FROM public.certifications_applications WHERE user_id = auth.uid())
        OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
    );

-- POLÍTICAS: payments
CREATE POLICY "Users can view own payments"
    ON public.payments FOR SELECT
    USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- POLÍTICAS: notifications
CREATE POLICY "Users can view own notifications"
    ON public.notifications FOR SELECT
    USING (user_id = auth.uid());

-- POLÍTICAS: contact_messages (solo admin)
CREATE POLICY "Admins can manage contact messages"
    ON public.contact_messages FOR ALL
    USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- POLÍTICAS: audit_logs (solo admin)
CREATE POLICY "Admins can view audit logs"
    ON public.audit_logs FOR SELECT
    USING (EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'));

-- ═══════════════════════════════════════════════════════════════════════════════
-- 14. DATOS DE PRUEBA (Opcional - comentar en producción)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Usuario admin de prueba
INSERT INTO public.users (id, email, first_name, last_name, role, is_active, created_at)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'admin@aecmi.com',
    'Admin',
    'AECMI',
    'admin',
    true,
    NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Usuario client de prueba
INSERT INTO public.users (id, email, first_name, last_name, role, is_active, created_at)
VALUES (
    '00000000-0000-0000-0000-000000000002',
    'usuario@aecmi.com',
    'Juan',
    'García López',
    'client',
    true,
    NOW()
)
ON CONFLICT (email) DO NOTHING;

-- Solicitud de certificación de prueba (certificada con QR)
INSERT INTO public.certifications_applications (
    id,
    user_id,
    certification_id,
    certification_type,
    status,
    years_of_experience,
    submitted_at,
    reviewed_at,
    payment_status,
    payment_amount,
    exam_passed,
    exam_score,
    interview_result,
    certification_issued_date,
    certification_expiry_date,
    certification_code,
    qr_code,
    qr_image,
    is_public_listed,
    public_profile_url,
    created_at,
    updated_at
)
SELECT
    '11111111-1111-1111-1111-111111111111',
    '00000000-0000-0000-0000-000000000002',
    cc.id,
    'Information_Delivery_Manager',
    'certified',
    5,
    NOW() - INTERVAL '3 months',
    NOW() - INTERVAL '2 months',
    'completed',
    450.00,
    true,
    85,
    'passed',
    CURRENT_DATE - INTERVAL '3 months',
    CURRENT_DATE + INTERVAL '2 years 9 months',
    'AECMI-IDM-2024-0042',
    'IDM-2024-ABC123XYZ789',
    NULL,
    true,
    '/certificate/IDM-2024-ABC123XYZ789',
    NOW(),
    NOW()
FROM public.certifications_catalog cc
WHERE cc.name = 'Information_Delivery_Manager'
ON CONFLICT (id) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 15. SUPABASE STORAGE - BUCKETS Y POLÍTICAS
-- ═══════════════════════════════════════════════════════════════════════════════

-- Crear buckets (si no existen)
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES
  ('application-documents', 'application-documents', FALSE, FALSE, 5242880, ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]),
  ('profile-pictures', 'profile-pictures', TRUE, FALSE, 2097152, ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp'
  ]),
  -- PRIVADO: los PDFs de certificado se sirven mediante URLs firmadas con
  -- expiración (createSignedUrl), no por URL pública. Evita la descarga anónima
  -- por adivinación/enumeración de rutas.
  ('certificates', 'certificates', FALSE, FALSE, 10485760, ARRAY[
    'application/pdf'
  ])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Eliminar políticas existentes de storage para idempotencia
DO $$
BEGIN
    -- application-documents
    DROP POLICY IF EXISTS "Users can upload own documents" ON storage.objects;
    DROP POLICY IF EXISTS "Users can view own documents" ON storage.objects;
    DROP POLICY IF EXISTS "Users can delete own documents" ON storage.objects;
    DROP POLICY IF EXISTS "Admins can view all documents" ON storage.objects;
    DROP POLICY IF EXISTS "Admins can delete all documents" ON storage.objects;
    -- profile-pictures
    DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
    DROP POLICY IF EXISTS "Public avatars readable" ON storage.objects;
    DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
    -- certificates
    DROP POLICY IF EXISTS "Public certificates readable" ON storage.objects;
    DROP POLICY IF EXISTS "Admins can upload certificates" ON storage.objects;
END $$;

-- ========================================
-- BUCKET: application-documents (PRIVADO)
-- ========================================

-- Usuarios pueden subir sus propios documentos
CREATE POLICY "Users can upload own documents"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'application-documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Usuarios pueden ver sus propios documentos
CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'application-documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Usuarios pueden eliminar sus propios documentos
CREATE POLICY "Users can delete own documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'application-documents'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Admins pueden ver todos los documentos
CREATE POLICY "Admins can view all documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'application-documents'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Admins pueden eliminar cualquier documento
CREATE POLICY "Admins can delete all documents"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'application-documents'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========================================
-- BUCKET: profile-pictures (PÚBLICO)
-- ========================================

-- Cualquiera puede ver avatares
CREATE POLICY "Public avatars readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-pictures');

-- Usuarios pueden subir su propio avatar
CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-pictures'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Usuarios pueden actualizar su propio avatar
CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profile-pictures'
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ========================================
-- BUCKET: certificates (PRIVADO)
-- ========================================

-- Sin lectura pública. La descarga se hace por URL firmada generada server-side
-- con service_role (bypass RLS). Solo el admin puede leer directamente por RLS.
DROP POLICY IF EXISTS "Public certificates readable" ON storage.objects;
CREATE POLICY "Admins can read certificates"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'certificates'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Solo admins pueden subir certificados
CREATE POLICY "Admins can upload certificates"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'certificates'
    AND auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ========================================
-- HABILITAR RLS EN STORAGE
-- ========================================

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════════════════════
-- FIN DEL ESQUEMA
-- ═══════════════════════════════════════════════════════════════════════════════

