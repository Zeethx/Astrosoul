// src/api/moon.ts
export interface MoonData {
  date: string;
  moon: string;          // emoji
  phase: string;         // e.g. "Waning Crescent"
  illumination: string;  // e.g. "17.4%"
  age: string;           // e.g. "26.6"     // e.g. "Gemini"
}

export async function getMoonData(date: string): Promise<MoonData> {
  const res = await fetch(`https://moon-api.com/moon?date=${date}`);
  if (!res.ok) {
    throw new Error(`Moon-API error: ${res.status}`);
  }
  return (await res.json()) as MoonData;
}
