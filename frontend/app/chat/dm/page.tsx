import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BrowseDirect from "@/components/chat/BrowseDirect";
import Direct from "@/components/home/Direct";

async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/");
  const chatData = await prisma.chat.findMany({
    where: { users: { some: { id: session.user.id } }, isDirectMessage: true },
    include: {
      users: true,
      messages: { orderBy: { createdAt: "desc" } },
    },
  });
  const directs = chatData.sort(
    (a, b) =>
      a.messages[0]?.createdAt.getTime() - b.messages[0]?.createdAt.getTime(),
  );

  return (
    <div className="flex flex-1 px-6 py-10 flex-col gap-y-3">
      <h1 className="text-3xl font-extrabold text-blue-500 px-4">
        Direct messages
      </h1>
      {directs.length > 0 ? (
        <Direct chats={directs} userId={session.user.id} />
      ) : (
        <div>
          You don&apos;t have any direct messages yet...
          <BrowseDirect />
        </div>
      )}
    </div>
  );
}

export default Page;
