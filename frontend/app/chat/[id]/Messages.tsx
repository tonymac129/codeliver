"use client";

import type { MessageType } from "@/types/Chat";
import { useState, useEffect, useRef } from "react";
import { socket } from "@/lib/socket";
import Message from "@/components/message/Message";
import MessageInput from "@/components/chat/MessageInput";

interface MessagesProps {
  messages: MessageType[];
  userId: string;
  chatId: string;
}

function Messages({ messages, userId, chatId }: MessagesProps) {
  const [replying, setReplying] = useState<boolean>(false);
  const [displayedMessages, setDisplayedMessages] =
    useState<MessageType[]>(messages);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on("message", (newMessage: MessageType) => {
      if (newMessage.chatId === chatId) {
        setDisplayedMessages((prev) => {
          return [...prev, newMessage];
        });
      }
    });
  }, [chatId]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [displayedMessages]);

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
        {displayedMessages.map((message, i) => {
          return (
            <div key={message.id}>
              {(i == 0 ||
                new Date(
                  displayedMessages[i - 1].createdAt,
                ).toLocaleDateString() !==
                  new Date(message.createdAt).toLocaleDateString()) && (
                <div className="my-5 h-px mx-5 bg-gray-700 relative flex justify-center items-center">
                  <div className="text-gray-300 bg-gray-950 text-sm absolute w-fit px-5">
                    {message.createdAt.toLocaleDateString()}
                  </div>
                  hi
                </div>
              )}
              <Message
                message={message}
                userId={userId}
                setReplying={setReplying}
                index={i}
              />
            </div>
          );
        })}
        <div ref={messageRef} />
      </div>
      <MessageInput
        name={chatId}
        setReplying={setReplying}
        replying={replying}
        chatId={chatId}
      />
    </>
  );
}

export default Messages;
