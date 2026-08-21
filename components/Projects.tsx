import { metadata, SECTION } from "@/lib/metadata";
import Card from "./ui/Card";
import TechTag from "./TechTag";
import Image from "next/image";
import IconTag from "./ui/IconTag";
import Section from "./ui/Section";

export default function Projects() {
  return (
    <Section name={SECTION.Projects} subtitle={metadata.projects.subtitle}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {metadata.projects.items.map((project) => (
          <Card
            key={project.github}
            className="flex h-full flex-col overflow-hidden p-0"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video shrink-0 overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={`${project.name}-thumbnail`}
                fill
                sizes="350px"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-2.5">
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

                  <h3 className="text-lg font-medium text-foreground">
                    {project.name}
                  </h3>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} on GitHub`}
                    className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <TechTag name="GitHub" iconOnly />
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} demo`}
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <IconTag icon="heroicons:arrow-up-right" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-muted-foreground">
                {project.desc}
              </p>

              {/* Tech stack always stays at the bottom */}
              <div className="mt-auto pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <TechTag key={tech} name={tech} iconOnly />
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
