"use client";

import type { ChannelType } from "@/types/Chat";
import { useState } from "react";
import { addUser } from "@/app/chat/[id]/actions";
import Btn from "../ui/Btn";
import { authClient } from "@/lib/auth-client";

interface JoinProps {
  channel: ChannelType;
  isDirect?: boolean;
}

function Join({ channel, isDirect }: JoinProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  async function handleJoin() {
    setLoading(true);
    await addUser(channel.id!, session!.user.id);
  }

  return (
    <div className="flex flex-col border border-gray-700 rounded ml-5 items-center gap-y-1 py-5 w-[calc(100%-40px)]">
      <h2 className="text-xl text-black dark:text-white font-bold">
        {!isDirect && "#"}
        {channel.name}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{channel.description}</p>
      <p className="text-sm text-gray-700 dark:text-gray-300 my-5">
        {isDirect
          ? "You left this direct message"
          : "You are not in this channel"}
      </p>
      <Btn
        text={loading ? "Loading..." : isDirect ? "Join back" : "Join"}
        onclick={handleJoin}
        primary
      />
    </div>
  );
}

export default Join;
