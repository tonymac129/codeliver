"use client";

import type { ChannelType } from "../modals/BrowseChannels";
import type { Message } from "@/generated/prisma/client";
import { FaLock } from "react-icons/fa";
import { addUser, removeUser } from "@/app/chat/[id]/actions";
import { FaHashtag } from "react-icons/fa6";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { socket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import Btn from "../ui/Btn";

interface ChannelCardProps {
  currentChannel: ChannelType;
  forwarding?: Message;
}

function ChannelCard({ currentChannel, forwarding }: ChannelCardProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [channel, setChannel] = useState<ChannelType>(currentChannel);
  const { data: session } = authClient.useSession();
  const router = useRouter();

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

  function handleForward() {
    if (forwarding) {
      setLoading(true);
      socket.emit("message", forwarding.message, channel.id, undefined, {
        userId: forwarding.userId,
        channelId: forwarding.chatId,
        messageId: forwarding.id,
        date: forwarding.createdAt.toLocaleDateString(),
      });
      router.push(`/chat/${channel.id}`);
      setLoading(false);
    }
  }

  return (
    <div className="relative flex items-center gap-x-3 py-2 group/card">
      {channel.private ? <FaLock size={20} /> : <FaHashtag size={20} />}
      <div className="flex flex-col gap-y-1">
        <h2 className="text-black dark:text-white font-bold text-lg">
          {channel.name}
        </h2>
        {channel.description && (
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {channel.description}
          </p>
        )}
      </div>
      <div className="flex gap-x-3 absolute right-0">
        <Btn
          text={forwarding ? (loading ? "Sending..." : "Send") : "View"}
          styles="opacity-0 group-hover/card:opacity-100 transition-all! text-sm py-0.5 px-2"
          link={forwarding ? undefined : `/chat/${channel.id}`}
          onclick={forwarding ? handleForward : undefined}
          primary={forwarding ? true : false}
        />
        {!forwarding &&
          (currentChannel.userId !== session?.user.id ? (
            <Btn
              text={loading ? "Loading..." : channel.joined ? "Leave" : "Join"}
              styles="text-sm py-0.5 px-2"
              onclick={handleJoin}
              primary={!channel.joined}
            />
          ) : (
            <Btn
              text={loading ? "Loading..." : "Manage"}
              styles="text-sm py-0.5 px-2"
              link={`/chat/${channel.id}`}
              primary
            />
          ))}
      </div>
    </div>
  );
}

export default ChannelCard;
