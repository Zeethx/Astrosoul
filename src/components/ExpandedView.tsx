// File: src/components/ExpandedView.tsx
"use client";

import { MoonLocalData } from "@/lib/moon";
import { Personality } from "@/lib/personality";

interface Recap { movies: string[]; songs: string[]; }

export default function ExpandedView({
  moon,
  personality,
  recap,
  loadingRecap,
  dateParam,
}: {
  moon: MoonLocalData | null;
  personality: Personality | null;
  recap: Recap | null;
  loadingRecap: boolean;
  dateParam: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Moon*/}
      <div className="bg-[#1f1f1f] rounded-xl p-8 shadow-xl space-y-4">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 flex items-center gap-2">
          🌙 Moon Phase 
        </h2>
        {moon && (
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="flex flex-col items-center">
              <div className="text-7xl">{moon.emoji}</div>
              <p className="mt-2 text-lg">
                <strong>{moon.phase}</strong> · {moon.illumination}
              </p>
              <p className="text-sm text-gray-400">Age: {moon.age}</p>
            </div>
            <div className="flex flex-col items-center">
            </div>
          </div>
        )}
      </div>

      {/* Personality */}
      <div className="bg-[#1f1f1f] rounded-xl p-8 shadow-xl space-y-4">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 flex items-center gap-2">
          🧬 Personality
        </h2>
        {personality && (
          <>
            <p className="text-2xl font-bold">{personality.type}</p>
            <p className="text-lg text-gray-300">{personality.description}</p>
          </>
        )}
      </div>

      {/* Year Recap */}
      <div className="bg-[#1f1f1f] rounded-xl p-8 shadow-xl space-y-4 md:col-span-2">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 flex items-center gap-2">
          🎞️ Year You Were Born ({new Date(dateParam).getFullYear()})
        </h2>
        {loadingRecap ? (
          <p className="text-gray-400">Loading recap...</p>
        ) : recap ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Top Movies</h3>
              <ul className="list-disc list-inside space-y-1">
                {recap.movies.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Top Songs (US)</h3>
              {recap.songs.length ? (
                <ul className="list-disc list-inside space-y-1">
                  {recap.songs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No songs found for that year.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {/* Moodboard */}
      <div className="bg-[#1f1f1f] rounded-xl p-8 shadow-xl space-y-4 md:col-span-2">
        <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 flex items-center gap-2">
          🎨 Aesthetic Moodboard
        </h2>
        <div className="flex gap-4 mt-4">
          {personality?.colors.map((c) => (
            <div
              key={c}
              className="w-16 h-16 rounded-lg"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
