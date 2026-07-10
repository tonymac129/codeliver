"use client";

import type {
  Message as MessageT,
  Reaction,
  User,
} from "@/generated/prisma/client";
import type { Chat } from "@/generated/prisma/client";
import { useState, useEffect, useRef } from "react";
import { socket } from "@/lib/socket";
import Message from "@/components/message/Message";
import MessageInput from "@/components/chat/MessageInput";

export type MessageType = MessageT & {
  user: User;
  reactions?: Reaction[];
};

interface MessagesProps {
  messages: MessageType[];
  userId: string;
  chat: Chat;
}

function Messages({ messages, userId, chat }: MessagesProps) {
  const [replying, setReplying] = useState<boolean>(false);
  const [displayedMessages, setDisplayedMessages] =
    useState<MessageType[]>(messages);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMessage(newMessage: MessageType) {
      if (newMessage.chatId === chat.id) {
        setDisplayedMessages((prev) => {
          return [...prev, newMessage];
        });
      }
    }
    socket.emit("join", chat.id);
    socket.on("message", handleMessage);
    return () => {
      socket.emit("leave", chat.id);
      socket.off("message", handleMessage);
    };
  }, [chat.id]);

  useEffect(() => {
    messageRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [displayedMessages]);

  return (
    <>
      <div className="h-[calc(100%-150px)] overflow-y-auto pb-10 overflow-x-hidden flex  flex-col gap-y-3">
        <div className="py-10 flex flex-col gap-y-1 px-5">
          <h1 className="text-2xl text-blue-500 font-bold">
            Welcome to #{chat.name}!
          </h1>
          <p className="text-gray-300 text-sm">{chat.description}</p>
          <p className="text-gray-300 text-sm mt-4">
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
                    {new Date(message.createdAt).toLocaleDateString()}
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
        name={"#" + chat.name}
        setReplying={setReplying}
        replying={replying}
        chatId={chat.id}
      />
    </>
  );
}

export default Messages;
