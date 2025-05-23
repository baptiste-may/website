import Link from "next/link";
import {ReactNode} from "react";

export default function Button({children, className, onClick, disabled = false, basic = false, small = false, href}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    basic?: boolean;
    small?: boolean;
    href?: string;
}) {
    const classname = `flex items-center gap-1 md:gap-4 disabled:bg-secondary-2 rounded-xl ${small ? "text-sm md:text-base px-1.5 md:px-2 py-1 md:py-1.5" : "text-lg md:text-xl px-3 md:px-4 py-2 md:py-3"} transition-all disabled:opacity-50 disabled:cursor-not-allowed ${basic ? "bg-none border-2 border-secondary-1 text-secondary-1 hover:bg-secondary-1 hover:text-white" : "bg-secondary-1 text-white hover:bg-secondary-2"} ${className ? className : ""} cursor-pointer w-min text-nowrap`;
    if (href) return (
        <Link
            className={classname}
            href={href}
            target="_blank"
        >
            {children}
        </Link>
    );
    return (
        <button
            className={classname}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}