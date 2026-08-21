"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  year: number;
  totalContributions: number;
  weeks: ContributionWeek[];
}

interface GitHubContributionsProps {
  className?: string;
}

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const weekVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const cellVariants: Variants = {
  hidden: {
    scale: 0,
    opacity: 0,
    y: 6,
  },
  visible: {
    scale: [0, 1.18, 1],
    opacity: 1,
    y: [6, -1, 0],
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const LEVELS = [
  "bg-neutral-200/40",
  "bg-[#9be9a8]",
  "bg-[#40c463]",
  "bg-[#30a14e]",
  "bg-[#216e39]",
];

function getLevel(count: number) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;

  return 4;
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function getMonthLabel(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}

export default function GitHubContributions({
  className,
}: GitHubContributionsProps) {
  const [data, setData] = useState<ContributionCalendar | null>(null);

  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  useEffect(() => {
    async function fetchContributions() {
      try {
        const response = await fetch("/api/github/contributions");

        if (!response.ok) {
          throw new Error("Failed to fetch contributions");
        }

        const calendar: ContributionCalendar = await response.json();

        setData(calendar);
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
      }
    }

    fetchContributions();
  }, []);

  if (!data) {
    return (
      <div
        className={cn(
          "h-32 w-full animate-pulse rounded-lg bg-neutral-100",
          className,
        )}
      />
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <p className="text-sm text-foreground mb-4 ">
        {data.totalContributions.toLocaleString()} contributions in {data.year}
      </p>

      {/* Graph */}
      <div className="overflow-x-auto pb-1">
        <div className="w-max">
          {/* Month labels */}
          <div className="mb-1 flex gap-1">
            {data.weeks.map((week, weekIndex) => {
              const firstDay = week.contributionDays[0];

              if (!firstDay) {
                return <div key={weekIndex} className="w-3 shrink-0" />;
              }

              const month = getMonthLabel(firstDay.date);

              const previousWeek = data.weeks[weekIndex - 1];
              const previousFirstDay = previousWeek?.contributionDays[0];

              const previousMonth = previousFirstDay
                ? getMonthLabel(previousFirstDay.date)
                : null;

              const shouldShowMonth =
                weekIndex === 0 || month !== previousMonth;

              return (
                <div
                  key={weekIndex}
                  className="w-3 shrink-0 text-xs text-muted-foreground"
                >
                  {shouldShowMonth && (
                    <span className="whitespace-nowrap">{month}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contribution cells */}
          <motion.div
            className="flex gap-1"
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 1 }}
          >
            {data.weeks.map((week, weekIndex) => (
              <motion.div
                key={weekIndex}
                variants={weekVariants}
                className="flex flex-col gap-1"
              >
                {week.contributionDays.map((day) => {
                  const level = getLevel(day.contributionCount);

                  return (
                    <motion.button
                      key={day.date}
                      type="button"
                      variants={cellVariants}
                      whileHover={{ scale: 1.35 }}
                      onMouseEnter={() => setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={cn(
                        "size-3 cursor-default rounded-[3px]",
                        "outline-none",
                        LEVELS[level],
                      )}
                      aria-label={`${day.contributionCount} contributions on ${day.date}`}
                    />
                  );
                })}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 flex min-h-5 items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>
          {hoveredDay ? (
            <>
              {hoveredDay.contributionCount} contribution
              {hoveredDay.contributionCount !== 1 ? "s" : ""} on{" "}
              {formatDate(hoveredDay.date)}
            </>
          ) : (
            "Hover over a day"
          )}
        </span>

        <div className="flex shrink-0 items-center gap-1">
          <span>Less</span>

          {LEVELS.map((level) => (
            <span key={level} className={cn("size-3 rounded-[3px]", level)} />
          ))}

          <span>More</span>
        </div>
      </div>
    </div>
  );
}
