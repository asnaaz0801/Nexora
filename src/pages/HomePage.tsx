import React, { useEffect } from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AboutSection } from '../components/home/AboutSection';
import { VisionMissionSection } from '../components/home/VisionMissionSection';
import { WhyNexoraSection } from '../components/home/WhyNexoraSection';
import { EventsPreview } from '../components/home/EventsPreview';
import { TeamPreview } from '../components/home/TeamPreview';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. About Nexora */}
      <AboutSection />

      {/* 3. Vision & Mission */}
      <VisionMissionSection />

      {/* 4. Why Nexora */}
      <WhyNexoraSection />

      {/* 5. Upcoming Events */}
      <EventsPreview />

      {/* 6. Team Preview */}
      <TeamPreview />
    </div>
  );
};
