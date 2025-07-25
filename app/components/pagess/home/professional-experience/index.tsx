'use client'

import {SectionTitle} from "@/app/components/section_title"
import {ExperienceItem} from '@/app/components/experience_item'
import {experiences} from '@/app/lib/experiences'

export const ProfessionalExperience = () => {
    return (
        <section className="container py-16 sm:py-24" id="experience">
            <SectionTitle title="Experiência Profissional" subtitle="experiências"/>

            <div className="mt-12 flex flex-col gap-4">
                {experiences.map((exp) => (
                    <ExperienceItem key={exp.company} experience={exp}/>
                ))}
            </div>
        </section>
    )
}