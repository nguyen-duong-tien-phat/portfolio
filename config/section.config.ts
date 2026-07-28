export enum SECTION_NAME {
  PORTFOLIO = "Portfolio",
  EXPERIENCE = "Experience",
  PROJECTS = "Projects",
}

export const sectionConfig = [
  { name: SECTION_NAME.PORTFOLIO },
  { name: SECTION_NAME.EXPERIENCE },
  { name: SECTION_NAME.PROJECTS },
] as const;
