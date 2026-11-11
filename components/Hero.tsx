'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/config/site';
import { propertyTypes } from '@/data/properties';

export function SearchPanel() {
  const router = useRouter();
  const [listing, setListing] = useState('buy');
  function go(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const qs = new URLSearchParams();
    fd.forEach((v, k) => { if (String(v).trim()) qs.set(k, String(v).trim()); });
    qs.set('listing', listing);
    router.push('/properties?' + qs.toString());
  }
  return (
    <form className="panel" onSubmit={go} aria-label="Property search">
      <div className="seg" role="group" aria-label="Buy or rent">
        {['buy', 'rent'].map((l) => <button type="button" key={l} className={listing === l ? 'on' : ''} onClick={() => setListing(l)}>{l === 'buy' ? 'Buy' : 'Rent'}</button>)}
      </div>
      <label><span>Location</span><input name="q" placeholder="City, neighborhood or ZIP" /></label>
      <label><span>Property Type</span><select name="type" defaultValue=""><option value="">All types</option>{propertyTypes.map((t) => <option key={t}>{t}</option>)}</select></label>
      <label><span>Min Price ($)</span><input name="min" type="number" min="0" step="1000" placeholder="No min" /></label>
      <label><span>Max Price ($)</span><input name="max" type="number" min="0" step="1000" placeholder="No max" /></label>
      <label><span>Bedrooms</span><select name="beds" defaultValue=""><option value="">Any</option>{[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+</option>)}</select></label>
      <button className="btn gold">Search Properties</button>
    </form>
  );
}

export default function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % site.hero.images.length), 6500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero">
      {site.hero.images.map((s, k) => <div key={k} className={'hero-slide' + (k === i ? ' on' : '')}><img src={s} alt="" /></div>)}
      <div className="hero-shade" />
      <div className="wrap hero-body">
        <div className="hero-copy">
          <p className="eyebrow light">{site.hero.eyebrow}</p>
          <h1>{site.hero.title}</h1>
          <p className="hero-text">{site.hero.text}</p>
          <div className="btns">
            <Link className="btn gold" href="/properties">Explore Properties</Link>
            <Link className="btn ghost" href="/sell">Sell With Us</Link>
          </div>
        </div>
        <SearchPanel />
      </div>
    </section>
  );
}
