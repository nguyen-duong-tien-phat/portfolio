import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Separate from "@/components/Separate";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";
import GithubGraph from "@/components/GithubGraph";
import ThemeToggle from "@/components/ThemeToggle";
// import TopBar from "@/components/TopBar";

import "@/components/styles/theme-toggle.css";
import { Tooltip } from "@/components/ui/ToolTip";

export default function Page() {
  return (
    <>
      {/* <TopBar /> */}

      <div className="absolute right-10 top-10 hidden sm:block">
        <Tooltip content="I get this switch from Uiverse" position="left">
          <ThemeToggle />
        </Tooltip>
      </div>

      <main className="max-w-4xl mx-auto px-5">
        <Hero />

        <GithubGraph />

        <Separate />

        <Experience />

        <Projects />

        <Skills />

        <Separate />

        <Footer />
      </main>
    </>
  );
}
