'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/config/site';

export function Logo() {
  return site.logoImage ? <img src={site.logoImage} alt={site.name} className="logo-img" /> : <span className="logo">{site.name}</span>;
}

export default function Header() {
  const path = usePathname();
  const [sc, setSc] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setSc(window.scrollY > 40);
    f();
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const clear = path === '/' && !sc && !open;
  return (
    <header className={'hdr' + (clear ? ' clear' : '')}>
      <div className="wrap hdr-in">
        <Link href="/" aria-label={site.name + ' home'}><Logo /></Link>
        <nav className="nav-d" aria-label="Main">{site.nav.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}</nav>
        <Link className="btn gold sm cta-d" href="/properties">Find Your Property</Link>
        <button className={'burger' + (open ? ' open' : '')} aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button>
      </div>
      {open && (
        <div className="mnav">
          {site.nav.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
          <Link className="btn gold" href="/properties">Find Your Property</Link>
          <p>{site.phone} \u00b7 {site.email}</p>
        </div>
      )}
    </header>
  );
}
