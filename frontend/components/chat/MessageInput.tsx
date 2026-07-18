"use client";

import type { Message } from "@/generated/prisma/client";
import { useState } from "react";
import {
  FaBold,
  FaCode,
  FaFaceGrin,
  FaItalic,
  FaUnderline,
  FaXmark,
} from "react-icons/fa6";
import { FaPlusCircle, FaQuoteLeft } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { socket } from "@/lib/socket";
import Input from "../ui/Input";
import Btn from "../ui/Btn";

const optionStyles = "rounded cursor-pointer p-1.75 hover:bg-gray-900";

interface MessageInputProps {
  name: string;
  replying: Message | null;
  setReplying: React.Dispatch<React.SetStateAction<Message | null>>;
  chatId: string;
}

function MessageInput({
  name,
  replying,
  setReplying,
  chatId,
}: MessageInputProps) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (message.trim().length > 0) {
      setLoading(true);
      socket.emit("message", message, chatId, replying?.id);
      setMessage("");
      setLoading(false);
      setReplying(null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col relative border border-gray-700 rounded ml-5 py-2 w-[calc(100%-40px)]
         ${replying && "rounded-t-none!"}`}
    >
      {replying && (
        <div className="absolute bottom-full rounded-t bg-gray-900 border border-gray-700 border-b-0 -left-px w-[calc(100%+2px)] text-gray-300 text-sm px-4 py-2">
          <div className="relative flex items-center">
            Replying to:{" "}
            {replying.message.slice(0, 50) +
              (replying.message.length > 50 ? "..." : "")}
            <FaXmark
              size={20}
              className="absolute right-0 cursor-pointer"
              title="Cancel"
              onClick={() => setReplying(null)}
            />
          </div>
        </div>
      )}
      <div className="flex gap-x-2 text-gray-300 px-2">
        <FaPlusCircle
          size={30}
          className={optionStyles}
          title="Attach (Ctrl + Q)"
        />
        <FaBold size={30} className={optionStyles} title="Bold (Ctrl + B)" />
        <FaItalic
          size={30}
          className={optionStyles}
          title="Italicize (Ctrl + I)"
        />
        <FaUnderline
          size={30}
          className={optionStyles}
          title="Underline (Ctrl + U)"
        />
        <FaCode size={30} className={optionStyles} title="Code (Ctrl + P)" />
        <FaFaceGrin
          size={30}
          className={optionStyles}
          title="Emoji (Ctrl + E)"
        />
        <FaQuoteLeft
          size={30}
          className={optionStyles}
          title="Quote (Ctrl + Q)"
        />
      </div>
      <Input
        placeholder={`Message ${name}`}
        value={message}
        setValue={(m) => setMessage(m)}
        styles="bg-transparent w-[calc(100%-100px)]"
        focused={replying ? true : false}
      />
      {message.trim().length > 0 && (
        <Btn
          text={loading ? "Loading..." : "Send"}
          type="submit"
          styles="w-fit flex items-center gap-x-1.5 p-2! py-1.5! text-sm absolute right-4 bottom-3"
          primary
        >
          <MdSend size={18} />
        </Btn>
      )}
    </form>
  );
}

export default MessageInput;
