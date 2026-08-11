import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Rocket, CheckCircle2 } from 'lucide-react';

export const JoinCTA: React.FC = () => {
  return (
    <section className="relative py-24 border-t border-slate-800/80 bg-background overflow-hidden">
      {/* Background cyber glow circle */}
      <div className="absolute inset-0 bg-radial-glow opacity-80 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl p-8 sm:p-14 bg-gradient-to-b from-surface-elevated to-surface border border-nexora-500/40 shadow-2xl backdrop-blur-2xl text-center overflow-hidden">
          
          {/* Glowing Top Border */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-nexora-500 via-sky-300 to-blue-600 shadow-glow-sm" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nexora-500/15 border border-nexora-500/30 text-xs font-bold text-nexora-300 uppercase tracking-widest mb-6">
            <Rocket className="w-3.5 h-3.5 text-nexora-400" />
            <span>Recruitment Open 2026</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-heading tracking-tight text-white mb-6 max-w-3xl mx-auto leading-tight">
            Your Idea Deserves <span className="text-gradient-cyan">a Platform.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Whether you are a developer, designer, marketer, event organizer, or an aspiring founder with a notebook full of ideas—Nexora gives you the team, resources, and stage to build.
          </p>

          {/* Quick perks row */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-300 mb-10">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dedicated Mentorship</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Leadership Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Startup Incubation Access</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/join"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 rounded-xl font-bold text-base text-slate-950 bg-gradient-to-r from-nexora-400 via-sky-300 to-blue-500 shadow-glow-md hover:shadow-glow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 border border-cyan-200/50 group"
            >
              <Sparkles className="w-5 h-5 text-slate-900 group-hover:rotate-12 transition-transform" />
              <span>Apply to Join Nexora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-sm text-slate-300 hover:text-white bg-surface border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <span>Have Questions? Contact Us</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
