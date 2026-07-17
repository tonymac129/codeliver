"use client";

import type { ChannelType } from "../modals/BrowseChannels";
import { FaLock } from "react-icons/fa";
import { addUser, removeUser } from "@/app/chat/[id]/actions";
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
        await removeUser(channel.id);
      } else {
        await addUser(channel.id, session.user.id);
      }
      setChannel({ ...channel, joined: !channel.joined });
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center gap-x-3 py-2 group/card">
      {channel.private ? <FaLock size={20} /> : <FaHashtag size={20} />}
      <div className="flex flex-col gap-y-1">
        <h2 className="text-white font-bold text-lg">{channel.name}</h2>
        {channel.description && (
          <p className="text-gray-300 text-sm">{channel.description}</p>
        )}
      </div>
      <div className="flex gap-x-3 absolute right-0">
        <Btn
          text="View"
          styles="opacity-0 group-hover/card:opacity-100 transition-all! text-sm py-0.5 px-2"
          link={`/chat/${channel.id}`}
        />
        {currentChannel.userId !== session?.user.id && (
          <Btn
            text={loading ? "Loading..." : channel.joined ? "Leave" : "Join"}
            styles="text-sm py-0.5 px-2"
            onclick={handleJoin}
            primary={!channel.joined}
          />
        )}
      </div>
    </div>
  );
}

export default ChannelCard;
