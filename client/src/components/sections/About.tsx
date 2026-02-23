import { motion } from "framer-motion";
import { Code2, Server, Smartphone, ExternalLink } from "lucide-react";
import profileImg from "@assets/PIC_1771874508673.jpeg";

export function About() {
  return (
    <section id="about" className="py-24 relative bg-card/30 border-y border-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display mb-4"
          >
            About <span className="text-accent">Me</span>
          </motion.h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <img 
                src={profileImg} 
                alt="Portrait" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold text-foreground">
              Software Engineer based in Buea, Cameroon
            </h3>
            
            <p className="text-muted-foreground leading-relaxed text-lg">
              Hello! I'm Nkoko Joel Nkoko, a dedicated Software Engineer with a deep passion for building scalable, elegant, and user-centric applications. With a strong foundation in both frontend and backend technologies, I bridge the gap between creative design and robust technical implementation.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Languages:</span> English (100%), French (70%)
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">Location:</span> Buea, Cameroon
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {[
                { icon: Code2, title: "Frontend Dev", desc: "React, Tailwind, Next.js" },
                { icon: Server, title: "Backend Dev", desc: "Node.js, Express, Postgres" },
              ].map((item, i) => (
                <div key={i} className="glass-panel p-5 rounded-xl hover-elevate group">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors mb-4">
                    <item.icon size={20} />
                  </div>
                  <h4 className="font-semibold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            
          </motion.div>
        </div>
      </div>
    </section>
  );
}
