import { TechName } from "@/components/TechTag";

export enum SECTION {
  Hero = "Hero",
  Experience = "Where i've worked",
  Projects = "Things i've built",
  Skills = "What i've touched",
  Footer = "Footer",
}

export const sections = [
  SECTION.Hero,
  SECTION.Experience,
  SECTION.Projects,
  SECTION.Skills,
  SECTION.Footer,
];

type Link = { icon: string; label: string; href: string; color: string };

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
};

export type Project = {
  id: string;
  name: string;
  github: string;
  demo: string | null;
  logo: string | null;
  tech: TechName[];
  desc: string;
  thumbnail: string;
  inProgress?: boolean;
};

type Skills = {
  subtitle: string;
  fe: TechName[];
  be: TechName[];
  others: TechName[];
};

type Footer = {
  eyebrow: string;
  title: string[];
  copyright: string;
  tagline: string;
};

type Metadata = {
  links: Link[];
  hero: {
    hello: string;
    available: string;
    avatar: string;
    description: (
      | { type: "text"; content: string }
      | { type: "tech"; name: TechName }
    )[];
  };
  experiences: { subtitle: string; items: Experience[] };
  projects: { subtitle: string; items: Project[] };
  skills: Skills;
  footer: Footer;
};

export const metadata: Metadata = {
  links: [
    {
      icon: "mdi:github",
      label: "GitHub",
      href: "https://github.com/nguyen-duong-tien-phat",
      color: "#64748B",
    },
    {
      icon: "mdi:linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/phat-nguyen-416758281/",
      color: "#0A66C2",
    },
    {
      icon: "mdi:gmail",
      label: "Email",
      href: "mailto:phatndt268@gmail.com",
      color: "#EA4335",
    },
    {
      icon: "mingcute:pdf-fill",
      label: "Resume",
      href: "/resume.pdf",
      color: "#A855F7",
    },
  ],
  hero: {
    hello: "hi. i'm Finn",
    available: "Available for work",
    avatar: "/my-face.png",
    description: [
      {
        type: "text",
        content:
          "Frontend engineer with 2+ years of experience, specializing in",
      },
      { type: "tech", name: "React" },
      { type: "tech", name: "Next.js" },
      {
        type: "text",
        content:
          ". Currently growing into a full-stack engineer, with a passion for building high-quality products that are fast, intuitive, and built to last.",
      },
    ],
  },
  experiences: {
    subtitle:
      "Places where i've learned, contributed, solved problems, and grown along the way.",
    items: [
      {
        role: "Junior Software Engineer",
        company: "Modelty Strategy & Consulting",
        period: "03/25 — 07/26",
        description:
          "Developed and maintained features for an insurance service platform.",
        highlights: [
          "Built marketing and product pages with a focus on performance, SEO, and conversion.",
          "Implemented end-to-end user flows for insurance quotation, purchase, and claim submission.",
          "Built and deployed an Alipay Mini Program, adapting existing business workflows and UI components to the platform.",
          "Designed and implemented an end-to-end backend feature using NestJS, collaborating with the backend team from feature design and API implementation through integration.",
        ],
      },
      {
        role: "Frontend Developer",
        company: "Freelance",
        period: "05/24 — 01/26",
        description:
          "Migrated and maintained an e-commerce management application.",
        highlights: [
          "Ensured compatibility with existing system workflows throughout the migration.",
          "Implemented new features and enhancements based on evolving project requirements.",
          "Participated in code reviews, identifying implementation issues and contributing to improved code quality.",
          "Facilitated weekly meetings to communicate project progress and discuss potential improvements.",
        ],
      },
      {
        role: "Frontend Intern",
        company: "TMA Solutions",
        period: "10/23 — 01/24",
        description:
          "Developed a tour booking application based on provided designs and requirements.",
        highlights: [
          "Implemented application features and user interfaces while providing feedback on design and functionality.",
          "Communicated daily progress and technical updates with mentors.",
        ],
      },
    ],
  },
  projects: {
    subtitle:
      "A few things i've worked on, experimented with, and learned from.",
    items: [
      {
        id: "event-hub-DotNet",
        name: "EventHub",
        github: "https://github.com/nguyen-duong-tien-phat/event-hub-DotNet",
        demo: null,
        logo: null,
        tech: [".NET", "PostgreSQL", "Redis", "Docker", "Moq"],
        desc: "An event ticketing and booking API focused on concurrency-safe reservations, authentication, payments, caching, and rate limiting.",
        thumbnail: "/thumbnails/dotnet10.png",
        inProgress: true,
      },
      {
        id: "lets-movie",
        name: "Let's movie",
        github: "https://github.com/nguyen-duong-tien-phat/lets-movie",
        demo: "https://lets-movie.vercel.app/",
        logo: "/logos/lets-movie-logo.png",
        tech: ["Next.js"],
        desc: "A movie discovery app built with third-party API integration and authentication via GitHub, Google, and Facebook.",
        thumbnail: "/thumbnails/letsmovie.png",
      },
      {
        id: "lets-chill",
        name: "Let's chill",
        github: "https://github.com/nguyen-duong-tien-phat/lets-chill",
        demo: "https://letschill-pqgu.vercel.app",
        logo: "/logos/lets-chill-logo.png",
        tech: ["React", "Redux"],
        desc: "An interactive music experience inspired by immersive websites and modern music player interfaces.",
        thumbnail: "/thumbnails/letsmusic.png",
      },
    ],
  },
  skills: {
    subtitle:
      "Technologies, tools, and a few things i've learned along the way.",
    fe: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "CSS3",
      "HTML5",
      "Three.js",
      "Redux",
    ],
    be: ["C#", ".NET", "NestJS", "PostgreSQL", "Redis", "Moq"],
    others: ["Git", "Docker", "GitHub", "Gitlab", "Figma", "ChatGPT", "Claude"],
  },
  footer: {
    eyebrow: "Let's work together",
    title: [
      "I'm always open to new ideas,",
      "interesting projects, and opportunities",
      "to learn, grow, and work with great people.",
    ],
    copyright: `© ${new Date().getFullYear()} Finn`,
    tagline: "Built with curiosity.",
  },
};
