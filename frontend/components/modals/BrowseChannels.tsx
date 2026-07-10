"use client";

import type { Chat } from "@/generated/prisma/client";
import { useState } from "react";
import Input from "../ui/Input";
import ChannelCard from "../chat/ChannelCard";

export type ChannelType = Chat & {
  joined: boolean;
};

function BrowseChannels() {
  const [search, setSearch] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);
  const [displayed, setDisplayed] = useState<ChannelType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function searchChannels(e: React.SubmitEvent) {
    e.preventDefault();
    if (search) {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/channels?q=${search.trim().toLowerCase()}`,
      ).then((res) => res.json());
      setDisplayed(res);
      setSearched(true);
      setLoading(false);
    }
  }

  function handleClear() {
    setDisplayed([]);
    setSearched(false);
  }

  return (
    <>
      <h2 className="text-xl text-white font-bold text-left">
        Browse channels
      </h2>
      <form onSubmit={searchChannels}>
        <Input
          placeholder="Search channels"
          value={search}
          setValue={(s) => setSearch(s)}
          clear={handleClear}
        />
        <button type="submit" className="hidden" />
      </form>
      {/* TODO: add filters to better browse channels */}
      {displayed.length > 0 ? (
        <div className="flex flex-col gap-y-3 max-h-70 overflow-auto">
          {displayed.map((channel) => {
            return <ChannelCard key={channel.id} currentChannel={channel} />;
          })}
        </div>
      ) : (
        <div className="text-center text-gray-300 text-sm py-5">
          {loading
            ? "Loading..."
            : searched
              ? "No channels found"
              : "Type in the name and press enter to search channels!"}
        </div>
      )}
    </>
  );
}

export default BrowseChannels;
