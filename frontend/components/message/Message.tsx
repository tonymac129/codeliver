"use client";

import type { MessageType } from "@/app/chat/[id]/Messages";
import { MdAddReaction } from "react-icons/md";
import Reaction from "./Reaction";
import Emoji from "../ui/Emoji";
import Image from "next/image";
import Bar from "./Bar";

interface MessageProps {
  message: MessageType;
  userId: string;
  setReplying: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
}

function Message({ message, userId, setReplying, index }: MessageProps) {
  const currentTime = new Date();
  const created = new Date(message.createdAt);

  return (
    <div className="flex gap-x-3 items-start hover:bg-[#0D111C] py-2 px-5 group relative">
      {/* TODO: Use global context or smth to open sidebar profile panel when clicking on profile image */}
      <Image
        src={message.user.image || "/avatar.svg"}
        alt="Profile avatar"
        width={50}
        height={50}
        className="rounded-full cursor-pointer"
        title="View profile"
      />
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-5 items-center">
          <h2 className="text-lg font-bold text-white">{message.user.name}</h2>
          <div
            className="flex gap-x-1.5 text-xs text-gray-300"
            title={created.toISOString()}
          >
            {currentTime.toLocaleDateString() !==
              created.toLocaleDateString() && created.toLocaleDateString()}
            <span>
              {created.getHours() % 12 || "12"}:
              {created.getMinutes().toString().padStart(2, "0")}{" "}
              {created.getHours() > 11 ? "PM" : "AM"}
            </span>
          </div>
        </div>
        <div className="text-gray-300">{message.message}</div>
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {message.reactions.map((reaction, i) => {
              return (
                <Reaction
                  key={i}
                  reaction={reaction}
                  reacted={reaction.users.includes(userId)}
                />
              );
            })}
            <Emoji onselect={(emoji) => console.log(emoji)}>
              <div className="px-2 py-1 text-gray-300 rounded border border-gray-700 cursor-pointer hover:bg-gray-800 text-base">
                <MdAddReaction size={20} />
              </div>
            </Emoji>
          </div>
        )}
      </div>
      <Bar setReplying={setReplying} index={index} />
    </div>
  );
}

export default Message;
