"use server";

import type { ChannelType } from "@/types/Chat";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createChannel(channel: ChannelType) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      const newChannel = await prisma.chat.create({
        data: {
          ...channel,
          userId: session.user.id,
          users: { connect: { id: session.user.id } },
        },
      });
      revalidatePath(`/chat/${newChannel.id}`);
      return { error: null, id: newChannel.id };
    }
  } catch (err) {
    console.error("Error: " + err);
    return { error: "Channel name already exists, please try another one" };
  }
}

export async function editChannel(channel: ChannelType) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      const existingChannel = await prisma.chat.findUnique({
        where: { id: channel.id },
      });
      if (existingChannel && existingChannel.userId === session.user.id) {
        const sameName = await prisma.chat.findUnique({
          where: { name: channel.name },
        });
        if (!sameName || sameName.id === channel.id) {
          const updatedChannel = await prisma.chat.update({
            where: { id: channel.id },
            data: {
              name: channel.name,
              description: channel.description,
              private: channel.private,
            },
          });
          revalidatePath(`/chat/${updatedChannel.id}`);
          return { error: null, id: updatedChannel.id };
        } else {
          return {
            error: "Channel name already exists, please try another one",
          };
        }
      }
    }
  } catch (err) {
    console.error("Error: " + err);
    return { error: "An error occured, please try again later" };
  }
}
