import { HeroSection } from '@/app/components/sections/home/hero-section';
import { SkillsSection } from '@/app/components/sections/home/skills-section';
import { ProjectsSection } from '@/app/components/sections/home/projects-section';
import { ExperienceSection } from '@/app/components/sections/home/experience-section';
import { ContactSection } from '@/app/components/sections/home/contact-section';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <SkillsSection />
            <ProjectsSection />
            <ExperienceSection />
            <ContactSection />
        </main>
    );
}
