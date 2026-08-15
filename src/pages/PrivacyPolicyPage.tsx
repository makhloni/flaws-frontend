import LegalPageLayout, { LegalSection, LegalList } from '../components/LegalPageLayout'

const RED = '#C1272D'
const linkStyle = { color: RED, textDecoration: 'underline' }

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated="13 August 2026"
      intro={
        <>
          <p>FLAWS respects your privacy and is committed to protecting the personal information you provide to us.</p>
          <p style={{ marginTop: '0.75rem' }}>This Privacy Policy explains how FLAWS collects, uses, stores, shares and protects personal information when you visit flawswrldwide.com, purchase products from us, communicate with us, subscribe to our marketing communications, or otherwise interact with FLAWS.</p>
          <p style={{ marginTop: '0.75rem' }}>This Privacy Policy should be read together with our <a href="/terms" style={linkStyle}>Terms & Conditions</a>, <a href="/returns" style={linkStyle}>Refund & Cancellation Policy</a>, and <a href="/shipping" style={linkStyle}>Shipping & Delivery Policy</a>.</p>
          <p style={{ marginTop: '0.75rem' }}>FLAWS processes personal information in accordance with applicable South African privacy laws, including the Protection of Personal Information Act 4 of 2013 (POPIA) where applicable.</p>
        </>
      }
    >
      <LegalSection title="1. Who We Are">
        <p>FLAWS is an independent fashion and lifestyle brand based in the Republic of South Africa. For purposes of applicable data-protection legislation, FLAWS acts as the responsible party in relation to personal information that we collect and process for our own business purposes.</p>
        <p style={{ color: '#fff' }}>FLAWS<br />South Africa<br />Website: flawswrldwide.com<br />Privacy Contact: Support@flawswrldwide.com</p>
        <p>If you have a question, request or complaint relating to your personal information, you may contact us using the details above.</p>
      </LegalSection>

      <LegalSection title="2. What Is Personal Information?">
        <p>"Personal information" generally refers to information that identifies or can reasonably be used to identify an individual. Depending on how you interact with FLAWS, this may include:</p>
        <LegalList items={[
          'Your name and surname', 'Email address', 'Telephone or mobile number', 'Billing address',
          'Delivery address', 'Postal address', 'Account information', 'Order and purchase history',
          'Product preferences', 'Communications with FLAWS', 'Marketing preferences',
          'Reviews or other content you submit', 'IP address', 'Browser and device information',
          'Website usage information', 'Cookie information', 'Other information that you voluntarily provide to us',
        ]} />
        <p>We only seek to collect personal information that is reasonably necessary for the purposes described in this Privacy Policy or otherwise permitted by applicable law.</p>
      </LegalSection>

      <LegalSection title="3. How We Collect Personal Information">
        <p>We may collect personal information directly from you when you:</p>
        <LegalList items={[
          'Visit or use our website', 'Create an account', 'Place an order', 'Complete the checkout process',
          'Subscribe to our mailing list', 'Contact customer support', 'Submit an enquiry',
          'Enter a competition or promotion', 'Submit a product review', 'Interact with us through social media',
          'Request information from us', 'Otherwise voluntarily provide information to FLAWS',
        ]} />
        <p>We may also receive certain information automatically when you interact with our website, such as technical information, device information, IP address and website usage information.</p>
      </LegalSection>

      <LegalSection title="4. Payment Information">
        <p>Payments made through our website may be processed by third-party payment providers, including Payfast. Your information may be shared with the relevant payment provider to process your payment securely.</p>
        <p>FLAWS does not intentionally store your full card number, card PIN or online-banking password. Payment providers may have their own privacy policies and terms.</p>
      </LegalSection>

      <LegalSection title="5. Who We Share Your Information With">
        <p>We may share necessary information with trusted service providers, including:</p>
        <LegalList items={[
          'Payment providers', 'Courier and delivery companies', 'Website and e-commerce service providers',
          'Analytics and technology providers', 'Professional advisers where necessary',
        ]} />
        <p>We may also disclose information where required by law. We only share information where reasonably necessary for the relevant purpose.</p>
      </LegalSection>

      <LegalSection title="6. Cookies">
        <p>Our website may use cookies and similar technologies to help the website function properly and understand how visitors use it. Cookies may be used to remember preferences, keep your shopping cart functioning, improve website performance, and understand website traffic.</p>
        <p>You can manage or disable cookies through your browser settings. Some website features may not work correctly if cookies are disabled.</p>
      </LegalSection>

      <LegalSection title="7. Your Privacy Rights">
        <p>We take reasonable steps to protect your personal information from loss, misuse and unauthorised access. We only keep your information for as long as reasonably necessary, unless we are required by law to keep it for longer.</p>
        <p>Subject to applicable law, you may have the right to:</p>
        <LegalList items={[
          'Ask what personal information we hold about you',
          'Request access to your information',
          'Ask us to correct inaccurate information',
          'Request deletion of your information where legally appropriate',
          'Object to certain uses of your information, including direct marketing',
        ]} />
        <p>To make a privacy-related request, contact <a href="mailto:support@flawswrldwide.com" style={linkStyle}>support@flawswrldwide.com</a>. We may need to verify your identity before processing certain requests.</p>
      </LegalSection>
    </LegalPageLayout>
  )
}