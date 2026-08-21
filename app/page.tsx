import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Separate from "@/components/Separate";
import Skills from "@/components/sections/Skills";
import Footer from "@/components/sections/Footer";
// import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      {/* <TopBar /> */}
      <main className="max-w-3xl mx-auto px-5">
        <Hero />

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
