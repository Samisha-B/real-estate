import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import { site } from '@/config/site';

const docs: Record<string, { title: string; sections: [string, string][] }> = {
  privacy: {
    title: 'Privacy Policy',
    sections: [
      ['Information we collect', 'We may collect contact details and property preferences that you submit through our forms, plus basic usage analytics.'],
      ['How we use it', 'To respond to inquiries, schedule tours and valuations, and improve our services. We do not sell personal information.'],
      ['Your choices', 'You may request access to or deletion of your information by contacting us at ' + site.email + '.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    sections: [
      ['Use of this website', 'Listing information is provided for general purposes, is subject to change and is not guaranteed. Verify all details independently.'],
      ['No advice', 'Calculators and articles are informational estimates and are not financial, legal or tax advice.'],
      ['Limitation', 'To the extent permitted by law, ' + site.name + ' is not liable for losses arising from use of this site.'],
    ],
  },
  'fair-housing': {
    title: 'Fair Housing & Equal Housing Opportunity',
    sections: [
      ['Our commitment', site.name + ' is pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Nation.'],
      ['Protected classes', 'We do not discriminate on the basis of race, color, religion, sex, handicap, familial status or national origin, nor on any basis protected by state or local law.'],
      ['Report a concern', 'If you believe you have experienced housing discrimination, contact HUD at hud.gov/fairhousing or call 1-800-669-9777.'],
    ],
  },
};

export function generateStaticParams() { return Object.keys(docs).map((slug) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { return { title: docs[params.slug]?.title || 'Legal' }; }

export default function Page({ params }: { params: { slug: string } }) {
  const d = docs[params.slug];
  if (!d) notFound();
  return (
    <>
      <PageHead eyebrow="Legal" title={d.title} />
      <section className="section">
        <div className="wrap legal" style={{ maxWidth: 780 }}>
          <p className="small muted">Template text for demonstration. Have qualified counsel review and adapt before publishing.</p>
          {d.sections.map(([h, t]) => <div key={h}><h2>{h}</h2><p>{t}</p></div>)}
        </div>
      </section>
    </>
  );
}
