import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q")?.trim().toLowerCase();
    const session = await auth.api.getSession({ headers: await headers() });
    const channels = await prisma.chat.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        OR: [
          { private: false },
          {
            private: true,
            users: { some: { id: session ? session.user.id : "" } },
          },
        ],
      },
      include: { users: true },
    });
    return NextResponse.json(
      channels.map((c) => {
        return {
          ...c,
          joined: session
            ? c.users.find((u) => u.id === session.user.id)
            : false,
        };
      }),
    );
  } catch (err) {
    console.error("Error: " + err);
  }
}
