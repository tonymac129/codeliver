"use client";

import type { User as UserType } from "better-auth";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaGear, FaSun } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const optionStyles =
  "cursor-pointer hover:bg-gray-900 rounded p-2 text-gray-300 flex gap-x-2 items-center group";
const iconStyles =
  "group-hover:scale-120 group-hover:-translate-y-0.5 transition-transform! duration-250!";

function User({ user }: { user: UserType }) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  async function handleSignout() {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.reload();
        },
      },
    });
  }

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div ref={menuRef} className="relative">
      <Image
        src={user.image || "/avatar.svg"}
        alt="Avatar"
        width={40}
        height={40}
        onClick={() => setMenuOpen(true)}
        className="rounded-full border-2 border-gray-700 cursor-pointer"
      />
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ scale: 0, y: -13 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: -13 }}
            className="w-40 rounded border-2 origin-[90%_0px] border-gray-700 flex flex-col p-2 absolute top-[calc(100%+5px)] right-0 bg-gray-950"
          >
            <Link href="/profile" className={optionStyles}>
              <FaUser size={17} className={iconStyles} />
              Profile
            </Link>
            <Link href="/settings" className={optionStyles}>
              <FaGear size={17} className={iconStyles} />
              Settings
            </Link>
            <div className={optionStyles}>
              <FaSun size={17} className={iconStyles} />
              Mode
            </div>
            <div className={optionStyles} onClick={() => handleSignout()}>
              <FaSignOutAlt size={17} className={iconStyles} />
              {loading ? "Loading..." : "Sign out"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default User;
