"use client";

import type { Reaction } from "@/generated/prisma/client";
import { socket } from "@/lib/socket";

interface ReactionProps {
  messageId: string;
  reaction: Reaction;
  reacted: boolean;
}

function Reaction({ messageId, reaction, reacted }: ReactionProps) {
  function handleReact() {
    socket.emit("react", messageId, reaction.emoji);
  }

  return (
    <div
      className={`rounded border  flex gap-x-2 items-center px-2 py-0.5 cursor-pointer text-gray-700 dark:text-gray-300 ${reacted ? "bg-blue-200 dark:bg-blue-950 border-blue-600" : "hover:bg-gray-400 dark:hover:bg-gray-800 border-gray-700"}`}
      onClick={handleReact}
    >
      <div>{reaction.emoji}</div>
      {reaction.users.length}
    </div>
  );
}

export default Reaction;
