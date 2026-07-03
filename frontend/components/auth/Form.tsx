"use client";

import type { UserType } from "@/types/User";
import { authClient } from "@/lib/auth-client";
import { FaGoogle } from "react-icons/fa";
import { SiGithub } from "react-icons/si";
import { useState } from "react";
import Provider from "./Provider";
import Input from "../ui/Input";
import Btn from "../ui/Btn";

const labelStyles = "flex flex-col gap-y-1 text-gray-300 text-sm";

function Form() {
  const [signUp, setSignUp] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserType>({
    email: "",
    password: "",
    name: "",
  });

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setLoading(true);
    if (signUp) {
      await authClient.signUp.email(
        {
          email: userData.email,
          password: userData.password,
          name: userData.name,
        },
        {
          onSuccess: () => {
            window.location.reload();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setLoading(false);
          },
        },
      );
    } else {
      await authClient.signIn.email(
        {
          email: userData.email,
          password: userData.password,
        },
        {
          onSuccess: () => {
            window.location.reload();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setLoading(false);
          },
        },
      );
    }
  }

  return (
    <div className="border-2 border-gray-700 rounded overflow-hidden w-100 mx-auto">
      <div className="flex">
        <div
          className={`flex-1 text-gray-300 py-2 text-center cursor-pointer border-b-gray-700 ${signUp ? "border-b-2" : ""}`}
          onClick={() => setSignUp(false)}
        >
          Log in
        </div>
        <div
          className={`flex-1 text-gray-300 py-2 text-center cursor-pointer border-gray-700 
            border-l-2 ${signUp ? "" : "border-b-2"}`}
          onClick={() => setSignUp(true)}
        >
          Sign up
        </div>
      </div>
      <div className="flex flex-col gap-y-5 p-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-y-3 relative"
        >
          <label className={labelStyles}>
            Email
            <Input
              placeholder="hi@example.com"
              value={userData.email}
              setValue={(email) => setUserData({ ...userData, email })}
            />
          </label>
          {signUp && (
            <label className={labelStyles}>
              Display name
              <Input
                placeholder="John Doe"
                value={userData.name}
                setValue={(name) => setUserData({ ...userData, name })}
              />
            </label>
          )}
          <label className={labelStyles}>
            Password
            <Input
              placeholder="secretpassword123"
              value={userData.password}
              setValue={(password) => setUserData({ ...userData, password })}
              type="password"
            />
          </label>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Btn
            text={loading ? "Loading..." : signUp ? "Sign up" : "Log in"}
            type="submit"
            primary
          />
        </form>
        <div className="h-0.75 rounded-full bg-gray-700 relative flex items-center justify-center">
          <div className="px-6 py-2 text-gray-300 text-sm absolute bg-gray-950">
            or
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <Provider provider="Google">
            <FaGoogle size={20} />
          </Provider>
          <Provider provider="GitHub">
            <SiGithub size={20} />
          </Provider>
        </div>
      </div>
    </div>
  );
}

export default Form;
