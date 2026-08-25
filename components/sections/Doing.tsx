import { metadata, SECTION } from "@/lib/metadata";
import Section from "../ui/Section";

export default function Doing() {
  return (
    <Section name={SECTION.Doing}>
      <div className="flex flex-col gap-1">
        {metadata.doing.map((task, index) => (
          <div
            key={task.title}
            className="group flex items-center gap-5 rounded-2xl px-4 py-5 transition-all duration-300 hover:bg-muted/50"
          >
            <span className="w-10 text-4xl font-light leading-none tracking-tighter text-muted-foreground/30 transition-all duration-300 group-hover:scale-110 group-hover:text-foreground">
              0{index + 1}
            </span>

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <h3 className="shrink-0 text-lg font-medium tracking-tight">
                {task.title}
              </h3>

              <p className="truncate text-sm text-muted-foreground">
                {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
