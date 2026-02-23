import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "EasyQueue",
    description: "A smart queue management system designed to reduce wait times and improve customer flow in service centers. Features real-time ticketing and analytics dashboards.",
    tags: ["React", "Node.js", "WebSockets", "Tailwind"],
    gradient: "from-blue-900/40 to-cyan-900/40"
  },
  {
    title: "Church Website",
    description: "A comprehensive digital platform for a local church, featuring event management, sermon archives, live streaming integration, and secure online donations.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
    gradient: "from-primary/40 to-emerald-900/40"
  },
  {
    title: "TaskSphere",
    description: "A collaborative project management tool for remote teams, featuring real-time task updates, kanban boards, role-based access control, and progress tracking.",
    tags: ["React", "Express", "Drizzle ORM", "JWT"],
    gradient: "from-purple-900/40 to-pink-900/40"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display mb-4"
          >
            Featured <span className="text-accent">Projects</span>
          </motion.h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group relative rounded-2xl overflow-hidden glass-panel flex flex-col h-full hover-elevate"
            >
              {/* Project Image Placeholder / Gradient Header */}
              <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center border-b border-border/50`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <h3 className="text-3xl font-display font-bold text-white/50 group-hover:text-white/90 transition-colors drop-shadow-lg scale-110 group-hover:scale-100 duration-500">
                  {project.title}
                </h3>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-foreground mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border/50 mt-auto">
                  <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                    <Github size={16} /> Code
                  </button>
                  <button className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors ml-auto">
                    <ExternalLink size={16} /> Live Demo
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
