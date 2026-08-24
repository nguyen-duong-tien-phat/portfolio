// app/projects/[name]/page.tsx

import ProjectDetails from "@/components/sections/ProjectDetails";
import Button from "@/components/ui/Button";
import IconTag from "@/components/ui/IconTag";
import { getReadme } from "@/lib/github";
import { metadata } from "@/lib/metadata";
import Link from "next/link";

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
      <Link href={"/"}>
        <Button
          variant="ghost"
          size="sm"
          className="mb-3 mt-5"
          leftIcon={
            <IconTag icon="heroicons:arrow-left" className="[&_svg]:size-3" />
          }
        >
          Back to home
        </Button>
      </Link>
      <div className="h-[calc(100dvh-150px)]">
        <ProjectDetails project={project} readme={readme} />
      </div>
    </main>
  );
}
