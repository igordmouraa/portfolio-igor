import {HeroSection} from "@/app/components/pagess/home/hero_section";
import {KnowTechs} from "@/app/components/pagess/home/know_techs";
import {HighlightedProjects} from "@/app/components/pagess/home/highlighted-projects";
import {ProfessionalExperience} from "@/app/components/pagess/home/professional-experience";
import {HorizontalDivider} from "@/app/components/divider";

export default async function Home() {
    return (
        <main>
            <div id="home"><HeroSection/></div>
            <div id="techs"><KnowTechs/></div>
            <HorizontalDivider className="my-0"/>
            <div id="projects"><HighlightedProjects/></div>
            <HorizontalDivider className="my-0"/>
            <div id="experience"><ProfessionalExperience/></div>
        </main>
    )
}