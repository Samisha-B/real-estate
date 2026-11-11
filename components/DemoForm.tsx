'use client';
import { useState } from 'react';
import { site } from '@/config/site';

export type Field = { name: string; label: string; type?: string; required?: boolean; options?: string[]; full?: boolean; rows?: number };

export default function DemoForm({ fields, actions = ['Submit'], context = {}, successTitle = 'Thank you' }: { fields: Field[]; actions?: string[]; context?: any; successTitle?: string }) {
  const [err, setErr] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const action = ((e.nativeEvent as any).submitter as HTMLButtonElement)?.value || actions[0];
    const data: any = {}, er: Record<string, string> = {};
    fields.forEach((f) => {
      const v = String(fd.get(f.name) || '').trim();
      data[f.name] = v;
      if (f.required && !v) er[f.name] = f.label + ' is required';
      else if (v && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) er[f.name] = 'Enter a valid email address';
      else if (v && f.type === 'tel' && v.replace(/\D/g, '').length < 10) er[f.name] = 'Enter a valid 10-digit phone number';
      else if (v && f.type === 'date' && v < today) er[f.name] = 'Choose a future date';
    });
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    if (site.formEndpoint) {
      try {
        const r = await fetch(site.formEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ action, ...context, ...data }) });
        if (!r.ok) throw new Error('bad');
      } catch {
        setBusy(false);
        setErr({ _form: 'Something went wrong. Please try again or call us.' });
        return;
      }
    }
    setBusy(false);
    setDone(action);
  }

  if (done)
    return (
      <div className="success" role="status">
        <div className="tick">✓</div>
        <h3>{successTitle}</h3>
        <p>{site.formEndpoint ? `Your request (${done}) has been sent. We will be in touch shortly.` : `Demo mode: your "${done}" entry passed validation, but this template is not connected to a backend, so nothing was sent or booked.`}</p>
        <button type="button" className="btn line sm" onClick={() => setDone(null)}>Submit another</button>
      </div>
    );

  return (
    <form className="form" onSubmit={submit} noValidate>
      {fields.map((f) => (
        <label key={f.name} className={f.full ? 'full' : ''}>
          <span>{f.label}{f.required && ' *'}</span>
          {f.options ? (
            <select name={f.name} defaultValue="" aria-invalid={!!err[f.name]}><option value="" disabled>Select…</option>{f.options.map((o) => <option key={o}>{o}</option>)}</select>
          ) : f.rows ? (
            <textarea name={f.name} rows={f.rows} aria-invalid={!!err[f.name]} />
          ) : (
            <input name={f.name} type={f.type || 'text'} min={f.type === 'date' ? today : undefined} aria-invalid={!!err[f.name]} />
          )}
          {err[f.name] && <em className="err">{err[f.name]}</em>}
        </label>
      ))}
      {err._form && <p className="err full">{err._form}</p>}
      <div className="full actions">
        {actions.map((a, i) => <button key={a} value={a} disabled={busy} className={'btn ' + (i === 0 ? 'gold' : 'line')}>{busy ? 'Sending…' : a}</button>)}
      </div>
      {!site.formEndpoint && <p className="full demo-note">Demo form — not connected to a backend. Submissions are not sent.</p>}
    </form>
  );
}
