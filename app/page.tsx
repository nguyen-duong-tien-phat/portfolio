import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Separate from "@/components/Separate";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";
import GithubGraph from "@/components/GithubGraph";
// import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      {/* <TopBar /> */}
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
