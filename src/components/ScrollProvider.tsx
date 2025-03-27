"use client";

import {ReactNode, useEffect, useRef} from "react";
import "lenis/dist/lenis.css";
import ReactLenis, {LenisRef} from "lenis/react";
import {cancelFrame, frame} from "framer-motion";

export default function ScrollProvider({children}: {
    children: ReactNode;
}) {

    const lenisRef = useRef<LenisRef>(null)

    useEffect(() => {
        function update(data: {
            timestamp: number;
        }) {
            const time = data.timestamp
            lenisRef.current?.lenis?.raf(time);
        }

        frame.update(update, true);

        return () => cancelFrame(update);
    }, []);

    return (
        <ReactLenis options={{
            autoRaf: false,
            duration: 2
        }} ref={lenisRef} root>
            {children}
        </ReactLenis>
    );
}