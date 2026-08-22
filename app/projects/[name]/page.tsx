// app/projects/[name]/page.tsx

import { metadata } from "@/lib/metadata";
import { getReadme } from "@/lib/github";
import ProjectDetails from "@/components/sections/ProjectDetails";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const project = metadata.projects.items.find((p) => p.id === name);

  if (!project) return null;

  const readme = project.github ? await getReadme(project.github) : null;

  return (
    <main className="mx-auto max-w-4xl p-5 h-screen">
      <ProjectDetails project={project} readme={readme} />
    </main>
  );
}
