import type { Field } from '@/components/DemoForm';

const times = ['Morning (9am–12pm)', 'Afternoon (12pm–4pm)', 'Evening (4pm–7pm)'];

export const inquiryFields: Field[] = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'date', label: 'Preferred viewing date', type: 'date' },
  { name: 'time', label: 'Preferred time', options: times },
  { name: 'message', label: 'Message', rows: 3 },
];

export const agentFields: Field[] = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel' },
  { name: 'interest', label: 'I am interested in', options: ['Buying', 'Selling', 'Renting', 'Investing'] },
  { name: 'message', label: 'Message', rows: 4, required: true, full: true },
];

export const valuationFields: Field[] = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'address', label: 'Property address', required: true },
  { name: 'type', label: 'Property type', required: true, options: ['House', 'Condo', 'Townhouse', 'Apartment', 'Villa', 'Penthouse', 'Land', 'Other'] },
  { name: 'beds', label: 'Number of bedrooms', options: ['Studio', '1', '2', '3', '4', '5', '6+'] },
  { name: 'timeline', label: 'Estimated selling timeline', required: true, options: ['As soon as possible', '1–3 months', '3–6 months', '6–12 months', 'Just exploring'], full: true },
  { name: 'info', label: 'Additional information', rows: 4, full: true },
];

export const appointmentFields: Field[] = [
  { name: 'name', label: 'Full name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', required: true },
  { name: 'service', label: 'Service', required: true, options: ['Buying', 'Selling', 'Renting', 'Investment Consultation'] },
  { name: 'date', label: 'Preferred date', type: 'date', required: true },
  { name: 'time', label: 'Preferred time', required: true, options: times },
  { name: 'message', label: 'Anything we should know?', rows: 4, full: true },
];
