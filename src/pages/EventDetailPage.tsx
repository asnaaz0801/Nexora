import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  CheckCircle,
  Share2
} from 'lucide-react';
import { Linkedin } from '../components/common/SocialIcons';
import { useData } from '../context/DataContext';
import { handleImageError, DEFAULT_BANNER_SVG } from '../lib/imageUtils';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { EventRegistrationModal } from '../components/events/EventRegistrationModal';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { events } = useData();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const event = events.find(e => e.id === id || e.slug === id) || events[0];

  if (!event) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Event Not Found</h2>
        <Link to="/events" className="text-nexora-400 hover:underline">
          Return to Events Catalog
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>
        </div>

        {/* Hero Banner Container */}
        <div className="relative rounded-3xl overflow-hidden min-h-[300px] max-h-[560px] w-full bg-slate-950 border border-slate-800 shadow-2xl mb-10 flex items-center justify-center">
          {/* Ambient Blurred Backdrop */}
          <img
            src={event.bannerImage || DEFAULT_BANNER_SVG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />

          {/* Main Uncropped Poster Image */}
          <img
            src={event.bannerImage || DEFAULT_BANNER_SVG}
            alt={event.title}
            onError={(e) => handleImageError(e)}
            className="relative z-10 max-h-[560px] w-full object-contain mx-auto py-2"
          />

          {/* Top Actions (Share) */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition-colors shadow-lg"
              title="Share event link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && (
              <span className="px-3 py-1 rounded-xl bg-black/80 text-xs text-nexora-300 font-semibold border border-nexora-500/30 backdrop-blur-md shadow-lg">
                Link Copied!
              </span>
            )}
          </div>

          {/* Bottom Overlay Title & Badges */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-wrap items-end justify-between gap-4 pointer-events-none">
            <div className="pointer-events-auto bg-black/50 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/10 max-w-2xl shadow-2xl">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant={event.status === 'live' ? 'warning' : 'cyan'}>
                  <span className="capitalize">{event.status}</span>
                </Badge>
                <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider rounded bg-black/70 text-slate-200 border border-slate-700">
                  {event.category}
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black font-heading text-white">
                {event.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Event Details + Sidebar Registration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column (Col 8): Description, Speakers, Schedule, Recap */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview */}
            <div className="p-8 rounded-2xl bg-surface-elevated/80 border border-slate-800 space-y-4">
              <h2 className="text-xl font-bold font-heading text-white">
                Event Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {event.fullContent || event.description}
              </p>
            </div>

            {/* Event Schedule */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="p-8 rounded-2xl bg-surface-elevated/80 border border-slate-800 space-y-6">
                <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-nexora-400" />
                  <span>Timeline & Itinerary</span>
                </h2>

                <div className="space-y-4 border-l-2 border-slate-800 pl-4">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="relative pl-2">
                      <span className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-nexora-400 shadow-glow-sm" />
                      <span className="text-xs font-mono font-bold text-nexora-300">{item.time}</span>
                      <h4 className="text-base font-bold text-white">{item.title}</h4>
                      {item.description && (
                        <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Speakers / Mentors */}
            {event.speakers && event.speakers.length > 0 && (
              <div className="p-8 rounded-2xl bg-surface-elevated/80 border border-slate-800 space-y-6">
                <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-nexora-400" />
                  <span>Featured Mentors & Keynote Speakers</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.speakers.map((spk, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-surface border border-slate-800 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-heading font-black text-nexora-400 text-lg">
                        {spk.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{spk.name}</h4>
                        <p className="text-xs text-slate-300">{spk.role}</p>
                        <p className="text-[10px] text-slate-400">{spk.company}</p>
                      </div>
                      {spk.linkedin && (
                        <a
                          href={spk.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-auto text-slate-400 hover:text-nexora-400 transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Event Recap & Podium Results */}
            {event.status === 'completed' && event.recap && (
              <div className="p-8 rounded-2xl bg-surface-elevated/80 border border-slate-800 space-y-6">
                <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  <span>Event Recap & Winners</span>
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {event.recap.summary}
                </p>

                {event.recap.winners && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                    <h4 className="text-xs font-bold font-heading uppercase text-amber-400 tracking-wider">
                      Podium Winners
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {event.recap.winners.map((w, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column (Col 4): Registration Action & Quick Specs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 p-6 rounded-2xl bg-surface-elevated/90 border border-slate-700/80 shadow-2xl backdrop-blur-xl space-y-6">
              
              <div>
                <h3 className="text-base font-bold font-heading text-white mb-4 pb-3 border-b border-slate-800">
                  Event Logistics
                </h3>
                
                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-nexora-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400">Date</p>
                      <p className="text-sm font-semibold text-white">{event.displayDate}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-nexora-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400">Time</p>
                      <p className="text-sm font-semibold text-white">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-nexora-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-slate-400">Venue</p>
                      <p className="text-sm font-semibold text-white">{event.venue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800">
                {event.status === 'upcoming' && event.registrationOpen ? (
                  <Button
                    variant="glow"
                    size="lg"
                    className="w-full"
                    onClick={() => setRegisterModalOpen(true)}
                  >
                    Register for Event
                  </Button>
                ) : event.status === 'live' ? (
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => setRegisterModalOpen(true)}
                  >
                    Join Live Session
                  </Button>
                ) : (
                  <div className="p-3 text-center rounded-xl bg-surface border border-slate-800 text-xs text-slate-400 font-semibold">
                    Event Completed
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Registration Modal */}
      <EventRegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        event={event}
      />
    </div>
  );
};
