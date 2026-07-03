"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

function Tab({ name }: { name: string }) {
  const pathname = usePathname();

  return (
    <Link
      href={`/${name.toLowerCase()}`}
      className={`px-4 py-2 rounded hover:bg-gray-900
        ${pathname.includes(name.toLowerCase()) && "text-blue-500 font-bold bg-gray-900"}`}
    >
      {name}
    </Link>
  );
}

export default Tab;
