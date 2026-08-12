import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, AlertCircle, CheckCircle2, Upload, X, RefreshCw } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Event, EventCategory, EventStatus } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { uploadOrCompressPhoto, handleImageError, DEFAULT_BANNER_SVG } from '../../lib/imageUtils';

const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-surface border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors";
const labelClass = "block text-xs font-semibold text-slate-300 mb-1.5";

const emptyForm = {
  title: '',
  slug: '',
  tagline: '',
  description: '',
  category: 'Workshop' as EventCategory,
  status: 'upcoming' as EventStatus,
  bannerImage: '',
  date: '',
  displayDate: '',
  time: '',
  venue: '',
  registrationDeadline: '',
  registrationOpen: true,
  registrationLink: '',
  maxParticipants: 200,
  isFeatured: false,
  isPublished: false,
};

export const AdminEventsPage: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please select a JPG, PNG, or WebP image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be less than 10MB.');
      return;
    }

    setUploadingImage(true);

    try {
      const bannerResult = await uploadOrCompressPhoto(file, 'event-images');
      setFormData(prev => ({ ...prev, bannerImage: bannerResult }));
    } catch (err) {
      console.error('Failed to process event banner:', err);
      alert('Could not process selected image file.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingEventId(null);
    setFormData({ ...emptyForm });
    setSaveStatus('idle');
    setModalOpen(true);
  };

  const handleOpenEdit = (evt: Event) => {
    setEditingEventId(evt.id);
    setFormData({
      title: evt.title,
      slug: evt.slug || '',
      tagline: evt.tagline || '',
      description: evt.description,
      category: evt.category,
      status: evt.status,
      bannerImage: evt.bannerImage || '',
      date: evt.date,
      displayDate: evt.displayDate || '',
      time: evt.time,
      venue: evt.venue,
      registrationDeadline: evt.registrationDeadline || '',
      registrationOpen: evt.registrationOpen ?? true,
      registrationLink: evt.registrationLink || '',
      maxParticipants: evt.maxParticipants || 200,
      isFeatured: evt.isFeatured || false,
      isPublished: evt.isPublished || false,
    });
    setSaveStatus('idle');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');

    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const displayDate = formData.displayDate || formData.date;
    const registrationDeadline = formData.registrationDeadline || formData.date;

    try {
      if (editingEventId) {
        await updateEvent(editingEventId, { ...formData, slug, displayDate, registrationDeadline, registeredCount: 0 });
      } else {
        await addEvent({ ...formData, slug, displayDate, registrationDeadline, registeredCount: 0 });
      }
      setSaveStatus('success');
      setTimeout(() => {
        setModalOpen(false);
        setSaveStatus('idle');
      }, 1000);
    } catch {
      setSaveStatus('error');
    }
  };

  const handleTogglePublish = async (evt: Event) => {
    await updateEvent(evt.id, { isPublished: !evt.isPublished });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteEvent(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  const eventToDelete = events.find(e => e.id === deleteConfirmId);

  return (
    <div className="flex-1 min-h-screen bg-background overflow-y-auto">
      <AdminHeader
        title="Events Manager"
        subtitle={`Manage campus events (${events.length} total, ${events.filter(e => e.isPublished).length} published)`}
        actionButton={
          <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Create Event
          </Button>
        }
      />

      <div className="p-6 sm:p-8 max-w-7xl">
        {events.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-surface-elevated/80 border border-slate-800 border-dashed">
            <p className="text-slate-400 mb-4">No events yet. Create your first event!</p>
            <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
              Create Event
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl bg-surface-elevated/80 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-surface/90 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Event</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date & Venue</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Published</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {events.map((evt) => (
                    <tr key={evt.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img
                            src={evt.bannerImage || DEFAULT_BANNER_SVG}
                            alt={evt.title}
                            onError={(e) => handleImageError(e)}
                            className="w-12 h-9 rounded-lg object-cover bg-slate-900 shrink-0 border border-slate-700/80"
                          />
                          <div className="truncate">
                            <p className="font-bold text-sm text-white truncate">{evt.title}</p>
                            {evt.tagline && <p className="text-[10px] text-slate-400 truncate">{evt.tagline}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold text-[11px]">
                          {evt.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-white font-medium">{evt.displayDate || evt.date}</p>
                        <p className="text-[10px] text-slate-400">{evt.venue}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded uppercase font-bold text-[10px] ${
                          evt.status === 'live' ? 'bg-amber-500/20 text-amber-300'
                          : evt.status === 'upcoming' ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-slate-800 text-slate-400'
                        }`}>
                          {evt.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleTogglePublish(evt)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                            evt.isPublished
                              ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                          }`}
                          title={evt.isPublished ? 'Click to unpublish' : 'Click to publish'}
                        >
                          {evt.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {evt.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </td>
                      <td className="p-4 text-right space-x-1.5">
                        <button onClick={() => handleOpenEdit(evt)}
                          className="p-1.5 rounded-lg bg-surface border border-slate-700 text-slate-300 hover:text-nexora-400 transition-colors"
                          title="Edit">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteConfirmId(evt.id)}
                          className="p-1.5 rounded-lg bg-surface border border-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
                          title="Delete">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Event Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editingEventId ? 'Edit Event' : 'Create New Event'} maxWidth="2xl">
        <form onSubmit={handleSubmit} className="space-y-4 py-2">

          {saveStatus === 'success' && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Event saved successfully!
            </div>
          )}

          <div>
            <label className={labelClass}>Event Title *</label>
            <input type="text" className={inputClass} value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })} required />
          </div>

          <div>
            <label className={labelClass}>Tagline (short subtitle)</label>
            <input type="text" className={inputClass} value={formData.tagline}
              onChange={e => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="e.g. 36-hour innovation sprint" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Category</label>
              <select className={inputClass} value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value as EventCategory })}>
                <option value="Workshop">Workshop</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Startup Event">Startup Event</option>
                <option value="Competition">Competition</option>
                <option value="Seminar">Seminar</option>
                <option value="Networking">Networking</option>
                <option value="Bootcamp">Bootcamp</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as EventStatus })}>
                <option value="upcoming">Upcoming</option>
                <option value="live">Live Now</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date *</label>
              <input type="date" className={inputClass} value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })} required />
            </div>
            <div>
              <label className={labelClass}>Display Date</label>
              <input type="text" className={inputClass} value={formData.displayDate}
                onChange={e => setFormData({ ...formData, displayDate: e.target.value })}
                placeholder="e.g. Sept 15, 2026" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Time</label>
              <input type="text" className={inputClass} value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g. 10:00 AM - 5:00 PM IST" />
            </div>
            <div>
              <label className={labelClass}>Venue</label>
              <input type="text" className={inputClass} value={formData.venue}
                onChange={e => setFormData({ ...formData, venue: e.target.value })}
                placeholder="e.g. Main Auditorium, ACET" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Banner Image (Upload or URL)</label>
            {formData.bannerImage ? (
              <div className="relative inline-block mb-3">
                <img
                  src={formData.bannerImage || DEFAULT_BANNER_SVG}
                  alt="Banner Preview"
                  onError={(e) => handleImageError(e)}
                  className="w-32 h-20 rounded-xl object-cover bg-slate-900 border border-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, bannerImage: '' })}
                  className="absolute -top-2 -right-2 p-1 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-colors shadow-md"
                  title="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : null}
            <div className="flex gap-2 items-center">
              <input
                type="text"
                className={inputClass}
                value={formData.bannerImage}
                onChange={e => setFormData({ ...formData, bannerImage: e.target.value })}
                placeholder="Paste image URL or upload file..."
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                leftIcon={uploadingImage ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                className="whitespace-nowrap"
              >
                {uploadingImage ? 'Uploading...' : 'Upload File'}
              </Button>
            </div>
          </div>

          <div>
            <label className={labelClass}>Registration Link</label>
            <input type="url" className={inputClass} value={formData.registrationLink}
              onChange={e => setFormData({ ...formData, registrationLink: e.target.value })}
              placeholder="https://forms.google.com/..." />
          </div>

          <div>
            <label className={labelClass}>Description *</label>
            <textarea className={inputClass + ' resize-none'} rows={4} value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })} required />
          </div>

          {/* Publish toggle */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-slate-800">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.isPublished ? 'bg-nexora-500' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isPublished ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
            <div>
              <p className="text-xs font-semibold text-white">{formData.isPublished ? 'Published' : 'Draft'}</p>
              <p className="text-[10px] text-slate-500">
                {formData.isPublished ? 'Visible on public events page' : 'Hidden from public view'}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white">
              Cancel
            </button>
            <Button type="submit" variant="primary" isLoading={saveStatus === 'saving'}>
              {editingEventId ? 'Save Changes' : 'Create Event'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={Boolean(deleteConfirmId)} onClose={() => setDeleteConfirmId(null)}
        title="Delete Event" maxWidth="sm">
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Are you sure?</p>
              <p className="text-xs text-slate-400">
                This will permanently delete <strong className="text-white">{eventToDelete?.title}</strong>. 
                This cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-3">
            <button onClick={() => setDeleteConfirmId(null)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-surface border border-slate-700">
              Cancel
            </button>
            <button onClick={handleDeleteConfirm}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-colors">
              Delete Event
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
