import HeroSection from "@/app/components/HeroSection";
import Tesseract from "@/app/components/Tesseract";
import WorkExperience from "@/app/components/WorkExperience";
import Mesh from "@/app/components/Mesh";
import Biography from "@/app/components/Biography";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Tesseract />
      <Biography />
      <Mesh />
    </main>
  );
}
