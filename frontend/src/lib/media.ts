/**
 * Where images and the CV come from.
 *
 * With VITE_CLOUDINARY_CLOUD_NAME set, files are served by Cloudinary's CDN
 * (uploaded with `pnpm media:upload`), resized and converted to the best
 * format for each browser. Without it, they come from frontend/public/media.
 */
const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined;
const folder = (import.meta.env.VITE_CLOUDINARY_FOLDER as string | undefined) || "portfolio";

export const usingCloudinary = Boolean(cloud);

/** URL of an image, resized to `width` pixels wide when Cloudinary is used. */
export function imageUrl(file: string, width: number): string {
  if (!cloud) return `/media/${file}`;
  const id = file.replace(/\.[^.]+$/, "");
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto,c_limit,w_${width}/${folder}/${id}`;
}

/** `srcset` with several widths, so phones download smaller images. */
export function imageSrcSet(file: string, widths: number[]): string | undefined {
  if (!cloud) return undefined;
  return widths.map((w) => `${imageUrl(file, w)} ${w}w`).join(", ");
}

/** URL of a non-image file such as the CV (PDF). */
export function fileUrl(file: string): string {
  if (!cloud) return `/media/${file}`;
  return `https://res.cloudinary.com/${cloud}/raw/upload/${folder}/${file}`;
}

export const CV_FILE = "nkoko-joel-nkoko-cv.pdf";
export const PROFILE_PHOTO = "profile.jpg";
