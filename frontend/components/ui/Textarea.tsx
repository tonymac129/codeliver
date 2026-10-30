"use client";

interface TextareaProps {
  placeholder: string;
  value: string;
  setValue: (v: string) => void;
  styles?: string;
}

function Textarea({ placeholder, value, setValue, styles }: TextareaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={`bg-gray-300 dark:bg-gray-900 rounded px-4 py-2 text-gray-700 dark:text-gray-300 relative flex items-center outline-none resize-y min-h-20 h-25 text-base ${styles}`}
    />
  );
}

export default Textarea;
