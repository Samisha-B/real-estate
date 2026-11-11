import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { posts, getPost } from '@/data/blog';
import { PostCard } from '@/components/Cards';
import { fmtDate } from '@/lib/utils';

export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { return { title: getPost(params.slug)?.title || 'Article' }; }

export default function Page({ params }: { params: { slug: string } }) {
  const p = getPost(params.slug);
  if (!p) notFound();
  const more = posts.filter((x) => x.slug !== p.slug).slice(0, 3);
  return (
    <>
      <article className="section" style={{ paddingBottom: 60 }}>
        <div className="wrap">
          <div className="article" style={{ textAlign: 'center' }}>
            <p className="eyebrow">{p.category}</p>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>{p.title}</h1>
            <p className="muted" style={{ marginTop: 16 }}>By {p.author} · {fmtDate(p.date)}</p>
          </div>
          <img className="article-cover" src={p.cover} alt={p.title} />
          <div className="article">{p.body.map((t, i) => <p key={i}>{t}</p>)}<p><Link className="more" href="/blog">← Back to all articles</Link></p></div>
        </div>
      </article>
      <section className="section alt"><div className="wrap"><h2 style={{ marginBottom: 28 }}>Keep reading</h2><div className="g3">{more.map((x) => <PostCard key={x.slug} p={x} />)}</div></div></section>
    </>
  );
}
