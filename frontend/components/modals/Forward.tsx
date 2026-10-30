"use client";

import type { User } from "@/generated/prisma/client";
import { useState } from "react";
import Input from "../ui/Input";
import UserCard from "../chat/UserCard";

function Forward() {
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [displayAdded, setDisplayAdded] = useState<User[]>([]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const q = search.trim().toLowerCase();
    if (q.length > 0) {
      setSearching(true);
      const matchedUsers: User[] = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/users?q=${q}&d=true`,
      ).then((res) => res.json());
      setDisplayAdded(matchedUsers);
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
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Search users"
          value={search}
          setValue={(s) => setSearch(s)}
          clear={handleClear}
        />
        <button type="submit" className="hidden" />
      </form>
      <div className="flex flex-col gap-y-3">
        {displayAdded.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
      <div className="text-center text-gray-700 dark:text-gray-300 text-sm pb-5">
        {searched && !searching
          ? displayAdded.length === 0
            ? "No users found"
            : ""
          : searching
            ? "Searching everything..."
            : "Type in the name and press enter to search users!"}
      </div>
    </>
  );
}

export default Forward;
