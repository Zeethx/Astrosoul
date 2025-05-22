// File: src/components/PreviewSection.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Preview {
  name: string;
  type: string;
  phase: string;
  desc: string;
  date: string;
}

const previews: Preview[] = [
  {
    name: "Emily",
    type: "The Ethereal Observer",
    phase: "🌒",
    desc: "Quiet and imaginative; sees the world through wonder.",
    date: "July 8, 2002",
  },
  {
    name: "Liam",
    type: "The Cosmic Minimalist",
    phase: "🌑",
    desc: "Embraces simplicity; finds depth in dark skies.",
    date: "Dec 14, 1995",
  },
  {
    name: "Sophia",
    type: "The Moonlit Dreamer",
    phase: "🌕",
    desc: "Spirit shines brightly, illuminating paths unseen.",
    date: "Mar 22, 1988",
  },
];

// Shared card classes for consistent sizing
const CARD_CLASSES =
  "flex-shrink-0 w-64 h-76 bg-[#1a1a1a] p-6 rounded-xl border border-gray-700 shadow-md transition hover:scale-[1.03] will-change-transform";
export default function PreviewSection() {
  const [current, setCurrent] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect small screens
  useEffect(() => {
    const check = () => setIsSmallScreen(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-cycle on small screens
  useEffect(() => {
    if (!isSmallScreen) return;
    const iv = setInterval(() => {
      setCurrent((p) => (p + 1) % previews.length);
    }, 4000);
    return () => clearInterval(iv);
  }, [isSmallScreen]);

  const renderCard = (p: Preview) => (
    <div className={CARD_CLASSES}>
      <h3 className="text-2xl font-bold mb-1">{p.name}</h3>
      <p className="italic text-purple-300 mb-3 line-clamp-2">{p.type}</p>
      <div className="text-6xl mb-3">{p.phase}</div>
      <p className="text-gray-200 mb-2 line-clamp-3">{p.desc}</p>
      <div className="mt-auto text-sm text-gray-400">
        {p.phase.includes("🌑") ? "New Moon • " : ""}
        {p.date}
      </div>
    </div>
  );

return (
  <section className="py-20 px-6">
    <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center drop-shadow">
      🔮 Your Cosmic Cards
    </h2>

    <div className="flex justify-center overflow-visible py-8">
      {isSmallScreen ? (
        <div className={CARD_CLASSES}>
          {renderCard(previews[current])}
        </div>
      ) : (
        <div className="flex gap-6 pb-4 px-4 overflow-visible">
          {previews.map((p, i) => (
            <div key={i} className="flex-shrink-0">
              {renderCard(p)}
            </div>
          ))}
        </div>
      )}
    </div>
  </section>
);
}
