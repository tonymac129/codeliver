import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaHashtag } from "react-icons/fa6";
import { MdChat } from "react-icons/md";
import { prisma } from "@/lib/prisma";
import Menu from "@/components/chat/Menu";
import Channel from "@/components/chat/Channel";
import Link from "next/link";
import Browse from "@/components/chat/Browse";

const headerStyles =
  "text-blue-500 font-bold ml-4 text-lg flex gap-x-3 mb-2 items-center relative group";
const chatStyles = "px-4 py-2 rounded hover:bg-gray-900 text-sm";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  const chats = await prisma.chat.findMany({
    where: { users: { some: { id: session.user.id } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="pl-5 flex h-[calc(100vh-66px)]">
      <div className="w-70 flex flex-col gap-y-5 border-r-2 border-r-gray-700 py-5 h-full overflow-auto pr-5 text-gray-300">
        <div className="flex flex-col gap-y-1">
          <h2 className={headerStyles}>
            <FaHashtag size={17} /> Channels <Menu />
          </h2>
          {chats.length > 0 ? (
            chats.map((chat) => {
              return <Channel key={chat.id} channel={chat} />;
            })
          ) : (
            <div className="text-gray-300 text-center text-sm flex flex-col gap-y-1 items-center py-5">
              <div>You haven&apos;t joined a channel yet</div>
              <Browse />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-1">
          <h2 className={headerStyles}>
            <MdChat size={17} /> Direct messages
          </h2>
          <Link href="/chat/6" className={chatStyles}>
            DM 1
          </Link>
          <Link href="/chat/7" className={chatStyles}>
            DM 2
          </Link>
          <Link href="/chat/8" className={chatStyles}>
            DM 3
          </Link>
          <Link href="/chat/9" className={chatStyles}>
            DM 4
          </Link>
          <Link href="/chat/10" className={chatStyles}>
            DM 5
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}

export default Layout;
