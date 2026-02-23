import { FaWhatsapp } from "react-icons/fa";

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/237654801108"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/50 hover:-translate-y-1 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={28} className="group-hover:scale-110 transition-transform" />
      <span className="absolute -top-10 right-0 bg-card border border-border text-foreground text-xs py-1 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with me!
      </span>
    </a>
  );
}
