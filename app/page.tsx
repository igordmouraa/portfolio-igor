import {HeroSection} from "@/app/components/pagess/home/hero_section";
import {KnowTechs} from "@/app/components/pagess/home/know_techs";
import {HighlightedProjects} from "@/app/components/pagess/home/highlighted-projects";
import {ProfessionalExperience} from "@/app/components/pagess/home/professional-experience";

export default async function Home() {
  return (
    <>
        <HeroSection/>
        <KnowTechs/>
        <HighlightedProjects/>
        <ProfessionalExperience/>
    </>
  )
}
