import HeroSection from "@/app/components/HeroSection";
import Tesseract from "@/app/components/Tesseract";
import WorkExperience from "@/app/components/WorkExperience";
import Mesh from "@/app/components/Mesh";
import Biography from "@/app/components/Biography";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Biography />
      <Tesseract />
      <WorkExperience />
      <Mesh />
      <Footer />
    </main>
  );
}
