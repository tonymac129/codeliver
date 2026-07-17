"use client";

import type { ChannelType } from "@/types/Chat";
import type { User } from "@/generated/prisma/client";
import { FaSignOutAlt, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { deleteChannel, transferOwnership } from "@/app/chat/[id]/actions";
import { labelStyles } from "@/lib/constants";
import Warning from "./Warning";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Btn from "../ui/Btn";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FaXmark } from "react-icons/fa6";

const optionStyles =
  "flex px-4 py-2 rounded items-center gap-x-3 hover:bg-gray-900 cursor-pointer";

interface ChannelSettingsProps {
  channel: ChannelType;
  closeModal: () => void;
}

function ChannelSettings({ channel, closeModal }: ChannelSettingsProps) {
  const [warning, setWarning] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<User[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const { data: session } = authClient.useSession();

  async function handleSearch(e: React.SubmitEvent) {
    e.preventDefault();
    const q = name.trim().toLowerCase();
    if (q.length > 0) {
      setSearching(true);
      const matchedUsers = await fetch(
        `${process.env.NEXT_PUBLIC_ROOT_URL}/api/users?q=${q}&c=${channel.id}&i=true&s=false`,
      ).then((res) => res.json());
      setUsers(matchedUsers.filter((u: User) => u.id !== session?.user.id));
      setSearching(false);
    }
  }

  async function handleTransfer() {
    if (user) {
      setLoading(true);
      await transferOwnership(channel.id!, user.id);
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    await deleteChannel(channel.id!);
    setLoading(false);
  }

  function handleSave() {
    setLoading(true);
    closeModal();
    setLoading(false);
  }

  return (
    <>
      <h2 className="text-xl text-white font-bold">Channel settings</h2>
      {/* TODO: add more channel settings */}
      <div className="flex flex-col gap-y-1">
        <h2 className="font-bold text-lg mb-2">Danger zone</h2>
        <div
          className={optionStyles + " text-red-500"}
          onClick={() => setWarning("transfer")}
        >
          <FaSignOutAlt size={17} />
          Transfer ownership
        </div>
        <div
          className={optionStyles + " text-red-500"}
          onClick={() => setWarning("delete")}
        >
          <FaTrash size={17} />
          Delete channel
        </div>
      </div>
      <Btn
        text={loading ? "Loading..." : "Save"}
        onclick={handleSave}
        styles="w-fit"
        primary
      />
      <AnimatePresence>
        {warning && (
          <Modal closeModal={() => setWarning(null)}>
            <Warning
              title={
                warning === "delete"
                  ? "Delete confirmation"
                  : "Transfer ownership"
              }
              loading={loading}
              confirm={warning === "delete" ? handleDelete : handleTransfer}
              cancel={() => setWarning(null)}
            >
              {warning === "delete" ? (
                <p>
                  Are you sure you want to permanently delete the channel{" "}
                  <b>#{channel.name}</b>? All of its data and messages will be
                  deleted, and all the members will be removed. This action
                  cannot be undone.
                </p>
              ) : (
                <>
                  <p>
                    Once you transfer the ownership of <b>#{channel.name}</b>,
                    you will not be able to make yourself the owner or access
                    the settings again.
                  </p>
                  <form onSubmit={handleSearch} className={labelStyles}>
                    New owner (has to be in channel)
                    {user ? (
                      <div className="px-2 py-1 rounded flex gap-x-2 items-center bg-gray-900 w-fit">
                        <Image
                          src={user.image || "/avatar.svg"}
                          alt="Avatar"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        {user.name}
                        <FaXmark
                          size={15}
                          className="cursor-pointer"
                          onMouseDown={() => setUser(null)}
                        />
                      </div>
                    ) : (
                      <>
                        <Input
                          placeholder="Type their name here and hit enter"
                          value={name}
                          setValue={(name) => setName(name)}
                          clear
                        />
                        {searching ? (
                          <div className="py-2 text-center">Loading...</div>
                        ) : (
                          users && //TODO: directly put a list of users fetched from parent comps here without api searching
                          (users.length > 0 ? (
                            <div>
                              {users.slice(0, 5).map((u) => (
                                <div
                                  key={u.id}
                                  onMouseDown={() => setUser(u)}
                                  className="flex items-center gap-x-3 px-2 py-1 rounded hover:bg-gray-900 cursor-pointer"
                                >
                                  <Image
                                    src={u.image || "/avatar.svg"}
                                    alt="Avatar"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                  />
                                  {u.name}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="py-2 text-center">
                              No users found
                            </div>
                          ))
                        )}
                        <button type="submit" className="hidden" />
                      </>
                    )}
                  </form>
                </>
              )}
            </Warning>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChannelSettings;
