export type EventStatus = 'upcoming' | 'live' | 'completed';

export interface SiteContent {
  id?: string;
  section: string;
  content_key: string;
  content_value: string;
  updated_at?: string;
}
export type EventCategory = 
  | 'Workshop' 
  | 'Hackathon' 
  | 'Startup Event' 
  | 'Competition' 
  | 'Seminar' 
  | 'Networking' 
  | 'Bootcamp';

export interface EventSpeaker {
  name: string;
  role: string;
  company: string;
  image?: string;
  linkedin?: string;
}

export interface EventScheduleItem {
  time: string;
  title: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  fullContent?: string;
  category: EventCategory;
  status: EventStatus;
  bannerImage: string;
  date: string; // e.g. "2026-09-15"
  displayDate: string; // e.g. "Sept 15, 2026"
  time: string; // e.g. "10:00 AM - 4:00 PM IST"
  venue: string; // e.g. "Main Auditorium / Hybrid"
  registrationDeadline: string;
  registrationOpen: boolean;
  registrationLink?: string;
  maxParticipants?: number;
  registeredCount: number;
  isFeatured?: boolean;
  isPublished?: boolean;
  schedule?: EventScheduleItem[];
  speakers?: EventSpeaker[];
  recap?: {
    summary: string;
    highlights: string[];
    winners?: string[];
    galleryImages?: string[];
  };
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: 'Leadership' | 'Technical' | 'Marketing' | 'Design' | 'Events' | 'PR & Outreach' | 'Operations' | 'Content';
  bio: string;
  photo: string;
  year?: string;
  branch?: string;
  linkedin?: string;
  instagram?: string;
  github?: string;
  email?: string;
  order: number;
  isActive?: boolean;
  display_order?: number;
}

export interface MonthlyChallenge {
  id: string;
  month: string; // e.g. "August 2026"
  monthKey: string; // "aug-2026"
  theme: string;
  tagline: string;
  problemStatement: string;
  description: string;
  rules: string[];
  timeline: {
    starts: string;
    submissionsClose: string;
    resultsAnnounced: string;
  };
  submissionGuidelines: string[];
  eligibility: string;
  judgingCriteria: { criterion: string; weight: string }[];
  prizes?: string[];
  status: 'active' | 'judging' | 'completed' | 'upcoming';
  winner?: {
    teamName: string;
    projectName: string;
    members: string[];
    description: string;
    demoUrl?: string;
  };
}

export interface ChallengeSubmission {
  id: string;
  challengeId: string;
  teamName: string;
  leadName: string;
  leadEmail: string;
  leadPhone: string;
  members: string;
  collegeYear: string;
  branch: string;
  projectTitle: string;
  projectDescription: string;
  repoUrl?: string;
  demoUrl?: string;
  presentationUrl?: string;
  submittedAt: string;
  status: 'submitted' | 'shortlisted' | 'winner' | 'reviewed';
}

export interface Initiative {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  objective: string;
  timeline: string;
  iconName: string;
  badge: string;
  statsLabel?: string;
  ctaText: string;
  ctaLink: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: 'Milestone' | 'Hackathon Win' | 'Startup Incubated' | 'Recognition';
  date: string;
  description: string;
  metricNumber?: string;
  metricLabel?: string;
  image?: string;
  externalLink?: string;
}

export interface SiteStatistics {
  studentsEngaged: number;
  eventsConducted: number;
  workshopsOrganized: number;
  startupsSupported: number;
  industryPartners: number;
  activeMembers: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshops' | 'Hackathons' | 'Speaker Sessions' | 'Campus Life' | 'Competitions';
  imageUrl: string;
  caption: string;
  date: string;
}

export interface JoinApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  collegeYear: string;
  branch: string;
  department: string;
  skills: string;
  portfolioUrl?: string;
  githubUrl?: string;
  resumeUrl?: string;
  whyJoin: string;
  experience?: string;
  appliedAt: string;
  status: 'pending' | 'shortlisted' | 'accepted' | 'rejected';
  notes?: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  type: 'general' | 'partnership' | 'sponsorship' | 'mentorship';
  receivedAt: string;
  status: 'unread' | 'read' | 'replied';
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  collegeYear: string;
  branch: string;
  teamName?: string;
  teamMembers?: string;
  registeredAt: string;
}
