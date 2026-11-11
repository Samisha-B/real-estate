import Link from 'next/link';
import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import { AgentCard } from '@/components/Cards';
import { Reveal } from '@/components/ui';
import { agents } from '@/data/agents';
import { site } from '@/config/site';
import { u } from '@/data/images';

export const metadata: Metadata = { title: 'About' };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="About" title={'About ' + site.name} text="A boutique brokerage built on local knowledge, honest advice and personal service." />
      <section className="section">
        <div className="wrap g2" style={{ alignItems: 'center' }}>
          <img src={u(17, 1400)} alt="Contemporary home exterior" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
          <div>
            <h2>Our story</h2>
            <p className="lead">We started with a simple belief: buying or selling a home should feel personal, not transactional. Today our advisors guide clients across the markets below, pairing data with discretion.</p>
            <p className="lead">This copy is demo content. Replace it with your agency’s history, values and credentials.</p>
          </div>
        </div>
      </section>
      <section className="section dark"><div className="wrap stats">{site.stats.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div></section>
      <section className="section">
        <div className="wrap">
          <h2 style={{ marginBottom: 20 }}>Areas we serve</h2>
          <ul className="chips">{site.serviceAreas.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      </section>
      <section className="section alt">
        <div className="wrap"><h2 style={{ marginBottom: 28 }}>Leadership</h2><div className="g3">{agents.slice(0, 3).map((a, i) => <Reveal key={a.slug} delay={i * 100}><AgentCard a={a} /></Reveal>)}</div><p className="center-btn"><Link className="btn line" href="/team">Meet everyone</Link></p></div>
      </section>
    </>
  );
}
