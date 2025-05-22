"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface QuizState {
  name: string;
  date: string;
  answers: string[];
  setName: (n: string) => void;
  setDate: (d: string) => void;
  addAnswer: (a: string) => void;
  reset: () => void;
}

const QuizContext = createContext<QuizState | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [name, _setName] = useState("");
  const [date, _setDate] = useState("");
  const [answers, _setAnswers] = useState<string[]>([]);

  const setName = (n: string) => _setName(n);
  const setDate = (d: string) => _setDate(d);
  const addAnswer = (a: string) => _setAnswers((prev) => [...prev, a]);
  const reset = () => {
    _setName("");
    _setDate("");
    _setAnswers([]);
  };

  return (
    <QuizContext.Provider value={{ name, date, answers, setName, setDate, addAnswer, reset }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be inside QuizProvider");
  return ctx;
}
