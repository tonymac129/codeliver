"use client";

import type { ChannelType } from "../modals/BrowseChannels";
import { FaLock } from "react-icons/fa";
import { addUser, leaveChannel } from "@/app/chat/[id]/actions";
import { FaHashtag } from "react-icons/fa6";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Btn from "../ui/Btn";

function ChannelCard({ currentChannel }: { currentChannel: ChannelType }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [channel, setChannel] = useState<ChannelType>(currentChannel);
  const { data: session } = authClient.useSession();

  async function handleJoin() {
    if (session) {
      setLoading(true);
      if (channel.joined) {
        await leaveChannel(channel.id);
      } else {
        await addUser(channel.id, session.user.id);
      }
      setChannel({ ...channel, joined: !channel.joined });
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center gap-x-3 py-2">
      {channel.private ? <FaLock size={20} /> : <FaHashtag size={20} />}
      <div className="flex flex-col gap-y-1">
        <h2 className="text-white font-bold text-lg">{channel.name}</h2>
        {channel.description && (
          <p className="text-gray-300 text-sm">{channel.description}</p>
        )}
      </div>
      <Btn
        text={loading ? "Loading..." : channel.joined ? "Leave" : "Join"}
        styles="right-0 absolute text-sm py-0.5 px-2"
        onclick={handleJoin}
        primary={!channel.joined}
      />
    </div>
  );
}

export default ChannelCard;
