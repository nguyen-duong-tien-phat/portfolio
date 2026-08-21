import IconTag from "./ui/IconTag";

const techs = {
  JavaScript: "logos:javascript",
  TypeScript: "logos:typescript-icon",
  HTML5: "vscode-icons:file-type-html",
  CSS3: "logos:css",

  React: "logos:react",
  "Next.js": "logos:nextjs-icon",
  Gatsby: "logos:gatsby",
  "Three.js": "logos:threejs",
  "Tailwind CSS": "logos:tailwindcss-icon",
  GSAP: "thesvg-color:gsap",

  "Node.js": "logos:nodejs",
  NestJS: "logos:nestjs",
  ".NET": "logos:dotnet",
  "C#": "devicon:csharp",
  Moq: "thesvg-color:moq",

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

export default function TechTag({ name, iconOnly }: TechTagProps) {
  return <IconTag name={iconOnly ? undefined : name} icon={techs[name]} />;
}
