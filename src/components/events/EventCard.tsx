import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Event } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { handleImageError, DEFAULT_BANNER_SVG } from '../../lib/imageUtils';

interface EventCardProps {
  event: Event;
  onRegisterClick?: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onRegisterClick }) => {
  const statusBadgeVariant = {
    upcoming: 'cyan',
    live: 'warning',
    completed: 'neutral',
  } as const;

  return (
    <Card className="flex flex-col h-full group">
      {/* Banner Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <img
          src={event.bannerImage || DEFAULT_BANNER_SVG}
          alt={event.title}
          onError={(e) => handleImageError(e)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          <Badge variant={statusBadgeVariant[event.status] || 'cyan'}>
            <span className={`w-1.5 h-1.5 rounded-full ${event.status === 'live' ? 'bg-amber-400 animate-ping' : 'bg-current'}`} />
            <span className="capitalize">{event.status}</span>
          </Badge>
          
          <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md bg-black/70 text-slate-200 border border-slate-700/80 backdrop-blur-md">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-2.5">
            <span className="flex items-center gap-1.5 text-nexora-300">
              <Calendar className="w-3.5 h-3.5" />
              {event.displayDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {event.time.split('-')[0]}
            </span>
          </div>

          <h3 className="text-xl font-bold font-heading text-white group-hover:text-nexora-300 transition-colors line-clamp-1 mb-2">
            {event.title}
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
            {event.description}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400 pb-3 border-b border-slate-800">
            <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2 flex items-center justify-end gap-2">
          {event.status === 'upcoming' && event.registrationOpen && onRegisterClick ? (
              <button
                onClick={() => onRegisterClick(event)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-nexora-400 hover:bg-nexora-300 shadow-glow-sm transition-all"
              >
                Register
              </button>
            ) : null}

            <Link
              to={`/events/${event.slug || event.id}`}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white group/btn"
            >
              <span>{event.status === 'completed' ? 'Recap' : 'Details'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-nexora-400 group-hover/btn:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
    </Card>
  );
};
