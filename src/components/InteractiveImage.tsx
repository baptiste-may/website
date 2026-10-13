"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, type ReactNode, useContext, useState } from "react";

type Image =
  | {
      src: string;
      title: string;
    }
  | undefined;

const InteractiveImageContext = createContext<
  undefined | ((image: Image) => void)
>(undefined);

export function InteractiveImageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [image, setImage] = useState<Image>(undefined);
  return (
    <InteractiveImageContext.Provider value={setImage}>
      <AnimatePresence>
        {image !== undefined && (
          <motion.div
            className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/75 backdrop-blur-xl z-60 cursor-zoom-out overflow-hidden"
            onClick={() => setImage(undefined)}
            initial={{ opacity: 0, dur: 0.75 }}
            animate={{ opacity: 1, dur: 0.75 }}
            exit={{ opacity: 0, dur: 0.75 }}
          >
            {/* biome-ignore lint/performance/noImgElement: framer-motion animated zoom overlay */}
            <motion.img
              src={image.src}
              alt=""
              title={image.title}
              className="w-fit rounded-lg z-70"
              initial={{ scale: 0.25 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </InteractiveImageContext.Provider>
  );
}

export function useInteractiveImage() {
  const context = useContext(InteractiveImageContext);
  if (context === undefined) throw "No provider";
  return context;
}
