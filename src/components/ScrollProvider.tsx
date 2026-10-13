"use client";

import { type ReactNode, useEffect, useRef } from "react";
import "lenis/dist/lenis.css";
import { cancelFrame, frame } from "framer-motion";
import ReactLenis, { type LenisRef } from "lenis/react";

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      options={{
        autoRaf: false,
        duration: 2,
      }}
      ref={lenisRef}
      root
    >
      {children}
    </ReactLenis>
  );
}
