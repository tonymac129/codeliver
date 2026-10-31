import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FaHashtag, FaLock } from "react-icons/fa";
import Messages, { MessageType } from "./Messages";
import EditChannel from "@/components/chat/EditChannel";
import AddUsers from "@/components/chat/AddUsers";
import Settings from "@/components/chat/Settings";
import LeaveChannel from "@/components/chat/LeaveChannel";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ h: string | undefined }>;
}

async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { h } = await searchParams;
  const session = await auth.api.getSession({ headers: await headers() });
  const existingChat = await prisma.chat.findUnique({
    where: { id },
    include: {
      messages: {
        //TODO: add message buffering on scroll so initially only loads the most recent 50-100 messages
        include: {
          user: true,
          reactions: true,
          replyMessage: { include: { user: true } },
          threads: true,
          originalChannel: true,
          originalUser: true,
        },
      },
      users: true,
    },
  });
  if (!existingChat) redirect("/chat");
  const isUser = existingChat.users.find((u) => u.id === session!.user.id)
    ? true
    : false;
  if (!isUser && existingChat.private) redirect("/chat");
  const isOwner = existingChat.userId === session!.user.id;
  const cleanChannel = {
    id: existingChat.id,
    name: existingChat.name,
    description: existingChat.description || "",
    private: existingChat.private,
  };

  return (
    <div className="flex-1 flex flex-col pb-3">
      <div className="flex px-5 py-2 border-b border-gray-700 items-center justify-between">
        <div className="flex gap-x-5 items-center">
          <h2 className="text-black dark:text-white font-bold text-lg flex items-center gap-x-2">
            {existingChat.private ? (
              <FaLock size={18} title="Private channel" />
            ) : (
              <FaHashtag size={18} title="Public channel" />
            )}{" "}
            {existingChat.name}
          </h2>
          {existingChat.description && (
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {existingChat.description.slice(0, 80) +
                (existingChat.description.length > 80 ? "..." : "")}
            </p>
          )}
        </div>
        {isUser && (
          <div className="flex gap-x-3 text-gray-700 dark:text-gray-300">
            <AddUsers
              channelId={existingChat.id}
              addedUsers={existingChat.users}
              owner={existingChat.userId}
              isOwner={isOwner}
              isPublic={!existingChat.private}
            />
            {isOwner && <EditChannel channel={cleanChannel} />}
            {isOwner && <Settings channel={cleanChannel} />}
            <LeaveChannel channel={cleanChannel} currentId={session?.user.id} />
          </div>
        )}
      </div>
      <Messages
        messages={existingChat.messages as MessageType[]}
        userId={session!.user.id}
        chat={existingChat}
        isUser={isUser}
        highlightedId={h}
      />
    </div>
  );
}

export default Page;
