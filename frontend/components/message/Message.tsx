"use client";

import type { Message as MessageT } from "@/generated/prisma/client";
import type { MessageType } from "@/app/chat/[id]/Messages";
import { MdAddReaction, MdSend } from "react-icons/md";
import { HiOutlineReply } from "react-icons/hi";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Reaction from "./Reaction";
import Emoji from "../ui/Emoji";
import Modal from "../ui/Modal";
import Image from "next/image";
import Bar from "./Bar";
import Feedback from "../user/Feedback";
import Forward from "../modals/Forward";
import Link from "next/link";
import Warning from "../modals/Warning";
import { socket } from "@/lib/socket";
import Input from "../ui/Input";

const headerStyles =
  "text-gray-700 dark:text-gray-300 gap-x-3 text-sm flex items-center w-fit";

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
  const [reporting, setReporting] = useState<boolean>(false);
  const [forwarding, setForwarding] = useState<MessageType | null>(null);
  const [edit, setEdit] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<boolean>(false);
  const router = useRouter();
  const isHighlighted = highlighted === message.id;
  const currentTime = new Date();
  const created = new Date(message.createdAt);
  const timeString = `${created.getHours() % 12 || "12"}:${created.getMinutes().toString().padStart(2, "0")} ${created.getHours() > 11 ? "PM" : "AM"}`;

  function handleReact(emoji: string) {
    socket.emit("react", message.id, emoji);
  }

  function handleEdit(e?: React.SubmitEvent) {
    e?.preventDefault();
    if (edit && edit.trim().length > 0 && edit !== message.message) {
      socket.emit("edit", message.id, edit);
      setEdit(null);
    }
  }

  function handleDelete() {
    socket.emit("delete", message.id);
  }

  useEffect(() => {
    if (highlighted === message.id) {
      setTimeout(() => {
        setHighlighted(null);
      }, 1500);
    }
  }, [highlighted, message.id, setHighlighted]);

  return edit !== null ? (
    <form
      onSubmit={handleEdit}
      className="py-2 px-5 hover:bg-gray-300/50 dark:hover:bg-[#0D111C]"
    >
      <Input
        onblur={handleEdit}
        placeholder="Your edited message here"
        value={edit}
        setValue={(e) => setEdit(e)}
      />
    </form>
  ) : (
    <div
      className={`py-2 px-5 group flex flex-col gap-y-1 relative ${isHighlighted ? "bg-gray-300 dark:bg-gray-900" : "hover:bg-gray-300/50 dark:hover:bg-[#0D111C]"} ${header && "mt-3"}`}
    >
      {message.replyMessage && (
        <div
          className={headerStyles + " pl-6 cursor-pointer"}
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
          <div className="opacity-0 group-hover:opacity-100 transition-opacity! text-[11px] absolute text-gray-600 dark:text-gray-400 left-5 top-[50%] translate-y-[-50%]">
            {timeString}
          </div>
        )}
        <div className="flex flex-col gap-y-3">
          {header && (
            <div className="flex gap-x-5 items-center">
              <h2 className="text-lg font-bold text-black dark:text-white">
                {message.user.name}
              </h2>
              <div
                className="flex gap-x-1.5 text-xs text-gray-700 dark:text-gray-300"
                title={created.toISOString()}
              >
                {currentTime.toLocaleDateString() !==
                  created.toLocaleDateString() && created.toLocaleDateString()}
                <span>{timeString}</span>
              </div>
            </div>
          )}
          {message.originalUser && message.originalChannel && (
            <>
              <div className={headerStyles}>
                <MdSend size={18} />
                <div>
                  Forwarded from{" "}
                  <Link
                    href={
                      message.originalChannel.isDirectMessage
                        ? ""
                        : `/chat/${message.originalChannelId}`
                    }
                    className="bg-blue-200 dark:bg-blue-950 p-1 rounded"
                  >
                    {message.originalChannel.isDirectMessage
                      ? "Direct message"
                      : `#${message.originalChannel.name}`}
                  </Link>
                </div>
              </div>
              <div className={headerStyles}>
                {message.originalUser.image ? (
                  <Image
                    src={message.originalUser.image}
                    alt="User avatar"
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <FaUser size={20} />
                )}{" "}
                {message.originalUser.name} on {message.originalDate}:
              </div>
            </>
          )}
          <div
            className={`text-gray-700 dark:text-gray-300 ${!header && "pl-15.5"} ${message.originalChannel && "border-l-2 border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-800/50 cursor-pointer px-3 py-1.5 rounded-r"}`}
            title={
              message.originalChannel ? "Go to forwarded message" : undefined
            }
            onClick={() =>
              message.originalChannelId
                ? router.push(
                    `/chat/${message.originalChannelId}?h=${message.originalMessageId}`,
                  )
                : undefined
            }
          >
            {message.message}{" "}
            {message.edited && (
              <span
                className="text-xs text-gray-600 dark:text-gray-400 pl-0.5"
                title="This message has been edited1"
              >
                (edited)
              </span>
            )}
          </div>
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {message.reactions.map((reaction, i) => {
                return (
                  <Reaction
                    key={i}
                    messageId={message.id}
                    reaction={reaction}
                    reacted={reaction.users.includes(userId)}
                  />
                );
              })}
              <Emoji onselect={(emoji) => handleReact(emoji)}>
                <div className="px-2 py-1 text-gray-700 dark:text-gray-300 rounded border border-gray-700 cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-800 text-base">
                  <MdAddReaction size={20} />
                </div>
              </Emoji>
            </div>
          )}
        </div>
        <Bar
          message={message}
          setReplying={setReplying}
          index={index}
          setReporting={setReporting}
          setForwarding={setForwarding}
          setEdit={setEdit}
          setDeleting={setDeleting}
          isOwner={userId === message.userId}
        />
      </div>
      <AnimatePresence>
        {reporting && (
          <Modal closeModal={() => setReporting(false)}>
            <Feedback defaultType="Message" />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {forwarding && (
          <Modal closeModal={() => setForwarding(null)}>
            <Forward forwarding={forwarding} />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleting && (
          <Modal closeModal={() => setDeleting(false)}>
            <Warning
              title="Message deletion confirmation"
              loading={false}
              confirm={handleDelete}
              cancel={() => setDeleting(false)}
            >
              <p>
                Are you sure you want to delete this message? This action is
                permanent and irreversible.
              </p>
            </Warning>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Message;
