'use client';
import { useEffect, useState } from 'react';

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const n = images.length;
  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((o) => (o! + 1) % n);
      if (e.key === 'ArrowLeft') setOpen((o) => (o! - 1 + n) % n);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', k);
    return () => { window.removeEventListener('keydown', k); document.body.style.overflow = ''; };
  }, [open, n]);
  return (
    <>
      <div className="gal">
        {images.slice(0, 4).map((s, k) => (
          <button key={k} type="button" className={'gal-' + k} onClick={() => setOpen(k)} aria-label={'Open photo ' + (k + 1)}>
            <img src={s} alt={`${name} \u2014 photo ${k + 1}`} />
            {k === 3 && <span className="gal-more">View all {n} photos</span>}
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lb" role="dialog" aria-modal="true" aria-label="Photo gallery">
          <button className="lb-x" onClick={() => setOpen(null)} aria-label="Close">\u00d7</button>
          <button className="lb-a l" onClick={() => setOpen((open - 1 + n) % n)} aria-label="Previous">\u2039</button>
          <img src={images[open]} alt={`${name} \u2014 photo ${open + 1}`} />
          <button className="lb-a r" onClick={() => setOpen((open + 1) % n)} aria-label="Next">\u203a</button>
          <p className="lb-c">{open + 1} / {n}</p>
        </div>
      )}
    </>
  );
}

export function FloorPlan({ beds, sqft }: { beds: number; sqft: number }) {
  const nb = Math.min(beds, 5);
  const rows: [string, number][][] = [
    [['Living Room', 1.2], ['Kitchen', 1], ['Dining', 0.8]],
    [['Primary Suite', 1.5], ...Array.from({ length: Math.max(nb - 1, 0) }, (_, i) => ['Bedroom ' + (i + 2), 1] as [string, number]), ['Baths', 0.6]],
  ];
  const W = 600, H = 150;
  return (
    <figure className="fp">
      <svg viewBox={`0 0 ${W + 20} ${H * 2 + 20}`} role="img" aria-label="Illustrative floor plan">
        {rows.map((row, r) => {
          const tot = row.reduce((a, b) => a + b[1], 0);
          let x = 10;
          return row.map(([label, w]) => {
            const width = (w / tot) * W, cx = x + width / 2, cur = x;
            x += width;
            return (<g key={r + label}><rect x={cur} y={10 + r * H} width={width} height={H} fill={r ? '#F6F1E7' : '#E9E0D0'} stroke="#1F1F1D" strokeWidth="2" /><text x={cx} y={10 + r * H + H / 2} textAnchor="middle" fontSize="14" fill="#1F1F1D">{label}</text></g>);
          });
        })}
      </svg>
      <figcaption>Illustrative layout, approx. {sqft.toLocaleString()} sq ft. Not to scale. Replace with the real floor plan image.</figcaption>
    </figure>
  );
}

export function MapEmbed({ lat, lng, span = 0.012, bbox, marker = true, title = 'Map' }: { lat?: number; lng?: number; span?: number; bbox?: [number, number, number, number]; marker?: boolean; title?: string }) {
  const b = bbox || [lng! - span, lat! - span * 0.6, lng! + span, lat! + span * 0.6];
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${b.join(',')}&layer=mapnik${marker && lat ? `&marker=${lat},${lng}` : ''}`;
  return <iframe className="map" title={title} src={src} loading="lazy" />;
}
