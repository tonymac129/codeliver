"use server";

import type { User } from "@/generated/prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editProfile(user: User) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session && session.user.id === user.id) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          ...user,
          username: user.username.trim(),
          name: user.name.trim(),
          website: user.website
            ? user.website?.includes("https://") ||
              user.website?.includes("http://")
              ? user.website
              : "https://" + user.website
            : null,
        },
      });
      revalidatePath("/profile");
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
