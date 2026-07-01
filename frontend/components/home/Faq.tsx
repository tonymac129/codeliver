"use client";

import { useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: 0,
    question: "Question 1",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quasi sint accusantium quae laudantium similique eos est nesciunt minus iure iusto hic quos, laboriosam molestiae aspernatur alias? Accusantium, tenetur aliquid.",
  },
  {
    id: 1,
    question: "Question 2",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quasi sint accusantium quae laudantium similique eos est nesciunt minus iure iusto hic quos, laboriosam molestiae aspernatur alias? Accusantium, tenetur aliquid.",
  },
  {
    id: 2,
    question: "Question 3",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quasi sint accusantium quae laudantium similique eos est nesciunt minus iure iusto hic quos, laboriosam molestiae aspernatur alias? Accusantium, tenetur aliquid.",
  },
  {
    id: 3,
    question: "Question 4",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quasi sint accusantium quae laudantium similique eos est nesciunt minus iure iusto hic quos, laboriosam molestiae aspernatur alias? Accusantium, tenetur aliquid.",
  },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded overflow-hidden bg-gray-900 w-full">
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
              className="px-5 text-gray-300 font-bold cursor-pointer flex items-center gap-x-3"
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
                  className="px-5 text-gray-300 overflow-hidden box-content"
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
