"use client";

import type { User } from "@/generated/prisma/client";
import { usePathname, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { leaveDirect } from "@/app/chat/dm/[id]/actions";
import { AnimatePresence } from "framer-motion";
import Warning from "../modals/Warning";
import Link from "next/link";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import Modal from "../ui/Modal";

function Direct({ user }: { user: User }) {
  const [leaving, setLeaving] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLeave() {
    setLoading(true);
    setError(null);
    await leaveDirect(user.id);
    setLoading(false);
    setLeaving(false);
    router.refresh();
    router.push("/chat");
  }

  return (
    <>
      <Link
        href={`/chat/dm/${user.id}`}
        className={`px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-900 text-sm relative group flex items-center gap-x-3 ${pathname.includes(user.id) && "bg-gray-300 dark:bg-gray-900 text-blue-500 font-bold"}`}
      >
        {user.image ? (
          <Image src={user.image} alt="Avatar" width={20} height={20} />
        ) : (
          <FaUser size={20} />
        )}
        {user.name}
        <FaXmark
          size={15}
          onClick={() => setLeaving(true)}
          title="Leave DM"
          className="opacity-0 group-hover:opacity-100 transition-all! absolute right-4"
        />
      </Link>
      <AnimatePresence>
        {leaving && (
          <Modal closeModal={() => setLeaving(false)}>
            <Warning
              title="Leave confirmation"
              confirm={handleLeave}
              loading={loading}
              cancel={() => setLeaving(false)}
            >
              <p>
                Are you sure you want to leave this DM? You can still join back
                later and this does not notify the other person.
              </p>

              {error && <div className="text-sm text-red-500">{error}</div>}
            </Warning>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default Direct;
