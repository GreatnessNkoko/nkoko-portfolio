import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import profileImg from "@assets/PIC_1771874508673.jpeg";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none"></div>
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-xs font-medium text-primary-foreground">Available for Work</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Hi, I am <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Nkoko Joel Nkoko</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
              A passionate Software Engineer dedicated to crafting beautiful, functional, and performant web experiences.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#contact"
                className="px-8 py-3.5 rounded-xl font-semibold bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                Hire Me <ArrowRight size={18} />
              </a>
              <a 
                href="/cv.pdf"
                download
                className="px-8 py-3.5 rounded-xl font-semibold glass-panel text-foreground hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                Download CV <Download size={18} />
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary to-accent opacity-30 blur-2xl animate-pulse"></div>
              <div className="absolute inset-0 rounded-3xl border-2 border-border/50 translate-x-4 translate-y-4"></div>
              <img 
                src={profileImg} 
                alt="Nkoko Joel Nkoko" 
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border border-border/50"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
