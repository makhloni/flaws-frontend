import LegalPageLayout, { LegalSection } from '../components/LegalPageLayout'

const RED = '#C1272D'
const linkStyle = { color: RED, textDecoration: 'underline' }

export default function ReturnsPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Refund & Returns Policy"
      lastUpdated="13 August 2026"
    >
      <LegalSection title="Return Policy">
        <p>We want you to be completely satisfied with your FLAWS purchase. If you change your mind about your purchase, you may request a return within <strong style={{ color: '#fff' }}>14 days</strong> of receiving your order, subject to the conditions below and any statutory rights applicable to your purchase.</p>
      </LegalSection>

      <LegalSection title="Return Conditions">
        <p>Items must be unworn, unwashed and unused, and returned in their original condition with tags and packaging where applicable.</p>
      </LegalSection>

      <LegalSection title="Return Process">
        <p>Contact FLAWS at <a href="mailto:support@flawswrldwide.com" style={linkStyle}>support@flawswrldwide.com</a> within 14 days of receiving your order. Include your order number and the reason for your return. We'll provide you with the next steps.</p>
      </LegalSection>

      <LegalSection title="Return Shipping">
        <p>For change-of-mind returns, the customer is responsible for the cost of return shipping. If we sent you the wrong item or the item is defective, FLAWS will cover the appropriate return costs.</p>
      </LegalSection>

      <LegalSection title="Refunds">
        <p>Once we receive and inspect your return, we'll confirm whether the refund has been approved. Approved refunds will be issued to the original payment method, subject to the applicable payment provider's processing times.</p>
      </LegalSection>

      <LegalSection title="Exchanges">
        <p>Exchanges may be requested subject to stock availability. If the requested size or product is unavailable, we'll provide the applicable refund or alternative remedy.</p>
      </LegalSection>

      <LegalSection title="Defective or Incorrect Items">
        <p>If you receive a defective or incorrect product, contact us as soon as possible with your order number and photographs of the issue. We'll assess the issue and provide an appropriate remedy in accordance with applicable law.</p>
      </LegalSection>

      <LegalSection title="Need Help?">
        <p>Contact <a href="mailto:support@flawswrldwide.com" style={linkStyle}>support@flawswrldwide.com</a> for questions about returns, refunds or exchanges — or visit our <a href="/contact" style={linkStyle}>contact page</a>.</p>
      </LegalSection>
    </LegalPageLayout>
  )
}