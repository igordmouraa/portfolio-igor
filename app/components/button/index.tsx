import {ButtonHTMLAttributes} from "react";
import {cn} from "@/app/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({children, className, ...props}: ButtonProps) => {
    return (
        <button
            className={cn(
                "bg-purple-600 text-gray-50 px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-purple-950 transition-all disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};