import { Metadata } from 'next';
import CareersHeroSection from '@/components/pages/landingPage/career/CareersHeroSection';
import JoinOurTeamSection from '@/components/pages/landingPage/career/JoinOurTeamSection';
import CurrentOpportunitiesSection from '@/components/pages/landingPage/career/CurrentOpportunitiesSection';
import WhyWorkingWithUs from '@/components/pages/landingPage/career/WhyWorkingWithUs';
import NextStepCareer from '@/components/pages/landingPage/career/NextStepCareer';

export const metadata: Metadata = {
  title: 'Careers | Lumina Talent Advisory',
  description: 'Join our team at Lumina Talent Advisory and help shape the future of talent acquisition and advisory services.',
};

export default function Careers() {
  return (
    <div className=''>
      {/* Hero Section */}
      <CareersHeroSection />

      {/* Join Our Team Section */}
      <JoinOurTeamSection />

      {/* Current Opportunities Section */}
      <CurrentOpportunitiesSection />

      {/* Why working with us */}
      <WhyWorkingWithUs />

      {/* Take the Next Step in Your Career */}
      <NextStepCareer />

    </div>
  );
}
