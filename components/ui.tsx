'use client';
import { useEffect, useRef, useState } from 'react';

export function Reveal({ children, className = '', delay = 0 }: any) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={'reveal ' + className} style={{ transitionDelay: delay + 'ms' }}>{children}</div>;
}

export function useFavs() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => {
    const read = () => { try { setFavs(JSON.parse(localStorage.getItem('favs') || '[]')); } catch { setFavs([]); } };
    read();
    window.addEventListener('favs', read);
    return () => window.removeEventListener('favs', read);
  }, []);
  const toggle = (s: string) => {
    const n = favs.includes(s) ? favs.filter((x) => x !== s) : [...favs, s];
    localStorage.setItem('favs', JSON.stringify(n));
    window.dispatchEvent(new Event('favs'));
  };
  return { favs, toggle };
}

export function FavButton({ slug, label = false }: { slug: string; label?: boolean }) {
  const { favs, toggle } = useFavs();
  const on = favs.includes(slug);
  return (
    <button type="button" className={'fav' + (on ? ' on' : '')} aria-pressed={on} aria-label={on ? 'Remove from favorites' : 'Save to favorites'} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(slug); }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6"><path d="M12 21s-7.5-4.6-9.5-9.2C1.2 8.6 3 5.5 6.2 5.5c2 0 3.3 1.1 3.8 2 .5-.9 1.8-2 3.8-2 3.2 0 5 3.1 3.7 6.3C19.5 16.4 12 21 12 21z" /></svg>
      {label && <span>{on ? 'Saved' : 'Save'}</span>}
    </button>
  );
}

export const Stars = ({ n }: { n: number }) => <span className="stars" aria-label={n + ' out of 5 stars'}>{'\u2605'.repeat(n)}{'\u2606'.repeat(5 - n)}</span>;

export function SectionHead({ eyebrow, title, text, center = false }: any) {
  return (
    <Reveal className={'shead' + (center ? ' center' : '')}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p className="lead">{text}</p>}
    </Reveal>
  );
}
