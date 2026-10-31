"use client";

import type { Message, User } from "@/generated/prisma/client";
import { addUser, removeUser } from "@/app/chat/[id]/actions";
import { useState } from "react";
import { FaCrown } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { createDirect } from "@/app/chat/actions";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import Btn from "../ui/Btn";
import Image from "next/image";

interface UserCardProps {
  channelId?: string;
  user: User;
  added?: boolean;
  isOwner?: boolean;
  owner?: boolean;
  isPublic?: boolean;
  closeModal?: () => void;
  forwarding?: Message;
}

function UserCard({
  channelId,
  user,
  added,
  isOwner,
  owner,
  isPublic,
  closeModal,
  forwarding,
}: UserCardProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = authClient.useSession();
  const router = useRouter();

  async function handleAdd() {
    if (channelId) {
      setLoading(true);
      if (added) {
        await removeUser(channelId, user.id);
      } else {
        await addUser(channelId, user.id);
      }
      setLoading(false);
    }
  }

  async function handleMessage() {
    setLoading(true);
    if (forwarding) {
      socket.emit(
        "message",
        forwarding.message,
        [session?.user.id, user.id].sort().join(""),
        undefined,
        {
          userId: forwarding.userId,
          channelId: forwarding.chatId,
          messageId: forwarding.id,
          date: forwarding.createdAt.toLocaleDateString(),
        },
      );
    } else {
      await createDirect(user.id);
    }
    router.push(`/chat/dm/${user.id}`);
    if (closeModal) closeModal();
    setLoading(false);
  }

  return (
    <div className="relative flex gap-x-3 items-center group/user">
      <Image
        src={user.image || "/avatar.svg"}
        alt="Avatar"
        width={50}
        height={50}
        className="rounded-full"
      />
      <div>
        <h2 className="text-black dark:text-white text-lg font-bold flex items-center gap-x-3">
          {user.name}
          {owner && (
            <FaCrown
              size={18}
              title="Channel owner"
              className="text-yellow-400"
            />
          )}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-xs">
          {user.username}
        </p>
      </div>
      {!(isOwner && owner) &&
        channelId &&
        ((!added && isPublic) || isOwner || session?.user.id === user.id) && (
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
      {!channelId && (
        <Btn
          text={loading ? "Loading..." : forwarding ? "Send" : "Message"}
          styles={`right-0 absolute text-sm py-0.5 px-2 ${forwarding && "opacity-0! group-hover/user:opacity-100! transition-all!"}`}
          onclick={handleMessage}
          primary
        />
      )}
    </div>
  );
}

export default UserCard;
