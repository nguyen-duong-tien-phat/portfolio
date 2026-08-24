import { metadata } from "@/lib/metadata";
import { getReadme } from "@/lib/github";
import ProjectDetails from "@/components/sections/ProjectDetails";

export default async function ProjectModalPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const project = metadata.projects.items.find((p) => p.id === name);

  if (!project) return null;

  const readme = project.github ? await getReadme(project.github) : null;

  return (
    <div className="h-[75dvh]">
      <ProjectDetails project={project} readme={readme} />
    </div>
  );
}
