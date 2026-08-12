import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lightbulb, 
  Rocket, 
  Cpu, 
  Crown, 
  Users2, 
  Globe, 
  Sparkles,
  Info,
  Layers
} from 'lucide-react';
import { handleImageError } from '../../lib/imageUtils';
import nexoraLogo from '../../assets/nexora-logo.png';

interface EcosystemNode {
  id: string;
  label: string;
  angle: number; // in degrees for circular layout
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
  metrics: string;
  pillars: string[];
}

export const EcosystemGraph: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('innovation');

  const nodes: EcosystemNode[] = [
    {
      id: 'innovation',
      label: 'Innovation',
      angle: 0, // Top
      icon: Lightbulb,
      color: '#00D2FF',
      description: 'Incubating novel ideas, patent assistance, and deep-tech problem-solving across all engineering disciplines.',
      metrics: '5+ Patents Filed & Evaluated',
      pillars: ['Idea Sprints', 'IPR Advisory', 'Research Commercialization']
    },
    {
      id: 'entrepreneurship',
      label: 'Entrepreneurship',
      angle: 60, // Top-Right
      icon: Rocket,
      color: '#38BDF8',
      description: 'Guiding student founders through legal structuring, business modeling, go-to-market strategies, and seed funding.',
      metrics: '8+ Active Campus Startups',
      pillars: ['Venture Lab', 'Pitch Days', 'Seed Grants']
    },
    {
      id: 'technology',
      label: 'Technology',
      angle: 120, // Bottom-Right
      icon: Cpu,
      color: '#818CF8',
      description: 'Empowering builders with cutting-edge full-stack, AI, embedded systems, and scalable cloud computing frameworks.',
      metrics: '15+ Hackathons & Tech Bootcamps',
      pillars: ['NexHacks', 'Code Sprints', 'Cloud Credits']
    },
    {
      id: 'impact',
      label: 'Impact',
      angle: 180, // Bottom
      icon: Globe,
      color: '#34D399',
      description: 'Creating sustainable, measurable value for smart cities, healthcare accessibility, and regional community empowerment.',
      metrics: '500+ Community Beneficiaries',
      pillars: ['Civic Tech', 'CleanTech', 'Sustainable Solutions']
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      angle: 240, // Bottom-Left
      icon: Users2,
      color: '#F472B6',
      description: 'Connecting ACET students with external angel syndicates, corporate innovation hubs, alumni mentors, and peers.',
      metrics: '18+ Strategic Industry Alliances',
      pillars: ['Founder Talks', 'Mentor Hours', 'Corporate MOUs']
    },
    {
      id: 'leadership',
      label: 'Leadership',
      angle: 300, // Top-Left
      icon: Crown,
      color: '#FBBF24',
      description: 'Developing executive resilience, cross-functional team coordination, public speaking, and strategic management.',
      metrics: '45+ Core Student Leaders',
      pillars: ['Wing Management', 'Event Governance', 'Public Relations']
    }
  ];

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[0];

  return (
    <section className="relative py-28 border-t border-slate-800/80 bg-surface/30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-3">
            <Layers className="w-3.5 h-3.5 text-nexora-400" />
            <span>Interactive Visualization</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white mb-4">
            The Nexora <span className="text-gradient-cyan">Ecosystem</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A cohesive innovation network designed to guide student creators from concept to commercial execution. Hover or click any node to explore its function.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP / TABLET INTERACTIVE ORBITAL GRAPH */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Orbital Visualizer (Col 7) */}
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-[520px]">
            
            {/* SVG Connection Lines & Orbit Circles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
              {/* Outer Orbit Rings */}
              <circle cx="250" cy="250" r="190" fill="none" stroke="rgba(0, 210, 255, 0.12)" strokeWidth="1.5" strokeDasharray="4 6" className="animate-spin-slow origin-center" />
              <circle cx="250" cy="250" r="130" fill="none" stroke="rgba(0, 112, 243, 0.08)" strokeWidth="1" />

              {/* Connecting Radial Lines from Center to Each Node */}
              {nodes.map((node) => {
                const rad = ((node.angle - 90) * Math.PI) / 180;
                const x = 250 + 190 * Math.cos(rad);
                const y = 250 + 190 * Math.sin(rad);
                const isActive = node.id === activeNodeId;

                return (
                  <g key={node.id}>
                    <line
                      x1="250"
                      y1="250"
                      x2={x}
                      y2={y}
                      stroke={isActive ? node.color : 'rgba(148, 163, 184, 0.2)'}
                      strokeWidth={isActive ? '2.5' : '1'}
                      strokeDasharray={isActive ? 'none' : '3 3'}
                      className="transition-all duration-300"
                    />
                    {isActive && (
                      <circle
                        cx={(250 + x) / 2}
                        cy={(250 + y) / 2}
                        r="3"
                        fill={node.color}
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Center Node: NEXORA Brand Hub */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 w-32 h-32 rounded-3xl bg-black/90 border-2 border-nexora-400 p-2 shadow-glow-lg flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="w-14 h-14 overflow-hidden mb-1">
                <img
                  src={nexoraLogo}
                  alt="Nexora Center Core"
                  onError={(e) => handleImageError(e, nexoraLogo)}
                  className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(0,210,255,0.6)]"
                />
              </div>
              <span className="font-heading font-black text-xs tracking-widest text-white">
                NEX<span className="text-nexora-400">O</span>RA
              </span>
              <span className="text-[8px] font-mono text-cyan-300 font-semibold tracking-wider uppercase">
                CORE HUB
              </span>
            </motion.div>

            {/* Orbiting Satellite Nodes */}
            {nodes.map((node) => {
              const rad = ((node.angle - 90) * Math.PI) / 180;
              // Radius 190 in 500x500 box -> calculate percentage offset
              const leftPercent = 50 + (190 / 500) * 100 * Math.cos(rad);
              const topPercent = 50 + (190 / 500) * 100 * Math.sin(rad);
              const isActive = node.id === activeNodeId;

              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setActiveNodeId(node.id)}
                  className={`absolute z-30 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all duration-300 focus:outline-none ${
                    isActive
                      ? 'bg-surface-elevated border-2 shadow-glow-md scale-110'
                      : 'bg-surface/80 hover:bg-surface-elevated border border-slate-700/80 hover:border-slate-500 scale-100'
                  }`}
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    transform: 'translate(-50%, -50%)',
                    borderColor: isActive ? node.color : undefined,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform"
                    style={{ backgroundColor: `${node.color}20`, color: node.color }}
                  >
                    <node.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-xs font-bold font-heading tracking-wide ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {node.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Node Details (Col 5) */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl p-8 bg-surface-elevated/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl relative overflow-hidden"
              >
                {/* Accent glow on top-right */}
                <div 
                  className="absolute -right-8 -top-8 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
                  style={{ backgroundColor: activeNode.color }}
                />

                <div className="flex items-center gap-3.5 mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: `${activeNode.color}25`, color: activeNode.color }}
                  >
                    <activeNode.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-heading text-white">
                      {activeNode.label}
                    </h3>
                    <p className="text-xs font-mono font-semibold" style={{ color: activeNode.color }}>
                      ECOSYSTEM PILLAR
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {activeNode.description}
                </p>

                {/* Key Metric Box */}
                <div className="p-4 rounded-xl bg-surface/80 border border-slate-800 mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-nexora-400" />
                    <span className="text-xs text-slate-400">Validated Impact</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-white">
                    {activeNode.metrics}
                  </span>
                </div>

                {/* Core Tracks / Sub-programs */}
                <div>
                  <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-slate-400 mb-3">
                    Active Tracks & Capabilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeNode.pillars.map((pillar, pIdx) => (
                      <span
                        key={pIdx}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-200 border border-slate-700/60"
                      >
                        {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* MOBILE RESPONSIVE STACKED CARDS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-4">
          {nodes.map((node) => (
            <div
              key={node.id}
              className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800 hover:border-nexora-500/40 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${node.color}20`, color: node.color }}
                >
                  <node.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">{node.label}</h4>
                  <span className="text-[10px] font-mono text-slate-400">{node.metrics}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {node.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {node.pillars.map((p, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
