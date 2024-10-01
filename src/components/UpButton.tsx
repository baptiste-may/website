import {useState, useEffect} from "react";
import {ArrowUpIcon} from "@heroicons/react/24/outline";
import {useLocomotiveScroll} from "react-locomotive-scroll";

export default function UpButton({onClick}: {
    onClick: () => void;
}) {

    const { scroll } = useLocomotiveScroll();
    const [hidden, setHidden] = useState(false);

    function updateHidden() {
        setHidden(window.scrollY <= window.innerHeight / 3);
    }

    useEffect(() => {
        updateHidden();
        if (scroll) {
            scroll.on("scroll", ({ scroll }: { scroll: { y: number; } }) => setHidden(scroll.y <= window.innerHeight / 3));
        }
    });

    return (
        <button
            className="flex fixed right-4 bottom-4 items-center justify-center bg-primary-2 p-1 rounded-full border-2 border-white hover:primary-1 z-40 transition-all duration-500"
            onClick={onClick}
            style={{opacity: hidden ? 0 : 1}}
        >
            <ArrowUpIcon className="h-12 w-12 text-white"/>
        </button>
    );
}