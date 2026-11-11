import { Suspense } from 'react';
import type { Metadata } from 'next';
import Explorer from '@/components/Explorer';
import PageHead from '@/components/PageHead';

export const metadata: Metadata = { title: 'Properties' };

export default function Page() {
  return (
    <>
      <PageHead eyebrow="Property Search" title="Discover Your Next Address" text="Filter by location, price, size and amenities. Results update instantly." />
      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap"><Suspense fallback={<p>Loading listings…</p>}><Explorer /></Suspense></div>
      </section>
    </>
  );
}
