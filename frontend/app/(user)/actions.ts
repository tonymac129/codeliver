"use server";

import type { FeedbackType } from "@/types/User";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function submitFeedback(feedback: FeedbackType) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (session) {
      await prisma.feedback.create({
        data: {
          ...feedback,
          type: feedback.type as string,
          userId: feedback.anonymous ? undefined : session.user.id,
        },
      });
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
