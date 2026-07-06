import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Btn from "../ui/Btn";
import Search from "./Search";
import User from "./User";
import Link from "next/link";

const navLinkStyles = "text-gray-300 hover:text-blue-500";

async function Nav() {
  const session = await auth.api.getSession({ headers: await headers() });
  const count: number | null = session
    ? await fetch("http://localhost:3001/count", {
        method: "GET",
      }).then((res) => res.json())
    : null;

  return (
    <nav className="sticky w-full bg-gray-950 z-10 top-0 border-b-2 border-gray-700 flex px-30 py-3 items-center justify-between">
      <div className="flex items-center gap-x-10">
        <Link href="/" className="text-2xl font-bold text-blue-500 mr-5">
          Codeliver
        </Link>
        {session ? (
          <Search />
        ) : (
          <>
            <Link href="/#features" className={navLinkStyles}>
              Features
            </Link>
            <Link href="/#about" className={navLinkStyles}>
              About
            </Link>
            <Link href="/#examples" className={navLinkStyles}>
              Examples
            </Link>
            <Link href="/#faq" className={navLinkStyles}>
              FAQ
            </Link>
          </>
        )}
      </div>
      {session ? (
        <div className="flex gap-x-5 items-center text-gray-300 text-xs">
          <div>🟢 {count} online</div>
          <User user={session.user} />
        </div>
      ) : (
        <Btn text="Log in" link="/login" primary />
      )}
    </nav>
  );
}

export default Nav;
