export type Project = {
  name: string;
  monogram: string;
  tagline: string;
  description: string;
  tech: string[];
  year: string;
  role: string;
  github: string;
  demo: string;
  image: string;
};

export const projects: Project[] = [
  {
    name: "Orbit",
    monogram: "O",
    tagline: "3D Product Configurator",
    description:
      "A real-time 3D configurator that lets shoppers spin, recolor, and customize products in the browser. Built for buttery 60fps interaction on any device.",
    tech: ["React", "Three.js", "GSAP", "WebGL"],
    year: "2025",
    role: "Design & Engineering",
    github: "https://github.com/finn/orbit",
    demo: "https://threejs.org/",
    image: "/projects/orbit.png",
  },
  {
    name: "Ledger",
    monogram: "L",
    tagline: "Personal Finance Dashboard",
    description:
      "A calm, focused money dashboard that turns messy transactions into clear insights. Fully keyboard-navigable with an emphasis on legible data.",
    tech: ["Next.js", "TypeScript", "Recharts"],
    year: "2024",
    role: "Frontend Lead",
    github: "https://github.com/finn/ledger",
    demo: "https://ui.shadcn.com/",
    image: "/projects/ledger.png",
  },
  {
    name: "Prism",
    monogram: "P",
    tagline: "Design System & Library",
    description:
      "An accessible component library and living documentation site used across multiple product teams. Themeable tokens, zero runtime CSS overhead.",
    tech: ["React", "Tailwind", "Storybook"],
    year: "2024",
    role: "Maintainer",
    github: "https://github.com/finn/prism",
    demo: "https://tailwindcss.com/",
    image: "/projects/prism.png",
  },
  {
    name: "Wander",
    monogram: "W",
    tagline: "Travel Booking Platform",
    description:
      "A map-first trip planner with smooth page transitions and offline-friendly itineraries. Designed to feel like a native app on the web.",
    tech: ["Next.js", "Mapbox", "Framer Motion"],
    year: "2023",
    role: "Design & Engineering",
    github: "https://github.com/finn/wander",
    demo: "https://www.framer.com/motion/",
    image: "/projects/wander.png",
  },
];
