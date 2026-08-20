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
      color: "#D44638",
    },
    { icon: FaFilePdf, label: "Resume", href: "/resume.pdf", color: "#EF4444" },
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
      role: "Junior Frontend Developer",
      company: "Modelty Strategy & Consulting",
      period: "03/2025 — 07/2026",
      location: "Ho Chi Minh city",
      description:
        "Frontend Developer contributing to multiple company projects, building and maintaining scalable, high-performance web applications with a strong focus on usability, maintainability, and user experience.",
      tech: ["Next.js", "Alipay Mini program", "Gatsby", "MUI"],
    },
    {
      role: "Frontend Engineer",
      company: "Freelance",
      period: "05/2024 — 01/2026",
      location: "Remote",
      description:
        "Worked as a Frontend Developer, migrating an e-commerce management application and redesigning its user interface to deliver a more intuitive and user-friendly experience.",
      tech: ["Next.js", "Tailwind CSS", "Ant Design"],
    },
    {
      role: "Intern Frontend Developer",
      company: "TMA Solution",
      period: "11/2023 — 01/2024",
      location: "Remote",
      description:
        "Partnered with small teams and founders to ship landing pages, dashboards, and portfolio sites — learning the craft of turning rough ideas into clean, responsive products.",
      tech: ["React", "MUI"],
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
