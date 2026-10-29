"use client";

import type { Chat, Message } from "@/generated/prisma/client";
import { useState } from "react";
import { FaHashtag } from "react-icons/fa";
import Browse from "../chat/Browse";
import Btn from "../ui/Btn";
import Input from "../ui/Input";
import Link from "next/link";

type ChannelType = Chat & {
  messages: Message[];
};

interface DirectProps {
  chats: ChannelType[];
  userId: string;
}

function Channel({ chats, userId }: DirectProps) {
  const [search, setSearch] = useState<string>("");
  const channels = chats.filter(
    (c) =>
      search.trim().length === 0 ||
      [c.name, c.description]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );

  return (
    <>
      <div className="px-4 flex gap-x-5 py-3">
        <Input
          placeholder={`Search channels (${channels.length})`}
          value={search}
          setValue={(s) => setSearch(s)}
          styles="flex-1"
          clear
        />
        <Browse>
          <Btn text="Add channel" primary />
        </Browse>
      </div>
      <div className="flex flex-col gap-y-3 h-full overflow-y-auto">
        {channels.length > 0 ? (
          channels.map((c) => (
            <Link
              key={c.id}
              href={`/chat/${c.id}`}
              className="flex p-4 items-center gap-x-3 hover:bg-gray-300 dark:hover:bg-gray-900 rounded"
            >
              <FaHashtag size={30} />
              <div>
                <h2>{c.name}</h2>
                {c.messages[0] ? (
                  <p>
                    {c.messages[0].createdAt.toLocaleDateString()}
                    {c.messages[0].userId === userId && "You: "}
                    {c.messages[0].message.slice(0, 100) +
                      (c.messages[0].message.length > 100 ? "..." : "")}
                  </p>
                ) : (
                  <i>Break the awkward silence...</i>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="text-sm text-center py-5 text-gray-700 dark:text-gray-300">
            No channels found, try a different search?
          </div>
        )}
      </div>
    </>
  );
}

export default Channel;
