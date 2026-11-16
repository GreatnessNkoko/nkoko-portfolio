/**
 * Images and the CV are plain files in frontend/public/media and are served
 * by Vercel. To replace one, overwrite the file with the same name and push.
 */
export const media = (file: string) => `/media/${file}`;

export const CV_FILE = "nkoko-joel-nkoko-cv.pdf";
export const PROFILE_PHOTO = "profile.jpg";
