import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Política de Cookies — AECOMI',
  description: 'Política de Cookies da AECOMI. Informações sobre o uso de cookies e tecnologias de rastreamento em nosso site.',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introdução',
    content: (
      <>
        <p>Na AECOMI, usamos cookies e tecnologias semelhantes para melhorar sua experiência em nosso site, analisar o tráfego e personalizar conteúdos. Esta Política de Cookies explica o que são os cookies, como os utilizamos, que tipos de cookies empregamos e como você pode gerenciar suas preferências.</p>
        <p>Ao continuar navegando em nosso site sem alterar as configurações de cookies, entendemos que você consente com o uso de cookies conforme estabelecido nesta política.</p>
      </>
    ),
  },
  {
    id: 'what-are',
    title: '1. O que são os Cookies?',
    content: (
      <>
        <p>Um cookie é um pequeno arquivo de texto que é armazenado no seu dispositivo (computador, tablet, celular) quando você visita um site. Os cookies permitem que o site lembre suas ações e preferências durante um período de tempo, para que você não precise inseri-las novamente sempre que retornar ao site ou navegar entre páginas.</p>
        <p>Os cookies podem ser:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Cookies próprios:</strong> Enviados e gerenciados diretamente pela AECOMI.</li>
          <li><strong>Cookies de terceiros:</strong> Enviados por domínios externos que prestam serviços em nosso site (por exemplo, análise, publicidade, redes sociais).</li>
          <li><strong>Cookies de sessão:</strong> Excluídos automaticamente ao fechar o navegador.</li>
          <li><strong>Cookies persistentes:</strong> Permanecem no seu dispositivo durante um período determinado ou até que você os exclua manualmente.</li>
        </ul>
        <p className="mt-4">Além dos cookies, usamos outras tecnologias de rastreamento semelhantes, como web beacons, pixels de rastreamento e armazenamento local, para coletar informações sobre sua navegação.</p>
      </>
    ),
  },
  {
    id: 'cookies-we-use',
    title: '2. Cookies que Utilizamos',
    content: (
      <>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.1 Cookies Necessários (Técnicos)</h3>
        <p>Estes cookies são essenciais para o funcionamento do site e não podem ser desativados em nossos sistemas. Normalmente, só são configurados em resposta a ações realizadas por você, como definir suas preferências de privacidade, fazer login ou preencher formulários.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Autenticação do usuário</li>
          <li>Segurança do site (prevenção de fraude)</li>
          <li>Preferências de sessão e idioma</li>
          <li>Funcionalidades básicas de navegação</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.2 Cookies de Análise (Estatísticos)</h3>
        <p>Estes cookies nos permitem contar as visitas e as origens de tráfego para que possamos medir e melhorar o desempenho do nosso site. Eles nos ajudam a saber quais são as páginas mais e menos populares e a entender como os visitantes se movem pelo site.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Google Analytics 4: análise de tráfego e comportamento dos usuários</li>
          <li>Registro de visualizações de página e tempo no site</li>
          <li>Análise da origem do tráfego (orgânico, direto, referência)</li>
          <li>Métricas de desempenho do site</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.3 Cookies de Marketing e Publicidade</h3>
        <p>Estes cookies podem ser configurados em nosso site por nossos parceiros de publicidade. Podem ser usados por essas empresas para criar um perfil dos seus interesses e exibir anúncios relevantes para você em outros sites.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Publicidade personalizada com base em interesses</li>
          <li>Registro de conversões de campanhas</li>
          <li>Retargeting e remarketing</li>
          <li>Limitação da frequência de anúncios</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.4 Cookies de Redes Sociais</h3>
        <p>Estes cookies permitem a integração com plataformas de redes sociais (LinkedIn, Twitter/X, YouTube) e permitem que você compartilhe conteúdos diretamente a partir do nosso site.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Botões de compartilhamento de conteúdo</li>
          <li>Exibição de feeds sociais incorporados</li>
          <li>Login por meio de perfis sociais</li>
        </ul>
      </>
    ),
  },
  {
    id: 'consent',
    title: '3. Consentimento de Cookies',
    content: (
      <>
        <p>Ao acessar nosso site pela primeira vez, é exibido um banner de cookies que informa você sobre o uso de cookies e solicita seu consentimento para aqueles que não são estritamente necessários.</p>
        <p>Você tem as seguintes opções:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Aceitar todos:</strong> Consente com o uso de todas as categorias de cookies descritas nesta política.</li>
          <li><strong>Rejeitar opcionais:</strong> Apenas serão usados os cookies necessários ao funcionamento do site.</li>
          <li><strong>Configurar preferências:</strong> Selecione de forma granular quais categorias de cookies você aceita.</li>
        </ul>
        <p className="mt-4">Seu consentimento é armazenado por 12 meses, após os quais ele será solicitado novamente. Você pode alterar suas preferências a qualquer momento pelo link de gerenciamento de cookies disponível no rodapé do nosso site.</p>
      </>
    ),
  },
  {
    id: 'managing',
    title: '4. Gerenciamento de Cookies',
    content: (
      <>
        <p>Você pode controlar e gerenciar os cookies de várias formas:</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.1 A partir do nosso painel de preferências</h3>
        <p>Clique no link "Gerenciar Cookies" no rodapé para acessar nosso painel de preferências, onde você pode ativar ou desativar diferentes categorias de cookies de forma granular.</p>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.2 A partir das configurações do seu navegador</h3>
        <p>Todos os navegadores modernos permitem controlar os cookies por meio de suas preferências. Abaixo você encontra links para as instruções dos navegadores mais populares:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Safari (Mac)</a></li>
          <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Microsoft Edge</a></li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.3 Ferramentas de exclusão de terceiros</h3>
        <p>Para desativar o rastreamento do Google Analytics em todos os sites, você pode instalar o <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">complemento de navegador de exclusão do Google Analytics</a>.</p>
        <p className="mt-2">Para gerenciar as preferências de publicidade personalizada, você pode visitar o <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Your Online Choices</a>.</p>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.4 Aviso sobre a exclusão de cookies</h3>
        <p>Observe que a desativação de determinados cookies pode afetar a funcionalidade do nosso site e limitar sua experiência de uso. Os cookies necessários não podem ser desativados, uma vez que são essenciais para o funcionamento básico do site.</p>
      </>
    ),
  },
  {
    id: 'third-party-cookies',
    title: '5. Cookies de Terceiros',
    content: (
      <>
        <p>Na AECOMI usamos serviços de terceiros que podem configurar cookies no seu dispositivo. Os principais fornecedores são detalhados a seguir:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Google Analytics 4:</strong> Usamos este serviço para analisar o tráfego do site. O Google pode utilizar os dados coletados para contextualizar e personalizar anúncios em sua própria rede de publicidade. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Política de Privacidade do Google</a></li>
          <li><strong>Google Fonts:</strong> Usamos o Google Fonts para a tipografia do site. O Google pode coletar informações sobre o seu navegador ao carregar as fontes.</li>
          <li><strong>Plataformas de redes sociais:</strong> Os botões de compartilhamento e o conteúdo social incorporado podem configurar cookies de terceiros.</li>
        </ul>
        <p className="mt-4">Recomendamos que você revise as políticas de privacidade desses terceiros para entender como eles usam seus dados.</p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: '6. Seus Direitos',
    content: (
      <>
        <p>Em relação ao uso de cookies, você dispõe dos seguintes direitos:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Direito de rejeitar cookies:</strong> Você pode rejeitar o uso de cookies opcionais a qualquer momento por meio do nosso painel de preferências ou das configurações do seu navegador.</li>
          <li><strong>Direito de retirar o consentimento:</strong> Se você aceitou anteriormente o uso de cookies, pode retirar seu consentimento a qualquer momento, sem afetar a licitude do tratamento baseado no consentimento antes de sua retirada.</li>
          <li><strong>Direito de controle:</strong> Você pode visualizar, excluir ou limitar o uso de cookies por meio das ferramentas de configuração do seu navegador.</li>
        </ul>
        <p className="mt-4">Para mais informações sobre seus direitos de proteção de dados, consulte nossa <a href="/pt/legal/privacy" className="text-[#0066CC] hover:underline">Política de Privacidade</a>.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '7. Contato',
    content: (
      <>
        <p>Se você tiver alguma dúvida sobre nossa Política de Cookies ou sobre a forma como gerenciamos os cookies em nosso site, pode entrar em contato conosco por meio de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a></li>
          <li><strong>Formulário de contato:</strong> <a href="/pt/contact" className="text-[#0066CC] hover:underline">aecomi.com/contact</a></li>
        </ul>
      </>
    ),
  },
  {
    id: 'last-updated',
    title: '8. Última Atualização',
    content: (
      <>
        <p>Esta Política de Cookies foi atualizada pela última vez em <strong>15 de janeiro de 2025</strong>.</p>
        <p>Reservamo-nos o direito de modificar esta política a qualquer momento para refletir alterações nos cookies que utilizamos ou por outras razões operacionais, legais ou regulatórias. Quaisquer alterações significativas serão notificadas por meio de um banner em nosso site ou por e-mail.</p>
        <p>Recomendamos que você revise esta página periodicamente para se manter informado sobre nossas práticas de cookies.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="pt"
      title="Política de Cookies"
      subtitle="Informações sobre o uso de cookies em nosso site"
      lastUpdated="15 de janeiro de 2025"
      sections={sections}
      type="cookies"
    />
  );
}
