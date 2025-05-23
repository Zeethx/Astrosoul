"use client";

import { useEffect, useState } from "react";
import { useQuiz } from "@/context/QuizContext";
import { getLocalMoonData, MoonLocalData } from "@/lib/moon";
import { computePersonalityFromAnswers, Personality } from "@/lib/personality";
import CompactCard from "@/components/CompactCard";
import ExpandedView from "@/components/ExpandedView";

interface Recap {
  movies: string[];
  songs: string[];
}

export default function ResultPage() {
  const { name, date, answers } = useQuiz();
  const [moon, setMoon] = useState<MoonLocalData | null>(null);
  const [recap, setRecap] = useState<Recap | null>(null);
  const [loadingRecap, setLoadingRecap] = useState(false);
  const [personality, setPersonality] = useState<Personality | null>(null);
  const [compact, setCompact] = useState(false);

  // Compute moon,  personality
  useEffect(() => {
    if (!date) return;
    const bd = new Date(date);
    setMoon(getLocalMoonData(bd));
    setPersonality(computePersonalityFromAnswers(answers));
  }, [date, answers]);

  // Fetch year recap
  useEffect(() => {
    if (!date) return;
    const year = new Date(date).getFullYear().toString();
    setLoadingRecap(true);
    fetch(`/api/recap?year=${year}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setRecap(data as Recap);
      })
      .catch(console.error)
      .finally(() => setLoadingRecap(false));
  }, [date]);

  // If user somehow lands here with no quiz data:
  if (!name || !date || answers.length === 0) {
    return (
      <main className="min-h-screen text-white flex items-center justify-center">
        <p>
          No quiz data found.{" "}
          <a href="/quiz" className="underline">
            Start over?
          </a>
        </p>
      </main>
    );
  }

  return (
    <main className="text-white min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Your Cosmic Identity</h1>
          <button
            onClick={() => setCompact((c) => !c)}
            className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-1 rounded"
          >
            {compact ? "Expanded View" : "Compact View"}
          </button>
        </div>

        {compact && moon && personality && recap ? (
          <CompactCard
            moon={moon}
            personality={personality}
            recap={recap}
          />
        ) : (
          <ExpandedView
            moon={moon}
            personality={personality}
            recap={recap}
            loadingRecap={loadingRecap}
            dateParam={date}
          />
        )}
      </div>
    </main>
  );
}
