import LegalPageLayout, { LegalSection, LegalList } from '../components/LegalPageLayout'

const RED = '#C1272D'
const linkStyle = { color: RED, textDecoration: 'underline' }

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      lastUpdated="12 August 2026"
      intro={
        <>
          <p>These Terms & Conditions govern your use of the FLAWS website, flawswrldwide.com, and your purchase of products from FLAWS.</p>
          <p style={{ marginTop: '0.75rem' }}>By accessing our website, placing an order, creating an account, or otherwise using our services, you agree to be bound by these Terms & Conditions. If you do not agree with these terms, please do not use our website or purchase our products.</p>
          <p style={{ marginTop: '0.75rem' }}>FLAWS reserves the right to update these Terms & Conditions from time to time. Any changes will be published on this page, and your continued use of the website after changes have been published constitutes acceptance of the updated terms.</p>
        </>
      }
    >
      <LegalSection title="1. About FLAWS">
        <p>FLAWS is an independent fashion and lifestyle brand based in South Africa.</p>
        <p>For the purposes of these Terms & Conditions, references to "FLAWS," "we," "us," "our," or "the Brand" refer to FLAWS and its applicable business entity.</p>
        <p>References to "you," "your," or "customer" refer to any person accessing our website or purchasing products from us.</p>
      </LegalSection>

      <LegalSection title="2. Using Our Website">
        <p>You agree to use the FLAWS website only for lawful purposes. You must not:</p>
        <LegalList items={[
          'Use the website for fraudulent or unlawful activity',
          'Attempt to gain unauthorised access to our website, systems or customer information',
          'Interfere with the security or operation of the website',
          'Copy, reproduce, distribute or commercially exploit website content without our written permission',
          'Use automated systems, bots or scraping tools to collect information from the website without our permission',
          'Impersonate FLAWS or misrepresent your relationship with the Brand',
        ]} />
        <p>We reserve the right to restrict or terminate access to the website where we reasonably believe that these Terms & Conditions have been breached.</p>
      </LegalSection>

      <LegalSection title="3. Products">
        <p>We make reasonable efforts to ensure that product descriptions, images, colours, measurements and other information displayed on the website are accurate. However, slight variations may occur due to:</p>
        <LegalList items={[
          'Screen and display settings',
          'Photography and lighting',
          'Manufacturing processes',
          'Fabric characteristics',
          'Garment washing or finishing processes',
          'The nature of individual materials',
        ]} />
        <p>These variations do not automatically constitute a defect. Where a product has specific characteristics, such as garment washing, distressing, fading, irregularities or other intentional design details, these characteristics may vary from one item to another and may form part of the intended appearance of the product.</p>
      </LegalSection>

      <LegalSection title="4. Product Availability">
        <p>All products are subject to availability. Some FLAWS products may be produced in limited quantities or as part of limited releases. A product being displayed on the website does not guarantee that it will remain available.</p>
        <p>We reserve the right to limit quantities purchased per customer where reasonably necessary, particularly for limited releases, promotional products or products experiencing unusually high demand.</p>
        <p>If we are unable to fulfil an order after payment has been received, we will contact you and provide an appropriate remedy in accordance with applicable law.</p>
      </LegalSection>

      <LegalSection title="5. Prices">
        <p>All prices displayed on the website are stated in South African Rand (ZAR) unless otherwise indicated.</p>
        <p>Prices may change without notice. However, once an order has been successfully accepted and confirmed, the price applicable to that order will generally be the price displayed at the time of purchase, subject to applicable law.</p>
        <p>We reserve the right to correct pricing errors, product information errors or other obvious website errors. If an obvious error has resulted in an incorrect price being displayed, we will contact you before fulfilling the affected order.</p>
      </LegalSection>

      <LegalSection title="6. Orders">
        <p>When you place an order through the FLAWS website, you are making an offer to purchase the selected products. Your order is not necessarily accepted merely because you have completed checkout or received an automated order acknowledgement.</p>
        <p>An order confirmation or acknowledgement confirms that we have received your order. We may subsequently accept or decline the order where permitted by law. Once an order has been accepted, we will provide confirmation of the order and relevant delivery information.</p>
        <p>We reserve the right to refuse or cancel an order where:</p>
        <LegalList items={[
          'The product is unavailable',
          'There is an obvious pricing or product-information error',
          'We reasonably suspect fraudulent or unauthorised activity',
          'The order violates a quantity restriction',
          'Payment cannot be successfully processed',
          'We are otherwise unable to fulfil the order for a legitimate reason',
        ]} />
        <p>Where payment has already been made for an order that we are unable to fulfil, we will process an appropriate refund in accordance with applicable law.</p>
      </LegalSection>

      <LegalSection title="7. Payment">
        <p>Payments must be completed using the payment methods made available during checkout. You represent that you are authorised to use the payment method provided.</p>
        <p>FLAWS does not store complete payment-card information where payment processing is handled by an independent payment service provider. Payment information may be processed by third-party payment providers in accordance with their own terms and privacy policies.</p>
      </LegalSection>

      <LegalSection title="8. Shipping & Delivery">
        <p>We currently offer delivery to locations supported by our available delivery services. Delivery times displayed on the website are estimates unless expressly stated otherwise.</p>
        <p>Once an order has been dispatched, you may receive tracking information where available. Delivery times may be affected by circumstances outside of our reasonable control, including courier delays, incorrect or incomplete delivery information, public holidays, severe weather, operational disruptions, strikes or industrial action, and other unforeseen circumstances.</p>
        <p>You are responsible for providing accurate delivery information at checkout. If incorrect or incomplete information supplied by you results in a failed delivery or additional delivery, you may be responsible for those additional costs to the extent permitted by law.</p>
        <p>For full details, see our <a href="/shipping" style={linkStyle}>Shipping & Delivery Policy</a>.</p>
      </LegalSection>

      <LegalSection title="9. International Orders">
        <p>Where FLAWS offers international shipping, additional charges may apply. Customers placing international orders are responsible for complying with applicable import requirements in their destination country.</p>
        <p>Depending on the destination, you may be responsible for customs duties, import taxes, clearance fees or other charges imposed by the destination country. These charges are separate from the product price and shipping fee unless expressly stated otherwise.</p>
      </LegalSection>

      <LegalSection title="10. Returns, Refunds & Exchanges">
        <p>Our <a href="/returns" style={linkStyle}>Returns & Refunds Policy</a> forms part of these Terms & Conditions. Nothing in our Returns & Refunds Policy is intended to remove, restrict or waive any rights you may have under applicable consumer-protection legislation.</p>
        <p>Where a product is defective, unsafe, materially different from its description, or otherwise does not meet applicable legal requirements, your statutory rights remain unaffected.</p>
      </LegalSection>

      <LegalSection title="11. Product Care">
        <p>Customers are responsible for following the care instructions provided with each product. Care instructions may vary depending on the garment, fabric, construction and finishing process.</p>
        <p>Damage resulting from improper care, misuse, alteration, accidents or failure to follow the supplied care instructions may not be considered a manufacturing defect. Where a garment is intentionally distressed, washed, dyed, treated or otherwise finished, its appearance may naturally change with wear and washing.</p>
      </LegalSection>

      <LegalSection title="12. Intellectual Property">
        <p>All content appearing on the FLAWS website is owned by or licensed to FLAWS unless otherwise stated. This includes, but is not limited to:</p>
        <LegalList items={[
          'FLAWS trademarks and logos', 'Product designs', 'Garment designs', 'Graphics', 'Photography',
          'Videos', 'Illustrations', 'Written content', 'Website design', 'Brand names',
          'Collection names', 'Other original creative materials',
        ]} />
        <p>You may not reproduce, modify, distribute, sell, publicly display, commercially exploit or otherwise use FLAWS intellectual property without our prior written permission. Nothing in these Terms & Conditions grants you ownership or a licence to use FLAWS intellectual property except where expressly permitted.</p>
      </LegalSection>

      <LegalSection title="13. Brand Content & User Submissions">
        <p>If you voluntarily submit photographs, videos, reviews, comments or other content to FLAWS, you remain responsible for the content you submit. You must ensure that you have the necessary rights and permissions to submit such content.</p>
        <p>Where you provide content to FLAWS for use in connection with the Brand, you grant FLAWS a non-exclusive, royalty-free licence to use, reproduce, publish and display that content for marketing and promotional purposes, subject to applicable law and any specific agreement between you and FLAWS. FLAWS does not claim ownership of your original content merely because you submit it to us.</p>
      </LegalSection>

      <LegalSection title="14. Website Content">
        <p>We make reasonable efforts to keep the information on the website accurate and current. However, we do not guarantee that every piece of information will always be complete, accurate, current or error-free. This includes information relating to product availability, product descriptions, pricing, stock levels, delivery estimates, website functionality, and promotional information. We may update, modify or remove website content at any time.</p>
      </LegalSection>

      <LegalSection title="15. Third-Party Services">
        <p>The FLAWS website may use third-party services, including payment processors, delivery providers, website hosting providers, analytics services and other technology providers. These third parties may have their own terms and privacy policies. FLAWS is not responsible for the independent actions, policies or systems of third-party providers, except where liability cannot lawfully be excluded.</p>
      </LegalSection>

      <LegalSection title="16. Privacy & Personal Information">
        <p>FLAWS respects your privacy. Personal information collected through the website may be processed for purposes including processing and fulfilling orders, processing payments, delivering products, providing customer support, managing customer accounts, communicating with customers, improving our website and services, preventing fraud and abuse, and complying with legal obligations.</p>
        <p>FLAWS will process personal information in accordance with applicable privacy laws, including the Protection of Personal Information Act 4 of 2013 (POPIA) where applicable. For further information, please read our <a href="/privacy" style={linkStyle}>Privacy Policy</a>.</p>
      </LegalSection>

      <LegalSection title="17. Marketing Communications">
        <p>Where permitted by law, FLAWS may send marketing communications to customers who have subscribed to receive them. You may unsubscribe from marketing communications at any time by using the unsubscribe mechanism included in the relevant communication or by contacting us.</p>
        <p>Transactional communications, such as order confirmations, shipping notifications and customer-service communications, may still be sent where necessary to fulfil an order or provide a requested service.</p>
      </LegalSection>

      <LegalSection title="18. Website Security">
        <p>We take reasonable steps to maintain the security and integrity of our website. However, no website, electronic transaction or internet transmission can be guaranteed to be completely secure. You acknowledge that you use the internet and our website at your own risk, subject to rights and protections that cannot lawfully be excluded.</p>
      </LegalSection>

      <LegalSection title="19. Limitation of Liability">
        <p>To the maximum extent permitted by applicable law, FLAWS will not be liable for indirect, incidental, special or consequential losses arising from your use of the website or your inability to access the website.</p>
        <p>Nothing in these Terms & Conditions excludes or limits any liability that cannot lawfully be excluded or limited, or is intended to limit any consumer rights or remedies that you are entitled to under applicable law.</p>
      </LegalSection>

      <LegalSection title="20. Events Outside Our Control">
        <p>FLAWS will not be responsible for delays or failures caused by circumstances beyond our reasonable control. These circumstances may include natural disasters, fires, floods, pandemics, government actions, civil unrest, strikes, transportation disruptions, internet or telecommunications failures, supplier disruptions, courier disruptions or other events that could not reasonably have been prevented. Where reasonably possible, we will communicate significant disruptions affecting your order.</p>
      </LegalSection>

      <LegalSection title="21. Suspension or Termination">
        <p>We may suspend or terminate access to our website where necessary to protect the website, our customers, our business or our intellectual property. Termination or suspension will not affect rights or obligations that arose before termination.</p>
      </LegalSection>

      <LegalSection title="22. Governing Law">
        <p>These Terms & Conditions are governed by the laws of the Republic of South Africa, subject to any mandatory rights or protections applicable to consumers under the law. Nothing in these Terms & Conditions prevents a consumer from exercising a right or remedy that cannot lawfully be excluded.</p>
      </LegalSection>

      <LegalSection title="23. Consumer Rights">
        <p>Nothing contained in these Terms & Conditions is intended to deprive you of rights granted to you under applicable consumer-protection legislation. Where a provision of these Terms & Conditions conflicts with a mandatory provision of applicable law, the mandatory legal provision will prevail to the extent of the conflict.</p>
        <p>The South African Consumer Protection Act establishes rights relating to fair dealing, fair contract terms, product quality, warranties and consumer information.</p>
      </LegalSection>

      <LegalSection title="24. Changes to These Terms">
        <p>FLAWS may update these Terms & Conditions from time to time. The updated version will be published on this page together with the date on which it was last updated. You should review this page periodically to remain informed about the terms applicable to your use of the website.</p>
      </LegalSection>

      <LegalSection title="25. Contact Us">
        <p>If you have questions regarding these Terms & Conditions, an order, a product or any other matter relating to FLAWS, please contact us through the <a href="/contact" style={linkStyle}>contact page</a>.</p>
        <p style={{ color: '#fff' }}>FLAWS<br />South Africa<br />Website: flawswrldwide.com<br />Email: Support@flawswrldwide.com</p>
      </LegalSection>
    </LegalPageLayout>
  )
}