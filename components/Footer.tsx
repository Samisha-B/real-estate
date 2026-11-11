import Link from 'next/link';
import { site, fullAddress } from '@/config/site';
import { Logo } from './Header';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap fgrid">
        <div>
          <Logo />
          <p className="fdesc">{site.description}</p>
          <div className="social">{site.social.map(([n, h]) => <a key={n} href={h} target="_blank" rel="noreferrer">{n}</a>)}</div>
        </div>
        <div>
          <h4>Navigate</h4>
          {site.nav.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
          <Link href="/blog">Insights</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div>
          <h4>Properties</h4>
          <Link href="/properties?listing=buy">Homes for Sale</Link>
          <Link href="/properties?listing=rent">Rentals</Link>
          <Link href="/properties?type=Condo">Condos</Link>
          <Link href="/properties?type=Villa">Villas</Link>
          <Link href="/properties?type=Penthouse">Penthouses</Link>
          <Link href="/neighborhoods">Neighborhoods</Link>
        </div>
        <div>
          <h4>Visit Us</h4>
          <p>{fullAddress()}</p>
          <p><a href={'tel:' + site.phone.replace(/\D/g, '')}>{site.phone}</a></p>
          <p><a href={'mailto:' + site.email}>{site.email}</a></p>
          <p className="muted">{site.hours[0][0]}: {site.hours[0][1]}</p>
        </div>
      </div>
      <div className="wrap fbottom">
        <div className="eho"><span className="eho-mark" aria-hidden>\u2302</span><p><strong>Equal Housing Opportunity.</strong> We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity. We do not discriminate on the basis of race, color, religion, sex, handicap, familial status or national origin.</p></div>
        <div className="flinks"><span>\u00a9 {new Date().getFullYear()} {site.name} All rights reserved.</span><Link href="/legal/privacy">Privacy Policy</Link><Link href="/legal/terms">Terms &amp; Conditions</Link><Link href="/legal/fair-housing">Fair Housing</Link></div>
        <p className="muted small">Demo template. All properties, agents, prices and reviews are fictional.</p>
      </div>
    </footer>
  );
}
