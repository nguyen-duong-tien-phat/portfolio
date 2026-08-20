import Hero from "@/components/Hero";
import TopBar from "@/components/TopBar";

export default function Page() {
  return (
    <>
      <TopBar />
      <main className="max-w-3xl mx-auto px-5 py-10">
        <Hero />
      </main>
    </>
  );
}
