"use client";

import Link from "next/link";

const btnStyles = " px-4 py-2 rounded font-bold text-gray-300 cursor-pointer ";

interface BtnProps {
  text: string;
  link?: string;
  onclick?: () => void;
  primary?: boolean;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  styles?: string;
}

function Btn({
  text,
  link,
  onclick,
  primary,
  children,
  type,
  styles,
}: BtnProps) {
  return link ? (
    <Link
      href={link}
      className={
        styles +
        btnStyles +
        (primary
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-700 hover:bg-gray-800")
      }
    >
      {children}
      {text}
    </Link>
  ) : (
    <button
      type={type || "button"}
      onClick={onclick}
      className={
        styles +
        btnStyles +
        (primary
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-700 hover:bg-gray-800")
      }
    >
      {children}
      {text}
    </button>
  );
}

export default Btn;
