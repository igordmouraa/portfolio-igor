import { IconType } from 'react-icons';
import {
    TbBrandDocker, TbBrandFirebase, TbBrandGit, TbBrandJavascript,
    TbBrandMongodb, TbBrandMysql, TbBrandNextjs, TbBrandReact,
    TbBrandTailwind, TbBrandTypescript, TbBrandVercel
} from 'react-icons/tb';
import { SiGooglecloud, SiNestjs, SiNodedotjs } from 'react-icons/si';

export type TechCategory = 'frontend' | 'backend' | 'devops' | 'tools';

export type Tech = {
    icon: IconType;
    name: string;
    startDate: string;
    category: TechCategory;
    featured?: boolean;
};

export const techs: Tech[] = [
    { icon: TbBrandReact, name: 'React', startDate: '2023-07-10', category: 'frontend', featured: true },
    { icon: TbBrandNextjs, name: 'Next.js', startDate: '2024-05-10', category: 'frontend', featured: true },
    { icon: TbBrandTypescript, name: 'TypeScript', startDate: '2024-05-10', category: 'frontend', featured: true },
    { icon: TbBrandTailwind, name: 'Tailwind CSS', startDate: '2023-07-10', category: 'frontend' },
    { icon: SiNodedotjs, name: 'Node.js', startDate: '2023-03-10', category: 'backend', featured: true },
    { icon: SiNestjs, name: 'NestJS', startDate: '2024-03-10', category: 'backend', featured: true },
    { icon: TbBrandJavascript, name: 'JavaScript', startDate: '2023-03-10', category: 'backend' },
    { icon: TbBrandMongodb, name: 'MongoDB', startDate: '2023-07-10', category: 'backend' },
    { icon: TbBrandMysql, name: 'MySQL', startDate: '2023-07-10', category: 'backend' },
    { icon: TbBrandFirebase, name: 'Firebase', startDate: '2024-05-10', category: 'backend' },
    { icon: TbBrandDocker, name: 'Docker', startDate: '2024-03-10', category: 'devops', featured: true },
    { icon: TbBrandVercel, name: 'Vercel', startDate: '2024-07-10', category: 'devops' },
    { icon: SiGooglecloud, name: 'Google Cloud', startDate: '2024-02-20', category: 'devops' },
    { icon: TbBrandGit, name: 'Git', startDate: '2023-03-10', category: 'tools' },
];

export const techCategories: TechCategory[] = ['frontend', 'backend', 'devops', 'tools'];

export const getTechsByCategory = (category: TechCategory) =>
    techs.filter((tech) => tech.category === category);

export const featuredTechs = techs.filter((tech) => tech.featured);

export const HERO_ROLES = ['Full-Stack Developer', 'Node.js Specialist', 'React Engineer'] as const;
