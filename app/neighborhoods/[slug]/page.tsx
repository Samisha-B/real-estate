import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { neighborhoods, getNeighborhood } from '@/data/neighborhoods';
import { properties } from '@/data/properties';
import PropertyCard from '@/components/PropertyCard';
import { MapEmbed } from '@/components/Gallery';
import { money } from '@/lib/utils';

export function generateStaticParams() { return neighborhoods.map((n) => ({ slug: n.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata { return { title: getNeighborhood(params.slug)?.name || 'Neighborhood' }; }

export default function Page({ params }: { params: { slug: string } }) {
  const n = getNeighborhood(params.slug);
  if (!n) notFound();
  const listings = properties.filter((p) => p.neighborhood === n.slug);
  return (
    <>
      <section className="band section" style={{ paddingBlock: 'clamp(100px,14vw,200px)' }}>
        <img src={n.image} alt={n.name} />
        <div className="wrap"><p className="eyebrow light">{n.city}, {n.state}</p><h1>{n.name}</h1><p className="lead" style={{ color: '#eee8dc' }}>{n.intro}</p></div>
      </section>
      <section className="section">
        <div className="wrap g2" style={{ alignItems: 'start' }}>
          <div><h2>Life in {n.name}</h2><p className="lead">{n.description}</p></div>
          <div>
            <dl className="tbl" style={{ gridTemplateColumns: '1fr' }}>
              <div><dt>Average sale price (demo)</dt><dd>{money(n.avgPrice)}</dd></div>
              <div><dt>Average monthly rent (demo)</dt><dd>{money(n.avgRent)}</dd></div>
              <div><dt>Listings</dt><dd>{listings.length}</dd></div>
            </dl>
            <h3 style={{ margin: '28px 0 12px' }}>Lifestyle highlights</h3>
            <ul className="feat">{n.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap">
          <h2 style={{ marginBottom: 28 }}>Properties in {n.name}</h2>
          {listings.length ? <div className="g3">{listings.map((p) => <PropertyCard key={p.slug} p={p} />)}</div> : <p className="muted">No listings right now. <Link className="more" href="/contact">Ask about off-market homes</Link></p>}
        </div>
      </section>
      <section className="section"><div className="wrap"><h2 style={{ marginBottom: 24 }}>On the map</h2><MapEmbed lat={n.lat} lng={n.lng} span={0.03} title={'Map of ' + n.name} /></div></section>
    </>
  );
}
