"use client";

import type { Message as MessageT } from "@/generated/prisma/client";
import type { MessageType } from "@/app/chat/[id]/Messages";
import { MdAddReaction } from "react-icons/md";
import { HiOutlineReply } from "react-icons/hi";
import { useEffect } from "react";
import Reaction from "./Reaction";
import Emoji from "../ui/Emoji";
import Image from "next/image";
import Bar from "./Bar";

interface MessageProps {
  message: MessageType;
  userId: string;
  setReplying: React.Dispatch<React.SetStateAction<MessageT | null>>;
  index: number;
  highlighted: string | null;
  setHighlighted: React.Dispatch<React.SetStateAction<string | null>>;
  header: boolean;
}

function Message({
  message,
  userId,
  setReplying,
  index,
  highlighted,
  setHighlighted,
  header,
}: MessageProps) {
  const isHighlighted = highlighted === message.id;
  const currentTime = new Date();
  const created = new Date(message.createdAt);
  const timeString = `${created.getHours() % 12 || "12"}:${created.getMinutes().toString().padStart(2, "0")} ${created.getHours() > 11 ? "PM" : "AM"}`;

  useEffect(() => {
    if (highlighted === message.id) {
      setTimeout(() => {
        setHighlighted(null);
      }, 1500);
    }
  }, [highlighted, message.id, setHighlighted]);

  return (
    <div
      className={`py-2 px-5 group flex flex-col gap-y-1 relative ${isHighlighted ? "bg-gray-900" : "hover:bg-[#0D111C]"} ${header && "mt-3"}`}
    >
      {message.replyMessage && (
        <div
          className="text-gray-300 gap-x-3 text-sm flex items-center pl-6 cursor-pointer w-fit"
          onClick={() => setHighlighted(message.replyMessage!.id)}
        >
          <HiOutlineReply size={20} className="rotate-y-180" />
          <div className="font-bold flex gap-x-1 items-center">
            <Image
              src={message.replyMessage.user.image || "/avatar.svg"}
              alt="Avatar"
              width={25}
              height={25}
              className="rounded-full"
            />
            @{message.replyMessage.user.name}
          </div>{" "}
          {message.replyMessage.message.slice(0, 50) +
            (message.replyMessage.message.length > 50 ? "..." : "")}
        </div>
      )}
      <div className="flex gap-x-3 items-start">
        {/* TODO: Use global context or smth to open sidebar profile panel when clicking on profile image */}
        {header ? (
          <Image
            src={message.user.image || "/avatar.svg"}
            alt="Profile avatar"
            width={50}
            height={50}
            className="rounded-full cursor-pointer"
            title="View profile"
          />
        ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity! text-[11px] absolute text-gray-400 left-5 top-[50%] translate-y-[-50%]">
            {timeString}
          </div>
        )}
        <div className="flex flex-col gap-y-3">
          {header && (
            <div className="flex gap-x-5 items-center">
              <h2 className="text-lg font-bold text-white">
                {message.user.name}
              </h2>
              <div
                className="flex gap-x-1.5 text-xs text-gray-300"
                title={created.toISOString()}
              >
                {currentTime.toLocaleDateString() !==
                  created.toLocaleDateString() && created.toLocaleDateString()}
                <span>{timeString}</span>
              </div>
            </div>
          )}
          <div className={`text-gray-300 ${!header && "pl-15.5"}`}>
            {message.message}
          </div>
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
        <Bar message={message} setReplying={setReplying} index={index} />
      </div>
    </div>
  );
}

export default Message;
