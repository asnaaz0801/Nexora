import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Event } from '../../types';
import { EventCard } from '../events/EventCard';
import { EventRegistrationModal } from '../events/EventRegistrationModal';

export const EventsPreview: React.FC = () => {
  const { events } = useData();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Show top 3 upcoming or featured events
  const previewEvents = events
    .filter(e => e.status === 'upcoming' || e.isFeatured)
    .slice(0, 3);

  return (
    <section className="relative py-24 border-t border-slate-800/80 bg-surface/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5 text-nexora-400" />
              <span>Campus Calendar</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading tracking-tight text-white">
              Upcoming <span className="text-gradient-cyan">Events & Summits</span>
            </h2>
          </div>

          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-surface-elevated hover:bg-slate-800 border border-slate-700/80 hover:border-nexora-500/40 transition-all group"
          >
            <span>Browse Full Calendar</span>
            <ArrowRight className="w-4 h-4 text-nexora-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        {previewEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={(evt) => setSelectedEvent(evt)}
              />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center p-8 rounded-2xl bg-surface/50 border border-slate-800 text-slate-400">
            <p>No upcoming events at this moment. Stay tuned for new announcements!</p>
          </div>
        )}

      </div>

      {/* Registration Modal */}
      {selectedEvent && (
        <EventRegistrationModal
          isOpen={Boolean(selectedEvent)}
          onClose={() => setSelectedEvent(null)}
          event={selectedEvent}
        />
      )}
    </section>
  );
};
