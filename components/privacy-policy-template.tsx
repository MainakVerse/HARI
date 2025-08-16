interface PrivacyPolicyTemplateProps {
  companyName: string
  websiteUrl: string
  contactEmail: string
  contactAddress: string
  lastUpdated: string
  includeGDPR?: boolean
  includeCCPA?: boolean
  includeCookies?: boolean
  includeAnalytics?: boolean
  includeThirdPartyServices?: string[]
}

export default function PrivacyPolicyTemplate({
  companyName,
  websiteUrl,
  contactEmail,
  contactAddress,
  lastUpdated,
  includeGDPR = true,
  includeCCPA = true,
  includeCookies = true,
  includeAnalytics = true,
  includeThirdPartyServices = [],
}: PrivacyPolicyTemplateProps) {
  return (
    <div className="prose prose-lg prose-blue max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-4xl prose-h1:mb-6 prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-blue-600 dark:prose-h2:text-blue-400 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-p:leading-relaxed prose-p:mb-6 prose-ul:mb-6 prose-li:mb-2">
      <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
        <p className="text-lg text-blue-800 dark:text-blue-200 mb-0 leading-relaxed">
          At <strong>{companyName}</strong>, we take your privacy seriously. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit our website{" "}
          <strong>{websiteUrl}</strong> and use our services. Please read this privacy policy carefully. If you do not
          agree with the terms of this privacy policy, please do not access our website or use our services.
        </p>
      </div>

      <h2>Information We Collect</h2>
      <p>
        We collect information that you provide directly to us when you register for an account, create or modify your
        profile, set preferences, sign-up for or make purchases through our services. This information may include:
      </p>
      <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-6">
        <ul className="space-y-2 mb-0">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Personal identifiers (name, email address, phone number)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Account credentials (username, password)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Billing information (credit card details, billing address)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Company information (company name, size, industry)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>User-generated content (prompts, queries, feedback)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
            <span>Usage data (features used, interaction patterns)</span>
          </li>
        </ul>
      </div>

      <h2>How We Use Your Information</h2>
      <p>We may use the information we collect for various purposes, including to:</p>
      <ul>
        <li>Provide, maintain, and improve our services</li>
        <li>Process transactions and send related information</li>
        <li>Send administrative messages, updates, security alerts, and support messages</li>
        <li>Respond to your comments, questions, and requests</li>
        <li>Personalize your experience and deliver content relevant to your interests</li>
        <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
        <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
        <li>Comply with legal obligations</li>
      </ul>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6 my-8">
        <h2 className="mt-0 mb-4 text-amber-800 dark:text-amber-200">Data Storage and Security</h2>
        <p className="mb-4">
          We implement appropriate technical and organizational measures to protect the security of your personal
          information. However, please be aware that no security measures are perfect or impenetrable, and we cannot
          guarantee the security of your data transmitted to our services.
        </p>
        <p className="mb-0">
          Your data is stored on secure servers and we maintain strict access controls to protect your information. We
          use industry-standard encryption for data in transit and at rest.
        </p>
      </div>

      <h2>Data Retention</h2>
      <p>
        We retain personal information for as long as necessary to fulfill the purposes outlined in this privacy policy,
        unless a longer retention period is required or permitted by law. We will retain and use your information as
        necessary to comply with our legal obligations, resolve disputes, and enforce our agreements.
      </p>

      <h2>Sharing Your Information</h2>
      <p>We may share your information in the following situations:</p>
      <ul>
        <li>
          <strong>With Service Providers:</strong> We may share your information with third-party vendors, service
          providers, contractors, or agents who perform services for us.
        </li>
        <li>
          <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during
          negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our
          business.
        </li>
        <li>
          <strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.
        </li>
        <li>
          <strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in
          response to valid requests by public authorities.
        </li>
      </ul>

      {includeThirdPartyServices.length > 0 && (
        <>
          <h2>Third-Party Services</h2>
          <p>We may use third-party services that collect, monitor and analyze data. These include:</p>
          <ul>
            {includeThirdPartyServices.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </>
      )}

      {includeCookies && (
        <>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our services and hold certain
            information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
          </p>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>To maintain your authenticated session and preferences</li>
            <li>To understand how you use our services</li>
            <li>To enhance the security of our services</li>
            <li>To personalize your experience</li>
            <li>To analyze the effectiveness of our marketing campaigns</li>
          </ul>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our services.
          </p>
        </>
      )}

      {includeAnalytics && (
        <>
          <h2>Analytics</h2>
          <p>
            We may use third-party Service Providers to monitor and analyze the use of our services. These services help
            us understand how users interact with our services, which pages are visited most often, and how users
            navigate through our website. This information is used to improve our services and user experience.
          </p>
        </>
      )}

      <h2>Your Privacy Rights</h2>
      <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
      <ul>
        <li>The right to access personal information we hold about you</li>
        <li>The right to request correction of inaccurate personal information</li>
        <li>The right to request deletion of your personal information</li>
        <li>The right to object to processing of your personal information</li>
        <li>The right to data portability</li>
        <li>The right to withdraw consent</li>
      </ul>

      {includeGDPR && (
        <>
          <h3>GDPR Privacy Rights (For European Economic Area Residents)</h3>
          <p>
            If you are a resident of the European Economic Area (EEA), you have certain data protection rights under the
            General Data Protection Regulation (GDPR). We aim to take reasonable steps to allow you to correct, amend,
            delete, or limit the use of your Personal Information.
          </p>
          <p>Under the GDPR, you have the following specific rights:</p>
          <ul>
            <li>The right to access, update or delete the information we have on you</li>
            <li>
              The right of rectification - the right to have your information corrected if it is inaccurate or
              incomplete
            </li>
            <li>The right to object to our processing of your Personal Information</li>
            <li>
              The right of restriction - the right to request that we restrict the processing of your personal
              information
            </li>
            <li>
              The right to data portability - the right to be provided with a copy of your Personal Information in a
              structured, machine-readable and commonly used format
            </li>
            <li>
              The right to withdraw consent at any time where we relied on your consent to process your personal
              information
            </li>
          </ul>
          <p>
            To exercise these rights, please contact us using the contact information provided at the end of this
            Privacy Policy.
          </p>
        </>
      )}

      {includeCCPA && (
        <>
          <h3>CCPA Privacy Rights (For California Residents)</h3>
          <p>
            If you are a California resident, you have specific rights regarding your personal information under the
            California Consumer Privacy Act (CCPA). This section describes your CCPA rights and explains how to exercise
            those rights.
          </p>
          <p>Under the CCPA, you have the following rights:</p>
          <ul>
            <li>The right to know about the personal information we collect about you and how it is used and shared</li>
            <li>The right to delete personal information collected from you (with certain exceptions)</li>
            <li>The right to opt-out of the sale of your personal information</li>
            <li>The right to non-discrimination for exercising your CCPA rights</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the contact information provided at the end of this
            Privacy Policy.
          </p>
        </>
      )}

      <h2>Children's Privacy</h2>
      <p>
        Our services are not intended for individuals under the age of 16. We do not knowingly collect personal
        information from children under 16. If we learn we have collected or received personal information from a child
        under 16 without verification of parental consent, we will delete that information.
      </p>

      <h2>International Data Transfers</h2>
      <p>
        Your information may be transferred to, and maintained on, computers located outside of your state, province,
        country, or other governmental jurisdiction where the data protection laws may differ from those in your
        jurisdiction.
      </p>
      <p>
        If you are located outside the United States and choose to provide information to us, please note that we
        transfer the data to the United States and process it there. Your consent to this Privacy Policy followed by
        your submission of such information represents your agreement to that transfer.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
        Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
      </p>
      <p>
        You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are
        effective when they are posted on this page.
      </p>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-8 mt-12 border border-blue-200 dark:border-blue-800">
        <h2 className="mt-0 mb-6 text-blue-800 dark:text-blue-200">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a
            href={`mailto:${contactEmail}`}
            className="font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {contactEmail}
          </a>{" "}
          or by mail at:
        </p>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
          <address className="not-italic text-slate-700 dark:text-slate-300 whitespace-pre-line">
            {contactAddress}
          </address>
        </div>
      </div>
    </div>
  )
}
