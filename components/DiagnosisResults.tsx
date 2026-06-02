"use client";

import { useEffect, useState } from "react";
import { DiagnosisResult } from "@/types";
import { vocalTypes } from "@/lib/vocalTypes";
import MethodTeaser from "@/components/MethodTeaser";

interface Props {
  result: DiagnosisResult;
  onRestart: () => void;
}

export default function DiagnosisResults({ result, onRestart }: Props) {
  const [showScores, setShowScores] = useState(false);
  const type = vocalTypes[result.vocalType];

  useEffect(() => {
    const timer = setTimeout(() => setShowScores(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scoreCategories = [
    { key: "expression", label: "表現力", inverted: true },
    { key: "pitch", label: "音程", inverted: true },
    { key: "rhythm", label: "リズム", inverted: true },
    { key: "breath", label: "呼吸", inverted: true },
    { key: "volume", label: "声量", inverted: true },
    { key: "highNote", label: "高音", inverted: true },
  ] as const;

  return (
    <div className="min-h-screen bg-[#f8f7ff]">
      {/* Hero Result Header */}
      <div className="gradient-primary text-white px-6 pt-12 pb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-white" />
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white" />
        </div>
        <div className="relative z-10 max-w-md mx-auto fade-in">
          <p className="text-xs tracking-widest opacity-70 mb-3 uppercase">診断結果</p>
          <div className="text-6xl mb-4">{type.icon}</div>
          <p className="text-sm font-medium opacity-80 mb-1">{type.subtitle}</p>
          <h1 className="text-2xl font-bold mb-4">{type.name}</h1>
          <div className="bg-white/20 rounded-2xl px-5 py-3 inline-block">
            <p className="text-sm font-semibold">{result.catchCopy}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 max-w-md mx-auto space-y-6">
        {/* Type Description */}
        <div className="bg-white rounded-3xl p-6 card-shadow slide-up">
          <p className="text-sm text-gray-600 leading-relaxed">{type.description}</p>
        </div>

        {/* Scores Radar */}
        <div className="bg-white rounded-3xl p-6 card-shadow slide-up">
          <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span>📊</span> ボーカルスコア
          </h2>
          <div className="space-y-4">
            {scoreCategories.map(({ key, label, inverted }) => {
              const rawScore = result.scores[key];
              const displayScore = inverted ? 100 - rawScore : rawScore;
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 font-medium">{label}</span>
                    <span className="font-bold text-[#6c4fc0]">{displayScore}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: showScores ? `${displayScore}%` : "0%",
                        background: "linear-gradient(90deg, #6c4fc0, #c084fc)",
                        transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths */}
        <div className="bg-white rounded-3xl p-6 card-shadow slide-up">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>💪</span> 現在の強み
          </h2>
          <div className="space-y-3">
            {result.strengths.map((s, i) => (
              <div key={i} className="flex items-center gap-3 bg-green-50 rounded-2xl px-4 py-3">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 text-xs font-bold">✓</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="bg-white rounded-3xl p-6 card-shadow slide-up">
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🎯</span> 成長のポイント
          </h2>
          <div className="space-y-3">
            {result.challenges.map((c, i) => (
              <div key={i} className="flex items-center gap-3 bg-purple-50 rounded-2xl px-4 py-3">
                <div className="w-6 h-6 rounded-full bg-[#6c4fc0]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#6c4fc0] text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">{c}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div className="bg-white rounded-3xl p-6 card-shadow slide-up">
          <h2 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span>🗺️</span> 成長ロードマップ
          </h2>
          <div className="relative">
            <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#6c4fc0] to-[#c084fc]" />
            <div className="space-y-4">
              {["現在地", ...result.roadmap].map((item, i) => (
                <div key={i} className="flex items-center gap-4 relative">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                      i === 0
                        ? "gradient-primary text-white"
                        : "bg-white border-2 border-[#6c4fc0] text-[#6c4fc0]"
                    }`}
                  >
                    {i === 0 ? "📍" : <span className="text-xs font-bold">{i}</span>}
                  </div>
                  <div
                    className={`flex-1 py-2 px-4 rounded-2xl ${
                      i === 0 ? "bg-[#6c4fc0] text-white" : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <p className={`text-sm font-${i === 0 ? "bold" : "medium"}`}>{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Advice */}
        <div className="bg-white rounded-3xl p-6 card-shadow slide-up border-l-4 border-[#6c4fc0]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-lg">
              👨‍🎤
            </div>
            <div>
              <p className="font-bold text-gray-800 text-sm">一宮光輝からのメッセージ</p>
              <p className="text-xs text-gray-400">ボイストレーナー・True Happiness代表</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{result.aiAdvice}</p>
        </div>

        {/* Method Teaser */}
        <MethodTeaser />

        {/* Trial Lesson CTA */}
        <div className="bg-white rounded-3xl p-6 card-shadow-lg slide-up border border-[#6c4fc0]/20">
          <p className="text-center text-xs text-[#6c4fc0] font-semibold mb-3 tracking-wide uppercase">
            さらに詳しく知りたい方へ
          </p>
          <h3 className="text-center font-bold text-gray-800 text-lg mb-3">
            体験レッスンのご案内
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-5 text-center">
            今回の診断は歌の現在地を知るためのものです。実際には声だけではなく、呼吸・姿勢・身体の使い方・言葉の届け方なども重要です。
            <br /><br />
            体験レッスンでは、あなたの歌声を実際に確認しながら、改善ポイントを具体的にお伝えします。
          </p>
          <div className="space-y-3">
            <a
              href="https://www.truehappinessschool.com/blank-6"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full py-4 block"
            >
              体験レッスンを予約する
            </a>
            <a
              href="https://lin.ee/XQchRoH"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-line w-full py-4 block"
            >
              💬 LINEで相談する
            </a>
          </div>
        </div>

        {/* Restart */}
        <div className="text-center pb-8">
          <button onClick={onRestart} className="btn-secondary px-8 py-3 text-sm">
            もう一度診断する
          </button>
        </div>
      </div>
    </div>
  );
}
