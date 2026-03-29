import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 px-6 py-12">
      <main className="w-full max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900">
          股票交易心理测评
        </h1>
        <p className="mb-8 text-lg text-zinc-600">
          了解你的交易心理特征，发现优势与盲点
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/quiz"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 px-6 text-white transition-colors hover:bg-zinc-800"
          >
            开始测评（¥1）
          </Link>
          <Link
            href="/ai-chat"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-6 text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            AI 对话测评
          </Link>
        </div>

        <p className="mt-12 text-sm text-zinc-500">
          测评约 5-10 分钟，基于经典心理学理论
        </p>
      </main>
    </div>
  );
}
