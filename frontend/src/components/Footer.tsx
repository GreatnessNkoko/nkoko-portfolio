import { ArrowUp } from "lucide-react";
import { profile } from "../content";
import { SocialIcons } from "./social";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-serif text-2xl">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            © {new Date().getFullYear()} · {profile.role} in {profile.location}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SocialIcons />
          <a
            href="#top"
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-full bg-ink text-bg transition-opacity hover:opacity-85"
          >
            <ArrowUp size={17} aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
