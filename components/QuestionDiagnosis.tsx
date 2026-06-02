"use client";

import { useState } from "react";
import { QuestionAnswer } from "@/types";
import { questions } from "@/lib/questions";

interface Props {
  onComplete: (answers: QuestionAnswer[]) => void;
}

const categoryColors: Record<string, string> = {
  highNote: "bg-purple-100 text-purple-700",
  breath: "bg-blue-100 text-blue-700",
  volume: "bg-orange-100 text-orange-700",
  pitch: "bg-green-100 text-green-700",
  rhythm: "bg-pink-100 text-pink-700",
  expression: "bg-yellow-100 text-yellow-700",
};

export default function QuestionDiagnosis({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;

  const handleSelect = (value: number) => {
    setSelected(value);
  };

  const handleNext = () => {
    if (selected === null) return;

    const newAnswer: QuestionAnswer = {
      questionId: question.id,
      answer: question.options.find((o) => o.value === selected)?.label || "",
      score: selected,
    };

    const newAnswers = [...answers, newAnswer];

    if (isLast) {
      onComplete(newAnswers);
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setAnswers(newAnswers);
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-[#f8f7ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-[#6c4fc0]">STEP 1 / 3</p>
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-800">{currentIndex + 1}</span> / {questions.length}
            </p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full progress-bar"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #6c4fc0, #c084fc)",
              }}
            />
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">質問診断</p>
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        <div
          className={`bg-white rounded-3xl p-6 card-shadow-lg transition-opacity duration-200 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Category badge */}
          <span
            className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${
              categoryColors[question.category]
            }`}
          >
            {question.categoryLabel}
          </span>

          {/* Question */}
          <p className="text-lg font-semibold text-gray-800 leading-relaxed mb-6">
            {question.text}
          </p>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-150 ${
                  selected === option.value
                    ? "border-[#6c4fc0] bg-[#f0eaff] text-[#6c4fc0] font-semibold"
                    : "border-gray-100 bg-gray-50 text-gray-700 hover:border-[#c4b5fd] hover:bg-[#faf8ff]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selected === option.value
                        ? "border-[#6c4fc0] bg-[#6c4fc0]"
                        : "border-gray-300"
                    }`}
                  >
                    {selected === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span>{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next button */}
        <div className="mt-6">
          <button
            onClick={handleNext}
            disabled={selected === null}
            className="btn-primary w-full py-4 disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            {isLast ? "音声診断へ進む" : "次の質問へ"}
          </button>
        </div>
      </div>
    </div>
  );
}
