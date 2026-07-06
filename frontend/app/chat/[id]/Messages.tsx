"use client";

import type { MessageType } from "@/types/Chat";
import { useState } from "react";
import Message from "@/components/message/Message";
import MessageInput from "@/components/chat/MessageInput";

interface MessagesProps {
  messages: MessageType[];
  userId: string;
  chatId: string;
}

function Messages({ messages, userId, chatId }: MessagesProps) {
  const [replying, setReplying] = useState<boolean>(false);

  return (
    <>
      <div className="h-[calc(100%-110px)] overflow-y-auto pb-10 overflow-x-hidden flex  flex-col gap-y-3">
        <div className="py-10 flex flex-col gap-y-5 px-5">
          <h1 className="text-2xl text-blue-500 font-bold">
            Welcome to *insert channel name here*!
          </h1>
          <p className="text-gray-300">
            Congrats, you&apos;ve scrolled up far enough to see the beginning of
            this channel.
          </p>
        </div>
        {messages.map((message, i) => {
          return (
            <>
              {(i == 0 ||
                messages[i - 1].createdAt.toLocaleDateString() !==
                  message.createdAt.toLocaleDateString()) && (
                <div className="my-5 h-px w-full bg-gray-700 relative flex justify-center items-center">
                  <div className="text-gray-300 bg-gray-950 text-sm absolute w-fit px-5">
                    {message.createdAt.toLocaleDateString()}
                  </div>
                  hi
                </div>
              )}
              <Message
                key={message.id}
                message={message}
                userId={userId}
                setReplying={setReplying}
                index={i}
              />
            </>
          );
        })}
      </div>
      <MessageInput
        name={chatId}
        setReplying={setReplying}
        replying={replying}
      />
    </>
  );
}

export default Messages;
