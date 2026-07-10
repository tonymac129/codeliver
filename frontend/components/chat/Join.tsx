"use client";

import type { ChannelType } from "@/types/Chat";
import { useState } from "react";
import { addUser } from "@/app/chat/[id]/actions";
import Btn from "../ui/Btn";
import { authClient } from "@/lib/auth-client";

function Join({ channel }: { channel: ChannelType }) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  async function handleJoin() {
    setLoading(true);
    await addUser(channel.id!, session!.user.id);
  }

  return (
    <div className="flex flex-col border border-gray-700 rounded ml-5 items-center gap-y-1 py-5 w-[calc(100%-40px)]">
      <h2 className="text-xl text-white font-bold">#{channel.name}</h2>
      <p className="text-gray-300">{channel.description}</p>
      <p className="text-sm text-gray-300 my-5">You are not in this channel</p>
      <Btn
        text={loading ? "Loading..." : "Join"}
        onclick={handleJoin}
        primary
      />
    </div>
  );
}

export default Join;
