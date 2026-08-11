import { 
  Event, 
  TeamMember, 
  MonthlyChallenge, 
  Initiative, 
  Achievement, 
  SiteStatistics, 
  GalleryItem, 
  JoinApplication, 
  ContactMessage 
} from '../types';

export const initialSiteStats: SiteStatistics = {
  studentsEngaged: 540,
  eventsConducted: 24,
  workshopsOrganized: 14,
  startupsSupported: 8,
  industryPartners: 18,
  activeMembers: 45
};

export const initialEvents: Event[] = [
  {
    id: 'evt-01',
    title: 'NexHacks 2026: Campus Innovation Hackathon',
    slug: 'nexhacks-2026',
    tagline: '36-Hour Sprint to Build Groundbreaking Solutions for Smart Cities & AI',
    description: 'The flagship hackathon of ACET organized by Nexora E-Cell. Bringing together over 300+ builders, designers, and developers to pitch and prototype scalable startup ideas.',
    fullContent: 'NexHacks 2026 is designed to foster rapid innovation and real-world execution. Over 36 non-stop hours, student teams will collaborate with industry mentors, pitch to early-stage investors, and compete for grants, incubation opportunities, and tech perks.',
    category: 'Hackathon',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    date: '2026-09-18',
    displayDate: 'Sept 18 - 20, 2026',
    time: '09:00 AM - 06:00 PM IST',
    venue: 'Main Auditorium & Innovation Lab, ACET',
    registrationDeadline: '2026-09-12',
    registrationOpen: true,
    maxParticipants: 350,
    registeredCount: 184,
    isFeatured: true,
    speakers: [
      {
        name: 'Dr. A. R. Siddiqui',
        role: 'Dean of Innovation & Research',
        company: 'ACET Incubation Center',
        linkedin: 'https://linkedin.com'
      },
      {
        name: 'Sameer Verma',
        role: 'Principal Architect & Venture Mentor',
        company: 'ScaleX Labs',
        linkedin: 'https://linkedin.com'
      }
    ],
    schedule: [
      { time: 'Day 1 - 09:00 AM', title: 'Opening Ceremony & Problem Track Unveiling' },
      { time: 'Day 1 - 11:00 AM', title: 'Hacking Begins & Mentor Round 1' },
      { time: 'Day 2 - 02:00 PM', title: 'Mid-way Pitch Checkpoint & Stress Test' },
      { time: 'Day 3 - 04:00 PM', title: 'Grand Finale Pitches & Awards Ceremony' }
    ]
  },
  {
    id: 'evt-02',
    title: 'Zero to One: Building Scalable Web3 & AI Startups',
    slug: 'zero-to-one-workshop',
    tagline: 'Practical Masterclass on Product-Market Fit, Architecture, and Seed Fundraising',
    description: 'An interactive hands-on workshop led by industry founders exploring modern venture creation, lean prototyping, and turning college projects into investable businesses.',
    fullContent: 'Learn how to transition from a student developer into a venture founder. This session breaks down the unit economics of SaaS and AI startups, legal structures, intellectual property, and pitching to angel networks.',
    category: 'Workshop',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    date: '2026-09-02',
    displayDate: 'Sept 02, 2026',
    time: '02:00 PM - 05:30 PM IST',
    venue: 'Seminar Hall 2, Tech Block, ACET',
    registrationDeadline: '2026-08-31',
    registrationOpen: true,
    maxParticipants: 120,
    registeredCount: 96,
    isFeatured: true,
    speakers: [
      {
        name: 'Kunal Deshmukh',
        role: 'Co-Founder & CTO',
        company: 'OrbitCloud Solutions',
        linkedin: 'https://linkedin.com'
      }
    ]
  },
  {
    id: 'evt-03',
    title: 'E-Summit 2026: The Founders Conclave',
    slug: 'e-summit-2026',
    tagline: 'Central India’s Premier Entrepreneurship & Venture Gathering',
    description: 'Keynote addresses from unicorn leaders, interactive panel discussions on emerging tech trends, startup expo, and live angel pitching arena.',
    fullContent: 'The flagship annual summit hosting founders, angel investors, VCs, and aspiring student innovators. Features a dedicated Startup Alley with 25+ student demos and live seed evaluation.',
    category: 'Startup Event',
    status: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
    date: '2026-10-10',
    displayDate: 'Oct 10 - 11, 2026',
    time: '10:00 AM - 07:00 PM IST',
    venue: 'Grand Convention Center, ACET Campus',
    registrationDeadline: '2026-10-05',
    registrationOpen: true,
    maxParticipants: 500,
    registeredCount: 312,
    isFeatured: true
  },
  {
    id: 'evt-04',
    title: 'Ideathon: Sustainable Tech & Green Mobility',
    slug: 'ideathon-sustainable-tech',
    tagline: 'Prototyping Sustainable Urban Solutions with IoT and CleanTech',
    description: 'A 24-hour sprint tackling renewable energy, EV charging infrastructure, and civic tech in collaboration with Nagpur Smart City initiatives.',
    category: 'Competition',
    status: 'completed',
    bannerImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    date: '2026-07-22',
    displayDate: 'July 22, 2026',
    time: '09:00 AM - 05:00 PM IST',
    venue: 'IoT & Embedded Systems Lab, ACET',
    registrationDeadline: '2026-07-18',
    registrationOpen: false,
    maxParticipants: 100,
    registeredCount: 100,
    isFeatured: false,
    recap: {
      summary: '28 student teams presented innovative hardware and software prototypes to a panel of civic administrators and venture mentors.',
      highlights: [
        'Over 28 working prototypes delivered in 24 hours',
        'Top 3 teams secured seed grants from regional innovation fund',
        '2 patent applications filed through ACET IPR Cell'
      ],
      winners: [
        '1st Place: Team VoltGrid (Decentralized EV Smart Balancer)',
        '2nd Place: Team AquaSense (IoT Water Quality Grid)',
        '3rd Place: Team EcoRoute (AI Traffic & Emission Minimizer)'
      ]
    }
  }
];

export const initialMonthlyChallenges: MonthlyChallenge[] = [
  {
    id: 'mc-2026-08',
    month: 'August 2026',
    monthKey: 'aug-2026',
    theme: 'AI-Powered Campus Utility & Student Productivity Tools',
    tagline: 'One challenge. Every month. One step closer to becoming a builder.',
    description: 'Build a functional web application, AI agent, or browser tool that solves a tangible friction point for university students or faculty (e.g. intelligent study group matching, dynamic canteen ordering, lab equipment scheduling, or automated note summarizers).',
    problemStatement: 'University students constantly navigate fragmented schedules, disparate resource repositories, and inefficient campus workflows. Design, build, and deploy an intuitive software solution powered by modern APIs (OpenAI, Gemini, Supabase, or local LLMs) that provides measurable productivity gains for the ACET campus community.',
    rules: [
      'Open to all students across all engineering branches and years.',
      'Teams can consist of 1 to 4 members.',
      'The project must be functional with a public GitHub repository and live deployment link (Vercel, Netlify, Render, etc.).',
      'All code must be original or appropriately attributed to open-source libraries.',
      'Final submission must include a 2-minute Loom/YouTube demo video.'
    ],
    timeline: {
      starts: 'August 01, 2026',
      submissionsClose: 'August 28, 2026 at 11:59 PM',
      resultsAnnounced: 'August 31, 2026'
    },
    submissionGuidelines: [
      'Provide your Team Name, Member Details & College Year.',
      'Public GitHub Repository URL with clean README.',
      'Live working demo link.',
      '2-minute video walkthrough explaining the architecture and live user flow.'
    ],
    eligibility: 'All active undergraduate and postgraduate students of ACET.',
    judgingCriteria: [
      { criterion: 'Innovation & Problem Relevance', weight: '30%' },
      { criterion: 'Technical Architecture & Code Quality', weight: '30%' },
      { criterion: 'UI/UX Polish & Usability', weight: '25%' },
      { criterion: 'Scalability & Presentation', weight: '15%' }
    ],
    prizes: [
      '₹10,000 Cash Prize + Incubation Fast-Track',
      'Official Nexora Certificate of Excellence',
      'Direct Fast-Track Entry into Nexora Core Technical Wing',
      'Cloud Credits & Developer Perks'
    ],
    status: 'active'
  },
  {
    id: 'mc-2026-07',
    month: 'July 2026',
    monthKey: 'jul-2026',
    theme: 'Decentralized Micro-Economy & Peer Services',
    tagline: 'Build peer-to-peer barter, tutoring, and shared resource exchange platforms.',
    description: 'Students developed decentralized or P2P exchange platforms allowing university peers to safely share study material, hardware kits, and academic skills.',
    problemStatement: 'Create a trust-verified community portal where college students can rent lab microcontrollers, trade textbooks, and host peer micro-tutoring sessions.',
    rules: [
      'Open to all branches.',
      'Teams of 1 to 3 members.',
      'Must incorporate authentication and verified peer reviews.'
    ],
    timeline: {
      starts: 'July 01, 2026',
      submissionsClose: 'July 25, 2026',
      resultsAnnounced: 'July 30, 2026'
    },
    submissionGuidelines: [
      'GitHub repo with setup instructions.',
      'Live deployment.'
    ],
    eligibility: 'All ACET Students',
    judgingCriteria: [
      { criterion: 'Functional Execution', weight: '40%' },
      { criterion: 'Security & Trust Architecture', weight: '30%' },
      { criterion: 'User Interface', weight: '30%' }
    ],
    status: 'completed',
    winner: {
      teamName: 'Team PeerLoop',
      projectName: 'PeerLoop: ACET Micro-Exchange',
      members: ['Ahmad Khan', 'Priya Sharma', 'Zaid Sheikh'],
      description: 'A seamless mobile-first P2P platform for lab kit lending and peer coding assistance with QR verification.',
      demoUrl: 'https://github.com'
    }
  },
  {
    id: 'mc-2026-06',
    month: 'June 2026',
    monthKey: 'jun-2026',
    theme: 'Smart Campus Emergency & Safety Beacon',
    tagline: 'Rapid response telemetry and safety broadcast system for colleges.',
    description: 'Hardware/Software hybrid challenge for IoT and web developers.',
    problemStatement: 'Design a high-reliability emergency beacon and alert broadcast network for university campuses.',
    rules: ['Teams of 2 to 4 members.'],
    timeline: {
      starts: 'June 01, 2026',
      submissionsClose: 'June 25, 2026',
      resultsAnnounced: 'June 30, 2026'
    },
    submissionGuidelines: ['Working prototype video and schematic.'],
    eligibility: 'All ACET Students',
    judgingCriteria: [
      { criterion: 'Reliability & Speed', weight: '50%' },
      { criterion: 'System Design', weight: '50%' }
    ],
    status: 'completed',
    winner: {
      teamName: 'Team SafeZone',
      projectName: 'SafeCampus IoT Mesh',
      members: ['Rohan Gupta', 'Neha Patel'],
      description: 'Low-latency mesh network trigger system with instant SMS broadcast to campus security.'
    }
  }
];

export const initialInitiatives: Initiative[] = [
  {
    id: 'init-01',
    title: 'Nexora Monthly Challenge',
    shortDescription: 'Monthly hands-on innovation sprint designed to transform passive learners into active product builders.',
    fullDescription: 'Our recurring flagship competition that presents students with a real-world technical and business problem every single month. Participants build working MVPs, receive mentor feedback, and win cash prizes.',
    objective: 'Instill consistent building habits, develop portfolio-grade projects, and identify elite talent for incubation.',
    timeline: 'Year-Round (New theme released on the 1st of every month)',
    iconName: 'Flame',
    badge: 'Recurring Monthly',
    statsLabel: '12 Challenges / Year',
    ctaText: 'Explore This Month’s Challenge',
    ctaLink: '/challenge'
  },
  {
    id: 'init-02',
    title: 'Nexora Incubator & Venture Lab',
    shortDescription: 'Dedicated pre-seed launchpad providing student founders with workspace, legal advisory, and prototyping grants.',
    fullDescription: 'We provide high-potential student projects with 1-on-1 mentorship from seasoned entrepreneurs, connection to regional angel networks, cloud infrastructure credits, and guidance on intellectual property filing.',
    objective: 'Transform college final-year capstone projects and hackathon wins into commercially viable startups.',
    timeline: 'Cohort-based (Bi-Annual: Spring & Fall)',
    iconName: 'Rocket',
    badge: 'Flagship Incubator',
    statsLabel: '8 Active Startups',
    ctaText: 'Apply for Incubation',
    ctaLink: '/join'
  },
  {
    id: 'init-03',
    title: 'Founder Talks & Fireside Sessions',
    shortDescription: 'Direct, unfiltered conversations with tech founders, venture capitalists, and industry innovators.',
    fullDescription: 'Regular masterclasses where prominent leaders share practical lessons on fundraising, overcoming failures, finding product-market fit, and scaling tech products globally.',
    objective: 'Bridge academic engineering with real-world business realities and inspire entrepreneurial mindsets.',
    timeline: 'Monthly Series',
    iconName: 'Mic',
    badge: 'Industry Connect',
    statsLabel: '20+ Guest Leaders',
    ctaText: 'View Past Sessions',
    ctaLink: '/events'
  },
  {
    id: 'init-04',
    title: 'Hands-On Tech Bootcamps',
    shortDescription: 'Deep-dive technical training in Full-Stack Engineering, AI/ML, Cloud Native, and Product Design.',
    fullDescription: 'Intensive weekend bootcamps led by senior engineering mentors to elevate student technical capabilities, ensuring our members are equipped with cutting-edge industry tools.',
    objective: 'Upskill engineers with practical modern tech stacks not covered in traditional syllabi.',
    timeline: 'Quarterly',
    iconName: 'Code',
    badge: 'Technical Upskilling',
    statsLabel: '300+ Certified',
    ctaText: 'Register for Bootcamps',
    ctaLink: '/events'
  },
  {
    id: 'init-05',
    title: 'NexHacks Flagship Hackathon',
    shortDescription: 'Central India’s high-energy 36-hour sprint uniting builders, designers, and innovators.',
    fullDescription: 'Our premier annual hackathon with tracks in AI, FinTech, CleanTech, and Web3, bringing together 300+ students from across top engineering institutions.',
    objective: 'Foster high-pressure creative problem solving, rapid prototyping, and cross-disciplinary collaboration.',
    timeline: 'Annual Flagship',
    iconName: 'Terminal',
    badge: 'Grand Hackathon',
    statsLabel: '₹1.5 Lakhs Prize Pool',
    ctaText: 'Hackathon Details',
    ctaLink: '/events'
  },
  {
    id: 'init-06',
    title: 'Mentorship & Angel Office Hours',
    shortDescription: 'Structured 1-on-1 access to venture mentors, alumni founders, and technical architects.',
    fullDescription: 'Scheduled office hours where student entrepreneurs can present their pitch decks, review system architecture, and receive actionable feedback.',
    objective: 'Provide personalized strategic direction to prevent early-stage startup pitfalls.',
    timeline: 'Bi-Weekly',
    iconName: 'Compass',
    badge: '1-on-1 Guidance',
    statsLabel: '15+ Industry Mentors',
    ctaText: 'Book Office Hours',
    ctaLink: '/contact'
  },
  {
    id: 'init-07',
    title: 'IPR & Patent Support Cell',
    shortDescription: 'Assistance for students in patent filing, copyright registration, and technology transfer.',
    fullDescription: 'In coordination with ACET Research & Development council, we assist student inventors with prior-art searches, documentation, and filing subsidies.',
    objective: 'Protect indigenous student inventions and facilitate formal commercialization.',
    timeline: 'Continuous Support',
    iconName: 'ShieldCheck',
    badge: 'Legal & IPR',
    statsLabel: '5 Patents Filed',
    ctaText: 'Consult IPR Cell',
    ctaLink: '/contact'
  },
  {
    id: 'init-08',
    title: 'Campus Startup Showcase',
    shortDescription: 'Annual demo day connecting collegiate ventures directly with regional angel networks and media.',
    fullDescription: 'An exclusive exhibition where selected Nexora student startups pitch live in front of angel syndicates, corporate innovation heads, and press representatives.',
    objective: 'Secure early funding, beta customers, and media validation for student enterprises.',
    timeline: 'Annual Demo Day',
    iconName: 'Award',
    badge: 'Demo Day',
    statsLabel: '10+ Venture Funds',
    ctaText: 'Pitch on Demo Day',
    ctaLink: '/join'
  }
];

export const initialTeamMembers: TeamMember[] = [
  // Leadership
  {
    id: 'tm-01',
    name: 'President [Designate]',
    position: 'President',
    department: 'Leadership',
    bio: 'Guiding the overarching vision, strategic partnerships, and institutional growth of Nexora E-Cell across ACET.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    year: 'Final Year',
    branch: 'Computer Science & Engineering',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com',
    order: 1
  },
  {
    id: 'tm-02',
    name: 'Vice President [Designate]',
    position: 'Vice President',
    department: 'Leadership',
    bio: 'Overseeing operations, cross-departmental coordination, and community execution across all flagship initiatives.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    year: 'Final Year',
    branch: 'Information Technology',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    github: 'https://github.com',
    order: 2
  },
  {
    id: 'tm-03',
    name: 'Secretary [Designate]',
    position: 'Secretary',
    department: 'Leadership',
    bio: 'Managing documentation, institutional communication, inter-college alliances, and administration.',
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    year: 'Third Year',
    branch: 'Electronics & Telecommunication',
    linkedin: 'https://linkedin.com',
    order: 3
  },
  {
    id: 'tm-04',
    name: 'Joint Secretary [Designate]',
    position: 'Joint Secretary',
    department: 'Leadership',
    bio: 'Assisting operational governance, resource management, and event logistics across the E-Cell ecosystem.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    year: 'Third Year',
    branch: 'Computer Science & Engineering',
    linkedin: 'https://linkedin.com',
    order: 4
  },
  // Technical Team
  {
    id: 'tm-05',
    name: 'Head of Technical [Designate]',
    position: 'Head of Technical',
    department: 'Technical',
    bio: 'Leading digital platforms, hackathon infrastructure, open-source initiatives, and engineering standards.',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    year: 'Final Year',
    branch: 'Computer Science & Engineering',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    order: 5
  },
  {
    id: 'tm-06',
    name: 'Technical Coordinator [Designate]',
    position: 'Technical Coordinator',
    department: 'Technical',
    bio: 'Managing cloud deployments, web infrastructure, and student developer workshops.',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    year: 'Third Year',
    branch: 'Artificial Intelligence & Data Science',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    order: 6
  },
  // Marketing & Design
  {
    id: 'tm-07',
    name: 'Head of Design [Designate]',
    position: 'Head of Design',
    department: 'Design',
    bio: 'Crafting brand aesthetics, visual identity, UI/UX systems, and event creative direction.',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
    year: 'Third Year',
    branch: 'Computer Science & Engineering',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    order: 7
  },
  {
    id: 'tm-08',
    name: 'Head of Marketing [Designate]',
    position: 'Head of Marketing',
    department: 'Marketing',
    bio: 'Driving outreach campaigns, community engagement, brand storytelling, and digital media presence.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    year: 'Third Year',
    branch: 'Information Technology',
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    order: 8
  },
  // PR & Outreach
  {
    id: 'tm-09',
    name: 'Head of PR & Outreach [Designate]',
    position: 'Head of PR & Outreach',
    department: 'PR & Outreach',
    bio: 'Building relationships with external venture funds, corporate sponsors, media outlets, and speaker networks.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    year: 'Final Year',
    branch: 'Electronics Engineering',
    linkedin: 'https://linkedin.com',
    order: 9
  },
  // Operations & Events
  {
    id: 'tm-10',
    name: 'Head of Operations [Designate]',
    position: 'Head of Operations',
    department: 'Operations',
    bio: 'Directing campus logistics, venue preparations, volunteer management, and day-of execution.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    year: 'Third Year',
    branch: 'Mechanical Engineering',
    linkedin: 'https://linkedin.com',
    order: 10
  }
];

export const initialAchievements: Achievement[] = [
  {
    id: 'ach-01',
    title: '500+ Active Students Engaged',
    category: 'Milestone',
    date: '2026',
    description: 'Empowered over 500+ aspiring engineers and innovators across ACET through bootcamps, ideathons, and mentorship cohorts.',
    metricNumber: '500+',
    metricLabel: 'Students Engaged'
  },
  {
    id: 'ach-02',
    title: '24+ High-Impact Events & Summits',
    category: 'Milestone',
    date: '2025-2026',
    description: 'Conducted a dynamic series of hackathons, startup bootcamps, founder keynotes, and innovation challenges.',
    metricNumber: '24+',
    metricLabel: 'Events Conducted'
  },
  {
    id: 'ach-03',
    title: '8 Student Ventures Incubated',
    category: 'Startup Incubated',
    date: '2026',
    description: 'Nurtured 8 campus-born technological prototypes into early-stage ventures with working prototypes and seed grants.',
    metricNumber: '8+',
    metricLabel: 'Startups Supported'
  },
  {
    id: 'ach-04',
    title: 'Top 3 Podiums in State-Level Hackathons',
    category: 'Hackathon Win',
    date: '2026',
    description: 'Nexora-mentored teams clinched 1st and 2nd runner-up positions in regional smart mobility and AI innovation contests.',
    metricNumber: '12+',
    metricLabel: 'Hackathon Podiums'
  },
  {
    id: 'ach-05',
    title: '18+ Industry & Venture Network Partnerships',
    category: 'Recognition',
    date: '2025-2026',
    description: 'Established collaborative MOUs with regional incubators, angel investors, and leading tech organizations.',
    metricNumber: '18+',
    metricLabel: 'Industry Alliances'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'NexHacks 36-Hour Sprint Arena',
    category: 'Hackathons',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    caption: 'Student teams collaborating late into the night during the 36-hour sprint.',
    date: '2026-07-22'
  },
  {
    id: 'gal-02',
    title: 'AI & Web3 Startup Masterclass',
    category: 'Workshops',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    caption: 'Interactive workshop on full-stack AI development and rapid prototyping.',
    date: '2026-06-15'
  },
  {
    id: 'gal-03',
    title: 'Founder Fireside Keynote',
    category: 'Speaker Sessions',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    caption: 'Keynote address on zero-to-one product development at ACET Main Auditorium.',
    date: '2026-05-10'
  },
  {
    id: 'gal-04',
    title: 'Campus Innovation Showcase',
    category: 'Campus Life',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    caption: 'Students demonstrating hardware prototypes and IoT smart grid systems.',
    date: '2026-04-18'
  },
  {
    id: 'gal-05',
    title: 'Ideathon Pitch Finale',
    category: 'Competitions',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Finalists presenting their clean-tech ventures to the jury panel.',
    date: '2026-03-25'
  },
  {
    id: 'gal-06',
    title: 'Nexora Core Team Strategy Session',
    category: 'Campus Life',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    caption: 'Executive team mapping the annual event calendar and mentorship initiatives.',
    date: '2026-02-14'
  }
];

export const initialJoinApplications: JoinApplication[] = [
  {
    id: 'app-01',
    fullName: 'Mohammad Farhan',
    email: 'farhan.student@acet.ac.in',
    phone: '+91 98765 43210',
    collegeYear: '2nd Year',
    branch: 'Computer Science & Engineering',
    department: 'Technical',
    skills: 'React, Node.js, Python, Tailwind CSS, Git',
    portfolioUrl: 'https://github.com/example',
    githubUrl: 'https://github.com/example',
    whyJoin: 'I want to build production software for the college E-Cell and contribute to organizing high-caliber hackathons.',
    appliedAt: '2026-08-05T14:20:00Z',
    status: 'shortlisted'
  },
  {
    id: 'app-02',
    fullName: 'Ayesha Siddiqui',
    email: 'ayesha.des@acet.ac.in',
    phone: '+91 98765 11223',
    collegeYear: '3rd Year',
    branch: 'Information Technology',
    department: 'Design',
    skills: 'Figma, Adobe Illustrator, 3D Spline, Motion Graphics',
    portfolioUrl: 'https://behance.net/example',
    whyJoin: 'Passionate about shaping the visual branding and futuristic aesthetic of Nexora E-Cell.',
    appliedAt: '2026-08-06T10:15:00Z',
    status: 'pending'
  }
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: 'msg-01',
    fullName: 'TechCorp Ventures',
    email: 'partnerships@techcorp.io',
    subject: 'Sponsorship & Mentorship Partnership for NexHacks 2026',
    message: 'We are keen to sponsor the upcoming NexHacks 2026 hackathon and provide cloud computing credits and mentors for student teams.',
    type: 'sponsorship',
    receivedAt: '2026-08-07T09:30:00Z',
    status: 'unread'
  },
  {
    id: 'msg-02',
    fullName: 'Tanmay Joshi',
    email: 'tanmay@example.com',
    subject: 'Inquiry regarding Nexora Monthly Challenge Submission',
    message: 'Hello team, I wanted to clarify whether cross-branch teams are allowed for the August Monthly Challenge.',
    type: 'general',
    receivedAt: '2026-08-08T11:00:00Z',
    status: 'read'
  }
];
