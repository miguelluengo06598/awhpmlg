import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Termos e Condições — AECOMI',
  description: 'Termos e condições de uso do site e dos serviços da AECOMI.',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introdução',
    content: (
      <>
        <p>Bem-vindo à AECOMI. Estes termos e condições regem o acesso e o uso do site <strong>aecomi.com</strong> e de todos os serviços relacionados oferecidos pela AECOMI, incluindo, entre outros: certificações profissionais BIM, formação especializada, recursos técnicos e consultoria.</p>
        <p>Ao acessar este site e utilizar nossos serviços, você concorda em ficar vinculado a estes termos e condições, à nossa política de privacidade e a todas as demais políticas aplicáveis. Se não concordar com qualquer parte destes termos, você não deve utilizar nosso site nem nossos serviços.</p>
        <p>Estes termos podem ser modificados periodicamente. É sua responsabilidade revisá-los regularmente. O uso continuado do site após qualquer modificação implica a aceitação dos termos atualizados.</p>
      </>
    ),
  },
  {
    id: 'acceptance',
    title: '1. Aceitação dos Termos',
    content: (
      <>
        <p>Ao utilizar o site da AECOMI, você confirma que:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Tem pelo menos 18 anos de idade ou dispõe do consentimento dos seus pais ou responsáveis legais.</li>
          <li>Tem capacidade legal para celebrar contratos vinculantes.</li>
          <li>Leu, entendeu e concorda em cumprir estes termos e condições.</li>
          <li>As informações que você fornece são verdadeiras, exatas, atuais e completas.</li>
        </ul>
        <p className="mt-4">Se você não aceitar estes termos na íntegra, deve se abster de utilizar nosso site e serviços. O acesso não autorizado ou o uso do site para fins ilícitos são estritamente proibidos.</p>
      </>
    ),
  },
  {
    id: 'access-use',
    title: '2. Acesso e Uso do Site',
    content: (
      <>
        <p>A AECOMI concede a você uma licença limitada, não exclusiva, intransferível e revogável para acessar e utilizar o site e seu conteúdo para fins pessoais e não comerciais, ou para os fins especificamente autorizados no âmbito dos nossos serviços de certificação e formação.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Uso permitido</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Navegar no site e acessar informações públicas.</li>
          <li>Cadastrar-se como usuário e gerenciar sua conta pessoal.</li>
          <li>Solicitar certificações e participar de programas de formação.</li>
          <li>Baixar recursos técnicos expressamente disponibilizados para download.</li>
          <li>Entrar em contato com a AECOMI pelos canais disponibilizados.</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Uso proibido</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do site para fins comerciais sem autorização expressa.</li>
          <li>Modificar, adaptar, traduzir, fazer engenharia reversa ou descompilar qualquer parte do site.</li>
          <li>Utilizar o site de forma que possa danificar, desativar, sobrecarregar ou prejudicar os servidores ou as redes da AECOMI.</li>
          <li>Tentar obter acesso não autorizado a contas de outros usuários, sistemas ou redes conectadas ao site.</li>
          <li>Utilizar robôs, spiders, scrapers ou outros meios automatizados para acessar o site sem autorização.</li>
          <li>Publicar ou transmitir conteúdo ilegal, difamatório, obsceno, ofensivo ou que infrinja direitos de terceiros.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: '3. Propriedade Intelectual',
    content: (
      <>
        <p>Todo o conteúdo disponível no site da AECOMI, incluindo, entre outros, textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é propriedade da AECOMI ou de seus licenciadores e está protegido por leis internacionais de direitos autorais, marcas registradas e outras leis de propriedade intelectual.</p>
        <p>A marca AECOMI, os logotipos, os nomes das certificações e todos os gráficos relacionados são marcas registradas da AECOMI. O uso dessas marcas sem o consentimento prévio e por escrito da AECOMI não é permitido.</p>
        <p>O conteúdo gerado pelos usuários (como depoimentos, comentários ou contribuições em fóruns) permanece sob a propriedade intelectual do usuário, mas, ao publicá-lo em nosso site, você concede à AECOMI uma licença não exclusiva, mundial, isenta de royalties e sublicenciável para usar, reproduzir, modificar, adaptar, publicar, traduzir e distribuir esse conteúdo.</p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '4. Limitação de Responsabilidade',
    content: (
      <>
        <p>O site e todos os serviços da AECOMI são fornecidos <strong>"no estado em que se encontram"</strong> e <strong>"conforme disponíveis"</strong>, sem garantias de qualquer tipo, expressas ou implícitas.</p>
        <p>A AECOMI não garante que:</p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>O site funcionará de forma ininterrupta, segura ou livre de erros.</li>
          <li>Os resultados obtidos com o uso do site serão exatos ou confiáveis.</li>
          <li>Os defeitos de funcionamento ou de conteúdo serão corrigidos.</li>
          <li>O site estará livre de vírus ou outros componentes nocivos.</li>
        </ul>
        <p className="mt-4">Em nenhuma hipótese a AECOMI será responsável por danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, entre outros: perda de lucros, dados, uso, reputação ou outras perdas intangíveis, resultantes de:</p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>O acesso ou uso, ou a impossibilidade de acessar ou usar o site.</li>
          <li>Qualquer conduta ou conteúdo de terceiros no site.</li>
          <li>Qualquer conteúdo obtido a partir do site.</li>
          <li>O acesso não autorizado, a alteração ou a perda de transmissões ou dados.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'certifications',
    title: '5. Certificações e Serviços',
    content: (
      <>
        <p>Os serviços de certificação da AECOMI estão sujeitos a termos e condições específicos adicionais, que serão fornecidos a você durante o processo de inscrição.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Requisitos gerais</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Atender aos critérios de elegibilidade estabelecidos para cada certificação.</li>
          <li>Fornecer informações verdadeiras e documentação verificável.</li>
          <li>Pagar as taxas correspondentes de acordo com as condições de pagamento estabelecidas.</li>
          <li>Cumprir o código de ética e conduta profissional da AECOMI.</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Processo de inscrição</h3>
        <p>Ao se inscrever em uma certificação, a AECOMI avaliará sua elegibilidade de acordo com os critérios estabelecidos. Reservamo-nos o direito de recusar qualquer inscrição que não atenda aos requisitos mínimos, sem obrigação de fornecer uma explicação detalhada.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Cancelamento e reembolsos</h3>
        <p>As taxas de inscrição e de exame são, em geral, não reembolsáveis depois de iniciado o processo de avaliação. Em casos excepcionais (força maior, circunstâncias médicas documentadas), poderá ser avaliado um reembolso parcial a critério da AECOMI.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Validade e renovação</h3>
        <p>As certificações têm um período de validade limitado (geralmente 3 anos). Os titulares de certificados devem concluir o processo de renovação antes do vencimento para manter o status ativo.</p>
      </>
    ),
  },
  {
    id: 'accounts',
    title: '6. Contas de Usuário',
    content: (
      <>
        <p>Para acessar determinados serviços da AECOMI, você poderá precisar criar uma conta de usuário. Ao fazê-lo, você concorda em:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Informações corretas:</strong> Fornecer informações exatas, atuais e completas durante o cadastro.</li>
          <li><strong>Segurança da conta:</strong> Manter a confidencialidade da sua senha e não compartilhar sua conta com terceiros.</li>
          <li><strong>Notificação de incidentes:</strong> Notificar-nos imediatamente sobre qualquer uso não autorizado da sua conta ou qualquer outra violação de segurança.</li>
          <li><strong>Responsabilidade:</strong> Assumir total responsabilidade por todas as atividades que ocorrerem na sua conta.</li>
          <li><strong>Não transferência:</strong> Não transferir, vender ou ceder sua conta a terceiros sem a autorização expressa da AECOMI.</li>
        </ul>
        <p className="mt-4">A AECOMI se reserva o direito de suspender ou encerrar contas que violem estes termos, apresentem informações fraudulentas ou desenvolvam atividades que consideremos prejudiciais a outros usuários ou à organização.</p>
      </>
    ),
  },
  {
    id: 'third-party-links',
    title: '7. Links para Terceiros',
    content: (
      <>
        <p>Nosso site pode conter links para sites de terceiros que não são de propriedade nem estão sob o controle da AECOMI. Esses links são fornecidos apenas para sua conveniência e informação.</p>
        <p>A AECOMI não tem controle sobre o conteúdo, as políticas de privacidade ou as práticas de sites de terceiros e não assume qualquer responsabilidade por eles. O acesso e o uso de sites de terceiros vinculados a partir do nosso site são por sua conta e risco.</p>
        <p>Recomendamos que você revise os termos e condições e as políticas de privacidade de quaisquer sites de terceiros que visitar antes de fornecer qualquer informação pessoal ou realizar transações.</p>
      </>
    ),
  },
  {
    id: 'modification',
    title: '8. Modificação do Serviço',
    content: (
      <>
        <p>A AECOMI se reserva o direito, a seu exclusivo critério, de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Modificar, suspender ou descontinuar, temporária ou permanentemente, qualquer parte do site ou dos serviços, com ou sem aviso prévio.</li>
          <li>Estabelecer limites em determinadas funcionalidades e serviços ou restringir o acesso a partes ou à totalidade do site sem qualquer responsabilidade.</li>
          <li>Atualizar, alterar ou excluir conteúdos, funcionalidades ou recursos a qualquer momento.</li>
          <li>Modificar as taxas de certificação e formação com o devido aviso.</li>
        </ul>
        <p className="mt-4">Não seremos responsáveis perante você ou qualquer terceiro por qualquer modificação, suspensão ou interrupção do serviço.</p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: '9. Lei Aplicável e Jurisdição',
    content: (
      <>
        <p>Estes termos e condições são regidos e interpretados de acordo com as leis da Espanha, sem consideração às suas normas de conflito de leis.</p>
        <p>Qualquer litígio, controvérsia ou reclamação decorrente ou relacionada a estes termos, incluindo sua validade, interpretação ou descumprimento, será submetido à jurisdição exclusiva dos tribunais de Madri, Espanha.</p>
        <p>Se alguma disposição destes termos for considerada inválida ou inaplicável por um tribunal competente, essa disposição será modificada na medida necessária para torná-la válida e aplicável, permanecendo as demais disposições em pleno vigor e efeito.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '10. Contato',
    content: (
      <>
        <p>Se você tiver alguma pergunta, dúvida ou comentário sobre estes termos e condições, pode entrar em contato conosco por meio de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:legal@aecomi.com" className="text-[#0066CC] hover:underline">legal@aecomi.com</a></li>
          <li><strong>Formulário de contato:</strong> <a href="/pt/contact" className="text-[#0066CC] hover:underline">aecomi.com/contact</a></li>
          <li><strong>Endereço postal:</strong> AECOMI, Madri, Espanha</li>
        </ul>
        <p className="mt-4">Nos esforçamos para responder a todas as dúvidas no prazo máximo de 10 dias úteis.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="pt"
      title="Termos e Condições"
      subtitle="Regras de uso do site e dos serviços da AECOMI"
      lastUpdated="15 de janeiro de 2025"
      sections={sections}
      type="terms"
    />
  );
}
