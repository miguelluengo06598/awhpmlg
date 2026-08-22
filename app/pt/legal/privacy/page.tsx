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
        <p>Na AECOMI, valorizamos sua privacidade e temos o compromisso de proteger seus dados pessoais. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações que você nos fornece ao utilizar nosso site, serviços de certificação, formação e quaisquer outros serviços relacionados.</p>
        <p>Ao acessar e utilizar nossos serviços, você aceita as práticas descritas nesta política. Se não concordar com algum dos termos aqui estabelecidos, recomendamos que não utilize nossos serviços.</p>
        <p>Esta política atende ao Regulamento Geral de Proteção de Dados (RGPD) da União Europeia e à Lei Orgânica espanhola de Proteção de Dados Pessoais e Garantia dos Direitos Digitais (LOPDGDD).</p>
      </>
    ),
  },
  {
    id: 'controller',
    title: '1. Responsável pelo Tratamento',
    content: (
      <>
        <p><strong>Identidade:</strong> AECOMI — Organização Internacional de Certificação BIM</p>
        <p><strong>Endereço postal:</strong> Madri, Espanha</p>
        <p><strong>Email:</strong> <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a></p>
        <p><strong>Atividade principal:</strong> Certificação de competências BIM, formação especializada e pesquisa aplicada ao setor AEC (Arquitetura, Engenharia e Construção).</p>
        <p>Para qualquer questão relacionada à proteção de dados, você pode entrar em contato com nosso Encarregado de Proteção de Dados (DPO) pelo endereço de e-mail indicado.</p>
      </>
    ),
  },
  {
    id: 'data-collected',
    title: '2. Dados que Coletamos',
    content: (
      <>
        <p>Podemos coletar e tratar os seguintes tipos de dados pessoais:</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.1 Dados de cadastro e contato</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nome e sobrenome</li>
          <li>Endereço de e-mail</li>
          <li>Número de telefone</li>
          <li>Endereço postal</li>
          <li>País de residência</li>
          <li>Empresa ou organização</li>
          <li>Cargo ou função</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.2 Dados de navegação</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Endereço IP</li>
          <li>Tipo de navegador e sistema operacional</li>
          <li>Páginas visitadas e tempo de navegação</li>
          <li>Data e hora de acesso</li>
          <li>Origem da visita (referrer)</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.3 Dados de certificação</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Trajetória acadêmica e profissional</li>
          <li>Experiência em projetos BIM</li>
          <li>Resultados de exames e avaliações</li>
          <li>Certificações obtidas e sua validade</li>
          <li>Documentação comprobatória (currículo, referências)</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.4 Cookies e tecnologias semelhantes</h3>
        <p>Consulte nossa <a href="/pt/legal/cookies" className="text-[#0066CC] hover:underline">Política de Cookies</a> para informações detalhadas sobre o uso de cookies e tecnologias de rastreamento.</p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: '3. Base Legal',
    content: (
      <>
        <p>O tratamento dos seus dados pessoais se baseia em um ou mais dos seguintes fundamentos legais:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Consentimento:</strong> Quando você fornece voluntariamente seus dados para receber informações, solicitar certificações ou se cadastrar em nossos serviços.</li>
          <li><strong>Execução de contrato:</strong> Para gerenciar sua solicitação de certificação, formalizar a relação contratual e prestar os serviços contratados.</li>
          <li><strong>Obrigação legal:</strong> Para cumprir obrigações fiscais, contábeis e regulatórias aplicáveis à nossa atividade.</li>
          <li><strong>Interesses legítimos:</strong> Para melhorar nossos serviços, garantir a segurança de nossas plataformas, prevenir fraudes e realizar análises estatísticas anonimizadas.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '4. Como Usamos Seus Dados',
    content: (
      <>
        <p>Seus dados pessoais são usados para as seguintes finalidades:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Gestão de certificações:</strong> Processar inscrições, avaliar a elegibilidade, agendar exames, emitir certificados e gerenciar renovações.</li>
          <li><strong>Comunicação:</strong> Enviar informações sobre suas certificações, lembretes de renovação, atualizações regulatórias e comunicações operacionais.</li>
          <li><strong>Atendimento ao cliente:</strong> Responder a dúvidas, resolver ocorrências e prestar assistência técnica.</li>
          <li><strong>Melhoria do serviço:</strong> Analisar o uso de nossos serviços para identificar áreas de melhoria e desenvolver novos produtos de formação.</li>
          <li><strong>Marketing (com consentimento):</strong> Enviar newsletters e informações sobre eventos, cursos e serviços relacionados a BIM, desde que você tenha dado seu consentimento explícito.</li>
          <li><strong>Cumprimento legal:</strong> Cumprir obrigações legais, responder a solicitações das autoridades e exercer ou defender direitos em processos judiciais.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-sharing',
    title: '5. Compartilhamento de Dados',
    content: (
      <>
        <p>A AECOMI não vende, aluga nem comercializa seus dados pessoais a terceiros. No entanto, podemos compartilhar informações nas seguintes circunstâncias:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Prestadores de serviços:</strong> Empresas que nos fornecem hospedagem, gestão de e-mail, plataformas de exames online e ferramentas de análise. Esses prestadores atuam como operadores de dados sob contrato e com garantias adequadas.</li>
          <li><strong>Instituições parceiras:</strong> Universidades e centros de formação acreditados com os quais temos acordos, apenas quando necessário para a validação acadêmica das certificações.</li>
          <li><strong>Órgãos reguladores:</strong> Autoridades competentes quando houver uma obrigação legal ou uma solicitação formal.</li>
          <li><strong>Transferências internacionais:</strong> Se algum prestador de serviços estiver localizado fora do Espaço Econômico Europeu (EEE), asseguramos que sejam aplicadas salvaguardas adequadas, como as Cláusulas Contratuais Padrão aprovadas pela Comissão Europeia.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'user-rights',
    title: '6. Direitos do Usuário',
    content: (
      <>
        <p>Como titular dos dados, você dispõe dos seguintes direitos reconhecidos pelo RGPD e pela LOPDGDD:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Direito de acesso:</strong> Obter a confirmação de que tratamos seus dados pessoais e, em caso afirmativo, acessá-los.</li>
          <li><strong>Direito de retificação:</strong> Solicitar a correção de dados inexatos ou o preenchimento de dados incompletos.</li>
          <li><strong>Direito à exclusão ("direito ao esquecimento"):</strong> Solicitar a exclusão dos seus dados quando não forem mais necessários para as finalidades para as quais foram coletados, ou quando você retirar seu consentimento.</li>
          <li><strong>Direito à limitação do tratamento:</strong> Solicitar a limitação do tratamento dos seus dados em determinadas circunstâncias.</li>
          <li><strong>Direito à portabilidade dos dados:</strong> Receber seus dados em um formato estruturado, de uso corrente e de leitura automática, e transmiti-los a outro responsável.</li>
          <li><strong>Direito de oposição:</strong> Opor-se ao tratamento dos seus dados baseado em interesses legítimos, incluindo a definição de perfis.</li>
          <li><strong>Direito de não ser submetido a decisões automatizadas:</strong> Incluindo a definição de perfis que produzam efeitos jurídicos significativos.</li>
        </ul>
        <p className="mt-4">Para exercer qualquer desses direitos, envie uma solicitação por escrito para <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a>, incluindo uma cópia do seu documento de identificação. Responderemos no prazo máximo de 30 dias.</p>
        <p>Você também tem o direito de apresentar uma reclamação à Agência Espanhola de Proteção de Dados (AEPD) se considerar que o tratamento dos seus dados viola a regulamentação aplicável.</p>
      </>
    ),
  },
  {
    id: 'security',
    title: '7. Segurança da Informação',
    content: (
      <>
        <p>Implementamos medidas técnicas e organizacionais adequadas para garantir um nível de segurança apropriado ao risco do tratamento de dados pessoais:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Criptografia:</strong> Uso de protocolos SSL/TLS na transmissão de dados. Informações sensíveis criptografadas em repouso.</li>
          <li><strong>Controle de acessos:</strong> Sistemas de autenticação robustos, senhas seguras e políticas de acesso baseadas em funções.</li>
          <li><strong>Auditorias periódicas:</strong> Revisões de segurança regulares, análise de vulnerabilidades e testes de intrusão.</li>
          <li><strong>Treinamento da equipe:</strong> Formação continuada em proteção de dados e boas práticas de segurança.</li>
          <li><strong>Backups:</strong> Cópias periódicas para garantir a disponibilidade e a recuperação das informações.</li>
          <li><strong>Registro de incidentes:</strong> Mantemos um registro de violações de segurança e notificamos a autoridade de controle e os afetados quando apropriado.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'retention',
    title: '8. Retenção dos Dados',
    content: (
      <>
        <p>Conservamos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados, bem como para cumprir as obrigações legais aplicáveis:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Dados de cadastro de usuário:</strong> Enquanto você mantiver uma conta ativa em nossas plataformas. Após o cancelamento, pelo período legalmente estabelecido (geralmente 5 anos).</li>
          <li><strong>Dados de certificação:</strong> Durante a validade da certificação e os respectivos períodos de renovação, mais o tempo necessário para comprovar o histórico de emissão.</li>
          <li><strong>Dados de inscrições não aprovadas:</strong> Por 2 anos a partir da decisão sobre a inscrição.</li>
          <li><strong>Dados de comunicações comerciais:</strong> Até que você retire seu consentimento ou solicite o cancelamento da assinatura.</li>
          <li><strong>Dados de cookies:</strong> De acordo com nossa Política de Cookies.</li>
        </ul>
        <p className="mt-4">Encerrado o período de retenção, os dados são excluídos de forma segura ou anonimizados para fins estatísticos.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '9. Contato de Privacidade',
    content: (
      <>
        <p>Para qualquer dúvida, solicitação ou reclamação relacionada à proteção de dados pessoais, você pode entrar em contato conosco por meio de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a></li>
          <li><strong>Endereço postal:</strong> AECOMI — Encarregado de Proteção de Dados, Madri, Espanha</li>
          <li><strong>Formulário de contato:</strong> Disponível em nossa <a href="/pt/contact" className="text-[#0066CC] hover:underline">página de contato</a></li>
        </ul>
        <p className="mt-4">Temos o compromisso de responder a todas as solicitações no prazo máximo de 30 dias corridos.</p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '10. Alterações na Política de Privacidade',
    content: (
      <>
        <p>A AECOMI se reserva o direito de modificar esta Política de Privacidade a qualquer momento para adaptá-la a mudanças legislativas, alterações em nossos serviços ou melhorias em nossas práticas de proteção de dados.</p>
        <p>Quando fizermos alterações significativas, notificaremos você por meio de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Um aviso em destaque em nosso site</li>
          <li>Um e-mail para o endereço associado à sua conta</li>
          <li>Uma notificação no seu painel de usuário, se aplicável</li>
        </ul>
        <p className="mt-4">Recomendamos que você revise esta política periodicamente para se manter informado sobre como protegemos suas informações. O uso continuado dos nossos serviços após qualquer modificação constituirá a aceitação dos novos termos.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="pt"
      title="Política de Privacidade"
      subtitle="Nosso compromisso com a proteção dos seus dados pessoais"
      lastUpdated="15 de janeiro de 2025"
      sections={sections}
      type="privacy"
    />
  );
}
