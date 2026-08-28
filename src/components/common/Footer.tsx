import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Linkedin, Instagram, Github } from './SocialIcons';
import { handleImageError } from '../../lib/imageUtils';
import nexoraLogo from '../../assets/nexora-logo.png';
import { useSiteContent } from '../../hooks/useSiteContent';

export const Footer: React.FC = () => {
  const { getContent } = useSiteContent();

  const instagramUrl   = getContent('footer', 'instagram_url')   || 'https://instagram.com';
  const linkedinUrl    = getContent('footer', 'linkedin_url')    || 'https://linkedin.com';
  const githubUrl      = getContent('footer', 'github_url')      || 'https://github.com';
  const email          = getContent('contact', 'email')          || getContent('footer', 'email') || 'ecell@acet.ac.in';
  const description    = getContent('footer', 'description')     || 'Where Ideas Become Impact. Building the next generation of innovators, entrepreneurs, leaders, and changemakers at Anjuman College of Engineering and Technology.';
  const copyright      = getContent('footer', 'copyright_text') || '© 2026 Nexora E-Cell. All Rights Reserved.';
  const collegeUrl     = getContent('footer', 'college_url')     || 'https://anjumanengg.edu.in/';
  const collegeText    = getContent('footer', 'college_text')    || 'anjumanengg.edu.in';
  const badgeText      = getContent('footer', 'badge_text')      || 'An official initiative of ACET Nagpur';
  const slogan         = getContent('footer', 'slogan')          || 'DREAM. BUILD. LEAD.';
  const campusAddress  = getContent('contact', 'address')        || getContent('footer', 'campus_address') || 'Nexora E-Cell, Innovation Block, Anjuman College of Engineering & Technology, Mangalwari Bazaar Road, Sadar, Nagpur, Maharashtra 440001';
  const initiativeText = getContent('footer', 'college_initiative_text') || 'An initiative of Anjuman College of Engineering and Technology';

  const ecosystemLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Nexora', path: '/about' },
    { name: 'Vision & Mission', path: '/vision-mission' },
    { name: 'Upcoming Events', path: '/events' },
    { name: 'Our Team', path: '/team' },
  ];

  return (
    <footer className="relative bg-[#02050E] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden z-10">
      {/* Subtle top glow line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-nexora-500/40 to-transparent" />
      
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-t from-nexora-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/80 border border-nexora-500/30 p-1">
                <img
                  src={nexoraLogo}
                  alt="Nexora Official Logo"
                  onError={(e) => handleImageError(e, nexoraLogo)}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-heading text-2xl font-black tracking-wider text-white">
                  NEX<span className="text-nexora-400">O</span>RA
                </span>
                <p className="text-xs text-nexora-400 font-mono font-medium tracking-wider">
                  ENTREPRENEURSHIP CELL
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {description}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-nexora-400 shrink-0" />
              <span>{badgeText}</span>
            </div>

            {/* Slogan */}
            <div className="pt-2">
              <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase bg-slate-900 px-3 py-1 rounded border border-slate-800">
                {slogan}
              </span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 text-gradient-cyan">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {ecosystemLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-nexora-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-nexora-400 group-hover:translate-x-0.5 transition-all" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider mb-4 text-gradient-cyan">
              Campus Location
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-nexora-400 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed text-slate-300 whitespace-pre-line">
                  {campusAddress}
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-nexora-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </div>

              {/* Social Icons */}
              <div className="pt-2 flex items-center gap-2.5">
                {linkedinUrl && (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-surface border border-slate-800 flex items-center justify-center text-slate-400 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                    aria-label="Nexora LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {instagramUrl && (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-surface border border-slate-800 flex items-center justify-center text-slate-400 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                    aria-label="Nexora Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-surface border border-slate-800 flex items-center justify-center text-slate-400 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                    aria-label="Nexora GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={`mailto:${email}`}
                  className="w-8 h-8 rounded-lg bg-surface border border-slate-800 flex items-center justify-center text-slate-400 hover:text-nexora-400 hover:border-nexora-500/40 transition-colors"
                  aria-label="Email Nexora"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{copyright}</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">{initiativeText}</span>
            <a 
              href={collegeUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-1 text-nexora-400 hover:underline font-mono"
            >
              {collegeText} <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
