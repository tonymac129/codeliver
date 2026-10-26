import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import LeaveChannel from "@/components/chat/LeaveChannel";
import Messages from "../../[id]/Messages";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!id || !session || session.user.id === id) redirect("/chat");
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) redirect("/chat");
  const directChat = await prisma.chat.findUnique({
    where: {
      isDirectMessage: true,
      dmId: [id, session.user.id].sort().join(""),
    },
    include: { users: true, messages: { include: { user: true } } },
  });
  if (!directChat) redirect("/chat");
  const isUser = directChat.users.find((u) => u.id === session.user.id)
    ? true
    : false;

  return (
    <div className="flex-1 flex flex-col pb-3">
      <div className="flex px-5 py-2 border-b border-gray-700 items-center justify-between">
        <div className="flex gap-x-5 items-center">
          <h2 className="text-black dark:text-white font-bold text-lg flex items-center gap-x-2">
            {user.image ? (
              <Image
                src={user.image}
                alt="User avatar"
                width={18}
                height={18}
              />
            ) : (
              <FaUserCircle size={18} />
            )}
            {user.name}
          </h2>
          {/* TODO: open profile panel when user is clicked (also open for clicking on users in channels) */}
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            This is a private DM of just you and {user.name}!
          </p>
        </div>
        {isUser && <LeaveChannel userId={id} />}
      </div>
      <Messages
        messages={directChat.messages}
        userId={session!.user.id}
        chat={directChat}
        isUser={isUser}
        otherUser={user}
      />
    </div>
  );
}

export default Page;
