import Header from "@/components/Header";
import Intro from "@/components/intro/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import React from "react";

type LayoutProps = {
  modals: React.ReactNode;
  hero: React.ReactNode;
  about: React.ReactNode;
  projects: React.ReactNode;
  experience: React.ReactNode;
};

export default function Layout({
  hero,
  projects,
  experience,
  modals,
}: LayoutProps) {
  return (
    <>
      <Intro />
      {modals}
      <main className="relative pt-16">
        <Header />
        <SmoothScroll>
          {hero}
          {experience}
          {projects}
        </SmoothScroll>
      </main>
    </>
  );
}
