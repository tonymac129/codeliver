"use client";

import type { User } from "@/generated/prisma/client";
import { useState, useEffect } from "react";
import { editProfile } from "@/app/(user)/profile/actions";
import Input from "../ui/Input";
import Image from "next/image";
import Textarea from "../ui/Textarea";
import Btn from "../ui/Btn";

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
          <label className={labelStyles}>
            Status
            <Input
              placeholder="Hack clubbing..."
              value={user.status || ""}
              setValue={(status) => setUser({ ...user, status })}
            />
          </label>
          {/* TODO: option to select emoji for status */}
        </div>
      </div>
      <label className={labelStyles}>
        About
        <Textarea
          placeholder="Just a random person..."
          value={user.about || ""}
          setValue={(about) => setUser({ ...user, about })}
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
