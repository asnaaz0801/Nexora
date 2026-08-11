-- =====================================================
-- NEXORA E-CELL - SUPABASE DATABASE SCHEMA
-- Updated: 2026-08-12
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TEAM MEMBERS
-- =====================================================
CREATE TABLE IF NOT EXISTS team_members (
  id           TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name         TEXT NOT NULL,
  position     TEXT NOT NULL,
  department   TEXT NOT NULL CHECK (department IN ('Leadership', 'Technical', 'Marketing', 'Design', 'Events', 'PR & Outreach', 'Operations', 'Content')),
  bio          TEXT DEFAULT '',
  photo        TEXT DEFAULT '',
  year         TEXT DEFAULT '',
  branch       TEXT DEFAULT '',
  linkedin     TEXT DEFAULT '',
  instagram    TEXT DEFAULT '',
  github       TEXT DEFAULT '',
  email        TEXT DEFAULT '',
  display_order INTEGER DEFAULT 1,
  is_active    BOOLEAN DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- EVENTS
-- =====================================================
CREATE TABLE IF NOT EXISTS events (
  id                    TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title                 TEXT NOT NULL,
  slug                  TEXT UNIQUE,
  tagline               TEXT DEFAULT '',
  description           TEXT NOT NULL,
  full_content          TEXT DEFAULT '',
  category              TEXT NOT NULL CHECK (category IN ('Workshop', 'Hackathon', 'Startup Event', 'Competition', 'Seminar', 'Networking', 'Bootcamp')),
  status                TEXT NOT NULL CHECK (status IN ('upcoming', 'live', 'completed')) DEFAULT 'upcoming',
  banner_image          TEXT DEFAULT '',
  date                  DATE NOT NULL,
  display_date          TEXT DEFAULT '',
  time                  TEXT DEFAULT '',
  venue                 TEXT DEFAULT '',
  registration_deadline DATE,
  registration_open     BOOLEAN DEFAULT true,
  registration_link     TEXT DEFAULT '',
  max_participants      INTEGER DEFAULT 200,
  registered_count      INTEGER DEFAULT 0,
  is_featured           BOOLEAN DEFAULT false,
  is_published          BOOLEAN DEFAULT false,
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- CONTACT MESSAGES
-- =====================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT NOT NULL,
  message     TEXT NOT NULL,
  type        TEXT DEFAULT 'general' CHECK (type IN ('general', 'partnership', 'sponsorship', 'mentorship')),
  status      TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  received_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- SITE CONTENT (CMS Table)
-- =====================================================
CREATE TABLE IF NOT EXISTS site_content (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section       TEXT NOT NULL,
  content_key   TEXT NOT NULL,
  content_value TEXT NOT NULL DEFAULT '',
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (section, content_key)
);

-- =====================================================
-- EVENT REGISTRATIONS
-- =====================================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  event_id      TEXT REFERENCES events(id) ON DELETE CASCADE,
  event_title   TEXT NOT NULL,
  full_name     TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT DEFAULT '',
  college_year  TEXT DEFAULT '',
  branch        TEXT DEFAULT '',
  team_name     TEXT DEFAULT '',
  team_members  TEXT DEFAULT '',
  registered_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- ─── TEAM MEMBERS ─────────────────────────────────
-- Public: Can read active members only
DROP POLICY IF EXISTS "team_members_public_read" ON team_members;
CREATE POLICY "team_members_public_read" ON team_members
  FOR SELECT USING (is_active = true);

-- Admin: Full access (restricted to specific email via JWT claim)
DROP POLICY IF EXISTS "team_members_admin_all" ON team_members;
CREATE POLICY "team_members_admin_all" ON team_members
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'asnaaz0801@gmail.com'
  );

-- ─── EVENTS ───────────────────────────────────────
-- Public: Can read published events only
DROP POLICY IF EXISTS "events_public_read" ON events;
CREATE POLICY "events_public_read" ON events
  FOR SELECT USING (is_published = true);

-- Admin: Full access
DROP POLICY IF EXISTS "events_admin_all" ON events;
CREATE POLICY "events_admin_all" ON events
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'asnaaz0801@gmail.com'
  );

-- ─── SITE CONTENT ─────────────────────────────────
-- Public: Can read all site content (it's public content)
DROP POLICY IF EXISTS "site_content_public_read" ON site_content;
CREATE POLICY "site_content_public_read" ON site_content
  FOR SELECT USING (true);

-- Admin: Full write access
DROP POLICY IF EXISTS "site_content_admin_write" ON site_content;
CREATE POLICY "site_content_admin_write" ON site_content
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'asnaaz0801@gmail.com'
  );

-- ─── CONTACT MESSAGES ─────────────────────────────
-- Public: Anyone can insert (submit a message)
DROP POLICY IF EXISTS "contact_messages_public_insert" ON contact_messages;
CREATE POLICY "contact_messages_public_insert" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Admin: Can read all messages and update status
DROP POLICY IF EXISTS "contact_messages_admin_all" ON contact_messages;
CREATE POLICY "contact_messages_admin_all" ON contact_messages
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'asnaaz0801@gmail.com'
  );

-- ─── EVENT REGISTRATIONS ──────────────────────────
-- Public: Anyone can register for events
DROP POLICY IF EXISTS "event_registrations_public_insert" ON event_registrations;
CREATE POLICY "event_registrations_public_insert" ON event_registrations
  FOR INSERT WITH CHECK (true);

-- Admin: Can read all registrations
DROP POLICY IF EXISTS "event_registrations_admin_read" ON event_registrations;
CREATE POLICY "event_registrations_admin_read" ON event_registrations
  FOR ALL USING (
    auth.jwt() ->> 'email' = 'asnaaz0801@gmail.com'
  );

-- =====================================================
-- STORAGE BUCKET & POLICIES
-- Create a public bucket named "team-images"
-- =====================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('team-images', 'team-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public team images read" ON storage.objects;
CREATE POLICY "Public team images read" ON storage.objects FOR SELECT USING (bucket_id = 'team-images');

DROP POLICY IF EXISTS "Public team images insert" ON storage.objects;
CREATE POLICY "Public team images insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'team-images');

-- =====================================================
-- SEED DEFAULT SITE CONTENT
-- =====================================================
INSERT INTO site_content (section, content_key, content_value) VALUES
  ('home', 'hero_title', 'Where Ideas Become Impact.'),
  ('home', 'hero_description', 'Building the next generation of innovators, entrepreneurs, leaders, and changemakers at Anjuman College of Engineering & Technology.'),
  ('home', 'cta_primary_text', 'Explore Events'),
  ('home', 'cta_primary_link', '/events'),
  ('home', 'cta_secondary_text', 'Meet Our Team'),
  ('home', 'cta_secondary_link', '/team'),
  ('about', 'heading', 'Fostering Innovation & Leadership at ACET'),
  ('about', 'description', 'Nexora is the official Entrepreneurship Cell of Anjuman College of Engineering and Technology, created to nurture innovation, problem-solving, and venture building among ambitious students.'),
  ('vision', 'heading', 'Our Vision'),
  ('vision', 'content', 'To build a vibrant entrepreneurial ecosystem where innovation thrives, ideas transform into impactful ventures, and every student is empowered to become a visionary leader, problem solver, and changemaker for society.'),
  ('mission', 'heading', 'Our Mission'),
  ('mission', 'content', 'To nurture entrepreneurial talent by organizing workshops, hackathons, startup events, mentorship programs, and industry collaborations that empower students to innovate, lead, and transform ideas into sustainable ventures.'),
  ('contact', 'heading', 'Get In Touch'),
  ('contact', 'description', 'Have a question, partnership proposal, or want to collaborate with Nexora E-Cell? We''d love to hear from you.'),
  ('contact', 'email', 'ecell@acet.ac.in'),
  ('contact', 'phone', ''),
  ('contact', 'address', 'Nexora E-Cell, Innovation Block, Anjuman College of Engineering & Technology, Mangalwari Bazaar Road, Sadar, Nagpur, Maharashtra 440001'),
  ('contact', 'map_url', ''),
  ('footer', 'description', 'Where Ideas Become Impact. Building the next generation of innovators, entrepreneurs, leaders, and changemakers at Anjuman College of Engineering and Technology.'),
  ('footer', 'instagram_url', 'https://instagram.com'),
  ('footer', 'linkedin_url', 'https://linkedin.com'),
  ('footer', 'github_url', 'https://github.com'),
  ('footer', 'email', 'ecell@acet.ac.in'),
  ('footer', 'phone', ''),
  ('footer', 'address', 'Nexora E-Cell, Anjuman College of Engineering & Technology, Nagpur'),
  ('footer', 'copyright_text', '© 2026 Nexora E-Cell. All Rights Reserved.')
ON CONFLICT (section, content_key) DO NOTHING;
