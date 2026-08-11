import React, { useEffect } from 'react';
import { Eye, Target, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VisionMissionSection } from '../components/home/VisionMissionSection';

export const VisionMissionPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4 text-nexora-400" />
            <span>Guiding Principles</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight mb-6">
            Vision, Mission & <span className="text-gradient-cyan">Core Values</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            The foundational compass guiding all our hackathons, incubation cohorts, student workshops, and strategic ventures at ACET.
          </p>
        </div>

        {/* Embedded Interactive Vision & Mission Component */}
        <VisionMissionSection />

        {/* Core Values Grid */}
        <div className="my-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold font-heading text-white mb-3">
              Our Core <span className="text-gradient-cyan">Values</span>
            </h2>
            <p className="text-sm text-slate-300">
              The four unshakeable standards we uphold across every initiative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Bias for Action & Execution",
                desc: "We prioritize shipping working prototypes, writing clean code, and testing real business hypotheses over endless theoretical deliberation.",
                badge: "Execution First"
              },
              {
                title: "Radical Inclusivity & Meritocracy",
                desc: "Every student from 1st year to final year across every engineering discipline has an equal platform to innovate, pitch, and lead.",
                badge: "Open Platform"
              },
              {
                title: "High Ethical Standards & Societal Impact",
                desc: "We measure true success not just by funding raised, but by the tangible positive difference our technologies bring to society.",
                badge: "Ethical Leadership"
              },
              {
                title: "Continuous Curiosity & Frontier Tech",
                desc: "From generative AI models to sustainable energy storage, we encourage constant exploration of emerging frontiers.",
                badge: "Cutting-Edge"
              }
            ].map((val, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-surface-elevated/80 border border-slate-800 space-y-3">
                <span className="text-xs font-mono font-bold text-nexora-400 uppercase tracking-widest px-2.5 py-1 rounded bg-nexora-500/10 border border-nexora-500/20">
                  {val.badge}
                </span>
                <h3 className="text-xl font-bold font-heading text-white pt-2">
                  {val.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-slate-800 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold font-heading text-white mb-3">
            Want to build with us?
          </h3>
          <p className="text-sm text-slate-300 mb-6">
            Join Nexora E-Cell and play an active role in shaping ACET's entrepreneurial ecosystem.
          </p>
          <Link
            to="/join"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-nexora-400 hover:bg-nexora-300 shadow-glow-sm transition-all"
          >
            <span>Apply to Nexora</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
