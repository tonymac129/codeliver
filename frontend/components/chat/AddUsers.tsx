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
  owner: string;
  isOwner: boolean;
}

function AddUsers({ channelId, addedUsers, owner, isOwner }: AddUsersProps) {
  const [adding, setAdding] = useState<boolean>(false);

  return (
    <div>
      <FaUserPlus
        size={33}
        className="p-1.5 rounded cursor-pointer hover:bg-gray-900"
        title="Add users"
        onClick={() => setAdding(true)}
      />
      <AnimatePresence>
        {adding && (
          <Modal closeModal={() => setAdding(false)}>
            <BrowseUsers
              channelId={channelId}
              addedUsers={addedUsers}
              owner={owner}
              isOwner={isOwner}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AddUsers;
