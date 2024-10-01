"use client";

import {LocomotiveScrollProvider} from "react-locomotive-scroll";
import {ReactNode, useRef} from "react";

export default function ScrollProvider({children}: {
    children: ReactNode;
}) {
    const containerRef = useRef(null);
    return (
        <LocomotiveScrollProvider
            options={{
                smooth: true,
                tablet: {smooth: true},
                smartphone: {smooth: true},
                log: false
            }}
            watch={[children]}
            containerRef={containerRef}
        >
            <div ref={containerRef}>
                {children}
            </div>
        </LocomotiveScrollProvider>
    );
}