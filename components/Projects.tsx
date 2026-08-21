import { metadata, SECTION } from "@/lib/metadata";
import Card from "./ui/Card";
import TechTag from "./ui/TechTag";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

export default function Projects() {
  return (
    <section id={SECTION.Projects} className="w-full pt-10 pb-16">
      <h2 className="text-foreground text-3xl font-normal tracking-tight">
        {SECTION.Projects}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {metadata.projects.map((project) => (
          <Card
            key={project.github}
            className="flex h-full flex-col overflow-hidden p-0"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video shrink-0 overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={`${project.name} preview`}
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
                        alt={`${project.name} logo`}
                        fill
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
                    <FaGithub className="size-4" />
                  </a>

                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} demo`}
                      className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <HiArrowUpRight className="size-4" />
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
    </section>
  );
}
