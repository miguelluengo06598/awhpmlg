'use client';

import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Globe,
  Wrench,
  Cpu,
  CheckCircle2,
  Shield,
  BarChart3,
  FileText,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Download,
  FileCheck,
  Landmark,
  HardHat,
  Layers,
  ClipboardList,
  Search,
  Link2,
  Users,
  Route,
  Leaf,
  BadgeCheck,
  MessageSquare,
  Eye,
  Settings,
  TrendingUp,
  Target,
  Award,
  FolderOpen,
  MonitorPlay,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from '@/lib/useTranslation';

interface Props {
  locale: 'es' | 'en';
}

const GRID_BG: React.CSSProperties = {
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
  backgroundSize: '64px 64px',
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function StandardAccordion({ title, icon, color, children }: { title: string; icon: React.ReactNode; color: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-[#ddd]/60 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-6 text-left hover:bg-[#f9fbff]/50 transition-colors">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white shrink-0`}>{icon}</div>
        <span className="font-bold text-[#333] text-lg flex-1">{title}</span>
        <span className={`w-8 h-8 rounded-full border border-[#ddd] flex items-center justify-center transition-all duration-300 ${open ? 'bg-[#0066CC] border-[#0066CC] text-white' : 'text-[#333]/40'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-6 pb-6 pl-[5.5rem] text-[#333]/80 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ResourceAccordion({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-[#ddd]/60 bg-white overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#f9fbff]/50 transition-colors">
        <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0066CC]/10 flex items-center justify-center text-[#0066CC]">{icon}</span>
        <span className="font-bold text-[#333] flex-1">{title}</span>
        <span className={`w-8 h-8 rounded-full border border-[#ddd] flex items-center justify-center transition-all duration-300 ${open ? 'bg-[#0066CC] border-[#0066CC] text-white' : 'text-[#333]/40'}`}>
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 pb-6 pl-[4.5rem] text-[#333]/80 leading-relaxed">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function GuidesStandardsPage({ locale }: Props) {
  const { t, getLink } = useTranslation(locale);
  const isEs = locale === 'es';

  const guideFilter = 'all';

  const guides = [
    { title: isEs ? 'Implementación de Entorno CDE' : 'CDE Environment Implementation', desc: isEs ? 'Configuración paso a paso del Common Data Environment para proyectos BIM.' : 'Step-by-step configuration of the Common Data Environment for BIM projects.', format: 'PDF', size: '2.5 MB', icon: <FolderOpen className="w-6 h-6" /> },
    { title: isEs ? 'Gestión de Información BIM' : 'BIM Information Management', desc: isEs ? 'Protocolos y procedimientos para la gestión eficaz de la información en proyectos.' : 'Protocols and procedures for effective information management in projects.', format: 'PDF', size: '3.2 MB', icon: <FileText className="w-6 h-6" /> },
    { title: isEs ? 'Coordinación Interdisciplinar' : 'Interdisciplinary Coordination', desc: isEs ? 'Mejores prácticas para la coordinación entre disciplinas en proyectos BIM.' : 'Best practices for coordination between disciplines in BIM projects.', format: 'PDF', size: '2.8 MB', icon: <Users className="w-6 h-6" /> },
    { title: isEs ? 'Control de Calidad en BIM' : 'Quality Control in BIM', desc: isEs ? 'Auditoría y validación de modelos digitales según estándares internacionales.' : 'Audit and validation of digital models according to international standards.', format: 'PDF', size: '3.5 MB', icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: isEs ? 'Planificación 4D y 5D' : '4D and 5D Planning', desc: isEs ? 'Integración de tiempo y costos en modelos BIM para una gestión integral.' : 'Integration of time and costs in BIM models for comprehensive management.', format: 'PDF', size: '2.9 MB', icon: <BarChart3 className="w-6 h-6" /> },
    { title: isEs ? 'Transferencia Digital de Activos' : 'Digital Asset Transfer', desc: isEs ? 'Del diseño a la operación: entrega de información para facility management.' : 'From design to operation: information delivery for facility management.', format: 'PDF', size: '3.1 MB', icon: <ArrowRight className="w-6 h-6" /> },
  ];

  const phases = [
    { step: '01', title: isEs ? 'Diagnóstico' : 'Diagnosis', desc: isEs ? 'Evaluación de madurez BIM y necesidades específicas de la organización.' : 'BIM maturity assessment and specific organizational needs evaluation.', icon: <Search className="w-6 h-6" />, color: 'bg-[#0066CC]' },
    { step: '02', title: isEs ? 'Planificación' : 'Planning', desc: isEs ? 'Diseño de estrategia BIM alineada a objetivos y estándares internacionales.' : 'Design of BIM strategy aligned with objectives and international standards.', icon: <Target className="w-6 h-6" />, color: 'bg-[#0055aa]' },
    { step: '03', title: isEs ? 'Implementación' : 'Implementation', desc: isEs ? 'Despliegue de procesos, herramientas y formación del equipo.' : 'Deployment of processes, tools and team training.', icon: <Settings className="w-6 h-6" />, color: 'bg-[#004d99]' },
    { step: '04', title: isEs ? 'Monitoreo' : 'Monitoring', desc: isEs ? 'Seguimiento de indicadores y cumplimiento de estándares establecidos.' : 'Tracking of indicators and compliance with established standards.', icon: <Eye className="w-6 h-6" />, color: 'bg-[#4A9EFF]' },
    { step: '05', title: isEs ? 'Optimización' : 'Optimization', desc: isEs ? 'Mejora continua basada en resultados y evolución tecnológica.' : 'Continuous improvement based on results and technological evolution.', icon: <TrendingUp className="w-6 h-6" />, color: 'bg-[#0066CC]' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== 1. HERO ===== */}
      <section className="relative overflow-hidden py-28 md:py-36 lg:py-44 bg-[#060B18]">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute top-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full bg-pmi-blue/[0.07] blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl">
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-white/[0.06] text-pmi-cyan text-[11px] font-semibold tracking-widest uppercase mb-8 border border-white/[0.08]">
              {isEs ? 'Recursos Técnicos' : 'Technical Resources'}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.05]">
              {isEs ? 'Guías y Estándares' : 'Guides and Standards'}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl font-medium mb-4 text-white/80">
              {isEs ? 'Marco común para la implantación de metodologías BIM' : 'Common framework for BIM methodology implementation'}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-white/50 max-w-2xl mb-12 leading-relaxed">
              {isEs
                ? 'Referencias internacionales y herramientas especializadas para profesionales y organizaciones del sector AEC.'
                : 'International references and specialized tools for AEC sector professionals and organizations.'}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <button className="inline-flex items-center justify-center gap-3 text-base font-semibold rounded-full bg-white text-pmi-dark hover:bg-pmi-cream px-8 py-4 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
                <Download className="w-5 h-5" />
                {isEs ? 'Descargar Guías' : 'Download Guides'}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 2. INTRODUCCIÓN (3 puntos) ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Fundamentos' : 'Foundations'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#333]">
              {isEs ? 'Nuestro Enfoque en Estándares' : 'Our Standards Approach'}
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Globe className="w-14 h-14" />, title: isEs ? 'Referencias Internacionales' : 'International References', desc: isEs ? 'Basadas en ISO 19650 y otros estándares reconocidos globalmente por la industria de la construcción.' : 'Based on ISO 19650 and other globally recognized standards by the construction industry.' },
              { icon: <Wrench className="w-14 h-14" />, title: isEs ? 'Herramientas Claras' : 'Clear Tools', desc: isEs ? 'Marcos estructurados para profesionales y organizaciones que buscan implementar BIM con rigor.' : 'Structured frameworks for professionals and organizations seeking to implement BIM with rigor.' },
              { icon: <Cpu className="w-14 h-14" />, title: isEs ? 'Transformación Digital' : 'Digital Transformation', desc: isEs ? 'Recursos especializados para procesos de transformación digital en el sector AEC.' : 'Specialized resources for digital transformation processes in the AEC sector.' },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group p-8 rounded-2xl bg-white border border-[#ddd] shadow-sm hover:-translate-y-[5px] hover:shadow-xl transition-all duration-300">
                <div className="w-[100px] h-[100px] rounded-2xl bg-[#f0f4ff] flex items-center justify-center text-[#0066CC] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-[#333] mb-3">{card.title}</h3>
                <p className="text-[#333]/80 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 3. DESCRIPCIÓN + 3 BENEFICIOS ===== */}
      <section className="py-24 bg-[#f9fbff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333] text-center mb-14">
              {isEs ? '¿Por Qué Estándares?' : 'Why Standards?'}
            </motion.h2>
            <div className="space-y-8 mb-16">
              <motion.div variants={fadeInUp} className="relative pl-6 border-l-4 border-[#0066CC]">
                <p className="text-lg text-[#333] leading-[1.8]">
                  {isEs
                    ? 'Los estándares internacionales son el pilar fundamental sobre el que se construye una práctica BIM efectiva. Proporcionan un lenguaje común, procesos estructurados y criterios de calidad que permiten a las organizaciones trabajar de forma coordinada, reducir errores y maximizar el valor de la información generada durante todo el ciclo de vida del proyecto.'
                    : 'International standards are the fundamental pillar upon which effective BIM practice is built. They provide a common language, structured processes and quality criteria that enable organizations to work in a coordinated manner, reduce errors and maximize the value of information generated throughout the project lifecycle.'}
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="relative pl-6 border-l-4 border-[#0066CC]">
                <p className="text-lg text-[#333] leading-[1.8]">
                  {isEs
                    ? 'La adopción de estándares como ISO 19650 permite a las empresas del sector AEC mejorar la calidad de sus entregables, garantizar la trazabilidad de la información, mitigar riesgos y establecer procesos de colaboración más eficientes entre todos los agentes involucrados en un proyecto constructivo.'
                    : 'The adoption of standards such as ISO 19650 allows AEC sector companies to improve the quality of their deliverables, guarantee information traceability, mitigate risks and establish more efficient collaboration processes between all agents involved in a construction project.'}
                </p>
              </motion.div>
            </div>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: <Award className="w-8 h-8" />, title: isEs ? 'Mejora de Calidad' : 'Quality Improvement', desc: isEs ? 'Mejor calidad y trazabilidad en proyectos constructivos.' : 'Better quality and traceability in construction projects.' },
              { icon: <Shield className="w-8 h-8" />, title: isEs ? 'Reducción de Riesgos' : 'Risk Reduction', desc: isEs ? 'Mitigar riesgos y optimizar procesos de forma continua.' : 'Mitigate risks and optimize processes continuously.' },
              { icon: <BarChart3 className="w-8 h-8" />, title: isEs ? 'Mayor Eficiencia' : 'Greater Efficiency', desc: isEs ? 'Mejora de coordinación e interoperabilidad entre equipos.' : 'Improved coordination and interoperability between teams.' },
            ].map((b, idx) => (
              <motion.div key={idx} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-6 rounded-xl bg-white border border-[#ddd]/50 shadow-sm text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 mx-auto rounded-xl bg-[#f0f4ff] flex items-center justify-center text-[#0066CC] mb-4">
                  {b.icon}
                </div>
                <h3 className="font-bold text-[#333] mb-2">{b.title}</h3>
                <p className="text-sm text-[#333]/70">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 4. ESTÁNDARES PRINCIPALES ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Marco Normativo' : 'Regulatory Framework'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Estándares de Referencia' : 'Reference Standards'}
            </motion.h2>
          </motion.div>
          <div className="space-y-6">
            <StandardAccordion
              title="ISO 19650"
              icon={<FileText className="w-6 h-6" />}
              color="bg-[#0066CC]"
            >
              <div className="space-y-3">
                <p>{isEs ? 'Norma internacional para gestión de información utilizando BIM. Establece principios y requisitos para la gestión eficaz de la información a lo largo de todo el ciclo de vida de los activos construidos.' : 'International standard for information management using BIM. Establishes principles and requirements for effective information management throughout the entire lifecycle of built assets.'}</p>
                <ul className="space-y-2 mt-3">
                  {[
                    isEs ? 'ISO 19650-1: Conceptos y principios generales' : 'ISO 19650-1: Concepts and general principles',
                    isEs ? 'ISO 19650-2: Entrega y ejecución del proyecto' : 'ISO 19650-2: Project delivery and execution',
                    isEs ? 'ISO 19650-3: Fase operacional del activo' : 'ISO 19650-3: Operational phase of the asset',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#333]/80">
                      <ChevronRight className="w-4 h-4 text-[#0066CC]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0066CC] text-white text-sm font-semibold hover:bg-[#0055aa] transition-colors">
                  {isEs ? 'Conocer más' : 'Learn more'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </StandardAccordion>

            <StandardAccordion
              title="PAS 1192"
              icon={<Landmark className="w-6 h-6" />}
              color="bg-[#00AA88]"
            >
              <div className="space-y-3">
                <p>{isEs ? 'Estándar británico para la gestión colaborativa de información en proyectos BIM. Sirve como base para muchos de los requisitos de ISO 19650 y es ampliamente utilizado en el Reino Unido y otros países de habla inglesa.' : 'British standard for collaborative information management in BIM projects. Serves as the basis for many ISO 19650 requirements and is widely used in the UK and other English-speaking countries.'}</p>
                <ul className="space-y-2 mt-3">
                  {[
                    isEs ? 'PAS 1192-2: Especificación para compartir información en un contexto colaborativo' : 'PAS 1192-2: Specification for information sharing in a collaborative context',
                    isEs ? 'PAS 1192-3: Información en fase operativa de los activos' : 'PAS 1192-3: Operational phase information of assets',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#333]/80">
                      <ChevronRight className="w-4 h-4 text-[#00AA88]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00AA88] text-white text-sm font-semibold hover:bg-[#00997a] transition-colors">
                  {isEs ? 'Conocer más' : 'Learn more'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </StandardAccordion>

            <StandardAccordion
              title={isEs ? 'Estándares AEC' : 'AEC Standards'}
              icon={<HardHat className="w-6 h-6" />}
              color="bg-[#FF6B35]"
            >
              <div className="space-y-3">
                <p>{isEs ? 'Estándares sectoriales de construcción reconocidos internacionalmente que complementan el marco BIM y abordan aspectos específicos de diferentes mercados geográficos.' : 'Internationally recognized construction sector standards that complement the BIM framework and address specific aspects of different geographic markets.'}</p>
                <ul className="space-y-2 mt-3">
                  {[
                    isEs ? 'CoD (2011) - USA: Estándares para operaciones digitales en construcción' : 'CoD (2011) - USA: Standards for digital operations in construction',
                    isEs ? 'NYC-DDC (2012) - Nueva York: Directrices de diseño y construcción digital' : 'NYC-DDC (2012) - New York: Digital design and construction guidelines',
                    isEs ? 'Otros estándares nacionales e internacionales relacionados' : 'Other related national and international standards',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#333]/80">
                      <ChevronRight className="w-4 h-4 text-[#FF6B35]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF6B35] text-white text-sm font-semibold hover:bg-[#e55a2b] transition-colors">
                  {isEs ? 'Explorar' : 'Explore'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </StandardAccordion>
          </div>
        </div>
      </section>

      {/* ===== 5. GUÍAS DISPONIBLES ===== */}
      <section className="py-24 bg-[#f9fbff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Descargas' : 'Downloads'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Nuestras Guías Técnicas' : 'Our Technical Guides'}
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((guide, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-white border border-[#ddd]/50 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] flex items-center justify-center text-[#0066CC] mb-4 group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-300">
                  {guide.icon}
                </div>
                <h3 className="font-bold text-[#333] text-lg mb-2">{guide.title}</h3>
                <p className="text-sm text-[#333]/70 leading-relaxed mb-4 flex-1">{guide.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#ddd]/40">
                  <div className="flex items-center gap-3 text-xs text-[#333]/50">
                    <span className="px-2 py-0.5 rounded bg-[#f9fbff] font-medium">{guide.format}</span>
                    <span>{guide.size}</span>
                  </div>
                  <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0066CC] hover:text-[#0055aa] transition-colors">
                    <Download className="w-4 h-4" />
                    {isEs ? 'Descargar' : 'Download'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 6. 6 BENEFICIOS DE APLICAR ESTÁNDARES ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Impacto' : 'Impact'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Ventajas de Usar Nuestros Estándares' : 'Advantages of Using Our Standards'}
            </motion.h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Link2 className="w-8 h-8" />, title: isEs ? 'Interoperabilidad' : 'Interoperability', desc: isEs ? 'Sistemas y herramientas compatibles para un flujo de trabajo sin fricciones.' : 'Compatible systems and tools for a frictionless workflow.' },
              { icon: <Route className="w-8 h-8" />, title: isEs ? 'Trazabilidad' : 'Traceability', desc: isEs ? 'Seguimiento completo de la información a lo largo de todo el ciclo de vida.' : 'Complete tracking of information throughout the entire lifecycle.' },
              { icon: <Users className="w-8 h-8" />, title: isEs ? 'Colaboración' : 'Collaboration', desc: isEs ? 'Mejora de comunicación y coordinación entre equipos multidisciplinares.' : 'Improved communication and coordination between multidisciplinary teams.' },
              { icon: <Leaf className="w-8 h-8" />, title: isEs ? 'Sostenibilidad' : 'Sustainability', desc: isEs ? 'Procesos más eficientes, reducción de residuos y menor impacto ambiental.' : 'More efficient processes, waste reduction and lower environmental impact.' },
              { icon: <BadgeCheck className="w-8 h-8" />, title: isEs ? 'Cumplimiento' : 'Compliance', desc: isEs ? 'Adherencia a normativas internacionales y requisitos contractuales.' : 'Adherence to international regulations and contractual requirements.' },
              { icon: <Shield className="w-8 h-8" />, title: isEs ? 'Confianza' : 'Trust', desc: isEs ? 'Mayor confianza con clientes, proveedores y partes interesadas.' : 'Greater trust with clients, suppliers and stakeholders.' },
            ].map((b, idx) => (
              <motion.div key={idx} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group p-6 rounded-xl bg-[#f9fbff] border border-[#ddd]/40 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center text-[#0066CC] mb-4 shadow-sm group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-300">
                  {b.icon}
                </div>
                <h3 className="font-bold text-[#333] text-lg mb-2">{b.title}</h3>
                <p className="text-sm text-[#333]/70 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 7. RECURSOS ADICIONALES ===== */}
      <section className="py-24 bg-[#f9fbff]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-12">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Más Recursos' : 'More Resources'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Recursos Especializados' : 'Specialized Resources'}
            </motion.h2>
          </motion.div>
          <div className="space-y-4">
            <ResourceAccordion
              icon={<FileCheck className="w-5 h-5" />}
              title={isEs ? 'Plantillas Técnicas' : 'Technical Templates'}
            >
              <div className="space-y-3">
                <p>{isEs ? 'Plantillas listas para usar en proyectos BIM: BEP, EIR, MIDP, TIDP y otros documentos de gestión.' : 'Ready-to-use templates for BIM projects: BEP, EIR, MIDP, TIDP and other management documents.'}</p>
                <div className="flex flex-wrap gap-2">
                  {['BEP Template', 'EIR Template', 'MIDP Template'].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0f4ff] text-[#0066CC] text-xs font-semibold cursor-pointer hover:bg-[#0066CC] hover:text-white transition-colors">
                      <Download className="w-3 h-3" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </ResourceAccordion>
            <ResourceAccordion
              icon={<MonitorPlay className="w-5 h-5" />}
              title={isEs ? 'Webinars y Sesiones Técnicas' : 'Webinars and Technical Sessions'}
            >
              <div className="space-y-3">
                <p>{isEs ? 'Grabaciones de sesiones técnicas sobre implementación BIM, casos de estudio y buenas prácticas.' : 'Recordings of technical sessions on BIM implementation, case studies and best practices.'}</p>
                <Link href={getLink('/formation')} className="inline-flex items-center gap-2 text-[#0066CC] font-semibold hover:underline text-sm">
                  {isEs ? 'Ver formación disponible' : 'View available training'} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ResourceAccordion>
            <ResourceAccordion
              icon={<BookOpen className="w-5 h-5" />}
              title={isEs ? 'Documentación Complementaria' : 'Complementary Documentation'}
            >
              <div className="space-y-3">
                <p>{isEs ? 'Documentos de referencia, whitepapers y artículos técnicos sobre metodología BIM y gestión de la información.' : 'Reference documents, whitepapers and technical articles on BIM methodology and information management.'}</p>
              </div>
            </ResourceAccordion>
            <ResourceAccordion
              icon={<ExternalLink className="w-5 h-5" />}
              title={isEs ? 'Referencias Normativas' : 'Regulatory References'}
            >
              <div className="space-y-3">
                <p>{isEs ? 'Enlaces a documentos originales de ISO, BSI y otros organismos de normalización internacional.' : 'Links to original documents from ISO, BSI and other international standardization bodies.'}</p>
                <div className="flex flex-wrap gap-2">
                  {['ISO.org', 'BSI Group', 'buildingSMART'].map((link) => (
                    <span key={link} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ddd] text-[#333] text-xs font-medium cursor-pointer hover:border-[#0066CC] hover:text-[#0066CC] transition-colors">
                      <ExternalLink className="w-3 h-3" /> {link}
                    </span>
                  ))}
                </div>
              </div>
            </ResourceAccordion>
          </div>
        </div>
      </section>

      {/* ===== 8. PROCESOS DE TRANSFORMACIÓN (Timeline) ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer} className="text-center mb-16">
            <motion.span variants={fadeInUp} className="inline-block text-[#0066CC] font-semibold text-sm tracking-wider uppercase mb-3">
              {isEs ? 'Metodología' : 'Methodology'}
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-[#333]">
              {isEs ? 'Avanzar en Transformación Digital' : 'Advance in Digital Transformation'}
            </motion.h2>
          </motion.div>
          <div className="relative">
            <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-1 bg-[#0066CC]/15" />
            <div className="md:hidden absolute left-5 top-0 bottom-0 w-1 bg-[#0066CC]/15" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-6 relative">
              {phases.map((phase, idx) => (
                <motion.div key={idx} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative flex md:flex-col items-start md:items-center gap-5 md:gap-0">
                  <div className={`w-10 h-10 shrink-0 rounded-full ${phase.color} flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-900/20 relative z-10`}>
                    {phase.step}
                  </div>
                  <div className="md:mt-5 md:text-center">
                    <h3 className="font-bold text-[#333] text-base">{phase.title}</h3>
                    <p className="text-sm text-[#333]/60 mt-1 max-w-[200px] mx-auto">{phase.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 9. CTA FINAL ===== */}
      <section className="relative overflow-hidden py-24 bg-[#060B18]">
        <div className="absolute inset-0 opacity-[0.035]" style={GRID_BG} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-pmi-blue/[0.06] blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} variants={staggerContainer}>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1]">
              {isEs ? '¿Tu Organización Necesita Implementar Estándares?' : 'Does Your Organization Need to Implement Standards?'}
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
              {isEs ? 'Contamos con expertos para guiarte en el proceso de adopción de metodologías BIM y estándares internacionales.' : 'We have experts to guide you in the adoption of BIM methodologies and international standards.'}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={getLink('/contact')} className="inline-flex items-center justify-center gap-3 text-base font-semibold rounded-full bg-white text-pmi-dark hover:bg-pmi-cream px-8 py-4 transition-all duration-300 shadow-lg hover:-translate-y-0.5">
                {isEs ? 'Contacta con Nosotros' : 'Contact Us'} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={getLink('/certifications')} className="inline-flex items-center justify-center gap-3 text-base font-semibold rounded-full border border-white/20 text-white hover:bg-white/10 px-8 py-4 transition-all duration-300 hover:-translate-y-0.5">
                {isEs ? 'Ver Certificaciones' : 'View Certifications'}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
