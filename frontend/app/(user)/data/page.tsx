import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Data Control | Codeliver",
  description:
    "Import/export your user data on Codeliver, manage your account, and control your privacy.",
  authors: [{ name: "Codeliver", url: "https://codeliver.vercel.app" }],
  openGraph: {
    title: "Data Control | Codeliver",
    description:
      "Import/export your user data on Codeliver, manage your account, and control your privacy.",
    url: "https://codeliver.vercel.app/data",
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
      <h1 className="text-3xl text-blue-500 font-extrabold">Data control</h1>
    </div>
  );
}

export default Page;
