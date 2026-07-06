import type { MessageType } from "@/types/Chat";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Messages from "./Messages";

const messages: MessageType[] = [
  {
    id: "string",
    from: "string",
    message: "string",
    createdAt: new Date(),
    reactions: [
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
    ],
  },
  {
    id: "string2",
    from: "string",
    message: "string",
    createdAt: new Date("7/5/2024 00:10"),
    reactions: [
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
    ],
  },
  {
    id: "string3",
    from: "string",
    message: "string",
    createdAt: new Date("7/4/2026 00:30"),
    reactions: [
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
    ],
  },
  {
    id: "string4",
    from: "string",
    message: "string",
    createdAt: new Date(),
    reactions: [
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
    ],
  },
  {
    id: "string5s",
    from: "string",
    message: "string",
    createdAt: new Date(),
    reactions: [
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
      { emoji: "😭", reacted: ["123"] },
    ],
  },
];

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex-1">
      <Messages messages={messages} userId={session!.user.id} chatId={id} />
    </div>
  );
}

export default Page;
