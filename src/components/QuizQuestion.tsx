"use client";

import { Button } from "@mui/material";

interface QuizQuestionProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

export default function QuizQuestion({ question, options, onAnswer }: QuizQuestionProps) {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-semibold mb-6">{question}</h2>
      <div className="flex flex-col gap-4">
        {options.map((opt) => (
          <Button
            key={opt}
            variant="outlined"
            onClick={() => onAnswer(opt)}
            sx={{
              color: "#fff",
              borderColor: "#555",
              "&:hover": { borderColor: "#888" },
              justifyContent: "flex-start",
              px: 3,
            }}
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
}
