import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import DemoForm from '@/components/DemoForm';
import { appointmentFields } from '@/lib/forms';
import { site, fullAddress } from '@/config/site';

export const metadata: Metadata = { title: 'Contact' };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Contact" title="Let’s Talk Real Estate" text="Visit our office, call us, or request an appointment below." />
      <section className="section">
        <div className="wrap g2" style={{ alignItems: 'start' }}>
          <div className="cinfo">
            <div><h4>Office</h4><p>{fullAddress()}</p></div>
            <div><h4>Phone</h4><p><a href={'tel:' + site.phone.replace(/\D/g, '')}>{site.phone}</a></p></div>
            <div><h4>Email</h4><p><a href={'mailto:' + site.email}>{site.email}</a></p></div>
            <div className="hours"><h4>Business hours</h4>{site.hours.map(([d, h]) => <div key={d}><span>{d}</span><span>{h}</span></div>)}</div>
            <div><h4>Social</h4><p style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{site.social.map(([n, h]) => <a key={n} href={h} target="_blank" rel="noreferrer" className="more">{n}</a>)}</p></div>
          </div>
          <div className="inq">
            <h3 style={{ marginBottom: 16 }}>Request an appointment</h3>
            <DemoForm fields={appointmentFields} actions={['Request Appointment']} successTitle="Appointment request received" />
          </div>
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: 96 }}>
        <iframe className="map" style={{ height: 440 }} title="Office location" loading="lazy" src={'https://www.google.com/maps?q=' + encodeURIComponent(fullAddress()) + '&output=embed'} />
      </section>
    </>
  );
}
