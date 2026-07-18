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
import Join from "@/components/chat/Join";

export type MessageType = MessageT & {
  user: User;
  reactions?: Reaction[];
  replyMessage?: (MessageT & { user: User }) | null;
  threads?: MessageT[];
};

interface MessagesProps {
  messages: MessageType[];
  userId: string;
  chat: Chat;
  isUser: boolean;
}

function Messages({ messages, userId, chat, isUser }: MessagesProps) {
  const [replying, setReplying] = useState<MessageT | null>(null);
  const [highlighted, setHighlighted] = useState<string | null>(null);
  const [displayedMessages, setDisplayedMessages] =
    useState<MessageType[]>(messages);
  const messageRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    highlightRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [highlighted]);

  return (
    <>
      <div className="flex-1 dh-[calc(100%-150px)] overflow-y-auto pb-10 overflow-x-hidden flex flex-col">
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
          const dateString = new Date(message.createdAt).toLocaleDateString();

          return (
            <div
              key={message.id}
              ref={highlighted === message.id ? highlightRef : null}
            >
              {(i == 0 ||
                new Date(
                  displayedMessages[i - 1].createdAt,
                ).toLocaleDateString() !== dateString) && (
                <div className="my-5 h-px mx-5 bg-gray-700 relative flex justify-center items-center">
                  <div className="text-gray-300 bg-gray-950 text-sm absolute w-fit px-5">
                    {new Date().toLocaleDateString() === dateString
                      ? "Today"
                      : new Date(
                            new Date().getTime() - 86400000,
                          ).toLocaleDateString() === dateString
                        ? "Yesterday"
                        : dateString}
                  </div>
                </div>
              )}
              <Message
                message={message}
                userId={userId}
                setReplying={setReplying}
                index={i}
                highlighted={highlighted}
                setHighlighted={setHighlighted}
                header={
                  i === 0 || message.replyId
                    ? true
                    : false ||
                      new Date(message.createdAt).getTime() -
                        new Date(displayedMessages[i - 1].createdAt).getTime() >
                        600000 ||
                      displayedMessages[i - 1].userId !== message.userId
                }
              />
            </div>
          );
        })}
        <div ref={messageRef} />
      </div>
      {isUser ? (
        <MessageInput
          name={"#" + chat.name}
          setReplying={setReplying}
          replying={replying}
          chatId={chat.id}
        />
      ) : (
        <Join
          channel={{
            id: chat.id,
            name: chat.name,
            description: chat.description || "",
          }}
        />
      )}
    </>
  );
}

export default Messages;
