"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addUser(channelId: string, userId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      //TODO: add an admin group so admins can add people not just owners for private channels
      await prisma.chat.update({
        where: {
          id: channelId,
          OR: [{ private: false }, { userId: session.user.id }],
        },
        data: { users: { connect: { id: userId } } },
      });
      revalidatePath(`/chat/${channelId}`);
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function removeUser(channelId: string, userId?: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      const existingChat = await prisma.chat.findUnique({
        where: { id: channelId },
      });
      if (existingChat) {
        if (session.user.id === existingChat.userId) {
          if (session.user.id === userId || !userId) {
            return false;
          } else {
            await prisma.chat.update({
              where: { id: channelId, isDirectMessage: false },
              data: { users: { disconnect: { id: userId } } },
            });
          }
        } else if (session.user.id === userId) {
          await prisma.chat.update({
            where: { id: channelId },
            data: { users: { disconnect: { id: userId } } },
          });
        }
        revalidatePath(`/chat/${channelId}`);
      }
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function deleteChannel(channelId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      await prisma.chat.delete({
        where: {
          id: channelId,
          userId: session.user.id,
          isDirectMessage: false,
        },
      });
      revalidatePath(`/chat/${channelId}`);
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function transferOwnership(channelId: string, userId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session && session.user.id !== userId) {
      await prisma.chat.update({
        where: {
          id: channelId,
          userId: session.user.id,
          isDirectMessage: false,
        },
        data: { userId: userId },
      });
      revalidatePath(`/chat/${channelId}`);
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}

export async function sendMessage() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      await prisma.message.create({
        data: {
          message: "hello this will probably be forwarded?",
          userId: session.user.id,
          chatId: "931a4969-0cdd-4983-834b-ad96a22ea3ec",
          originalUserId: session.user.id,
          originalChannelId: "04a46961-e73c-46c5-8a38-2ad3d959628e",
          originalMessageId: "9cebc777-4025-44d1-bc96-954f64fd245c",
          originalDate: "10/30/26",
          reactions: {
            create: {
              emoji: "💀",
              users: ["HgnXJkt5u0js1m4Jm4avi8PKhy7ZrbCJ"],
            },
          },
        },
      });
      revalidatePath("/chat/04a46961-e73c-46c5-8a38-2ad3d959628e");
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
