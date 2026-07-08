"use server";

import type { ChannelType } from "@/types/Chat";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function createChannel(channel: ChannelType) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      const newChannel = await prisma.chat.create({
        data: { ...channel, userId: session.user.id },
      });
      return { error: null, id: newChannel.id };
    }
  } catch (err) {
    console.error("Error: " + err);
    return { error: "Channel name already exists, please try another one" };
  }
}
