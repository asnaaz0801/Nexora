import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Save, RefreshCw, Globe, Mail, ExternalLink } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useSiteContent, updateSiteContentBatch } from '../../hooks/useSiteContent';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-surface border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors";
const labelClass = "block text-xs font-semibold text-slate-300 mb-1.5";

export const AdminFooterPage: React.FC = () => {
  const { content, isLoading, getContent, refetch } = useSiteContent();

  const [formData, setFormData] = useState({
    description: '',
    badge_text: '',
    slogan: '',
    campus_address: '',
    college_initiative_text: '',
    instagram_url: '',
    linkedin_url: '',
    github_url: '',
    email: '',
    phone: '',
    address: '',
    college_url: '',
    college_text: '',
    copyright_text: '',
  });

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setFormData({
        description: getContent('footer', 'description'),
        badge_text: getContent('footer', 'badge_text') || 'An official initiative of ACET Nagpur',
        slogan: getContent('footer', 'slogan') || 'DREAM. BUILD. LEAD.',
        campus_address: getContent('footer', 'campus_address') || 'Nexora E-Cell, Innovation Block, Anjuman College of Engineering & Technology, Mangalwari Bazaar Road, Sadar, Nagpur, Maharashtra 440001',
        college_initiative_text: getContent('footer', 'college_initiative_text') || 'An initiative of Anjuman College of Engineering and Technology',
        instagram_url: getContent('footer', 'instagram_url'),
        linkedin_url: getContent('footer', 'linkedin_url'),
        github_url: getContent('footer', 'github_url'),
        email: getContent('footer', 'email'),
        phone: getContent('footer', 'phone') || '',
        address: getContent('footer', 'address') || '',
        college_url: getContent('footer', 'college_url') || 'https://anjumanengg.edu.in/',
        college_text: getContent('footer', 'college_text') || 'anjumanengg.edu.in',
        copyright_text: getContent('footer', 'copyright_text'),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, content]);

  const handleSave = async () => {
    setSaveStatus('saving');
    setErrorMsg('');

    const items = Object.entries(formData).map(([key, value]) => ({
      section: 'footer',
      key,
      value,
    }));
    if (formData.email) {
      items.push({ section: 'contact', key: 'email', value: formData.email });
    }
    if (formData.campus_address) {
      items.push({ section: 'contact', key: 'address', value: formData.campus_address });
    }

    const result = await updateSiteContentBatch(items);

    if (result.success) {
      setSaveStatus('success');
      refetch();
      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
      setErrorMsg(result.error || 'Failed to save footer settings.');
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-nexora-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading footer settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-background overflow-y-auto">
      <AdminHeader
        title="Footer & Social Links"
        subtitle="Manage footer content, college links, and social media links shown on the website"
      />

      <div className="p-6 sm:p-8 max-w-3xl">
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800 space-y-6">
          
          {/* Status Messages */}
          {saveStatus === 'success' && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Footer settings saved successfully. Live site has been updated!</span>
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* College Official Website Link */}
          <div className="p-4 rounded-xl bg-nexora-500/10 border border-nexora-500/30">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-nexora-400" />
              College Official Website Link (Footer & Header)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>College Website Link URL</label>
                <input
                  type="url"
                  className={inputClass}
                  value={formData.college_url}
                  onChange={e => setFormData({ ...formData, college_url: e.target.value })}
                  placeholder="https://anjumanengg.edu.in/"
                />
              </div>
              <div>
                <label className={labelClass}>Display Link Text</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.college_text}
                  onChange={e => setFormData({ ...formData, college_text: e.target.value })}
                  placeholder="anjumanengg.edu.in"
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              This replaces the college website link at the bottom right of the website footer.
            </p>
          </div>

          {/* Brand Badges & Slogan (Image 3) */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
              <Globe className="w-4 h-4 text-nexora-400" />
              Footer Badges & Campus Location (Image 3)
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Official Initiative Badge Text</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.badge_text}
                    onChange={e => setFormData({ ...formData, badge_text: e.target.value })}
                    placeholder="An official initiative of ACET Nagpur"
                  />
                </div>
                <div>
                  <label className={labelClass}>Slogan Badge Text</label>
                  <input
                    type="text"
                    className={inputClass}
                    value={formData.slogan}
                    onChange={e => setFormData({ ...formData, slogan: e.target.value })}
                    placeholder="DREAM. BUILD. LEAD."
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Campus Location Address</label>
                <textarea
                  className={inputClass + ' resize-none'}
                  rows={3}
                  value={formData.campus_address}
                  onChange={e => setFormData({ ...formData, campus_address: e.target.value })}
                  placeholder="Nexora E-Cell, Innovation Block, Anjuman College of Engineering & Technology..."
                />
              </div>

              <div>
                <label className={labelClass}>Bottom Initiative Text</label>
                <input
                  type="text"
                  className={inputClass}
                  value={formData.college_initiative_text}
                  onChange={e => setFormData({ ...formData, college_initiative_text: e.target.value })}
                  placeholder="An initiative of Anjuman College of Engineering and Technology"
                />
              </div>
            </div>
          </div>

          {/* Footer Description */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
              <Globe className="w-4 h-4 text-nexora-400" />
              Brand Description
            </h3>
            <div>
              <label className={labelClass}>Footer Description</label>
              <textarea
                className={inputClass + ' resize-none'}
                rows={3}
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Where Ideas Become Impact..."
              />
              <p className="text-[11px] text-slate-500 mt-1">This text appears below the Nexora logo in the footer.</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
              <Globe className="w-4 h-4 text-nexora-400" />
              Social Media Links
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass + ' flex items-center gap-1.5'}>
                  🔗 LinkedIn URL
                </label>
                <input type="url" className={inputClass} value={formData.linkedin_url}
                  onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/company/nexora-ecell" />
              </div>
              <div>
                <label className={labelClass + ' flex items-center gap-1.5'}>
                  📷 Instagram URL
                </label>
                <input type="url" className={inputClass} value={formData.instagram_url}
                  onChange={e => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/nexora_ecell" />
              </div>
              <div>
                <label className={labelClass + ' flex items-center gap-1.5'}>
                  🐙 GitHub URL
                </label>
                <input type="url" className={inputClass} value={formData.github_url}
                  onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                  placeholder="https://github.com/nexora-ecell" />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
              <Mail className="w-4 h-4 text-nexora-400" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" className={inputClass} value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="ecell@acet.ac.in" />
              </div>
              <div>
                <label className={labelClass}>Phone (optional)</label>
                <input type="text" className={inputClass} value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 XXXXXXXXXX" />
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 pb-2 border-b border-slate-800">
              <Globe className="w-4 h-4 text-nexora-400" />
              Copyright
            </h3>
            <div>
              <label className={labelClass}>Copyright Text</label>
              <input type="text" className={inputClass} value={formData.copyright_text}
                onChange={e => setFormData({ ...formData, copyright_text: e.target.value })}
                placeholder="© 2026 Nexora E-Cell. All Rights Reserved." />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-nexora-400 hover:bg-nexora-300 disabled:opacity-50 transition-colors shadow-glow-sm cursor-pointer"
            >
              {saveStatus === 'saving' ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Saving...</>
              ) : (
                <><Save className="w-4 h-4" /> Save Footer Settings</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
