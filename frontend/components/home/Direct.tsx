"use client";

import type { Chat, Message, User } from "@/generated/prisma/client";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import BrowseDirect from "../chat/BrowseDirect";
import Btn from "../ui/Btn";
import Input from "../ui/Input";
import Link from "next/link";
import Image from "next/image";

type DirectType = Chat & {
  users: User[];
  messages: Message[];
};

interface DirectProps {
  chats: DirectType[];
  userId: string;
}

function Direct({ chats, userId }: DirectProps) {
  const [search, setSearch] = useState<string>("");
  const directs = chats.filter(
    (c) =>
      search.trim().length === 0 ||
      c.users
        .find((u) => u.id !== userId)!
        .name.toLowerCase()
        .includes(search.trim().toLowerCase()),
  );

  return (
    <>
      <div className="px-4 flex gap-x-5 py-3">
        <Input
          placeholder={`Search DMs (${directs.length})`}
          value={search}
          setValue={(s) => setSearch(s)}
          styles="flex-1"
          clear
        />
        <BrowseDirect>
          <Btn text="Add DM" primary />
        </BrowseDirect>
      </div>
      <div className="flex flex-col gap-y-3 h-full overflow-y-auto">
        {directs.length > 0 ? (
          directs.map((d) => {
            const user = d.users.find((u) => u.id !== userId)!;
            return (
              <Link
                key={d.id}
                href={`/chat/dm/${user.id}`}
                className="flex p-4 items-center gap-x-3 hover:bg-gray-300 dark:hover:bg-gray-900 rounded"
              >
                {user.image ? (
                  <Image src={user.image} alt="Avatar" width={50} height={50} />
                ) : (
                  <FaUser size={50} />
                )}
                <div>
                  <h2>{user.name}</h2>
                  {d.messages[0] ? (
                    <p>
                      {d.messages[0].createdAt.toLocaleDateString()}{" "}
                      {d.messages[0].userId === userId
                        ? "You: "
                        : user.name + ": "}
                      {d.messages[0].message.slice(0, 100) +
                        (d.messages[0].message.length > 100 ? "..." : "")}
                    </p>
                  ) : (
                    <i>Say hi to {user.name}...</i>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="text-sm text-center py-5 text-gray-700 dark:text-gray-300">
            No DMs found, try a different search?
          </div>
        )}
      </div>
    </>
  );
}

export default Direct;
