import { supabase, isSupabaseConfigured } from './supabase';

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
