"use client";
import Header from "@/components/Header";
import Intro from "@/components/intro/Intro";
import SmoothScroll from "@/components/SmoothScroll";
import { useAssets } from "@/hooks/useAssets";
import React, { useEffect, useState } from "react";

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
  const { ready } = useAssets();
  const [showPage, setShowPage] = useState(false);

  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      setShowPage(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [ready]);

  return (
    <>
      <Intro />
      {modals}
      {showPage && (
        <main className="relative pt-16">
          <Header />
          <SmoothScroll>
            <div className="h-16"></div> {/* header height */}
            {hero}
            {experience}
            {projects}
          </SmoothScroll>
        </main>
      )}
    </>
  );
}
