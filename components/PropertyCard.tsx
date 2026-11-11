'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Property } from '@/data/properties';
import { money } from '@/lib/utils';
import { FavButton } from './ui';

export default function PropertyCard({ p, layout = 'grid' }: { p: Property; layout?: 'grid' | 'list' }) {
  const [i, setI] = useState(0);
  const n = p.images.length;
  const go = (d: number) => (e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setI((i + d + n) % n); };
  const href = '/properties/' + p.slug;
  return (
    <article className={'card ' + layout}>
      <div className="card-media">
        <div className="slides" style={{ transform: `translateX(-${i * 100}%)` }}>
          {p.images.map((s, k) => <img key={k} src={s} alt={`${p.name} — photo ${k + 1}`} loading="lazy" />)}
        </div>
        <span className={'badge ' + p.status.replace(' ', '').toLowerCase()}>{p.status}</span>
        <FavButton slug={p.slug} />
        <button type="button" className="arrow l" aria-label="Previous photo" onClick={go(-1)}>‹</button>
        <button type="button" className="arrow r" aria-label="Next photo" onClick={go(1)}>›</button>
        <div className="dots">{p.images.map((_, k) => <i key={k} className={k === i ? 'on' : ''} />)}</div>
      </div>
      <div className="card-body">
        <p className="ptype">{p.type}</p>
        <h3><Link href={href}>{p.name}</Link></h3>
        <p className="price">{money(p.price, p.listing === 'rent')}</p>
        <p className="addr">{p.address}, {p.city}, {p.state} {p.zip}</p>
        <ul className="specs"><li><b>{p.beds}</b> Beds</li><li><b>{p.baths}</b> Baths</li><li><b>{p.sqft.toLocaleString()}</b> Sq Ft</li></ul>
        <Link className="btn line sm" href={href}>View Details</Link>
      </div>
    </article>
  );
}
