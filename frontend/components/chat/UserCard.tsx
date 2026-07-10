"use client";

import type { User } from "@/generated/prisma/client";
import { addUser, removeUser } from "@/app/chat/[id]/actions";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Btn from "../ui/Btn";
import Image from "next/image";

interface UserCardProps {
  channelId: string;
  user: User;
  added?: boolean;
  isOwner?: boolean;
}

function UserCard({ channelId, user, added, isOwner }: UserCardProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  async function handleAdd() {
    setLoading(true);
    if (added) {
      await removeUser(channelId, user.id); //TODO: adding doesn't update the user menu modal automatically
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
      {(!added || isOwner || session!.user.id === user.id) && (
        <Btn
          text={
            loading
              ? "Loading..."
              : added
                ? session?.user.id === user.id
                  ? "Leave"
                  : "Remove"
                : "Add"
          }
          styles="right-0 absolute text-sm py-0.5 px-2"
          onclick={handleAdd}
          primary={!added}
        />
      )}
    </div>
  );
}

export default UserCard;
