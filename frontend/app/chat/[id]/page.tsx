import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Messages from "./Messages";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  const existingChat = await prisma.chat.findUnique({
    where: { id },
    include: { messages: true },
  });
  if (!existingChat) redirect("/chat");

  return (
    <div className="flex-1">
      <Messages
        messages={existingChat.messages}
        userId={session!.user.id}
        chatId={id}
      />
    </div>
  );
}

export default Page;
