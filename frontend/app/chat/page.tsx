import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Browse from "@/components/chat/Browse";
import Channel from "@/components/home/Channel";

export const metadata: Metadata = {
  title: "Chat | Codeliver",
  description:
    "Browse for channels, check your new messages, and manage your chats on Codeliver here.",
  authors: [{ name: "Codeliver", url: "https://codeliver.vercel.app" }],
  openGraph: {
    title: "Chat | Codeliver",
    description:
      "Browse for channels, check your new messages, and manage your chats on Codeliver here.",
    url: "https://codeliver.vercel.app/chat",
    siteName: "Codeliver",
    images: [
      {
        url: "/logo.png",
        width: 50,
        height: 50,
      },
    ],
    type: "website",
  },
};

async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/");
  const chatData = await prisma.chat.findMany({
    where: { users: { some: { id: session.user.id } }, isDirectMessage: false },
    include: {
      messages: { orderBy: { createdAt: "desc" } },
    },
  });
  const chats = chatData.sort(
    (a, b) =>
      a.messages[0]?.createdAt.getTime() - b.messages[0]?.createdAt.getTime(),
  );

  return (
    <div className="flex flex-1 px-6 py-10 flex-col gap-y-3">
      <h1 className="text-3xl font-extrabold text-blue-500 px-4">Channels</h1>
      {chats.length > 0 ? (
        <Channel chats={chats} userId={session.user.id} />
      ) : (
        <div>
          You&apos;re not in any channels yet...
          <Browse />
        </div>
      )}
    </div>
  );
}

export default Page;
