import {SectionTitle} from "@/app/components/section_title";
import {KnowTech} from "@/app/components/pagess/home/know_techs/know_tech";
import {TbBrandNextjs} from "react-icons/all";

export const KnowTechs = () => {
    return (
        <section className={'container py-16'}>
            <SectionTitle title={"Conhecimentos"} subtitle={"Competencias"}/>

            <div>
                <KnowTech tech={{
                    icon: <TbBrandNextjs/>,
                    name: 'Next.js',
                    startDate: '2024-10-18'
                }}/>
            </div>
        </section>
    )
}