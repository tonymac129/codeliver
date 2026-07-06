import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { FaHashtag } from "react-icons/fa6";
import { MdChat } from "react-icons/md";
import Link from "next/link";

const headerStyles =
  "text-blue-500 font-bold ml-4 text-lg flex gap-x-3 mb-2 items-center";
const chatStyles = "px-4 py-2 rounded hover:bg-gray-900 text-sm";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  return (
    <div className="pl-26 flex h-[calc(100vh-66px)]">
      <div className="w-70 flex flex-col gap-y-5 border-r-2 border-r-gray-700 py-10 h-full overflow-auto pr-5 text-gray-300">
        <div className="flex flex-col gap-y-1">
          <h2 className={headerStyles}>
            <FaHashtag size={17} /> Channels
          </h2>
          <Link href="/chat/1" className={chatStyles}>
            Channel 1
          </Link>
          <Link href="/chat/2" className={chatStyles}>
            Channel 2
          </Link>
          <Link href="/chat/3" className={chatStyles}>
            Channel 3
          </Link>
          <Link href="/chat/4" className={chatStyles}>
            Channel 4
          </Link>
          <Link href="/chat/5" className={chatStyles}>
            Channel 5
          </Link>
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
