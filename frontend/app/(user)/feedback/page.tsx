import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Submit Feedback | Codeliver",
  description:
    "Submit feedback on how to improve Codeliver or report users/messages here!",
  authors: [{ name: "Codeliver", url: "https://codeliver.vercel.app" }],
  openGraph: {
    title: "Submit Feedback | Codeliver",
    description:
      "Submit feedback on how to improve Codeliver or report users/messages here!",
    url: "https://codeliver.vercel.app/feedback",
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
      <h1 className="text-3xl text-blue-500 font-extrabold">Submit feedback</h1>
    </div>
  );
}

export default Page;
