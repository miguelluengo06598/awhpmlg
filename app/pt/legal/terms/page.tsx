import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Termos e Condições — AECOMI',
  description: 'Termos e condições de utilização do website e serviços da AECOMI.',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introdução',
    content: (
      <>
        <p>Bem-vindo à AECOMI. Estes termos e condições regem o acesso e a utilização do website <strong>aecomi.com</strong> e de todos os serviços relacionados oferecidos pela AECOMI, incluindo, entre outros: certificações profissionais BIM, formação especializada, recursos técnicos e consultoria.</p>
        <p>Ao aceder a este website e utilizar os nossos serviços, concorda ficar vinculado a estes termos e condições, à nossa política de privacidade e a todas as demais políticas aplicáveis. Se não concordar com qualquer parte destes termos, não deverá utilizar o nosso website nem os nossos serviços.</p>
        <p>Estes termos podem ser modificados periodicamente. É da sua responsabilidade revê-los regularmente. A utilização continuada do site após qualquer modificação implica a aceitação dos termos atualizados.</p>
      </>
    ),
  },
  {
    id: 'acceptance',
    title: '1. Aceitação dos Termos',
    content: (
      <>
        <p>Ao utilizar o website da AECOMI, confirma que:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Tem pelo menos 18 anos de idade ou dispõe do consentimento dos seus pais ou tutores legais.</li>
          <li>Tem capacidade legal para celebrar contratos vinculativos.</li>
          <li>Leu, compreendeu e concorda em cumprir estes termos e condições.</li>
          <li>A informação que fornece é verdadeira, exata, atual e completa.</li>
        </ul>
        <p className="mt-4">Se não aceitar estes termos na sua totalidade, deverá abster-se de utilizar o nosso website e serviços. O acesso não autorizado ou a utilização do website para fins ilícitos são estritamente proibidos.</p>
      </>
    ),
  },
  {
    id: 'access-use',
    title: '2. Acesso e Utilização do Site',
    content: (
      <>
        <p>A AECOMI concede-lhe uma licença limitada, não exclusiva, intransmissível e revogável para aceder e utilizar o website e o seu conteúdo para fins pessoais e não comerciais, ou para os fins especificamente autorizados no âmbito dos nossos serviços de certificação e formação.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Utilização permitida</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Navegar no website e aceder a informação pública.</li>
          <li>Registar-se como utilizador e gerir a sua conta pessoal.</li>
          <li>Solicitar certificações e participar em programas de formação.</li>
          <li>Descarregar recursos técnicos expressamente disponíveis para descarga.</li>
          <li>Contactar a AECOMI através dos canais disponibilizados.</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Utilização proibida</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte do website para fins comerciais sem autorização expressa.</li>
          <li>Modificar, adaptar, traduzir, fazer engenharia inversa ou descompilar qualquer parte do website.</li>
          <li>Utilizar o website de forma que possa danificar, desativar, sobrecarregar ou prejudicar os servidores ou redes da AECOMI.</li>
          <li>Tentar obter acesso não autorizado a contas de outros utilizadores, sistemas ou redes ligadas ao site.</li>
          <li>Utilizar robôs, spiders, scrapers ou outros meios automatizados para aceder ao site sem autorização.</li>
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
        <p>Todo o conteúdo disponível no website da AECOMI, incluindo, entre outros, textos, gráficos, logótipos, ícones, imagens, clips de áudio, descargas digitais, compilações de dados e software, é propriedade da AECOMI ou dos seus licenciadores e está protegido por leis internacionais de direitos de autor, marcas registadas e outras leis de propriedade intelectual.</p>
        <p>A marca AECOMI, os logótipos, os nomes das certificações e todos os gráficos relacionados são marcas registadas da AECOMI. A utilização destas marcas sem o consentimento prévio e por escrito da AECOMI não é permitida.</p>
        <p>O conteúdo gerado pelos utilizadores (como testemunhos, comentários ou contribuições em fóruns) permanece sob a propriedade intelectual do utilizador, mas, ao publicá-lo no nosso site, concede à AECOMI uma licença não exclusiva, mundial, isenta de royalties e sublicenciável para utilizar, reproduzir, modificar, adaptar, publicar, traduzir e distribuir esse conteúdo.</p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '4. Limitação de Responsabilidade',
    content: (
      <>
        <p>O website e todos os serviços da AECOMI são fornecidos <strong>"tal como estão"</strong> e <strong>"conforme disponíveis"</strong>, sem garantias de qualquer tipo, expressas ou implícitas.</p>
        <p>A AECOMI não garante que:</p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>O website funcionará de forma ininterrupta, segura ou isenta de erros.</li>
          <li>Os resultados obtidos com a utilização do website serão exatos ou fiáveis.</li>
          <li>Os defeitos de funcionamento ou de conteúdo serão corrigidos.</li>
          <li>O website estará livre de vírus ou outros componentes nocivos.</li>
        </ul>
        <p className="mt-4">Em nenhum caso a AECOMI será responsável por danos diretos, indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo, entre outros: perda de lucros, dados, utilização, reputação ou outras perdas intangíveis, resultantes de:</p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>O acesso ou utilização, ou a impossibilidade de aceder ou utilizar o website.</li>
          <li>Qualquer conduta ou conteúdo de terceiros no website.</li>
          <li>Qualquer conteúdo obtido a partir do website.</li>
          <li>O acesso não autorizado, alteração ou perda de transmissões ou dados.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'certifications',
    title: '5. Certificações e Serviços',
    content: (
      <>
        <p>Os serviços de certificação da AECOMI estão sujeitos a termos e condições específicos adicionais que lhe serão fornecidos durante o processo de candidatura.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Requisitos gerais</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Cumprir os critérios de elegibilidade estabelecidos para cada certificação.</li>
          <li>Fornecer informação verdadeira e documentação verificável.</li>
          <li>Pagar as taxas correspondentes de acordo com as condições de pagamento estabelecidas.</li>
          <li>Cumprir o código de ética e conduta profissional da AECOMI.</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Processo de candidatura</h3>
        <p>Ao candidatar-se a uma certificação, a AECOMI avaliará a sua elegibilidade de acordo com os critérios estabelecidos. Reservamo-nos o direito de recusar qualquer candidatura que não cumpra os requisitos mínimos, sem obrigação de fornecer uma explicação detalhada.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Cancelamento e reembolsos</h3>
        <p>As taxas de candidatura e de exame são, em geral, não reembolsáveis depois de iniciado o processo de avaliação. Em casos excecionais (força maior, circunstâncias médicas documentadas), poderá ser avaliado um reembolso parcial ao critério da AECOMI.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Validade e renovação</h3>
        <p>As certificações têm um período de validade limitado (geralmente 3 anos). Os titulares de certificados devem concluir o processo de renovação antes do vencimento para manterem o estado ativo.</p>
      </>
    ),
  },
  {
    id: 'accounts',
    title: '6. Contas de Utilizador',
    content: (
      <>
        <p>Para aceder a determinados serviços da AECOMI, poderá ter de criar uma conta de utilizador. Ao fazê-lo, concorda em:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Informação correta:</strong> Fornecer informação exata, atual e completa durante o registo.</li>
          <li><strong>Segurança da conta:</strong> Manter a confidencialidade da sua palavra-passe e não partilhar a sua conta com terceiros.</li>
          <li><strong>Notificação de incidentes:</strong> Notificar-nos de imediato de qualquer utilização não autorizada da sua conta ou de qualquer outra violação de segurança.</li>
          <li><strong>Responsabilidade:</strong> Assumir total responsabilidade por todas as atividades que ocorram na sua conta.</li>
          <li><strong>Não transferência:</strong> Não transferir, vender ou ceder a sua conta a terceiros sem a autorização expressa da AECOMI.</li>
        </ul>
        <p className="mt-4">A AECOMI reserva-se o direito de suspender ou encerrar contas que violem estes termos, apresentem informação fraudulenta ou desenvolvam atividades que consideremos prejudiciais para outros utilizadores ou para a organização.</p>
      </>
    ),
  },
  {
    id: 'third-party-links',
    title: '7. Ligações a Terceiros',
    content: (
      <>
        <p>O nosso website pode conter ligações a websites de terceiros que não são propriedade nem estão sob o controlo da AECOMI. Estas ligações são fornecidas unicamente para sua conveniência e informação.</p>
        <p>A AECOMI não tem controlo sobre o conteúdo, as políticas de privacidade ou as práticas de websites de terceiros e não assume qualquer responsabilidade pelos mesmos. O acesso e a utilização de websites de terceiros ligados a partir do nosso site são por sua conta e risco.</p>
        <p>Recomendamos que reveja os termos e condições e as políticas de privacidade de quaisquer websites de terceiros que visite antes de fornecer qualquer informação pessoal ou realizar transações.</p>
      </>
    ),
  },
  {
    id: 'modification',
    title: '8. Modificação do Serviço',
    content: (
      <>
        <p>A AECOMI reserva-se o direito, ao seu exclusivo critério, de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Modificar, suspender ou descontinuar, temporária ou permanentemente, qualquer parte do website ou dos serviços, com ou sem aviso prévio.</li>
          <li>Estabelecer limites em determinadas funcionalidades e serviços ou restringir o acesso a partes ou à totalidade do website sem qualquer responsabilidade.</li>
          <li>Atualizar, alterar ou eliminar conteúdos, funcionalidades ou recursos a qualquer momento.</li>
          <li>Modificar as taxas de certificação e formação com o devido aviso.</li>
        </ul>
        <p className="mt-4">Não seremos responsáveis perante si ou qualquer terceiro por qualquer modificação, suspensão ou interrupção do serviço.</p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: '9. Lei Aplicável e Jurisdição',
    content: (
      <>
        <p>Estes termos e condições regem-se e são interpretados de acordo com as leis de Espanha, sem consideração das suas normas de conflito de leis.</p>
        <p>Qualquer litígio, controvérsia ou reclamação decorrente ou relacionada com estes termos, incluindo a sua validade, interpretação ou incumprimento, será submetido à jurisdição exclusiva dos tribunais de Madrid, Espanha.</p>
        <p>Se alguma disposição destes termos for considerada inválida ou inaplicável por um tribunal competente, essa disposição será modificada na medida necessária para a tornar válida e aplicável, permanecendo as restantes disposições em pleno vigor e efeito.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '10. Contacto',
    content: (
      <>
        <p>Se tiver alguma pergunta, dúvida ou comentário sobre estes termos e condições, pode contactar-nos através de:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:legal@aecomi.com" className="text-[#0066CC] hover:underline">legal@aecomi.com</a></li>
          <li><strong>Formulário de contacto:</strong> <a href="/pt/contact" className="text-[#0066CC] hover:underline">aecomi.com/contact</a></li>
          <li><strong>Endereço postal:</strong> AECOMI, Madrid, Espanha</li>
        </ul>
        <p className="mt-4">Esforçamo-nos por responder a todas as questões num prazo máximo de 10 dias úteis.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="pt"
      title="Termos e Condições"
      subtitle="Regras de utilização do website e serviços da AECOMI"
      lastUpdated="15 de janeiro de 2025"
      sections={sections}
      type="terms"
    />
  );
}
