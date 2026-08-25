"use client";

import { metadata, SECTION } from "@/lib/metadata";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import TechTag from "../TechTag";
import Card from "../ui/Card";
import IconTag from "../ui/IconTag";
import Section from "../ui/Section";
import { Tooltip } from "../ui/ToolTip";

const projectCardVariants: Variants = {
  hidden: (index: number) => ({
    y: 30,
    x: index % 2 === 0 ? -40 : 40,
    scale: 0.97,
    filter: "blur(5px)",
  }),
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 150, damping: 21, mass: 0.65 },
  },
};

export default function Projects() {
  return (
    <Section name={SECTION.Projects} subtitle={metadata.projects.subtitle}>
      <div className="grid grid-cols-1 gap-5 md:gap-3 md:grid-cols-2">
        {metadata.projects.items.map((project, index) => (
          <motion.div
            key={project.id}
            custom={index}
            variants={projectCardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
          >
            <Card className="flex h-full flex-col">
              {/* Thumbnail */}
              <div className="relative aspect-video shrink-0">
                <Image
                  src={project.thumbnail}
                  alt={`${project.name}-thumbnail`}
                  fill
                  loading="eager"
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

                    <h3 className="text-xl font-medium text-foreground flex items-center">
                      {project.name}
                      {project.inProgress && (
                        <span className="ml-2 rounded-full border border-blue-500/30 px-1.5 py-0.5 text-xs text-blue-500">
                          In Progress
                        </span>
                      )}
                    </h3>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Tooltip content="View details" position="left">
                      <Link href={`/projects/${project.id}`}>
                        <IconTag icon="lucide:scan-search" />
                      </Link>
                    </Tooltip>
                    <Tooltip content="Source code" position="left">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} on GitHub`}
                        className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <TechTag name="GitHub" iconOnly />
                      </a>
                    </Tooltip>

                    {project.demo && (
                      <Tooltip content="Demo" position="left">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} demo`}
                          className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <IconTag icon="heroicons:arrow-up-right" />
                        </a>
                      </Tooltip>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {project.desc}
                </p>

                {/* Tech stack */}
                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <TechTag key={tech} name={tech} iconOnly />
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
