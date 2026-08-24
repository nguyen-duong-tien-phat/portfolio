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

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const textVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const monthVariants: Variants = {
  hidden: { y: 4, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const weekVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
};

const cellVariants: Variants = {
  hidden: { scale: 0, opacity: 0, y: 6 },
  visible: {
    scale: [0, 1.18, 1],
    opacity: 1,
    y: [6, -1, 0],
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const legendVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const LEVELS = [
  "bg-[#ebedf0] dark:bg-[#161b22]",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

// Number of skeleton weeks/days shown while the real data is loading, so the
// placeholder roughly matches the size/shape of the eventual graph.
const SKELETON_WEEKS = 53;
const SKELETON_DAYS = 7;

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
  return new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(`${date}T00:00:00`),
  );
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

        if (!response.ok) throw new Error("Failed to fetch contributions");

        const calendar: ContributionCalendar = await response.json();
        setData(calendar);
      } catch (error) {
        console.error("Failed to fetch GitHub contributions:", error);
      }
    }

    fetchContributions();
  }, []);

  return (
    <motion.div
      className={cn("w-full", className)}
      variants={contentVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Header - renders immediately, doesn't wait on data */}
      <motion.div
        variants={textVariants}
        className="mb-4 flex justify-between items-end"
      >
        <h3 className="text-lg font-medium text-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
            Hello, world!
          </code>
          once a day.
        </h3>

        {data ? (
          <p className="mt-1 text-sm text-muted-foreground">
            {data.totalContributions.toLocaleString()} contributions in{" "}
            {data.year}
          </p>
        ) : (
          <span className="mt-1 h-4 w-40 animate-pulse rounded bg-foreground/10" />
        )}
      </motion.div>

      {/* Graph */}
      <div className="overflow-x-auto pb-1">
        <div className="w-max">
          {data ? (
            <>
              {/* Month labels */}
              <motion.div
                className="mb-1 flex gap-1"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.03 } },
                }}
              >
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
                    <motion.div
                      key={weekIndex}
                      variants={monthVariants}
                      className="w-3 shrink-0 text-xs text-muted-foreground"
                    >
                      {shouldShowMonth && (
                        <span className="whitespace-nowrap">{month}</span>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Contribution cells */}
              <motion.div
                className="flex gap-1"
                initial="hidden"
                animate="visible"
                variants={gridVariants}
              >
                {data.weeks.map((week, weekIndex) => (
                  <motion.div
                    key={weekIndex}
                    variants={weekVariants}
                    className={cn(
                      "flex flex-col gap-1",
                      weekIndex == 0 && "justify-end",
                    )}
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
                            "size-3 cursor-default rounded-[3px] outline-none",
                            LEVELS[level],
                          )}
                          aria-label={`${day.contributionCount} contributions on ${day.date}`}
                        />
                      );
                    })}
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <>
              <div className="mb-1 h-4"></div>

              {/* Cells skeleton */}
              <div className="flex gap-1">
                {Array.from({ length: SKELETON_WEEKS }).map((_, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: SKELETON_DAYS }).map(
                      (_, dayIndex) => (
                        <div
                          key={dayIndex}
                          className="size-3 animate-pulse rounded-[3px] bg-foreground/10"
                          style={{
                            animationDelay: `${(weekIndex * SKELETON_DAYS + dayIndex) * 3}ms`,
                            animationDuration: "1.1s",
                          }}
                        />
                      ),
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer - renders immediately, doesn't wait on data */}
      <motion.div
        variants={textVariants}
        className="mt-3 flex min-h-5 items-center justify-between gap-4 text-xs text-muted-foreground"
      >
        <span>
          {hoveredDay
            ? `${hoveredDay.contributionCount} contribution${hoveredDay.contributionCount !== 1 ? "s" : ""} on ${formatDate(hoveredDay.date)}`
            : "Hover over a day"}
        </span>

        <motion.div
          className="flex shrink-0 items-center gap-1"
          variants={legendVariants}
        >
          <motion.span variants={textVariants}>Less</motion.span>

          {LEVELS.map((level) => (
            <motion.span
              key={level}
              variants={cellVariants}
              className={cn("size-3 rounded-[3px]", level)}
            />
          ))}

          <motion.span variants={textVariants}>More</motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
