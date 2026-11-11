'use client';
import { useState } from 'react';
import { faqs } from '@/data/faq';

export default function Accordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="acc">
      {faqs.map((f, i) => (
        <div key={f.q} className={'acc-item' + (open === i ? ' open' : '')}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}><span>{f.q}</span><i aria-hidden>+</i></button>
          <div className="acc-panel"><p>{f.a}</p></div>
        </div>
      ))}
    </div>
  );
}
