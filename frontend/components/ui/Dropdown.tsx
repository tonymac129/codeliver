"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
  value?: string;
  setValue: (s: string) => void;
  options: string[];
  label?: string;
}

function Dropdown({ value, setValue, options, label }: DropdownProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative w-fit">
      <div
        className="bg-gray-900 rounded px-3 py-1.5 cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {value || "Select one"}
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-[calc(100%+10px)] bg-gray-950 z-10 border-2 border-gray-700 rounded p-2 w-40"
          >
            {label && (
              <div className="text-center pb-2 text-gray-700 dark:text-gray-300">
                {label}
              </div>
            )}
            {options.map((option, i) => (
              <div
                key={i}
                onClick={() => {
                  setValue(option);
                  setMenuOpen(false);
                }}
                className={`cursor-pointer hover:bg-gray-900 px-3 py-1.5 rounded text-sm ${value === option && "font-bold text-blue-500"}`}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dropdown;
