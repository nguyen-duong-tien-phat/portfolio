"use client";

import React from "react";
import Intro from "@/components/intro/Intro";

const Layout: React.FC<{ hero: React.ReactNode; modals: React.ReactNode }> = ({
  hero,
  modals,
}) => {
  return (
    <>
      <Intro />
      <main>
        {modals}
        {hero}
      </main>
    </>
  );
};

export default Layout;
