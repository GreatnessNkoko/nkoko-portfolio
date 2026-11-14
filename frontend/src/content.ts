/**
 * Everything the website says about you lives in this file.
 * Edit text, links and projects here; the page updates automatically.
 * A link left as an empty string ("") is simply not shown.
 */

export const profile = {
  name: "Nkoko Joel Nkoko",
  shortName: "Nkoko Joel",
  role: "Full-stack software engineer",
  location: "Buea, Cameroon",
  available: true,
  intro:
    "I build web and mobile applications end to end, from the database and API to the interface people use every day, with React, Node.js, PostgreSQL and Flutter.",
  about: [
    "I'm a Computer Engineering student at the University of Buea (B.Eng., graduating December 2026) with more than five years of programming behind me. I enjoy turning real problems I see around me, like long queues, hard job searches and churches without an online home, into software that people actually use.",
    "Most of my work is full-stack: React and Tailwind on the front, Node.js and Express on the back, PostgreSQL or Firebase for data. I also build mobile apps with Flutter. I care about clean, reliable code and interfaces that feel simple.",
  ],
  facts: [
    { label: "Based in", value: "Buea, Cameroon" },
    { label: "Languages", value: "English (fluent), French (professional)" },
    { label: "Studying", value: "B.Eng. Computer Engineering, University of Buea" },
    { label: "Open to", value: "Full-time roles, internships and freelance projects" },
  ],
};

export const contact = {
  email: "nkokomoukan@gmail.com",
  phone: "+237 654 801 108",
  phoneHref: "tel:+237654801108",
  whatsapp: "https://wa.me/237654801108?text=" + encodeURIComponent("Hello Joel, I saw your portfolio and "),
  github: "https://github.com/GreatnessNkoko",
  linkedin: "https://www.linkedin.com/in/nkoko-joel-nkoko-4bb18529a",
  facebook: "https://www.facebook.com/profile.php?id=100064953483370",
  // TODO: add your TikTok profile link, e.g. "https://www.tiktok.com/@yourname"
  tiktok: "",
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  /** Image file name in frontend/public/media (and on Cloudinary). */
  image?: string;
  imageAlt?: string;
  kind?: "web" | "mobile";
  /** Background for projects without a screenshot. */
  coverColor?: string;
  status?: string;
  context?: string;
  liveUrl?: string;
  codeUrl?: string;
  codeNote?: string;
};

export const projects: Project[] = [
  {
    slug: "hiresphere",
    title: "HireSphere",
    tagline: "Job portal connecting job seekers and recruiters in Cameroon",
    context: "Final-year B.Eng. project",
    description:
      "A full recruitment platform with three roles. Job seekers search, save and apply for jobs and track their applications. Recruiters manage company profiles, post jobs and review applicants. Administrators oversee users, jobs and platform analytics.",
    highlights: [
      "JWT authentication with role-based access for seekers, recruiters and admins",
      "Job search and filtering, applications, saved jobs and notifications",
      "API defined with OpenAPI, with a generated, typed React Query client",
    ],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Drizzle ORM"],
    image: "project-hiresphere.webp",
    imageAlt: "HireSphere home page: “Find your dream job on HireSphere” with a job search bar",
    // TODO: add the live link once it is deployed, e.g. "https://hiresphere.vercel.app"
    liveUrl: "",
    codeUrl: "https://github.com/GreatnessNkoko/HireSphere",
  },
  {
    slug: "ccr-buea",
    title: "CCR Diocese of Buea",
    tagline: "Website for the Catholic Charismatic Renewal, Diocese of Buea",
    status: "In progress",
    description:
      "The online home of The Living Water Catholic Charismatic Renewal: events, prayer requests, projects, leadership, a blog, giving, a newsletter and a contact form, all managed from a secure administration dashboard.",
    highlights: [
      "Admin dashboard with login and access control to manage all content",
      "Photo and video uploads through Cloudinary, long videos from YouTube",
      "Monorepo deployed as a Vercel website, a Render API and a PostgreSQL database",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Cloudinary"],
    image: "project-ccr.webp",
    imageAlt: "CCR Diocese of Buea home page: “Come and drink from the well of living water”",
    // TODO: add the live link once it launches
    liveUrl: "",
    codeUrl: "",
    codeNote: "Private client code",
  },
  {
    slug: "easyqueue",
    title: "EasyQueue",
    tagline: "Mobile app that replaces physical queues for school fee payments",
    description:
      "Students join a queue from their phone instead of standing in line, follow their position in real time and get notified when it is their turn. Staff manage the queue from an admin dashboard.",
    highlights: [
      "Real-time queue position and status with Cloud Firestore",
      "Push notifications with Firebase Cloud Messaging",
      "Sign up, login and password reset with Firebase Authentication",
    ],
    stack: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Messaging"],
    kind: "mobile",
    coverColor: "#1f4e79",
    // TODO: add a screenshot as frontend/public/media/project-easyqueue.webp and set image above
    liveUrl: "",
    codeUrl: "https://github.com/GreatnessNkoko/EasyQueue-App",
  },
  {
    slug: "tasksphere",
    title: "TaskSphere",
    tagline: "An intelligent productivity and task manager",
    status: "In progress",
    // TODO: describe what TaskSphere does once it is built, and add highlights.
    description:
      "A productivity manager that helps people organise their tasks and projects and stay on top of their work, built with Next.js, React and Firebase.",
    highlights: [],
    stack: ["Next.js", "React", "Tailwind CSS", "Node.js", "Firebase"],
    coverColor: "#5b3f8c",
    liveUrl: "",
    codeUrl: "https://github.com/GreatnessNkoko/tasksphere-app",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "Java", "Dart", "PHP", "C / C++", "SQL"] },
  { group: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML & CSS", "Bootstrap"] },
  { group: "Backend", items: ["Node.js", "Express", "REST APIs", "Django", "Laravel"] },
  { group: "Mobile", items: ["Flutter", "Firebase"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Firestore"] },
  { group: "Tools", items: ["Git & GitHub", "Docker", "Linux", "Postman", "Figma", "Vercel", "Render"] },
];

export type TimelineItem = {
  title: string;
  org: string;
  place?: string;
  period: string;
  points?: string[];
};

export const experience: TimelineItem[] = [
  {
    title: "Mathematics & Physics Teacher",
    org: "Passion Comprehensive Evening School",
    place: "Bomaka, Buea",
    period: "Sep 2024 – Present",
    points: [
      "Teach mathematics and physics to secondary school students",
      "Prepare lessons and assessments, and mentor students in problem solving",
    ],
  },
  {
    title: "Software Development Intern",
    org: "LIAH Technologies",
    place: "Buea",
    period: "Jun – Aug 2025",
    points: [
      "Built and maintained web applications alongside senior developers",
      "Worked on backend features, databases, testing and debugging",
      "Won the LIAH Code Battle programming competition (August 2025)",
    ],
  },
  {
    title: "Software Development Intern",
    org: "Revival Company Ltd",
    place: "Buea",
    period: "Jun – Aug 2024",
    points: [
      "Helped develop and maintain web applications",
      "Supported database management, testing and bug fixing",
    ],
  },
  {
    title: "Secretariat Worker",
    org: "Cameroon GCE Board",
    place: "Buea",
    period: "June 2023, 2024 & 2025",
    points: ["Handled records and confidential documents during the national examination periods"],
  },
];

export const education: TimelineItem[] = [
  {
    title: "B.Eng. Computer Engineering",
    org: "University of Buea",
    place: "Buea",
    period: "2022 – Dec 2026 (expected)",
    points: ["Software engineering, databases, networks, operating systems, algorithms, AI, embedded systems"],
  },
  { title: "GCE Advanced Level", org: "GBHS Dschang", place: "Dschang", period: "2020 – 2022" },
  { title: "GCE Ordinary Level", org: "GBHS Toula-Ndzong", place: "Dschang", period: "2016 – 2020" },
];

export const achievements: TimelineItem[] = [
  { title: "Code Battle Winner", org: "LIAH Technologies", period: "Aug 2025" },
  { title: "Graphic Design Certification", org: "TAGITA Ltd", period: "Aug 2024" },
];
