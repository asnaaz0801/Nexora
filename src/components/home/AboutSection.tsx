import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Code, 
  Users, 
  Briefcase, 
  Flame, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Target,
  Compass,
  Sparkles
} from 'lucide-react';
import { CosmicGalaxyBackground } from '../common/CosmicGalaxyBackground';
import { TiltCard3D } from '../common/TiltCard3D';

export const AboutSection: React.FC = () => {
  const offerings = [
    { icon: Lightbulb, title: "Discover Entrepreneurship", desc: "Demystify venture creation, business models, and market validation.", color: "from-cyan-500/20 to-blue-600/10" },
    { icon: Code, title: "Build Real Projects", desc: "Transform theoretical coursework into tangible, production-ready software and hardware.", color: "from-blue-500/20 to-indigo-600/10" },
    { icon: Flame, title: "Participate in Hackathons", desc: "Compete in high-stakes sprints, refine prototypes, and win national grants.", color: "from-purple-500/20 to-pink-600/10" },
    { icon: Compass, title: "Connect with Mentors", desc: "Access 1-on-1 office hours with seasoned founders, CTOs, and angel investors.", color: "from-sky-500/20 to-cyan-600/10" },
    { icon: Briefcase, title: "Interact with Industry", desc: "Network directly with corporate partners, startup accelerators, and venture funds.", color: "from-indigo-500/20 to-purple-600/10" },
    { icon: Target, title: "Turn Ideas into Ventures", desc: "Receive incubation support, legal advisory, and pre-seed resources to launch.", color: "from-teal-500/20 to-emerald-600/10" },
  ];

  return (
    <section className="relative py-28 border-t border-slate-800/80 bg-background overflow-hidden">
      {/* 3D Galaxy Starfield Background */}
      <CosmicGalaxyBackground density={90} className="absolute inset-0 pointer-events-none opacity-80 z-0" />

      {/* Atmospheric Glowing Orbs */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-nexora-400 animate-spin-slow" />
            <span>About Nexora E-Cell</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white mb-6"
          >
            Fostering <span className="text-gradient-cyan bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Innovation</span> & <span className="text-gradient-blue bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">Leadership</span> at ACET
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal"
          >
            Nexora is the official Entrepreneurship Cell of <strong>Anjuman College of Engineering and Technology</strong>, created to nurture innovation, problem-solving, and venture building among ambitious students.
          </motion.p>
        </div>

        {/* Visual 2-Column Split: Key Philosophy + 6 Offering Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive 3D Platform Philosophy Box */}
          <div className="lg:col-span-5 flex">
            <TiltCard3D 
              glowColor="rgba(0, 210, 255, 0.35)" 
              className="w-full group"
            >
              <div className="h-full relative rounded-3xl p-8 bg-surface-elevated/80 border border-slate-700/80 shadow-2xl backdrop-blur-2xl overflow-hidden flex flex-col justify-between group-hover:border-nexora-500/50 transition-colors duration-500">
                {/* Internal Cosmic Glow */}
                <div className="absolute -right-16 -top-16 w-56 h-56 bg-nexora-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-nexora-400/30 transition-all duration-500" />
                <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.3)] group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-7 h-7" />
                      <div className="absolute inset-0 rounded-2xl border border-cyan-400/50 animate-ping opacity-25" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold font-heading text-white tracking-wide">The Nexora Platform</h3>
                      <p className="text-xs text-nexora-300 font-mono tracking-wider flex items-center gap-1 mt-0.5">
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                        IDEAS → ACTION → IMPACT
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed mb-8">
                    We believe that engineering education is incomplete without entrepreneurial agency. Nexora provides students with the environment, network, and resources needed to transition from passive consumers of technology to proactive creators.
                  </p>
                </div>

                <div>
                  {/* Dynamic Metrics */}
                  <div className="space-y-3.5 py-5 border-t border-b border-slate-800/90 bg-slate-950/40 -mx-8 px-8 backdrop-blur-md">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Incubation Ecosystem</span>
                      <span className="text-emerald-400 font-semibold font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">Active 2026</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Student Mentorship Ratio</span>
                      <span className="text-nexora-300 font-semibold font-mono bg-nexora-500/10 px-2.5 py-1 rounded-full border border-nexora-500/20">1-on-1 Dedicated</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Annual Grant Pool</span>
                      <span className="text-cyan-300 font-semibold font-mono bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">₹2,00,000+</span>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      to="/about"
                      className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-nexora-500/10 hover:bg-nexora-500/20 border border-nexora-500/30 text-sm font-semibold text-nexora-300 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,210,255,0.15)] group/btn"
                    >
                      <span>Learn more about our heritage & vision</span>
                      <ArrowRight className="w-4 h-4 text-cyan-400 group-hover/btn:translate-x-1.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </TiltCard3D>
          </div>

          {/* Right Column: 6 Interactive 3D Offering Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offerings.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                viewport={{ once: true }}
              >
                <TiltCard3D 
                  glowColor="rgba(138, 43, 226, 0.3)" 
                  className="h-full group"
                >
                  <div className="h-full p-6 rounded-2xl bg-surface/70 border border-slate-800/90 hover:border-nexora-500/40 transition-all duration-300 shadow-lg backdrop-blur-xl flex flex-col justify-between overflow-hidden relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-nexora-500/10 border border-nexora-500/25 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 group-hover:bg-nexora-500/20 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-300">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold font-heading text-white mb-2 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard3D>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
