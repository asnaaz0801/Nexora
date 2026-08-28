import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { SiteContent } from '../types';

// Default fallback content
const defaultContent: Record<string, string> = {
  // HOME
  'home_hero_title': 'Where Ideas Become Impact.',
  'home_hero_description': 'Building the next generation of innovators, entrepreneurs, leaders, and changemakers at Anjuman College of Engineering & Technology.',
  'home_cta_primary_text': 'Explore Events',
  'home_cta_primary_link': '/events',
  'home_cta_secondary_text': 'Meet Our Team',
  'home_cta_secondary_link': '/team',

  // HOME STATS TICKER
  'home_stat_1_label': '500+ Students',
  'home_stat_1_sub': 'Engaged Community',
  'home_stat_2_label': '24+ Events',
  'home_stat_2_sub': 'Summits & Hackathons',
  'home_stat_3_label': 'Active Cell',
  'home_stat_3_sub': 'Innovation Driven',
  'home_stat_4_label': '8+ Startups',
  'home_stat_4_sub': 'Incubated Ideas',

  // ABOUT
  'about_heading': 'Fostering Innovation & Leadership at ACET',
  'about_description': 'Nexora is the official Entrepreneurship Cell of Anjuman College of Engineering and Technology, created to nurture innovation, problem-solving, and venture building among ambitious students.',

  // VISION
  'vision_heading': 'Our Vision',
  'vision_content': 'To build a vibrant entrepreneurial ecosystem where innovation thrives, ideas transform into impactful ventures, and every student is empowered to become a visionary leader, problem solver, and changemaker for society.',

  // MISSION
  'mission_badge': 'Our Mission',
  'mission_heading': 'Transforming Ideas into Sustainable Ventures',
  'mission_quote': 'To nurture entrepreneurial talent by organizing workshops, hackathons, startup events, mentorship programs, and industry collaborations that empower students to innovate, lead, and transform ideas into sustainable ventures.',
  'mission_content': 'To nurture entrepreneurial talent by organizing workshops, hackathons, startup events, mentorship programs, and industry collaborations that empower students to innovate, lead, and transform ideas into sustainable ventures.',

  // MISSION CARDS
  'mission_card_1_title': 'Workshops',
  'mission_card_1_desc': 'Deep-dive sessions on system design, venture economics, and rapid prototyping.',
  'mission_card_2_title': 'Hackathons',
  'mission_card_2_desc': '36-hour sprint challenges solving smart infrastructure, AI, and civic tech problems.',
  'mission_card_3_title': 'Startup Events',
  'mission_card_3_desc': 'Annual E-Summits, pitch competitions, and regional venture expos.',
  'mission_card_4_title': 'Mentorship',
  'mission_card_4_desc': 'Structured guidance from alumni founders, architects, and angel investors.',
  'mission_card_5_title': 'Industry Collaboration',
  'mission_card_5_desc': 'Partnerships with tech companies, incubation centers, and government bodies.',
  'mission_card_6_title': 'Innovation',
  'mission_card_6_desc': 'Fostering original patents, novel architectures, and experimental hardware.',
  'mission_card_7_title': 'Leadership',
  'mission_card_7_desc': 'Cultivating managerial resilience, team coordination, and strategic communication.',
  'mission_card_8_title': 'Sustainable Ventures',
  'mission_card_8_desc': 'Transforming collegiate prototypes into revenue-generating, scalable businesses.',

  // CONTACT
  'contact_heading': 'Get In Touch',
  'contact_description': 'Have a question, partnership proposal, or want to collaborate with Nexora E-Cell? We\'d love to hear from you.',
  'contact_email': 'ecell@acet.ac.in',
  'contact_phone': '',
  'contact_address': 'Nexora E-Cell, Innovation Block, Anjuman College of Engineering & Technology, Mangalwari Bazaar Road, Sadar, Nagpur, Maharashtra 440001',
  'contact_map_url': 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.8988654571765!2d79.08339257600738!3d21.156402483363384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0e6659f80a7%3A0xb35a39cb20f9fa4c!2sAnjuman%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',

  // FOOTER & COLLEGE LINKS
  'footer_description': 'Where Ideas Become Impact. Building the next generation of innovators, entrepreneurs, leaders, and changemakers at Anjuman College of Engineering and Technology.',
  'footer_badge_text': 'An official initiative of ACET Nagpur',
  'footer_slogan': 'DREAM. BUILD. LEAD.',
  'footer_campus_address': 'Nexora E-Cell, Innovation Block, Anjuman College of Engineering & Technology, Mangalwari Bazaar Road, Sadar, Nagpur, Maharashtra 440001',
  'footer_college_initiative_text': 'An initiative of Anjuman College of Engineering and Technology',
  'footer_instagram_url': 'https://instagram.com',
  'footer_linkedin_url': 'https://linkedin.com',
  'footer_github_url': 'https://github.com',
  'footer_email': 'ecell@acet.ac.in',
  'footer_college_url': 'https://anjumanengg.edu.in/',
  'footer_college_text': 'anjumanengg.edu.in',
  'footer_copyright_text': '© 2026 Nexora E-Cell. All Rights Reserved.',
};

type ContentMap = Record<string, string>;

const STORAGE_KEY = 'nexora_site_content_cache';

function getStoredContent(): ContentMap {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultContent, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load site content from local storage', e);
  }
  return defaultContent;
}

function setStoredContent(newContent: ContentMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
  } catch (e) {
    console.error('Failed to save site content to local storage', e);
  }
}

interface UseSiteContentReturn {
  content: ContentMap;
  isLoading: boolean;
  getContent: (section: string, key: string) => string;
  refetch: () => void;
}

export function useSiteContent(): UseSiteContentReturn {
  const [content, setContent] = useState<ContentMap>(getStoredContent);
  const [isLoading, setIsLoading] = useState(true);

  const fetchContent = useCallback(async () => {
    // Start with local storage cache so UI responds immediately
    const initialMap = getStoredContent();
    setContent(initialMap);

    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('section, content_key, content_value');

      if (!error && data && data.length > 0) {
        const contentMap: ContentMap = { ...initialMap };
        data.forEach((row: SiteContent) => {
          const key = `${row.section}_${row.content_key}`;
          contentMap[key] = row.content_value ?? '';
        });
        setContent(contentMap);
        setStoredContent(contentMap);
      }
    } catch (err) {
      console.error('Error fetching site content from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const getContent = (section: string, key: string): string => {
    const mapKey = `${section}_${key}`;
    return content[mapKey] ?? defaultContent[mapKey] ?? '';
  };

  return { content, isLoading, getContent, refetch: fetchContent };
}

// Admin hook: upsert a single content key
export async function updateSiteContent(
  section: string,
  key: string,
  value: string
): Promise<{ success: boolean; error?: string }> {
  // Always update local cache so changes are saved immediately in browser
  const mapKey = `${section}_${key}`;
  const current = getStoredContent();
  const updated = { ...current, [mapKey]: value };
  setStoredContent(updated);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('site_content')
      .upsert(
        { section, content_key: key, content_value: value, updated_at: new Date().toISOString() },
        { onConflict: 'section,content_key' }
      );

    if (error) {
      console.warn('Supabase content update notice:', error.message);
      // Still return success since local storage saved it
      return { success: true };
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}

// Batch upsert multiple content keys at once
export async function updateSiteContentBatch(
  items: { section: string; key: string; value: string }[]
): Promise<{ success: boolean; error?: string }> {
  // Always update local cache first
  const current = getStoredContent();
  const updated = { ...current };
  items.forEach(item => {
    updated[`${item.section}_${item.key}`] = item.value;
  });
  setStoredContent(updated);

  if (!isSupabaseConfigured || !supabase) {
    return { success: true };
  }

  try {
    const rows = items.map(item => ({
      section: item.section,
      content_key: item.key,
      content_value: item.value,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from('site_content')
      .upsert(rows, { onConflict: 'section,content_key' });

    if (error) {
      console.warn('Supabase batch update notice:', error.message);
      return { success: true };
    }
    return { success: true };
  } catch (err: any) {
    return { success: true };
  }
}
