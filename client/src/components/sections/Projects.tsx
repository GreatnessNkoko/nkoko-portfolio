import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import queueImg from "@/assets/project-queue.png";
import churchImg from "@/assets/project-church.png";
import taskImg from "@/assets/project-task.png";

const projects = [
  {
    title: "EasyQueue",
    description: "A smart queue management system designed to reduce wait times and improve customer flow in service centers. Features real-time ticketing, priority management, and comprehensive analytics dashboards for administrators to monitor performance and optimize resource allocation. Built with high availability and scalability in mind.",
    tags: ["React", "Node.js", "WebSockets", "Tailwind"],
    image: queueImg
  },
  {
    title: "Church Website",
    description: "A comprehensive digital platform for a local church, featuring automated event management, sermon archives with video and audio support, live streaming integration for remote worship, and secure online donations through Stripe. Designed to enhance community engagement and streamline administrative tasks.",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Prisma"],
    image: churchImg
  },
  {
    title: "TaskSphere",
    description: "A collaborative project management tool for remote teams, featuring real-time task updates, interactive kanban boards, role-based access control (RBAC), and detailed progress tracking. Includes integrated team chat and document sharing to consolidate all project communication into a single, intuitive interface.",
    tags: ["React", "Express", "Drizzle ORM", "JWT"],
    image: taskImg
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
              {/* Project Image */}
              <div className="h-48 w-full relative overflow-hidden border-b border-border/50">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
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
