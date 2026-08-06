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
];
