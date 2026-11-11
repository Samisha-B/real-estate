'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { properties, allAmenities, propertyTypes } from '@/data/properties';
import { neighborhoods } from '@/data/neighborhoods';
import PropertyCard from './PropertyCard';
import { MapEmbed } from './Gallery';
import { money } from '@/lib/utils';

const blank = { q: '', listing: '', type: '', min: '', max: '', beds: '', baths: '', sqft: '', amen: [] as string[], sort: 'newest' };

export default function Explorer() {
  const sp = useSearchParams();
  const fromSp = () => ({ ...blank, q: sp.get('q') || '', listing: sp.get('listing') || '', type: sp.get('type') || '', min: sp.get('min') || '', max: sp.get('max') || '', beds: sp.get('beds') || '' });
  const [f, setF] = useState(fromSp);
  const [view, setView] = useState<'grid' | 'list' | 'map'>('grid');
  const [show, setShow] = useState(false);
  useEffect(() => { setF(fromSp()); }, [sp.toString()]);
  const set = (k: string, v: any) => setF((p) => ({ ...p, [k]: v }));
  const toggleAmen = (a: string) => set('amen', f.amen.includes(a) ? f.amen.filter((x) => x !== a) : [...f.amen, a]);

  const list = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const res = properties.filter((p) => {
      const nb = neighborhoods.find((n) => n.slug === p.neighborhood)?.name || '';
      if (q && ![p.city, p.state, p.zip, p.address, nb, p.name].join(' ').toLowerCase().includes(q)) return false;
      if (f.listing && p.listing !== f.listing) return false;
      if (f.type && p.type !== f.type) return false;
      if (f.min && p.price < +f.min) return false;
      if (f.max && p.price > +f.max) return false;
      if (f.beds && p.beds < +f.beds) return false;
      if (f.baths && p.baths < +f.baths) return false;
      if (f.sqft && p.sqft < +f.sqft) return false;
      if (f.amen.some((a) => !p.amenities.includes(a))) return false;
      return true;
    });
    const s = [...res];
    if (f.sort === 'low') s.sort((a, b) => a.price - b.price);
    else if (f.sort === 'high') s.sort((a, b) => b.price - a.price);
    else s.sort((a, b) => b.listedAt.localeCompare(a.listedAt));
    return s;
  }, [f]);

  const bbox = useMemo<[number, number, number, number] | undefined>(() => {
    if (!list.length) return undefined;
    const lats = list.map((p) => p.lat), lngs = list.map((p) => p.lng);
    const padX = Math.max((Math.max(...lngs) - Math.min(...lngs)) * 0.15, 0.02), padY = Math.max((Math.max(...lats) - Math.min(...lats)) * 0.15, 0.015);
    return [Math.min(...lngs) - padX, Math.min(...lats) - padY, Math.max(...lngs) + padX, Math.max(...lats) + padY];
  }, [list]);

  return (
    <div className="explorer">
      <aside className={'filters' + (show ? ' show' : '')} aria-label="Filters">
        <label>City / Neighborhood / ZIP<input value={f.q} onChange={(e) => set('q', e.target.value)} placeholder="e.g. Tribeca, Austin, 90210" /></label>
        <label>Buy or Rent<select value={f.listing} onChange={(e) => set('listing', e.target.value)}><option value="">Buy &amp; Rent</option><option value="buy">Buy</option><option value="rent">Rent</option></select></label>
        <label>Property type<select value={f.type} onChange={(e) => set('type', e.target.value)}><option value="">All types</option>{propertyTypes.map((t) => <option key={t}>{t}</option>)}</select></label>
        <div className="two">
          <label>Min price ($)<input type="number" min="0" value={f.min} onChange={(e) => set('min', e.target.value)} placeholder="Any" /></label>
          <label>Max price ($)<input type="number" min="0" value={f.max} onChange={(e) => set('max', e.target.value)} placeholder="Any" /></label>
        </div>
        <div className="two">
          <label>Bedrooms<select value={f.beds} onChange={(e) => set('beds', e.target.value)}><option value="">Any</option>{[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}+</option>)}</select></label>
          <label>Bathrooms<select value={f.baths} onChange={(e) => set('baths', e.target.value)}><option value="">Any</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}</select></label>
        </div>
        <label>Min square footage<input type="number" min="0" step="100" value={f.sqft} onChange={(e) => set('sqft', e.target.value)} placeholder="Any" /></label>
        <fieldset style={{ border: 0 }}>
          <legend style={{ fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 600, color: 'var(--muted)', marginBottom: 8 }}>Amenities</legend>
          <div className="chk">{allAmenities.map((a) => <label key={a}><input type="checkbox" checked={f.amen.includes(a)} onChange={() => toggleAmen(a)} />{a}</label>)}</div>
        </fieldset>
        <button type="button" className="btn line sm" onClick={() => setF(blank)}>Clear all filters</button>
      </aside>

      <div>
        <div className="toolbar">
          <p><b>{list.length}</b> {list.length === 1 ? 'property' : 'properties'} found</p>
          <button type="button" className="btn line sm filter-toggle" onClick={() => setShow(!show)}>{show ? 'Hide filters' : 'Show filters'}</button>
          <select aria-label="Sort" value={f.sort} onChange={(e) => set('sort', e.target.value)}><option value="newest">Newest</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select>
          <div className="vt" role="group" aria-label="View">{(['grid', 'list', 'map'] as const).map((v) => <button key={v} className={view === v ? 'on' : ''} onClick={() => setView(v)}>{v}</button>)}</div>
        </div>

        {list.length === 0 ? (
          <div className="empty"><h3>No properties match your filters</h3><p className="muted" style={{ margin: '10px 0 20px' }}>Try widening your price range or removing a few amenities.</p><button className="btn gold" onClick={() => setF(blank)}>Clear all filters</button></div>
        ) : view === 'map' ? (
          <div className="mapview">
            <div className="pins">{list.map((p) => <Link key={p.slug} href={'/properties/' + p.slug}><img src={p.images[0]} alt="" /><span><b>{p.name}</b><small>{money(p.price, p.listing === 'rent')} · {p.city}, {p.state}</small></span></Link>)}</div>
            <MapEmbed bbox={bbox} marker={false} title="Map of matching properties" />
          </div>
        ) : (
          <div className={view === 'grid' ? 'pgrid' : 'plist'}>{list.map((p) => <PropertyCard key={p.slug} p={p} layout={view === 'list' ? 'list' : 'grid'} />)}</div>
        )}
        {view === 'map' && list.length > 0 && <p className="small muted" style={{ marginTop: 10 }}>Map shows the area covered by matching listings. Open a listing for its exact pin.</p>}
      </div>
    </div>
  );
}
