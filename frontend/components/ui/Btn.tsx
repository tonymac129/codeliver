"use client";

import Link from "next/link";

const btnStyles = "px-4 py-2 rounded font-bold text-gray-300 cursor-pointer ";

interface BtnProps {
  text: string;
  link?: string;
  onclick?: () => void;
  primary?: boolean;
}

function Btn({ text, link, onclick, primary }: BtnProps) {
  return link ? (
    <Link
      href={link}
      className={
        btnStyles +
        (primary
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-700 hover:bg-gray-800")
      }
    >
      {text}
    </Link>
  ) : (
    <button
      onClick={onclick}
      className={
        btnStyles +
        (primary
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-700 hover:bg-gray-800")
      }
    >
      {text}
    </button>
  );
}

export default Btn;
