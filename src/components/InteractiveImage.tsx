"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const openImage = useCallback((next: Image) => {
    if (next !== undefined && document.activeElement instanceof HTMLElement) {
      returnFocusRef.current = document.activeElement;
    }
    setImage(next);
  }, []);

  const closeImage = useCallback(() => {
    setImage(undefined);
    returnFocusRef.current?.focus();
  }, []);

  useEffect(() => {
    if (image === undefined) return;

    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeImage();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [image, closeImage]);

  return (
    <InteractiveImageContext.Provider value={openImage}>
      <AnimatePresence>
        {image !== undefined && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={image.title}
            className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/75 backdrop-blur-xl z-60 cursor-zoom-out overflow-hidden"
            onClick={closeImage}
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
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Fermer l'image"
              className="flex absolute top-4 right-4 z-70 items-center justify-center w-12 h-12 rounded-xl transition-all hover:bg-[#aaaaaa40]"
              onClick={(event) => {
                event.stopPropagation();
                closeImage();
              }}
            >
              <X className="w-full h-full p-2 text-gray-300 hover:text-white transition-all" />
            </button>
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
