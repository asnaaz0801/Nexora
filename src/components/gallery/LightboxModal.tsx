import React, { useEffect } from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import { GalleryItem } from '../../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/90 backdrop-blur-xl animate-fadeIn"
        onClick={onClose}
      />

      <div className="relative z-10 max-w-4xl w-full rounded-2xl overflow-hidden bg-surface-elevated border border-slate-700 shadow-2xl animate-scaleUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
          aria-label="Close image modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image */}
        <div className="aspect-[16/10] w-full bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Info Bar */}
        <div className="p-6 bg-surface space-y-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-nexora-500/15 text-nexora-300 border border-nexora-500/30">
              {item.category}
            </span>
            {item.date && (
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-nexora-400" />
                {item.date}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold font-heading text-white">{item.title}</h3>
          <p className="text-xs text-slate-300">{item.caption}</p>
        </div>
      </div>
    </div>
  );
};
