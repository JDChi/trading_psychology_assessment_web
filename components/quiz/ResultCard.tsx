interface Result {
  dimension: string;
  score: number;
  level: string;
  description: string;
  suggestion: string;
}

interface ResultCardProps {
  result: Result;
}

export default function ResultCard({ result }: ResultCardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-zinc-900">{result.dimension}</h3>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700">
          {result.level}
        </span>
      </div>
      <div className="mb-4">
        <div className="h-2 w-full rounded-full bg-zinc-100">
          <div
            className="h-2 rounded-full bg-zinc-900"
            style={{ width: `${result.score}%` }}
          />
        </div>
      </div>
      <p className="mb-4 text-zinc-600">{result.description}</p>
      <div className="rounded-lg bg-zinc-50 p-4">
        <p className="text-sm font-medium text-zinc-900">建议</p>
        <p className="mt-1 text-sm text-zinc-600">{result.suggestion}</p>
      </div>
    </div>
  );
}
