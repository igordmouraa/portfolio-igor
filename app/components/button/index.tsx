import {ButtonHTMLAttributes, AnchorHTMLAttributes} from "react";
import Link from "next/link";
import {cn} from "@/app/lib/utils";

type ButtonProps = (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>) & {
    href?: string;
    as: "button" | "a";
    onClick?: () => void;
};

export const Button = ({children, className, href, ...props}: ButtonProps) => {
    const combinedClasses = cn(
        "bg-purple-600 text-gray-50 px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-950 transition-all disabled:opacity-50",
        className
    );

    if (href) {
        return (
            <Link href={href} passHref legacyBehavior>
                <a className={combinedClasses} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {children}
                </a>
            </Link>
        );
    }

    return (
        <button
            className={combinedClasses}
            {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
        >
            {children}
        </button>
    );
};