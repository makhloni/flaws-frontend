import LegalPageLayout, { LegalSection, LegalList } from '../components/LegalPageLayout'

const RED = '#C1272D'
const linkStyle = { color: RED, textDecoration: 'underline' }

export default function ShippingPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Shipping & Delivery"
      lastUpdated="13 August 2026"
      intro={
        <>
          <p>We want your FLAWS order to reach you safely and on time. This Shipping & Delivery Policy explains how orders placed through flawswrldwide.com are processed, dispatched and delivered.</p>
          <p style={{ marginTop: '0.75rem' }}>This policy should be read together with our <a href="/terms" style={linkStyle}>Terms & Conditions</a> and <a href="/returns" style={linkStyle}>Refund & Cancellation Policy</a>.</p>
        </>
      }
    >
      <LegalSection title="1. Where We Deliver">
        <p>FLAWS currently offers delivery within South Africa. Available delivery options and applicable delivery fees will be displayed during checkout before you complete your purchase.</p>
        <p>If international shipping becomes available, the applicable countries, delivery options and charges will be communicated at checkout.</p>
      </LegalSection>

      <LegalSection title="2. Order Processing">
        <p>Once your order has been successfully placed and payment has been confirmed, we will begin processing your order. Orders are generally processed within 5–6 business days.</p>
        <p>Please note that orders placed during product launches, limited drops, promotions or periods of high demand may require additional processing time. Once your order has been dispatched, you will receive delivery or tracking information where available.</p>
      </LegalSection>

      <LegalSection title="3. Delivery Times">
        <p>Delivery times depend on your location and the courier service used. Estimated delivery times will be communicated during checkout or through your order confirmation.</p>
        <p>Delivery estimates are not guaranteed and may be affected by circumstances outside of FLAWS's reasonable control, including:</p>
        <LegalList items={[
          'Courier delays', 'Public holidays', 'Severe weather', 'Incorrect delivery information',
          'Transport disruptions', 'Operational delays', 'Other unforeseen circumstances',
        ]} />
      </LegalSection>

      <LegalSection title="4. Delivery Address">
        <p>Please make sure that your delivery information is correct before completing your order. FLAWS is not responsible for delays or failed deliveries caused by incorrect or incomplete information provided by the customer.</p>
        <p>If an order needs to be re-delivered because incorrect information was provided, additional delivery charges may apply where permitted by law.</p>
      </LegalSection>

      <LegalSection title="5. Tracking">
        <p>Where tracking is available, you will receive your tracking information once your order has been dispatched. You can use the tracking information provided to monitor the progress of your delivery.</p>
        <p>Once an order has been handed over to the courier, delivery times and updates may be controlled by the courier.</p>
      </LegalSection>

      <LegalSection title="6. Failed or Missed Deliveries">
        <p>If the courier is unable to deliver your order, they may attempt delivery again or contact you using the information provided with your order. If an order is returned to FLAWS because the customer was unavailable, provided an incorrect address, or otherwise failed to accept delivery, we will contact you regarding the next steps.</p>
        <p>Additional delivery charges may apply for re-delivery where the failed delivery was caused by information or circumstances within the customer's control.</p>
      </LegalSection>

      <LegalSection title="7. Damaged Packages">
        <p>If your package appears to be damaged when it arrives, please take photographs of the packaging and product before disposing of any packaging materials. Contact us as soon as possible at <a href="mailto:support@flawswrldwide.com" style={linkStyle}>support@flawswrldwide.com</a> with your order number and photographs showing the damage. We will assess the situation and work with you to determine the appropriate next steps.</p>
      </LegalSection>

      <LegalSection title="8. Lost Orders">
        <p>If your order appears to be significantly delayed or is marked as delivered but you have not received it, please contact us at <a href="mailto:contact@flawswrldwide.com" style={linkStyle}>contact@flawswrldwide.com</a>. We may need to contact the courier to investigate the delivery — please provide your order number and any relevant tracking information.</p>
      </LegalSection>

      <LegalSection title="9. Delivery Fees">
        <p>Delivery fees are calculated based on the delivery option and destination selected during checkout. The applicable delivery cost will be displayed before you complete your purchase. Any promotional free-shipping offers will be subject to the terms communicated with the relevant promotion.</p>
      </LegalSection>
    </LegalPageLayout>
  )
}