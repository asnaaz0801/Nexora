import React, { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, Filter, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { Event, EventCategory, EventStatus } from '../types';
import { EventCard } from '../components/events/EventCard';
import { EventRegistrationModal } from '../components/events/EventRegistrationModal';

export const EventsPage: React.FC = () => {
  const { events } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | EventStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | EventCategory>('all');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories: Array<'all' | EventCategory> = [
    'all',
    'Hackathon',
    'Workshop',
    'Startup Event',
    'Competition',
    'Seminar',
    'Networking',
    'Bootcamp'
  ];

  const statuses: Array<{ label: string; value: 'all' | EventStatus }> = [
    { label: 'All Events', value: 'all' },
    { label: 'Upcoming', value: 'upcoming' },
    { label: 'Live Now', value: 'live' },
    { label: 'Completed', value: 'completed' },
  ];

  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      const matchSearch = 
        evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        evt.venue.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = selectedStatus === 'all' || evt.status === selectedStatus;
      const matchCategory = selectedCategory === 'all' || evt.category === selectedCategory;

      return matchSearch && matchStatus && matchCategory;
    });
  }, [events, searchQuery, selectedStatus, selectedCategory]);

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Top Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nexora-500/10 border border-nexora-500/30 text-xs font-semibold text-nexora-300 uppercase tracking-widest mb-4">
            <Calendar className="w-4 h-4 text-nexora-400" />
            <span>Campus Event Hub</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-heading text-white tracking-tight mb-4">
            Events, Hackathons & <span className="text-gradient-cyan">Summits</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300">
            Discover upcoming workshops, 36-hour hackathons, founder fireside chats, and venture summits hosted by Nexora E-Cell.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-6 rounded-2xl bg-surface-elevated/80 border border-slate-800 shadow-xl backdrop-blur-xl mb-10 space-y-4">
          
          {/* Top Row: Search Input + Status Tabs */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search events by title, keyword, or venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-nexora-500 transition-colors"
              />
            </div>

            {/* Status Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface border border-slate-700/80 w-full md:w-auto overflow-x-auto">
              {statuses.map((st) => (
                <button
                  key={st.value}
                  onClick={() => setSelectedStatus(st.value)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedStatus === st.value
                      ? 'bg-nexora-500 text-slate-950 shadow-glow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Category Filter Chips */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 shrink-0 mr-2">
              <Filter className="w-3.5 h-3.5 text-nexora-400" />
              Categories:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-nexora-500/20 text-nexora-300 border border-nexora-500/40'
                    : 'bg-surface text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegisterClick={(evt) => setSelectedEvent(evt)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-surface/40 border border-slate-800 p-8">
            <Sparkles className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No matching events found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
              Try adjusting your search terms or selecting a different category filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedStatus('all'); setSelectedCategory('all'); }}
              className="px-4 py-2 text-xs font-semibold text-nexora-400 hover:underline"
            >
              Reset all filters
            </button>
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
    </div>
  );
};
