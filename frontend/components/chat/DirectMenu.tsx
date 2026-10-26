"use client";

import { FaUserPlus } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import BrowseUsers from "../modals/BrowseUsers";
import Modal from "../ui/Modal";

function DirectMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="opacity-0 group-hover:opacity-100 transition-opacity! absolute right-0">
      <div
        className="rounded-full hover:bg-gray-300 dark:hover:bg-gray-900 p-2 cursor-pointer"
        onClick={() => setMenuOpen(true)}
        title="Browse users"
      >
        <FaUserPlus size={15} className="text-gray-700 dark:text-gray-300" />
      </div>
      <AnimatePresence>
        {menuOpen && (
          <Modal closeModal={() => setMenuOpen(false)}>
            <BrowseUsers closeModal={() => setMenuOpen(false)} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default DirectMenu;
