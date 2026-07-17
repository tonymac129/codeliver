"use client";

import type { ChannelType } from "@/types/Chat";
import { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { AnimatePresence } from "framer-motion";
import ChannelSettings from "../modals/ChannelSettings";
import Modal from "../ui/Modal";

function Settings({ channel }: { channel: ChannelType }) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <div>
      <FaGear
        size={33}
        className="p-1.5 rounded cursor-pointer hover:bg-gray-900"
        title="Channel settings"
        onClick={() => setModalOpen(true)}
      />
      <AnimatePresence>
        {modalOpen && (
          <Modal closeModal={() => setModalOpen(false)}>
            <ChannelSettings
              channel={channel}
              closeModal={() => setModalOpen(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Settings;
