import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Política de Privacidade — AECOMI',
  description: 'Política de Privacidade da AECOMI. Proteção de dados pessoais em conformidade com o RGPD.',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introdução',
    content: (
      <>
        <p>Na AECOMI, valorizamos a sua privacidade e comprometemo-nos a proteger os seus dados pessoais. Esta Política de Privacidade descreve como recolhemos, utilizamos, armazenamos e protegemos a informação que nos fornece ao utilizar o nosso website, serviços de certificação, formação e quaisquer outros serviços relacionados.</p>
        <p>Ao aceder e utilizar os nossos serviços, aceita as práticas descritas nesta política. Se não concordar com algum dos termos aqui estabelecidos, recomendamos que não utilize os nossos serviços.</p>
        <p>Esta política cumpre o Regulamento Geral de Proteção de Dados (RGPD) da União Europeia e a Lei Orgânica espanhola de Proteção de Dados Pessoais e Garantia dos Direitos Digitais (LOPDGDD).</p>
      </>
    ),
  },
  {
    id: 'controller',
    title: '1. Responsável pelo Tratamento',
    content: (
      <>
        <p><strong>Identidade:</strong> AECOMI — Organização Internacional de Certificação BIM</p>
        <p><strong>Endereço postal:</strong> Madrid, Espanha</p>
        <p><strong>Email:</strong> <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a></p>
        <p><strong>Atividade principal:</strong> Certificação de competências BIM, formação especializada e investigação aplicada ao setor AEC (Arquitetura, Engenharia e Construção).</p>
        <p>Para qualquer questão relacionada com a proteção de dados, pode contactar o nosso Encarregado da Proteção de Dados (EPD) através do endereço de email indicado.</p>
      </>
    ),
  },
  {
    id: 'data-collected',
    title: '2. Dados que Recolhemos',
    content: (
      <>
        <p>Podemos recolher e tratar os seguintes tipos de dados pessoais:</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.1 Dados de registo e contacto</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nome e apelidos</li>
          <li>Endereço de email</li>
          <li>Número de telefone</li>
          <li>Endereço postal</li>
          <li>País de residência</li>
          <li>Empresa ou organização</li>
          <li>Cargo ou função</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.2 Dados de navegação</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Endereço IP</li>
          <li>Tipo de navegador e sistema operativo</li>
          <li>Páginas visitadas e tempo de navegação</li>
          <li>Data e hora de acesso</li>
          <li>Origem da visita (referrer)</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.3 Dados de certificação</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Percurso académico e profissional</li>
          <li>Experiência em projetos BIM</li>
          <li>Resultados de exames e avaliações</li>
          <li>Certificações obtidas e a sua validade</li>
          <li>Documentação comprovativa (CV, referências)</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.4 Cookies e tecnologias semelhantes</h3>
        <p>Consulte a nossa <a href="/pt/legal/cookies" className="text-[#0066CC] hover:underline">Política de Cookies</a> para informação detalhada sobre a utilização de cookies e tecnologias de rastreio.</p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: '3. Base Legal',
    content: (
      <>
        <p>O tratamento dos seus dados pessoais baseia-se num ou mais dos seguintes fundamentos legais:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Consentimento:</strong> Quando fornece voluntariamente os seus dados para receber informação, solicitar certificações ou registar-se nos nossos serviços.</li>
          <li><strong>Execução de contrato:</strong> Para gerir o seu pedido de certificação, formalizar a relação contratual e prestar os serviços contratados.</li>
          <li><strong>Obrigação legal:</strong> Para cumprir obrigações fiscais, contabilísticas e regulamentares aplicáveis à nossa atividade.</li>
          <li><strong>Interesses legítimos:</strong> Para melhorar os nossos serviços, garantir a segurança das nossas plataformas, prevenir fraudes e realizar análises estatísticas anonimizadas.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '4. Como Utilizamos os Seus Dados',
    content: (
      <>
        <p>Os seus dados pessoais são utilizados para os seguintes fins:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Gestão de certificações:</strong> Processar candidaturas, avaliar a elegibilidade, agendar exames, emitir certificados e gerir renovações.</li>
          <li><strong>Comunicação:</strong> Enviar informação sobre as suas certificações, lembretes de renovação, atualizações regulamentares e comunicações operacionais.</li>
          <li><strong>Apoio ao cliente:</strong> Responder a questões, resolver incidências e prestar assistência técnica.</li>
          <li><strong>Melhoria do serviço:</strong> Analisar a utilização dos nossos serviços para identificar áreas de melhoria e desenvolver novos produtos formativos.</li>
          <li><strong>Marketing (com consentimento):</strong> Enviar newsletters, informação sobre eventos, cursos e serviços relacionados com BIM, desde que tenha dado o seu consentimento explícito.</li>
          <li><strong>Cumprimento legal:</strong> Cumprir obrigações legais, responder a pedidos das autoridades e exercer ou defender direitos em processos judiciais.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-sharing',
    title: '5. Partilha de Dados',
    content: (
      <>
        <p>A AECOMI não vende, aluga nem comercializa os seus dados pessoais a terceiros. No entanto, podemos partilhar informação nas seguintes circunstâncias:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Prestadores de serviços:</strong> Empresas que nos fornecem alojamento, gestão de email, plataformas de exames online e ferramentas de análise. Estes prestadores atuam como subcontratantes ao abrigo de contrato e com garantias adequadas.</li>
          <li><strong>Instituições parceiras:</strong> Universidades e centros de formação acreditados com os quais temos acordos, apenas quando necessário para a validação académica das certificações.</li>
          <li><strong>Organismos reguladores:</strong> Autoridades competentes quando exista uma obrigação legal ou um pedido formal.</li>
          <li><strong>Transferências internacionais:</strong> Se algum prestador de serviços estiver localizado fora do Espaço Económico Europeu (EEE), asseguramos que são aplicadas salvaguardas adequadas, como as Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'user-rights',
    title: '6. Direitos do Utilizador',
    content: (
      <>
        <p>Enquanto titular dos dados, dispõe dos seguintes direitos reconhecidos pelo RGPD e pela LOPDGDD:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Direito de acesso:</strong> Obter a confirmação de que tratamos os seus dados pessoais e, em caso afirmativo, aceder aos mesmos.</li>
          <li><strong>Direito de retificação:</strong> Solicitar a correção de dados inexatos ou o preenchimento de dados incompletos.</li>
          <li><strong>Direito ao apagamento ("direito ao esquecimento"):</strong> Solicitar a eliminação dos seus dados quando já não sejam necessários para as finalidades para que foram recolhidos, ou quando retire o seu consentimento.</li>
          <li><strong>Direito à limitação do tratamento:</strong> Solicitar a limitação do tratamento dos seus dados em determinadas circunstâncias.</li>
          <li><strong>Direito à portabilidade dos dados:</strong> Receber os seus dados num formato estruturado, de uso corrente e de leitura automática, e transmiti-los a outro responsável.</li>
          <li><strong>Direito de oposição:</strong> Opor-se ao tratamento dos seus dados baseado em interesses legítimos, incluindo a definição de perfis.</li>
          <li><strong>Direito a não ser sujeito a decisões automatizadas:</strong> Incluindo a definição de perfis que produzam efeitos jurídicos significativos.</li>
        </ul>
        <p className="mt-4">Para exercer qualquer destes direitos, envie um pedido por escrito para <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a>, incluindo uma cópia do seu documento de identificação. Responderemos num prazo máximo de 30 dias.</p>
        <p>Tem também o direito de apresentar uma reclamação junto da Agência Espanhola de Proteção de Dados (AEPD) se considerar que o tratamento dos seus dados viola a regulamentação aplicável.</p>
      </>
    ),
  },
  {
    id: 'security',
    title: '7. Segurança da Informação',
    content: (
      <>
        <p>Implementamos medidas técnicas e organizativas adequadas para garantir um nível de segurança apropriado ao risco do tratamento de dados pessoais:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Encriptação:</strong> Utilização de protocolos SSL/TLS na transmissão de dados. Informação sensível encriptada em repouso.</li>
          <li><strong>Controlo de acessos:</strong> Sistemas de autenticação robustos, palavras-passe seguras e políticas de acesso baseadas em funções.</li>
          <li><strong>Auditorias periódicas:</strong> Revisões de segurança regulares, análise de vulnerabilidades e testes de intrusão.</li>
          <li><strong>Formação do pessoal:</strong> Formação contínua em proteção de dados e boas práticas de segurança.</li>
          <li><strong>Cópias de segurança:</strong> Cópias periódicas para garantir a disponibilidade e recuperação da informação.</li>
          <li><strong>Registo de incidentes:</strong> Mantemos um registo de violações de segurança e notificamos a autoridade de controlo e os afetados quando apropriado.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'retention',
    title: '8. Conservação dos Dados',
    content: (
      <>
        <p>Conservamos os seus dados pessoais apenas durante o tempo necessário para cumprir as finalidades para que foram recolhidos, bem como para cumprir as obrigações legais aplicáveis:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Dados de registo de utilizador:</strong> Enquanto mantiver uma conta ativa nas nossas plataformas. Após o cancelamento, durante o período legalmente estabelecido (geralmente 5 anos).</li>
          <li><strong>Dados de certificação:</strong> Durante a validade da certificação e os respetivos períodos de renovação, mais o tempo necessário para comprovar o histórico de emissão.</li>
          <li><strong>Dados de candidaturas não aprovadas:</strong> Durante 2 anos a partir da resolução da candidatura.</li>
          <li><strong>Dados de comunicações comerciais:</strong> Até que retire o seu consentimento ou solicite o cancelamento da subscrição.</li>
          <li><strong>Dados de cookies:</strong> De acordo com a nossa Política de Cookies.</li>
        </ul>
        <p className="mt-4">Terminado o período de conservação, os dados são eliminados de forma segura ou anonimizados para fins estatísticos.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '9. Contacto de Privacidade',
    content: (
      <>
        <p>Para qualquer questão, pedido ou reclamação relacionada com a proteção de dados pessoais, pode contactar-nos através de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a></li>
          <li><strong>Endereço postal:</strong> AECOMI — Encarregado da Proteção de Dados, Madrid, Espanha</li>
          <li><strong>Formulário de contacto:</strong> Disponível na nossa <a href="/pt/contact" className="text-[#0066CC] hover:underline">página de contacto</a></li>
        </ul>
        <p className="mt-4">Comprometemo-nos a responder a todos os pedidos num prazo máximo de 30 dias corridos.</p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '10. Alterações à Política de Privacidade',
    content: (
      <>
        <p>A AECOMI reserva-se o direito de modificar esta Política de Privacidade a qualquer momento para a adaptar a desenvolvimentos legislativos, alterações nos nossos serviços ou melhorias nas nossas práticas de proteção de dados.</p>
        <p>Quando efetuarmos alterações significativas, notificá-lo-emos através de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Um aviso destacado no nosso website</li>
          <li>Um email para o endereço associado à sua conta</li>
          <li>Uma notificação no seu painel de utilizador, se aplicável</li>
        </ul>
        <p className="mt-4">Recomendamos que reveja periodicamente esta política para se manter informado sobre como protegemos a sua informação. A utilização continuada dos nossos serviços após qualquer modificação constituirá a aceitação dos novos termos.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="pt"
      title="Política de Privacidade"
      subtitle="O nosso compromisso com a proteção dos seus dados pessoais"
      lastUpdated="15 de janeiro de 2025"
      sections={sections}
      type="privacy"
    />
  );
}
