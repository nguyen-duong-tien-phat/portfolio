export enum SECTION_NAME {
  HERO = "Portfolio",
  EXPERIENCE = "Experience",
  PROJECTS = "Projects",
}

export const sectionConfig = [
  { name: SECTION_NAME.HERO },
  { name: SECTION_NAME.EXPERIENCE },
  { name: SECTION_NAME.PROJECTS },
] as const;
