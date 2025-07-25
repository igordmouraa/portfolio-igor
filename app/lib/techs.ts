import {IconType} from 'react-icons';
import {
    TbBrandDocker, TbBrandFigma, TbBrandFirebase, TbBrandGit, TbBrandJavascript,
    TbBrandMongodb, TbBrandMysql, TbBrandNextjs, TbBrandReact, TbBrandReactNative,
    TbBrandTailwind, TbBrandTypescript, TbBrandVercel
} from "react-icons/tb";
import {SiGooglecloud, SiNestjs, SiNodedotjs} from "react-icons/si";

export type Tech = {
    icon: IconType;
    name: string;
    startDate: string;
};

export const techs: Tech[] = [
    {icon: SiNodedotjs, name: 'Node.js', startDate: '2023-03-10'},
    {icon: TbBrandJavascript, name: 'Javascript', startDate: '2023-03-10'},
    {icon: SiNestjs, name: 'Nest.js', startDate: '2024-03-10'},
    {icon: TbBrandTypescript, name: 'Typescript', startDate: '2024-05-10'},
    {icon: TbBrandReact, name: 'React', startDate: '2023-07-10'},
    {icon: TbBrandNextjs, name: 'Next.js', startDate: '2024-05-10'},
    {icon: TbBrandTailwind, name: 'Tailwind CSS', startDate: '2023-07-10'},
    {icon: TbBrandReactNative, name: 'React Native', startDate: '2024-02-20'},
    {icon: TbBrandMongodb, name: 'Mongo DB', startDate: '2023-07-10'},
    {icon: TbBrandMysql, name: 'MySQL', startDate: '2023-07-10'},
    {icon: TbBrandFirebase, name: 'Firebase', startDate: '2024-05-10'},
    {icon: TbBrandVercel, name: 'Vercel', startDate: '2024-07-10'},
    {icon: TbBrandFigma, name: 'Figma', startDate: '2023-03-20'},
    {icon: SiGooglecloud, name: 'Google Cloud', startDate: '2024-02-20'},
    {icon: TbBrandDocker, name: 'Docker', startDate: '2024-03-10'},
    {icon: TbBrandGit, name: 'Git', startDate: '2023-03-10'},
];