import {ReactNode} from "react";

export default function Button({children, className, onClick, disabled = false, basic = false}: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    basic?: boolean;
}) {
    return (
        <button
            className={`flex items-center gap-2 disabled:bg-secondary-2 rounded-xl px-4 md:px-6 py-2 md:py-3 max-w-58 text-lg md:text-xl my-6 md:my-10 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${basic ? "bg-none border-2 border-secondary-1 text-secondary-1 hover:bg-secondary-1 hover:text-white" : "bg-secondary-1 text-white hover:bg-secondary-2"} ${className ? className : ""}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}