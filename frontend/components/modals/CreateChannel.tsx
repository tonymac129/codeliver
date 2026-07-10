"use client";

import type { ChannelType } from "@/types/Chat";
import { useState } from "react";
import { labelStyles } from "@/lib/constants";
import { FaCheck } from "react-icons/fa";
import { createChannel, editChannel } from "@/app/chat/actions";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import Btn from "../ui/Btn";
import Textarea from "../ui/Textarea";

interface CreateChannelProps {
  closeModal: () => void;
  existingChannel?: ChannelType;
}

function CreateChannel({ closeModal, existingChannel }: CreateChannelProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newChannel, setNewChannel] = useState<ChannelType>(
    existingChannel || {
      name: "",
      description: "",
    },
  );
  const router = useRouter();

  async function handleCreate() {
    if (newChannel.name) {
      setError(null);
      setLoading(true);
      const res = existingChannel
        ? await editChannel(newChannel)
        : await createChannel(newChannel);
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push(`/chat/${res!.id}`);
        closeModal();
      }
    } else {
      setError("Please enter a channel name");
    }
  }

  return (
    <>
      <h2 className="text-xl text-white font-bold">
        {existingChannel ? "Edit" : "Create"} channel
      </h2>
      <label className={labelStyles}>
        Name
        <Input
          placeholder="cool-channel"
          value={newChannel.name}
          setValue={(name) =>
            setNewChannel({
              ...newChannel,
              name: name.replaceAll(/[\s_]/g, "-").toLowerCase(),
            })
          }
        />
      </label>
      <label className={labelStyles}>
        Description
        <Textarea
          placeholder="Channel for cool stuff!"
          value={newChannel.description}
          setValue={(description) =>
            setNewChannel({ ...newChannel, description })
          }
        />
      </label>
      <label
        className="flex gap-x-3 items-center cursor-pointer w-fit"
        title="Only people you invite can join and message in the channel"
      >
        <input
          type="checkbox"
          checked={newChannel.private || false}
          onChange={(e) =>
            setNewChannel({ ...newChannel, private: e.target.checked })
          }
          className="hidden"
        />
        <div
          className={`${newChannel.private ? "bg-blue-950" : "bg-gray-900"} h-6 rounded-full relative px-1 flex items-center w-11`}
        >
          <div
            className={`${newChannel.private ? "bg-blue-500 translate-x-5" : "bg-gray-700"} w-4 h-4 rounded-full transition-all! flex items-center justify-center`}
          >
            <FaCheck
              size={11}
              className={`${newChannel.private ? "opacity-100" : "opacity-0"} transition-opacity!`}
            />
          </div>
        </div>
        Private
      </label>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Btn
        text={loading ? "Loading..." : existingChannel ? "Save" : "Create"}
        onclick={handleCreate}
        styles="w-fit py-1.5"
        primary
      />
    </>
  );
}

export default CreateChannel;
