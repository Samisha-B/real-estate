import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { properties, getProperty } from '@/data/properties';
import { getAgent } from '@/data/agents';
import { getNeighborhood } from '@/data/neighborhoods';
import { Gallery, FloorPlan, MapEmbed } from '@/components/Gallery';
import PropertyCard from '@/components/PropertyCard';
import Mortgage from '@/components/Mortgage';
import DemoForm from '@/components/DemoForm';
import { FavButton } from '@/components/ui';
import { inquiryFields } from '@/lib/forms';
import { money, fmtDate } from '@/lib/utils';

export function generateStaticParams() { return properties.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { return { title: getProperty(params.slug)?.name || 'Property' }; }

export default function Page({ params }: { params: { slug: string } }) {
  const p = getProperty(params.slug);
  if (!p) notFound();
  const agent = getAgent(p.agent);
  const nb = getNeighborhood(p.neighborhood);
  const rent = p.listing === 'rent';
  const score = (x: typeof p) => (x.neighborhood === p.neighborhood ? 2 : 0) + (x.listing === p.listing ? 1 : 0);
  const similar = properties.filter((x) => x.slug !== p.slug).sort((a, b) => score(b) - score(a)).slice(0, 3);
  const specs: [string, string][] = [
    ['Status', p.status], ['Property type', p.type], ['Bedrooms', String(p.beds)], ['Bathrooms', String(p.baths)],
    ['Interior size', p.sqft.toLocaleString() + ' sq ft'], ['Year built', String(p.year)],
    [rent ? 'Monthly rent' : 'Price per sq ft', rent ? money(p.price, true) : money(p.price / p.sqft)], ['Listed', fmtDate(p.listedAt)],
  ];
  return (
    <>
      <section className="wrap" style={{ paddingTop: 28 }}>
        <p className="small muted" style={{ marginBottom: 14 }}><Link href="/properties">← All properties</Link></p>
        <Gallery images={p.images} name={p.name} />
      </section>

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="wrap detail">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div>
                <p className="ptype">{p.type} · {p.status}</p>
                <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', margin: '8px 0' }}>{p.name}</h1>
                <p className="muted">{p.address}, {p.city}, {p.state} {p.zip}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="price" style={{ fontSize: '2.4rem' }}>{money(p.price, rent)}</p>
                <div style={{ position: 'relative', height: 44, marginTop: 8 }}><FavButton slug={p.slug} label /></div>
              </div>
            </div>

            <div className="dblock"><h2>About this property</h2><p>{p.description}</p></div>

            <div className="dblock"><h2>Specifications</h2><dl className="tbl">{specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div>

            <div className="dblock"><h2>Amenities</h2><ul className="chips">{p.amenities.map((a) => <li key={a}>{a}</li>)}</ul></div>

            <div className="dblock"><h2>Property features</h2><ul className="feat">{p.features.map((a) => <li key={a}>{a}</li>)}</ul></div>

            <div className="dblock"><h2>Floor plan</h2><FloorPlan beds={p.beds} sqft={p.sqft} /></div>

            {nb && (
              <div className="dblock">
                <h2>The neighborhood: {nb.name}</h2>
                <p style={{ marginBottom: 16 }}>{nb.description}</p>
                <ul className="chips">{nb.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
                <p style={{ marginTop: 16 }}><Link className="more" href={'/neighborhoods/' + nb.slug}>Explore {nb.name} →</Link></p>
              </div>
            )}

            <div className="dblock"><h2>Location</h2><MapEmbed lat={p.lat} lng={p.lng} title={'Map of ' + p.name} /></div>

            <div className="dblock" style={{ borderBottom: 0 }}>
              <h2>Mortgage calculator</h2>
              {rent ? <p className="muted">This is a rental listing. Use the calculator on our <Link className="more" href="/#mortgage">home page</Link> to estimate a purchase.</p> : <Mortgage price={p.price} />}
            </div>
          </div>

          <aside className="sticky">
            <div className="inq">
              <h3 style={{ marginBottom: 6 }}>Interested in this home?</h3>
              {agent && <p className="small muted" style={{ marginBottom: 18 }}>Listing agent: <Link href={'/team/' + agent.slug}><b>{agent.name}</b></Link> · {agent.phone}</p>}
              <DemoForm fields={inquiryFields} actions={['Schedule a Tour', 'Request Information', 'Contact Agent']} context={{ property: p.name, slug: p.slug, agent: agent?.name }} successTitle="Request received" />
            </div>
          </aside>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <h2 style={{ marginBottom: 32 }}>Similar properties</h2>
          <div className="g3">{similar.map((s) => <PropertyCard key={s.slug} p={s} />)}</div>
        </div>
      </section>
    </>
  );
}
