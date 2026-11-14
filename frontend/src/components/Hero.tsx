import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile } from "../content";
import { CV_FILE, fileUrl, imageSrcSet, imageUrl, PROFILE_PHOTO } from "../lib/media";
import { SocialIcons } from "./social";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pb-28 sm:pt-20">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="order-2 md:order-1">
          {profile.available && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              Available for work
            </p>
          )}

          <h1 className="font-serif text-[3.4rem] leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            {profile.name}
          </h1>

          <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg text-ink">
            <span>{profile.role}</span>
            <span aria-hidden className="hidden text-line sm:inline">
              /
            </span>
            <span className="inline-flex items-center gap-1.5 text-muted">
              <MapPin size={16} aria-hidden /> {profile.location}
            </span>
          </p>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-85"
            >
              See my work <ArrowRight size={16} aria-hidden />
            </a>
            <a
              href={fileUrl(CV_FILE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium transition-colors hover:border-ink"
            >
              Download CV <Download size={16} aria-hidden />
            </a>
          </div>

          <SocialIcons className="mt-9" only={["GitHub", "LinkedIn", "WhatsApp", "Facebook", "TikTok", "Email"]} />
        </div>

        <div className="order-1 md:order-2">
          <img
            src={imageUrl(PROFILE_PHOTO, 640)}
            srcSet={imageSrcSet(PROFILE_PHOTO, [320, 480, 640, 900])}
            sizes="(min-width: 768px) 340px, 200px"
            alt="Portrait of Nkoko Joel Nkoko"
            width={720}
            height={1080}
            fetchPriority="high"
            className="aspect-[4/5] w-44 rounded-2xl object-cover object-top shadow-sm ring-1 ring-line sm:w-56 md:w-[340px]"
          />
        </div>
      </div>
    </section>
  );
}
