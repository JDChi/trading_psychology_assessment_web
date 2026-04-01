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
    <div className="rounded-2xl bg-white p-4 shadow-md shadow-slate-200/50 sm:p-6">
      <h3 className="mb-4 text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
        {question.text}
      </h3>
      <div className="flex flex-col gap-2">
        {question.options.map((option, index) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.value}
              onClick={() => onSelect(option.value)}
              className={`
                group relative rounded-xl border-2 px-4 py-3 text-left text-[clamp(0.8rem,2.5vw,0.95rem)] transition-all duration-200 sm:px-5 sm:py-3
                ${
                  isSelected
                    ? "border-slate-700 bg-slate-800 text-white"
                    : "border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                }
              `}
            >
              <span className="mr-2 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-medium sm:mr-3 sm:h-6 sm:w-6">
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
