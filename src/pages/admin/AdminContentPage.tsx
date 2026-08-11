import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Save, RefreshCw } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useSiteContent, updateSiteContentBatch } from '../../hooks/useSiteContent';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

interface SectionState {
  status: SaveStatus;
  errorMsg: string;
}

const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-surface border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors";
const labelClass = "block text-xs font-semibold text-slate-300 mb-1.5";
const textareaClass = `${inputClass} resize-none`;

export const AdminContentPage: React.FC = () => {
  const { content, isLoading, getContent, refetch } = useSiteContent();

  // HOME state
  const [home, setHome] = useState({ hero_title: '', hero_description: '', cta_primary_text: '', cta_primary_link: '', cta_secondary_text: '', cta_secondary_link: '' });
  const [homeStatus, setHomeStatus] = useState<SectionState>({ status: 'idle', errorMsg: '' });

  // ABOUT state
  const [about, setAbout] = useState({ heading: '', description: '' });
  const [aboutStatus, setAboutStatus] = useState<SectionState>({ status: 'idle', errorMsg: '' });

  // VISION state
  const [vision, setVision] = useState({ heading: '', content: '' });
  const [visionStatus, setVisionStatus] = useState<SectionState>({ status: 'idle', errorMsg: '' });

  // MISSION state
  const [mission, setMission] = useState({ heading: '', content: '' });
  const [missionStatus, setMissionStatus] = useState<SectionState>({ status: 'idle', errorMsg: '' });

  // CONTACT state
  const [contact, setContact] = useState({ heading: '', description: '', email: '', phone: '', address: '', map_url: '' });
  const [contactStatus, setContactStatus] = useState<SectionState>({ status: 'idle', errorMsg: '' });

  // Load content into local state when hook loads
  useEffect(() => {
    if (!isLoading) {
      setHome({
        hero_title: getContent('home', 'hero_title'),
        hero_description: getContent('home', 'hero_description'),
        cta_primary_text: getContent('home', 'cta_primary_text'),
        cta_primary_link: getContent('home', 'cta_primary_link'),
        cta_secondary_text: getContent('home', 'cta_secondary_text'),
        cta_secondary_link: getContent('home', 'cta_secondary_link'),
      });
      setAbout({
        heading: getContent('about', 'heading'),
        description: getContent('about', 'description'),
      });
      setVision({
        heading: getContent('vision', 'heading'),
        content: getContent('vision', 'content'),
      });
      setMission({
        heading: getContent('mission', 'heading'),
        content: getContent('mission', 'content'),
      });
      setContact({
        heading: getContent('contact', 'heading'),
        description: getContent('contact', 'description'),
        email: getContent('contact', 'email'),
        phone: getContent('contact', 'phone'),
        address: getContent('contact', 'address'),
        map_url: getContent('contact', 'map_url'),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, content]);

  const save = async (
    section: string,
    data: Record<string, string>,
    setStatus: React.Dispatch<React.SetStateAction<SectionState>>
  ) => {
    setStatus({ status: 'saving', errorMsg: '' });
    const items = Object.entries(data).map(([key, value]) => ({ section, key, value }));
    const result = await updateSiteContentBatch(items);
    if (result.success) {
      setStatus({ status: 'success', errorMsg: '' });
      refetch();
      setTimeout(() => setStatus({ status: 'idle', errorMsg: '' }), 3000);
    } else {
      setStatus({ status: 'error', errorMsg: result.error || 'Failed to save.' });
      setTimeout(() => setStatus({ status: 'idle', errorMsg: '' }), 5000);
    }
  };

  const StatusBadge: React.FC<{ sectionStatus: SectionState }> = ({ sectionStatus }) => {
    if (sectionStatus.status === 'saving') return (
      <span className="flex items-center gap-1.5 text-xs text-slate-400">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
      </span>
    );
    if (sectionStatus.status === 'success') return (
      <span className="flex items-center gap-1.5 text-xs text-emerald-400">
        <CheckCircle2 className="w-3.5 h-3.5" /> Changes saved successfully.
      </span>
    );
    if (sectionStatus.status === 'error') return (
      <span className="flex items-center gap-1.5 text-xs text-rose-400">
        <AlertCircle className="w-3.5 h-3.5" /> {sectionStatus.errorMsg}
      </span>
    );
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex-1 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-nexora-400 animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-400">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-screen bg-background overflow-y-auto">
      <AdminHeader
        title="Website Content"
        subtitle="Edit public website content. Changes are saved to the database and immediately reflect on the live site."
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-4xl">

        {/* ─── HOME SECTION ─── */}
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white font-heading">Home Page</h2>
              <p className="text-xs text-slate-400">Hero section content and CTA buttons</p>
            </div>
            <StatusBadge sectionStatus={homeStatus} />
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Hero Title</label>
              <input type="text" className={inputClass} value={home.hero_title}
                onChange={e => setHome({ ...home, hero_title: e.target.value })} placeholder="Where Ideas Become Impact." />
            </div>
            <div>
              <label className={labelClass}>Hero Description</label>
              <textarea className={textareaClass} rows={3} value={home.hero_description}
                onChange={e => setHome({ ...home, hero_description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Primary Button Text</label>
                <input type="text" className={inputClass} value={home.cta_primary_text}
                  onChange={e => setHome({ ...home, cta_primary_text: e.target.value })} placeholder="Explore Events" />
              </div>
              <div>
                <label className={labelClass}>Primary Button Link</label>
                <input type="text" className={inputClass} value={home.cta_primary_link}
                  onChange={e => setHome({ ...home, cta_primary_link: e.target.value })} placeholder="/events" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Secondary Button Text</label>
                <input type="text" className={inputClass} value={home.cta_secondary_text}
                  onChange={e => setHome({ ...home, cta_secondary_text: e.target.value })} placeholder="Meet Our Team" />
              </div>
              <div>
                <label className={labelClass}>Secondary Button Link</label>
                <input type="text" className={inputClass} value={home.cta_secondary_link}
                  onChange={e => setHome({ ...home, cta_secondary_link: e.target.value })} placeholder="/team" />
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => save('home', home, setHomeStatus)}
              disabled={homeStatus.status === 'saving'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-nexora-400 hover:bg-nexora-300 disabled:opacity-50 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              {homeStatus.status === 'saving' ? 'Saving...' : 'Save Home Content'}
            </button>
          </div>
        </div>

        {/* ─── ABOUT SECTION ─── */}
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white font-heading">About</h2>
              <p className="text-xs text-slate-400">About Nexora E-Cell section heading and description</p>
            </div>
            <StatusBadge sectionStatus={aboutStatus} />
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" className={inputClass} value={about.heading}
                onChange={e => setAbout({ ...about, heading: e.target.value })} placeholder="Fostering Innovation & Leadership at ACET" />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea className={textareaClass} rows={4} value={about.description}
                onChange={e => setAbout({ ...about, description: e.target.value })} />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => save('about', about, setAboutStatus)}
              disabled={aboutStatus.status === 'saving'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-nexora-400 hover:bg-nexora-300 disabled:opacity-50 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              {aboutStatus.status === 'saving' ? 'Saving...' : 'Save About Content'}
            </button>
          </div>
        </div>

        {/* ─── VISION SECTION ─── */}
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white font-heading">Vision</h2>
              <p className="text-xs text-slate-400">Vision section heading and statement</p>
            </div>
            <StatusBadge sectionStatus={visionStatus} />
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" className={inputClass} value={vision.heading}
                onChange={e => setVision({ ...vision, heading: e.target.value })} placeholder="Our Vision" />
            </div>
            <div>
              <label className={labelClass}>Vision Statement</label>
              <textarea className={textareaClass} rows={5} value={vision.content}
                onChange={e => setVision({ ...vision, content: e.target.value })} />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => save('vision', vision, setVisionStatus)}
              disabled={visionStatus.status === 'saving'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-nexora-400 hover:bg-nexora-300 disabled:opacity-50 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              {visionStatus.status === 'saving' ? 'Saving...' : 'Save Vision Content'}
            </button>
          </div>
        </div>

        {/* ─── MISSION SECTION ─── */}
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white font-heading">Mission</h2>
              <p className="text-xs text-slate-400">Mission section heading and statement</p>
            </div>
            <StatusBadge sectionStatus={missionStatus} />
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Heading</label>
              <input type="text" className={inputClass} value={mission.heading}
                onChange={e => setMission({ ...mission, heading: e.target.value })} placeholder="Our Mission" />
            </div>
            <div>
              <label className={labelClass}>Mission Statement</label>
              <textarea className={textareaClass} rows={5} value={mission.content}
                onChange={e => setMission({ ...mission, content: e.target.value })} />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => save('mission', mission, setMissionStatus)}
              disabled={missionStatus.status === 'saving'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-nexora-400 hover:bg-nexora-300 disabled:opacity-50 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              {missionStatus.status === 'saving' ? 'Saving...' : 'Save Mission Content'}
            </button>
          </div>
        </div>

        {/* ─── CONTACT SECTION ─── */}
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white font-heading">Contact Page</h2>
              <p className="text-xs text-slate-400">Contact info displayed on the public contact page</p>
            </div>
            <StatusBadge sectionStatus={contactStatus} />
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Page Heading</label>
              <input type="text" className={inputClass} value={contact.heading}
                onChange={e => setContact({ ...contact, heading: e.target.value })} placeholder="Get In Touch" />
            </div>
            <div>
              <label className={labelClass}>Page Description</label>
              <textarea className={textareaClass} rows={3} value={contact.description}
                onChange={e => setContact({ ...contact, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" className={inputClass} value={contact.email}
                  onChange={e => setContact({ ...contact, email: e.target.value })} placeholder="ecell@acet.ac.in" />
              </div>
              <div>
                <label className={labelClass}>Phone (optional)</label>
                <input type="text" className={inputClass} value={contact.phone}
                  onChange={e => setContact({ ...contact, phone: e.target.value })} placeholder="+91 XXXXXXXXXX" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <textarea className={textareaClass} rows={2} value={contact.address}
                onChange={e => setContact({ ...contact, address: e.target.value })} />
            </div>
            <div>
              <label className={labelClass}>Map URL (optional)</label>
              <input type="url" className={inputClass} value={contact.map_url}
                onChange={e => setContact({ ...contact, map_url: e.target.value })} placeholder="https://maps.google.com/..." />
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={() => save('contact', contact, setContactStatus)}
              disabled={contactStatus.status === 'saving'}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-nexora-400 hover:bg-nexora-300 disabled:opacity-50 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              {contactStatus.status === 'saving' ? 'Saving...' : 'Save Contact Content'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
