import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Fallback SVG Data URIs for offline or broken image URLs
 */
export const DEFAULT_AVATAR_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="%230D1117"/><circle cx="200" cy="140" r="65" fill="%231E293B" stroke="%2300D2FF" stroke-width="3"/><path d="M90 340C90 279.249 139.249 230 200 230C260.751 230 310 279.249 310 340H90Z" fill="%231E293B" stroke="%2300D2FF" stroke-width="3"/></svg>`;

export const DEFAULT_BANNER_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450" fill="none"><rect width="800" height="450" fill="%230D1117"/><rect x="15" y="15" width="770" height="420" rx="16" fill="%23161F2E" stroke="%23334155" stroke-width="2"/><path d="M250 300L350 180L450 280L550 150L650 300H250Z" fill="%231E293B" stroke="%2300D2FF" stroke-width="2"/><circle cx="300" cy="140" r="35" fill="%2300D2FF" fill-opacity="0.2" stroke="%2300D2FF" stroke-width="2"/><text x="400" y="370" font-family="sans-serif" font-size="22" font-weight="bold" fill="%2394A3B8" text-anchor="middle">NEXORA E-CELL</text></svg>`;

export function generateInitialsAvatar(name?: string): string {
  const cleanName = (name || 'Member').trim();
  const parts = cleanName.split(/\s+/).filter(Boolean);
  let initials = 'N';
  if (parts.length >= 2) {
    initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  } else if (parts.length === 1 && parts[0].length > 0) {
    initials = parts[0].substring(0, 2).toUpperCase();
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none"><rect width="400" height="400" fill="%230D1117"/><circle cx="200" cy="200" r="175" fill="%23161F2E" stroke="%2300D2FF" stroke-width="6"/><text x="200" y="245" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="150" font-weight="800" fill="%2300D2FF" text-anchor="middle">${initials}</text></svg>`;

  return `data:image/svg+xml;utf8,${svg}`;
}

export function getAvatarFallback(name?: string): string {
  if (name && name.trim()) {
    return generateInitialsAvatar(name);
  }
  return DEFAULT_AVATAR_SVG;
}

/**
 * Event handler attached to <img> elements to gracefully handle broken image URLs.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackUrl?: string
) {
  const target = e.currentTarget;
  if (target.dataset.hasFailed) return; // Prevent infinite loop if fallback fails
  target.dataset.hasFailed = 'true';
  target.src = fallbackUrl || DEFAULT_BANNER_SVG;
}

/**
 * Event handler attached to team member <img> elements to fall back to dynamic initials SVG avatar.
 */
export function handleAvatarError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  name?: string
) {
  const target = e.currentTarget;
  if (target.dataset.hasFailed) return; // Prevent infinite loop if fallback fails
  target.dataset.hasFailed = 'true';
  target.src = generateInitialsAvatar(name);
}

/**
 * Resizes and compresses an image file using HTML Canvas to produce a lightweight Data URL.
 * Typically reduces a 2MB–8MB photo to ~30KB–60KB WebP/JPEG data URL.
 */
export function compressImageFile(
  file: File,
  maxWidth = 600,
  maxHeight = 600,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio preserving dimensions
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to reader result if canvas fails
          resolve(e.target?.result as string);
          return;
        }

        // Draw and compress image
        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first, fallback to jpeg
        let dataUrl = canvas.toDataURL('image/webp', quality);
        if (!dataUrl.startsWith('data:image/webp')) {
          dataUrl = canvas.toDataURL('image/jpeg', quality);
        }

        resolve(dataUrl);
      };

      img.onerror = (err) => reject(err);
      img.src = e.target?.result as string;
    };

    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Attempts to upload an image to Supabase Storage.
 * If Supabase is not configured, storage is full/restricted, or RLS error occurs,
 * it gracefully falls back to a compressed lightweight Base64 Data URL.
 */
export async function uploadOrCompressPhoto(
  file: File,
  bucketName = 'team-images'
): Promise<string> {
  try {
    if (isSupabaseConfigured && supabase) {
      const ext = file.name.split('.').pop() || 'jpg';
      const fileName = `${bucketName}-${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, { upsert: true });

      if (!error) {
        const { data } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);

        if (data?.publicUrl) {
          return data.publicUrl;
        }
      } else {
        console.warn(`Supabase storage bucket "${bucketName}" upload notice:`, error.message);
      }
    }
  } catch (err) {
    console.warn('Supabase storage upload fallback:', err);
  }

  // Fail-safe: compressed Data URL that fits inside LocalStorage & DB text fields
  return compressImageFile(file);
}
