// ── Types ──────────────────────────────────────────────────────────────

export interface ContactInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  location: string;
  website?: string;
}

export interface SummaryInfo {
  text: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface ProjectEntry {
  name: string;
  techStack: string[];
  description: string;
  link?: string;
  github?: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  coursework?: string[];
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
}

export interface AchievementEntry {
  title: string;
  description: string;
}

export interface ResumeData {
  contact: ContactInfo;
  summary: SummaryInfo;
  skills: SkillCategory[];
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  education: EducationEntry[];
  certifications: CertificationEntry[];
  achievements: AchievementEntry[];
}

// ── Default Data ───────────────────────────────────────────────────────

export const DEFAULT_RESUME: ResumeData = {
  contact: {
    name: "John Doe",
    title: "Senior Full-Stack Engineer",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    location: "San Francisco, CA",
    website: "johndoe.dev",
  },

  summary: {
    text: "Results-driven senior full-stack engineer with 7+ years of experience designing and shipping scalable web applications. Passionate about clean architecture, developer experience, and building products that delight users. Proven track record of leading cross-functional teams and delivering high-impact features from concept to production.",
  },

  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Go", "SQL", "HTML/CSS"],
    },
    {
      category: "Frameworks",
      items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "Django"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "GitHub Actions"],
    },
    {
      category: "Tools",
      items: ["Git", "Figma", "Jira", "Datadog", "Sentry"],
    },
  ],

  experience: [
    {
      company: "Acme Corp",
      role: "Senior Full-Stack Engineer",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "Present",
      bullets: [
        "Architected and led development of the next-generation dashboard platform serving 50K+ daily active users, reducing page load times by 40%.",
        "Designed a real-time notification system using WebSockets and Redis Pub/Sub, improving user engagement metrics by 25%.",
        "Mentored a team of 4 junior engineers through code reviews, pair programming, and internal tech talks.",
        "Established front-end testing standards with 90%+ coverage, cutting production bugs by 35% quarter-over-quarter.",
      ],
    },
    {
      company: "Globex Inc.",
      role: "Full-Stack Engineer",
      location: "New York, NY",
      startDate: "Jun 2019",
      endDate: "Dec 2021",
      bullets: [
        "Built and maintained a multi-tenant SaaS billing platform processing $12M+ in annual recurring revenue.",
        "Migrated legacy REST APIs to GraphQL, reducing client-side data fetching overhead by 60%.",
        "Implemented OAuth 2.0 / OIDC authentication flows for enterprise SSO integrations across 15+ clients.",
      ],
    },
    {
      company: "StartupXYZ",
      role: "Software Engineer",
      location: "Austin, TX",
      startDate: "Aug 2017",
      endDate: "May 2019",
      bullets: [
        "Developed the MVP of a project management tool that acquired 2,000 users within the first three months.",
        "Created a CI/CD pipeline with GitHub Actions and Docker, reducing deployment time from 45 min to 8 min.",
        "Collaborated directly with the design team to implement a fully responsive, accessible UI component library.",
      ],
    },
  ],

  projects: [
    {
      name: "DevBoard",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      description:
        "An open-source developer dashboard that aggregates GitHub activity, CI/CD status, and deployment metrics into a single real-time view.",
      link: "devboard.dev",
      github: "github.com/johndoe/devboard",
    },
    {
      name: "MarkdownSync",
      techStack: ["React", "Node.js", "WebSockets", "MongoDB"],
      description:
        "A collaborative markdown editor with live cursor tracking and conflict-free replicated data types (CRDTs) for real-time co-editing.",
      github: "github.com/johndoe/markdown-sync",
    },
    {
      name: "InfraScope",
      techStack: ["Go", "Prometheus", "Grafana", "Docker"],
      description:
        "A lightweight infrastructure monitoring CLI that auto-discovers services in Docker Compose environments and sets up Prometheus metrics collection.",
      github: "github.com/johndoe/infrascope",
    },
  ],

  education: [
    {
      degree: "B.S. in Computer Science",
      institution: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "Aug 2013",
      endDate: "May 2017",
      gpa: "3.8 / 4.0",
      coursework: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "Distributed Systems",
        "Machine Learning",
        "Database Systems",
      ],
    },
  ],

  certifications: [
    {
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services",
      date: "Mar 2023",
      credentialId: "AWS-SAA-2023-XXXXX",
    },
    {
      name: "Certified Kubernetes Application Developer (CKAD)",
      issuer: "The Linux Foundation",
      date: "Sep 2022",
      credentialId: "LF-CKAD-2022-XXXXX",
    },
  ],

  achievements: [
    {
      title: "Eng Team MVP Award — Acme Corp",
      description:
        "Recognised for leading the dashboard rewrite that drove a 40% performance improvement and a measurable lift in user retention.",
    },
    {
      title: "Hackathon Winner — Globex Internal Hack Week 2020",
      description:
        "Built an AI-powered code review assistant in 48 hours that was later adopted as an internal tool across the engineering org.",
    },
    {
      title: "Open-Source Contributor — React Ecosystem",
      description:
        "Contributed accessibility improvements and performance patches to popular open-source React libraries, accumulating 500+ GitHub stars.",
    },
  ],
};
