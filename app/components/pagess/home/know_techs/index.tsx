'use client'
import {SectionTitle} from "@/app/components/section_title";
import {KnowTech} from "@/app/components/pagess/home/know_techs/know_tech";
import {
    TbBrandDocker, TbBrandFigma,
    TbBrandFirebase, TbBrandGit,
    TbBrandJavascript,
    TbBrandMongodb,
    TbBrandMysql,
    TbBrandNextjs, TbBrandReact, TbBrandReactNative, TbBrandTailwind,
    TbBrandTypescript, TbBrandVercel
} from "react-icons/tb";
import {SiGooglecloud, SiNestjs, SiNodedotjs} from "react-icons/all";







export const KnowTechs = () => {
    return (
        <section className={'container py-16'}>
            <SectionTitle title={"Conhecimentos"} subtitle={"Competências"}/>

            <div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5'>
                    <KnowTech tech={{
                        icon: <SiNodedotjs className='text-4xl'/>,
                        name: 'Node.js',
                        startDate: '2023-03-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandTypescript className='text-4xl'/>,
                        name: 'Typescript',
                        startDate: '2024-05-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandJavascript className='text-4xl'/>,
                        name: 'Javascript',
                        startDate: '2023-03-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandFirebase className='text-4xl'/>,
                        name: 'Firebase',
                        startDate: '2024-05-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandMongodb className='text-4xl'/>,
                        name: 'Mongo DB',
                        startDate: '2023-07-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandMysql className='text-4xl'/>,
                        name: 'MySQL',
                        startDate: '2023-07-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <SiNestjs className='text-4xl'/>,
                        name: 'Nest.js',
                        startDate: '2024-03-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandDocker className='text-4xl'/>,
                        name: 'Docker',
                        startDate: '2024-03-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandReact className='text-4xl'/>,
                        name: 'React',
                        startDate: '2023-07-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandNextjs className='text-4xl'/>,
                        name: 'Next.js',
                        startDate: '2024-05-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandTailwind className='text-4xl'/>,
                        name: 'Tailwind CSS',
                        startDate: '2023-07-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandReactNative className='text-4xl'/>,
                        name: 'React Native',
                        startDate: '2024-02-20'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandGit className='text-4xl'/>,
                        name: 'Git',
                        startDate: '2023-03-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandVercel className='text-4xl'/>,
                        name: 'Vercel',
                        startDate: '2024-07-10'
                    }}/>
                    <KnowTech tech={{
                        icon: <SiGooglecloud className='text-4xl'/>,
                        name: 'Google Cloud',
                        startDate: '2024-02-20'
                    }}/>
                    <KnowTech tech={{
                        icon: <TbBrandFigma className='text-4xl'/>,
                        name: 'Figma',
                        startDate: '2023-03-20'
                    }}/>

                </div>

            </div>
        </section>
    )
}