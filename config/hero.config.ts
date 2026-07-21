export const heroConfig = {
  name: "Finn Nguyen",
  role: "Frontend Developer",
  desc: "I design and build calm, precise interfaces where typography, motion, and restraint do the heavy lifting.",
};

export const socialsConfig: Record<
  string,
  { label: string; link: string; target?: string }
> = {
  github: {
    label: "Github",
    link: "https://github.com/nguyen-duong-tien-phat",
  },
  gmail: { label: "Gmail", link: "mailto:phatndt268@gmail.com" },
  linkedIn: {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/phat-nguyen-416758281/",
  },
  cv: { label: "Read CV", link: "/cv", target: "_self" },
};
