import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Event, 
  TeamMember, 
  ContactMessage,
  EventRegistration 
} from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const EVENTS_KEY = 'nexora_events_cache';
const TEAM_KEY = 'nexora_team_cache';

const defaultTeamMembers: TeamMember[] = [
  {
    id: 'tm-pres',
    name: 'President',
    position: 'President',
    department: 'Leadership',
    bio: 'Leading Nexora E-Cell strategic direction, vision, and executive operations.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    year: 'Final Year',
    branch: 'Computer Science & Engineering',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com',
    email: 'president@acet.ac.in',
    order: 1,
    display_order: 1,
    isActive: true,
  },
  {
    id: 'tm-vp',
    name: 'Vice President',
    position: 'Vice President',
    department: 'Leadership',
    bio: 'Overseeing core wings, event execution, incubation initiatives, and industry partnerships.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    year: 'Final Year',
    branch: 'Computer Science & Engineering',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com',
    email: 'vp@acet.ac.in',
    order: 2,
    display_order: 2,
    isActive: true,
  }
];

function getStored<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('LocalStorage load error:', e);
  }
  return fallback;
}

function setStored<T>(key: string, data: T) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage save error:', e);
  }
}

interface DataContextType {
  // Data lists
  events: Event[];
  teamMembers: TeamMember[];
  messages: ContactMessage[];
  registrations: EventRegistration[];
  
  // Loading state
  isLoading: boolean;
  isLiveSync: boolean;

  // Events CRUD
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (id: string, updates: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  // Team CRUD
  addTeamMember: (member: Omit<TeamMember, 'id'>) => Promise<void>;
  updateTeamMember: (id: string, updates: Partial<TeamMember>) => Promise<void>;
  deleteTeamMember: (id: string) => Promise<void>;

  // Contact Messages
  submitMessage: (message: Omit<ContactMessage, 'id' | 'receivedAt' | 'status'>) => Promise<boolean>;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(() => getStored(EVENTS_KEY, []));
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(() => getStored(TEAM_KEY, defaultTeamMembers));
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [registrations, setRegistrations] = useState<EventRegistration[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isLiveSync = isSupabaseConfigured;

  // Fetch data from Supabase on mount
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      
      if (!isSupabaseConfigured || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const [eventsRes, teamRes, messagesRes] = await Promise.all([
          supabase.from('events').select('*').order('date', { ascending: true }),
          supabase.from('team_members').select('*').order('display_order', { ascending: true }),
          supabase.from('contact_messages').select('*').order('received_at', { ascending: false }),
        ]);

        if (eventsRes.data && eventsRes.data.length > 0) {
          const mapped = mapEvents(eventsRes.data);
          setEvents(mapped);
          setStored(EVENTS_KEY, mapped);
        } else if (eventsRes.data && eventsRes.data.length === 0) {
          // Auto-seed initial events to Supabase so Cloud DB is ready for cross-browser sync
          const localEvents = getStored<Event[]>(EVENTS_KEY, []);
          if (localEvents.length > 0) {
            const rows = localEvents.map(e => ({
              id: e.id,
              title: e.title,
              slug: e.slug || e.id,
              tagline: e.tagline || '',
              description: e.description,
              full_content: e.fullContent || '',
              category: e.category,
              status: e.status,
              banner_image: e.bannerImage || '',
              date: e.date,
              display_date: e.displayDate || e.date,
              time: e.time || '',
              venue: e.venue || '',
              registration_deadline: e.registrationDeadline || e.date,
              registration_open: e.registrationOpen ?? true,
              registration_link: e.registrationLink || '',
              max_participants: e.maxParticipants || 200,
              registered_count: e.registeredCount || 0,
              is_featured: e.isFeatured || false,
              is_published: e.isPublished ?? false,
            }));
            supabase.from('events').upsert(rows, { onConflict: 'id' }).then(() => {});
          }
        }

        if (teamRes.data && teamRes.data.length > 0) {
          const mapped = mapTeamMembers(teamRes.data);
          setTeamMembers(mapped);
          setStored(TEAM_KEY, mapped);
        } else if (teamRes.data && teamRes.data.length === 0) {
          // Auto-seed initial team members to Supabase so Cloud DB is ready for cross-browser sync
          const localTeam = getStored<TeamMember[]>(TEAM_KEY, defaultTeamMembers);
          if (localTeam.length > 0) {
            const rows = localTeam.map(m => ({
              id: m.id,
              name: m.name,
              position: m.position,
              department: m.department,
              bio: m.bio || '',
              photo: m.photo || '',
              year: m.year || '',
              branch: m.branch || '',
              linkedin: m.linkedin || '',
              instagram: m.instagram || '',
              github: m.github || '',
              email: m.email || '',
              display_order: m.display_order || m.order || 1,
              is_active: m.isActive ?? true,
            }));
            supabase.from('team_members').upsert(rows, { onConflict: 'id' }).then(() => {});
          }
        }

        if (messagesRes.data) {
          setMessages(mapMessages(messagesRes.data));
        }
      } catch (error) {
        console.error('Supabase fetch error:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  function mapEvents(data: any[]): Event[] {
    return data.map(e => ({
      id: e.id,
      title: e.title,
      slug: e.slug || e.id,
      tagline: e.tagline || '',
      description: e.description,
      fullContent: e.full_content || '',
      category: e.category,
      status: e.status,
      bannerImage: e.banner_image || e.bannerImage || '',
      date: e.date,
      displayDate: e.display_date || e.displayDate || e.date,
      time: e.time,
      venue: e.venue,
      registrationDeadline: e.registration_deadline || e.registrationDeadline || '',
      registrationOpen: e.registration_open ?? e.registrationOpen ?? true,
      registrationLink: e.registration_link || e.registrationLink || '',
      maxParticipants: e.max_participants || e.maxParticipants || 200,
      registeredCount: e.registered_count || e.registeredCount || 0,
      isFeatured: e.is_featured || e.isFeatured || false,
      isPublished: e.is_published ?? e.isPublished ?? false,
    }));
  }

  function mapTeamMembers(data: any[]): TeamMember[] {
    return data.map(m => ({
      id: m.id,
      name: m.name,
      position: m.position,
      department: m.department,
      bio: m.bio || '',
      photo: m.photo || '',
      year: m.year || '',
      branch: m.branch || '',
      linkedin: m.linkedin || '',
      instagram: m.instagram || '',
      github: m.github || '',
      email: m.email || '',
      order: m.display_order || m.order || 1,
      isActive: m.is_active ?? true,
      display_order: m.display_order || 1,
    }));
  }

  function mapMessages(data: any[]): ContactMessage[] {
    return data.map(m => ({
      id: m.id,
      fullName: m.full_name || m.fullName || '',
      email: m.email,
      subject: m.subject,
      message: m.message,
      type: m.type || 'general',
      receivedAt: m.received_at || m.receivedAt || new Date().toISOString(),
      status: m.status || 'unread',
    }));
  }

  // Events CRUD
  const addEvent = async (eventData: Omit<Event, 'id'>) => {
    const newId = 'evt-' + Date.now();
    const newEvent: Event = { ...eventData, id: newId };
    setEvents(prev => {
      const updated = [newEvent, ...prev];
      setStored(EVENTS_KEY, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('events').upsert({
          id: newId,
          title: eventData.title,
          slug: eventData.slug || newId,
          tagline: eventData.tagline,
          description: eventData.description,
          full_content: eventData.fullContent,
          category: eventData.category,
          status: eventData.status,
          banner_image: eventData.bannerImage,
          date: eventData.date,
          display_date: eventData.displayDate,
          time: eventData.time,
          venue: eventData.venue,
          registration_deadline: eventData.registrationDeadline || eventData.date,
          registration_open: eventData.registrationOpen,
          registration_link: eventData.registrationLink,
          max_participants: eventData.maxParticipants,
          registered_count: 0,
          is_featured: eventData.isFeatured,
          is_published: eventData.isPublished ?? false,
        }, { onConflict: 'id' });
      } catch (err) {
        console.error('Supabase insert event notice:', err);
      }
    }
  };

  const updateEvent = async (id: string, updates: Partial<Event>) => {
    let fullItem: Event | undefined;
    setEvents(prev => {
      const updated = prev.map(evt => {
        if (evt.id === id) {
          fullItem = { ...evt, ...updates };
          return fullItem;
        }
        return evt;
      });
      setStored(EVENTS_KEY, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase && fullItem) {
      try {
        await supabase.from('events').upsert({
          id: id,
          title: fullItem.title,
          slug: fullItem.slug || id,
          tagline: fullItem.tagline || '',
          description: fullItem.description,
          full_content: fullItem.fullContent || '',
          category: fullItem.category,
          status: fullItem.status,
          banner_image: fullItem.bannerImage || '',
          date: fullItem.date,
          display_date: fullItem.displayDate || fullItem.date,
          time: fullItem.time || '',
          venue: fullItem.venue || '',
          registration_deadline: fullItem.registrationDeadline || fullItem.date,
          registration_open: fullItem.registrationOpen ?? true,
          registration_link: fullItem.registrationLink || '',
          max_participants: fullItem.maxParticipants || 200,
          registered_count: fullItem.registeredCount || 0,
          is_featured: fullItem.isFeatured || false,
          is_published: fullItem.isPublished ?? false,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      } catch (err) {
        console.error('Supabase update event notice:', err);
      }
    }
  };

  const deleteEvent = async (id: string) => {
    setEvents(prev => {
      const updated = prev.filter(evt => evt.id !== id);
      setStored(EVENTS_KEY, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('events').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete event notice:', err);
      }
    }
  };

  // Team CRUD
  const addTeamMember = async (memberData: Omit<TeamMember, 'id'>) => {
    const newId = 'tm-' + Date.now();
    const newMember: TeamMember = { ...memberData, id: newId };
    setTeamMembers(prev => {
      const updated = [...prev, newMember];
      setStored(TEAM_KEY, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('team_members').upsert({
          id: newId,
          name: memberData.name,
          position: memberData.position,
          department: memberData.department,
          bio: memberData.bio,
          photo: memberData.photo,
          year: memberData.year,
          branch: memberData.branch,
          linkedin: memberData.linkedin,
          instagram: memberData.instagram,
          github: memberData.github,
          email: memberData.email,
          display_order: memberData.display_order || memberData.order || 1,
          is_active: memberData.isActive ?? true,
        }, { onConflict: 'id' });
      } catch (err) {
        console.error('Supabase insert team member notice:', err);
      }
    }
  };

  const updateTeamMember = async (id: string, updates: Partial<TeamMember>) => {
    let fullMember: TeamMember | undefined;
    setTeamMembers(prev => {
      const updated = prev.map(tm => {
        if (tm.id === id) {
          fullMember = { ...tm, ...updates };
          return fullMember;
        }
        return tm;
      });
      setStored(TEAM_KEY, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase && fullMember) {
      try {
        await supabase.from('team_members').upsert({
          id: id,
          name: fullMember.name,
          position: fullMember.position,
          department: fullMember.department,
          bio: fullMember.bio || '',
          photo: fullMember.photo || '',
          year: fullMember.year || '',
          branch: fullMember.branch || '',
          linkedin: fullMember.linkedin || '',
          instagram: fullMember.instagram || '',
          github: fullMember.github || '',
          email: fullMember.email || '',
          display_order: fullMember.display_order || fullMember.order || 1,
          is_active: fullMember.isActive ?? true,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      } catch (err) {
        console.error('Supabase update team member notice:', err);
      }
    }
  };

  const deleteTeamMember = async (id: string) => {
    setTeamMembers(prev => {
      const updated = prev.filter(tm => tm.id !== id);
      setStored(TEAM_KEY, updated);
      return updated;
    });

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('team_members').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete team member notice:', err);
      }
    }
  };

  // Contact Messages
  const submitMessage = async (msgData: Omit<ContactMessage, 'id' | 'receivedAt' | 'status'>): Promise<boolean> => {
    const newMsg: ContactMessage = {
      ...msgData,
      id: 'msg-' + Date.now(),
      receivedAt: new Date().toISOString(),
      status: 'unread'
    };
    setMessages(prev => [newMsg, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_messages').insert({
          full_name: msgData.fullName,
          email: msgData.email,
          subject: msgData.subject,
          message: msgData.message,
          type: msgData.type,
        });
      } catch (err) {
        console.error('Supabase submit message notice:', err);
      }
    }
    return true;
  };

  const updateMessageStatus = async (id: string, status: ContactMessage['status']) => {
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, status } : msg));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('contact_messages').update({ status }).eq('id', id);
      } catch (err) {
        console.error('Supabase update message status notice:', err);
      }
    }
  };

  return (
    <DataContext.Provider value={{
      events,
      teamMembers,
      messages,
      registrations,
      isLoading,
      isLiveSync,
      addEvent,
      updateEvent,
      deleteEvent,
      addTeamMember,
      updateTeamMember,
      deleteTeamMember,
      submitMessage,
      updateMessageStatus,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
