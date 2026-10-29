"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import BrowseUsers from "../modals/BrowseUsers";
import Modal from "../ui/Modal";

function BrowseDirect({ children }: { children?: React.ReactNode }) {
  const [browsing, setBrowsing] = useState<boolean>(false);

  return (
    <>
      <div
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => setBrowsing(true)}
      >
        {children || "Browse users"}
      </div>
      <AnimatePresence>
        {browsing && (
          <Modal closeModal={() => setBrowsing(false)}>
            <div className="flex flex-col gap-y-5">
              <BrowseUsers />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default BrowseDirect;
