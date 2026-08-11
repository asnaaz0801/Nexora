import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  Settings, 
  LogOut,
  ExternalLink,
  Shield,
  FileText,
  Share2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import nexoraLogo from '../../assets/nexora-logo.png';

export const AdminSidebar: React.FC = () => {
  const { logout, adminUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Website Content', path: '/admin/content', icon: FileText },
    { name: 'Team Members', path: '/admin/team', icon: Users },
    { name: 'Events', path: '/admin/events', icon: Calendar },
    { name: 'Footer & Social', path: '/admin/footer', icon: Share2 },
    { name: 'Contact Inquiries', path: '/admin/messages', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface-elevated/95 border-r border-slate-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 z-30">
      <div>
        {/* Admin Header / Logo */}
        <div className="p-5 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-black border border-nexora-500/30 p-1">
              <img src={nexoraLogo} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-heading font-black text-sm text-white tracking-wider">
                NEX<span className="text-nexora-400">O</span>RA
              </span>
              <p className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                ADMIN PORTAL
              </p>
            </div>
          </div>
          {adminUser && (
            <div className="px-3 py-2 rounded-lg bg-surface border border-slate-800 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-nexora-400 shrink-0" />
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-white truncate">{adminUser.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{adminUser.email}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-nexora-500 text-slate-950 shadow-glow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg bg-surface text-xs text-slate-300 hover:text-white border border-slate-800 transition-colors"
        >
          <span className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-nexora-400" />
            View Live Site
          </span>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </a>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
