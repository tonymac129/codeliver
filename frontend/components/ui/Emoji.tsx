"use client";

import type { EmojiType } from "@/types/User";
import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiProps {
  children: React.ReactNode;
  onselect: (emoji: string) => void;
  below?: boolean;
  right?: boolean;
}

function Emoji({ children, onselect, below, right }: EmojiProps) {
  const [open, setOpen] = useState<boolean>(false);
  const emojiRef = useRef<HTMLDivElement>(null);

  function handleSelect(e: EmojiType) {
    onselect(e.native);
    setOpen(false);
  }

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (!emojiRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, []);

  return (
    <div ref={emojiRef} className="relative">
      <div onClick={() => setOpen(true)}>{children}</div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: -10 }}
            className={`absolute z-50 ${right ? "right-0" : "left-0"} ${
              below
                ? `${right ? "origin-[95%_0%]" : "origin-[5%_0%]"} top-[calc(100%+5px)]`
                : `${right ? "origin-[95%_100%]" : "origin-[5%_100%]"} bottom-[calc(100%+5px)]`
            }`}
          >
            <Picker
              data={data}
              onEmojiSelect={handleSelect}
              previewPosition="none"
              emojiSize={20}
              maxFrequentRows={3}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Emoji;
