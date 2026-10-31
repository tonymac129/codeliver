"use client";

import type {
  Chat,
  Message as MessageT,
  User,
} from "@/generated/prisma/client";
import { useState } from "react";
import Input from "../ui/Input";
import UserCard from "../chat/UserCard";
import ChannelCard from "../chat/ChannelCard";

type Message = MessageT & { user: User };

function Forward({ forwarding }: { forwarding: Message }) {
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [displayAdded, setDisplayAdded] = useState<User[]>([]);
  const [displayChats, setDisplayChats] = useState<Chat[]>([]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const q = search.trim().toLowerCase();
    if (q.length > 0) {
      setSearching(true);
      const matchedUsers: User[] = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/users?q=${q}&d=true`,
      ).then((res) => res.json());
      const matchedChannels: Chat[] = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/channels?q=${q}`,
      ).then((res) => res.json());
      setDisplayAdded(matchedUsers);
      setDisplayChats(
        matchedChannels.filter((c) => c.id !== forwarding.chatId),
      );
      setSearched(true);
      setSearching(false);
    }
  }

  function handleClear() {
    setDisplayAdded([]);
    setSearched(false);
    setSearching(false);
  }

  return (
    <>
      <h2 className="text-xl text-black dark:text-white font-bold">
        Forward message
      </h2>
      <p>
        {forwarding.user.name + ": "}
        <i>
          &quot;
          {forwarding.message.slice(0, 50) +
            (forwarding.message.length > 50 ? "..." : "")}
          &quot;
        </i>
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Search channels and DMs"
          value={search}
          setValue={(s) => setSearch(s)}
          clear={handleClear}
        />
        <button type="submit" className="hidden" />
      </form>
      <div className="flex flex-col gap-y-3">
        {displayChats.map((chat) => (
          <ChannelCard
            key={chat.id}
            currentChannel={{ ...chat, joined: true }}
            forwarding={forwarding}
          />
        ))}
        {displayAdded.map((user) => {
          return <UserCard key={user.id} user={user} forwarding={forwarding} />;
        })}
      </div>
      <div className="text-center text-gray-700 dark:text-gray-300 text-sm pb-5">
        {searched && !searching
          ? displayAdded.length === 0 && displayChats.length === 0
            ? "No chats found"
            : ""
          : searching
            ? "Searching everything..."
            : "Type in the name and press enter to search your chats!"}
      </div>
    </>
  );
}

export default Forward;
