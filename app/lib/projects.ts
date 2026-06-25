export type Project = {
    title: string;
    description: string;
    technologies: string[];
    github: string;
    demo?: string;
    image: string;
    imageFit?: 'cover' | 'contain';
};

export const projects: Project[] = [
    {
        title: 'Weekster Hub — Hub visual do Last.fm',
        description:
            'Plataforma completa para visualizar scrobbles do Last.fm: dashboard com digest semanal, grade de álbuns exportável, cápsulas Stories 9:16, wrapped por período, comparação entre usuários, charts globais e exploração por tags — com app shell, APIs server-side e export PNG em HD.',
        technologies: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion', 'Recharts', 'Last.fm API'],
        github: 'https://github.com/igordmouraa/lastfm-weekly',
        demo: 'https://weekster-hub.vercel.app/',
        image: '/images/weekster-hub.png',
    },
    {
        title: "PetExpress - Sistema de gerenciador de Pet Shops",
        description: "PetExpress é um sistema completo para pet shops, focado em escalabilidade e usabilidade. Permite gerenciar pets, produtos, agendamentos e pagamentos. O projeto reforçou meu domínio em APIs RESTful, autenticação por perfil e arquitetura de software.",
        technologies: ["React", "Vite", "Node.js", "Sequelize", "JWT", "MySQL", "Firebase", "CI/CD"],
        github: "https://github.com/TypeBlast/projectWeb",
        demo: "https://petexpress-typeblast.vercel.app/",
        image: "/images/petexpress.png"
    },
    {
        title: "Website Marvel Comics",
        description: "Aplicação para explorar o universo da Marvel, com foco em modularidade e reutilização de componentes. O principal desafio foi a autenticação com a API da Marvel e a paginação dinâmica, fortalecendo meus conhecimentos em consumo de APIs complexas.",
        technologies: ["Next.js", "TypeScript", "Marvel API", "Framer Motion", "Tailwind CSS"],
        github: "https://github.com/igordmouraa/marvel-comics",
        demo: "https://marvel-comics-lac.vercel.app/",
        image: "/images/marvel-pic.png"
    },
    {
        title: "Scaffold CLI",
        description: "Uma CLI que automatiza a criação de APIs com suporte a MySQL, PostgreSQL e MongoDB. O desafio foi criar um gerador flexível, aprofundando meus conhecimentos em automação de setups e integração com múltiplos bancos de dados.",
        technologies: ["Node.js", "TypeScript", "Inquirer.js", "Chalk", "Express", "Fastify"],
        github: "https://github.com/ScaffoldAPI/scaffold",
        demo: "https://www.npmjs.com/package/scaffold-api",
        image: '/images/icon.png',
    },
];