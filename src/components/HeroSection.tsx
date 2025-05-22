"use client";

import Link from "next/link";
import { Button } from "@mui/material";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-32 pb-16 px-6">
      <h1 className="text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
        🌌 Astrosoul
      </h1>
      <p className="text-lg md:text-2xl max-w-2xl mb-8 text-gray-200 drop-shadow">
        Discover your cosmic aesthetic and moon-born identity. 
        Powered by the stars, tailored to your soul.
      </p>
      <Link href="/quiz" passHref>
        <Button
          variant="contained"
          color="primary"
          sx={{
            bgcolor: "#ffffff",
            color: "#000000",
            fontWeight: 700,
            borderRadius: "9999px",
            px: 5,
            py: 1.5,
            textTransform: "none",
            boxShadow: "0 4px 14px rgba(255,255,255,0.2)",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          Start Your Journey
        </Button>
      </Link>
    </section>
  );
}
