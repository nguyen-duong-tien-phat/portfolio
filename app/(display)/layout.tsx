"use client";

import React from "react";
import Intro from "@/components/intro/Intro";

const Layout: React.FC<{
  modals: React.ReactNode;
  hero: React.ReactNode;
  about: React.ReactNode;
}> = ({ hero, about, modals }) => {
  return (
    <>
      <Intro />
      <main>
        {modals}
        {hero}
        {about}
      </main>
    </>
  );
};

export default Layout;
