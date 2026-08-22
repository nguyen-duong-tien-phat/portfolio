import MarkdownContent from "@/components/MarkdownContent";
import MarkdownScrollArea from "@/components/MarkdownScrollArea";
import Separate from "@/components/Separate";
import TechTag from "@/components/TechTag";
import { Project } from "@/lib/metadata";
import Image from "next/image";

import "github-markdown-css/github-markdown-light.css";

type Readme = {
  content: string;
  repoBaseUrl: string;
} | null;

type ProjectDetailsProps = {
  project: Project;
  readme: Readme;
};

export default function ProjectDetails({
  project,
  readme,
}: ProjectDetailsProps) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Header */}
      <div className="shrink-0 pr-10">
        <p className="font-mono text-xs text-muted-foreground">
          Projects / {project.name}
        </p>

        <div className="flex min-w-0 items-center gap-2.5 mt-2 ">
          {project.logo && (
            <div className="relative size-7 shrink-0">
              <Image
                src={project.logo}
                alt={`${project.name}-logo`}
                fill
                sizes="300px"
                className="object-contain"
              />
            </div>
          )}

          <h1 className="text-3xl font-medium tracking-tight text-foreground">
            {project.name}
          </h1>
        </div>
      </div>

      {/* Tech stack */}
      <div className="mt-4 flex shrink-0 flex-wrap gap-2">
        {project.tech.map((tech) => (
          <TechTag key={tech} name={tech} />
        ))}
      </div>

      <Separate className="my-5 shrink-0" />

      {/* README takes remaining height */}
      <MarkdownScrollArea className="min-h-0 flex-1">
        <article className="markdown-body bg-transparent!">
          {readme ? (
            <MarkdownContent
              key={project.id}
              content={readme.content}
              repoBaseUrl={readme.repoBaseUrl}
            />
          ) : (
            <p>README not available.</p>
          )}
        </article>
      </MarkdownScrollArea>
    </div>
  );
}
