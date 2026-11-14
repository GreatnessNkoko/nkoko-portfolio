import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "../content";
import { useActiveSection, useTheme } from "../lib/hooks";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
const ids = links.map((l) => l.id);

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header
      className={`sticky top-0 z-40 transition-colors ${
        scrolled || open ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="font-serif text-2xl tracking-tight" onClick={() => setOpen(false)}>
          {profile.shortName}
          <span className="text-accent">.</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={`rounded-full px-4 py-2 text-sm transition-colors hover:text-ink ${
                active === l.id ? "text-ink" : "text-muted"
              }`}
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggle}
            aria-label={themeLabel}
            title={themeLabel}
            className="ml-2 grid size-9 place-items-center rounded-full text-muted transition-colors hover:text-ink"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label={themeLabel}
            className="grid size-10 place-items-center rounded-full text-muted"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line px-5 pb-6 pt-2 md:hidden">
          <ul>
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 font-serif text-3xl"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
