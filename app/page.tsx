"use client";

import { useState } from "react";
import TopPage from "@/components/TopPage";
import QuestionDiagnosis from "@/components/QuestionDiagnosis";
import VoiceDiagnosis from "@/components/VoiceDiagnosis";
import DiagnosisResults from "@/components/DiagnosisResults";
import LoadingDiagnosis from "@/components/LoadingDiagnosis";
import { DiagnosisState, QuestionAnswer, VoiceAnalysis, DiagnosisResult } from "@/types";

export default function Home() {
  const [state, setState] = useState<DiagnosisState>({
    step: "top",
    answers: [],
    voiceAnalysis: {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => setState((prev) => ({ ...prev, step: "questions" }));

  const handleQuestionsComplete = (answers: QuestionAnswer[]) => {
    setState((prev) => ({ ...prev, answers, step: "voice" }));
  };

  const handleVoiceComplete = async (voiceAnalysis: VoiceAnalysis) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: state.answers, voiceAnalysis }),
      });
      const result: DiagnosisResult = await res.json();
      setState((prev) => ({ ...prev, voiceAnalysis, result, step: "results" }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => setState({ step: "top", answers: [], voiceAnalysis: {} });

  if (isLoading) return <LoadingDiagnosis />;

  return (
    <main className="min-h-screen">
      {state.step === "top" && <TopPage onStart={handleStart} />}
      {state.step === "questions" && <QuestionDiagnosis onComplete={handleQuestionsComplete} />}
      {state.step === "voice" && <VoiceDiagnosis onComplete={handleVoiceComplete} />}
      {state.step === "results" && state.result && (
        <DiagnosisResults result={state.result} onRestart={handleRestart} />
      )}
    </main>
  );
}

