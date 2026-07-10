"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import BrowseChannels from "../modals/BrowseChannels";
import Modal from "../ui/Modal";

function Browse() {
  const [browsing, setBrowsing] = useState<boolean>(false);

  return (
    <>
      <div
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => setBrowsing(true)}
      >
        Browse channels
      </div>
      <AnimatePresence>
        {browsing && (
          <Modal closeModal={() => setBrowsing(false)}>
            <div className="flex flex-col gap-y-5">
              <BrowseChannels />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Browse;
