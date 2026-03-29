"use client";

interface Question {
  id: string;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

interface QuestionCardProps {
  question: Question;
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

export default function QuestionCard({
  question,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-medium text-zinc-900">
        {question.text}
      </h3>
      <div className="flex flex-col gap-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`rounded-lg border px-4 py-3 text-left transition-colors ${
              selectedValue === option.value
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
