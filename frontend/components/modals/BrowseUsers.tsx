"use client";

import type { User } from "@/generated/prisma/client";
import { useState, useEffect } from "react";
import Input from "../ui/Input";
import UserCard from "../chat/UserCard";

interface BrowseUsersProps {
  channelId?: string;
  addedUsers?: User[];
  owner?: string;
  isOwner?: boolean;
  isPublic?: boolean;
  userId?: string;
  closeModal?: () => void;
}

function BrowseUsers({
  channelId,
  addedUsers,
  owner,
  isOwner,
  isPublic,
  userId,
  closeModal,
}: BrowseUsersProps) {
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [displayAdded, setDisplayAdded] = useState<User[]>(addedUsers || []);
  const externalUsers = users.filter(
    (u) => !displayAdded.find((d) => d.id === u.id),
  );

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const q = search.trim().toLowerCase();
    if (q.length > 0) {
      setSearching(true);
      const matchedUsers: User[] = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/users?q=${q}&c=${channelId}`,
      ).then((res) => res.json());
      setUsers(matchedUsers.filter((u) => !userId || u.id !== userId));
      setDisplayAdded(
        addedUsers
          ? addedUsers.filter(
              (u) =>
                u.name.trim().includes(q) ||
                u.username.trim().includes(q) ||
                u.email.trim().includes(q) ||
                u.about?.trim().includes(q) ||
                u.name.trim().includes(q),
            )
          : matchedUsers,
      );
      setSearched(true);
      setSearching(false);
    }
  }

  function handleClear() {
    setUsers([]);
    setDisplayAdded(addedUsers || []);
    setSearched(false);
    setSearching(false);
  }

  useEffect(() => {
    setDisplayAdded(addedUsers || []);
  }, [addedUsers]);

  return (
    <>
      <h2 className="text-xl text-black dark:text-white font-bold">
        Browse users
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
      <div
        className={`flex flex-col gap-y-3 ${channelId && "border-b-2 border-b-gray-700 min-h-50 pb-5"} overflow-auto`}
      >
        {displayAdded.map((user) => {
          return (
            <UserCard
              key={user.id}
              channelId={channelId}
              user={user}
              isOwner={isOwner}
              owner={owner === user.id}
              added
              closeModal={() => (closeModal ? closeModal() : undefined)}
            />
          );
        })}
      </div>
      {/* TODO: test this with non owner user */}
      {externalUsers.length > 0 ? (
        <>
          <h2 className="text-gray-700 dark:text-gray-300 text-sm">
            Not in channel
          </h2>
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
        <div
          className={`text-center text-gray-700 dark:text-gray-300 text-sm pb-5 ${channelId && "pt-5"}`}
        >
          {searched && !searching
            ? channelId || displayAdded.length === 0
              ? "No users found"
              : ""
            : searching
              ? "Searching everything..."
              : "Type in the name and press enter to search users!"}
        </div>
      )}
    </>
  );
}

export default BrowseUsers;
