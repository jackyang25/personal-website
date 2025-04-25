import HeroSection from "@/app/components/hero";
import Tesseract from "@/app/components/section-tesseract";
import WorkExperience from "@/app/components/section-experience";
import Mesh from "@/app/components/section-mesh";
import Biography from "@/app/components/bio";
import FooterSection from "@/app/components/footer";
import Skills from "@/app/components/section-skills";
import AnimationCursor from "@/app/components/animation-cursor";

export default function Home() {
  return (
    <main>
      <AnimationCursor />
      <HeroSection />
      <Biography />
      <Tesseract />
      <WorkExperience />
      <Skills />
      <Mesh />
      <FooterSection />
    </main>
  );
}
