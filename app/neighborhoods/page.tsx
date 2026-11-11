import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import { NeighborhoodCard } from '@/components/Cards';
import { Reveal } from '@/components/ui';
import { neighborhoods } from '@/data/neighborhoods';

export const metadata: Metadata = { title: 'Neighborhoods' };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Explore" title="Neighborhoods We Know Best" text="Average prices are editable demo data." />
      <section className="section"><div className="wrap g3">{neighborhoods.map((n, i) => <Reveal key={n.slug} delay={(i % 3) * 100}><NeighborhoodCard n={n} /></Reveal>)}</div></section>
    </>
  );
}
