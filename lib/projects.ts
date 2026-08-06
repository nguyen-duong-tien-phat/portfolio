import LetsChill from "@/components/logos/LetsChill";

export type Project = {
  name: string;
  nameComp?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  github: string;
  demo: string;
  logo: string;
  desc: string;
  tech: string[];
};

export const projects: Project[] = [
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
];
