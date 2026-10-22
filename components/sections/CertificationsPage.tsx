'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform,
} from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, CheckCircle2, ChevronDown, Plus, RefreshCw, Mail, FileBadge,
  Globe, BarChart3, Rocket, ClipboardList, Layers, HardHat,
  FolderOpen, Settings, Users2, LineChart, Box, Wrench, Handshake, BadgeCheck,
  Calendar, ShieldCheck, TrendingUp, Clock, BookMarked, School, MessageCircle,
  UserCheck, FileText, Search, CreditCard, GraduationCap, Award,
} from 'lucide-react'
import { type Locale, localizePath } from '@/lib/locale'
import { reveal, BLUEPRINT, CountUp, RevealWords, Magnetic, Marquee, Eyebrow } from '@/components/ui/motion-kit'

type Props = { locale: Locale }

const COPY = {
  es: {
    hero_badge: 'Profesionales BIM de clase mundial',
    hero_title: 'Certificaciones profesionales BIM',
    hero_sub: 'Reconocimiento internacional · Estándares globales',
    hero_cta: 'Inicia tu certificación',
    hero_cta2: 'Explorar programas',
    programs_badge: 'Programas',
    programs_title: 'Nuestras certificaciones',
    skills: 'Competencias clave',
    apply: 'Solicitar ahora',
    details: 'Ver detalles',
    certs: [
      { title: 'Information Delivery Manager', level: 'Nivel: Avanzado', desc: 'Gestión estratégica de información en proyectos BIM. Supervisión de CDE y cumplimiento ISO 19650.' },
      { title: 'BIM Design Manager', level: 'Nivel: Intermedio', desc: 'Coordinación interdisciplinar en fase de diseño. Auditoría de modelos digitales y federados.' },
      { title: 'BIM Construction Manager', level: 'Nivel: Avanzado', desc: 'Implantación BIM en fase de construcción. Control de calidad y gestión de modelos federados.' },
    ],
    why_badge: 'Ventajas',
    why_title: '¿Por qué certificarte con AECOMI?',
    why: [
      { title: 'Reconocimiento global', desc: 'Validación internacional de tus competencias BIM con estándares de clase mundial.' },
      { title: 'Demanda del mercado', desc: 'Los profesionales BIM certificados son muy buscados por las empresas líderes del sector.' },
      { title: 'Mejora profesional', desc: 'Acceso a mejores oportunidades laborales y a un desarrollo de carrera acelerado.' },
    ],
    process_badge: 'Camino',
    process_title: 'Camino hacia tu certificación',
    step_label: 'Paso',
    steps: [
      { title: 'Elegibilidad', short: 'Verifica que cumples los requisitos de experiencia y formación.', detail: 'Requiere experiencia y conocimiento especializado en gestión BIM. Revisa el manual de certificación correspondiente para conocer los requisitos específicos de cada programa.', bullets: ['Experiencia demostrable en proyectos BIM', 'Formación académica relacionada', 'Referencias profesionales'], metric: null },
      { title: 'Solicitud', short: 'Completa tu solicitud con información de contacto y experiencia.', detail: 'Proporciona información de contacto, educación y experiencia profesional.', bullets: [], metric: { value: '100', label: 'días para completar tu solicitud una vez iniciada' } },
      { title: 'Revisión', short: 'Validamos tus credenciales y experiencia profesional.', detail: 'Verificación de criterios de elegibilidad y validación de experiencia.', bullets: [], metric: { value: '15', label: 'días hábiles aproximados de revisión' } },
      { title: 'Pago', short: 'Sistema de pago seguro tras la aprobación de elegibilidad.', detail: 'Sistema de pago en línea seguro para completar tu inscripción. Solo pagas después de aprobada tu elegibilidad.', bullets: [], metric: null },
      { title: 'Examen', short: 'Examen técnico + entrevista personal con evaluador senior.', detail: 'Examen técnico de competencias y entrevista personal con evaluadores. Dispones de un año para aprobar.', bullets: [], metric: { value: '3', label: 'intentos durante 1 año para aprobar' } },
    ],
    compare_badge: 'Comparativa',
    compare_title: 'Encuentra tu certificación',
    compare_cta: 'Elegir esta',
    compare_rows: [
      { label: 'Perfil ideal', values: ['Gestores de información y datos', 'Coordinadores de diseño BIM', 'Coordinadores de obra BIM'] },
      { label: 'Experiencia requerida', values: ['5+ años en gestión BIM', '3+ años en diseño BIM', '5+ años en construcción BIM'] },
      { label: 'Duración del proceso', values: ['~3-4 meses', '~2-3 meses', '~3-4 meses'] },
      { label: 'Examen', values: ['Técnico + Entrevista', 'Técnico + Entrevista', 'Técnico + Entrevista'] },
      { label: 'Reintentos', values: ['3 en 1 año', '3 en 1 año', '3 en 1 año'] },
    ],
    tips_badge: 'Prepárate',
    tips_title: 'Consejos para aprobar',
    tips: [
      { title: 'Recopila información con tiempo', desc: 'Reúne CV, certificados y evidencias de proyectos antes de empezar.' },
      { title: 'Revisa el manual de certificación', desc: 'Cada programa tiene su manual. Léelo detalladamente antes del examen.' },
      { title: 'Curso preparatorio recomendado', desc: 'Nuestros cursos preparatorios aumentan significativamente la tasa de aprobación.' },
      { title: 'Únete a un grupo de estudio', desc: 'Conecta con otros candidatos y comparte conocimiento en nuestra comunidad.' },
    ],
    renew_title: 'Mantén tu certificación',
    renew_desc: 'Las certificaciones AECOMI requieren procesos periódicos de renovación orientados a garantizar que los profesionales mantienen actualizados sus conocimientos y competencias.',
    renew_cta: 'Información de renovación',
    registry_title: 'Regístrate públicamente',
    registry_desc: 'AECOMI mantiene un registro actualizado de profesionales certificados para aportar transparencia y confianza al mercado. Verifica credenciales de forma rápida y segura.',
    registry_cta: 'Ver registro de certificados',
    faq_badge: 'Ayuda',
    faq_title: 'Preguntas frecuentes',
    faq_tabs: ['General', 'Examen y entrevista'],
    faq_general: [
      { q: '¿Cómo obtengo una certificación AECOMI?', a: 'Debes cumplir con los criterios de elegibilidad, completar la solicitud en línea, pasar la revisión de tu experiencia, realizar el pago y aprobar el examen técnico junto con la entrevista personal.' },
      { q: '¿Cómo completo la solicitud?', a: 'La solicitud se completa a través de nuestro portal en línea. Necesitarás información de contacto, tus credenciales académicas y una descripción detallada de tu experiencia profesional en proyectos BIM.' },
      { q: '¿Qué documentación debo enviar?', a: 'Generalmente se requiere: identificación oficial, CV detallado, certificados académicos, referencias profesionales y evidencia de proyectos en los que hayas participado.' },
    ],
    faq_exam: [
      { q: '¿Cómo programo una cita para el examen?', a: 'Una vez aprobada tu elegibilidad, recibirás un enlace para acceder al calendario de exámenes y seleccionar la fecha y hora que mejor se adapte a tu disponibilidad.' },
      { q: '¿Dónde se realiza el examen?', a: 'Los exámenes se realizan en línea a través de nuestra plataforma segura. También disponemos de centros presenciales en ciudades seleccionadas.' },
      { q: '¿Los exámenes están disponibles en otros idiomas?', a: 'Actualmente los exámenes están disponibles en español e inglés. Estamos trabajando para incorporar más idiomas próximamente.' },
      { q: 'Si no apruebo, ¿puedo reintentar?', a: 'Sí, tienes hasta 3 intentos durante el período de un año a partir de la aprobación de tu elegibilidad.' },
      { q: '¿Qué sucede si mi elegibilidad vence?', a: 'Si tu período de elegibilidad vence, deberás volver a presentar una nueva solicitud completa y pagar la tarifa correspondiente.' },
      { q: '¿Cómo programo mi entrevista personal?', a: 'Tras aprobar el examen técnico, nuestro equipo te contactará para coordinar la entrevista personal con un evaluador senior de AECOMI.' },
      { q: '¿Cómo realizo mi entrevista personal?', a: 'La entrevista se realiza de forma virtual a través de videollamada. Durante 45-60 minutos se evaluarán tus competencias técnicas y transversales.' },
      { q: '¿Con quién realizo la entrevista?', a: 'La entrevista la realiza un evaluador senior certificado por AECOMI con amplia experiencia en gestión de proyectos BIM a nivel internacional.' },
      { q: '¿Qué sucede si no cumplo los requisitos?', a: 'Si no cumples los requisitos en alguna etapa, recibirás retroalimentación detallada y podrás volver a presentarte tras un período de espera definido.' },
    ],
    cta_title: '¿Listo para transformar',
    cta_accent: 'tu carrera?',
    cta_desc: 'Únete a miles de profesionales certificados que ya están liderando la transformación digital del sector AEC.',
    cta_primary: 'Solicitar certificación',
    cta_secondary: 'Contacta con nosotros',
    stats: [
      { value: '500+', label: 'Profesionales' },
      { value: '3', label: 'Certificaciones' },
      { value: '100%', label: 'Verificable' },
    ],
  },
  en: {
    hero_badge: 'World-class BIM professionals',
    hero_title: 'Professional BIM certifications',
    hero_sub: 'International recognition · Global standards',
    hero_cta: 'Start your certification',
    hero_cta2: 'Explore programs',
    programs_badge: 'Programs',
    programs_title: 'Our certifications',
    skills: 'Key competencies',
    apply: 'Apply now',
    details: 'View details',
    certs: [
      { title: 'Information Delivery Manager', level: 'Level: Advanced', desc: 'Strategic information management in BIM projects. CDE supervision and ISO 19650 compliance.' },
      { title: 'BIM Design Manager', level: 'Level: Intermediate', desc: 'Interdisciplinary coordination in the design phase. Audit of digital and federated models.' },
      { title: 'BIM Construction Manager', level: 'Level: Advanced', desc: 'BIM implementation in the construction phase. Quality control and federated model management.' },
    ],
    why_badge: 'Advantages',
    why_title: 'Why get certified with AECOMI?',
    why: [
      { title: 'Global recognition', desc: 'International validation of your BIM competencies with world-class standards.' },
      { title: 'Market demand', desc: 'Certified BIM professionals are highly sought after by leading companies in the sector.' },
      { title: 'Professional growth', desc: 'Access to better job opportunities and accelerated career development.' },
    ],
    process_badge: 'Path',
    process_title: 'Path to your certification',
    step_label: 'Step',
    steps: [
      { title: 'Eligibility', short: 'Verify that you meet the experience and training requirements.', detail: 'Requires experience and specialized knowledge in BIM management. Review the corresponding certification manual to learn about the specific requirements of each program.', bullets: ['Demonstrable experience in BIM projects', 'Related academic training', 'Professional references'], metric: null },
      { title: 'Application', short: 'Complete your application with contact information and experience.', detail: 'Provide contact information, education and professional experience.', bullets: [], metric: { value: '100', label: 'days to complete your application once started' } },
      { title: 'Review', short: 'We validate your credentials and professional experience.', detail: 'Verification of eligibility criteria and validation of experience.', bullets: [], metric: { value: '15', label: 'business days approximate review time' } },
      { title: 'Payment', short: 'Secure payment system after eligibility approval.', detail: 'Secure online payment system to complete your enrollment. You only pay after your eligibility is approved.', bullets: [], metric: null },
      { title: 'Exam', short: 'Technical exam + personal interview with a senior evaluator.', detail: 'Technical competency exam and personal interview with evaluators. You have one year to pass.', bullets: [], metric: { value: '3', label: 'attempts within 1 year to pass' } },
    ],
    compare_badge: 'Comparison',
    compare_title: 'Find your certification',
    compare_cta: 'Choose this',
    compare_rows: [
      { label: 'Ideal profile', values: ['Information and data managers', 'BIM design coordinators', 'BIM construction coordinators'] },
      { label: 'Required experience', values: ['5+ years in BIM management', '3+ years in BIM design', '5+ years in BIM construction'] },
      { label: 'Process duration', values: ['~3-4 months', '~2-3 months', '~3-4 months'] },
      { label: 'Exam', values: ['Technical + Interview', 'Technical + Interview', 'Technical + Interview'] },
      { label: 'Retakes', values: ['3 in 1 year', '3 in 1 year', '3 in 1 year'] },
    ],
    tips_badge: 'Get ready',
    tips_title: 'Tips to pass',
    tips: [
      { title: 'Gather information in advance', desc: 'Gather your CV, certificates and project evidence before starting.' },
      { title: 'Review the certification manual', desc: 'Each program has its own manual. Read it carefully before the exam.' },
      { title: 'Recommended preparatory course', desc: 'Our preparatory courses significantly increase the pass rate.' },
      { title: 'Join a study group', desc: 'Connect with other candidates and share knowledge in our community.' },
    ],
    renew_title: 'Maintain your certification',
    renew_desc: 'AECOMI certifications require periodic renewal processes aimed at ensuring that professionals keep their knowledge and competencies up to date.',
    renew_cta: 'Renewal information',
    registry_title: 'Register publicly',
    registry_desc: 'AECOMI maintains an updated registry of certified professionals to provide transparency and trust to the market. Verify credentials quickly and securely.',
    registry_cta: 'View certificate registry',
    faq_badge: 'Help',
    faq_title: 'Frequently asked questions',
    faq_tabs: ['General', 'Exam and interview'],
    faq_general: [
      { q: 'How do I obtain an AECOMI certification?', a: 'You must meet the eligibility criteria, complete the online application, pass the review of your experience, make the payment, and pass the technical exam along with the personal interview.' },
      { q: 'How do I complete the application?', a: 'The application is completed through our online portal. You will need contact information, your academic credentials, and a detailed description of your professional experience in BIM projects.' },
      { q: 'What documentation should I submit?', a: 'Generally required: official identification, detailed CV, academic certificates, professional references, and evidence of projects in which you have participated.' },
    ],
    faq_exam: [
      { q: 'How do I schedule an exam appointment?', a: 'Once your eligibility is approved, you will receive a link to access the exam calendar and select the date and time that best suits your availability.' },
      { q: 'Where is the exam held?', a: 'Exams are conducted online through our secure platform. We also have physical centers in selected cities.' },
      { q: 'Are exams available in other languages?', a: 'Currently exams are available in Spanish and English. We are working to add more languages soon.' },
      { q: 'If I do not pass, can I retake it?', a: 'Yes, you have up to 3 attempts during a one-year period from the approval of your eligibility.' },
      { q: 'What happens if my eligibility expires?', a: 'If your eligibility period expires, you must submit a new complete application and pay the corresponding fee.' },
      { q: 'How do I schedule my personal interview?', a: 'After passing the technical exam, our team will contact you to coordinate the personal interview with an AECOMI senior evaluator.' },
      { q: 'How do I conduct my personal interview?', a: 'The interview is conducted virtually via video call. Your technical and transversal competencies will be evaluated over 45-60 minutes.' },
      { q: 'Who conducts the interview?', a: 'The interview is conducted by a senior evaluator certified by AECOMI with extensive experience in international BIM project management.' },
      { q: 'What happens if I do not meet the requirements?', a: 'If you do not meet the requirements at any stage, you will receive detailed feedback and can reapply after a defined waiting period.' },
    ],
    cta_title: 'Ready to transform',
    cta_accent: 'your career?',
    cta_desc: 'Join thousands of certified professionals who are already leading the digital transformation of the AEC sector.',
    cta_primary: 'Apply for certification',
    cta_secondary: 'Contact us',
    stats: [
      { value: '500+', label: 'Professionals' },
      { value: '3', label: 'Certifications' },
      { value: '100%', label: 'Verifiable' },
    ],
  },
  pt: {
    hero_badge: 'Profissionais BIM de classe mundial',
    hero_title: 'Certificações profissionais BIM',
    hero_sub: 'Reconhecimento internacional · Padrões globais',
    hero_cta: 'Inicie sua certificação',
    hero_cta2: 'Explorar programas',
    programs_badge: 'Programas',
    programs_title: 'Nossas certificações',
    skills: 'Competências-chave',
    apply: 'Solicitar agora',
    details: 'Ver detalhes',
    certs: [
      { title: 'Information Delivery Manager', level: 'Nível: Avançado', desc: 'Gestão estratégica da informação em projetos BIM. Supervisão do CDE e conformidade com a ISO 19650.' },
      { title: 'BIM Design Manager', level: 'Nível: Intermediário', desc: 'Coordenação interdisciplinar na fase de projeto. Auditoria de modelos digitais e federados.' },
      { title: 'BIM Construction Manager', level: 'Nível: Avançado', desc: 'Implantação BIM na fase de construção. Controle de qualidade e gestão de modelos federados.' },
    ],
    why_badge: 'Vantagens',
    why_title: 'Por que se certificar com a AECOMI?',
    why: [
      { title: 'Reconhecimento global', desc: 'Validação internacional das suas competências BIM com padrões de classe mundial.' },
      { title: 'Demanda do mercado', desc: 'Profissionais BIM certificados são muito procurados pelas empresas líderes do setor.' },
      { title: 'Crescimento profissional', desc: 'Acesso a melhores oportunidades de trabalho e a um desenvolvimento de carreira acelerado.' },
    ],
    process_badge: 'Caminho',
    process_title: 'Caminho para a sua certificação',
    step_label: 'Etapa',
    steps: [
      { title: 'Elegibilidade', short: 'Verifique se você cumpre os requisitos de experiência e formação.', detail: 'Exige experiência e conhecimento especializado em gestão BIM. Consulte o manual de certificação correspondente para conhecer os requisitos específicos de cada programa.', bullets: ['Experiência comprovada em projetos BIM', 'Formação acadêmica relacionada', 'Referências profissionais'], metric: null },
      { title: 'Inscrição', short: 'Preencha sua inscrição com dados de contato e experiência.', detail: 'Forneça informações de contato, formação e experiência profissional.', bullets: [], metric: { value: '100', label: 'dias para concluir sua inscrição depois de iniciada' } },
      { title: 'Revisão', short: 'Validamos suas credenciais e experiência profissional.', detail: 'Verificação dos critérios de elegibilidade e validação da experiência.', bullets: [], metric: { value: '15', label: 'dias úteis aproximados de revisão' } },
      { title: 'Pagamento', short: 'Sistema de pagamento seguro após a aprovação da elegibilidade.', detail: 'Sistema de pagamento on-line seguro para concluir sua inscrição. Você só paga depois que sua elegibilidade for aprovada.', bullets: [], metric: null },
      { title: 'Exame', short: 'Exame técnico + entrevista pessoal com avaliador sênior.', detail: 'Exame técnico de competências e entrevista pessoal com avaliadores. Você tem um ano para ser aprovado.', bullets: [], metric: { value: '3', label: 'tentativas em 1 ano para ser aprovado' } },
    ],
    compare_badge: 'Comparativo',
    compare_title: 'Encontre a sua certificação',
    compare_cta: 'Escolher esta',
    compare_rows: [
      { label: 'Perfil ideal', values: ['Gestores de informação e dados', 'Coordenadores de projeto BIM', 'Coordenadores de obra BIM'] },
      { label: 'Experiência exigida', values: ['5+ anos em gestão BIM', '3+ anos em projeto BIM', '5+ anos em construção BIM'] },
      { label: 'Duração do processo', values: ['~3-4 meses', '~2-3 meses', '~3-4 meses'] },
      { label: 'Exame', values: ['Técnico + Entrevista', 'Técnico + Entrevista', 'Técnico + Entrevista'] },
      { label: 'Novas tentativas', values: ['3 em 1 ano', '3 em 1 ano', '3 em 1 ano'] },
    ],
    tips_badge: 'Prepare-se',
    tips_title: 'Dicas para ser aprovado',
    tips: [
      { title: 'Reúna as informações com antecedência', desc: 'Junte currículo, certificados e evidências de projetos antes de começar.' },
      { title: 'Revise o manual de certificação', desc: 'Cada programa tem o seu manual. Leia-o com atenção antes do exame.' },
      { title: 'Curso preparatório recomendado', desc: 'Nossos cursos preparatórios aumentam significativamente a taxa de aprovação.' },
      { title: 'Participe de um grupo de estudo', desc: 'Conecte-se com outros candidatos e compartilhe conhecimento na nossa comunidade.' },
    ],
    renew_title: 'Mantenha sua certificação',
    renew_desc: 'As certificações da AECOMI exigem processos periódicos de renovação, para garantir que os profissionais mantenham seus conhecimentos e competências atualizados.',
    renew_cta: 'Informações de renovação',
    registry_title: 'Registre-se publicamente',
    registry_desc: 'A AECOMI mantém um registro atualizado de profissionais certificados para trazer transparência e confiança ao mercado. Verifique credenciais de forma rápida e segura.',
    registry_cta: 'Ver registro de certificados',
    faq_badge: 'Ajuda',
    faq_title: 'Perguntas frequentes',
    faq_tabs: ['Geral', 'Exame e entrevista'],
    faq_general: [
      { q: 'Como obtenho uma certificação AECOMI?', a: 'Você deve cumprir os critérios de elegibilidade, preencher a inscrição on-line, passar pela revisão da sua experiência, efetuar o pagamento e ser aprovado no exame técnico e na entrevista pessoal.' },
      { q: 'Como preencho a inscrição?', a: 'A inscrição é feita pelo nosso portal on-line. Você precisará de informações de contato, suas credenciais acadêmicas e uma descrição detalhada da sua experiência profissional em projetos BIM.' },
      { q: 'Que documentação devo enviar?', a: 'Em geral são exigidos: documento de identificação oficial, currículo detalhado, certificados acadêmicos, referências profissionais e evidências dos projetos de que você participou.' },
    ],
    faq_exam: [
      { q: 'Como agendo o exame?', a: 'Depois de aprovada a sua elegibilidade, você receberá um link para acessar o calendário de exames e escolher a data e o horário que melhor se adaptem à sua disponibilidade.' },
      { q: 'Onde o exame é realizado?', a: 'Os exames são realizados on-line em nossa plataforma segura. Também temos centros presenciais em cidades selecionadas.' },
      { q: 'Os exames estão disponíveis em outros idiomas?', a: 'Atualmente os exames estão disponíveis em espanhol e inglês. Estamos trabalhando para incluir mais idiomas em breve.' },
      { q: 'Se eu não for aprovado, posso tentar de novo?', a: 'Sim, você tem até 3 tentativas durante o período de um ano a partir da aprovação da sua elegibilidade.' },
      { q: 'O que acontece se a minha elegibilidade vencer?', a: 'Se o período de elegibilidade vencer, você deverá apresentar uma nova inscrição completa e pagar a taxa correspondente.' },
      { q: 'Como agendo a minha entrevista pessoal?', a: 'Após ser aprovado no exame técnico, nossa equipe entrará em contato para coordenar a entrevista pessoal com um avaliador sênior da AECOMI.' },
      { q: 'Como é a entrevista pessoal?', a: 'A entrevista é realizada de forma virtual, por videochamada. Durante 45 a 60 minutos serão avaliadas suas competências técnicas e transversais.' },
      { q: 'Com quem faço a entrevista?', a: 'A entrevista é conduzida por um avaliador sênior certificado pela AECOMI, com ampla experiência em gestão internacional de projetos BIM.' },
      { q: 'O que acontece se eu não cumprir os requisitos?', a: 'Se você não cumprir os requisitos em alguma etapa, receberá um retorno detalhado e poderá se candidatar novamente após um período de espera definido.' },
    ],
    cta_title: 'Pronto para transformar',
    cta_accent: 'a sua carreira?',
    cta_desc: 'Junte-se a milhares de profissionais certificados que já lideram a transformação digital do setor AEC.',
    cta_primary: 'Solicitar certificação',
    cta_secondary: 'Fale conosco',
    stats: [
      { value: '500+', label: 'Profissionais' },
      { value: '3', label: 'Certificações' },
      { value: '100%', label: 'Verificável' },
    ],
  },
} as const

const CERT_STYLE = [
  { acronym: 'IDM', color: '#4DA3FF', icon: ClipboardList, skills: [FolderOpen, Settings, Users2, LineChart], slug: '/certifications/information-delivery-manager' },
  { acronym: 'BDM', color: '#2CD3AF', icon: Layers, skills: [Box, Wrench, Handshake, BadgeCheck], slug: '/certifications/bim-design-manager' },
  { acronym: 'BCM', color: '#FF8A4C', icon: HardHat, skills: [HardHat, Calendar, ShieldCheck, TrendingUp], slug: '/certifications/bim-construction-manager' },
]
const WHY_ICONS = [Globe, BarChart3, Rocket]
const STEP_ICONS = [UserCheck, FileText, Search, CreditCard, GraduationCap]
const TIP_ICONS = [Clock, BookMarked, School, MessageCircle]
const TIP_TILT = [-2, 1.5, 1, -1.5]

// Tarjeta con inclinación 3D según el cursor
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  const rx = useSpring(0, { stiffness: 180, damping: 18 })
  const ry = useSpring(0, { stiffness: 180, damping: 18 })
  return (
    <motion.div
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={(e) => {
        if (reduce) return
        const r = e.currentTarget.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 12)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12)
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0) }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function CertificationsPage({ locale }: Props) {
  const c = COPY[locale]
  const link = (path: string) => localizePath(path, locale)
  const registryPath = locale === 'es' ? '/certifications/registro' : '/certifications/registry'
  const reduce = useReducedMotion()

  const [openCert, setOpenCert] = useState(0)
  const [step, setStep] = useState(0)
  const [paused, setPaused] = useState(false)
  const [faqTab, setFaqTab] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const letterY1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120])
  const letterY2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -220])
  const letterY3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const letterYs = [letterY1, letterY2, letterY3]

  // Avance automático del proceso
  useEffect(() => {
    if (paused || reduce) return
    const id = setInterval(() => setStep((s) => (s + 1) % c.steps.length), 6000)
    return () => clearInterval(id)
  }, [paused, reduce, c.steps.length])

  const faqs = faqTab === 0 ? c.faq_general : c.faq_exam
  const cur = c.steps[step]
  const StepIcon = STEP_ICONS[step]

  return (
    <main className="bg-pmi-cream">
      {/* ═══ HERO · siglas gigantes ═════════════════════════════════════ */}
      <section ref={heroRef} className="relative flex min-h-[90vh] w-full items-center overflow-hidden bg-[#070B16] text-white">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
          {CERT_STYLE.map((s, i) => (
            <motion.span
              key={s.acronym}
              style={{
                y: letterYs[i],
                WebkitTextStroke: `1.5px ${s.color}`,
                color: 'transparent',
                left: ['58%', '70%', '46%'][i],
                top: ['6%', '34%', '58%'][i],
              }}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 0.55, x: 0 }}
              transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute hidden font-display text-[200px] font-semibold leading-none tracking-tighter lg:block xl:text-[260px]"
            >
              {s.acronym}
            </motion.span>
          ))}
        </div>

        <div className="relative mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <Eyebrow dark>{c.hero_badge}</Eyebrow>
          <h1 className="mt-8 max-w-3xl font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[84px]">
            <RevealWords text={c.hero_title} />
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-7 max-w-xl font-display text-xl text-pmi-cyan"
          >
            {c.hero_sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <Link
                href={link('/auth/signin')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-orange px-7 py-3.5 text-[15px] font-semibold text-pmi-dark transition-colors hover:bg-[#f08430]"
              >
                {c.hero_cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
            <a
              href="#programas"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-[15px] font-medium text-white/80 transition-colors hover:border-white/40 hover:bg-white/[0.05] hover:text-white"
            >
              {c.hero_cta2}
            </a>
          </motion.div>
        </div>
      </section>

      <Marquee items={[...c.certs.map((x) => x.title), 'ISO 19650', 'BIM']} />

      {/* ═══ PROGRAMAS · filas expandibles ══════════════════════════════ */}
      <section id="programas" className="w-full scroll-mt-20 bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal}>
            <Eyebrow>{c.programs_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">
              {c.programs_title}
            </h2>
          </motion.div>

          <ul className="mt-14 border-t border-pmi-dark/15">
            {c.certs.map((cert, i) => {
              const st = CERT_STYLE[i]
              const open = openCert === i
              return (
                <motion.li key={cert.title} {...reveal} transition={{ duration: 0.5, delay: i * 0.08 }} className="border-b border-pmi-dark/15">
                  <button
                    onClick={() => setOpenCert(open ? -1 : i)}
                    onMouseEnter={() => setOpenCert(i)}
                    aria-expanded={open}
                    className="group flex w-full items-center gap-4 py-6 text-left md:gap-8 md:py-8"
                  >
                    <span
                      className="w-[3.2ch] shrink-0 font-display text-5xl font-semibold leading-none tracking-tighter transition-all duration-500 md:w-[3.4ch] md:text-8xl"
                      style={{ color: open ? st.color : 'transparent', WebkitTextStroke: open ? '0px' : '1.5px #0F0524' }}
                    >
                      {st.acronym}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-xl font-semibold text-pmi-dark md:text-3xl">{cert.title}</span>
                      <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.18em] text-pmi-dark/50">{cert.level}</span>
                    </span>
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-pmi-dark/20 transition-all duration-300 ${open ? 'rotate-45 bg-pmi-dark text-white' : 'text-pmi-dark group-hover:bg-pmi-dark/5'}`}>
                      <Plus className="h-5 w-5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-10 md:grid-cols-12 md:pl-[calc(3.4ch+2rem)] md:pb-12">
                          <p className="text-[16px] leading-relaxed text-pmi-dark/70 md:col-span-5">{cert.desc}</p>
                          <div className="md:col-span-3">
                            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-pmi-dark/45">{c.skills}</div>
                            <div className="mt-4 flex gap-2">
                              {st.skills.map((Icon, k) => (
                                <motion.span
                                  key={k}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.1 + k * 0.07 }}
                                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-pmi-dark text-white"
                                >
                                  <Icon className="h-5 w-5" />
                                </motion.span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 sm:flex-row md:col-span-4 md:flex-col lg:flex-row lg:items-start">
                            <Link
                              href={link('/auth/signin')}
                              className="group/b inline-flex items-center justify-center gap-2 rounded-full bg-pmi-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pmi-purple"
                            >
                              {c.apply}
                              <ArrowRight className="h-4 w-4 transition-transform group-hover/b:translate-x-0.5" />
                            </Link>
                            <Link
                              href={link(st.slug)}
                              className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/25 px-6 py-3 text-sm font-semibold text-pmi-dark transition-colors hover:bg-pmi-dark/5"
                            >
                              {c.details}
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ═══ POR QUÉ · tarjetas 3D sobre oscuro ═════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#070B16] py-24 text-white md:py-32">
        <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow dark>{c.why_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] md:text-[52px]">{c.why_title}</h2>
          </motion.div>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {c.why.map((w, i) => {
              const Icon = WHY_ICONS[i]
              return (
                <motion.div key={w.title} {...reveal} transition={{ duration: 0.55, delay: i * 0.12 }}>
                  <TiltCard className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm lg:p-10">
                    <div className="flex items-center justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: ['#00A3C4', '#E87722', '#5B2D8E'][i] }}>
                        <Icon className="h-7 w-7 text-white" />
                      </span>
                      <span className="font-display text-5xl font-semibold tabular-nums text-white/10">0{i + 1}</span>
                    </div>
                    <h3 className="mt-10 font-display text-2xl font-semibold">{w.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/55">{w.desc}</p>
                  </TiltCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ PROCESO · stepper interactivo ══════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{c.process_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{c.process_title}</h2>
          </motion.div>

          <div
            className="mt-14 grid gap-8 lg:grid-cols-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <ol className="lg:col-span-5">
              {c.steps.map((s, i) => {
                const active = step === i
                const Icon = STEP_ICONS[i]
                return (
                  <li key={s.title}>
                    <button
                      onClick={() => setStep(i)}
                      aria-current={active ? 'step' : undefined}
                      className={`relative flex w-full items-center gap-4 overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors ${active ? 'bg-pmi-dark text-white' : 'hover:bg-pmi-cream'}`}
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${active ? 'bg-pmi-orange text-pmi-dark' : 'bg-pmi-cream text-pmi-dark'}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block text-[10px] font-semibold uppercase tracking-[0.2em] ${active ? 'text-white/50' : 'text-pmi-dark/40'}`}>
                          {c.step_label} 0{i + 1}
                        </span>
                        <span className="block font-display text-lg font-semibold">{s.title}</span>
                      </span>
                      {active && !reduce && !paused && (
                        <motion.span
                          key={`bar-${step}`}
                          className="absolute bottom-0 left-0 h-0.5 bg-pmi-orange"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 6, ease: 'linear' }}
                        />
                      )}
                    </button>
                    {i < c.steps.length - 1 && <span className="ml-[39px] block h-3 w-px bg-pmi-dark/15" aria-hidden />}
                  </li>
                )
              })}
            </ol>

            <div className="relative min-h-[360px] overflow-hidden rounded-3xl bg-pmi-cream p-8 lg:col-span-7 lg:p-12" aria-live="polite">
              <span className="pointer-events-none absolute -bottom-10 -right-4 select-none font-display text-[240px] font-semibold leading-none text-pmi-dark/[0.05]" aria-hidden>
                {step + 1}
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35 }}
                  className="relative"
                >
                  <StepIcon className="h-9 w-9 text-pmi-orange" />
                  <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight text-pmi-dark md:text-4xl">{cur.title}</h3>
                  <p className="mt-2 text-base font-medium text-pmi-dark/70">{cur.short}</p>
                  <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-pmi-dark/65">{cur.detail}</p>
                  {cur.bullets.length > 0 && (
                    <ul className="mt-6 space-y-2.5">
                      {cur.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2.5 text-[15px] text-pmi-dark/80">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                  {cur.metric && (
                    <div className="mt-8 flex items-end gap-4 border-t border-pmi-dark/15 pt-6">
                      <span className="font-display text-7xl font-semibold leading-none tracking-tighter text-pmi-dark">{cur.metric.value}</span>
                      <span className="max-w-[16rem] pb-2 text-sm leading-snug text-pmi-dark/60">{cur.metric.label}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ COMPARATIVA · tres fichas ══════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{c.compare_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{c.compare_title}</h2>
          </motion.div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {c.certs.map((cert, i) => {
              const st = CERT_STYLE[i]
              return (
                <motion.article
                  key={cert.title}
                  {...reveal}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  whileHover={reduce ? undefined : { y: -8 }}
                  className="group relative overflow-hidden rounded-3xl bg-white p-7 shadow-[0_1px_0_rgba(15,5,36,0.06)] transition-shadow hover:shadow-[0_28px_50px_-24px_rgba(15,5,36,0.35)] lg:p-8"
                >
                  <span className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: st.color }} />
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-5xl font-semibold tracking-tighter" style={{ color: st.color }}>{st.acronym}</span>
                    <st.icon className="h-6 w-6 text-pmi-dark/30" />
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-pmi-dark">{cert.title}</h3>
                  <dl className="mt-6 divide-y divide-pmi-dark/10 border-t border-pmi-dark/10">
                    {c.compare_rows.map((row) => (
                      <div key={row.label} className="py-3.5">
                        <dt className="text-[10px] font-semibold uppercase tracking-[0.2em] text-pmi-dark/45">{row.label}</dt>
                        <dd className="mt-1 text-[15px] font-medium text-pmi-dark">{row.values[i]}</dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={link(st.slug)}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pmi-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pmi-purple"
                  >
                    {c.compare_cta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ CONSEJOS · notas inclinadas ════════════════════════════════ */}
      <section className="w-full overflow-hidden bg-white py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <motion.div {...reveal} className="max-w-2xl">
            <Eyebrow>{c.tips_badge}</Eyebrow>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[52px]">{c.tips_title}</h2>
          </motion.div>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {c.tips.map((t, i) => {
              const Icon = TIP_ICONS[i]
              const bg = ['#FDE9D7', '#D8F1F6', '#E8DDF3', '#DDF3EC'][i]
              return (
                <motion.li
                  key={t.title}
                  initial={{ opacity: 0, y: 40, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: reduce ? 0 : TIP_TILT[i] }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduce ? undefined : { rotate: 0, y: -8, scale: 1.02 }}
                  className="rounded-2xl p-7 shadow-[0_18px_30px_-20px_rgba(15,5,36,0.4)]"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="h-7 w-7 text-pmi-dark" />
                  <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-pmi-dark">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-pmi-dark/70">{t.desc}</p>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ═══ RENOVACIÓN + REGISTRO ══════════════════════════════════════ */}
      <section className="w-full bg-pmi-cream py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div {...reveal} className="relative overflow-hidden rounded-3xl bg-[#070B16] p-9 text-white md:p-12">
            <div className="absolute inset-0" style={BLUEPRINT} aria-hidden />
            <motion.span
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
            >
              <RefreshCw className="h-7 w-7 text-pmi-cyan" />
            </motion.span>
            <h3 className="relative mt-8 font-display text-3xl font-semibold tracking-tight md:text-4xl">{c.renew_title}</h3>
            <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-white/60">{c.renew_desc}</p>
            <Link
              href={link('/contact')}
              className="group relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-pmi-dark transition-colors hover:bg-white/90"
            >
              {c.renew_cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.div {...reveal} transition={{ duration: 0.55, delay: 0.1 }} className="relative overflow-hidden rounded-3xl border border-pmi-dark/10 bg-white p-9 md:p-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pmi-orange">
              <Award className="h-7 w-7 text-pmi-dark" />
            </span>
            <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight text-pmi-dark md:text-4xl">{c.registry_title}</h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-pmi-dark/65">{c.registry_desc}</p>
            <Link
              href={link(registryPath)}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-pmi-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-pmi-purple"
            >
              {c.registry_cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══ FAQ · pestañas con subrayado animado ═══════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
          <motion.div {...reveal} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>{c.faq_badge}</Eyebrow>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-pmi-dark md:text-[48px]">{c.faq_title}</h2>
              <div className="mt-10 flex gap-6 border-b border-pmi-dark/15" role="tablist">
                {c.faq_tabs.map((tab, i) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={faqTab === i}
                    onClick={() => { setFaqTab(i); setOpenFaq(0) }}
                    className={`relative pb-3 font-display text-sm font-semibold transition-colors ${faqTab === i ? 'text-pmi-dark' : 'text-pmi-dark/45 hover:text-pmi-dark/70'}`}
                  >
                    {tab}
                    {faqTab === i && <motion.span layoutId="faq-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-pmi-orange" />}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.ul
                key={faqTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="border-t border-pmi-dark/15"
              >
                {faqs.map((f, i) => {
                  const open = openFaq === i
                  return (
                    <li key={f.q} className="border-b border-pmi-dark/15">
                      <button
                        onClick={() => setOpenFaq(open ? null : i)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="font-display text-lg font-semibold text-pmi-dark">{f.q}</span>
                        <ChevronDown className={`h-5 w-5 shrink-0 text-pmi-dark/50 transition-transform duration-300 ${open ? 'rotate-180 text-pmi-orange' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-pmi-dark/65">{f.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ══════════════════════════════════════════════════ */}
      <section className="w-full bg-pmi-orange text-pmi-dark">
        <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <motion.div {...reveal} className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <h2 className="font-display text-4xl font-semibold leading-[1.03] tracking-[-0.03em] sm:text-5xl lg:text-[68px]">
                {c.cta_title} <span className="underline decoration-pmi-dark decoration-4 underline-offset-[10px]">{c.cta_accent}</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-pmi-dark/80">{c.cta_desc}</p>
              <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <dd className="font-display text-4xl font-semibold tracking-tight"><CountUp value={s.value} /></dd>
                    <dt className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-pmi-dark/70">{s.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <Link
                href={link('/contact')}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-pmi-dark px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-black"
              >
                <FileBadge className="h-4 w-4" />
                {c.cta_primary}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={link('/contact')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-pmi-dark/50 px-7 py-4 text-[15px] font-semibold transition-colors hover:bg-pmi-dark/10"
              >
                <Mail className="h-4 w-4" />
                {c.cta_secondary}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
