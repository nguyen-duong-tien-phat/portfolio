import { metadata, SECTION } from "@/lib/metadata";
import Card from "./ui/Card";

export default function Projects() {
  return (
    <section id={SECTION.Projects} className="w-full pt-10 pb-16">
      <h2 className="text-foreground text-3xl font-normal tracking-tight">
        {SECTION.Projects}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-3">
        {metadata.projects.map((project) => (
          <div key={project.github}>
            <Card>
              <h3 className="text-lg font-medium text-foreground">EventHub</h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A ticket booking platform built with a focus on concurrency,
                reliability, and clean architecture.
              </p>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
