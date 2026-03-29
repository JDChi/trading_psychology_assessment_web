import type { QuizResult } from "@/lib/quiz";

interface ResultCardProps {
  result: QuizResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const { profile, scores } = result;

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-zinc-900">{profile.name}</h2>
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-6 space-y-3">
          {profile.descriptions.map((desc, index) => (
            <p key={index} className="text-zinc-600">
              {desc}
            </p>
          ))}
        </div>

        <div className="rounded-lg bg-zinc-50 p-4">
          <p className="mb-2 font-medium text-zinc-900">建议</p>
          <ul className="space-y-2">
            {profile.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-zinc-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="mb-4 text-sm font-medium text-zinc-500">各维度得分</p>
        <div className="space-y-3">
          <DimensionBar label="认知模式" score={scores.cognitive} />
          <DimensionBar label="情绪管理" score={scores.emotion} />
          <DimensionBar label="交易习惯" score={scores.habit} />
        </div>
      </div>
    </div>
  );
}

function DimensionBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-zinc-600">{label}</span>
        <span className="font-medium text-zinc-900">{score}分</span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-100">
        <div
          className="h-2 rounded-full bg-zinc-900 transition-all"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
