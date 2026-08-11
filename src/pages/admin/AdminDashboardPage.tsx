import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  MessageSquare, 
  ArrowRight,
  CheckCircle2,
  Globe,
  Share2,
  FileText
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminHeader } from '../../components/admin/AdminHeader';

export const AdminDashboardPage: React.FC = () => {
  const { events, teamMembers, messages } = useData();

  const totalTeam = teamMembers.length;
  const activeTeam = teamMembers.filter(m => m.isActive !== false).length;
  const publishedEvents = events.filter(e => e.isPublished === true).length;
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const unreadMessages = messages.filter(m => m.status === 'unread').length;

  const statCards = [
    { title: 'Total Team Members', val: totalTeam, sub: `${activeTeam} active`, icon: Users, link: '/admin/team', color: 'text-blue-400' },
    { title: 'Total Events', val: events.length, sub: `${publishedEvents} published`, icon: Calendar, link: '/admin/events', color: 'text-cyan-400' },
    { title: 'Upcoming Events', val: upcomingEvents, sub: 'Scheduled ahead', icon: CheckCircle2, link: '/admin/events', color: 'text-emerald-400' },
    { title: 'Contact Messages', val: messages.length, sub: `${unreadMessages} unread`, icon: MessageSquare, link: '/admin/messages', color: 'text-purple-400' },
  ];

  const quickActions = [
    { label: 'Edit Website Content', path: '/admin/content', icon: FileText, color: 'bg-nexora-400 text-slate-950' },
    { label: '+ Add Event', path: '/admin/events', icon: Calendar, color: 'bg-cyan-500 text-slate-950' },
    { label: '+ Add Team Member', path: '/admin/team', icon: Users, color: 'bg-slate-800 text-white border border-slate-700' },
    { label: 'Edit Footer & Social', path: '/admin/footer', icon: Share2, color: 'bg-slate-800 text-white border border-slate-700' },
  ];

  return (
    <div className="flex-1 min-h-screen bg-background overflow-y-auto">
      <AdminHeader
        title="Dashboard"
        subtitle="Nexora E-Cell admin overview"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-6xl">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className="p-5 rounded-2xl bg-surface-elevated/80 border border-slate-800 hover:border-slate-700 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <p className="text-2xl font-black font-heading text-white">{card.val}</p>
                <h3 className="text-xs font-bold text-slate-300 truncate">{card.title}</h3>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">{card.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-6 rounded-2xl bg-surface/50 border border-slate-800">
          <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 text-nexora-400" />
            Quick Actions
          </h4>
          <div className="flex flex-wrap gap-3">
            {quickActions.map((action, idx) => (
              <Link
                key={idx}
                to={action.path}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all hover:opacity-90 hover:scale-[1.02] ${action.color}`}
              >
                <action.icon className="w-3.5 h-3.5" />
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold font-heading text-white">Recent Contact Messages</h3>
            </div>
            <Link to="/admin/messages" className="text-xs text-nexora-400 hover:underline">
              View All ({messages.length})
            </Link>
          </div>

          <div className="space-y-3">
            {messages.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No messages yet.</p>
            ) : (
              messages.slice(0, 5).map((msg) => (
                <div key={msg.id} className="p-3.5 rounded-xl bg-surface border border-slate-800 flex items-center justify-between gap-3">
                  <div className="truncate">
                    <h4 className="font-bold text-xs text-white truncate">{msg.subject}</h4>
                    <p className="text-[10px] text-slate-400">{msg.fullName} • {msg.type}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                    msg.status === 'unread'
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {msg.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="p-5 rounded-2xl bg-nexora-500/5 border border-nexora-500/20 flex items-start gap-3">
          <Globe className="w-5 h-5 text-nexora-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-nexora-300 mb-1">How content updates work</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Edit content in <strong className="text-slate-200">Website Content</strong>, <strong className="text-slate-200">Team Members</strong>, or <strong className="text-slate-200">Events</strong> sections. Changes are saved to Supabase and immediately reflected on the public website when visitors reload the page.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
