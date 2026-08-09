import End from "@/components/End";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      <TopBar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <End />
      </main>
    </>
  );
}
