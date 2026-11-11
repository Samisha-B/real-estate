import type { Metadata } from 'next';
import DemoForm from '@/components/DemoForm';
import { Reveal, SectionHead } from '@/components/ui';
import { valuationFields } from '@/lib/forms';
import { u } from '@/data/images';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'Sell Your Property' };

const steps = [
  ['Consultation', 'We learn your goals, timeline and property, then outline a tailored strategy.'],
  ['Valuation & Pricing', 'A data-driven market analysis sets a confident, competitive price.'],
  ['Preparation & Marketing', 'Staging advice, professional photography and targeted promotion.'],
  ['Showings & Negotiation', 'We host tours, screen buyers and negotiate the strongest terms.'],
  ['Closing', 'We coordinate inspections, paperwork and the handover through to keys.'],
];

export default function Page() {
  return (
    <>
      <section className="band section" style={{ paddingBlock: 'clamp(90px,12vw,170px)' }}>
        <img src={u(10, 2000)} alt="" />
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow light">Sell With {site.name}</p>
          <h1>Your Property. Our Expertise. Exceptional Results.</h1>
          <p className="lead" style={{ color: '#eee8dc' }}>Request a complimentary valuation and see how a boutique approach can maximize your sale.</p>
          <div className="btns" style={{ marginTop: 28 }}><a className="btn gold" href="#valuation">Get My Property Valuation</a></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="The Process" title="Selling, in Five Clear Steps" />
          <div className="steps">{steps.map(([t, d], i) => <Reveal key={t} delay={i * 80}><div className="step"><h3>{t}</h3><p>{d}</p></div></Reveal>)}</div>
        </div>
      </section>

      <section className="section alt" id="valuation">
        <div className="wrap g2" style={{ alignItems: 'start' }}>
          <div>
            <p className="eyebrow">Free Valuation</p>
            <h2>What is your home worth?</h2>
            <p className="lead">Share a few details and an advisor will prepare a comparative market analysis. No obligation.</p>
            <ul className="feat" style={{ marginTop: 24 }}>
              <li>Local comparable sales and pricing strategy</li>
              <li>Professional photography and marketing plan</li>
              <li>Staging and pre-listing recommendations</li>
              <li>Access to our buyer and agent network</li>
            </ul>
          </div>
          <div className="inq">
            <DemoForm fields={valuationFields} actions={['Get My Property Valuation']} successTitle="Valuation request received" />
          </div>
        </div>
      </section>
    </>
  );
}
