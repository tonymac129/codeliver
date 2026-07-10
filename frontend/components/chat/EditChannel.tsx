"use client";

import type { ChannelType } from "@/types/Chat";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "../ui/Modal";
import CreateChannel from "../modals/CreateChannel";

function EditChannel({ channel }: { channel: ChannelType }) {
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <div>
      <FaEdit
        size={35}
        className="p-2 rounded cursor-pointer hover:bg-gray-900"
        title="Edit channel"
        onClick={() => setEditing(true)}
      />
      <AnimatePresence>
        {editing && (
          <Modal closeModal={() => setEditing(false)}>
            <CreateChannel
              closeModal={() => setEditing(false)}
              existingChannel={channel}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default EditChannel;
