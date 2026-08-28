-- =========================================================================
-- NEXORA E-CELL - SITE CONTENT UPDATES & EDITABLE FIELDS SEED SCRIPT
-- Script File: update_editable_fields_schema.sql
-- Description: Inserts / updates all admin-editable fields from the 
--              Mission section, Quick Stats highlights ticker, and Footer.
-- Run this in your Supabase SQL Editor to initialize these fields in the DB.
-- =========================================================================

-- 1. Ensure the site_content table exists
CREATE TABLE IF NOT EXISTS site_content (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section       TEXT NOT NULL,
  content_key   TEXT NOT NULL,
  content_value TEXT NOT NULL DEFAULT '',
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE (section, content_key)
);

-- 2. Enable RLS and set public access policy if not already present
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_content_all_access" ON site_content;
CREATE POLICY "site_content_all_access" ON site_content
  FOR ALL USING (true) WITH CHECK (true);

-- 3. Upsert default values for all Admin Editable Fields
INSERT INTO site_content (section, content_key, content_value) VALUES
  -- -----------------------------------------------------------------------
  -- IMAGE 1: MISSION SECTION & 8 FOCUS AREA CARDS
  -- -----------------------------------------------------------------------
  ('mission', 'badge', 'OUR MISSION'),
  ('mission', 'heading', 'Transforming Ideas into Sustainable Ventures'),
  ('mission', 'quote', 'To nurture entrepreneurial talent by organizing workshops, hackathons, startup events, mentorship programs, and industry collaborations that empower students to innovate, lead, and transform ideas into sustainable ventures.'),

  ('mission', 'card_1_title', 'Workshops'),
  ('mission', 'card_1_desc', 'Deep-dive sessions on system design, venture economics, and rapid prototyping.'),

  ('mission', 'card_2_title', 'Hackathons'),
  ('mission', 'card_2_desc', '36-hour sprint challenges solving smart infrastructure, AI, and civic tech problems.'),

  ('mission', 'card_3_title', 'Startup Events'),
  ('mission', 'card_3_desc', 'Annual E-Summits, pitch competitions, and regional venture expos.'),

  ('mission', 'card_4_title', 'Mentorship'),
  ('mission', 'card_4_desc', 'Structured guidance from alumni founders, architects, and angel investors.'),

  ('mission', 'card_5_title', 'Industry Collaboration'),
  ('mission', 'card_5_desc', 'Partnerships with tech companies, incubation centers, and government bodies.'),

  ('mission', 'card_6_title', 'Innovation'),
  ('mission', 'card_6_desc', 'Fostering original patents, novel architectures, and experimental hardware.'),

  ('mission', 'card_7_title', 'Leadership'),
  ('mission', 'card_7_desc', 'Cultivating managerial resilience, team coordination, and strategic communication.'),

  ('mission', 'card_8_title', 'Sustainable Ventures'),
  ('mission', 'card_8_desc', 'Transforming collegiate prototypes into revenue-generating, scalable businesses.'),

  -- -----------------------------------------------------------------------
  -- IMAGE 2: QUICK HIGHLIGHTS / STATS TICKER BAR
  -- -----------------------------------------------------------------------
  ('home', 'stat_1_label', '500+ Students'),
  ('home', 'stat_1_sub', 'Engaged Community'),

  ('home', 'stat_2_label', '24+ Events'),
  ('home', 'stat_2_sub', 'Summits & Hackathons'),

  ('home', 'stat_3_label', 'Active Cell'),
  ('home', 'stat_3_sub', 'Innovation Driven'),

  ('home', 'stat_4_label', '8+ Startups'),
  ('home', 'stat_4_sub', 'Incubated Ideas'),

  -- -----------------------------------------------------------------------
  -- IMAGE 3: FOOTER BRANDING, BADGES, ADDRESS & INITIATIVE LINKS
  -- -----------------------------------------------------------------------
  ('footer', 'badge_text', 'An official initiative of ACET Nagpur'),
  ('footer', 'slogan', 'DREAM. BUILD. LEAD.'),
  ('footer', 'campus_address', 'Nexora E-Cell, Innovation Block, Anjuman College of Engineering & Technology, Mangalwari Bazaar Road, Sadar, Nagpur, Maharashtra 440001'),
  ('footer', 'college_initiative_text', 'An initiative of Anjuman College of Engineering and Technology'),
  ('footer', 'college_url', 'https://anjumanengg.edu.in/'),
  ('footer', 'college_text', 'anjumanengg.edu.in'),
  ('footer', 'description', 'Where Ideas Become Impact. Building the next generation of innovators, entrepreneurs, leaders, and changemakers at Anjuman College of Engineering and Technology.'),
  ('footer', 'copyright_text', '© 2026 Nexora E-Cell. All Rights Reserved.')

ON CONFLICT (section, content_key) 
DO UPDATE SET 
  content_value = EXCLUDED.content_value,
  updated_at = NOW();

-- -----------------------------------------------------------------------
-- Verification Query
-- -----------------------------------------------------------------------
-- SELECT * FROM site_content WHERE section IN ('mission', 'home', 'footer') ORDER BY section, content_key;
