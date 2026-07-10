"use client";

import type { ChannelType } from "@/types/Chat";
import { AnimatePresence } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { leaveChannel } from "@/app/chat/[id]/actions";
import Modal from "../ui/Modal";
import Btn from "../ui/Btn";

function LeaveChannel({ channel }: { channel: ChannelType }) {
  const [confirming, setConfirming] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleLeave() {
    setLoading(true);
    await leaveChannel(channel.id!);
    setLoading(false);
    setConfirming(false);
    router.push("/chat");
  }

  return (
    <div>
      <FaSignOutAlt
        size={35}
        className="p-2 rounded cursor-pointer hover:bg-gray-900 text-red-500"
        title="Edit channel"
        onClick={() => setConfirming(true)}
      />
      <AnimatePresence>
        {confirming && (
          <Modal closeModal={() => setConfirming(false)}>
            <h2 className="text-xl text-white font-bold">Leave confirmation</h2>
            <p>
              Are you sure you want to leave <b>#{channel.name}</b>?{" "}
              {channel.private
                ? "You can only join back by getting invited again."
                : "You can join back again at any time."}
            </p>
            <div className="flex gap-x-3">
              <Btn
                text={loading ? "Loading..." : "Leave"}
                onclick={handleLeave}
                styles="bg-red-500 hover:bg-red-600"
                primary
              />
              <Btn text="Cancel" onclick={() => setConfirming(false)} />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default LeaveChannel;
