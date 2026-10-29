import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MdChat } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { prisma } from "@/lib/prisma";
import Menu from "@/components/chat/Menu";
import Channel from "@/components/chat/Channel";
import Link from "next/link";
import Browse from "@/components/chat/Browse";
import DirectMenu from "@/components/chat/DirectMenu";
import Direct from "@/components/chat/Direct";

const headerStyles =
  "text-blue-500 font-bold ml-4 text-lg flex gap-x-3 mb-2 items-center relative group";
const messageStyles =
  "text-gray-700 dark:text-gray-300 text-center text-sm flex flex-col gap-y-1 items-center py-5";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  const chats = await prisma.chat.findMany({
    where: { users: { some: { id: session.user.id } }, isDirectMessage: false },
    orderBy: { name: "asc" },
  });
  const directs = await prisma.chat.findMany({
    where: { users: { some: { id: session.user.id } }, isDirectMessage: true },
    orderBy: { name: "asc" },
    include: { users: true },
  });

  return (
    <div className="pl-5 flex h-[calc(100vh-66px)]">
      <div className="w-70 flex flex-col gap-y-5 border-r-2 border-r-gray-700 py-5 h-full overflow-auto pr-5 text-gray-700 dark:text-gray-300">
        <div className="flex flex-col gap-y-1">
          <h2 className={headerStyles}>
            <Link href="/chat" className="flex gap-x-3 items-center">
              <FaHashtag size={17} /> Channels
            </Link>{" "}
            <Menu />
          </h2>
          {chats.length > 0 ? (
            chats.map((chat) => {
              return <Channel key={chat.id} channel={chat} />;
            })
          ) : (
            <div className={messageStyles}>
              <div>You haven&apos;t joined a channel yet</div>
              <Browse />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <h2 className={headerStyles}>
            <Link href="/chat/dm" className="flex gap-x-3 items-center">
              <MdChat size={17} /> Direct messages
            </Link>
            <DirectMenu />
          </h2>
          {directs.length > 0 ? (
            directs.map((d) => (
              <Direct
                key={d.id}
                user={d.users.find((u) => u.id !== session.user.id)!}
              />
            ))
          ) : (
            <div className={messageStyles}>
              <div>You don&apos;t have any DMs yet</div>
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
