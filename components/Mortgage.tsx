'use client';
import { useState } from 'react';
import { money, monthlyPayment } from '@/lib/utils';

export default function Mortgage({ price = 1500000 }: { price?: number }) {
  const [P, setP] = useState(price);
  const [down, setDown] = useState(Math.round(price * 0.2));
  const [rate, setRate] = useState(6.5);
  const [years, setYears] = useState(30);
  const loan = Math.max(P - down, 0);
  const m = monthlyPayment(loan, rate, years);
  const interest = m * years * 12 - loan;
  const pct = P > 0 ? Math.min(100, (down / P) * 100) : 0;
  const num = (f: (n: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => f(Math.max(0, Number(e.target.value) || 0));
  return (
    <div className="calc">
      <div className="calc-in">
        <label><span>Property price ($)</span><input type="number" min="0" value={P} onChange={num(setP)} /></label>
        <label><span>Down payment ($) \u00b7 {pct.toFixed(0)}%</span><input type="number" min="0" value={down} onChange={num(setDown)} /></label>
        <input type="range" min="0" max="100" value={pct} aria-label="Down payment percent" onChange={(e) => setDown(Math.round((P * Number(e.target.value)) / 100))} />
        <label><span>Interest rate (% APR)</span><input type="number" min="0" max="25" step="0.05" value={rate} onChange={num(setRate)} /></label>
        <label><span>Loan term</span><select value={years} onChange={(e) => setYears(Number(e.target.value))}>{[10, 15, 20, 25, 30].map((y) => <option key={y} value={y}>{y} years</option>)}</select></label>
      </div>
      <div className="calc-out">
        <p className="eyebrow light">Estimated monthly principal &amp; interest</p>
        <p className="big">{money(m)}</p>
        <dl><div><dt>Loan amount</dt><dd>{money(loan)}</dd></div><div><dt>Total interest</dt><dd>{money(Math.max(interest, 0))}</dd></div><div><dt>Total repaid</dt><dd>{money(m * years * 12)}</dd></div></dl>
        <p className="fine">Estimates only. Figures exclude property taxes, homeowners insurance, HOA dues, mortgage insurance and closing costs. Not a loan offer \u2014 consult a licensed lender.</p>
      </div>
    </div>
  );
}
