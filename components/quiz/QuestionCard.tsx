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
    <div className="rounded-2xl bg-white p-6 shadow-md shadow-slate-200/50 sm:p-8">
      <h3 className="mb-6 text-lg font-medium leading-relaxed text-slate-800">
        {question.text}
      </h3>
      <div className="flex flex-col gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`
                group relative rounded-xl border-2 px-5 py-4 text-left transition-all duration-200
                ${
                  isSelected
                    ? "border-slate-700 bg-slate-800 text-white"
                    : "border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                }
              `}
            >
              <span className="mr-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                {String.fromCharCode(65 + index)}
              </span>
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
