"use client";

import { useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 0,
    question: "Why should I use Codeliver instead of Slack or Discord?",
    answer:
      "You don't. Slack and Discord are both significantly better than Codeliver in basically every aspect about real-time chatting. But if you want to use or even self host something simple that's open source and specifically tailored to a developer's needs, Codeliver is a pretty good option.",
  },
  {
    id: 1,
    question: "Are my chat messages and data private?",
    answer:
      "Everything you send or upload on Codeliver is securely stored in the cloud/our backend database. Since this app is open source, you can also self host the app and control everything yourself by cloning the repository and setting up the Docker container services.",
  },
  {
    id: 2,
    question: "How do I try Codeliver?",
    answer:
      "You can try using Codeliver to send messages or code snippets right now by signing up for an account on the website and sending something in one of our public channels! Everything is completely free to use and easy to setup.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded overflow-hidden bg-gray-300 dark:bg-gray-900 w-full">
      {questions.map((question) => {
        return (
          <div
            key={question.id}
            className={`py-3 ${
              question.id === questions.length - 1
                ? ""
                : "border-b-2 border-b-gray-700"
            }`}
          >
            <div
              className="px-5 text-gray-700 dark:text-gray-300 font-bold cursor-pointer flex items-center gap-x-3"
              onClick={() => setOpen(open === question.id ? null : question.id)}
            >
              <FaCaretRight
                className={`${open === question.id ? "rotate-90" : ""} transition-transform!`}
                size={18}
              />
              {question.question}
            </div>
            <AnimatePresence>
              {open === question.id && (
                <motion.p
                  initial={{ height: 0, paddingTop: 0 }}
                  animate={{ height: "auto", paddingTop: "4px" }}
                  exit={{ height: 0, paddingTop: 0 }}
                  className="px-5 text-gray-700 dark:text-gray-300 overflow-hidden box-content"
                >
                  {question.answer}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default Faq;
