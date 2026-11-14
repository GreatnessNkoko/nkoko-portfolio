/**
 * Uploads the website's media (profile photo, CV, project screenshots) from
 * frontend/public/media to Cloudinary, under fixed names, so the website can
 * load them from Cloudinary's CDN.
 *
 *   pnpm media:upload
 *
 * Needs CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET
 * (in backend/.env or the shell). Re-run it whenever you replace a file:
 * existing files are overwritten and the CDN cache is refreshed.
 *
 *   profile.jpg               -> <folder>/profile               (image)
 *   project-hiresphere.webp   -> <folder>/project-hiresphere    (image)
 *   nkoko-joel-nkoko-cv.pdf   -> <folder>/nkoko-joel-nkoko-cv.pdf (raw file)
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { v2 as cloudinary } from "cloudinary";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
const folder = process.env.CLOUDINARY_FOLDER || "portfolio";

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET first.");
  process.exit(1);
}

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
});

const mediaDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../frontend/public/media");
const IMAGE = /\.(jpe?g|png|webp|gif|avif)$/i;

const files = (await readdir(mediaDir)).filter((f) => !f.startsWith("."));
let failed = 0;

for (const file of files) {
  const isImage = IMAGE.test(file);
  // Images are stored without extension (Cloudinary picks the best format on
  // delivery); other files keep theirs so the download has the right name.
  const publicId = isImage ? file.replace(/\.[^.]+$/, "") : file;
  try {
    const res = await cloudinary.uploader.upload(path.join(mediaDir, file), {
      folder,
      public_id: publicId,
      resource_type: isImage ? "image" : "raw",
      overwrite: true,
      invalidate: true,
    });
    console.log(`uploaded ${file} -> ${res.secure_url}`);
  } catch (err) {
    failed++;
    // Cloudinary rejects with a plain object, not an Error.
    console.error(`FAILED ${file}:`, (err as { message?: string })?.message ?? err);
  }
}

console.log(failed ? `${failed} upload(s) failed.` : `Done: ${files.length} file(s) in "${folder}".`);
process.exit(failed ? 1 : 0);
