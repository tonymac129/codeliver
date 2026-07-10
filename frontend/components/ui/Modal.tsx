"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

function Modal({ children, closeModal }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (!modalRef.current?.contains(e.target as Node)) {
        closeModal();
      }
    };

    document.addEventListener("click", clickListener);

    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, [closeModal]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-screen h-screen fixed top-0 left-0 z-30 bg-gray-950/80 backdrop-blur-sm cursor-default flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        ref={modalRef}
        className="w-110 max-h-150 overflow-auto bg-gray-950 border-2 border-gray-700 rounded flex flex-col gap-y-5 text-base p-5 font-normal"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
