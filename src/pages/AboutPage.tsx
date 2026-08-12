import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Target, 
  Award, 
  Users, 
  Lightbulb, 
  Rocket, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Cpu,
  Layers
} from 'lucide-react';
import nexoraLogo from '../assets/nexora-logo.png';
import { handleImageError } from '../lib/imageUtils';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-radial-glow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4 text-nexora-400" />
            <span>Official E-Cell of ACET</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight mb-6">
            Pioneering the Next Wave of <span className="text-gradient-cyan">Campus Builders</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Nexora is the Entrepreneurship Cell of Anjuman College of Engineering and Technology (ACET), Nagpur. We bridge the gap between classroom engineering concepts and real-world venture creation.
          </p>
        </div>

        {/* Brand Story & Identity Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface-elevated/80 border border-slate-700/80 shadow-2xl backdrop-blur-xl mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Logo Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-3xl bg-black/90 border-2 border-nexora-500/40 p-4 shadow-glow-lg flex items-center justify-center">
                <img
                  src={nexoraLogo}
                  alt="Nexora E-Cell Emblem"
                  onError={(e) => handleImageError(e, nexoraLogo)}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                />
              </div>
            </div>

            {/* Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
                Our Genesis & Philosophy
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Founded under the visionary backing of Anjuman College of Engineering and Technology, Nexora was established with a singular mission: to cultivate a self-sustaining innovation culture where students don't just search for jobs—they build solutions and create employment.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                The name <strong>Nexora</strong> represents the nexus of cutting-edge technology, bold entrepreneurship, and societal impact. From day one, we challenge conventional learning boundaries through hands-on hackathons, monthly prototyping challenges, venture incubation, and 1-on-1 industry mentorship.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-surface border border-slate-800">
                  <p className="text-xs text-slate-400">Institutional Backing</p>
                  <p className="text-sm font-bold text-white">ACET Nagpur</p>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-slate-800">
                  <p className="text-xs text-slate-400">Core Focus</p>
                  <p className="text-sm font-bold text-cyan-300">Venture Building & AI</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Pillars of the Nexora Journey */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-heading text-white mb-3">
              The Student <span className="text-gradient-cyan">Lifecycle</span>
            </h2>
            <p className="text-sm text-slate-300">
              How Nexora systematically nurtures an engineer from day one to venture launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discover", desc: "Participate in open tech bootcamps, founder talks, and ideation sessions to identify friction points in the real world.", icon: Lightbulb },
              { step: "02", title: "Prototype", desc: "Join 36-hour hackathons and the Nexora Monthly Challenge to build working MVPs with feedback from senior engineers.", icon: Cpu },
              { step: "03", title: "Incubate", desc: "Gain pre-seed workspace, cloud credits, legal advisory, and patent guidance through the ACET Incubation wing.", icon: Layers },
              { step: "04", title: "Scale & Impact", desc: "Pitch live at the annual E-Summit to angel syndicates, secure early grants, and deploy solutions to the community.", icon: Rocket },
            ].map((col, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-surface/70 border border-slate-800 hover:border-nexora-500/40 transition-all flex flex-col justify-between">
                <div>
                  <span className="font-mono text-3xl font-black text-slate-700 block mb-3">{col.step}</span>
                  <div className="w-10 h-10 rounded-xl bg-nexora-500/10 border border-nexora-500/20 flex items-center justify-center text-nexora-400 mb-4">
                    <col.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-white mb-2">{col.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{col.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Backing / ACET Advantage */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-slate-800 mb-20 text-center max-w-4xl mx-auto">
          <Building2 className="w-10 h-10 text-nexora-400 mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-4">
            Anjuman College of Engineering & Technology (ACET)
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Accredited with stellar academic standards, ACET provides the physical labs, supercomputing resources, institutional credibility, and alumni network that supercharges Nexora's initiatives.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/vision-mission"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-slate-950 bg-nexora-400 hover:bg-nexora-300 shadow-glow-sm transition-all"
            >
              <span>Explore Vision & Mission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-surface-elevated border border-slate-700/80 transition-colors"
            >
              <span>Meet the Executive Team</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
