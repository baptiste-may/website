import {ReactNode, useRef} from "react";
import {AnimatePresence, motion, useInView} from "framer-motion";

export default function RevealOnScroll({children, className, delay = 0}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {

    const ref = useRef(null);
    const isInView = useInView(ref, {once: true, amount: 0.25});

    return (
        <AnimatePresence>
            <motion.div
                className={className}
                ref={ref}
                initial={{opacity: 0, scale: 0.9}}
                animate={isInView ? {opacity: 1, scale: 1} : {opacity: 0, scale: 0.9}}
                transition={{delay}}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}