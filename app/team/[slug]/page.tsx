import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { agents, getAgent } from '@/data/agents';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import DemoForm from '@/components/DemoForm';
import { agentFields } from '@/lib/forms';

export function generateStaticParams() { return agents.map((a) => ({ slug: a.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { return { title: getAgent(params.slug)?.name || 'Agent' }; }

export default function Page({ params }: { params: { slug: string } }) {
  const a = getAgent(params.slug);
  if (!a) notFound();
  const listings = properties.filter((p) => p.agent === a.slug);
  return (
    <>
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="wrap profile">
          <img src={a.image} alt={'Portrait of ' + a.name} />
          <div>
            <p className="eyebrow">{a.position}</p>
            <h1 style={{ fontSize: 'clamp(2.6rem,5vw,4.4rem)' }}>{a.name}</h1>
            <p className="lead">{a.bio}</p>
            <dl className="tbl" style={{ marginTop: 28 }}>
              <div><dt>Experience</dt><dd>{a.years} years</dd></div>
              <div><dt>Specialization</dt><dd>{a.specialization}</dd></div>
              <div><dt>Areas served</dt><dd>{a.areas.join(', ')}</dd></div>
              <div><dt>Phone</dt><dd><a href={'tel:' + a.phone.replace(/\D/g, '')}>{a.phone}</a></dd></div>
              <div><dt>Email</dt><dd><a href={'mailto:' + a.email}>{a.email}</a></dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2 style={{ marginBottom: 28 }}>Active &amp; recent listings</h2>
          {listings.length ? <div className="g3">{listings.map((p) => <PropertyCard key={p.slug} p={p} />)}</div> : <p className="muted">No listings at the moment.</p>}
        </div>
      </section>

      <section className="section">
        <div className="wrap g2" style={{ alignItems: 'start' }}>
          <div>
            <h2 style={{ marginBottom: 20 }}>Previous sales</h2>
            <dl className="tbl" style={{ gridTemplateColumns: '1fr' }}>{a.sales.map((s) => <div key={s.address}><dt>{s.address} · {s.year}</dt><dd>{s.price}</dd></div>)}</dl>
            <p className="small muted" style={{ marginTop: 12 }}>Demo data. Replace with verified transaction history.</p>
          </div>
          <div className="inq">
            <h3 style={{ marginBottom: 16 }}>Contact {a.name.split(' ')[0]}</h3>
            <DemoForm fields={agentFields} actions={['Send Message']} context={{ agent: a.name }} successTitle="Message received" />
          </div>
        </div>
      </section>
      <p className="wrap small" style={{ paddingBottom: 48 }}><Link className="more" href="/team">← All agents</Link></p>
    </>
  );
}
