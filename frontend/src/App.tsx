import { useEffect } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { wakeApi } from "./lib/api";

export default function App() {
  useEffect(wakeApi, []);

  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
