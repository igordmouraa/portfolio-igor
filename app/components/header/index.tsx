import Image from "next/image";
import Link from "next/link";
import {NavItem} from "@/app/components/header/nav_item";

const nav_itens = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Projetos',
        href: '/projects'
    }
]

export const Header = () => {
    return (
        <header className={'absolute top-0 w-full z-10 h-24 flex items-center justify-center'}>
            <div className=' container mx-auto flex justify-between items-center py-4'>
                <Link href='/'>
                    <Image
                        width={58}
                        height={49}
                        src='/images/logo.svg'
                        alt='Logo IM dev'
                    />
                </Link>

                <nav className={'flex items-center gap-4 sm:gap-10'}>
                    {nav_itens.map(item => (
                        <NavItem {...item} key={item.label}/>
                    ))}
                </nav>
            </div>
        </header>
    );
}