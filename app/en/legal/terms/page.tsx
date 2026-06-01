import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Terms and Conditions — AECOMI',
  description: 'Terms and conditions of use of the AECOMI website and services.',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: (
      <>
        <p>Welcome to AECOMI. These terms and conditions govern access to and use of the <strong>aecomi.com</strong> website and all related services offered by AECOMI, including but not limited to: professional BIM certifications, specialized training, technical resources and consulting.</p>
        <p>By accessing this website and using our services, you agree to be bound by these terms and conditions, our privacy policy and all other applicable policies. If you do not agree with any part of these terms, you should not use our website or services.</p>
        <p>These terms may be modified periodically. It is your responsibility to review them regularly. Continued use of the site after any modification implies acceptance of the updated terms.</p>
      </>
    ),
  },
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <>
        <p>By using the AECOMI website, you confirm that:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>You are at least 18 years of age or have the consent of your parents or legal guardians.</li>
          <li>You have the legal capacity to enter into binding contracts.</li>
          <li>You have read, understood and agree to comply with these terms and conditions.</li>
          <li>The information you provide is true, accurate, current and complete.</li>
        </ul>
        <p className="mt-4">If you do not accept these terms in their entirety, you must refrain from using our website and services. Unauthorized access or use of the website for unlawful purposes is strictly prohibited.</p>
      </>
    ),
  },
  {
    id: 'access-use',
    title: '2. Access and Use of the Site',
    content: (
      <>
        <p>AECOMI grants you a limited, non-exclusive, non-transferable and revocable license to access and use the website and its content for personal and non-commercial purposes, or for the purposes specifically authorized in relation to our certification and training services.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Permitted use</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Browse the website and access public information.</li>
          <li>Register as a user and manage your personal account.</li>
          <li>Request certifications and participate in training programs.</li>
          <li>Download technical resources expressly available for download.</li>
          <li>Contact AECOMI through the provided channels.</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Prohibited use</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Reproduce, duplicate, copy, sell, resell or exploit any part of the website for commercial purposes without express authorization.</li>
          <li>Modify, adapt, translate, reverse engineer or decompile any part of the website.</li>
          <li>Use the website in a manner that could damage, disable, overload or impair AECOMI servers or networks.</li>
          <li>Attempt to gain unauthorized access to other users' accounts, systems or networks connected to the site.</li>
          <li>Use robots, spiders, scrapers or other automated means to access the site without authorization.</li>
          <li>Post or transmit illegal, defamatory, obscene, offensive content or content that infringes third-party rights.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: '3. Intellectual Property',
    content: (
      <>
        <p>All content available on the AECOMI website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations and software, is the property of AECOMI or its licensors and is protected by international copyright, trademark and other intellectual property laws.</p>
        <p>The AECOMI brand, logos, certification names and all related graphics are trademarks of AECOMI. Use of these marks without the prior written consent of AECOMI is not permitted.</p>
        <p>User-generated content (such as testimonials, comments or forum contributions) remains under the intellectual property of the user, but by posting it on our site you grant AECOMI a non-exclusive, worldwide, royalty-free and sublicensable license to use, reproduce, modify, adapt, publish, translate and distribute such content.</p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '4. Limitation of Liability',
    content: (
      <>
        <p>The website and all AECOMI services are provided <strong>"as is"</strong> and <strong>"as available"</strong>, without warranties of any kind, whether express or implied.</p>
        <p>AECOMI does not guarantee that:</p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>The website will function uninterrupted, securely or error-free.</li>
          <li>The results obtained from the use of the website will be accurate or reliable.</li>
          <li>Defects in operation or content will be corrected.</li>
          <li>The website will be free of viruses or other harmful components.</li>
        </ul>
        <p className="mt-4">In no event shall AECOMI be liable for direct, indirect, incidental, special, consequential or punitive damages, including but not limited to: loss of profits, data, use, goodwill or other intangible losses, resulting from:</p>
        <ul className="list-disc pl-5 space-y-1 mt-3">
          <li>Access or use, or inability to access or use the website.</li>
          <li>Any conduct or content of third parties on the website.</li>
          <li>Any content obtained from the website.</li>
          <li>Unauthorized access, alteration or loss of transmissions or data.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'certifications',
    title: '5. Certifications and Services',
    content: (
      <>
        <p>AECOMI certification services are subject to additional specific terms and conditions that will be provided to you during the application process.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">General requirements</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Meet the eligibility criteria established for each certification.</li>
          <li>Provide truthful information and verifiable documentation.</li>
          <li>Pay the corresponding fees according to the established payment conditions.</li>
          <li>Comply with AECOMI's code of ethics and professional conduct.</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Application process</h3>
        <p>When applying for a certification, AECOMI will evaluate your eligibility according to the established criteria. We reserve the right to reject any application that does not meet the minimum requirements, without obligation to provide a detailed explanation.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Cancellation and refunds</h3>
        <p>Application and examination fees are generally non-refundable once the evaluation process has begun. In exceptional cases (force majeure, documented medical circumstances), a partial refund may be evaluated at AECOMI's discretion.</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">Validity and renewal</h3>
        <p>Certifications have a limited validity period (generally 3 years). Certificate holders must complete the renewal process before expiration to maintain active status.</p>
      </>
    ),
  },
  {
    id: 'accounts',
    title: '6. User Accounts',
    content: (
      <>
        <p>To access certain AECOMI services, you may need to create a user account. By doing so, you agree to:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Correct information:</strong> Provide accurate, current and complete information during registration.</li>
          <li><strong>Account security:</strong> Maintain the confidentiality of your password and not share your account with third parties.</li>
          <li><strong>Incident notification:</strong> Notify us immediately of any unauthorized use of your account or any other security breach.</li>
          <li><strong>Responsibility:</strong> Assume full responsibility for all activities that occur under your account.</li>
          <li><strong>No transfer:</strong> Not transfer, sell or assign your account to third parties without AECOMI's express authorization.</li>
        </ul>
        <p className="mt-4">AECOMI reserves the right to suspend or terminate accounts that violate these terms, present fraudulent information or engage in activities that we consider harmful to other users or to the organization.</p>
      </>
    ),
  },
  {
    id: 'third-party-links',
    title: '7. Third-Party Links',
    content: (
      <>
        <p>Our website may contain links to third-party websites that are not owned or controlled by AECOMI. These links are provided solely for your convenience and information.</p>
        <p>AECOMI has no control over the content, privacy policies or practices of third-party websites and assumes no responsibility for them. Access and use of third-party websites linked from our site is at your own risk.</p>
        <p>We recommend that you review the terms and conditions and privacy policies of any third-party websites you visit before providing any personal information or conducting transactions.</p>
      </>
    ),
  },
  {
    id: 'modification',
    title: '8. Modification of Service',
    content: (
      <>
        <p>AECOMI reserves the right, at its sole discretion, to:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>Modify, suspend or discontinue temporarily or permanently any part of the website or services, with or without prior notice.</li>
          <li>Establish limits on certain features and services or restrict access to parts or all of the website without any liability.</li>
          <li>Update, change or delete content, features or functionalities at any time.</li>
          <li>Modify certification and training fees with due notice.</li>
        </ul>
        <p className="mt-4">We will not be liable to you or any third party for any modification, suspension or interruption of the service.</p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: '9. Governing Law and Jurisdiction',
    content: (
      <>
        <p>These terms and conditions shall be governed by and construed in accordance with the laws of Spain, without regard to its conflict of law provisions.</p>
        <p>Any dispute, controversy or claim arising out of or relating to these terms, including their validity, interpretation or breach, shall be submitted to the exclusive jurisdiction of the courts of Madrid, Spain.</p>
        <p>If any provision of these terms is held invalid or unenforceable by a competent court, such provision shall be modified to the extent necessary to make it valid and enforceable, and the remaining provisions shall remain in full force and effect.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '10. Contact',
    content: (
      <>
        <p>If you have any questions, doubts or comments about these terms and conditions, you can contact us through:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:legal@aecomi.com" className="text-[#0066CC] hover:underline">legal@aecomi.com</a></li>
          <li><strong>Contact form:</strong> <a href="/en/contact" className="text-[#0066CC] hover:underline">aecomi.com/contact</a></li>
          <li><strong>Postal address:</strong> AECOMI, Madrid, Spain</li>
        </ul>
        <p className="mt-4">We strive to respond to all inquiries within a maximum period of 10 business days.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="en"
      title="Terms and Conditions"
      subtitle="Rules for using the AECOMI website and services"
      lastUpdated="January 15, 2025"
      sections={sections}
      type="terms"
    />
  );
}
