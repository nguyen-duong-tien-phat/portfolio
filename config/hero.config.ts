import { File, Github, Gmail, LinkedIn } from "@/components/icons";
import React from "react";

export const heroConfig = {
  name: "Finn",
  role: "Frontend Developer",
  desc: "I design and build calm, precise interfaces where typography, motion, and restraint do the heavy lifting.",
};

export const socialsConfig: Record<
  string,
  {
    label: string;
    link: string;
    target?: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }
> = {
  github: {
    label: "Github",
    link: "https://github.com/nguyen-duong-tien-phat",
    icon: Github,
  },
  gmail: { label: "Gmail", link: "mailto:phatndt268@gmail.com", icon: Gmail },
  linkedIn: {
    label: "LinkedIn",
    link: "https://www.linkedin.com/in/phat-nguyen-416758281/",
    icon: LinkedIn,
  },
  cv: { label: "Read CV", link: "/cv", target: "_self", icon: File },
};
