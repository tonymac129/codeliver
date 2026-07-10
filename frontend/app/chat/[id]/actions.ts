"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addUser(channelId: string, userId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      //TODO: ensure user has permission for private vs public to add users
      await prisma.chat.update({
        where: { id: channelId },
        data: { users: { connect: { id: userId } } },
      });
      revalidatePath(`/chat/${channelId}`);
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
