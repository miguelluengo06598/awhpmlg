import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Términos y Condiciones — AECMI',
  description: 'Términos y condiciones de uso del sitio web y servicios de AECMI.',
};

const sections = [
  {
    id: 'introduccion',
    title: 'Introducción',
    content: (
      <>
        <p>Bienvenido a AECMI. Estos términos y condiciones rigen el acceso y uso del sitio web <strong>aecmi.com</strong> y todos los servicios relacionados ofrecidos por AECMI, incluyendo pero no limitado a: certificaciones profesionales BIM, formación especializada, recursos técnicos y consultoría.</p>
        <p>Al acceder a este sitio web y utilizar nuestros servicios, aceptas quedar vinculado por estos términos y condiciones, nuestra política de privacidad y todas las demás políticas aplicables. Si no estás de acuerdo con alguna parte de estos términos, no deberías utilizar nuestro sitio web ni nuestros servicios.</p>
        <p>Estos términos pueden ser modificados periódicamente. Es tu responsabilidad revisarlos regularmente. El uso continuado del sitio después de cualquier modificación implica la aceptación de los términos actualizados.</p>
      </>
    ),
  },
  {
    id: 'aceptacion',
    title: '1. Aceptación de Términos',
    content: (
      <>
        <p>Al utilizar el sitio web de AECMI, confirmas que:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Tienes al menos 18 años de edad o cuentas con el consentimiento de tus padres o tutores legales.</li>
          <li>Tienes capacidad legal para celebrar contratos vinculantes.</li>
          <li>Leíste, comprendiste y aceptas cumplir con estos términos y condiciones.</li>
          <li>La información que proporcionas es verdadera, precisa, actual y completa.</li>
        </ul>
        <p className="mt-4">Si no aceptas estos términos en su totalidad, debes abstenerse de utilizar nuestro sitio web y servicios. El acceso no autorizado o el uso del sitio web para fines ilícitos está estrictamente prohibido.</p>
      </>
    ),
  },
  {
    id: 'acceso-uso',
    title: '2. Acceso y Uso del Sitio',
    content: (
      <>
        <p>AECMI te otorga una licencia limitada, no exclusiva, no transferible y revocable para acceder y utilizar el sitio web y su contenido con fines personales y no comerciales, o para los fines específicamente autorizados en relación con nuestros servicios de certificación y formación.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Uso permitido</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Navegar por el sitio web y acceder a la información pública.</li>
          <li>Registrarte como usuario y gestionar tu cuenta personal.</li>
          <li>Solicitar certificaciones y participar en programas de formación.</li>
          <li>Descargar recursos técnicos expresamente disponibles para descarga.</li>
          <li>Contactar con AECMI a través de los canales proporcionados.</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Uso no permitido</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reproducir, duplicar, copiar, vender, revender o explotar cualquier parte del sitio web con fines comerciales sin autorización expresa.</li>
          <li>Modificar, adaptar, traducir, realizar ingeniería inversa o descompilar cualquier parte del sitio web.</li>
          <li>Utilizar el sitio web de manera que pueda dañar, deshabilitar, sobrecargar o deteriorar los servidores o redes de AECMI.</li>
          <li>Intentar acceder sin autorización a cuentas de otros usuarios, sistemas o redes conectadas al sitio.</li>
          <li>Utilizar robots, spiders, scrapers u otros medios automatizados para acceder al sitio sin autorización.</li>
          <li>Publicar o transmitir contenido ilegal, difamatorio, obsceno, ofensivo o que infrinja derechos de terceros.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'propiedad-intelectual',
    title: '3. Propiedad Intelectual',
    content: (
      <>
        <p>Todo el contenido disponible en el sitio web de AECMI, incluyendo pero no limitado a textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales, compilaciones de datos y software, es propiedad de AECMI o de sus licenciantes y está protegido por las leyes internacionales de derechos de autor, marcas registradas y otras leyes de propiedad intelectual.</p>
        <p>La marca AECMI, los logotipos, los nombres de certificaciones y todos los gráficos relacionados son marcas comerciales de AECMI. No se permite el uso de estas marcas sin el consentimiento previo por escrito de AECMI.</p>
        <p>El contenido generado por los usuarios (como testimonios, comentarios o contribuciones a foros) permanece bajo la propiedad intelectual del usuario, pero al publicarlo en nuestro sitio otorgas a AECMI una licencia no exclusiva, mundial, libre de regalías y sublicenciable para usar, reproducir, modificar, adaptar, publicar, traducir y distribuir dicho contenido.</p>
      </>
    ),
  },
  {
    id: 'limitacion-responsabilidad',
    title: '4. Limitación de Responsabilidad',
    content: (
      <>
        <p>El sitio web y todos los servicios de AECMI se proporcionan <strong>"tal cual"</strong> y <strong>"según disponibilidad"</strong>, sin garantías de ningún tipo, ya sean expresas o implícitas.</p>
        <p>AECMI no garantiza que:</p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>El sitio web funcionará de manera ininterrumpida, segura o libre de errores.</li>
          <li>Los resultados obtenidos del uso del sitio web sean exactos o confiables.</li>
          <li>Los defectos en el funcionamiento o el contenido serán corregidos.</li>
          <li>El sitio web esté libre de virus u otros componentes dañinos.</li>
        </ul>
        <p className="mt-4">En ningún caso AECMI será responsable por daños directos, indirectos, incidentales, especiales, consecuenciales o punitivos, incluyendo pero no limitado a: pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles, resultantes de:</p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>El acceso o uso, o la imposibilidad de acceder o usar el sitio web.</li>
          <li>Cualquier conducta o contenido de terceros en el sitio web.</li>
          <li>Cualquier contenido obtenido del sitio web.</li>
          <li>Acceso no autorizado, alteración o pérdida de transmisiones o datos.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'certificaciones-servicios',
    title: '5. Certificaciones y Servicios',
    content: (
      <>
        <p>Los servicios de certificación de AECMI están sujetos a términos y condiciones adicionales específicos que se te proporcionarán durante el proceso de solicitud.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Requisitos generales</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cumplir con los criterios de elegibilidad establecidos para cada certificación.</li>
          <li>Proporcionar información veraz y documentación verificable.</li>
          <li>Abonar las tarifas correspondientes según las condiciones de pago establecidas.</li>
          <li>Cumplir con el código de ética y conducta profesional de AECMI.</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Proceso de solicitud</h3>
        <p>Al solicitar una certificación, AECMI evaluará tu elegibilidad según los criterios establecidos. Nos reservamos el derecho de rechazar cualquier solicitud que no cumpla con los requisitos mínimos, sin obligación de proporcionar una explicación detallada.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Cancelación y reembolsos</h3>
        <p>Las tarifas de solicitud y examen generalmente no son reembolsables una vez iniciado el proceso de evaluación. En casos excepcionales (fuerza mayor, circunstancias médicas documentadas), se puede evaluar una devolución parcial a discreción de AECMI.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Vigencia y renovación</h3>
        <p>Las certificaciones tienen una vigencia limitada (generalmente 3 años). Los certificados deben completar el proceso de renovación antes del vencimiento para mantener el estado activo.</p>
      </>
    ),
  },
  {
    id: 'cuentas-usuario',
    title: '6. Cuentas de Usuario',
    content: (
      <>
        <p>Para acceder a ciertos servicios de AECMI, es posible que necesites crear una cuenta de usuario. Al hacerlo, te comprometes a:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Información correcta:</strong> Proporcionar información precisa, actual y completa durante el registro.</li>
          <li><strong>Seguridad de la cuenta:</strong> Mantener la confidencialidad de tu contraseña y no compartir tu cuenta con terceros.</li>
          <li><strong>Notificación de incidencias:</strong> Notificarnos inmediatamente de cualquier uso no autorizado de tu cuenta o cualquier otra brecha de seguridad.</li>
          <li><strong>Responsabilidad:</strong> Asumir la responsabilidad total de todas las actividades que ocurran bajo tu cuenta.</li>
          <li><strong>No transferencia:</strong> No transferir, vender o ceder tu cuenta a terceros sin autorización expresa de AECMI.</li>
        </ul>
        <p className="mt-4">AECMI se reserva el derecho de suspender o terminar cuentas que incumplan estos términos, que presenten información fraudulenta o que realicen actividades que consideremos perjudiciales para otros usuarios o para la organización.</p>
      </>
    ),
  },
  {
    id: 'enlaces-terceros',
    title: '7. Enlaces a Terceros',
    content: (
      <>
        <p>Nuestro sitio web puede contener enlaces a sitios web de terceros que no son propiedad ni están controlados por AECMI. Estos enlaces se proporcionan únicamente para tu conveniencia e información.</p>
        <p>AECMI no tiene control sobre el contenido, las políticas de privacidad o las prácticas de sitios web de terceros y no asume responsabilidad alguna por ellos. El acceso y uso de sitios web de terceros vinculados desde nuestro sitio es bajo tu propio riesgo.</p>
        <p>Te recomendamos revisar los términos y condiciones y las políticas de privacidad de cualquier sitio web de terceros que visites antes de proporcionar cualquier información personal o realizar transacciones.</p>
      </>
    ),
  },
  {
    id: 'modificacion-servicio',
    title: '8. Modificación del Servicio',
    content: (
      <>
        <p>AECMI se reserva el derecho, a su entera discreción, de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Modificar, suspender o discontinuar temporal o permanentemente cualquier parte del sitio web o de los servicios, con o sin previo aviso.</li>
          <li>Establecer límites en ciertas funciones y servicios o restringir el acceso a partes o a la totalidad del sitio web sin responsabilidad alguna.</li>
          <li>Actualizar, cambiar o eliminar contenido, características o funcionalidades en cualquier momento.</li>
          <li>Modificar las tarifas de certificación y formación con la debida antelación.</li>
        </ul>
        <p className="mt-4">No seremos responsables ante ti ni ante terceros por cualquier modificación, suspensión o interrupción del servicio.</p>
      </>
    ),
  },
  {
    id: 'ley-aplicable',
    title: '9. Ley Aplicable y Jurisdicción',
    content: (
      <>
        <p>Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta sus disposiciones sobre conflicto de leyes.</p>
        <p>Cualquier disputa, controversia o reclamación derivada de o relacionada con estos términos, incluyendo su validez, interpretación o incumplimiento, será sometida a la jurisdicción exclusiva de los tribunales de Madrid, España.</p>
        <p>Si alguna disposición de estos términos se considera inválida o inaplicable por un tribunal competente, dicha disposición será modificada en la medida necesaria para hacerla válida y aplicable, y las disposiciones restantes permanecerán en pleno vigor y efecto.</p>
      </>
    ),
  },
  {
    id: 'contacto',
    title: '10. Contacto',
    content: (
      <>
        <p>Si tienes alguna pregunta, duda o comentario sobre estos términos y condiciones, puedes contactar con nosotros a través de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Correo electrónico:</strong> <a href="mailto:legal@aecmi.com" className="text-[#0066CC] hover:underline">legal@aecmi.com</a></li>
          <li><strong>Formulario de contacto:</strong> <a href="/contact" className="text-[#0066CC] hover:underline">aecmi.com/contact</a></li>
          <li><strong>Dirección postal:</strong> AECMI, Madrid, España</li>
        </ul>
        <p className="mt-4">Nos esforzamos por responder a todas las consultas en un plazo máximo de 10 días hábiles.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="es"
      title="Términos y Condiciones"
      subtitle="Reglas de uso del sitio web y servicios de AECMI"
      lastUpdated="15 de enero de 2025"
      sections={sections}
      type="terms"
    />
  );
}
