import HeroSection from "@/app/components/HeroSection";
import Scroll3D from "@/app/components/Scroll3D";
import WorkExperience from "@/app/components/WorkExperience";
import Mesh from "@/app/components/Mesh";
import Biography from "@/app/components/Biography";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Scroll3D />
      <Biography />
      <Mesh />
    </main>
  );
}
