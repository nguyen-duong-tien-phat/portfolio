export const experienceConfig = {
  title: "Where I've Worked",
  experience: [
    {
      role: "Frontend Developer",
      company: "Modelty Strategy & Consulting",
      startAt: new Date(2025, 2),
      endAt: null,
      technologies: ["Next.js", "Alipay Mini program", "Gatsby", "MUI"],
      desc: "Frontend Developer contributing to multiple company projects, building and maintaining scalable, high-performance web applications with a strong focus on usability, maintainability, and user experience.",
    },
    {
      role: "Frontend Developer",
      company: "Freelance",
      startAt: new Date(2024, 4),
      endAt: new Date(2026, 0),
      technologies: ["Next.js", "Tailwind CSS", "Ant Design"],
      desc: "Worked as a Frontend Developer, migrating an e-commerce management application and redesigning its user interface to deliver a more intuitive and user-friendly experience.",
    },
    {
      role: "Intern Frontend Developer",
      company: "TMA Solution",
      startAt: new Date(2023, 10),
      endAt: new Date(2024, 0),
      technologies: ["React", "MUI"],
      desc: "Worked as a Frontend Developer Intern on a travel web application, developing responsive user interfaces and collaborating with the team to deliver core features.",
    },
  ],
} as const;
