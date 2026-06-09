import type { Metadata } from 'next';
import LegalPage from '@/components/legal-page';
import { BRAND } from '@/constants/brand';

export const metadata: Metadata = {
  title: `Terms & Conditions | ${BRAND.name}`,
  description: `The terms that govern your use of ${BRAND.name} and purchases from our store.`,
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms & Conditions"
      updated="June 2026"
      intro={`Welcome to ${BRAND.name}. By using our website and placing an order, you agree to the terms below.`}
      sections={[
        {
          heading: 'Eligibility',
          body: [
            `You must be able to enter into a binding contract to shop with ${BRAND.name}. By using this site you confirm that you meet this requirement.`,
          ],
        },
        {
          heading: 'Orders & Pricing',
          body: [
            'All orders are subject to acceptance and availability. Prices are shown in your local currency and may change without notice.',
            'We reserve the right to cancel any order in the event of a pricing or stock error.',
          ],
        },
        {
          heading: 'Shipping & Delivery',
          body: [
            'We aim to dispatch orders within 1–3 business days. Delivery times may vary by destination.',
          ],
        },
        {
          heading: 'Returns & Refunds',
          body: [
            'Unworn items with original tags attached may be returned within 30 days. Sale items and altered garments may be excluded — contact support for assistance.',
          ],
        },
        {
          heading: 'Intellectual Property',
          body: [
            `All content on this site — including logos, text and imagery — is the property of ${BRAND.name} and may not be reused without permission.`,
          ],
        },
        {
          heading: 'Limitation of Liability',
          body: [
            'Products are provided for personal use. We are not liable for damage caused by improper care or use of any item purchased from our store.',
          ],
        },
      ]}
    />
  );
}
