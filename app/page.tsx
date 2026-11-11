import Link from 'next/link';
import Hero from '@/components/Hero';
import PropertyCard from '@/components/PropertyCard';
import Mortgage from '@/components/Mortgage';
import Testimonials from '@/components/Testimonials';
import Accordion from '@/components/Accordion';
import { NeighborhoodCard, AgentCard, PostCard } from '@/components/Cards';
import { Reveal, SectionHead } from '@/components/ui';
import { properties } from '@/data/properties';
import { neighborhoods } from '@/data/neighborhoods';
import { agents } from '@/data/agents';
import { posts } from '@/data/blog';
import { site } from '@/config/site';
import { u } from '@/data/images';

const icons: Record<string, JSX.Element> = {
  map: <svg viewBox="0 0 48 48"><path d="M24 43s14-12 14-23a14 14 0 10-28 0c0 11 14 23 14 23z" /><circle cx="24" cy="20" r="5" /></svg>,
  search: <svg viewBox="0 0 48 48"><circle cx="21" cy="21" r="12" /><path d="M30 30l12 12" /></svg>,
  scale: <svg viewBox="0 0 48 48"><path d="M24 6v36M12 42h24M8 14h32M8 14l-5 14a6 6 0 0010 0zM40 14l-5 14a6 6 0 0010 0z" /></svg>,
  heart: <svg viewBox="0 0 48 48"><path d="M24 40S6 29 6 17a9 9 0 0118-3 9 9 0 0118 3c0 12-18 23-18 23z" /></svg>,
};
const why = [
  ['map', 'Local Market Knowledge', 'Block-by-block insight into pricing, inventory and what is coming next in every neighborhood we serve.'],
  ['search', 'Personalized Property Search', 'A tailored search built around your lifestyle, with off-market access and curated shortlists.'],
  ['scale', 'Skilled Negotiation', 'Calm, data-backed negotiation that protects your price, terms and timeline.'],
  ['heart', 'Dedicated Client Support', 'One advisor from first conversation to closing day and beyond \u2014 always a call away.'],
];

export default function Home() {
  const featured = properties.filter((p) => p.featured).slice(0, 8);
  return (
    <>
      <Hero />
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Featured Properties" title="Residences Worth Discovering" text="A curated selection of exceptional homes, from skyline penthouses to mountain chalets." />
          <div className="g4" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))' }}>
            {featured.map((p, i) => <Reveal key={p.slug} delay={(i % 4) * 80}><PropertyCard p={p} /></Reveal>)}
          </div>
          <div className="center-btn"><Link className="btn line" href="/properties">View All Listings</Link></div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead center eyebrow="Why Choose Us" title="Real Estate, Made Personal." />
          <div className="g4">
            {why.map(([ic, t, d], i) => <Reveal key={t} delay={i * 100}><div className="why">{icons[ic]}<h3>{t}</h3><p>{d}</p></div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Explore Neighborhoods" title="Find the Place That Fits Your Life" text="Image-led guides to the communities we know best." />
          <div className="g3">{neighborhoods.map((n, i) => <Reveal key={n.slug} delay={(i % 3) * 100}><NeighborhoodCard n={n} /></Reveal>)}</div>
          <div className="center-btn"><Link className="btn line" href="/neighborhoods">All Neighborhoods</Link></div>
        </div>
      </section>

      <section className="band section">
        <img src={u(2, 2000)} alt="" />
        <div className="wrap" style={{ maxWidth: 820 }}>
          <p className="eyebrow light">Selling</p>
          <h2>Your Property. Our Expertise. Exceptional Results.</h2>
          <p className="lead" style={{ color: '#eee8dc' }}>Request a complimentary, no-obligation valuation and a tailored marketing plan.</p>
          <div className="btns" style={{ marginTop: 28 }}><Link className="btn gold" href="/sell">Get My Property Valuation</Link></div>
        </div>
      </section>

      <section className="section dark">
        <div className="wrap stats">{site.stats.map(([n, l]) => <Reveal key={l}><b>{n}</b><span>{l}</span></Reveal>)}</div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Our Team" title="Advisors Who Know Your Market" />
          <div className="g3">{agents.slice(0, 3).map((a, i) => <Reveal key={a.slug} delay={i * 100}><AgentCard a={a} /></Reveal>)}</div>
          <div className="center-btn"><Link className="btn line" href="/team">Meet the Full Team</Link></div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead center eyebrow="Client Reviews" title="Kind Words from Our Clients" />
          <Testimonials />
        </div>
      </section>

      <section className="section" id="mortgage">
        <div className="wrap">
          <SectionHead eyebrow="Mortgage Calculator" title="Plan Your Monthly Payment" text="Adjust the numbers to see an estimate of principal and interest." />
          <Mortgage />
        </div>
      </section>

      <section className="section alt">
        <div className="wrap">
          <SectionHead eyebrow="Insights" title="Real Estate, Explained" />
          <div className="g3">{posts.slice(0, 3).map((p, i) => <Reveal key={p.slug} delay={i * 100}><PostCard p={p} /></Reveal>)}</div>
          <div className="center-btn"><Link className="btn line" href="/blog">All Articles</Link></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead center eyebrow="FAQ" title="Questions, Answered" />
          <Accordion />
        </div>
      </section>
    </>
  );
}
