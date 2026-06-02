"use client";

import { useEffect, useState } from "react";

const messages = [
  "質問の回答を分析中...",
  "ボーカルタイプを判定中...",
  "あなたの強みを抽出中...",
  "成長ロードマップを作成中...",
  "AIアドバイスを生成中...",
];

export default function LoadingDiagnosis() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center">
      <div className="text-center text-white px-8">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/20 flex items-center justify-center pulse-ring">
          <span className="text-5xl">🎤</span>
        </div>
        <h2 className="text-2xl font-bold mb-3">診断中...</h2>
        <p className="text-white/80 text-sm mb-8 h-6 transition-all duration-500">
          {messages[messageIndex]}
        </p>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              style={{
                animation: `recording-pulse 1.2s ease-in-out ${i * 0.4}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
