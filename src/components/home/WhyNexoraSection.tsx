import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Layers, 
  Network, 
  Compass, 
  Cpu, 
  Globe2, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
export const WhyNexoraSection: React.FC = () => {
  const pillars = [
    {
      num: "01",
      title: "Learn",
      tagline: "Beyond Classrooms",
      desc: "Gain practical venture knowledge, unit economics, modern architectures, and product strategy not covered in traditional engineering textbooks.",
      icon: BookOpen,
      gradient: "from-cyan-500/20 to-blue-500/10"
    },
    {
      num: "02",
      title: "Build",
      tagline: "Turn Ideas into Reality",
      desc: "Transform code repositories and capstones into working commercial software, hardware prototypes, and scalable SaaS products.",
      icon: Layers,
      gradient: "from-blue-500/20 to-indigo-500/10"
    },
    {
      num: "03",
      title: "Connect",
      tagline: "Venture Network",
      desc: "Meet early-stage angel investors, unicorn CTOs, startup founders, and like-minded campus builders across Maharashtra.",
      icon: Network,
      gradient: "from-sky-500/20 to-cyan-500/10"
    },
    {
      num: "04",
      title: "Lead",
      tagline: "Executive Resilience",
      desc: "Manage high-profile hackathons, lead interdisciplinary wings, direct marketing campaigns, and acquire battle-tested leadership skills.",
      icon: Compass,
      gradient: "from-purple-500/20 to-indigo-500/10"
    },
    {
      num: "05",
      title: "Innovate",
      tagline: "Frontier Technologies",
      desc: "Experiment freely with generative AI, autonomous robotics, Web3, CleanTech, and patent-worthy engineering breakthroughs.",
      icon: Cpu,
      gradient: "from-cyan-500/20 to-emerald-500/10"
    },
    {
      num: "06",
      title: "Impact",
      tagline: "Solve Real Problems",
      desc: "Create impactful solutions for smart cities, healthcare accessibility, rural electrification, and societal friction points.",
      icon: Globe2,
      gradient: "from-emerald-500/20 to-cyan-500/10"
    }
  ];

  return (
    <section className="relative py-24 border-t border-slate-800/80 bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-nexora-400" />
              <span>Student Advantage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
              Why Join <span className="text-gradient-cyan">Nexora?</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md">
            Six foundational pillars that empower our student members to accelerate their careers and build sustainable startups.
          </p>
        </div>

        {/* 6 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="relative p-7 rounded-2xl bg-surface/80 border border-slate-800 hover:border-nexora-500/40 hover:shadow-glow-card transition-all duration-300 backdrop-blur-xl group overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle gradient glow */}
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-nexora-400 transition-colors">
                    {item.num}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-nexora-500/10 border border-nexora-500/20 flex items-center justify-center text-nexora-400 group-hover:bg-nexora-500/20 group-hover:scale-110 transition-all duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold font-heading text-white mb-1 group-hover:text-nexora-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs font-mono font-semibold text-nexora-400/90 tracking-wider uppercase mb-3">
                  {item.tagline}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
                <span>Explore opportunities</span>
                <ArrowUpRight className="w-4 h-4 text-nexora-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
};
