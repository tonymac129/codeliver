"use client";

import type { User } from "@/generated/prisma/client";
import { useState, useEffect } from "react";
import { FaFaceGrin } from "react-icons/fa6";
import { editProfile } from "@/app/(user)/profile/actions";
import Input from "../ui/Input";
import Image from "next/image";
import Emoji from "../ui/Emoji";
import Textarea from "../ui/Textarea";
import Btn from "../ui/Btn";
import Status from "./Status";

const labelStyles = "flex flex-col gap-y-1 text-gray-300 text-sm";

function Form({ userData }: { userData: User }) {
  const [user, setUser] = useState<User>(userData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    if (user.name.trim().length > 0 && user.username.trim().length > 0) {
      setLoading(true);
      await editProfile(user);
      //TODO: add react toast or smth similar to show notification
      setError(null);
      setLoading(false);
    } else {
      setError("Please fill out the display name and username fields");
    }
  }

  useEffect(() => {
    setUser(userData);
  }, [userData]);

  return (
    <div className="flex flex-col gap-y-5 py-10 w-160">
      <div className="flex gap-x-15">
        <div className="flex flex-col gap-y-3 items-center text-gray-300 text-sm text-center">
          <Image
            src={userData.image || "/avatar.svg"}
            alt="Avatar"
            width={400}
            height={400}
            className="w-50 rounded"
          />
          Update profile picture
        </div>
        <div className="flex flex-col gap-y-5 flex-1">
          <label className={labelStyles}>
            <div>
              Display name <span className="text-red-500">*</span>
            </div>
            <Input
              placeholder="Tony"
              value={user.name}
              setValue={(name) => setUser({ ...user, name })}
            />
          </label>
          <label className={labelStyles}>
            <div>
              Username <span className="text-red-500">*</span>
            </div>
            <Input
              placeholder="tonymac129"
              value={user.username || ""}
              setValue={(username) => setUser({ ...user, username })}
            />
          </label>
          <div className={labelStyles}>
            Status
            <div className="flex bg-gray-900 rounded items-center">
              <Emoji
                onselect={(statusEmoji) => setUser({ ...user, statusEmoji })}
                below
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-lg cursor-pointer pl-4 pr-2 hover:text-yellow-500 hover:-translate-y-0.5 hover:scale-110 transition-all!"
                  title="Choose emoji"
                >
                  {user.statusEmoji ? (
                    user.statusEmoji
                  ) : (
                    <FaFaceGrin size={40} title="Choose emoji" />
                  )}
                </div>
              </Emoji>
              <Input
                placeholder="Hack clubbing..."
                value={user.status || ""}
                setValue={(status) => setUser({ ...user, status })}
                styles="bg-transparent pl-2"
              />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-2 mt-2">
              <Status emoji="🟢" text="Available" setUser={setUser} />
              <Status emoji="🟡" text="AFK" setUser={setUser} />
              <Status emoji="🔴" text="Do not disturb" setUser={setUser} />
              <Status emoji="🔥" text="Coding" setUser={setUser} />
              <Status emoji="🤒" text="Sick" setUser={setUser} />
              <Status emoji="🔒" text="Locked in" setUser={setUser} />
              <Status text="Clear" setUser={setUser} />
            </div>
          </div>
          {/* TODO: option to select emoji for status */}
        </div>
      </div>
      <label className={labelStyles}>
        About ({user.about?.length || 0}/150)
        <Textarea
          placeholder="Just a random person..."
          value={user.about || ""}
          setValue={(about) =>
            about.length < 151 &&
            setUser({ ...user, about: about.slice(0, 150) })
          }
        />
      </label>
      <label className={labelStyles}>
        Pronouns
        <Input
          placeholder="???"
          value={user.pronouns || ""}
          setValue={(pronouns) => setUser({ ...user, pronouns })}
        />
      </label>
      <label className={labelStyles}>
        Website
        <Input
          placeholder="google.com"
          value={user.website || ""}
          setValue={(website) => setUser({ ...user, website })}
        />
      </label>
      <label className={labelStyles}>
        Location
        <Input
          placeholder="Somewhere on Earth"
          value={user.location || ""}
          setValue={(location) => setUser({ ...user, location })}
        />
      </label>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Btn
        text={loading ? "Loading..." : "Save"}
        onclick={handleSave}
        styles="w-fit"
        primary
      />
    </div>
  );
}

export default Form;
