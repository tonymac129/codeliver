"use client";

import { useState } from "react";
import Input from "../ui/Input";

function BrowseChannels() {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <h2 className="text-xl text-white font-bold">Browse channels</h2>
      <Input
        placeholder="Search channels"
        value={search}
        setValue={(s) => setSearch(s)}
      />
      <div className="text-center text-gray-300 text-sm">No channels found</div>
    </>
  );
}

export default BrowseChannels;
