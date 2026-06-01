import LegalPage from '@/components/sections/LegalPage';

export const metadata = {
  title: 'Cookie Policy — AECOMI',
  description: 'AECOMI Cookie Policy. Information about the use of cookies and tracking technologies on our website.',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: (
      <>
        <p>At AECOMI, we use cookies and similar technologies to enhance your experience on our website, analyze traffic and personalize content. This Cookie Policy explains what cookies are, how we use them, what types of cookies we employ and how you can manage your preferences.</p>
        <p>By continuing to browse our website without changing your cookie settings, we understand that you consent to the use of cookies as established in this policy.</p>
      </>
    ),
  },
  {
    id: 'what-are',
    title: '1. What are Cookies?',
    content: (
      <>
        <p>A cookie is a small text file that is stored on your device (computer, tablet, mobile phone) when you visit a website. Cookies allow the website to remember your actions and preferences for a period of time, so you don't have to re-enter them each time you return to the site or browse between pages.</p>
        <p>Cookies can be:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>First-party cookies:</strong> Sent and managed directly by AECOMI.</li>
          <li><strong>Third-party cookies:</strong> Sent by external domains that provide services on our site (for example, analytics, advertising, social networks).</li>
          <li><strong>Session cookies:</strong> Automatically deleted when you close your browser.</li>
          <li><strong>Persistent cookies:</strong> Remain on your device for a determined period or until you manually delete them.</li>
        </ul>
        <p className="mt-4">In addition to cookies, we use other similar tracking technologies such as web beacons, tracking pixels and local storage to collect information about your browsing.</p>
      </>
    ),
  },
  {
    id: 'cookies-we-use',
    title: '2. Cookies We Use',
    content: (
      <>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">2.1 Necessary (Technical) Cookies</h3>
        <p>These cookies are essential for the website to function and cannot be disabled in our systems. They are usually set only in response to actions taken by you, such as setting your privacy preferences, logging in or filling out forms.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>User authentication</li>
          <li>Site security (fraud prevention)</li>
          <li>Session and language preferences</li>
          <li>Basic navigation functionalities</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.2 Analytics (Statistics) Cookies</h3>
        <p>These cookies allow us to count visits and traffic sources so that we can measure and improve the performance of our website. They help us know which pages are the most and least popular and understand how visitors move around the site.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Google Analytics 4: traffic and user behavior analysis</li>
          <li>Page views and time on site tracking</li>
          <li>Traffic origin analysis (organic, direct, referred)</li>
          <li>Site performance metrics</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.3 Marketing and Advertising Cookies</h3>
        <p>These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant ads on other websites.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Interest-based personalized advertising</li>
          <li>Campaign conversion tracking</li>
          <li>Retargeting and remarketing</li>
          <li>Ad frequency capping</li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-6 mb-2">2.4 Social Media Cookies</h3>
        <p>These cookies enable integration with social media platforms (LinkedIn, Twitter/X, YouTube) and allow you to share content directly from our website.</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Content share buttons</li>
          <li>Embedded social feed display</li>
          <li>Login via social profiles</li>
        </ul>
      </>
    ),
  },
  {
    id: 'consent',
    title: '3. Cookie Consent',
    content: (
      <>
        <p>When you first access our website, a cookie banner is displayed informing you about the use of cookies and requesting your consent for those that are not strictly necessary.</p>
        <p>You have the following options:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Accept all:</strong> You consent to the use of all categories of cookies described in this policy.</li>
          <li><strong>Reject optional:</strong> Only necessary cookies for site operation will be used.</li>
          <li><strong>Configure preferences:</strong> Select granularly which categories of cookies you accept.</li>
        </ul>
        <p className="mt-4">Your consent is stored for 12 months, after which you will be asked again. You can modify your preferences at any time using the cookie management link available in the footer of our site.</p>
      </>
    ),
  },
  {
    id: 'managing',
    title: '4. Managing Cookies',
    content: (
      <>
        <p>You can control and manage cookies in various ways:</p>
        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.1 From our preferences panel</h3>
        <p>Click on the "Manage Cookies" link in the footer to access our preferences panel, where you can activate or deactivate different categories of cookies granularly.</p>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.2 From your browser settings</h3>
        <p>All modern browsers allow you to control cookies through their preferences. Below are links to instructions for the most popular browsers:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Safari (Mac)</a></li>
          <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Microsoft Edge</a></li>
        </ul>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.3 Third-party opt-out tools</h3>
        <p>To disable Google Analytics tracking on all websites, you can install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Google Analytics opt-out browser add-on</a>.</p>
        <p className="mt-2">To manage personalized advertising preferences, you can visit <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Your Online Choices</a>.</p>

        <h3 className="text-lg font-bold text-[#333] mt-4 mb-2">4.4 Warning about deleting cookies</h3>
        <p>Please note that disabling certain cookies may affect the functionality of our website and limit your user experience. Necessary cookies cannot be disabled as they are essential for the basic operation of the site.</p>
      </>
    ),
  },
  {
    id: 'third-party-cookies',
    title: '5. Third-Party Cookies',
    content: (
      <>
        <p>At AECOMI we use third-party services that may set cookies on your device. The main providers are detailed below:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Google Analytics 4:</strong> We use this service to analyze website traffic. Google may use the data collected to contextualize and personalize ads on its own advertising network. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0066CC] hover:underline">Google Privacy Policy</a></li>
          <li><strong>Google Fonts:</strong> We use Google Fonts for site typography. Google may collect information about your browser when loading fonts.</li>
          <li><strong>Social media platforms:</strong> Share buttons and embedded social content may set third-party cookies.</li>
        </ul>
        <p className="mt-4">We recommend that you review the privacy policies of these third parties to understand how they use your data.</p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: (
      <>
        <p>In relation to the use of cookies, you have the following rights:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Right to reject cookies:</strong> You can reject the use of optional cookies at any time through our preferences panel or your browser settings.</li>
          <li><strong>Right to withdraw consent:</strong> If you previously accepted the use of cookies, you can withdraw your consent at any time without affecting the lawfulness of processing based on consent before its withdrawal.</li>
          <li><strong>Right to control:</strong> You can view, delete or limit the use of cookies through your browser configuration tools.</li>
        </ul>
        <p className="mt-4">For more information about your data protection rights, please see our <a href="/en/legal/privacy" className="text-[#0066CC] hover:underline">Privacy Policy</a>.</p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '7. Contact',
    content: (
      <>
        <p>If you have any questions about our Cookie Policy or how we manage cookies on our website, you can contact us through:</p>
        <ul className="list-disc pl-5 space-y-2 mt-3">
          <li><strong>Email:</strong> <a href="mailto:privacy@aecomi.com" className="text-[#0066CC] hover:underline">privacy@aecomi.com</a></li>
          <li><strong>Contact form:</strong> <a href="/en/contact" className="text-[#0066CC] hover:underline">aecomi.com/contact</a></li>
        </ul>
      </>
    ),
  },
  {
    id: 'last-updated',
    title: '8. Last Updated',
    content: (
      <>
        <p>This Cookie Policy was last updated on <strong>January 15, 2025</strong>.</p>
        <p>We reserve the right to modify this policy at any time to reflect changes in the cookies we use or for other operational, legal or regulatory reasons. Any significant changes will be notified through a banner on our website or by email.</p>
        <p>We recommend that you periodically review this page to stay informed about our cookie practices.</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <LegalPage
      locale="en"
      title="Cookie Policy"
      subtitle="Information about the use of cookies on our website"
      lastUpdated="January 15, 2025"
      sections={sections}
      type="cookies"
    />
  );
}
