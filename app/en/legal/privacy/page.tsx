import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Privacy Policy — AECMI',
  description: 'AECMI Privacy Policy. Personal data protection in accordance with GDPR.',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: (
      <>
        <p>At AECMI, we value your privacy and are committed to protecting your personal data. This Privacy Policy describes how we collect, use, store and protect the information you provide when using our website, certification services, training and any other related services.</p>
        <p>By accessing and using our services, you accept the practices described in this policy. If you do not agree with any of the terms set forth herein, we recommend that you do not use our services.</p>
        <p>This policy complies with the General Data Protection Regulation (GDPR) of the European Union and the Spanish Organic Law on Personal Data Protection and Guarantee of Digital Rights (LOPDGDD).</p>
      </>
    ),
  },
  {
    id: 'controller',
    title: '1. Data Controller',
    content: (
      <>
        <p><strong>Identity:</strong> AECMI — International BIM Certification Organization</p>
        <p><strong>Postal address:</strong> Madrid, Spain</p>
        <p><strong>Email:</strong> <a href="mailto:privacy@aecmi.com" className="text-[#0066CC] hover:underline">privacy@aecmi.com</a></p>
        <p><strong>Main activity:</strong> BIM competency certification, specialized training and research applied to the AEC sector (Architecture, Engineering and Construction).</p>
        <p>For any queries related to data protection, you can contact our Data Protection Officer (DPO) through the email address provided.</p>
      </>
    ),
  },
  {
    id: 'data-collected',
    title: '2. Data We Collect',
    content: (
      <>
        <p>We may collect and process the following types of personal data:</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.1 Registration and contact data</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>First and last name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Postal address</li>
          <li>Country of residence</li>
          <li>Company or organization</li>
          <li>Job title or position</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.2 Browsing data</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>IP address</li>
          <li>Browser type and operating system</li>
          <li>Pages visited and browsing time</li>
          <li>Date and time of access</li>
          <li>Visit origin (referrer)</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.3 Certification data</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Academic and professional history</li>
          <li>Experience in BIM projects</li>
          <li>Exam and assessment results</li>
          <li>Certifications obtained and their validity</li>
          <li>Supporting documentation (CV, references)</li>
        </ul>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.4 Cookies and similar technologies</h3>
        <p>Please see our <a href="/en/legal/cookies" className="text-[#0066CC] hover:underline">Cookie Policy</a> for detailed information on the use of cookies and tracking technologies.</p>
      </>
    ),
  },
  {
    id: 'legal-basis',
    title: '3. Legal Basis',
    content: (
      <>
        <p>The processing of your personal data is based on one or more of the following legal grounds:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Consent:</strong> When you voluntarily provide your data to receive information, request certifications or register for our services.</li>
          <li><strong>Contract performance:</strong> To manage your certification request, formalize the contractual relationship and provide the contracted services.</li>
          <li><strong>Legal obligation:</strong> To comply with tax, accounting and regulatory obligations applicable to our activity.</li>
          <li><strong>Legitimate interests:</strong> To improve our services, ensure the security of our platforms, prevent fraud and conduct anonymized statistical analysis.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '4. How We Use Your Data',
    content: (
      <>
        <p>Your personal data is used for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Certification management:</strong> Process applications, assess eligibility, schedule exams, issue certificates and manage renewals.</li>
          <li><strong>Communication:</strong> Send information about your certifications, renewal reminders, regulatory updates and operational communications.</li>
          <li><strong>Customer support:</strong> Handle inquiries, resolve incidents and provide technical assistance.</li>
          <li><strong>Service improvement:</strong> Analyze the use of our services to identify areas for improvement and develop new training products.</li>
          <li><strong>Marketing (with consent):</strong> Send newsletters, information about events, courses and BIM-related services, provided you have given explicit consent.</li>
          <li><strong>Legal compliance:</strong> Comply with legal obligations, respond to authority requests and exercise or defend rights in legal proceedings.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-sharing',
    title: '5. Data Sharing',
    content: (
      <>
        <p>AECMI does not sell, rent or trade your personal data to third parties. However, we may share information in the following circumstances:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Service providers:</strong> Companies that provide us with hosting, email management, online exam platforms and analytics tools. These providers act as data processors under contract and adequate guarantees.</li>
          <li><strong>Partner institutions:</strong> Accredited universities and training centers with which we have agreements, only when necessary for the academic validation of certifications.</li>
          <li><strong>Regulatory bodies:</strong> Competent authorities when there is a legal obligation or formal request.</li>
          <li><strong>International transfers:</strong> If any service provider is located outside the European Economic Area (EEA), we ensure that appropriate safeguards are applied, such as Standard Contractual Clauses approved by the European Commission.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'user-rights',
    title: '6. User Rights',
    content: (
      <>
        <p>As the data subject, you have the following rights recognized by the GDPR and LOPDGDD:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Right of access:</strong> Obtain confirmation as to whether we are processing your personal data and, if so, access it.</li>
          <li><strong>Right to rectification:</strong> Request the correction of inaccurate data or the completion of incomplete data.</li>
          <li><strong>Right to erasure ("right to be forgotten"):</strong> Request the deletion of your data when it is no longer necessary for the purposes for which it was collected, or when you withdraw your consent.</li>
          <li><strong>Right to restriction of processing:</strong> Request the restriction of the processing of your data in certain circumstances.</li>
          <li><strong>Right to data portability:</strong> Receive your data in a structured, commonly used and machine-readable format, and transmit it to another controller.</li>
          <li><strong>Right to object:</strong> Object to the processing of your data based on legitimate interests, including profiling.</li>
          <li><strong>Right not to be subject to automated decisions:</strong> Including profiling, which produce significant legal effects.</li>
        </ul>
        <p className="mt-4">To exercise any of these rights, please send a written request to <a href="mailto:privacy@aecmi.com" className="text-[#0066CC] hover:underline">privacy@aecmi.com</a>, including a copy of your identification document. We will respond within a maximum period of 30 days.</p>
        <p>You also have the right to lodge a complaint with the Spanish Data Protection Agency (AEPD) if you consider that the processing of your data violates applicable regulations.</p>
      </>
    ),
  },
  {
    id: 'security',
    title: '7. Information Security',
    content: (
      <>
        <p>We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk of personal data processing:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Encryption:</strong> Use of SSL/TLS protocols for data transmission. Sensitive information encrypted at rest.</li>
          <li><strong>Access control:</strong> Robust authentication systems, secure passwords and role-based access policies.</li>
          <li><strong>Periodic audits:</strong> Regular security reviews, vulnerability analysis and penetration testing.</li>
          <li><strong>Staff training:</strong> Continuous training in data protection and security best practices.</li>
          <li><strong>Backups:</strong> Periodic backups to ensure information availability and recovery.</li>
          <li><strong>Incident logging:</strong> We maintain a security breach register and notify the supervisory authority and affected parties when appropriate.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'retention',
    title: '8. Data Retention',
    content: (
      <>
        <p>We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, as well as to comply with applicable legal obligations:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>User registration data:</strong> As long as you maintain an active account on our platforms. After cancellation, for the legally established period (generally 5 years).</li>
          <li><strong>Certification data:</strong> During the validity of the certification and corresponding renewal periods, plus the time necessary to accredit historical issuance.</li>
          <li><strong>Unapproved application data:</strong> For 2 years from the resolution of the application.</li>
          <li><strong>Commercial communication data:</strong> Until you withdraw your consent or request to unsubscribe.</li>
          <li><strong>Cookie data:</strong> In accordance with our Cookie Policy.</li>
        </ul>
        <p className="mt-4">Once the retention period has ended, the data is securely deleted or anonymized for statistical purposes.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '9. Privacy Contact',
    content: (
      <>
        <p>For any queries, requests or complaints related to personal data protection, you can contact us through:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:privacy@aecmi.com" className="text-[#0066CC] hover:underline">privacy@aecmi.com</a></li>
          <li><strong>Postal address:</strong> AECMI — Data Protection Officer, Madrid, Spain</li>
          <li><strong>Contact form:</strong> Available on our <a href="/en/contact" className="text-[#0066CC] hover:underline">contact page</a></li>
        </ul>
        <p className="mt-4">We are committed to responding to all requests within a maximum period of 30 calendar days.</p>
      </>
    ),
  },
  {
    id: 'changes',
    title: '10. Changes to the Privacy Policy',
    content: (
      <>
        <p>AECMI reserves the right to modify this Privacy Policy at any time to adapt it to legislative developments, changes in our services or improvements in our data protection practices.</p>
        <p>When we make significant changes, we will notify you through:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li>A prominent notice on our website</li>
          <li>An email to the address associated with your account</li>
          <li>A notification in your user dashboard, if applicable</li>
        </ul>
        <p className="mt-4">We recommend that you periodically review this policy to stay informed about how we protect your information. Your continued use of our services after any modification will constitute acceptance of the new terms.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="en"
      title="Privacy Policy"
      subtitle="Our commitment to protecting your personal data"
      lastUpdated="January 15, 2025"
      sections={sections}
      type="privacy"
    />
  );
}
