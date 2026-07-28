"use client";
import {
  ChevronLeft,
  ChevronRight,
  Github,
  LinkIcon,
} from "@/components/icons";
import { Button } from "@/components/ui";
import Section from "@/components/ui/Section";
import { projectsConfig } from "@/config/projects.config";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const Monitor = dynamic(() => import("@/three/models/Monitor"));

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projectsConfig[activeProject];
  const NameComp = project.nameComp;

  const prevProject = () => setActiveProject((prev) => prev - 1);
  const nextProject = () => setActiveProject((prev) => prev + 1);

  return (
    <Section name="projects" className="grid grid-cols-1 lg:grid-cols-5">
      <div className="col-span-3 overflow-hidden">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 0.9], fov: 35 }}>
          <Monitor url={project.link} />
        </Canvas>
      </div>

      <div className="col-span-2 pt-5 lg:pt-28 lg:pb-30 lg:pl-5 flex flex-col lg:justify-center">
        <div className="flex items-center mb-2">
          <Image alt="logo" src={project.logo} width={50} height={50} />
          <div className="flex-1 ml-3">
            {NameComp ? (
              <NameComp className="h-12.5" />
            ) : (
              <h3 className="text-5xl">{project.name}</h3>
            )}
          </div>

          <a
            href={project.github}
            className="ml-7 text-black hover:text-blue-700"
          >
            <Github className="w-8" />
          </a>
          <a
            href={project.link}
            className="ml-5 text-black hover:text-blue-700"
          >
            <LinkIcon className="w-8" />
          </a>
        </div>

        <p className="flex-1 mt-5 font-mono md:text-lg text-justify">
          {project.desc}
        </p>

        <div className="flex justify-center gap-5">
          <Button icon onClick={prevProject} disabled={activeProject === 0}>
            <ChevronLeft className="w-7" />
          </Button>
          <Button
            icon
            onClick={nextProject}
            disabled={activeProject === projectsConfig.length - 1}
          >
            <ChevronRight className="w-7" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
