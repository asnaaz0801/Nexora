import React, { useState, useEffect, useMemo } from 'react';
import { Users, X, Mail, Crown, Star, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Instagram, Github } from '../components/common/SocialIcons';
import { useData } from '../context/DataContext';
import { TeamMember } from '../types';

export const TeamPage: React.FC = () => {
  const { teamMembers, isLoading } = useData();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const departments = ['All', 'Leadership', 'Technical', 'Design', 'Marketing', 'PR & Outreach', 'Operations', 'Content', 'Events'];

  // Only show active members on public page
  const activeMembers = useMemo(() =>
    teamMembers.filter(m => m.isActive !== false),
    [teamMembers]
  );

  // Separate President & Vice President from other team members
  const { executives, otherMembers } = useMemo(() => {
    const sorted = [...activeMembers].sort((a, b) => (a.display_order || a.order || 0) - (b.display_order || b.order || 0));

    // Find President and Vice President by position name or display_order (1 and 2)
    const execList: TeamMember[] = [];
    const restList: TeamMember[] = [];

    sorted.forEach(m => {
      const posLower = m.position.toLowerCase();
      if (posLower.includes('president') || posLower.includes('vice president') || m.display_order === 1 || m.display_order === 2) {
        execList.push(m);
      } else {
        restList.push(m);
      }
    });

    // Ensure President comes before Vice President
    execList.sort((a, b) => {
      const aIsPres = a.position.toLowerCase().includes('president') && !a.position.toLowerCase().includes('vice');
      const bIsPres = b.position.toLowerCase().includes('president') && !b.position.toLowerCase().includes('vice');
      if (aIsPres && !bIsPres) return -1;
      if (!aIsPres && bIsPres) return 1;
      return (a.display_order || 0) - (b.display_order || 0);
    });

    return { executives: execList, otherMembers: restList };
  }, [activeMembers]);

  const filteredOtherTeam = useMemo(() => {
    if (selectedDept === 'All') return otherMembers;
    return otherMembers.filter(tm => tm.department === selectedDept);
  }, [otherMembers, selectedDept]);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-4">
            <Users className="w-4 h-4 text-nexora-400" />
            <span>Nexora Executive & Core Wing</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight mb-4">
            The Minds Behind <span className="text-gradient-cyan">Nexora</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300">
            Led by our Executive President and Vice President, a dedicated team of student engineers, designers, communicators, and community organizers driving the ACET entrepreneurship ecosystem.
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800 animate-pulse">
                <div className="aspect-square rounded-xl bg-slate-800 mb-4" />
                <div className="h-4 bg-slate-800 rounded mb-2" />
                <div className="h-3 bg-slate-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && (
          <>
            {/* 👑 EXECUTIVE LEADERSHIP TIER (President & Vice President) 👑 */}
            {executives.length > 0 && selectedDept === 'All' && (
              <div className="mb-16">
                <div className="text-center mb-8">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-300 uppercase tracking-widest">
                    <Crown className="w-3.5 h-3.5 text-amber-400" />
                    <span>Executive Leadership</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {executives.map((exec) => {
                    const isPresident = exec.position.toLowerCase().includes('president') && !exec.position.toLowerCase().includes('vice');
                    return (
                      <motion.div
                        key={exec.id}
                        whileHover={{ y: -6 }}
                        onClick={() => setSelectedMember(exec)}
                        className={`p-7 rounded-3xl bg-surface-elevated/90 border ${
                          isPresident ? 'border-amber-500/50 shadow-glow-amber' : 'border-cyan-500/40 shadow-glow-cyan'
                        } hover:scale-[1.02] transition-all duration-300 backdrop-blur-xl group cursor-pointer flex flex-col justify-between relative overflow-hidden`}
                      >
                        {/* Subtle ambient gradient overlay */}
                        <div className={`absolute -right-10 -top-10 w-40 h-40 ${isPresident ? 'bg-amber-500/10' : 'bg-cyan-500/10'} rounded-full blur-3xl pointer-events-none`} />

                        <div>
                          {/* Image container */}
                          <div className="relative aspect-square rounded-2xl overflow-hidden mb-5 bg-slate-900 border border-slate-700/80 group-hover:border-nexora-400/50 transition-colors">
                            <img
                              src={exec.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(exec.name)}&background=0D1117&color=00D2FF&size=400`}
                              alt={exec.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
                            
                            <span className={`absolute bottom-3 left-3 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                              isPresident
                                ? 'bg-amber-500/90 text-slate-950 shadow-lg'
                                : 'bg-cyan-500/90 text-slate-950 shadow-lg'
                            } backdrop-blur-md flex items-center gap-1.5`}>
                              {isPresident ? <Crown className="w-3.5 h-3.5" /> : <Star className="w-3.5 h-3.5" />}
                              {exec.position}
                            </span>
                          </div>

                          <h3 className="text-2xl font-black font-heading text-white group-hover:text-nexora-300 transition-colors">
                            {exec.name}
                          </h3>
                          <p className={`text-xs font-mono font-bold uppercase tracking-wider ${isPresident ? 'text-amber-300' : 'text-cyan-300'} mb-2`}>
                            {exec.position}
                          </p>

                          {(exec.branch || exec.year) && (
                            <p className="text-xs text-slate-400 mb-3">
                              {[exec.branch, exec.year].filter(Boolean).join(' • ')}
                            </p>
                          )}

                          {exec.bio && (
                            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                              {exec.bio}
                            </p>
                          )}
                        </div>

                        {/* Social Links */}
                        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2">
                          {exec.linkedin && (
                            <div className="w-8 h-8 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-400 hover:text-nexora-400">
                              <Linkedin className="w-4 h-4" />
                            </div>
                          )}
                          {exec.instagram && (
                            <div className="w-8 h-8 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-400 hover:text-pink-400">
                              <Instagram className="w-4 h-4" />
                            </div>
                          )}
                          {exec.github && (
                            <div className="w-8 h-8 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white">
                              <Github className="w-4 h-4" />
                            </div>
                          )}
                          {exec.email && (
                            <div className="w-8 h-8 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-400 hover:text-nexora-400">
                              <Mail className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Department Filter Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap pb-4 mb-12 border-t border-slate-800/80 pt-10">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter Wing:</span>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedDept === dept
                      ? 'bg-nexora-500 text-slate-950 shadow-glow-sm scale-105'
                      : 'bg-surface text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Empty State */}
            {filteredOtherTeam.length === 0 && (
              <div className="text-center py-16">
                <Users className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-400 text-base font-medium">
                  {selectedDept === 'All' ? 'Additional core team members will be displayed here.' : `No members found in ${selectedDept}.`}
                </p>
              </div>
            )}

            {/* Core Wing Grid */}
            {filteredOtherTeam.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredOtherTeam.map((member) => (
                  <motion.div
                    key={member.id}
                    whileHover={{ y: -6 }}
                    onClick={() => setSelectedMember(member)}
                    className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800 hover:border-nexora-500/40 hover:shadow-glow-card transition-all duration-300 backdrop-blur-md flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Photo container */}
                      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-slate-900 border border-slate-700/80 group-hover:border-nexora-400/50 transition-colors">
                        <img
                          src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0D1117&color=00D2FF&size=400`}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-60" />
                        
                        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/80 text-nexora-300 border border-nexora-500/30 backdrop-blur-md">
                          {member.department}
                        </span>

                        <div className="absolute inset-0 bg-nexora-500/0 group-hover:bg-nexora-500/10 transition-all duration-300 flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 text-[10px] font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm transition-opacity duration-300">
                            View Profile
                          </span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold font-heading text-white group-hover:text-nexora-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-cyan-400 mb-1">
                        {member.position}
                      </p>

                      {(member.branch || member.year) && (
                        <p className="text-[11px] text-slate-400 mb-2">
                          {[member.branch, member.year].filter(Boolean).join(' • ')}
                        </p>
                      )}

                      {member.bio && (
                        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    {/* Social Links Preview */}
                    <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                      {member.linkedin && (
                        <div className="w-7 h-7 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-500">
                          <Linkedin className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {member.instagram && (
                        <div className="w-7 h-7 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-500">
                          <Instagram className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {member.github && (
                        <div className="w-7 h-7 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-500">
                          <Github className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {member.email && (
                        <div className="w-7 h-7 rounded-lg bg-surface border border-slate-700 flex items-center justify-center text-slate-500">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ─── Team Member Modal ─── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-lg bg-surface-elevated border border-nexora-500/30 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Top image section */}
              <div className="relative h-56 bg-slate-900 overflow-hidden">
                <img
                  src={selectedMember.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=0D1117&color=00D2FF&size=400`}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-elevated via-surface-elevated/20 to-transparent" />
                
                {/* Dept badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-nexora-500/30 text-nexora-300 border border-nexora-500/40 backdrop-blur-md">
                    {selectedMember.department}
                  </span>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors backdrop-blur-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <h2 className="text-2xl font-black font-heading text-white">{selectedMember.name}</h2>
                  <p className="text-sm font-mono font-semibold text-nexora-400 mt-0.5">{selectedMember.position}</p>
                  {(selectedMember.branch || selectedMember.year) && (
                    <p className="text-xs text-slate-400 mt-1">
                      {[selectedMember.branch, selectedMember.year].filter(Boolean).join(' • ')}
                    </p>
                  )}
                </div>

                {selectedMember.bio && (
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {selectedMember.bio}
                  </p>
                )}

                {/* Social Links */}
                {(selectedMember.linkedin || selectedMember.instagram || selectedMember.github || selectedMember.email) && (
                  <div className="pt-3 border-t border-slate-800">
                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">Connect</p>
                    <div className="flex items-center gap-3">
                      {selectedMember.linkedin && (
                        <a
                          href={selectedMember.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-slate-700 text-xs font-semibold text-slate-300 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          LinkedIn
                        </a>
                      )}
                      {selectedMember.instagram && (
                        <a
                          href={selectedMember.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-slate-700 text-xs font-semibold text-slate-300 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                          Instagram
                        </a>
                      )}
                      {selectedMember.github && (
                        <a
                          href={selectedMember.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}
                      {selectedMember.email && (
                        <a
                          href={`mailto:${selectedMember.email}`}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-slate-700 text-xs font-semibold text-slate-300 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          Email
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
