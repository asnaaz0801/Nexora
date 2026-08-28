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
  Sparkles,
  Zap
} from 'lucide-react';
import { useSiteContent } from '../../hooks/useSiteContent';
import { CosmicGalaxyBackground } from '../common/CosmicGalaxyBackground';
import { TiltCard3D } from '../common/TiltCard3D';

export const VisionMissionSection: React.FC = () => {
  const { getContent } = useSiteContent();

  const visionHeading = getContent('vision', 'heading') || 'Our Vision';
  const visionContent = getContent('vision', 'content') || 'To build a vibrant entrepreneurial ecosystem where innovation thrives, ideas transform into impactful ventures, and every student is empowered to become a visionary leader, problem solver, and changemaker for society.';

  const missionBadge   = getContent('mission', 'badge') || 'OUR MISSION';
  const missionHeading = getContent('mission', 'heading') || 'Transforming Ideas into Sustainable Ventures';
  const missionQuote   = getContent('mission', 'quote') || getContent('mission', 'content') || 'To nurture entrepreneurial talent by organizing workshops, hackathons, startup events, mentorship programs, and industry collaborations that empower students to innovate, lead, and transform ideas into sustainable ventures.';

  const missionCards = [
    {
      icon: Wrench,
      title: getContent('mission', 'card_1_title') || "Workshops",
      desc: getContent('mission', 'card_1_desc') || "Deep-dive sessions on system design, venture economics, and rapid prototyping.",
      color: "from-cyan-500/25 to-blue-600/10",
      glow: "rgba(0, 210, 255, 0.3)"
    },
    {
      icon: Terminal,
      title: getContent('mission', 'card_2_title') || "Hackathons",
      desc: getContent('mission', 'card_2_desc') || "36-hour sprint challenges solving smart infrastructure, AI, and civic tech problems.",
      color: "from-blue-500/25 to-indigo-600/10",
      glow: "rgba(59, 130, 246, 0.3)"
    },
    {
      icon: Rocket,
      title: getContent('mission', 'card_3_title') || "Startup Events",
      desc: getContent('mission', 'card_3_desc') || "Annual E-Summits, pitch competitions, and regional venture expos.",
      color: "from-sky-500/25 to-cyan-600/10",
      glow: "rgba(56, 189, 248, 0.3)"
    },
    {
      icon: Compass,
      title: getContent('mission', 'card_4_title') || "Mentorship",
      desc: getContent('mission', 'card_4_desc') || "Structured guidance from alumni founders, architects, and angel investors.",
      color: "from-indigo-500/25 to-purple-600/10",
      glow: "rgba(129, 140, 248, 0.3)"
    },
    {
      icon: Building2,
      title: getContent('mission', 'card_5_title') || "Industry Collaboration",
      desc: getContent('mission', 'card_5_desc') || "Partnerships with tech companies, incubation centers, and government bodies.",
      color: "from-purple-500/25 to-pink-600/10",
      glow: "rgba(168, 85, 247, 0.3)"
    },
    {
      icon: Lightbulb,
      title: getContent('mission', 'card_6_title') || "Innovation",
      desc: getContent('mission', 'card_6_desc') || "Fostering original patents, novel architectures, and experimental hardware.",
      color: "from-cyan-500/25 to-emerald-600/10",
      glow: "rgba(20, 184, 166, 0.3)"
    },
    {
      icon: Crown,
      title: getContent('mission', 'card_7_title') || "Leadership",
      desc: getContent('mission', 'card_7_desc') || "Cultivating managerial resilience, team coordination, and strategic communication.",
      color: "from-amber-500/25 to-orange-600/10",
      glow: "rgba(245, 158, 11, 0.3)"
    },
    {
      icon: TrendingUp,
      title: getContent('mission', 'card_8_title') || "Sustainable Ventures",
      desc: getContent('mission', 'card_8_desc') || "Transforming collegiate prototypes into revenue-generating, scalable businesses.",
      color: "from-emerald-500/25 to-teal-600/10",
      glow: "rgba(16, 185, 129, 0.3)"
    }
  ];

  return (
    <section className="relative py-28 border-t border-slate-800/80 overflow-hidden bg-background">
      {/* Dynamic 3D Cosmic Galaxy Starfield */}
      <CosmicGalaxyBackground density={100} className="absolute inset-0 pointer-events-none opacity-85 z-0" />

      {/* Atmospheric Radial Nebulas */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-cyan-500/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* VISION SECTION */}
        {/* ========================================================================= */}
        <div className="mb-24 text-center max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>{visionHeading}</span>
          </motion.div>

          <TiltCard3D glowColor="rgba(0, 210, 255, 0.3)" className="w-full">
            <div className="relative p-8 sm:p-12 rounded-3xl bg-surface-elevated/90 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl overflow-hidden group">
              {/* Glowing top line highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00D2FF]" />
              
              <Sparkles className="w-9 h-9 text-cyan-400 mx-auto mb-5 animate-bounce" />

              <blockquote className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-slate-100 leading-relaxed sm:leading-relaxed tracking-tight">
                "{visionContent.replace(/^"|"$/g, '')}"
              </blockquote>

              <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-2.5 text-xs font-mono text-cyan-300/80">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>NEXORA E-CELL</span>
                <span>•</span>
                <span>ANJUMAN COLLEGE OF ENGINEERING & TECHNOLOGY</span>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* ========================================================================= */}
        {/* MISSION SECTION */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300 uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(138,43,226,0.2)]"
          >
            <Target className="w-3.5 h-3.5 text-purple-400" />
            <span>{missionBadge}</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white mb-5">
            {missionHeading.includes('Sustainable Ventures') ? (
              <>
                {missionHeading.split('Sustainable Ventures')[0]}
                <span className="text-gradient-cyan bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">Sustainable Ventures</span>
              </>
            ) : (
              <span className="text-gradient-cyan bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400">{missionHeading}</span>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            "{missionQuote.replace(/^"|"$/g, '')}"
          </p>
        </div>

        {/* 8 Interactive 3D Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {missionCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              viewport={{ once: true }}
            >
              <TiltCard3D glowColor={card.glow} className="h-full group">
                <div className="relative h-full p-6 rounded-2xl bg-surface/80 border border-slate-800/90 hover:border-cyan-500/50 transition-all duration-300 backdrop-blur-xl overflow-hidden flex flex-col justify-between">
                  {/* Subtle gradient card backdrop on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-nexora-500/10 border border-nexora-500/25 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-nexora-500/20 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300">
                      <card.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
