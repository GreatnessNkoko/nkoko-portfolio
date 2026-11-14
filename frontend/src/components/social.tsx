import { Mail, Phone } from "lucide-react";
import type { ComponentType } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { contact } from "../content";

export type SocialLink = {
  label: string;
  /** What is shown next to the icon in the contact list. */
  display: string;
  href: string;
  Icon: ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>;
  external: boolean;
};

const handle = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Every way to reach you. Links left empty in content.ts are skipped. */
export const socialLinks: SocialLink[] = (
  [
    { label: "Email", display: contact.email, href: `mailto:${contact.email}`, Icon: Mail, external: false },
    { label: "WhatsApp", display: contact.phone, href: contact.whatsapp, Icon: FaWhatsapp, external: true },
    { label: "Phone", display: contact.phone, href: contact.phoneHref, Icon: Phone, external: false },
    { label: "GitHub", display: handle(contact.github), href: contact.github, Icon: FaGithub, external: true },
    { label: "LinkedIn", display: "Nkoko Joel Nkoko", href: contact.linkedin, Icon: FaLinkedin, external: true },
    { label: "Facebook", display: "Nkoko Joel Nkoko", href: contact.facebook, Icon: FaFacebook, external: true },
    { label: "TikTok", display: handle(contact.tiktok), href: contact.tiktok, Icon: FaTiktok, external: true },
  ] satisfies SocialLink[]
).filter((l) => l.href && !l.href.endsWith(":"));

export const linkProps = (external: boolean) =>
  external ? { target: "_blank", rel: "noopener noreferrer" } : {};

/** Compact row of round icon buttons. */
export function SocialIcons({ only, className = "" }: { only?: string[]; className?: string }) {
  const links = only ? socialLinks.filter((l) => only.includes(l.label)) : socialLinks;
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {links.map(({ label, href, Icon, external }) => (
        <li key={label}>
          <a
            href={href}
            {...linkProps(external)}
            aria-label={label}
            title={label}
            className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Icon size={17} aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}
