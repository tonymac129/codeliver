"use client";

import { useRef, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

interface InputProps {
  placeholder: string;
  value: string;
  setValue: (v: string) => void;
  type?: string;
  styles?: string;
  clear?: boolean | (() => void);
  focused?: boolean;
}

function Input({
  placeholder,
  value,
  setValue,
  type,
  styles,
  clear,
  focused,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClear() {
    setValue("");
    inputRef.current?.focus();
    if (typeof clear === "function") {
      clear();
    }
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, [focused]);

  return (
    <div
      className={
        "bg-gray-900 rounded px-4 py-2 text-gray-300 relative flex items-center " +
        styles
      }
    >
      <input
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        ref={inputRef}
        className={`outline-none text-base ${clear ? "w-[calc(100%-20px)]" : "w-full"}`}
      />
      {clear && (
        <FaXmark
          size={20}
          title="Clear"
          onClick={handleClear}
          className={`right-2 cursor-pointer ${value.trim().length > 0 ? "absolute" : "hidden"}`}
        />
      )}
    </div>
  );
}

export default Input;
