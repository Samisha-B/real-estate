import { u } from '@/data/images';

export const site = {
  name: 'ESTATE & CO.',
  logoImage: '',
  tagline: 'Luxury Real Estate',
  description: 'Boutique real estate advisors for buyers, sellers and renters across the United States. Demo template.',
  theme: { cream: '#F6F1E7', ivory: '#FBF8F2', ink: '#1F1F1D', sage: '#7A8268', gold: '#BFA06A', beige: '#E9E0D0' },
  fonts: { serif: 'Cormorant Garamond', sans: 'Manrope' },
  formEndpoint: '',
  hero: {
    eyebrow: 'Luxury Real Estate · Est. 2009',
    title: 'Find More Than a Home. Find Your Place.',
    text: 'Discover exceptional properties and personalized real estate guidance for every chapter of life.',
    images: [u(0, 2000), u(5, 2000), u(19, 2000)],
  },
  office: { address: '350 Fifth Avenue, Suite 4200', city: 'New York', state: 'NY', zip: '10118' },
  phone: '(212) 555-0142',
  email: 'hello@estateandco.example',
  hours: [['Monday – Friday', '9:00 AM – 6:00 PM'], ['Saturday', '10:00 AM – 4:00 PM'], ['Sunday', 'By appointment']],
  social: [['Instagram', 'https://instagram.com'], ['Facebook', 'https://facebook.com'], ['LinkedIn', 'https://linkedin.com'], ['YouTube', 'https://youtube.com']],
  serviceAreas: ['New York, NY', 'Beverly Hills, CA', 'Miami Beach, FL', 'Austin, TX', 'Aspen, CO', 'Greenwich, CT'],
  stats: [['15+', 'Years of experience'], ['$2.4B', 'Demo sales volume'], ['1,200+', 'Demo homes sold'], ['98%', 'Demo client satisfaction']],
  nav: [['Home', '/'], ['Buy', '/properties?listing=buy'], ['Rent', '/properties?listing=rent'], ['Sell', '/sell'], ['Properties', '/properties'], ['Our Team', '/team'], ['About', '/about'], ['Contact', '/contact']] as [string, string][],
};

export const fullAddress = () => `${site.office.address}, ${site.office.city}, ${site.office.state} ${site.office.zip}`;
