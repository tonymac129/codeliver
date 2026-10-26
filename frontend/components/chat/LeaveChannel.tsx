"use client";

import type { ChannelType } from "@/types/Chat";
import { AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { removeUser } from "@/app/chat/[id]/actions";
import { leaveDirect } from "@/app/chat/dm/[id]/actions";
import Warning from "../modals/Warning";
import Modal from "../ui/Modal";

interface LeaveChannelProps {
  channel?: ChannelType;
  userId?: string;
  currentId?: string;
}

function LeaveChannel({ channel, userId, currentId }: LeaveChannelProps) {
  const [confirming, setConfirming] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleLeave() {
    setLoading(true);
    setError(null);
    const res = channel
      ? await removeUser(channel.id!, currentId)
      : await leaveDirect(userId as string);
    setLoading(false);
    if (res === false) {
      setError("Transfer channel ownership first to leave the channel");
    } else {
      setConfirming(false);
      router.push("/chat");
    }
  }

  return (
    <div>
      <FaSignOutAlt
        size={33}
        className="p-1.5 rounded cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900 text-red-500"
        title={`Leave ${userId ? "DM" : "channel"}`}
        onClick={() => setConfirming(true)}
      />
      <AnimatePresence>
        {confirming && (
          <Modal closeModal={() => setConfirming(false)}>
            <Warning
              title="Leave confirmation"
              loading={loading}
              confirm={handleLeave}
              cancel={() => setConfirming(false)}
            >
              {channel ? (
                <p>
                  Are you sure you want to leave <b>#{channel.name}</b>?{" "}
                  {channel.private
                    ? "You can only join back by getting invited again."
                    : "You can join back again at any time."}
                </p>
              ) : (
                <p>
                  Are you sure you want to leave this DM? You can still join
                  back later and this does not notify the other person.
                </p>
              )}
              {error && <div className="text-sm text-red-500">{error}</div>}
            </Warning>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LeaveChannel;
