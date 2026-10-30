"use client";

import type { ChannelType } from "@/types/Chat";
import { useState } from "react";
import { labelStyles } from "@/lib/constants";
import { createChannel, editChannel } from "@/app/chat/actions";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import Btn from "../ui/Btn";
import Textarea from "../ui/Textarea";
import Toggle from "../ui/Toggle";

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
      <h2 className="text-xl text-black dark:text-white font-bold">
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
      <Toggle
        text="Private"
        checked={newChannel.private}
        setChecked={(v) => setNewChannel({ ...newChannel, private: v })}
      />
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
