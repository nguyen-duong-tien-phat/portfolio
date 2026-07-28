"use client";
import Header from "@/components/Header";
import Intro from "@/components/intro/Intro";
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
      {/* <Intro /> */}
      {modals}
      <main className="relative w-[min(1600px,100%)] mx-auto">
        <Header />
        {hero}
        {experience}
        {projects}
      </main>
    </>
  );
}
