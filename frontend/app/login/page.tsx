import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Form from "@/components/auth/Form";

async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) redirect("/chat");

  return (
    <div>
      <div className="flex flex-col gap-y-5 items-center py-10">
        <h1 className="text-4xl font-extrabold text-center text-blue-600">
          Log in
        </h1>
        <p className="text-gray-300 w-[50%] text-center">
          Log in to Codeliver or create an account here using this form!
        </p>
      </div>
      <Form />
    </div>
  );
}

export default Page;
