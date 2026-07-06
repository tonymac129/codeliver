"use client";

import type { ReactionType } from "@/types/Chat";

interface ReactionProps {
  reaction: ReactionType;
  reacted: boolean;
}

function Reaction({ reaction, reacted }: ReactionProps) {
  return (
    <div
      className={`rounded border  flex gap-x-2 items-center px-2 py-0.5 cursor-pointer text-gray-300
         ${reacted ? "bg-blue-950 border-blue-600" : "hover:bg-gray-800 border-gray-700"}`}
    >
      <div>{reaction.emoji}</div>
      {reaction.reacted.length}
    </div>
  );
}

export default Reaction;
