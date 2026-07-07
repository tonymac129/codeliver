import { io } from "socket.io-client";
import { authClient } from "./auth-client";

const { data } = await authClient.token();

export const socket = io("http://localhost:3001", {
  autoConnect: true,
  auth: { token: data?.token },
});
