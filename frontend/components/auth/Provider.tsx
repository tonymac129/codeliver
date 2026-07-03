"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

interface ProviderProps {
  provider: string;
  children: React.ReactNode;
}

function Provider({ provider, children }: ProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleLogin() {
    setLoading(true);
    console.log(provider.toLowerCase());
    await authClient.signIn.social({ provider: provider.toLowerCase() });
  }

  return (
    <div
      onClick={handleLogin}
      className="px-4 py-2 cursor-pointer text-gray-300 font-bold bg-gray-900 rounded flex items-center gap-x-4"
    >
      {children}
      {loading ? "Loading..." : <>Sign in with {provider}</>}
    </div>
  );
}

export default Provider;
