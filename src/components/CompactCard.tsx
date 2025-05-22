// File: src/components/CompactCard.tsx
"use client";

import { MoonLocalData } from "@/lib/moon";
import { Personality } from "@/lib/personality";

interface Recap { movies: string[]; songs: string[]; }

export default function CompactCard({
  moon,
  personality,
  recap,
}: {
  moon: MoonLocalData;
  personality: Personality;
  recap: Recap;
}) {
  return (
    <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 max-w-xs mx-auto space-y-3 text-center shadow-lg">
      <div className="text-5xl">{moon.emoji}</div>
      <p className="text-sm">
        <strong>{moon.phase}</strong> · {moon.illumination}
      </p>
      <p className="text-xs text-gray-400">Age: {moon.age}</p>

      <p className="text-lg font-semibold mt-2">{personality.type}</p>
      <p className="text-xs">{personality.description}</p>

      <div className="text-left text-xs mt-2 space-y-1">
        <p className="font-medium">Movies:</p>
        {recap.movies.map((m) => (
          <p key={m}>• {m}</p>
        ))}
        <p className="font-medium mt-2">Songs:</p>
        {recap.songs.length ? (
          recap.songs.map((s) => <p key={s}>• {s}</p>)
        ) : (
          <p>No songs found.</p>
        )}
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {personality.colors.map((c) => (
          <div key={c} className="w-8 h-8 rounded" style={{ backgroundColor: c }} />
        ))}
      </div>
    </div>
  );
}
