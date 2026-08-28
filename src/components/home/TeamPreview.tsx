import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Linkedin, Instagram, Github } from '../common/SocialIcons';
import { useData } from '../../context/DataContext';
import { handleAvatarError, getAvatarFallback } from '../../lib/imageUtils';

export const TeamPreview: React.FC = () => {
  const { teamMembers } = useData();

  // Show leadership members (top 4)
  const leaders = teamMembers
    .filter(tm => tm.department === 'Leadership')
    .slice(0, 4);

  return (
    <section className="relative py-24 border-t border-slate-800/80 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-3">
              <Users className="w-3.5 h-3.5 text-nexora-400" />
              <span>Leadership & Core Wing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
              Who is Behind <span className="text-gradient-cyan">Nexora?</span>
            </h2>
          </div>

          <Link
            to="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-surface-elevated hover:bg-slate-800 border border-slate-700/80 hover:border-nexora-500/40 transition-all group"
          >
            <span>View All Wings & Members</span>
            <ArrowRight className="w-4 h-4 text-nexora-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -6 }}
              className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800 hover:border-nexora-500/40 hover:shadow-glow-card transition-all duration-300 backdrop-blur-md group flex flex-col justify-between"
            >
              <div>
                {/* Photo with glow border */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-700/80 group-hover:border-nexora-400/50 transition-colors">
                  <img
                    src={member.photo || getAvatarFallback(member.name)}
                    alt={member.name}
                    onError={(e) => handleAvatarError(e, member.name)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
                  
                  <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/80 text-nexora-300 border border-nexora-500/30 backdrop-blur-md">
                    {member.department}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-heading text-white group-hover:text-nexora-300 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs font-mono font-semibold text-cyan-400 mb-2">
                  {member.position}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-400 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-400 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                    aria-label={`${member.name} Instagram`}
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-7 h-7 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-400 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
