"use client";
import Header from "@/components/Header";
import Intro from "@/components/intro/Intro";
import { sectionConfig } from "@/config/section.config";
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
      <main>
        <Header section={sectionConfig[0]} />
        {hero}
        {experience}
        {projects}
      </main>
    </>
  );
}
