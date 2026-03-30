"use client";

import { useState } from "react";
import { getQuestions, calculateResults, type Answer, type QuizResult } from "@/lib/quiz";
import QuestionCard from "@/components/quiz/QuestionCard";
import ResultCard from "@/components/quiz/ResultCard";

export default function QuizPage() {
  const questions = getQuestions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (value: number) => {
    const newAnswers = answers.filter((a) => a.questionId !== currentQuestion.id);
    setAnswers([...newAnswers, { questionId: currentQuestion.id, value }]);

    // 选择后自动跳转到下一题
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
      }, 300); // 添加小延迟让用户看到选择效果
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsCalculating(true);
    const quizResult = calculateResults(answers);
    setResult(quizResult);
    setTimeout(() => {
      setIsCalculating(false);
      setShowResult(true);
    }, 3000);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  if (isCalculating) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 px-4 py-8 sm:px-6 sm:py-12">
        <main className="w-full max-w-xl text-center">
          <div className="mb-10">
            <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />
            <h2 className="text-xl font-semibold text-slate-800">正在分析你的交易心理...</h2>
            <p className="mt-2 text-sm text-slate-500">这可能需要几秒钟</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400" />
              分析答题模式
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:200ms]" />
              评估认知偏差
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-400 [animation-delay:400ms]" />
              生成个性化报告
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 px-4 py-8 sm:px-6 sm:py-12">
        <main className="w-full max-w-xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              测评结果
            </h1>
            <p className="mt-2 text-base text-slate-600">
              你的交易心理画像
            </p>
          </div>

          <ResultCard result={result} />

          <div className="mt-8 text-center">
            <button
              onClick={handleRestart}
              className="rounded-full border-2 border-slate-300 bg-white px-8 py-3 font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
            >
              重新测评
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <main className="w-full max-w-xl">
        {/* 进度区域 */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-600">
              第 {currentIndex + 1} / {questions.length} 题
            </span>
            <span className="font-medium text-slate-700">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-700 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <QuestionCard
          question={currentQuestion}
          selectedValue={currentAnswer?.value ?? null}
          onSelect={handleSelect}
        />

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 font-medium text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            上一题
          </button>

          {currentIndex === questions.length - 1 && currentAnswer && (
            <button
              onClick={handleSubmit}
              className="rounded-xl bg-slate-700 px-8 py-3.5 font-medium text-white transition-all hover:bg-slate-800"
            >
              查看结果
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
