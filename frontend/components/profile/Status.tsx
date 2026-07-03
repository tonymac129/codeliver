"use client";

import type { User } from "@/generated/prisma/client";

interface StatusProps {
  emoji?: string;
  text: string;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

function Status({ emoji, text, setUser }: StatusProps) {
  return (
    <div
      className="flex gap-x-1.5 items-center text-gray-300 rounded-full w-fit px-3 py-1.5 hover:bg-gray-900 border border-gray-700 text-xs cursor-pointer"
      onClick={() =>
        setUser((prev) => {
          return {
            ...prev,
            status: emoji ? text : null,
            statusEmoji: emoji || null,
          };
        })
      }
    >
      {emoji && <span>{emoji}</span>}
      {text}
    </div>
  );
}

export default Status;
