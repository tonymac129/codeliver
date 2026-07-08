"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { GrAddCircle } from "react-icons/gr";
import { usePathname } from "next/navigation";
import CreateChannel from "../modals/CreateChannel";
import BrowseChannels from "../modals/BrowseChannels";
import Modal from "../ui/Modal";

const optionStyles =
  "hover:bg-gray-900 cursor-pointer flex px-3 py-2 gap-x-3 items-center text-gray-300";

function Menu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<"create" | "browse" | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div
      ref={menuRef}
      className={`absolute right-0  group-hover:opacity-100 ${!menuOpen && "opacity-0"} text-gray-300 transition-all!`}
    >
      <div
        className="rounded-full hover:bg-gray-900 p-2 cursor-pointer"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <FaBars size={15} />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col bg-gray-950 rounded border-2 border-gray-700 absolute top-[calc(100%+5px)] right-0 w-50 text-sm font-normal z-10"
            >
              <div onClick={() => setModal("create")} className={optionStyles}>
                <GrAddCircle size={15} />
                Create channel
              </div>
              <div onClick={() => setModal("browse")} className={optionStyles}>
                <FaSearch size={15} />
                Browse channels
              </div>
            </motion.div>
            <AnimatePresence>
              {modal && (
                <Modal closeModal={() => setModal(null)}>
                  {modal === "create" ? (
                    <CreateChannel closeModal={() => setModal(null)} />
                  ) : (
                    <BrowseChannels />
                  )}
                </Modal>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Menu;
