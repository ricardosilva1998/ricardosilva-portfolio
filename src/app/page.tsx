import { Hero } from "@/components/home/Hero";
import { AboutBlock } from "@/components/home/AboutBlock";
import { ProjectsGrid } from "@/components/home/ProjectsGrid";
import { LinkedInCard } from "@/components/home/LinkedInCard";
import { ContactBlock } from "@/components/home/ContactBlock";

export default function HomePage() {
  return (
    <div className="pb-8">
      <Hero />
      <AboutBlock />
      <ProjectsGrid />
      <LinkedInCard />
      <ContactBlock />
    </div>
  );
}
