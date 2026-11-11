import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section" style={{ textAlign: 'center' }}>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>This page has moved out.</h1>
        <p className="lead" style={{ margin: '16px auto 28px' }}>The page you are looking for does not exist.</p>
        <div className="btns" style={{ justifyContent: 'center' }}><Link className="btn gold" href="/">Back home</Link><Link className="btn line" href="/properties">Browse properties</Link></div>
      </div>
    </section>
  );
}
