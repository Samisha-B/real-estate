import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import { PostCard } from '@/components/Cards';
import { Reveal } from '@/components/ui';
import { posts, postCategories } from '@/data/blog';

export const metadata: Metadata = { title: 'Insights' };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Blog" title="Real Estate Insights" text={postCategories.join(' · ')} />
      <section className="section"><div className="wrap g3">{posts.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 100}><PostCard p={p} /></Reveal>)}</div></section>
    </>
  );
}
