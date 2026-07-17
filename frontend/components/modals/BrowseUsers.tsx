"use client";

import type { User } from "@/generated/prisma/client";
import { useState, useEffect } from "react";
import Input from "../ui/Input";
import UserCard from "../chat/UserCard";

interface BrowseUsersProps {
  channelId: string;
  addedUsers: User[];
  owner: string;
  isOwner: boolean;
  isPublic: boolean;
}

function BrowseUsers({
  channelId,
  addedUsers,
  owner,
  isOwner,
  isPublic,
}: BrowseUsersProps) {
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [displayAdded, setDisplayAdded] = useState<User[]>(addedUsers);
  const externalUsers = users.filter(
    (u) => !displayAdded.find((d) => d.id === u.id),
  );

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const q = search.trim().toLowerCase();
    if (q.length > 0) {
      const matchedUsers = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/users?q=${q}&c=${channelId}`,
      ).then((res) => res.json());
      setUsers(matchedUsers);
      setDisplayAdded(
        addedUsers.filter(
          (u) =>
            u.name.trim().includes(q) ||
            u.username.trim().includes(q) ||
            u.email.trim().includes(q) ||
            u.about?.trim().includes(q) ||
            u.name.trim().includes(q),
        ),
      );
      setSearched(true);
    }
  }

  function handleClear() {
    setUsers([]);
    setDisplayAdded(addedUsers);
    setSearched(false);
  }

  useEffect(() => {
    setDisplayAdded(addedUsers);
  }, [addedUsers]);

  return (
    <>
      <h2 className="text-xl text-white font-bold">Browse users</h2>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Search users"
          value={search}
          setValue={(s) => setSearch(s)}
          clear={handleClear}
        />
        <button type="submit" className="hidden" />
      </form>
      <div className="flex flex-col gap-y-3 border-b-2 border-b-gray-700 pb-5 min-h-50 overflow-auto">
        {displayAdded.map((user) => {
          return (
            <UserCard
              key={user.id}
              channelId={channelId}
              user={user}
              isOwner={isOwner}
              owner={owner === user.id}
              added
            />
          );
        })}
      </div>
      {/* TODO: test this with non owner user */}
      {externalUsers.length > 0 ? (
        <>
          <h2 className="text-gray-300 text-sm">Not in channel</h2>
          <div className="flex flex-col gap-y-3 min-h-30 max-h-70 overflow-auto">
            {externalUsers.map((user) => {
              return (
                <UserCard
                  key={user.id}
                  channelId={channelId}
                  user={user}
                  isOwner={isOwner}
                  isPublic={isPublic}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="text-center text-gray-300 text-sm py-5">
          {searched
            ? "No users found"
            : "Type in the name and press enter to search users!"}
        </div>
      )}
    </>
  );
}

export default BrowseUsers;
