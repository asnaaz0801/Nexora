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
  Compass
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const offerings = [
    { icon: Lightbulb, title: "Discover Entrepreneurship", desc: "Demystify venture creation, business models, and market validation." },
    { icon: Code, title: "Build Real Projects", desc: "Transform theoretical coursework into tangible, production-ready software and hardware." },
    { icon: Flame, title: "Participate in Hackathons", desc: "Compete in high-stakes sprints, refine prototypes, and win national grants." },
    { icon: Compass, title: "Connect with Mentors", desc: "Access 1-on-1 office hours with seasoned founders, CTOs, and angel investors." },
    { icon: Briefcase, title: "Interact with Industry", desc: "Network directly with corporate partners, startup accelerators, and venture funds." },
    { icon: Target, title: "Turn Ideas into Ventures", desc: "Receive incubation support, legal advisory, and pre-seed resources to launch." },
  ];

  return (
    <section className="relative py-24 border-t border-slate-800/80 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-nexora-400" />
            <span>About Nexora E-Cell</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white mb-6">
            Fostering <span className="text-gradient-cyan">Innovation</span> & <span className="text-gradient-blue">Leadership</span> at ACET
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Nexora is the official Entrepreneurship Cell of <strong>Anjuman College of Engineering and Technology</strong>, created to nurture innovation, problem-solving, and venture building among ambitious students.
          </p>
        </div>

        {/* Visual 2-Column Split: Key Philosophy + 6 Offering Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Philosophy Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl p-8 bg-surface-elevated/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-nexora-500/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-nexora-500/10 border border-nexora-500/30 flex items-center justify-center text-nexora-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">The Nexora Platform</h3>
                  <p className="text-xs text-nexora-400 font-mono">IDEAS → ACTION → IMPACT</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                We believe that engineering education is incomplete without entrepreneurial agency. Nexora provides students with the environment, network, and resources needed to transition from passive consumers of technology to proactive creators.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Incubation Ecosystem</span>
                  <span className="text-emerald-400 font-semibold font-mono">Active 2026</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Student Mentorship Ratio</span>
                  <span className="text-nexora-300 font-semibold font-mono">1-on-1 Dedicated</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Annual Grant Pool</span>
                  <span className="text-cyan-300 font-semibold font-mono">₹2,00,000+</span>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-nexora-400 hover:text-nexora-300 transition-colors group"
                >
                  <span>Learn more about our heritage & vision</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Interactive Offering Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {offerings.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: 'rgba(0, 210, 255, 0.4)' }}
                className="p-5 rounded-2xl bg-surface/60 border border-slate-800/80 hover:bg-surface-elevated/80 transition-all duration-300 shadow-sm backdrop-blur-md group"
              >
                <div className="w-10 h-10 rounded-xl bg-nexora-500/10 border border-nexora-500/20 flex items-center justify-center text-nexora-400 mb-3.5 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-heading text-white mb-1.5 group-hover:text-nexora-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
