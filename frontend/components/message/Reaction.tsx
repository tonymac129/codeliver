"use client";

import type { Reaction } from "@/generated/prisma/client";

interface ReactionProps {
  reaction: Reaction;
  reacted: boolean;
}

function Reaction({ reaction, reacted }: ReactionProps) {
  return (
    <div
      className={`rounded border  flex gap-x-2 items-center px-2 py-0.5 cursor-pointer text-gray-300
         ${reacted ? "bg-blue-950 border-blue-600" : "hover:bg-gray-800 border-gray-700"}`}
    >
      <div>{reaction.emoji}</div>
      {reaction.users.length}
    </div>
  );
}

export default Reaction;
