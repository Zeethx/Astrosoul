"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import questions from "@/data/questions.json";
import { useQuiz } from "@/context/QuizContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface Option {
  label: string;
  image: string;
}
interface Question {
  question: string;
  options: Option[];
}

export default function QuizPage() {
  const router = useRouter();
  const { name, date, setName, setDate, addAnswer } = useQuiz();
  // Store the picker value as Dayjs | null
  const [pickerDate, setPickerDate] = useState<Dayjs | null>(date ? dayjs(date) : null);
  const [step, setStep] = useState(0);

  const TOTAL = (questions as Question[]).length;
  const progress = step > 0 ? (step / TOTAL) * 100 : 0;

  const handleNext = (answer?: string) => {
    if (step === 0) {
      if (!name || !pickerDate) return;
      setStep(1);
    } else {
      addAnswer(answer!);
      if (step === TOTAL) {
        router.push("/result");
      } else {
        setStep((s) => s + 1);
      }
    }
  };

  // Keep context date in sync with pickerDate
  const handleDateChange = (newVal: Dayjs | null) => {
    setPickerDate(newVal);
    setDate(newVal ? newVal.format("YYYY-MM-DD") : "");
  };

  return (
    <Box
      component="main"
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
          borderRadius: 2,
          p: 4,
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {step === 0 ? "Tell Us About You" : `Question ${step} of ${TOTAL}`}
        </Typography>

        {step > 0 && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              mb: 2,
              height: 8,
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.1)",
              "& .MuiLinearProgress-bar": { bgcolor: "#8e44ad" },
            }}
          />
        )}

        {step === 0 ? (
          <Box
            component="form"
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Your Name"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                sx: { color: "white", bgcolor: "rgba(0,0,0,0.5)" },
              }}
              InputLabelProps={{ sx: { color: "#ccc" } }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Birthdate"
                value={pickerDate}
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    variant: "filled",
                    InputProps: {
                      sx: { color: "white", bgcolor: "rgba(0,0,0,0.5)" },
                    },
                    InputLabelProps: { sx: { color: "#ccc" } },
                  },
                }}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              onClick={() => handleNext()}
              sx={{
                mt: 1,
                backgroundColor: "#8e44ad",
                "&:hover": { backgroundColor: "#71368a" },
              }}
            >
              Start Quiz
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography sx={{ fontSize: 18 }}>
              {(questions as Question[])[step - 1].question}
            </Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              {(questions as Question[])[step - 1].options.map((opt) => (
                <Box
                  key={opt.label}
                  component="button"
                  onClick={() => handleNext(opt.label)}
                  sx={{
                    position: "relative",
                    height: 120,
                    borderRadius: 1,
                    overflow: "hidden",
                    border: "2px solid transparent",
                    backgroundImage: `url(${opt.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    "&:hover": { borderColor: "#8e44ad" },
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      bgcolor: "rgba(0,0,0,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ color: "white", fontWeight: 600 }}>
                      {opt.label}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                color: "#aaa",
                fontSize: 14,
              }}
            >
              <Button
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                sx={{ color: "#ccc" }}
              >
                &larr; Back
              </Button>
              <Button onClick={() => handleNext("Skipped")} sx={{ color: "#ccc" }}>
                Skip
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}