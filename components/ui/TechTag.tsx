import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiSass,
  SiReact,
  SiNextdotjs,
  SiGatsby,
  SiThreedotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiNestjs,
  SiStyledcomponents,
  SiMui,
  SiReactquery,
  SiPostgresql,
  SiRedis,
  SiDotnet,
  SiDocker,
  SiGit,
  SiGithub,
  SiGitlab,
  SiRedux,
} from "react-icons/si";
import { cn } from "@/lib/utils";
import { TbBrandCSharp } from "react-icons/tb";
import { BiLogoPostgresql } from "react-icons/bi";

const techs = {
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  HTML5: { icon: SiHtml5, color: "#E34F26" },
  CSS3: { icon: SiCss, color: "#1572B6" },
  SCSS: { icon: SiSass, color: "#CC6699" },

  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#171717" },
  Gatsby: { icon: SiGatsby, color: "#663399" },
  "Three.js": { icon: SiThreedotjs, color: "#000000" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },

  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  NestJS: { icon: SiNestjs, color: "#E0234E" },
  ".NET": { icon: SiDotnet, color: "#512BD4" },
  "C#": { icon: TbBrandCSharp, color: "#512BD4" },

  PostgreSQL: { icon: BiLogoPostgresql, color: "#4169E1" },
  Redis: { icon: SiRedis, color: "#FF4438" },

  "Styled Components": { icon: SiStyledcomponents, color: "#DB7093" },
  MUI: { icon: SiMui, color: "#007FFF" },
  "TanStack Query": { icon: SiReactquery, color: "#FF4154" },
  Redux: { icon: SiRedux, color: "#764ABC" },

  Docker: { icon: SiDocker, color: "#2496ED" },
  Git: { icon: SiGit, color: "#F05032" },
  GitHub: { icon: SiGithub, color: "#181717" },
  Gitlab: { icon: SiGitlab, color: "#FC6D26" },
} satisfies Record<string, { icon: IconType; color: string }>;

export type TechName = keyof typeof techs;

interface TechTagProps {
  name: TechName;
  className?: string;
  iconOnly?: boolean;
}

export default function TechTag({ name, className, iconOnly }: TechTagProps) {
  const { icon: Icon, color } = techs[name];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md",
        !iconOnly && "border border-black/8",
        iconOnly ? "p-1" : "px-2 py-1",
        "text-xs text-muted-foreground",
        "transition-[transform,background-color,border-color] duration-200",
        "hover:border-black/12 hover:bg-neutral-200/60",
        className,
      )}
    >
      <Icon className="size-4 shrink-0" style={{ color }} />

      {!iconOnly && <span>{name}</span>}
    </span>
  );
}
