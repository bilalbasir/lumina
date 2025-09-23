import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Lumina Talent Advisory',
  description: 'Get in touch with Lumina Talent Advisory. Let\'s discuss how we can help you build exceptional teams and transform your talent strategy.',
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
