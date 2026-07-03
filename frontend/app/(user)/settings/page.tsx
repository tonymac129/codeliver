import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Chat Settings | Codeliver",
  description:
    "Manage your chat behavior, user settings, and other preferences on Codeliver here.",
  authors: [{ name: "Codeliver", url: "https://codeliver.vercel.app" }],
  openGraph: {
    title: "Chat Settings | Codeliver",
    description:
      "Manage your chat behavior, user settings, and other preferences on Codeliver here.",
    url: "https://codeliver.vercel.app/settings",
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
  if (!session) redirect("/login");

  return (
    <div className="flex-1 py-10 overflow-auto">
      <h1 className="text-3xl text-blue-500 font-extrabold">Chat settings</h1>
    </div>
  );
}

export default Page;
