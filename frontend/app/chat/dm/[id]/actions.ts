"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function leaveDirect(userId: string) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session && session.user.id !== userId) {
      await prisma.chat.update({
        where: {
          isDirectMessage: true,
          dmId: [userId, session.user.id].sort().join(""),
        },
        data: { users: { disconnect: { id: session.user.id } } },
      });
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
