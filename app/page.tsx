import HeroSection from "@/app/components/HeroSection";
import Tesseract from "@/app/components/Tesseract";
import WorkExperience from "@/app/components/WorkExperience";
import Mesh from "@/app/components/Mesh";
import Biography from "@/app/components/Biography";
import Footer from "@/app/components/Footer";
import Skills from "@/app/components/Skills";
import Education from "@/app/components/Education";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <Biography />
      <Tesseract />
      {/* <Education /> */}
      <WorkExperience />
      <Skills />
      <Mesh />
      <Footer />
    </main>
  );
}
