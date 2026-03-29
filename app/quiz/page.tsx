"use client";

import { useState, useEffect } from "react";
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
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-50 to-zinc-100 px-4 py-8 sm:px-6 sm:py-12">
        <main className="w-full max-w-xl text-center">
          <div className="mb-8">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-zinc-200 border-t-zinc-900" />
            <h2 className="text-xl font-medium text-zinc-900">正在分析你的交易心理...</h2>
            <p className="mt-2 text-sm text-zinc-500">这可能需要几秒钟</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400" />
              分析答题模式
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400 [animation-delay:200ms]" />
              评估认知偏差
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-zinc-400 [animation-delay:400ms]" />
              生成个性化报告
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (showResult && result) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-zinc-50 to-zinc-100 px-4 py-8 sm:px-6 sm:py-12">
        <main className="w-full max-w-xl">
          <h1 className="mb-2 text-center text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            测评结果
          </h1>
          <p className="mb-8 text-center text-base sm:text-lg text-zinc-600">
            你的交易心理特征
          </p>

          <ResultCard result={result} />

          <div className="mt-8 text-center">
            <button
              onClick={handleRestart}
              className="rounded-full border border-zinc-300 bg-white px-6 py-3 font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              重新测评
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-zinc-50 to-zinc-100 px-4 py-8 sm:px-6 sm:py-12">
      <main className="w-full max-w-xl">
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-zinc-500">
            <span>
              第 {currentIndex + 1} / {questions.length} 题
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-zinc-200">
            <div
              className="h-2 rounded-full bg-zinc-900 transition-all duration-300"
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
            className="order-2 sm:order-1 rounded-full border border-zinc-300 bg-white px-6 py-3.5 font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            上一题
          </button>

          {currentIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!currentAnswer}
              className="order-1 sm:order-2 rounded-full bg-zinc-900 px-8 py-3.5 font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              查看结果
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!currentAnswer}
              className="order-1 sm:order-2 rounded-full bg-zinc-900 px-8 py-3.5 font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              下一题
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
