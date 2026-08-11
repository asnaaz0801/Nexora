import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Upload, AlertCircle, CheckCircle2, RefreshCw, X, Crown, Star } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { TeamMember } from '../../types';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

const inputClass = "w-full px-3.5 py-2.5 rounded-xl bg-surface border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors";
const labelClass = "block text-xs font-semibold text-slate-300 mb-1.5";

const emptyForm = {
  name: '',
  position: '',
  department: 'Leadership' as TeamMember['department'],
  bio: '',
  photo: '',
  year: '',
  branch: '',
  linkedin: '',
  instagram: '',
  github: '',
  email: '',
  display_order: 1,
  isActive: true,
};

export const AdminTeamPage: React.FC = () => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, display_order: teamMembers.length + 1 });
    setSaveStatus('idle');
    setModalOpen(true);
  };

  const handlePresetRole = (role: 'President' | 'Vice President') => {
    if (role === 'President') {
      setFormData(prev => ({
        ...prev,
        position: 'President',
        department: 'Leadership',
        display_order: 1,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        position: 'Vice President',
        department: 'Leadership',
        display_order: 2,
      }));
    }
  };

  const handleOpenEdit = (tm: TeamMember) => {
    setEditingId(tm.id);
    setFormData({
      name: tm.name,
      position: tm.position,
      department: tm.department,
      bio: tm.bio || '',
      photo: tm.photo || '',
      year: tm.year || '',
      branch: tm.branch || '',
      linkedin: tm.linkedin || '',
      instagram: tm.instagram || '',
      github: tm.github || '',
      email: tm.email || '',
      display_order: tm.display_order || tm.order || 1,
      isActive: tm.isActive !== false,
    });
    setSaveStatus('idle');
    setModalOpen(true);
  };

  // Convert image file to Base64 Data URL (fail-safe fallback)
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please select a JPG, PNG, or WebP image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB.');
      return;
    }

    setUploadingImage(true);

    try {
      // Step 1: Attempt Supabase Storage Upload if configured
      if (isSupabaseConfigured && supabase) {
        const ext = file.name.split('.').pop();
        const fileName = `team-${Date.now()}.${ext}`;
        const { error } = await supabase.storage
          .from('team-images')
          .upload(fileName, file, { upsert: true });

        if (!error) {
          const { data: { publicUrl } } = supabase.storage
            .from('team-images')
            .getPublicUrl(fileName);

          if (publicUrl) {
            setFormData(prev => ({ ...prev, photo: publicUrl }));
            setUploadingImage(false);
            return;
          }
        }
      }

      // Step 2: Fail-safe Base64 Data URL Fallback (works 100% without RLS errors)
      const dataUrl = await readFileAsDataUrl(file);
      setFormData(prev => ({ ...prev, photo: dataUrl }));
    } catch (err) {
      // Final fallback to Data URL
      try {
        const dataUrl = await readFileAsDataUrl(file);
        setFormData(prev => ({ ...prev, photo: dataUrl }));
      } catch (dataUrlErr) {
        console.error('Failed to read image file:', dataUrlErr);
      }
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.position) return;

    setSaveStatus('saving');
    setSaveError('');

    try {
      const memberData = {
        name: formData.name,
        position: formData.position,
        department: formData.department,
        bio: formData.bio,
        photo: formData.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=0D1117&color=00D2FF&size=200`,
        year: formData.year,
        branch: formData.branch,
        linkedin: formData.linkedin,
        instagram: formData.instagram,
        github: formData.github,
        email: formData.email,
        order: formData.display_order,
        display_order: formData.display_order,
        isActive: formData.isActive,
      };

      if (editingId) {
        await updateTeamMember(editingId, memberData);
      } else {
        await addTeamMember(memberData);
      }
      setSaveStatus('success');
      setTimeout(() => {
        setModalOpen(false);
        setSaveStatus('idle');
      }, 800);
    } catch (err: any) {
      setSaveStatus('error');
      setSaveError(err.message || 'Failed to save team member.');
    }
  };

  const handleToggleActive = async (tm: TeamMember) => {
    await updateTeamMember(tm.id, { isActive: !tm.isActive });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirmId) return;
    await deleteTeamMember(deleteConfirmId);
    setDeleteConfirmId(null);
  };

  const memberToDelete = teamMembers.find(m => m.id === deleteConfirmId);

  return (
    <div className="flex-1 min-h-screen bg-background overflow-y-auto">
      <AdminHeader
        title="Team Members"
        subtitle={`Manage executive leaders (President/Vice President) and core wing members (${teamMembers.length} profiles)`}
        actionButton={
          <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
            Add Team Member
          </Button>
        }
      />

      <div className="p-6 sm:p-8 max-w-7xl">
        {teamMembers.length === 0 ? (
          <div className="text-center py-20 rounded-2xl bg-surface-elevated/80 border border-slate-800 border-dashed">
            <p className="text-slate-400 mb-4">No team members yet.</p>
            <Button variant="primary" size="sm" onClick={handleOpenAdd} leftIcon={<Plus className="w-4 h-4" />}>
              Add First Member
            </Button>
          </div>
        ) : (
          <div className="rounded-2xl bg-surface-elevated/80 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-surface/90 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Member</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Department</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Order</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {teamMembers
                    .sort((a, b) => (a.display_order || a.order || 0) - (b.display_order || b.order || 0))
                    .map((tm) => {
                      const isPres = tm.position.toLowerCase().includes('president') && !tm.position.toLowerCase().includes('vice');
                      const isVp = tm.position.toLowerCase().includes('vice president');
                      return (
                        <tr key={tm.id} className={`hover:bg-slate-800/40 transition-colors ${tm.isActive === false ? 'opacity-50' : ''}`}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={tm.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(tm.name)}&background=0D1117&color=00D2FF&size=80`}
                                alt={tm.name}
                                className="w-10 h-10 rounded-xl object-cover bg-slate-900 shrink-0 border border-slate-700"
                              />
                              <div>
                                <p className="font-bold text-sm text-white flex items-center gap-1.5">
                                  {tm.name}
                                  {isPres && <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">👑 President</span>}
                                  {isVp && <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">⭐ Vice President</span>}
                                </p>
                                {tm.email && <p className="text-[10px] text-slate-500">{tm.email}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-semibold text-cyan-300">{tm.position}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium text-[11px]">
                              {tm.department}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              tm.isActive !== false
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : 'bg-slate-800 text-slate-500'
                            }`}>
                              {tm.isActive !== false ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="p-4 font-mono text-slate-400">
                            #{tm.display_order || tm.order || 1}
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleToggleActive(tm)}
                                className={`p-1.5 rounded-lg border transition-colors ${
                                  tm.isActive !== false
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                                }`}
                                title={tm.isActive !== false ? 'Deactivate' : 'Activate'}
                              >
                                {tm.isActive !== false
                                  ? <ToggleRight className="w-3.5 h-3.5" />
                                  : <ToggleLeft className="w-3.5 h-3.5" />
                                }
                              </button>
                              <button
                                onClick={() => handleOpenEdit(tm)}
                                className="p-1.5 rounded-lg bg-surface border border-slate-700 text-slate-300 hover:text-nexora-400 transition-colors"
                                title="Edit"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(tm.id)}
                                className="p-1.5 rounded-lg bg-surface border border-slate-700 text-slate-300 hover:text-rose-400 transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Team Member' : 'Add Team Member'}
        maxWidth="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          
          {/* Status messages */}
          {saveStatus === 'success' && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Saved successfully!
            </div>
          )}
          {saveStatus === 'error' && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400">
              <AlertCircle className="w-4 h-4" /> {saveError}
            </div>
          )}

          {/* Preset Executive Role Buttons */}
          <div className="p-3 rounded-xl bg-surface border border-slate-800 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-300">Quick Executive Presets:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePresetRole('President')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 flex items-center gap-1.5 transition-colors"
              >
                <Crown className="w-3.5 h-3.5" /> Set as President (#1)
              </button>
              <button
                type="button"
                onClick={() => handlePresetRole('Vice President')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-1.5 transition-colors"
              >
                <Star className="w-3.5 h-3.5" /> Set as Vice President (#2)
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div>
            <label className={labelClass}>Profile Image</label>
            <div className="flex items-start gap-3">
              {formData.photo ? (
                <div className="relative">
                  <img src={formData.photo} alt="Preview" className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-700" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, photo: '' })}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-slate-900 border border-dashed border-slate-700 flex items-center justify-center text-slate-500">
                  <Upload className="w-5 h-5" />
                </div>
              )}
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  className={inputClass}
                  value={formData.photo}
                  onChange={e => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="Paste image URL or upload file below"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-surface border border-slate-700 hover:border-nexora-500/40 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {uploadingImage ? (
                      <span className="flex items-center gap-1.5"><RefreshCw className="w-3 h-3 animate-spin" /> Processing Image...</span>
                    ) : (
                      <span className="flex items-center gap-1.5"><Upload className="w-3 h-3" /> Select & Upload Image</span>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <span className="text-[10px] text-slate-500">JPG, PNG, WebP • Max 5MB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" className={inputClass} value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div>
              <label className={labelClass}>Position / Role *</label>
              <input type="text" className={inputClass} value={formData.position}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
                placeholder="e.g. President / Vice President / Tech Lead" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Department</label>
              <select className={inputClass} value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value as TeamMember['department'] })}>
                <option value="Leadership">Leadership</option>
                <option value="Technical">Technical</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="PR & Outreach">PR & Outreach</option>
                <option value="Events">Events</option>
                <option value="Operations">Operations</option>
                <option value="Content">Content</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Display Order (1 = President, 2 = Vice President)</label>
              <input type="number" className={inputClass} value={formData.display_order}
                onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                min={1} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Branch</label>
              <input type="text" className={inputClass} value={formData.branch}
                onChange={e => setFormData({ ...formData, branch: e.target.value })}
                placeholder="e.g. CSE" />
            </div>
            <div>
              <label className={labelClass}>Year</label>
              <input type="text" className={inputClass} value={formData.year}
                onChange={e => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g. 3rd Year" />
            </div>
          </div>

          <div>
            <label className={labelClass}>Bio / Description</label>
            <textarea className={inputClass + ' resize-none'} rows={3} value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief description about this team member..." />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>LinkedIn URL</label>
              <input type="url" className={inputClass} value={formData.linkedin}
                onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className={labelClass}>Instagram URL</label>
              <input type="url" className={inputClass} value={formData.instagram}
                onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="https://instagram.com/..." />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input type="url" className={inputClass} value={formData.github}
                onChange={e => setFormData({ ...formData, github: e.target.value })}
                placeholder="https://github.com/..." />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input type="email" className={inputClass} value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="member@example.com" />
            </div>
          </div>

          {/* Active toggle */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-slate-800">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                formData.isActive ? 'bg-nexora-500' : 'bg-slate-700'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                formData.isActive ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
            <div>
              <p className="text-xs font-semibold text-white">{formData.isActive ? 'Active' : 'Inactive'}</p>
              <p className="text-[10px] text-slate-500">
                {formData.isActive ? 'Will appear on the public team page' : 'Hidden from public view'}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white">
              Cancel
            </button>
            <Button type="submit" variant="primary" isLoading={saveStatus === 'saving'}>
              {editingId ? 'Save Changes' : 'Add Member'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        title="Remove Team Member"
        maxWidth="sm"
      >
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white mb-1">Are you sure?</p>
              <p className="text-xs text-slate-400">
                This will permanently remove <strong className="text-white">{memberToDelete?.name}</strong> from the team. 
                This action cannot be undone.
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
              Delete Member
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
