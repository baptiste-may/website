import {ReactNode, useState} from "react";
import FormatedParagraph from "@/components/FormatedParagraph";
import {AnimatePresence, motion} from "framer-motion";

export default function ToolTip({children, title, content, className, offset = false}: {
    children: ReactNode;
    title: string;
    content: string;
    className?: string;
    offset?: boolean;
}) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className={`rounded-full ${className}`}
            whileHover={{scale: 1.1}}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <AnimatePresence>
                <div className="relative">
                    {isOpen && <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className={`absolute ${offset ? "top-52" : "top-36"} hidden md:flex flex-col left-1/2 -translate-x-1/2 w-96 px-4 py-2 pb-4 bg-white rounded-lg z-40`}
                    >
                        <h1 className="font-bold text-2xl border-b w-full mb-4 text-center">{title}</h1>
                        <FormatedParagraph>
                            {content}
                        </FormatedParagraph>
                    </motion.div>}
                </div>
            </AnimatePresence>
            {children}
        </motion.div>
    );
}