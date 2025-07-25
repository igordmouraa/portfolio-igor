export type Experience = {
    company: string;
    role: string;
    startDate: Date;
    endDate: Date | null;
    description: string;
    technologies: string[];
};

export const experiences: Experience[] = [
    {
        company: "N2 Sistemas - Soluções comerciais e empresariais",
        role: "Estagiário de Desenvolvimento de Software",
        startDate: new Date(2025, 6, 1),
        endDate: null,
        description: "Atuação no desenvolvimento de soluções desktop com Pascal e Lazarus, e desenvolvimento de banco de dados com SQL Server.",
        technologies: ['Pascal', 'Lazarus', 'SQL Server', 'Linux']
    },
    {
        company: "Freelancer",
        role: "Desenvolvedor Full-Stack",
        startDate: new Date(2023, 2, 1),
        endDate: null,
        description: "Desenvolvimento e manutenção de interfaces web responsivas com React, Next.js e TypeScript. No backend, criação de APIs escaláveis com Node.js e NestJS, integrando bancos de dados como PostgreSQL e Firebase. Utilização de Docker para ambientes e Vercel para deploys.",
        technologies: ['Node.js', 'NestJs', 'Typescript', 'PostgreSQL', 'Firebase', 'Docker', 'Next.js', 'Tailwind CSS', 'Vercel']
    }
];