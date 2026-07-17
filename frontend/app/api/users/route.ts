import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q")?.trim().toLowerCase();
    const channel = req.nextUrl.searchParams.get("c")?.trim().toLowerCase();
    const inChannel = req.nextUrl.searchParams.get("i") ? true : false;
    if (query) {
      const users = await prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              email: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              about: {
                contains: query.trim().toLowerCase(),
                mode: "insensitive",
              },
            },
            {
              location: {
                contains: query.trim().toLowerCase(),
                mode: "insensitive",
              },
            },
          ],
          chats: inChannel
            ? { some: { id: channel } }
            : { none: { id: channel } },
        },
      });
      return NextResponse.json(users);
    }
  } catch (err) {
    console.error("Error: " + err);
  }
}
