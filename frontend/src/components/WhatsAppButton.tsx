import { FaWhatsapp } from "react-icons/fa6";
import { contact } from "../content";

export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 grid size-13 place-items-center rounded-full bg-[#25d366] text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 sm:bottom-7 sm:right-7"
    >
      <FaWhatsapp size={26} aria-hidden />
    </a>
  );
}
