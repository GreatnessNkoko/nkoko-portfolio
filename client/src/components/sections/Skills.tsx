import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "Next.js", "Framer Motion", "HTML5/CSS3"]
  },
  {
    title: "Backend Development",
    skills: ["Node.js", "Express.js", "PostgreSQL", "RESTful APIs", "WebSockets", "Drizzle ORM"]
  },
  {
    title: "Tools & DevOps",
    skills: ["Git & GitHub", "Docker", "Vite", "Postman", "Linux", "Vercel"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display mb-4"
          >
            My <span className="text-accent">Skills</span>
          </motion.h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-2xl border-t-2 border-t-primary/50 hover:border-t-accent transition-colors"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-md bg-secondary text-secondary-foreground border border-border/50 hover:bg-primary/20 hover:text-primary-foreground hover:border-primary/50 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
