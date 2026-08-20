import LetsChill from "@/components/logos/LetsChill";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";

export enum SECTION {
  Hero = "Hero",
  Experience = "Experience",
  Projects = "Projects",
  End = "Connect",
}

export const sections = [
  SECTION.Hero,
  SECTION.Experience,
  SECTION.Projects,
  SECTION.End,
];

export const metadata = {
  links: [
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/nguyen-duong-tien-phat",
      color: "#181717",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/phat-nguyen-416758281/",
      color: "#0A66C2",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      href: "mailto:phatndt268@gmail.com",
      color: "#EA4335",
    },
    { icon: FaFilePdf, label: "Resume", href: "/resume.pdf", color: "#A855F7" },
  ],
  hero: {
    fullName: "Nguyễn Dương Tiến Phát",
    otherName: "Finn",
    available: "Available for work",
    avatar: "/my-face.png",
    description:
      "Frontend engineer passionate about building fast, immersive web experiences with React, Next.js. I care about performance, accessibility, and creating interfaces that feel effortless to use.",
  },
  experiences: [
    {
      role: "Junior Software Engineer",
      company: "Modelty Strategy & Consulting",
      period: "03/25 — 07/26",
      description:
        "Developing and maintaining features for an insurance service platform.",
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
  projects: [
    {
      name: "Event hub",
      github: "https://github.com/nguyen-duong-tien-phat/event-hub-DotNet",
      demo: null,
      logo: null,
      tech: ["C#", ".Net 10"],
      desc: "This project was built while I was learning how to integrate third-party APIs using a free movie database API. It also gave me hands-on experience implementing authentication with NextAuth, supporting GitHub, Google, and Facebook sign-in.",
    },
    {
      name: "Let's movie",
      github: "https://github.com/nguyen-duong-tien-phat/lets-movie",
      demo: "https://lets-movie.vercel.app/",
      logo: "/logos/lets-movie-logo.png",
      tech: ["Next.js", "API Integration", "OAuth"],
      desc: "This project was built while I was learning how to integrate third-party APIs using a free movie database API. It also gave me hands-on experience implementing authentication with NextAuth, supporting GitHub, Google, and Facebook sign-in.",
    },
    {
      name: "Let's chill",
      nameComp: LetsChill,
      github: "https://github.com/nguyen-duong-tien-phat/lets-chill",
      demo: "https://letschill-pqgu.vercel.app",
      logo: "/logos/lets-chill-logo.png",
      tech: ["React", "Redux", "Framer motion"],
      desc: "This was my first project after self-learning web development. Inspired by immersive full-screen websites and modern music player interfaces, I combined these ideas to build an interactive experience while exploring animations, layout design, and frontend development fundamentals.",
    },
  ],
};
