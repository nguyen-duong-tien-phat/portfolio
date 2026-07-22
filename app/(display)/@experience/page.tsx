import Section from "@/components/ui/Section";
import { experienceConfig } from "@/config/experience.config";
import { formatDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";

export default function Experience() {
  return (
    <Section name="experience">
      <h1 className="mb-14 text-balance text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em]">
        {experienceConfig.title}
      </h1>
      <ul className="">
        {experienceConfig.experience.map((ex) => (
          <li
            key={ex.company}
            className={cn(
              "grid grid-cols-10 items-center py-5 px-2 not-last:border-b border-black/10",
              "hover:bg-black/5 cursor-pointer",
            )}
          >
            <div className="col-span-2 flex items-center gap-3">
              <span className="grid-cols-1 size-1.5 bg-black/80 rounded-full outline outline-black/80 outline-offset-2"></span>

              <p className="flex items-center gap-2 font-mono text-sm text-gray-500 grid-cols-3">
                {formatDate(ex.startAt, {
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                <span>-</span>
                {ex.endAt
                  ? formatDate(ex.endAt, {
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "Present"}
              </p>
            </div>

            <div className="col-span-4">
              <p className="font-medium text-xl">{ex.company}</p>
              <p className="font-mono text-gray-500 mt-1">{ex.role}</p>
              <div className="mt-3 flex items-center gap-3">
                {ex.technologies.map((tech) => (
                  <span
                    key={`${ex.company}-${tech}`}
                    className="font-mono text-sm border border-black/20 py-1 px-2 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <p className="col-span-4">{ex.desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
