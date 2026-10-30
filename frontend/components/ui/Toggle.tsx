"use client";

import { FaCheck } from "react-icons/fa6";

interface ToggleProps {
  text: string;
  checked?: boolean;
  setChecked: (val: boolean) => void;
}

function Toggle({ text, checked, setChecked }: ToggleProps) {
  return (
    <label
      className="flex gap-x-3 items-center cursor-pointer w-fit"
      title="Only people you invite can join and message in the channel"
    >
      <input
        type="checkbox"
        checked={checked || false}
        onChange={(e) => setChecked(e.target.checked)}
        className="hidden"
      />
      <div
        className={`${checked ? "bg-blue-200 dark:bg-blue-950" : "bg-gray-300 dark:bg-gray-900"} h-6 rounded-full relative px-1 flex items-center w-11`}
      >
        <div
          className={`${checked ? "bg-blue-500 translate-x-5" : "bg-gray-700"} w-4 h-4 rounded-full transition-all! flex items-center justify-center text-black dark:text-white`}
        >
          <FaCheck
            size={11}
            className={`${checked ? "opacity-100" : "opacity-0"} transition-opacity!`}
          />
        </div>
      </div>
      {text}
    </label>
  );
}

export default Toggle;
