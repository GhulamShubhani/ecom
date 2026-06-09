import type { Metadata } from 'next';
import LegalPage from '@/components/legal-page';
import { BRAND } from '@/constants/brand';

export const metadata: Metadata = {
  title: `Privacy Policy | ${BRAND.name}`,
  description: `How ${BRAND.name} collects, uses and protects your personal information.`,
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="June 2026"
      intro={`Your privacy matters to us. This policy explains how ${BRAND.name} collects, uses and safeguards your information.`}
      sections={[
        {
          heading: 'Information We Collect',
          body: [
            'We collect the details you provide at checkout or when contacting us, such as your name, email, shipping address and order history.',
            'We also collect limited technical data (like device and browsing information) to improve your shopping experience.',
          ],
        },
        {
          heading: 'How We Use Your Information',
          body: [
            'Your information is used to process orders, provide support, send order updates and — only with your consent — share exclusive offers.',
            'We never sell your personal data to third parties.',
          ],
        },
        {
          heading: 'Billing & Shipping',
          body: [
            'Orders ship in branded or neutral packaging depending on your region. Your bank or card statement shows our store name for easy reference.',
          ],
        },
        {
          heading: 'Cookies',
          body: [
            'We use cookies to keep your cart, remember preferences and measure site performance. You can disable cookies in your browser at any time.',
          ],
        },
        {
          heading: 'Your Rights',
          body: [
            'You may request access to, correction of, or deletion of your personal data at any time by contacting our support team.',
          ],
        },
      ]}
    />
  );
}
