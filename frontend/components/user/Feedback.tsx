"use client";

import type { FeedbackType } from "@/types/User";
import { useState } from "react";
import { labelStyles } from "@/lib/constants";
import { submitFeedback } from "@/app/(user)/actions";
import Input from "../ui/Input";
import Textarea from "../ui/Textarea";
import Btn from "../ui/Btn";
import Toggle from "../ui/Toggle";
import Dropdown from "../ui/Dropdown";

const types = ["General", "Message", "Bug", "Feedback", "Other"];
const emptyFeedback = {
  title: "",
  description: "",
  anonymous: false,
};

function Feedback({ defaultType }: { defaultType?: string }) {
  const [feedback, setFeedback] = useState<FeedbackType>(emptyFeedback);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);

  async function handleSubmit() {
    if (!feedback.type) {
      setError("Please select a type");
    } else if (feedback.title.trim().length === 0) {
      setError("Please enter a title");
    } else if (feedback.description.trim().length === 0) {
      setError("Please enter a description");
    } else {
      setError(null);
      setLoading(true);
      await submitFeedback(feedback);
      setFeedback(emptyFeedback);
      setLoading(false);
      setTimeout(() => {
        setLoading(null);
      }, 2000);
    }
  }

  return (
    <div className="flex flex-col gap-y-3">
      {defaultType && (
        <h2 className="text-2xl font-bold text-blue-500">Report message</h2>
      )}
      <label className={labelStyles}>
        <div>
          Type<span className="text-red-500">*</span>
        </div>
        <Dropdown
          value={feedback.type || defaultType}
          setValue={(type) => setFeedback({ ...feedback, type })}
          options={types}
          label="Feedback type"
        />
      </label>
      <label className={labelStyles}>
        <div>
          Title<span className="text-red-500">*</span>
        </div>
        <Input
          placeholder="Codeliver is awesome"
          value={feedback.title}
          setValue={(title) => setFeedback({ ...feedback, title })}
        />
      </label>
      <label className={labelStyles}>
        <div>
          Description<span className="text-red-500">*</span>
        </div>
        <Textarea
          placeholder="Put more information about your feedback here"
          value={feedback.description}
          setValue={(description) => setFeedback({ ...feedback, description })}
        />
      </label>
      <Toggle
        text="Anonymous"
        checked={feedback.anonymous}
        setChecked={(anonymous) => setFeedback({ ...feedback, anonymous })}
      />
      {error && <div className="text-sm text-red-500">{error}</div>}
      <Btn
        text={
          loading
            ? "Submitting..."
            : loading === false
              ? "Submitted!"
              : "Submit"
        }
        onclick={handleSubmit}
        styles="w-fit"
        primary
      />
    </div>
  );
}

export default Feedback;
