import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import Accordion from '@/components/Accordion';

export const metadata: Metadata = { title: 'FAQ' };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="FAQ" title="Frequently Asked Questions" />
      <section className="section"><div className="wrap"><Accordion /></div></section>
    </>
  );
}
