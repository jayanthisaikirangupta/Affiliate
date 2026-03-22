import type { Metadata } from 'next';
import ContactForm from '@/components/public/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the PetGearHub team. We\'d love to hear from you.',
};

export default function ContactPage() {
  return <ContactForm />;
}
