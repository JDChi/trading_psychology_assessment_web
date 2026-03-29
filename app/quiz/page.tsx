export default function QuizPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 px-6 py-12">
      <main className="w-full max-w-xl text-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900">
          股票交易心理测评
        </h1>
        <p className="text-lg text-zinc-600">
          测评题目正在准备中...
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          请稍后再来，或联系管理员
        </p>
      </main>
    </div>
  );
}
