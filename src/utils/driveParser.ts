/**
 * Utility to parse Google Drive and YouTube URLs automatically into embeddable media & thumbnails.
 */

export interface ParsedMedia {
  videoUrl: string;
  thumbnailUrl: string;
  isDrive: boolean;
  isYoutube: boolean;
  mediaId: string | null;
}

/**
 * Extracts Google Drive File ID from various share link formats.
 */
export function extractDriveFileId(url: string): string | null {
  if (!url) return null;
  // Match /file/d/FILE_ID/
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];

  // Match ?id=FILE_ID or &id=FILE_ID
  const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (idParamMatch && idParamMatch[1]) return idParamMatch[1];

  return null;
}

/**
 * Extracts YouTube Video ID from various link formats.
 */
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  return ytMatch && ytMatch[1] ? ytMatch[1] : null;
}

/**
 * Parses any input media URL and generates the appropriate embed URL and thumbnail image URL.
 */
export function parseMediaUrl(inputMediaUrl: string, inputThumbnailUrl?: string): ParsedMedia {
  const mediaUrl = inputMediaUrl?.trim() || "";
  let thumbnailUrl = inputThumbnailUrl?.trim() || "";

  // 1. Google Drive Link
  const driveId = extractDriveFileId(mediaUrl) || extractDriveFileId(thumbnailUrl);
  if (driveId) {
    const embedVideoUrl = `https://drive.google.com/file/d/${driveId}/preview`;
    const driveThumbnail = `https://images.weserv.nl/?url=https://drive.google.com/uc?id=${driveId}`;
    return {
      videoUrl: embedVideoUrl,
      thumbnailUrl: thumbnailUrl && !thumbnailUrl.includes("drive.google.com") ? thumbnailUrl : driveThumbnail,
      isDrive: true,
      isYoutube: false,
      mediaId: driveId
    };
  }

  // 2. YouTube Link
  const ytId = extractYouTubeId(mediaUrl);
  if (ytId) {
    const embedVideoUrl = `https://www.youtube.com/embed/${ytId}`;
    const ytThumbnail = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    return {
      videoUrl: embedVideoUrl,
      thumbnailUrl: thumbnailUrl || ytThumbnail,
      isDrive: false,
      isYoutube: true,
      mediaId: ytId
    };
  }

  // 3. Fallback / Direct Link
  return {
    videoUrl: mediaUrl,
    thumbnailUrl: thumbnailUrl || mediaUrl,
    isDrive: false,
    isYoutube: false,
    mediaId: null
  };
}
