import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import { AgentCard } from '@/components/Cards';
import { Reveal } from '@/components/ui';
import { agents } from '@/data/agents';

export const metadata: Metadata = { title: 'Our Team' };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Our Team" title="Meet Our Agents" text="Experienced advisors with deep local knowledge. Fictional demo profiles." />
      <section className="section"><div className="wrap g3">{agents.map((a, i) => <Reveal key={a.slug} delay={(i % 3) * 100}><AgentCard a={a} /></Reveal>)}</div></section>
    </>
  );
}
