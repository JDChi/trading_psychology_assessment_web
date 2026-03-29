export interface Answer {
  questionId: string;
  value: number;
}

export interface Result {
  dimension: string;
  score: number;
  level: string;
  description: string;
  suggestion: string;
}

/**
 * 计算测评结果
 * 等书籍内容确定后实现具体逻辑
 */
export function calculateResults(answers: Answer[]): Result[] {
  // TODO: 实现具体评分逻辑
  return [];
}

/**
 * 根据分值获取等级描述
 */
export function getScoreLevel(score: number): string {
  if (score >= 80) return "极高";
  if (score >= 60) return "较高";
  if (score >= 40) return "中等";
  if (score >= 20) return "较低";
  return "极低";
}
