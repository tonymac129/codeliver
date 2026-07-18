"use client";

import type { Message } from "@/generated/prisma/client";
import { FaReply, FaFaceGrin } from "react-icons/fa6";
import { MdMarkChatUnread } from "react-icons/md";
import Emoji from "../ui/Emoji";

const actionStyles =
  "cursor-pointer rounded p-1.5 group-action flex hover:-translate-y-0.5 hover:scale-115 transition-all!";

interface BarProps {
  message: Message;
  setReplying: React.Dispatch<React.SetStateAction<Message | null>>;
  index: number;
}

function Bar({ message, setReplying, index }: BarProps) {
  return (
    <div
      className="opacity-0 group-hover:opacity-100 transition-opacity! flex gap-x-1 rounded border-2 border-gray-700
       text-gray-300 p-1 top-0 translate-y-[-50%] bg-[#0D111C] absolute right-5"
    >
      <div
        className="hover:bg-gray-800 rounded"
        title="Reply"
        onClick={() => setReplying(message)}
      >
        <FaReply size={30} className={actionStyles} />
      </div>
      <Emoji onselect={(emoji) => console.log(emoji)} right below={index <= 1}>
        <div className="hover:bg-gray-800 rounded" title="React">
          <FaFaceGrin size={30} className={actionStyles} />
        </div>
      </Emoji>
      <div className="hover:bg-gray-800 rounded" title="Mark unread">
        <MdMarkChatUnread size={30} className={actionStyles} />
      </div>
      <div className="hover:bg-gray-800 rounded" title="Forward">
        <FaReply size={30} className={actionStyles + " rotate-y-180"} />
      </div>
    </div>
  );
}

export default Bar;
