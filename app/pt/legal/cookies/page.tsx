import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Política de Cookies — AECOMI',
  description: 'Política de Cookies da AECOMI. Informação sobre a utilização de cookies e tecnologias de rastreio no nosso website.',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introdução',
    content: (
      <>
        <p>Na AECOMI, utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência no nosso website, analisar o tráfego e personalizar conteúdos. Esta Política de Cookies explica o que são os cookies, como os utilizamos, que tipos de cookies empregamos e como pode gerir as suas preferências.</p>
        <p>Ao continuar a navegar no nosso website sem alterar as definições de cookies, entendemos que consente a utilização de cookies conforme estabelecido nesta política.</p>
      </>
    ),
  },
  {
    id: 'what-are',
    title: '1. O que são os Cookies?',
    content: (
      <>
        <p>Um cookie é um pequeno ficheiro de texto que é armazenado no seu dispositivo (computador, tablet, telemóvel) quando visita um website. Os cookies permitem que o website se lembre das suas ações e preferências durante um período de tempo, para que não tenha de as voltar a introduzir sempre que regressa ao site ou navega entre páginas.</p>
        <p>Os cookies podem ser:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Cookies próprios:</strong> Enviados e geridos diretamente pela AECOMI.</li>
          <li><strong>Cookies de terceiros:</strong> Enviados por domínios externos que prestam serviços no nosso site (por exemplo, análise, publicidade, redes sociais).</li>
          <li><strong>Cookies de sessão:</strong> Eliminados automaticamente ao fechar o navegador.</li>
          <li><strong>Cookies persistentes:</strong> Permanecem no seu dispositivo durante um período determinado ou até os eliminar manualmente.</li>
        </ul>
        <p className="mt-4">Além dos cookies, utilizamos outras tecnologias de rastreio semelhantes, como web beacons, píxeis de rastreio e armazenamento local, para recolher informação sobre a sua navegação.</p>
      </>
    ),
  },
  {
    id: 'cookies-we-use',
    title: '2. Cookies que Utilizamos',
    content: (
      <>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.1 Cookies Necessários (Técnicos)</h3>
        <p>Estes cookies são essenciais para o funcionamento do website e não podem ser desativados nos nossos sistemas. Normalmente, apenas são configurados em resposta a ações realizadas por si, como definir as suas preferências de privacidade, iniciar sessão ou preencher formulários.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Autenticação do utilizador</li>
          <li>Segurança do site (prevenção de fraude)</li>
          <li>Preferências de sessão e idioma</li>
          <li>Funcionalidades básicas de navegação</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.2 Cookies de Análise (Estatísticos)</h3>
        <p>Estes cookies permitem-nos contar as visitas e as origens de tráfego para podermos medir e melhorar o desempenho do nosso website. Ajudam-nos a saber quais são as páginas mais e menos populares e a compreender como os visitantes se movem pelo site.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Google Analytics 4: análise de tráfego e comportamento dos utilizadores</li>
          <li>Registo de visualizações de página e tempo no site</li>
          <li>Análise da origem do tráfego (orgânico, direto, referido)</li>
          <li>Métricas de desempenho do site</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.3 Cookies de Marketing e Publicidade</h3>
        <p>Estes cookies podem ser configurados através do nosso site pelos nossos parceiros de publicidade. Podem ser utilizados por essas empresas para criar um perfil dos seus interesses e mostrar-lhe anúncios relevantes noutros websites.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Publicidade personalizada com base em interesses</li>
          <li>Registo de conversões de campanhas</li>
          <li>Retargeting e remarketing</li>
          <li>Limitação da frequência de anúncios</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.4 Cookies de Redes Sociais</h3>
        <p>Estes cookies permitem a integração com plataformas de redes sociais (LinkedIn, Twitter/X, YouTube) e permitem-lhe partilhar conteúdos diretamente a partir do nosso website.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Botões de partilha de conteúdo</li>
          <li>Apresentação de feeds sociais incorporados</li>
          <li>Início de sessão através de perfis sociais</li>
        </ul>
      </>
    ),
  },
  {
    id: 'consent',
    title: '3. Consentimento de Cookies',
    content: (
      <>
        <p>Ao aceder pela primeira vez ao nosso website, é apresentado um banner de cookies que o informa sobre a utilização de cookies e solicita o seu consentimento para aqueles que não são estritamente necessários.</p>
        <p>Tem as seguintes opções:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Aceitar todos:</strong> Consente a utilização de todas as categorias de cookies descritas nesta política.</li>
          <li><strong>Rejeitar opcionais:</strong> Apenas serão utilizados os cookies necessários ao funcionamento do site.</li>
          <li><strong>Configurar preferências:</strong> Selecione de forma granular que categorias de cookies aceita.</li>
        </ul>
        <p className="mt-4">O seu consentimento é armazenado durante 12 meses, findos os quais lhe será novamente solicitado. Pode modificar as suas preferências a qualquer momento através da ligação de gestão de cookies disponível no rodapé do nosso site.</p>
      </>
    ),
  },
  {
    id: 'managing',
    title: '4. Gestão de Cookies',
    content: (
      <>
        <p>Pode controlar e gerir os cookies de várias formas:</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.1 A partir do nosso painel de preferências</h3>
        <p>Clique na ligação "Gerir Cookies" no rodapé para aceder ao nosso painel de preferências, onde pode ativar ou desativar diferentes categorias de cookies de forma granular.</p>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.2 A partir das definições do seu navegador</h3>
        <p>Todos os navegadores modernos permitem controlar os cookies através das suas preferências. Abaixo encontra ligações para as instruções dos navegadores mais populares:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Safari (Mac)</a></li>
          <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Microsoft Edge</a></li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.3 Ferramentas de exclusão de terceiros</h3>
        <p>Para desativar o rastreio do Google Analytics em todos os websites, pode instalar o <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">complemento de navegador de exclusão do Google Analytics</a>.</p>
        <p className="mt-2">Para gerir as preferências de publicidade personalizada, pode visitar o <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Your Online Choices</a>.</p>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.4 Aviso sobre a eliminação de cookies</h3>
        <p>Tenha em atenção que a desativação de determinados cookies pode afetar a funcionalidade do nosso website e limitar a sua experiência de utilização. Os cookies necessários não podem ser desativados, uma vez que são essenciais para o funcionamento básico do site.</p>
      </>
    ),
  },
  {
    id: 'third-party-cookies',
    title: '5. Cookies de Terceiros',
    content: (
      <>
        <p>Na AECOMI utilizamos serviços de terceiros que podem configurar cookies no seu dispositivo. Os principais fornecedores são detalhados a seguir:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Google Analytics 4:</strong> Utilizamos este serviço para analisar o tráfego do website. A Google pode utilizar os dados recolhidos para contextualizar e personalizar anúncios na sua própria rede de publicidade. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Política de Privacidade da Google</a></li>
          <li><strong>Google Fonts:</strong> Utilizamos o Google Fonts para a tipografia do site. A Google pode recolher informação sobre o seu navegador ao carregar os tipos de letra.</li>
          <li><strong>Plataformas de redes sociais:</strong> Os botões de partilha e o conteúdo social incorporado podem configurar cookies de terceiros.</li>
        </ul>
        <p className="mt-4">Recomendamos que reveja as políticas de privacidade destes terceiros para compreender como utilizam os seus dados.</p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: '6. Os Seus Direitos',
    content: (
      <>
        <p>Relativamente à utilização de cookies, dispõe dos seguintes direitos:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Direito de rejeitar cookies:</strong> Pode rejeitar a utilização de cookies opcionais a qualquer momento através do nosso painel de preferências ou das definições do seu navegador.</li>
          <li><strong>Direito de retirar o consentimento:</strong> Se anteriormente aceitou a utilização de cookies, pode retirar o seu consentimento a qualquer momento, sem afetar a licitude do tratamento baseado no consentimento antes da sua retirada.</li>
          <li><strong>Direito de controlo:</strong> Pode ver, eliminar ou limitar a utilização de cookies através das ferramentas de configuração do seu navegador.</li>
        </ul>
        <p className="mt-4">Para mais informação sobre os seus direitos de proteção de dados, consulte a nossa <a href="/pt/legal/privacy" className="text-[#0066CC] hover:underline">Política de Privacidade</a>.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '7. Contacto',
    content: (
      <>
        <p>Se tiver alguma questão sobre a nossa Política de Cookies ou sobre a forma como gerimos os cookies no nosso website, pode contactar-nos através de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a></li>
          <li><strong>Formulário de contacto:</strong> <a href="/pt/contact" className="text-[#0066CC] hover:underline">aecomi.com/contact</a></li>
        </ul>
      </>
    ),
  },
  {
    id: 'last-updated',
    title: '8. Última Atualização',
    content: (
      <>
        <p>Esta Política de Cookies foi atualizada pela última vez a <strong>15 de janeiro de 2025</strong>.</p>
        <p>Reservamo-nos o direito de modificar esta política a qualquer momento para refletir alterações nos cookies que utilizamos ou por outras razões operacionais, legais ou regulamentares. Quaisquer alterações significativas serão notificadas através de um banner no nosso website ou por email.</p>
        <p>Recomendamos que reveja periodicamente esta página para se manter informado sobre as nossas práticas de cookies.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="pt"
      title="Política de Cookies"
      subtitle="Informação sobre a utilização de cookies no nosso website"
      lastUpdated="15 de janeiro de 2025"
      sections={sections}
      type="cookies"
    />
  );
}
