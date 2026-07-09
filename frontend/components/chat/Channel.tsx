"use client";

import type { Chat } from "@/generated/prisma/client";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Channel({ channel }: { channel: Chat }) {
  const pathname = usePathname();

  return (
    <Link
      key={channel.id}
      href={`/chat/${channel.id}`}
      className={`px-4 py-2 rounded hover:bg-gray-900 text-sm
        ${pathname.includes(channel.id) && "bg-gray-900 text-blue-500 font-bold"}`}
    >
      {channel.name}
    </Link>
  );
}

export default Channel;
