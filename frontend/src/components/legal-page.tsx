import Link from 'next/link';

export type LegalSection = {
  heading: string;
  body: string[];
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-brand-oatmilk text-brand-burgundy">
      <section className="border-b border-brand-clay/15 bg-brand-sand/70">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <p className="eyebrow-brand mb-4">{eyebrow}</p>
          <h1 className="heading-brand mb-5 text-4xl text-brand-burgundy md:text-5xl">{title}</h1>
          <p className="max-w-2xl leading-relaxed text-brand-burgundy/65">{intro}</p>
          <p className="mt-6 text-xs uppercase tracking-wider2 text-brand-burgundy/45">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <div className="space-y-10">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="heading-brand mb-3 text-xl text-brand-burgundy md:text-2xl">{section.heading}</h2>
              {section.body.map((paragraph, idx) => (
                <p
                  key={`${section.heading}-${idx}`}
                  className="mb-3 leading-relaxed text-brand-burgundy/65"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-brand-clay/20 pt-8 text-sm text-brand-burgundy/60">
          Questions about this policy?{' '}
          <Link href="/contact" className="text-brand-burgundy underline underline-offset-4 hover:text-brand-clay">
            Contact our team
          </Link>
          .
        </div>
      </section>
    </main>
  );
}
