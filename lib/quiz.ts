import questionsData from "@/data/questions.json";
import resultsData from "@/data/results.json";

export interface Answer {
  questionId: string;
  value: number;
}

export interface Question {
  id: string;
  dimension: "cognitive" | "emotion" | "habit";
  text: string;
  options: { value: number; label: string }[];
}

export interface Profile {
  id: string;
  name: string;
  tags: string[];
  descriptions: string[];
  suggestions: string[];
}

export interface QuizResult {
  profile: Profile;
  scores: {
    cognitive: number;
    emotion: number;
    habit: number;
  };
}

const questions = questionsData.questions as Question[];
const profiles = resultsData.profiles as Profile[];

export function getQuestions(): Question[] {
  return questions;
}

export function getProfiles(): Profile[] {
  return profiles;
}

function calculateDimensionScore(answers: Answer[], dimension: string): number {
  const dimensionQuestions = questions.filter((q) => q.dimension === dimension);
  let totalScore = 0;
  let maxScore = 0;

  dimensionQuestions.forEach((q) => {
    const answer = answers.find((a) => a.questionId === q.id);
    if (answer) {
      totalScore += answer.value;
    }
    maxScore += Math.max(...q.options.map((o) => o.value));
  });

  return Math.round((totalScore / maxScore) * 100);
}

export function calculateResults(answers: Answer[]): QuizResult {
  const scores = {
    cognitive: calculateDimensionScore(answers, "cognitive"),
    emotion: calculateDimensionScore(answers, "emotion"),
    habit: calculateDimensionScore(answers, "habit"),
  };

  // 根据分数决定性格：分数越低问题越大
  const avgScore = (scores.cognitive + scores.emotion + scores.habit) / 3;

  let matchedProfile: Profile;

  if (avgScore >= 70) {
    matchedProfile = profiles.find((p) => p.id === "balanced")!;
  } else if (scores.cognitive <= scores.emotion && scores.cognitive <= scores.habit) {
    matchedProfile = profiles.find((p) => p.id === "representativeness")!;
  } else if (scores.emotion <= scores.cognitive && scores.emotion <= scores.habit) {
    matchedProfile = profiles.find((p) => p.id === "emotional_hijack")!;
  } else if (scores.habit <= scores.cognitive && scores.habit <= scores.emotion) {
    matchedProfile = profiles.find((p) => p.id === "loss_aversion")!;
  } else if (avgScore < 40) {
    matchedProfile = profiles.find((p) => p.id === "impulsive")!;
  } else if (scores.habit < 50) {
    matchedProfile = profiles.find((p) => p.id === "disposition_effect")!;
  } else {
    matchedProfile = profiles.find((p) => p.id === "herd")!;
  }

  return {
    profile: matchedProfile,
    scores,
  };
}
