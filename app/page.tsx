import HeroSection from "@/app/components/HeroSection";
import Tesseract from "@/app/components/TesseractSection";
import WorkExperience from "@/app/components/ExperienceSection";
import Mesh from "@/app/components/MeshSection";
import Biography from "@/app/components/BioSection";
import FooterSection from "@/app/components/FooterSection";
import Skills from "@/app/components/SkillsSection";

import AnimationCursor from "@/app/components/CursorAnimation";

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
