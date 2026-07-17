"use client";

import Btn from "../ui/Btn";

interface WarningProps {
  children: React.ReactNode;
  title: string;
  loading: boolean;
  confirm: () => void;
  cancel: () => void;
}

function Warning({ children, title, loading, confirm, cancel }: WarningProps) {
  return (
    <>
      <h2 className="text-xl text-white font-bold">{title}</h2>
      {children}
      <div className="flex gap-x-3">
        <Btn
          text={loading ? "Loading..." : "Confirm"}
          onclick={confirm}
          styles="bg-red-500 hover:bg-red-600"
          primary
        />
        <Btn text="Cancel" onclick={cancel} />
      </div>
    </>
  );
}

export default Warning;
