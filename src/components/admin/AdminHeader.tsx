import React from 'react';
import { Database } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, actionButton }) => {
  const { isLiveSync } = useData();

  return (
    <header className="p-6 bg-surface-elevated/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black font-heading text-white">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">
        {/* Sync Status Badge */}
        <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-mono font-medium ${
          isLiveSync
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}>
          <Database className="w-3.5 h-3.5" />
          <span>{isLiveSync ? 'Supabase Connected' : 'No DB — Set up .env vars'}</span>
        </div>

        {actionButton}
      </div>
    </header>
  );
};
