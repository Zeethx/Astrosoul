"use client";

import HeroSection from "../components/HeroSection";
import HowItWorksSection from "../components/HowItWorks";
import PreviewSection from "../components/Preview";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      {/* Background */}
      <div/>
      {/* Content */}
      <div className="relative z-10 flex flex-col">
        <HeroSection />
        <div className="w-full my-8 border-t border-white/20" />
        <HowItWorksSection />
        <div className="w-full my-8 border-t border-white/20" />
        <PreviewSection />
        <div className="w-full my-8 border-t border-white/20" />
        <Footer />
      </div>
    </main>
  );
}