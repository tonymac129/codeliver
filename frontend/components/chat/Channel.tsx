"use client";

import type { Chat } from "@/generated/prisma/client";
import { usePathname } from "next/navigation";
import { FaLock, FaHashtag } from "react-icons/fa";
import Link from "next/link";

function Channel({ channel }: { channel: Chat }) {
  const pathname = usePathname();

  return (
    <Link
      key={channel.id}
      href={`/chat/${channel.id}`}
      className={`px-4 py-2 rounded hover:bg-gray-900 flex items-center gap-x-1 text-sm
        ${pathname.includes(channel.id) && "bg-gray-900 text-blue-500 font-bold"}`}
    >
      {channel.private ? <FaLock size={17} /> : <FaHashtag size={17} />}
      {channel.name}
    </Link>
  );
}

export default Channel;
