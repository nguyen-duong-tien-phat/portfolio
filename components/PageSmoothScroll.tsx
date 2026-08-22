"use client";

import { useLenis } from "@/hooks/useLenis";

export default function PageSmoothScroll() {
  useLenis({ isPageInstance: true, syncScrollTrigger: true });
  return null;
}
