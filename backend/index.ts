import dotenv from "dotenv";
dotenv.config();

import { createServer } from "node:http";
import { Server } from "socket.io";
import { jwtVerify, createRemoteJWKSet } from "jose";
import { prisma } from "./lib/prisma";
import express from "express";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const JWKS = createRemoteJWKSet(
  new URL(`${process.env.FRONTEND_URL}/api/auth/jwks`),
);

let count = 0;

app.get("/count", (req, res) => {
  res.send(count);
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Error: not authenticated"));
  }
  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: process.env.FRONTEND_URL,
      audience: process.env.FRONTEND_URL,
    });
    socket.data.user = payload;
    next();
  } catch (err) {
    console.error("Error: " + err);
    return next(new Error("Something went wrong"));
  }
});

io.on("connection", async (socket) => {
  count++;
  const userData = (await fetchUser(socket.data.user.id))!;

  socket.on("join", (channelId) => {
    socket.join(`channel:${channelId}`);
  });

  socket.on("leave", (channelId) => {
    socket.leave(`channel:${channelId}`);
  });

  socket.on("message", async (message, chatId) => {
    const existingChat = await prisma.chat.upsert({
      where: { id: chatId },
      update: {},
      create: { id: chatId, userId: userData.id, name: "test" },
    });
    const newMessage = await prisma.message.create({
      data: {
        message: message,
        userId: userData.id,
        chatId: existingChat.id,
      },
      include: { user: true, reactions: true },
    });
    io.to(`channel:${existingChat.id}`).emit("message", newMessage);
  });

  socket.on("disconnect", () => {
    count--;
  });
});

server.listen(3001, () => {
  console.log("Running on port 3001");
});

async function fetchUser(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (err) {
    console.error("Error:" + err);
  }
}
