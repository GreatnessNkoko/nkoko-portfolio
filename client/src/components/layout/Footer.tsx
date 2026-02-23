import { FaLinkedin, FaFacebook, FaWhatsapp, FaGithub } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold font-display text-foreground mb-6">
          Nkoko <span className="text-accent">Joel</span> Nkoko
        </h2>
        
        <div className="flex gap-6 mb-8">
          <a href="https://wa.me/237654801108" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-panel text-muted-foreground hover:text-accent hover:border-accent/50 transition-all hover:-translate-y-1">
            <FaWhatsapp size={20} />
          </a>
          <a href="https://www.linkedin.com/in/nkoko-joel-nkoko-4bb18529a" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-panel text-muted-foreground hover:text-accent hover:border-accent/50 transition-all hover:-translate-y-1">
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100064953483370" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full glass-panel text-muted-foreground hover:text-accent hover:border-accent/50 transition-all hover:-translate-y-1">
            <FaFacebook size={20} />
          </a>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Nkoko Joel Nkoko. All rights reserved.<br />
          Crafted with passion and precision.
        </p>
      </div>
    </footer>
  );
}
