import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { handleImageError } from '../../lib/imageUtils';
import nexoraLogo from '../../assets/nexora-logo.png';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Vision & Mission', path: '/vision-mission' },
    { name: 'Events', path: '/events' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-xl border-b border-nexora-500/15 shadow-lg shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Official Nexora Brand Logo */}
        <Link 
          to="/" 
          className="group flex items-center gap-3.5 focus:outline-none"
          aria-label="Nexora E-Cell Home"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-black/60 border border-nexora-500/30 p-0.5 group-hover:border-nexora-400 group-hover:shadow-glow-sm transition-all duration-300">
            <img
              src={nexoraLogo}
              alt="Nexora E-Cell Logo"
              onError={(e) => handleImageError(e, nexoraLogo)}
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-nexora-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg sm:text-xl font-black tracking-wider text-white">
                NEX<span className="text-nexora-400">O</span>RA
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-widest uppercase bg-nexora-500/20 text-nexora-300 border border-nexora-500/30 rounded">
                E-CELL
              </span>
            </div>
            <span className="text-[10px] tracking-tight text-slate-400 font-medium">
              ACET Nagpur
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg flex items-center gap-1.5 ${
                  active
                    ? 'text-nexora-400 bg-nexora-500/10 border border-nexora-500/25'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {link.name}
                {active && (
                  <span className="absolute -bottom-[1px] inset-x-2 h-[2px] bg-gradient-to-r from-nexora-400 to-sky-400 shadow-glow-sm rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Admin Portal (only when authenticated) */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-surface border border-slate-800 hover:border-nexora-500/40 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-elevated/95 backdrop-blur-2xl border-b border-nexora-500/20 px-5 pt-3 pb-6 space-y-2.5 shadow-2xl transition-all duration-300">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2.5 text-sm font-medium rounded-xl flex items-center justify-between transition-colors ${
                    active
                      ? 'bg-nexora-500/15 text-nexora-300 border border-nexora-500/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {isAuthenticated && (
            <div className="pt-4 border-t border-slate-800">
              <Link
                to="/admin"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs text-amber-300 bg-amber-500/10 border border-amber-500/30"
              >
                <Shield className="w-3.5 h-3.5" />
                Go to Admin Dashboard
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
