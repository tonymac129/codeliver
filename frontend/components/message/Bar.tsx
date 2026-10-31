"use client";

import type { Message } from "@/generated/prisma/client";
import type { MessageType } from "@/app/chat/[id]/Messages";
import {
  FaReply,
  FaFaceGrin,
  FaFlag,
  FaLink,
  FaPen,
  FaTrash,
  FaCheck,
} from "react-icons/fa6";
import { socket } from "@/lib/socket";
import { useState } from "react";
import Emoji from "../ui/Emoji";

const actionStyles =
  "cursor-pointer rounded p-1.5 group-action flex hover:-translate-y-0.5 hover:scale-115 transition-all!";
const optionStyles = "hover:bg-gray-400 dark:hover:bg-gray-800 rounded";

interface BarProps {
  message: MessageType;
  setReplying: React.Dispatch<React.SetStateAction<Message | null>>;
  setReporting: React.Dispatch<React.SetStateAction<boolean>>;
  setForwarding: React.Dispatch<React.SetStateAction<MessageType | null>>;
  setEdit: React.Dispatch<React.SetStateAction<string | null>>;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  isOwner?: boolean;
}

function Bar({
  message,
  setReplying,
  index,
  setReporting,
  setForwarding,
  setEdit,
  setDeleting,
  isOwner,
}: BarProps) {
  const [copied, setCopied] = useState<boolean>(false);

  function handleReact(emoji: string) {
    socket.emit("react", message.id, emoji);
  }

  function handleCopy() {
    if (!copied) {
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/chat/${message.chatId}?h=${message.id}`,
      );
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <div className="opacity-0 group-hover:opacity-100 transition-opacity! flex gap-x-1 rounded border-2 border-gray-700 text-gray-700 dark:text-gray-300 p-1 top-0 translate-y-[-50%] bg-gray-300 dark:bg-[#0D111C] absolute right-10">
      <div
        className={optionStyles}
        title="Reply"
        onClick={() => setReplying(message)}
      >
        <FaReply size={30} className={actionStyles} />
      </div>
      <Emoji onselect={(emoji) => handleReact(emoji)} right below={index <= 1}>
        <div className={optionStyles} title="React">
          <FaFaceGrin size={30} className={actionStyles} />
        </div>
      </Emoji>
      <div
        className={optionStyles}
        title="Forward"
        onClick={() => setForwarding(message)}
      >
        <FaReply size={30} className={actionStyles + " rotate-y-180"} />
      </div>
      <div
        className={optionStyles}
        title="Report"
        onClick={() => setReporting(true)}
      >
        <FaFlag size={30} className={actionStyles} />
      </div>
      <div
        className={optionStyles}
        title={copied ? "Link copied!" : "Copy link"}
        onClick={handleCopy}
      >
        {copied ? (
          <FaCheck size={30} className={actionStyles} />
        ) : (
          <FaLink size={30} className={actionStyles} />
        )}
      </div>
      {isOwner && (
        <>
          <div
            className={optionStyles}
            title="Edit"
            onMouseDown={() => setEdit(message.message)}
          >
            <FaPen size={30} className={actionStyles} />
          </div>
          <div
            className={optionStyles}
            title="Delete"
            onClick={() => setDeleting(true)}
          >
            <FaTrash size={30} className={actionStyles + " text-red-500"} />
          </div>
        </>
      )}
    </div>
  );
}

export default Bar;
