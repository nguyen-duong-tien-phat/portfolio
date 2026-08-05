export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  tech: string[];
};

export const experiences: Experience[] = [
  {
    role: "Frontend Developer",
    company: "Nimbus Studio",
    period: "2024 — Present",
    location: "Remote",
    description:
      "Lead the frontend for a suite of interactive product experiences, building immersive 3D interfaces with Three.js and shipping polished, accessible UI in Next.js. Now expanding into the backend, owning Node.js services end to end.",
    tech: ["Next.js", "Three.js", "TypeScript", "Node.js"],
  },
  {
    role: "Frontend Engineer",
    company: "Layer & Co.",
    period: "2023 — 2024",
    location: "Berlin, DE",
    description:
      "Built and maintained a design-system-driven marketing platform, translating Figma into pixel-accurate React components and cutting page load times with careful rendering and animation work.",
    tech: ["React", "GSAP", "Tailwind", "Storybook"],
  },
  {
    role: "Junior Developer",
    company: "Freelance",
    period: "2022 — 2023",
    location: "Remote",
    description:
      "Partnered with small teams and founders to ship landing pages, dashboards, and portfolio sites — learning the craft of turning rough ideas into clean, responsive products.",
    tech: ["React", "JavaScript", "CSS", "Vercel"],
  },
];
