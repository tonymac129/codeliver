"use client";

import { socket } from "@/lib/socket";
import { authClient } from "@/lib/auth-client";
import { useEffect } from "react";

function SocketProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function connection() {
      const { data } = await authClient.token();
      if (data?.token) {
        socket.auth = { token: data.token };
        socket.connect();
      }
    }
    connection();
    return () => {
      socket.disconnect();
    };
  }, []);

  return <>{children}</>;
}

export default SocketProvider;
