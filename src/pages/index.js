import React, { useEffect } from 'react';
import ResponsiveAppBar from '@/layouts/dex/index/Navbar';
import IntroductionSection from '@/layouts/dex/index/Introduction';
import ProfileSection from '@/layouts/dex/index/Profile';
import PrivacySection from '@/layouts/dex/index/Privacy';
import RoadmapSection from '@/layouts/dex/index/Roadmap';
import ContactSection from '@/layouts/dex/index/Contact';

const Home = () => {
  useEffect(() => {
    const section = document.querySelector('#introduction');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <main>
        <IntroductionSection />
        <ProfileSection />
        <PrivacySection />
        <RoadmapSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Home;
