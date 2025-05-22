import personalities from "@/data/personalities.json";

export interface Personality {
  type: string;
  description: string;
  colors: string[];
}

/**
 * From the list of answers, pick the personality whose keywords
 * match most frequently. Fallback to the last entry if no matches.
 */
export function computePersonalityFromAnswers(
  answers: string[]
): Personality {
  let best = personalities[personalities.length - 1];
  let bestScore = 0;

  for (const p of personalities) {
    const matchCount = p.keywords.filter(
      (kw: string) => answers.some((a) => a.toLowerCase() === kw.toLowerCase())
    ).length;
    const percentage = p.keywords.length > 0 ? matchCount / p.keywords.length : 0;
    if (percentage > bestScore) {
      bestScore = percentage;
      best = p;
    }
  }

  return {
    type: best.type,
    description: best.description,
    colors: best.colors,
  };
}
