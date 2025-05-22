export default function HowItWorks() {
  const steps = [
    {
      emoji: "🪐",
      title: "Enter Your Details",
      desc: "Name & birthdate to fetch your moon phase & name meaning.",
    },
    {
      emoji: "🎨",
      title: "Take the Quiz",
      desc: "Select images & vibes to define your cosmic personality.",
    },
    {
      emoji: "🔮",
      title: "Reveal & Share",
      desc: "Get your downloadable cosmic card & aesthetic moodboard.",
    },
  ];

  return (
    <section className="py-20 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-semibold mb-12 drop-shadow">
        ✨ How It Works
      </h2>
      <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {steps.map(({ emoji, title, desc }, i) => (
          <div
            key={i}
            className="bg-[#1c1c1c] p-6 rounded-xl border border-gray-700 hover:scale-[1.02] transition"
          >
            <div className="text-5xl mb-4">{emoji}</div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-400">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
