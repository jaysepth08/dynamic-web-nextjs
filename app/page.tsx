import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/users/HeroSection";
import { Team } from "./components/users/Team";
import { About } from "./components/users/About";
import { Contact } from "./components/users/Contact";

export default function Home({ searchParams }: { searchParams?: any }) {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Team id="team" />
      <About id="about" />
      <Contact id="contact" />
      <Footer />
    </>
  );
}
