import Link from "next/link";

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
