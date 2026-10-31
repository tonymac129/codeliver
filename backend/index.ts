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
    origin: "http://nextjs-frontend:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const JWKS = createRemoteJWKSet(
  new URL(`${process.env.FRONTEND_URL}/api/auth/jwks`),
);

let count = 0;

app.get("/", (_, res) => {
  res.send({ message: "Hello from Codeliver!" });
});

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
    console.log(`User ${userData.name} joined channel ${channelId}`);
  });

  socket.on("leave", (channelId) => {
    socket.leave(`channel:${channelId}`);
    console.log(`User ${userData.name} left channel ${channelId}`);
  });

  socket.on("message", async (message, chatId, replyId?, original?) => {
    console.log(message, chatId, replyId, original);
    const existingChat = await prisma.chat.upsert({
      where: { id: chatId },
      update: {},
      create: { id: chatId, userId: userData.id, name: "new-channel" },
    });
    const newMessage = await prisma.message.create({
      data: {
        message: message,
        userId: userData.id,
        chatId: existingChat.id,
        replyId,
        originalUserId: original.userId || undefined,
        originalChannelId: original.channelId || undefined,
        originalMessageId: original.messageId || undefined,
        originalDate: original.date || undefined,
      },
      include: {
        user: true,
        reactions: true,
        replyMessage: { include: { user: true } },
        threads: true,
      },
    });
    io.to(`channel:${existingChat.id}`).emit("message", newMessage);
  });

  socket.on("edit", async (messageId, edit) => {
    const edited = await prisma.message.update({
      where: { id: messageId, userId: userData.id },
      data: { message: edit, edited: true },
    });
    console.log("edited", edited);
    io.to(`channel:${edited.chatId}`).emit("edit"); //TODO: make frontend listen for this and refresh
  });

  socket.on("delete", async (messageId) => {
    console.log(messageId);
    const deleted = await prisma.message.delete({
      where: { id: messageId, userId: userData.id },
    });
    io.to(`channel:${deleted.chatId}`).emit("delete"); //TODO: make frontend listen for this and refresh
  });

  socket.on("react", async (messageId, emoji) => {
    console.log(messageId, emoji);
    const users = await prisma.reaction.findUnique({
      where: { emoji_messageId: { emoji, messageId } },
    });
    if (users) {
      users.users = users.users.includes(userData.id)
        ? users.users.filter((u) => u !== userData.id)
        : [...users.users, userData.id];
    }
    const updated = await prisma.message.update({
      where: { id: messageId },
      data: {
        reactions: {
          upsert: {
            where: { emoji_messageId: { emoji, messageId } },
            create: { emoji, users: [userData.id] },
            update: { users: users!.users },
          },
        },
      },
    });
    console.log(updated);
    io.to(`channel:${updated.chatId}`).emit("react"); //TODO: make this reflect on frontend too
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
