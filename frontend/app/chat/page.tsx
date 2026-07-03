import type { Metadata } from "next";
import Link from "next/link";

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

function Page() {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-10">
      <h1 className="text-3xl text-blue-500 font-extrabold">Chat</h1>
      <p className="text-gray-300 text-center w-[50%]">
        Select a channel or direct message on the left sidebar to start
        chatting, sharing code, and collaborating!
      </p>
      <Link href="/chat/1" className="text-blue-500 hover:underline">
        Channel 1
      </Link>
    </div>
  );
}

export default Page;
