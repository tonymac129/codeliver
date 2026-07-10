"use client";

import type { User } from "@/generated/prisma/client";
import { addUser } from "@/app/chat/[id]/actions";
import { useState } from "react";
import Btn from "../ui/Btn";
import Image from "next/image";

interface UserCardProps {
  channelId: string;
  user: User;
  added?: boolean;
}

function UserCard({ channelId, user, added }: UserCardProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleAdd() {
    setLoading(true);
    if (added) {
      alert("removed (not)"); //TODO: this
    } else {
      await addUser(channelId, user.id);
    }
    setLoading(false);
  }

  return (
    <div className="relative flex gap-x-3 items-center">
      <Image
        src={user.image || "/avatar.svg"}
        alt="Avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <h2 className="text-white text-lg font-bold">{user.name}</h2>
        <p className="text-gray-300 text-sm">{user.username}</p>
      </div>
      <Btn
        text={loading ? "Loading..." : added ? "Remove" : "Add"}
        styles="right-0 absolute text-sm py-0.5 px-2"
        onclick={handleAdd}
        primary={!added}
      />
    </div>
  );
}

export default UserCard;
