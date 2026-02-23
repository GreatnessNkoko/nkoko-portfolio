import { motion } from "framer-motion";
import { GraduationCap, Award, Briefcase, Code2 } from "lucide-react";

const educationData = [
  {
    degree: "B.Tech in Computer Engineering",
    institution: "College Of Technology, UB, Buea",
    period: "December 2025",
    description: "Focused on core computer engineering principles, software systems, and engineering design.",
    icon: GraduationCap
  },
  {
    degree: "GCE Advanced Level",
    institution: "GBHS Dschang, Dschang",
    period: "August 2022",
    description: "Completed secondary education with a focus on science and mathematics.",
    icon: GraduationCap
  },
  {
    degree: "GCE Ordinary Level",
    institution: "GBHS Toula-Ndzong, Dschang",
    period: "August - June 2020",
    description: "Successfully completed GCE Ordinary Level examinations.",
    icon: GraduationCap
  },
  {
    degree: "Web Design Certificate",
    institution: "TADITA Company (Online)",
    period: "June 2024",
    description: "Professional certification in web design and development.",
    icon: Award
  }
];

const experienceData = [
  {
    title: "Intern",
    company: "LIAH Technologies",
    period: "June - September 2024",
    description: "Summer internship focused on software development and technology solutions.",
    icon: Code2
  },
  {
    title: "Intern",
    company: "Revival Company Ltd",
    period: "July - September 2023",
    description: "Gained hands-on experience in corporate technology environments.",
    icon: Code2
  },
  {
    title: "Secretariat Worker",
    company: "Cameroon GCE Board",
    period: "July 2023 - 2025",
    description: "Worked for three consecutive years during the month of July in the secretariat department.",
    icon: Briefcase
  }
];

export function Education() {
  return (
    <section id="education" className="py-24 bg-card/30 border-y border-border/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-display mb-4"
          >
            Education & <span className="text-accent">Experience</span>
          </motion.h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="space-y-16 relative">
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left">Academic Background</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-border/50 hidden md:block"></div>
              {educationData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-8 group"
                >
                  <div className="flex-shrink-0 z-10">
                    <div className="w-14 h-14 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-lg">
                      <item.icon size={24} />
                    </div>
                  </div>
                  
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl flex-1 hover-elevate">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl font-bold text-foreground">{item.degree}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    <h4 className="text-accent font-medium mb-4">{item.institution}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-8 text-center md:text-left">Professional Experience</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-border/50 hidden md:block"></div>
              {experienceData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col md:flex-row gap-6 md:gap-8 group"
                >
                  <div className="flex-shrink-0 z-10">
                    <div className="w-14 h-14 rounded-full bg-background border-2 border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shadow-lg">
                      <item.icon size={24} />
                    </div>
                  </div>
                  
                  <div className="glass-panel p-6 sm:p-8 rounded-2xl flex-1 hover-elevate">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                      <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    <h4 className="text-accent font-medium mb-4">{item.company}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
