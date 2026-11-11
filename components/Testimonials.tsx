'use client';
import { useEffect, useState } from 'react';
import { testimonials } from '@/data/testimonials';
import { Stars } from './ui';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = testimonials.length;
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 7000);
    return () => clearInterval(t);
  }, [paused, n]);
  return (
    <div className="testi" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="testi-track" style={{ transform: `translateX(-${i * 100}%)` }}>
        {testimonials.map((t) => (
          <figure key={t.name} className="testi-item">
            <Stars n={t.rating} />
            <blockquote>\u201c{t.text}\u201d</blockquote>
            <figcaption><b>{t.name}</b> \u00b7 {t.transaction} \u00b7 {t.location}</figcaption>
            <span className="tag">Fictional demo review \u2014 replace with verified reviews</span>
          </figure>
        ))}
      </div>
      <div className="testi-nav">
        <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous review">\u2039</button>
        {testimonials.map((_, k) => <i key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} />)}
        <button onClick={() => setI((i + 1) % n)} aria-label="Next review">\u203a</button>
      </div>
    </div>
  );
}
