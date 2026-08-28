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
  const [home, setHome] = useState({ 
    hero_title: '', 
    hero_description: '', 
    cta_primary_text: '', 
    cta_primary_link: '', 
    cta_secondary_text: '', 
    cta_secondary_link: '',
    stat_1_label: '', stat_1_sub: '',
    stat_2_label: '', stat_2_sub: '',
    stat_3_label: '', stat_3_sub: '',
    stat_4_label: '', stat_4_sub: '',
  });
  const [homeStatus, setHomeStatus] = useState<SectionState>({ status: 'idle', errorMsg: '' });

  // ABOUT state
  const [about, setAbout] = useState({ heading: '', description: '' });
  const [aboutStatus, setAboutStatus] = useState<SectionState>({ status: 'idle', errorMsg: '' });

  // VISION state
  const [vision, setVision] = useState({ heading: '', content: '' });
  const [visionStatus, setVisionStatus] = useState<SectionState>({ status: 'idle', errorMsg: '' });

  // MISSION state
  const [mission, setMission] = useState({ 
    badge: '',
    heading: '', 
    content: '', 
    quote: '',
    card_1_title: '', card_1_desc: '',
    card_2_title: '', card_2_desc: '',
    card_3_title: '', card_3_desc: '',
    card_4_title: '', card_4_desc: '',
    card_5_title: '', card_5_desc: '',
    card_6_title: '', card_6_desc: '',
    card_7_title: '', card_7_desc: '',
    card_8_title: '', card_8_desc: '',
  });
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
        stat_1_label: getContent('home', 'stat_1_label'),
        stat_1_sub: getContent('home', 'stat_1_sub'),
        stat_2_label: getContent('home', 'stat_2_label'),
        stat_2_sub: getContent('home', 'stat_2_sub'),
        stat_3_label: getContent('home', 'stat_3_label'),
        stat_3_sub: getContent('home', 'stat_3_sub'),
        stat_4_label: getContent('home', 'stat_4_label'),
        stat_4_sub: getContent('home', 'stat_4_sub'),
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
        badge: getContent('mission', 'badge'),
        heading: getContent('mission', 'heading'),
        content: getContent('mission', 'content'),
        quote: getContent('mission', 'quote'),
        card_1_title: getContent('mission', 'card_1_title'), card_1_desc: getContent('mission', 'card_1_desc'),
        card_2_title: getContent('mission', 'card_2_title'), card_2_desc: getContent('mission', 'card_2_desc'),
        card_3_title: getContent('mission', 'card_3_title'), card_3_desc: getContent('mission', 'card_3_desc'),
        card_4_title: getContent('mission', 'card_4_title'), card_4_desc: getContent('mission', 'card_4_desc'),
        card_5_title: getContent('mission', 'card_5_title'), card_5_desc: getContent('mission', 'card_5_desc'),
        card_6_title: getContent('mission', 'card_6_title'), card_6_desc: getContent('mission', 'card_6_desc'),
        card_7_title: getContent('mission', 'card_7_title'), card_7_desc: getContent('mission', 'card_7_desc'),
        card_8_title: getContent('mission', 'card_8_title'), card_8_desc: getContent('mission', 'card_8_desc'),
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
    if (section === 'contact') {
      if (data.email) {
        items.push({ section: 'footer', key: 'email', value: data.email });
      }
      if (data.address) {
        items.push({ section: 'footer', key: 'campus_address', value: data.address });
      }
    }
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
              <p className="text-xs text-slate-400">Hero section content, buttons, and Quick Highlights metrics bar</p>
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

            {/* Quick Stats Bar Edits (Image 2) */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <h3 className="text-xs font-bold font-mono text-nexora-400 uppercase tracking-wider">
                Quick Highlights / Stats Bar (Image 2)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 rounded-xl bg-surface/60 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-300">Stat Card 1</span>
                  <input type="text" className={inputClass} value={home.stat_1_label}
                    onChange={e => setHome({ ...home, stat_1_label: e.target.value })} placeholder="500+ Students" />
                  <input type="text" className={inputClass} value={home.stat_1_sub}
                    onChange={e => setHome({ ...home, stat_1_sub: e.target.value })} placeholder="Engaged Community" />
                </div>
                <div className="p-3 rounded-xl bg-surface/60 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-300">Stat Card 2</span>
                  <input type="text" className={inputClass} value={home.stat_2_label}
                    onChange={e => setHome({ ...home, stat_2_label: e.target.value })} placeholder="24+ Events" />
                  <input type="text" className={inputClass} value={home.stat_2_sub}
                    onChange={e => setHome({ ...home, stat_2_sub: e.target.value })} placeholder="Summits & Hackathons" />
                </div>
                <div className="p-3 rounded-xl bg-surface/60 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-300">Stat Card 3</span>
                  <input type="text" className={inputClass} value={home.stat_3_label}
                    onChange={e => setHome({ ...home, stat_3_label: e.target.value })} placeholder="Active Cell" />
                  <input type="text" className={inputClass} value={home.stat_3_sub}
                    onChange={e => setHome({ ...home, stat_3_sub: e.target.value })} placeholder="Innovation Driven" />
                </div>
                <div className="p-3 rounded-xl bg-surface/60 border border-slate-800 space-y-2">
                  <span className="text-[11px] font-bold text-slate-300">Stat Card 4</span>
                  <input type="text" className={inputClass} value={home.stat_4_label}
                    onChange={e => setHome({ ...home, stat_4_label: e.target.value })} placeholder="8+ Startups" />
                  <input type="text" className={inputClass} value={home.stat_4_sub}
                    onChange={e => setHome({ ...home, stat_4_sub: e.target.value })} placeholder="Incubated Ideas" />
                </div>
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

        {/* ─── MISSION SECTION (Image 1) ─── */}
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white font-heading">Mission Section & Focus Cards (Image 1)</h2>
              <p className="text-xs text-slate-400">Mission badge, title, quote, and 8 focus area cards</p>
            </div>
            <StatusBadge sectionStatus={missionStatus} />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Mission Badge Text</label>
                <input type="text" className={inputClass} value={mission.badge}
                  onChange={e => setMission({ ...mission, badge: e.target.value })} placeholder="OUR MISSION" />
              </div>
              <div>
                <label className={labelClass}>Mission Main Title</label>
                <input type="text" className={inputClass} value={mission.heading}
                  onChange={e => setMission({ ...mission, heading: e.target.value })} placeholder="Transforming Ideas into Sustainable Ventures" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Mission Quote / Subheading</label>
              <textarea className={textareaClass} rows={3} value={mission.quote || mission.content}
                onChange={e => setMission({ ...mission, quote: e.target.value, content: e.target.value })} placeholder="To nurture entrepreneurial talent..." />
            </div>

            {/* 8 Mission Focus Cards */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <h3 className="text-xs font-bold font-mono text-nexora-400 uppercase tracking-wider">
                8 Mission Focus Cards (Image 1)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { num: 1, keyT: 'card_1_title', keyD: 'card_1_desc', defT: 'Workshops', defD: 'Deep-dive sessions on system design...' },
                  { num: 2, keyT: 'card_2_title', keyD: 'card_2_desc', defT: 'Hackathons', defD: '36-hour sprint challenges solving...' },
                  { num: 3, keyT: 'card_3_title', keyD: 'card_3_desc', defT: 'Startup Events', defD: 'Annual E-Summits, pitch competitions...' },
                  { num: 4, keyT: 'card_4_title', keyD: 'card_4_desc', defT: 'Mentorship', defD: 'Structured guidance from alumni founders...' },
                  { num: 5, keyT: 'card_5_title', keyD: 'card_5_desc', defT: 'Industry Collaboration', defD: 'Partnerships with tech companies...' },
                  { num: 6, keyT: 'card_6_title', keyD: 'card_6_desc', defT: 'Innovation', defD: 'Fostering original patents, novel architectures...' },
                  { num: 7, keyT: 'card_7_title', keyD: 'card_7_desc', defT: 'Leadership', defD: 'Cultivating managerial resilience...' },
                  { num: 8, keyT: 'card_8_title', keyD: 'card_8_desc', defT: 'Sustainable Ventures', defD: 'Transforming collegiate prototypes...' },
                ].map(card => (
                  <div key={card.num} className="p-3 rounded-xl bg-surface/60 border border-slate-800 space-y-2">
                    <span className="text-[11px] font-bold text-slate-300">Card {card.num}</span>
                    <input
                      type="text"
                      className={inputClass}
                      value={(mission as any)[card.keyT] || ''}
                      onChange={e => setMission({ ...mission, [card.keyT]: e.target.value })}
                      placeholder={card.defT}
                    />
                    <textarea
                      className={textareaClass}
                      rows={2}
                      value={(mission as any)[card.keyD] || ''}
                      onChange={e => setMission({ ...mission, [card.keyD]: e.target.value })}
                      placeholder={card.defD}
                    />
                  </div>
                ))}
              </div>
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
