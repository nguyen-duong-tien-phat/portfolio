import Section from "@/components/ui/Section";
import { experienceConfig } from "@/config/experience.config";
import { formatDate } from "@/lib/datetime";
import { cn } from "@/lib/utils";

export default function Experience() {
  return (
    <Section name="experience" className="flex flex-col">
      <h1 className="max-w-100 mb-8 text-balance text-5xl md:text-7xl font-medium leading-[1.02] tracking-[-0.03em]">
        {experienceConfig.title}
      </h1>
      <ul
        data-scrollable
        className="flex-1 flex flex-col gap-4 sm:gap-0 overflow-auto"
      >
        {experienceConfig.experience.map((experience) => (
          <li
            key={experience.company}
            className={cn(
              "sm:grid grid-cols-10 items-center p-4 rounded-lg sm:rounded-none sm:py-5 sm:px-2",
              "border border-black/10 sm:last:border-b-0 sm:border-l-0 sm:border-t-0 md:border-r-0",
              "transition hover:bg-black/5 cursor-pointer",
            )}
          >
            <div className="col-span-3 lg:col-span-2 flex items-center gap-3">
              <span
                className={cn(
                  "grid-cols-1 size-1.5 bg-black/80 rounded-full outline outline-black/80 outline-offset-2",
                  "hidden sm:block",
                )}
              ></span>

              <p className="flex items-center gap-2 font-mono sm:text-sm text-gray-500 grid-cols-3 mb-1 sm:mb-0">
                {formatDate(experience.startAt, {
                  month: "2-digit",
                  year: "numeric",
                })}{" "}
                <span>-</span>
                {experience.endAt
                  ? formatDate(experience.endAt, {
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "Present"}
              </p>
            </div>

            <div className="col-span-7 lg:col-span-5">
              <p className="font-medium text-2xl sm:text-xl">
                {experience.company}
              </p>
              <p className="font-mono text-gray-500 mt-1">{experience.role}</p>
              <div className="mt-3 flex items-center gap-3 flex-wrap">
                {experience.technologies.map((tech) => (
                  <span
                    key={`${experience.company}-${tech}`}
                    className="font-mono text-sm border border-black/20 py-1 px-2 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <p className="sm:hidden lg:block lg:col-span-3 mt-3 sm:mt-0">
              {experience.desc}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
