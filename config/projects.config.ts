import LetsChill from "@/components/logos/LetsChill";

export const projectsConfig: {
  name: string;
  nameComp?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  github: string;
  link: string;
  logo: string;
  desc: string;
}[] = [
  {
    name: "Let's chill",
    nameComp: LetsChill,
    github: "https://github.com/nguyen-duong-tien-phat/lets-chill",
    link: "https://letschill-pqgu.vercel.app",
    logo: "/logos/lets-chill-logo.png",
    desc: "This was my first project after self-learning web development. Inspired by immersive full-screen websites and modern music player interfaces, I combined these ideas to build an interactive experience while exploring animations, layout design, and frontend development fundamentals.",
  },
  {
    name: "Let's movie",
    github: "https://github.com/nguyen-duong-tien-phat/lets-movie",
    link: "https://lets-movie.vercel.app/",
    logo: "/logos/lets-movie-logo.png",
    desc: "This project was built while I was learning how to integrate third-party APIs using a free movie database API. It also gave me hands-on experience implementing authentication with NextAuth, supporting GitHub, Google, and Facebook sign-in.",
  },
] as const;
