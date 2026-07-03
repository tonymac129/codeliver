import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Form from "@/components/profile/Form";

async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");
  const userData = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!userData) redirect("/login");

  return (
    <div className="flex-1 py-10 overflow-auto">
      <h1 className="text-3xl text-blue-500 font-extrabold">Your profile</h1>
      <Form userData={userData} />
    </div>
  );
}

export default Page;
