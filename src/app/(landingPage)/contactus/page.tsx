import ContactUsHeroSection from '@/components/pages/landingPage/contactUs/ContactUsHeroSection';
import ContactUsSection from '@/components/pages/landingPage/contactUs/ContactUsSection';
import ContactFormSection from '@/components/pages/landingPage/home/ContactFormSection';

export default function ContactUs() {
  return (
    <div>
      {/* Hero Section */}
      <ContactUsHeroSection />

      {/* Contact Form Section */}
      <ContactUsSection />
    </div>
  );
}
