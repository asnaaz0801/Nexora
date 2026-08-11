import React, { useState } from 'react';
import { MessageSquare, CheckCircle, Mail, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AdminHeader } from '../../components/admin/AdminHeader';

export const AdminMessagesPage: React.FC = () => {
  const { messages, updateMessageStatus } = useData();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread' | 'read' | 'replied'>('all');

  const filteredMessages = messages.filter(m => selectedFilter === 'all' || m.status === selectedFilter);

  return (
    <div className="flex-1 min-h-screen bg-background overflow-y-auto">
      <AdminHeader
        title="Contact & Partnership Inquiries"
        subtitle={`Review inquiries submitted via contact page (${messages.length} total)`}
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2">
          {['all', 'unread', 'read', 'replied'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedFilter(st as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedFilter === st
                  ? 'bg-nexora-500 text-slate-950 shadow-glow-sm'
                  : 'bg-surface text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Message Cards List */}
        <div className="space-y-4">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-nexora-400" />
                    <h3 className="text-base font-bold text-white">{msg.subject}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-cyan-300">
                      {msg.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateMessageStatus(msg.id, 'read')}
                      className="px-2.5 py-1 rounded-lg text-xs bg-surface border border-slate-700 text-slate-300 hover:text-white"
                    >
                      Mark Read
                    </button>
                    <button
                      onClick={() => updateMessageStatus(msg.id, 'replied')}
                      className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30"
                    >
                      Mark Replied
                    </button>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>From: <strong>{msg.fullName}</strong> ({msg.email})</span>
                  </div>
                  <span className="font-mono text-slate-500">{new Date(msg.receivedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-500 text-center py-12">No messages match filter.</p>
          )}
        </div>

      </div>
    </div>
  );
};
