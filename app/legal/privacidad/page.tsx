import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Política de Privacidad — AECMI',
  description: 'Política de privacidad de AECMI. Protección de datos personales conforme al GDPR y LOPDGDD.',
};

const sections = [
  {
    id: 'introduccion',
    title: 'Introducción',
    content: (
      <>
        <p>En AECMI, valoramos tu privacidad y estamos comprometidos con proteger tus datos personales. Esta Política de Privacidad describe cómo recopilamos, utilizamos, almacenamos y protegemos la información que nos proporcionas cuando utilizas nuestro sitio web, servicios de certificación, formación y cualquier otro servicio relacionado.</p>
        <p>Al acceder y utilizar nuestros servicios, aceptas las prácticas descritas en esta política. Si no estás de acuerdo con alguno de los términos aquí expuestos, te recomendamos no utilizar nuestros servicios.</p>
        <p>Esta política se ajusta al Reglamento General de Protección de Datos (GDPR) de la Unión Europea y a la Ley Orgánica de Protección de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD) de España.</p>
      </>
    ),
  },
  {
    id: 'responsable',
    title: '1. Responsable del Tratamiento',
    content: (
      <>
        <p><strong>Identidad:</strong> AECMI — Organización Internacional de Certificación BIM</p>
        <p><strong>Dirección postal:</strong> Madrid, España</p>
        <p><strong>Correo electrónico:</strong> <a href="mailto:privacidad@aecmi.com" className="text-[#0066CC] hover:underline">privacidad@aecmi.com</a></p>
        <p><strong>Actividad principal:</strong> Certificación de competencias BIM, formación especializada e investigación aplicada al sector AEC (Arquitectura, Ingeniería y Construcción).</p>
        <p>Para cualquier consulta relacionada con la protección de datos, puedes contactar con nuestro Delegado de Protección de Datos (DPD) a través del correo electrónico indicado.</p>
      </>
    ),
  },
  {
    id: 'datos-recopilados',
    title: '2. Datos que Recopilamos',
    content: (
      <>
        <p>Podemos recopilar y tratar los siguientes tipos de datos personales:</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.1 Datos de registro y contacto</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nombre y apellidos</li>
          <li>Dirección de correo electrónico</li>
          <li>Número de teléfono</li>
          <li>Dirección postal</li>
          <li>País de residencia</li>
          <li>Empresa u organización a la que perteneces</li>
          <li>Cargo o posición profesional</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.2 Datos de navegación</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Dirección IP</li>
          <li>Tipo de navegador y sistema operativo</li>
          <li>Páginas visitadas y tiempo de navegación</li>
          <li>Fecha y hora de acceso</li>
          <li>Origen de la visita (referrer)</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.3 Datos de certificación</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Historial académico y profesional</li>
          <li>Experiencia en proyectos BIM</li>
          <li>Resultados de exámenes y evaluaciones</li>
          <li>Certificaciones obtenidas y su vigencia</li>
          <li>Documentación de soporte (CV, referencias)</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.4 Datos de cookies y tecnologías similares</h3>
        <p>Consulta nuestra <a href="/legal/cookies" className="text-[#0066CC] hover:underline">Política de Cookies</a> para información detallada sobre el uso de cookies y tecnologías de seguimiento.</p>
      </>
    ),
  },
  {
    id: 'base-legal',
    title: '3. Base Legal del Tratamiento',
    content: (
      <>
        <p>El tratamiento de tus datos personales se fundamenta en una o más de las siguientes bases legales:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Consentimiento:</strong> Cuando nos proporcionas tus datos de forma voluntaria para recibir información, solicitar certificaciones o registrarte en nuestros servicios.</li>
          <li><strong>Ejecución de un contrato:</strong> Para gestionar tu solicitud de certificación, formalizar la relación contractual y prestar los servicios contratados.</li>
          <li><strong>Obligación legal:</strong> Para cumplir con obligaciones fiscales, contables y regulatorias aplicables a nuestra actividad.</li>
          <li><strong>Intereses legítimos:</strong> Para mejorar nuestros servicios, garantizar la seguridad de nuestras plataformas, prevenir fraudes y realizar análisis estadísticos anonimizados.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'uso-datos',
    title: '4. Cómo Utilizamos tus Datos',
    content: (
      <>
        <p>Tus datos personales son utilizados para las siguientes finalidades:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Gestión de certificaciones:</strong> Procesar solicitudes, evaluar elegibilidad, programar exámenes, emitir certificados y gestionar renovaciones.</li>
          <li><strong>Comunicación:</strong> Enviar información sobre tus certificaciones, recordatorios de renovación, actualizaciones de normativas y comunicaciones operativas.</li>
          <li><strong>Soporte al cliente:</strong> Atender consultas, resolver incidencias y proporcionar asistencia técnica.</li>
          <li><strong>Mejora de servicios:</strong> Analizar el uso de nuestros servicios para identificar áreas de mejora y desarrollar nuevos productos formativos.</li>
          <li><strong>Marketing (con consentimiento):</strong> Enviar newsletters, información sobre eventos, cursos y servicios relacionados con BIM, siempre que hayas dado tu consentimiento explícito.</li>
          <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales, responder a requerimientos de autoridades y ejercer o defender derechos en procedimientos judiciales.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'comparticion',
    title: '5. Compartición de Datos',
    content: (
      <>
        <p>AECMI no vende, alquila ni comercializa tus datos personales a terceros. No obstante, podemos compartir información en los siguientes supuestos:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Proveedores de servicios:</strong> Empresas que nos prestan servicios de hosting, gestión de correo electrónico, plataformas de exámenes online y herramientas de análisis. Estos proveedores actúan como encargados del tratamiento bajo contrato y garantías adecuadas.</li>
          <li><strong>Instituciones colaboradoras:</strong> Universidades y centros de formación acreditados con los que mantenemos acuerdos, únicamente cuando sea necesario para la validación académica de certificaciones.</li>
          <li><strong>Organismos reguladores:</strong> Autoridades competentes cuando exista una obligación legal o requerimiento formal.</li>
          <li><strong>Transferencias internacionales:</strong> En caso de que algún proveedor de servicios esté ubicado fuera del Espacio Económico Europeo (EEE), garantizamos que se aplican las salvaguardias apropiadas, como Cláusulas Contractuales Tipo aprobadas por la Comisión Europea.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'derechos',
    title: '6. Derechos de los Usuarios',
    content: (
      <>
        <p>Como titular de los datos, tienes los siguientes derechos reconocidos por el GDPR y la LOPDGDD:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Derecho de acceso:</strong> Obtener confirmación sobre si estamos tratando tus datos personales y, en tal caso, acceder a ellos.</li>
          <li><strong>Derecho de rectificación:</strong> Solicitar la corrección de datos inexactos o la completación de datos incompletos.</li>
          <li><strong>Derecho de supresión ("derecho al olvido"):</strong> Solicitar la eliminación de tus datos cuando ya no sean necesarios para los fines para los que fueron recopilados, o cuando retires tu consentimiento.</li>
          <li><strong>Derecho a la limitación del tratamiento:</strong> Solicitar la restricción del tratamiento de tus datos en determinadas circunstancias.</li>
          <li><strong>Derecho a la portabilidad:</strong> Recibir tus datos en un formato estructurado, de uso común y lectura mecánica, y transmitirlos a otro responsable del tratamiento.</li>
          <li><strong>Derecho de oposición:</strong> Oponerte al tratamiento de tus datos basado en intereses legítimos, incluyendo la elaboración de perfiles.</li>
          <li><strong>Derecho a no ser objeto de decisiones automatizadas:</strong> Incluida la elaboración de perfiles, que produzcan efectos jurídicos significativos.</li>
        </ul>
        <p className="mt-4">Para ejercer cualquiera de estos derechos, envía una solicitud por escrito a <a href="mailto:privacidad@aecmi.com" className="text-[#0066CC] hover:underline">privacidad@aecmi.com</a>, incluyendo una copia de tu documento de identidad. Responderemos en un plazo máximo de 30 días.</p>
        <p>También tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD) si consideras que el tratamiento de tus datos vulnera la normativa aplicable.</p>
      </>
    ),
  },
  {
    id: 'seguridad',
    title: '7. Seguridad de la Información',
    content: (
      <>
        <p>Implementamos medidas técnicas y organizativas apropiadas para garantizar un nivel de seguridad adecuado al riesgo del tratamiento de datos personales:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Encriptación:</strong> Uso de protocolos SSL/TLS para la transmisión de datos. Información sensible encriptada en reposo.</li>
          <li><strong>Control de acceso:</strong> Sistemas de autenticación robustos, contraseñas seguras y políticas de acceso basadas en roles.</li>
          <li><strong>Auditorías periódicas:</strong> Revisiones regulares de seguridad, análisis de vulnerabilidades y pruebas de penetración.</li>
          <li><strong>Formación del personal:</strong> Capacitación continua en materia de protección de datos y buenas prácticas de seguridad.</li>
          <li><strong>Copias de seguridad:</strong> Realización de backups periódicos para garantizar la disponibilidad y recuperación de la información.</li>
          <li><strong>Registro de incidentes:</strong> Mantenemos un registro de brechas de seguridad y notificamos a la autoridad de control y a los afectados cuando sea procedente.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'retencion',
    title: '8. Retención de Datos',
    content: (
      <>
        <p>Conservamos tus datos personales únicamente durante el tiempo necesario para cumplir con las finalidades para las que fueron recopilados, así como para cumplir con obligaciones legales aplicables:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Datos de registro de usuarios:</strong> Mientras mantengas una cuenta activa en nuestras plataformas. Tras la baja, durante el plazo legalmente establecido (generalmente 5 años).</li>
          <li><strong>Datos de certificación:</strong> Durante la vigencia de la certificación y los períodos de renovación correspondientes, más el tiempo necesario para acreditar la emisión histórica.</li>
          <li><strong>Datos de solicitudes no aprobadas:</strong> Durante 2 años desde la resolución de la solicitud.</li>
          <li><strong>Datos de comunicaciones comerciales:</strong> Hasta que retires tu consentimiento o solicites la baja.</li>
          <li><strong>Datos de cookies:</strong> De acuerdo con lo establecido en nuestra Política de Cookies.</li>
        </ul>
        <p className="mt-4">Una vez finalizado el plazo de conservación, los datos se eliminan de forma segura o se anonimizan para fines estadísticos.</p>
      </>
    ),
  },
  {
    id: 'contacto',
    title: '9. Contacto de Privacidad',
    content: (
      <>
        <p>Para cualquier consulta, solicitud o reclamación relacionada con la protección de datos personales, puedes contactar con nosotros a través de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Correo electrónico:</strong> <a href="mailto:privacidad@aecmi.com" className="text-[#0066CC] hover:underline">privacidad@aecmi.com</a></li>
          <li><strong>Dirección postal:</strong> AECMI — Delegado de Protección de Datos, Madrid, España</li>
          <li><strong>Formulario de contacto:</strong> Disponible en nuestra página de <a href="/contact" className="text-[#0066CC] hover:underline">contacto</a></li>
        </ul>
        <p className="mt-4">Nos comprometemos a responder a todas las solicitudes en un plazo máximo de 30 días naturales.</p>
      </>
    ),
  },
  {
    id: 'cambios',
    title: '10. Cambios en la Política de Privacidad',
    content: (
      <>
        <p>AECMI se reserva el derecho de modificar esta Política de Privacidad en cualquier momento para adaptarla a novedades legislativas, cambios en nuestros servicios o mejoras en nuestras prácticas de protección de datos.</p>
        <p>Cuando realicemos cambios significativos, te lo notificaremos a través de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Un aviso destacado en nuestra página web</li>
          <li>Un correo electrónico a la dirección asociada a tu cuenta</li>
          <li>Una notificación en tu panel de usuario, si procede</li>
        </ul>
        <p className="mt-4">Te recomendamos revisar periódicamente esta política para mantenerte informado sobre cómo protegemos tu información. El uso continuado de nuestros servicios después de cualquier modificación constituirá la aceptación de los nuevos términos.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="es"
      title="Política de Privacidad"
      subtitle="Compromiso con la protección de tus datos personales"
      lastUpdated="15 de enero de 2025"
      sections={sections}
      type="privacy"
    />
  );
}
