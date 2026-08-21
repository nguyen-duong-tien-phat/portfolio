import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

const techs = {
  JavaScript: "logos:javascript",
  TypeScript: "logos:javascript",
  HTML5: "logos:html5",
  CSS3: "logos:css3",

  React: "logos:react",
  "Next.js": "logos:nextjs",
  Gatsby: "logos:gatsby",
  "Three.js": "logos:threejs",
  "Tailwind CSS": "logos:tailwindcss",

  "Node.js": "logos:nodejs",
  NestJS: "logos:nestjs",
  ".NET": "logos:dotnet",
  "C#": "devicon:csharp",

  PostgreSQL: "logos:postgresql",
  Redis: "logos:redis",

  "Styled Components": "devicon:styledcomponents",
  MUI: "thesvg-color:mui",
  Redux: "logos:redux",

  Docker: "logos:docker-icon",
  Git: "logos:git-icon",
  GitHub: "logos:github-icon",
  Gitlab: "logos:gitlab-icon",
} satisfies Record<string, string>;

export type TechName = keyof typeof techs;

interface TechTagProps {
  name: TechName;
  className?: string;
  iconOnly?: boolean;
}

export default function TechTag({ name, className, iconOnly }: TechTagProps) {
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
      <Icon icon={techs[name]} className="size-5 shrink-0" />

      {!iconOnly && <span>{name}</span>}
    </span>
  );
}
