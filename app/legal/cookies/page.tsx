import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Política de Cookies — AECMI',
  description: 'Política de cookies de AECMI. Información sobre el uso de cookies y tecnologías de seguimiento en nuestro sitio web.',
};

const sections = [
  {
    id: 'introduccion',
    title: 'Introducción',
    content: (
      <>
        <p>En AECMI, utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web, analizar el tráfico y personalizar el contenido. Esta Política de Cookies explica qué son las cookies, cómo las utilizamos, qué tipos de cookies empleamos y cómo puedes gestionar tus preferencias.</p>
        <p>Al continuar navegando por nuestro sitio web sin cambiar la configuración de cookies, entendemos que consientes el uso de cookies conforme a lo establecido en esta política.</p>
      </>
    ),
  },
  {
    id: 'que-son',
    title: '1. ¿Qué son las Cookies?',
    content: (
      <>
        <p>Una cookie es un pequeño archivo de texto que se almacena en tu dispositivo (ordenador, tableta, teléfono móvil) cuando visitas un sitio web. Las cookies permiten que el sitio web recuerde tus acciones y preferencias durante un período de tiempo, de modo que no tengas que volver a introducirlas cada vez que regreses al sitio o navegues entre páginas.</p>
        <p>Las cookies pueden ser:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Cookies propias:</strong> Enviadas y gestionadas directamente por AECMI.</li>
          <li><strong>Cookies de terceros:</strong> Enviadas por dominios externos que prestan servicios en nuestro sitio (por ejemplo, análisis, publicidad, redes sociales).</li>
          <li><strong>Cookies de sesión:</strong> Se eliminan automáticamente cuando cierras el navegador.</li>
          <li><strong>Cookies persistentes:</strong> Permanecen en tu dispositivo durante un período de tiempo determinado o hasta que las elimines manualmente.</li>
        </ul>
        <p className="mt-4">Además de las cookies, utilizamos otras tecnologías de seguimiento similares como web beacons, píxeles de seguimiento y local storage para recopilar información sobre tu navegación.</p>
      </>
    ),
  },
  {
    id: 'cookies-utilizadas',
    title: '2. Cookies que Utilizamos',
    content: (
      <>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.1 Cookies Necesarias (Técnicas)</h3>
        <p>Estas cookies son esenciales para el funcionamiento del sitio web y no pueden desactivarse en nuestros sistemas. Suelen establecerse solo en respuesta a acciones realizadas por ti, como configurar tus preferencias de privacidad, iniciar sesión o completar formularios.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Autenticación de usuarios</li>
          <li>Seguridad del sitio (prevención de fraudes)</li>
          <li>Preferencias de sesión e idioma</li>
          <li>Funcionalidades básicas de navegación</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.2 Cookies de Análisis (Estadísticas)</h3>
        <p>Estas cookies nos permiten contar las visitas y fuentes de tráfico para poder medir y mejorar el rendimiento de nuestro sitio web. Nos ayudan a saber qué páginas son las más y las menos populares y a entender cómo se mueven los visitantes por el sitio.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Google Analytics 4: análisis de tráfico y comportamiento de usuarios</li>
          <li>Seguimiento de páginas vistas y tiempo de permanencia</li>
          <li>Análisis de orígenes de tráfico (orgánico, directo, referido)</li>
          <li>Métricas de rendimiento del sitio</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.3 Cookies de Marketing y Publicidad</h3>
        <p>Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas por esas empresas para construir un perfil de tus intereses y mostrarte anuncios relevantes en otros sitios web.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Publicidad personalizada basada en intereses</li>
          <li>Seguimiento de conversiones de campañas</li>
          <li>Retargeting y remarketing</li>
          <li>Limitación de frecuencia de anuncios</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.4 Cookies de Redes Sociales</h3>
        <p>Estas cookies permiten la integración con plataformas de redes sociales (LinkedIn, Twitter/X, YouTube) y te permiten compartir contenido directamente desde nuestro sitio web.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Botones de compartir contenido</li>
          <li>Visualización de feeds sociales incrustados</li>
          <li>Inicio de sesión mediante perfiles sociales</li>
        </ul>
      </>
    ),
  },
  {
    id: 'consentimiento',
    title: '3. Consentimiento de Cookies',
    content: (
      <>
        <p>Cuando accedes por primera vez a nuestro sitio web, se te muestra un banner de cookies que te informa sobre el uso de cookies y te solicita tu consentimiento para aquellas que no sean estrictamente necesarias.</p>
        <p>Tienes las siguientes opciones:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Aceptar todas:</strong> Consientes el uso de todas las categorías de cookies descritas en esta política.</li>
          <li><strong>Rechazar opcionales:</strong> Solo se utilizan las cookies necesarias para el funcionamiento del sitio.</li>
          <li><strong>Configurar preferencias:</strong> Seleccionar de forma granular qué categorías de cookies aceptas.</li>
        </ul>
        <p className="mt-4">Tu consentimiento se almacena durante 12 meses, tras los cuales se te volverá a solicitar. Puedes modificar tus preferencias en cualquier momento utilizando el enlace de gestión de cookies disponible en el pie de página de nuestro sitio.</p>
      </>
    ),
  },
  {
    id: 'gestion-cookies',
    title: '4. Gestión de Cookies',
    content: (
      <>
        <p>Puedes controlar y gestionar las cookies de diversas formas:</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.1 Desde nuestro panel de preferencias</h3>
        <p>Haz clic en el enlace "Gestionar Cookies" en el pie de página para acceder a nuestro panel de preferencias, donde puedes activar o desactivar las diferentes categorías de cookies de forma granular.</p>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.2 Desde la configuración de tu navegador</h3>
        <p>Todos los navegadores modernos te permiten controlar las cookies a través de sus preferencias. A continuación encontrás enlaces a las instrucciones de los navegadores más populares:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/cookies-informacion-que-los-sitios-web-guardan-en-" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Safari (Mac)</a></li>
          <li><a href="https://support.microsoft.com/es-es/windows/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Microsoft Edge</a></li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.3 Herramientas de opt-out de terceros</h3>
        <p>Para desactivar el seguimiento de Google Analytics en todos los sitios web, puedes instalar la <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">extensión de inhabilitación de Google Analytics</a>.</p>
        <p className="mt-2">Para gestionar las preferencias de publicidad personalizada, puedes visitar <a href="https://www.youronlinechoices.com/es/" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Your Online Choices</a>.</p>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.4 Advertencia sobre la eliminación de cookies</h3>
        <p>Ten en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de nuestro sitio web y limitar tu experiencia de usuario. Las cookies necesarias no pueden desactivarse, ya que son imprescindibles para el funcionamiento básico del sitio.</p>
      </>
    ),
  },
  {
    id: 'cookies-terceros',
    title: '5. Cookies de Terceros',
    content: (
      <>
        <p>En AECMI utilizamos servicios de terceros que pueden establecer cookies en tu dispositivo. A continuación detallamos los principales proveedores:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Google Analytics 4:</strong> Utilizamos este servicio para analizar el tráfico del sitio web. Google puede utilizar los datos recopilados para contextualizar y personalizar los anuncios de su propia red publicitaria. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Política de privacidad de Google</a></li>
          <li><strong>Google Fonts:</strong> Utilizamos Google Fonts para la tipografía del sitio. Google puede recopilar información sobre tu navegador cuando cargas las fuentes.</li>
          <li><strong>Plataformas de redes sociales:</strong> Los botones de compartir e incrustaciones de contenido social pueden establecer cookies de terceros.</li>
        </ul>
        <p className="mt-4">Te recomendamos revisar las políticas de privacidad de estos terceros para comprender cómo utilizan tus datos.</p>
      </>
    ),
  },
  {
    id: 'derechos',
    title: '6. Tus Derechos',
    content: (
      <>
        <p>En relación con el uso de cookies, tienes los siguientes derechos:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Derecho a rechazar cookies:</strong> Puedes rechazar el uso de cookies opcionales en cualquier momento a través de nuestro panel de preferencias o de la configuración de tu navegador.</li>
          <li><strong>Derecho a retirar el consentimiento:</strong> Si previamente aceptaste el uso de cookies, puedes retirar tu consentimiento en cualquier momento sin que ello afecte la licitud del tratamiento basado en el consentimiento previo a su retirada.</li>
          <li><strong>Derecho a controlar:</strong> Puedes consultar, borrar o limitar el uso de cookies mediante las herramientas de configuración de tu navegador.</li>
        </ul>
        <p className="mt-4">Para más información sobre tus derechos en materia de protección de datos, consulta nuestra <a href="/legal/privacidad" className="text-[#0066CC] hover:underline">Política de Privacidad</a>.</p>
      </>
    ),
  },
  {
    id: 'contacto',
    title: '7. Contacto',
    content: (
      <>
        <p>Si tienes alguna pregunta sobre nuestra Política de Cookies o sobre cómo gestionamos las cookies en nuestro sitio web, puedes contactar con nosotros a través de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Correo electrónico:</strong> <a href="mailto:privacidad@aecmi.com" className="text-[#0066CC] hover:underline">privacidad@aecmi.com</a></li>
          <li><strong>Formulario de contacto:</strong> <a href="/contact" className="text-[#0066CC] hover:underline">aecmi.com/contact</a></li>
        </ul>
      </>
    ),
  },
  {
    id: 'actualizacion',
    title: '8. Última Actualización',
    content: (
      <>
        <p>Esta Política de Cookies fue actualizada por última vez el <strong>15 de enero de 2025</strong>.</p>
        <p>Nos reservamos el derecho de modificar esta política en cualquier momento para reflejar cambios en las cookies que utilizamos o por otros motivos operativos, legales o regulatorios. Cualquier cambio significativo será notificado a través de un banner en nuestro sitio web o por correo electrónico.</p>
        <p>Te recomendamos revisar periódicamente esta página para mantenerte informado sobre nuestras prácticas en materia de cookies.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="es"
      title="Política de Cookies"
      subtitle="Información sobre el uso de cookies en nuestro sitio web"
      lastUpdated="15 de enero de 2025"
      sections={sections}
      type="cookies"
    />
  );
}
