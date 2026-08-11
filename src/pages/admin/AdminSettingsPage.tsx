import React from 'react';
import { Database, ShieldCheck, Key, Server, CheckCircle2, AlertCircle, FileCode } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { AdminHeader } from '../../components/admin/AdminHeader';

export const AdminSettingsPage: React.FC = () => {
  return (
    <div className="flex-1 min-h-screen bg-background overflow-y-auto">
      <AdminHeader
        title="Settings & Supabase Integration"
        subtitle="System diagnostics, PostgreSQL schema, and database connection status"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-5xl">
        
        {/* Status Card */}
        <div className="p-8 rounded-3xl bg-surface-elevated/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              isSupabaseConfigured ? 'bg-emerald-500/15 text-emerald-400' : 'bg-cyan-500/15 text-cyan-400'
            }`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-white">
                {isSupabaseConfigured ? 'Supabase Connected & Active' : 'Offline Local Storage Sync Active'}
              </h3>
              <p className="text-xs text-slate-400">
                {isSupabaseConfigured
                  ? 'Queries and mutations are syncing live with your Supabase PostgreSQL cloud instance.'
                  : 'Operating in self-contained mode with persistent browser LocalStorage. Full CRUD is completely functional!'}
              </p>
            </div>
          </div>
        </div>

        {/* Supabase 1-Click Setup Guide */}
        <div className="p-8 rounded-3xl bg-surface-elevated/80 border border-slate-800 space-y-6">
          <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-nexora-400" />
            <span>How to Connect Your Live Supabase Backend</span>
          </h3>

          <ol className="space-y-4 text-xs sm:text-sm text-slate-300 list-decimal pl-5">
            <li>
              <strong>Create a Supabase Project:</strong> Sign up at <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-nexora-400 hover:underline">supabase.com</a> and create a new project.
            </li>
            <li>
              <strong>Run SQL Schema:</strong> Open the <em>SQL Editor</em> in your Supabase dashboard, copy the contents of <code className="px-2 py-0.5 rounded bg-surface border border-slate-700 text-cyan-300 font-mono">supabase_schema.sql</code>, and click <em>Run</em>.
            </li>
            <li>
              <strong>Add Environment Variables:</strong> In your project root, create or edit <code className="px-2 py-0.5 rounded bg-surface border border-slate-700 text-cyan-300 font-mono">.env</code>:
              <pre className="mt-2 p-4 rounded-xl bg-surface border border-slate-700 text-xs font-mono text-slate-200 overflow-x-auto">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key`}
              </pre>
            </li>
            <li>
              <strong>Restart Dev Server:</strong> The application automatically detects the keys and transitions to live PostgreSQL synchronization without changing any UI code!
            </li>
          </ol>
        </div>

        {/* Security & RLS Note */}
        <div className="p-6 rounded-2xl bg-surface/60 border border-slate-800 flex items-start gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 space-y-1">
            <h4 className="font-bold text-white text-sm">Security & Row Level Security (RLS)</h4>
            <p className="text-slate-400 leading-relaxed">
              All tables in <code className="text-cyan-300">supabase_schema.sql</code> have RLS enabled. Public users can submit join forms and registrations, while sensitive management updates require authenticated admin credentials.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
