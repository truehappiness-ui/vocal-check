export interface QuestionAnswer {
  questionId: string;
  answer: string;
  score: number;
}

export interface VoiceAnalysis {
  longTone?: {
    stability: number;
    pitchVariance: number;
    breathiness: number;
    volumeChange: number;
  };
  singing?: {
    pitchAccuracy: number;
    rhythm: number;
    volume: number;
    expression: number;
  };
}

export type VocalType =
  | "emotional"
  | "storyteller"
  | "powerVoice"
  | "healing"
  | "technical";

export interface VocalTypeInfo {
  id: VocalType;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface DiagnosisResult {
  vocalType: VocalType;
  subType?: VocalType;
  catchCopy: string;
  strengths: string[];
  challenges: string[];
  roadmap: string[];
  aiAdvice: string;
  scores: {
    highNote: number;
    breath: number;
    volume: number;
    pitch: number;
    rhythm: number;
    expression: number;
  };
}

export interface DiagnosisState {
  step: "top" | "questions" | "voice" | "results";
  answers: QuestionAnswer[];
  voiceAnalysis: VoiceAnalysis;
  result?: DiagnosisResult;
}
