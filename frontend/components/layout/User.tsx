import type { User as UserType } from "better-auth";
import Link from "next/link";
import Image from "next/image";

function User({ user }: { user: UserType }) {
  return (
    <Link href="/profile">
      <Image
        src={user.image || "/avatar.svg"}
        alt="Avatar"
        width={40}
        height={40}
        className="rounded-full border-2 border-gray-700"
      />
    </Link>
  );
}

export default User;
