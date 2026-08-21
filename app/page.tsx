import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Separate from "@/components/Separate";
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
      </main>
    </>
  );
}
