import Link from 'next/link';
import { Neighborhood } from '@/data/neighborhoods';
import { Agent } from '@/data/agents';
import { Post } from '@/data/blog';
import { properties } from '@/data/properties';
import { money, fmtDate } from '@/lib/utils';

export function NeighborhoodCard({ n }: { n: Neighborhood }) {
  const count = properties.filter((p) => p.neighborhood === n.slug && p.status !== 'Sold').length;
  return (
    <Link href={'/neighborhoods/' + n.slug} className="ncard">
      <img src={n.image} alt={n.name + ' neighborhood'} loading="lazy" />
      <div className="ncard-body">
        <p className="eyebrow light">{n.city}, {n.state}</p>
        <h3>{n.name}</h3>
        <p>{n.intro}</p>
        <ul>{n.highlights.slice(0, 3).map((h) => <li key={h}>{h}</li>)}</ul>
        <div className="nmeta"><span>Avg. {money(n.avgPrice)}</span><span>{count} active listing{count === 1 ? '' : 's'}</span></div>
      </div>
    </Link>
  );
}

export function AgentCard({ a }: { a: Agent }) {
  return (
    <article className="acard">
      <Link href={'/team/' + a.slug} className="acard-img"><img src={a.image} alt={'Portrait of ' + a.name} loading="lazy" /></Link>
      <div className="acard-body">
        <h3>{a.name}</h3>
        <p className="ptype">{a.position}</p>
        <p className="clamp">{a.bio}</p>
        <p className="small"><b>Specialty:</b> {a.specialization}</p>
        <p className="small"><b>Areas:</b> {a.areas.join(', ')}</p>
        <p className="small"><a href={'tel:' + a.phone.replace(/\D/g, '')}>{a.phone}</a><br /><a href={'mailto:' + a.email}>{a.email}</a></p>
        <Link className="btn line sm" href={'/team/' + a.slug}>View Profile</Link>
      </div>
    </article>
  );
}

export function PostCard({ p }: { p: Post }) {
  return (
    <article className="pcard">
      <Link href={'/blog/' + p.slug} className="pcard-img"><img src={p.cover} alt={p.title} loading="lazy" /></Link>
      <p className="ptype">{p.category} \u00b7 {fmtDate(p.date)}</p>
      <h3><Link href={'/blog/' + p.slug}>{p.title}</Link></h3>
      <p>{p.excerpt}</p>
      <Link className="more" href={'/blog/' + p.slug}>Read More \u2192</Link>
    </article>
  );
}
