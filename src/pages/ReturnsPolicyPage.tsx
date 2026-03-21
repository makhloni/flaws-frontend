import { useBreakpoint } from '../hooks/useBreakpoint'

export default function ReturnsPolicyPage() {
  const { isMobile } = useBreakpoint()

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', paddingTop: '64px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: isMobile ? '3rem 1.5rem' : '6rem 2rem' }}>

        {/* Header */}
        <div style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '2rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#888', marginBottom: '0.75rem' }}>
            Legal
          </p>
          <h1 style={{ fontSize: isMobile ? '1.75rem' : '2.5rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Returns & Refunds
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#555', marginTop: '1rem' }}>
            Last updated: March 2026
          </p>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>

          <Section title="Our Policy">
            We want you to love what you ordered. If something isn't right, we'll make it right. You have <strong style={{ color: '#fff' }}>14 days</strong> from the date of delivery to request a return or exchange.
          </Section>

          <Section title="Eligibility">
            To be eligible for a return, your item must meet the following conditions:
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Item is unworn, unwashed, and in original condition',
                'All original tags are still attached',
                'Item is in its original packaging',
                'Item was not purchased on sale or marked as final sale',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.7 }}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="Non-Returnable Items">
            The following items cannot be returned:
            <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                'Sale or discounted items',
                'Accessories (caps, belts, bags)',
                'Items that have been worn, washed, or altered',
                'Items without original tags or packaging',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.7 }}>{item}</li>
              ))}
            </ul>
          </Section>

          <Section title="How to Return">
            <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Email us at returns@flaws.co.za with your order number and reason for return',
                'We will respond within 2 business days with return instructions',
                'Package your item securely and include your order number inside',
                'Ship the item to the address provided — return shipping is at your cost unless the item is defective',
                'Once received and inspected, we will process your refund or exchange within 5 business days',
              ].map((item, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.7 }}>{item}</li>
              ))}
            </ol>
          </Section>

          <Section title="Refunds">
            Once your return is approved, your refund will be processed to your original payment method within <strong style={{ color: '#fff' }}>5–10 business days</strong> depending on your bank. We will notify you via email once the refund has been issued.
          </Section>

          <Section title="Exchanges">
            We offer exchanges for different sizes or colours subject to availability. To request an exchange, follow the same process as a return and specify the item you'd like in its place.
          </Section>

          <Section title="Defective or Incorrect Items">
            If you received a defective, damaged, or incorrect item, please contact us within <strong style={{ color: '#fff' }}>48 hours</strong> of delivery at <a href="mailto:support@flaws.co.za" style={{ color: '#fff', textDecoration: 'underline' }}>support@flaws.co.za</a>. Include photos of the item and your order number. We will cover all shipping costs for defective or incorrect items.
          </Section>

          <Section title="Contact">
            For any questions about our returns policy, reach out to us at{' '}
            <a href="mailto:returns@flaws.co.za" style={{ color: '#fff', textDecoration: 'underline' }}>
              returns@flaws.co.za
            </a>{' '}
            or visit our{' '}
            <a href="/contact" style={{ color: '#fff', textDecoration: 'underline' }}>
              contact page
            </a>.
          </Section>

        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '2rem' }}>
      <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '1rem' }}>
        {title}
      </h2>
      <div style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.8 }}>
        {children}
      </div>
    </div>
  )
}