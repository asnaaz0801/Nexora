import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Rocket, Zap, Users, Trophy } from 'lucide-react';
import { handleImageError } from '../../lib/imageUtils';
import nexoraLogo from '../../assets/nexora-logo.png';
import { ThreeScene } from '../common/ThreeScene';
import { useSiteContent } from '../../hooks/useSiteContent';

export const HeroSection: React.FC = () => {
  const { getContent } = useSiteContent();

  const heroTitle       = getContent('home', 'hero_title')          || 'Where Ideas Become Impact.';
  const heroDesc        = getContent('home', 'hero_description')     || 'Building the next generation of innovators, entrepreneurs, leaders, and changemakers at Anjuman College of Engineering & Technology.';
  const ctaPrimaryText  = getContent('home', 'cta_primary_text')    || 'Explore Events';
  const ctaPrimaryLink  = getContent('home', 'cta_primary_link')    || '/events';
  const ctaSecondText   = getContent('home', 'cta_secondary_text')  || 'Meet Our Team';
  const ctaSecondLink   = getContent('home', 'cta_secondary_link')  || '/team';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Background Radial Glow & Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      
      {/* 3D Wireframe Constellation & Hologram */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 z-0">
        <ThreeScene variant="hero" className="w-full h-full max-w-4xl max-h-[700px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Step 1: College & E-Cell Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/90 border border-nexora-500/30 text-xs sm:text-sm text-nexora-300 backdrop-blur-md shadow-glow-sm mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-nexora-400 animate-ping" />
          <span className="font-semibold">Anjuman College of Engineering & Technology</span>
          <span className="text-slate-500">•</span>
          <span className="text-white font-bold">Official E-Cell</span>
        </motion.div>

        {/* Step 2: Prominent Official Nexora Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="relative group">
            {/* Ambient Multi-Layer Cyber Ring */}
            <div className="absolute -inset-4 bg-gradient-to-r from-nexora-500/20 via-sky-500/30 to-blue-600/20 rounded-full blur-xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-slow pointer-events-none" />
            
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl bg-black/80 border border-nexora-500/40 p-2 shadow-2xl backdrop-blur-xl flex items-center justify-center">
              <img
                src={nexoraLogo}
                alt="Nexora Official E-Cell Logo"
                onError={(e) => handleImageError(e, nexoraLogo)}
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]"
              />
            </div>
          </div>
        </motion.div>

        {/* Step 3: Main Headline — Dynamic */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-4xl sm:text-6xl md:text-7xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.1] mb-6"
        >
          {heroTitle.includes('Impact') ? (
            <>
              {heroTitle.split('Impact')[0]}
              <span className="text-gradient-cyan relative inline-block">
                Impact.
                <svg
                  className="absolute -bottom-2 inset-x-0 w-full h-2 text-nexora-500 opacity-80"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path d="M0,5 Q50,0 100,5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </>
          ) : (
            <span className="text-gradient-cyan">{heroTitle}</span>
          )}
        </motion.h1>

        {/* Step 4: Supporting Description — Dynamic */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
        >
          {heroDesc}
        </motion.p>

        {/* Step 5: CTA Buttons — Dynamic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14"
        >
          <Link
            to={ctaPrimaryLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-nexora-400 via-sky-300 to-blue-500 shadow-glow-md hover:shadow-glow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-cyan-200/50 group"
          >
            <Calendar className="w-5 h-5 text-slate-900 group-hover:rotate-12 transition-transform" />
            <span>{ctaPrimaryText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to={ctaSecondLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-slate-200 bg-surface/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-nexora-500/40 transition-all duration-300 backdrop-blur-md hover:text-white"
          >
            <Users className="w-5 h-5 text-nexora-400" />
            <span>{ctaSecondText}</span>
          </Link>
        </motion.div>

        {/* Step 6: Quick Highlights Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-800/80"
        >
          {[
            { icon: Users, label: getContent('home', 'stat_1_label') || "500+ Students", sub: getContent('home', 'stat_1_sub') || "Engaged Community" },
            { icon: Rocket, label: getContent('home', 'stat_2_label') || "24+ Events", sub: getContent('home', 'stat_2_sub') || "Summits & Hackathons" },
            { icon: Zap, label: getContent('home', 'stat_3_label') || "Active Cell", sub: getContent('home', 'stat_3_sub') || "Innovation Driven" },
            { icon: Trophy, label: getContent('home', 'stat_4_label') || "8+ Startups", sub: getContent('home', 'stat_4_sub') || "Incubated Ideas" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface/40 border border-slate-800/60 text-left">
              <div className="w-9 h-9 rounded-lg bg-nexora-500/10 border border-nexora-500/20 flex items-center justify-center text-nexora-400 shrink-0">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">{item.label}</p>
                <p className="text-[10px] text-slate-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
