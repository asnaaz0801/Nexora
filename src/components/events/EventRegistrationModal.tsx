import React, { useState } from 'react';
import { X, CheckCircle2, User, Mail, Phone, Building } from 'lucide-react';
import { Event } from '../../types';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ isOpen, onClose, event }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    collegeYear: '',
    branch: '',
    teamName: '',
    teamMembers: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('event_registrations').insert({
          event_id: event.id,
          event_title: event.title,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          college_year: formData.collegeYear,
          branch: formData.branch,
          team_name: formData.teamName,
          team_members: formData.teamMembers,
        });
      } catch (err) {
        console.error('Registration error:', err);
      }
    }

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setFormData({ fullName: '', email: '', phone: '', collegeYear: '', branch: '', teamName: '', teamMembers: '' });
    }, 2500);
  };

  const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-surface border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="w-full max-w-lg bg-surface-elevated border border-slate-700 rounded-3xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-black font-heading text-white">Register for Event</h2>
            <p className="text-xs text-nexora-400 font-mono">{event.title}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-black text-white mb-2">Registration Successful!</h3>
              <p className="text-sm text-slate-400">
                You've been registered for <strong className="text-white">{event.title}</strong>. We'll reach out via email with details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name *</label>
                  <input type="text" className={inputClass} value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email *</label>
                  <input type="email" className={inputClass} value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Phone</label>
                  <input type="tel" className={inputClass} value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Year</label>
                  <input type="text" className={inputClass} value={formData.collegeYear}
                    onChange={e => setFormData({ ...formData, collegeYear: e.target.value })} placeholder="e.g. 3rd Year" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Branch</label>
                <input type="text" className={inputClass} value={formData.branch}
                  onChange={e => setFormData({ ...formData, branch: e.target.value })} placeholder="e.g. CSE" />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button type="button" onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white">
                  Cancel
                </button>
                <button type="submit" disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-nexora-400 text-slate-950 hover:bg-nexora-300 disabled:opacity-50 transition-colors">
                  {isSubmitting ? 'Registering...' : 'Register Now'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
