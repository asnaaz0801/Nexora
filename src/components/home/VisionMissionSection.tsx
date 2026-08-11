import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Target, 
  Wrench, 
  Terminal, 
  Rocket, 
  Compass, 
  Building2, 
  Lightbulb, 
  Crown, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

export const VisionMissionSection: React.FC = () => {
  const missionCards = [
    {
      icon: Wrench,
      title: "Workshops",
      desc: "Deep-dive sessions on system design, venture economics, and rapid prototyping.",
      color: "from-cyan-500/20 to-blue-500/10"
    },
    {
      icon: Terminal,
      title: "Hackathons",
      desc: "36-hour sprint challenges solving smart infrastructure, AI, and civic tech problems.",
      color: "from-blue-500/20 to-indigo-500/10"
    },
    {
      icon: Rocket,
      title: "Startup Events",
      desc: "Annual E-Summits, pitch competitions, and regional venture expos.",
      color: "from-sky-500/20 to-cyan-500/10"
    },
    {
      icon: Compass,
      title: "Mentorship",
      desc: "Structured guidance from alumni founders, architects, and angel investors.",
      color: "from-indigo-500/20 to-purple-500/10"
    },
    {
      icon: Building2,
      title: "Industry Collaboration",
      desc: "Partnerships with tech companies, incubation centers, and government bodies.",
      color: "from-purple-500/20 to-blue-500/10"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      desc: "Fostering original patents, novel architectures, and experimental hardware.",
      color: "from-cyan-500/20 to-emerald-500/10"
    },
    {
      icon: Crown,
      title: "Leadership",
      desc: "Cultivating managerial resilience, team coordination, and strategic communication.",
      color: "from-amber-500/20 to-orange-500/10"
    },
    {
      icon: TrendingUp,
      title: "Sustainable Ventures",
      desc: "Transforming collegiate prototypes into revenue-generating, scalable businesses.",
      color: "from-emerald-500/20 to-teal-500/10"
    }
  ];

  return (
    <section className="relative py-28 border-t border-slate-800/80 overflow-hidden bg-background">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-nexora-900/15 via-sky-950/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* VISION SECTION */}
        {/* ========================================================================= */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-6">
            <Eye className="w-3.5 h-3.5 text-nexora-400" />
            <span>Official Vision</span>
          </div>

          <div className="relative p-8 sm:p-12 rounded-3xl bg-surface-elevated/80 border border-nexora-500/30 shadow-2xl backdrop-blur-xl">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-nexora-400 to-transparent" />
            <Sparkles className="w-8 h-8 text-nexora-400 mx-auto mb-4 opacity-75" />

            <blockquote className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-slate-100 leading-relaxed sm:leading-relaxed">
              "To build a vibrant entrepreneurial ecosystem where{' '}
              <span className="text-gradient-cyan font-bold">innovation</span> thrives, ideas transform into{' '}
              <span className="text-gradient-blue font-bold">impactful ventures</span>, and every student is empowered to become a visionary{' '}
              <span className="text-white font-bold underline decoration-nexora-400/50 underline-offset-8">leader</span>,{' '}
              <span className="text-gradient-cyan font-bold">problem solver</span>, and{' '}
              <span className="text-sky-300 font-bold">changemaker</span> for society."
            </blockquote>

            <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs font-mono text-slate-400">
              <span>NEXORA E-CELL</span>
              <span>•</span>
              <span>ANJUMAN COLLEGE OF ENGINEERING & TECHNOLOGY</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MISSION SECTION */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-4">
            <Target className="w-3.5 h-3.5 text-nexora-400" />
            <span>Our Mission</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-white mb-4">
            Transforming Ideas into <span className="text-gradient-cyan">Sustainable Ventures</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            "To nurture entrepreneurial talent by organizing workshops, hackathons, startup events, mentorship programs, and industry collaborations that empower students to innovate, lead, and transform ideas into sustainable ventures."
          </p>
        </div>

        {/* 8 Interactive Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {missionCards.map((card, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="relative p-6 rounded-2xl bg-surface/70 border border-slate-800 hover:border-nexora-500/40 hover:shadow-glow-card transition-all duration-300 backdrop-blur-md group overflow-hidden"
            >
              {/* Subtle gradient card backdrop on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-nexora-500/10 border border-nexora-500/25 flex items-center justify-center text-nexora-400 mb-4 group-hover:scale-110 group-hover:bg-nexora-500/20 transition-all duration-300">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-nexora-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
