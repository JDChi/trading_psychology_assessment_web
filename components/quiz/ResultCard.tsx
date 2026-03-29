"use client";

interface Score {
  cognitive: number;
  emotion: number;
  habit: number;
}

interface Profile {
  id: string;
  name: string;
  tags: string[];
  descriptions: string[];
  suggestions: string[];
}

interface QuizResult {
  profile: Profile;
  scores: Score;
}

interface ResultCardProps {
  result: QuizResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const { profile, scores } = result;

  return (
    <div className="space-y-5">
      {/* 主结果卡片 */}
      <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
        {/* 标题区 */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>
          <p className="mt-1 text-sm text-slate-500">交易心理特征分析</p>
        </div>

        {/* 标签 */}
        <div className="mb-6 flex flex-wrap gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 描述 */}
        <div className="mb-6 space-y-4">
          {profile.descriptions.map((desc, index) => (
            <p key={index} className="leading-relaxed text-slate-600">
              {desc}
            </p>
          ))}
        </div>

        {/* 建议区域 */}
        <div className="rounded-xl bg-slate-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="font-medium text-slate-800">改进建议</p>
          </div>
          <ul className="space-y-3">
            {profile.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 维度得分卡片 */}
      <div className="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-8">
        <p className="mb-6 text-sm font-medium uppercase tracking-wide text-slate-500">综合评分</p>
        <div className="grid grid-cols-3 gap-4">
          <DimensionCircle label="认知模式" score={scores.cognitive} />
          <DimensionCircle label="情绪管理" score={scores.emotion} />
          <DimensionCircle label="交易习惯" score={scores.habit} />
        </div>
      </div>
    </div>
  );
}

function DimensionCircle({ label, score }: { label: string; score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 70) return "#1e3a5f";
    if (score >= 40) return "#64748b";
    return "#94a3b8";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-24 w-24">
        <svg className="h-24 w-24 -rotate-90 transform" viewBox="0 0 96 96">
          {/* 背景圆环 */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="#f1f5f9"
            strokeWidth="8"
            fill="none"
          />
          {/* 进度圆环 */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={getColor(score)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-slate-800">{score}</span>
        </div>
      </div>
      <p className="mt-2 text-center text-sm text-slate-600">{label}</p>
    </div>
  );
}
