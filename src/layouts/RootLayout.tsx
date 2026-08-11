import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ParticleBackground } from '../components/common/ParticleBackground';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-slate-100 selection:bg-nexora-500/30 selection:text-nexora-300 relative">
      {/* Dynamic Cosmic Particle Background */}
      <ParticleBackground />

      {/* Sticky Glassmorphic Navbar */}
      <Navbar />

      {/* Main Page View */}
      <main className="flex-grow z-10">
        <Outlet />
      </main>

      {/* Official Footer */}
      <Footer />
    </div>
  );
};
