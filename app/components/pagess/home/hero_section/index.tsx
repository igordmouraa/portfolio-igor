'use client'

import {Framer} from "@/app/components/pagess/home/hero_section/framer";
import Image from "next/image";
import {TechBadge} from "@/app/components/tech_badge";
import {Button} from "@/app/components/button";
import {HiArrowNarrowRight, TbBrandDiscord, TbBrandGithub, TbBrandInstagram, TbBrandLinkedin} from "react-icons/all";

const Mock_Contacts = [
    {
        url: 'https://github.com/igordmouraa',
        icon: <TbBrandGithub/>
    },
    {
        url: 'https://www.linkedin.com/in/igordmoura/',
        icon: <TbBrandLinkedin/>
    },
    {
        url: 'https://github.com/igordmouraa',
        icon: <TbBrandDiscord/>
    },
    {
        url: 'https://www.instagram.com/igordmouraa/',
        icon: <TbBrandInstagram/>
    },
]

export const HeroSection = () => {
    return (
        <section className={'w-full lg:h-[755px] flex flex-col justify-end pb-10 sm:pb-32 py-32 lg:pb-[110px]'}>
            <Framer/>

            <div className={'container flex items-start justify-between flex-col-reverse lg:flex-row'}>
                <div className={'w-full lg:max-w-[530px] '}>
                    <p className={'font-mono text-purple-600'}>Olá, meu nome é</p>
                    <h2 className={'text-4xl font-medium mt-2'}>Igor Moura</h2>

                    <p className={'text-gray-400 my-6 text-sm sm:text-base'}>Olá, meu nome é Igor Moura e sou um
                        desenvolvedor full-stack apaixonado por tecnologia. Com
                        mais de 2 anos de experiência. Meu objetivo é criar sistemas robustos e funcionais, além de
                        participar de equipes técnicas em projetos desafiadores. Estou sempre aberto a novas
                        oportunidades e desafios.
                    </p>

                    <div className={'flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[348px'}>
                        {Array.from({length: 7}).map((_, index) => {
                            return <TechBadge key={index} name="Next.js"/>;
                        })}
                    </div>

                    <div className={'mt-6 lg:mt-10 flex sm:items-center sm:gap-5 flex-col sm:flex-row'}>
                        <Button className={'w-max shadow-button hover:bg-purple-950'}>
                            Entre em contato
                            <HiArrowNarrowRight className={'text-gray-50'}/>
                        </Button>

                        <div className={'text-gray-600 flex items-center gap-3 h-20'}>
                            {Mock_Contacts.map((contact, index) => (
                                <a
                                    href={contact.url}
                                    key={`contact-${index}`}
                                    target="_blank"
                                    className={' hover:text-gray-100 transition-colors'}
                                >
                                    {contact.icon}
                                </a>
                            ))}
                        </div>
                    </div>


                </div>

                <Image
                    width={420}
                    height={404}
                    className={'z-10 rounded-lg w-[300px] h-[400px] mb-6 lg:mb-0 shadow-2xl object-cover'}
                    src="/images/igor-pic.png"
                    alt={'Foto de Igor Moura'}
                />
            </div>
        </section>
    )
}