import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import {useEffect, useState} from "react";

export default function UpButton() {

    const [hidden, setHidden] = useState(false);

    const lenis = useLenis(({scroll}) => setHidden(scroll <= window.innerHeight / 3));
    useEffect(() => setHidden(window.scrollY <= window.innerHeight / 3), []);

    return (
        <button
            className="flex fixed right-4 bottom-4 items-center justify-center bg-primary-2 p-1 rounded-full border-2 border-white opacity-100 hover:opacity-75 z-40 transition-opacity cursor-pointer"
            onClick={() => lenis?.scrollTo("#landing")}
            style={{opacity: hidden ? 0 : 1}}
        >
            <ArrowUp className="h-12 w-12 text-white"/>
        </button>
    );
}