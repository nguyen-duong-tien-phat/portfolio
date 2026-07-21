import React from "react";

export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen flex flex-col mx-auto px-6 md:px-12 py-8 w-[min(1600px,100%)]">
      {children}
    </section>
  );
}
