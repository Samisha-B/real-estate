import './globals.css';
import type { Metadata } from 'next';
import { site } from '@/config/site';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = site.theme;
  const style: any = { '--cream': t.cream, '--ivory': t.ivory, '--ink': t.ink, '--sage': t.sage, '--gold': t.gold, '--beige': t.beige, '--serif': `'${site.fonts.serif}'`, '--sans': `'${site.fonts.sans}'` };
  const fam = (f: string) => f.replace(/ /g, '+');
  const fonts = `https://fonts.googleapis.com/css2?family=${fam(site.fonts.serif)}:ital,wght@0,400;0,500;0,600;1,400&family=${fam(site.fonts.sans)}:wght@300;400;500;600&display=swap`;
  return (
    <html lang="en" style={style}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={fonts} />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
