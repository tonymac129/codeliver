"use client";

import type { User } from "@/generated/prisma/client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";
import Modal from "../ui/Modal";
import BrowseUsers from "../modals/BrowseUsers";

interface AddUsersProps {
  channelId: string;
  addedUsers: User[];
}

function AddUsers({ channelId, addedUsers }: AddUsersProps) {
  const [adding, setAdding] = useState<boolean>(false);

  return (
    <div>
      <FaUserPlus
        size={35}
        className="p-2 rounded cursor-pointer hover:bg-gray-900"
        title="Add users"
        onClick={() => setAdding(true)}
      />
      <AnimatePresence>
        {adding && (
          <Modal closeModal={() => setAdding(false)}>
            <BrowseUsers channelId={channelId} addedUsers={addedUsers} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddUsers;
