// src/lib/moon.ts
import SunCalc from "suncalc";

export interface MoonLocalData {
  emoji: string;
  phase: string;
  illumination: string;
  age: string;
}

/**
 * Given a JavaScript Date, returns:
 *  - emoji: one of 🌑🌒🌓🌔🌕🌖🌗🌘
 *  - phase: descriptive name
 *  - illumination: percent string
 *  - age: days since new moon (string)
 */
export function getLocalMoonData(date: Date): MoonLocalData {
  const { fraction, phase } = SunCalc.getMoonIllumination(date);

  // Map phase (0→1) to one of eight emojis:
  const emoji = ["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"][
    Math.round(phase * 8) % 8
  ];

  // Readable phase name
  let name: string;
  if (phase === 0) name = "New Moon";
  else if (phase < 0.25) name = "Waxing Crescent";
  else if (phase === 0.25) name = "First Quarter";
  else if (phase < 0.5) name = "Waxing Gibbous";
  else if (phase === 0.5) name = "Full Moon";
  else if (phase < 0.75) name = "Waning Gibbous";
  else if (phase === 0.75) name = "Last Quarter";
  else name = "Waning Crescent";

  return {
    emoji,
    phase: name,
    illumination: `${Math.round(fraction * 100)}%`,
    age: `${(phase * 29.53).toFixed(1)} days`,
  };
}
