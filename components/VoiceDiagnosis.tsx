"use client";

import { useState, useRef } from "react";
import { VoiceAnalysis } from "@/types";

interface Props {
  onComplete: (analysis: VoiceAnalysis) => void;
}

type TestStep = "intro" | "longTone" | "longToneResult" | "singing" | "singingResult" | "done";

export default function VoiceDiagnosis({ onComplete }: Props) {
  const [step, setStep] = useState<TestStep>("intro");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [analysis, setAnalysis] = useState<VoiceAnalysis>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startRecording = async (maxSeconds: number, onStop: (blob: Blob) => void) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        onStop(blob);
      };

      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((t) => {
          if (t + 1 >= maxSeconds) {
            stopRecording();
            return t + 1;
          }
          return t + 1;
        });
      }, 1000);
    } catch {
      alert("マイクへのアクセスを許可してください");
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const analyzeAudio = async (blob: Blob, type: string) => {
    setIsAnalyzing(true);
    try {
      const formData = new FormData();
      formData.append("audio", blob, "recording.webm");
      formData.append("type", type);

      const res = await fetch("/api/analyze-audio", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      return data;
    } catch {
      return type === "longTone"
        ? { longTone: { stability: 70, pitchVariance: 25, breathiness: 30, volumeChange: 20 } }
        : { singing: { pitchAccuracy: 70, rhythm: 70, volume: 65, expression: 68, stability: 72 } };
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLongToneStop = async (blob: Blob) => {
    const data = await analyzeAudio(blob, "longTone");
    setAnalysis((prev) => ({ ...prev, ...data }));
    setStep("longToneResult");
  };

  const handleSingingStop = async (blob: Blob) => {
    const data = await analyzeAudio(blob, "singing");
    setAnalysis((prev) => ({ ...prev, ...data }));
    setStep("singingResult");
  };

  const handleFinish = () => {
    onComplete(analysis);
  };

  const skipVoice = () => {
    onComplete({});
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-[#f8f7ff] flex items-center justify-center">
        <div className="text-center fade-in">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full gradient-primary flex items-center justify-center pulse-ring">
            <span className="text-3xl">🎵</span>
          </div>
          <p className="text-lg font-semibold text-gray-700">音声を解析中...</p>
          <p className="text-sm text-gray-400 mt-2">しばらくお待ちください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7ff] flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-[#6c4fc0]">STEP 2 / 3</p>
            <p className="text-sm text-gray-500">音声診断</p>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full progress-bar"
              style={{
                width: step === "intro" ? "0%" : step === "longTone" || step === "longToneResult" ? "50%" : "100%",
                background: "linear-gradient(90deg, #6c4fc0, #c084fc)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-8 max-w-md mx-auto w-full">
        {step === "intro" && (
          <div className="fade-in">
            <div className="bg-white rounded-3xl p-6 card-shadow-lg mb-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🎙️</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">音声診断</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                  2つの短い録音テストで、
                  <br />
                  あなたの声の特徴をより詳しく分析します
                </p>
              </div>
              <div className="space-y-3">
                <div className="bg-[#f8f7ff] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg">🎵</span>
                    <p className="font-semibold text-gray-700">テスト1: ロングトーン</p>
                  </div>
                  <p className="text-xs text-gray-500 ml-8">「あーーー」と8〜10秒間のばして録音</p>
                </div>
                <div className="bg-[#f8f7ff] rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-lg">🎶</span>
                    <p className="font-semibold text-gray-700">テスト2: アカペラ歌唱</p>
                  </div>
                  <p className="text-xs text-gray-500 ml-8">好きな曲を20〜30秒間アカペラで歌う</p>
                </div>
              </div>
            </div>
            {/* マイク許可の案内 */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-sm font-semibold text-amber-800 mb-2">マイクの許可が必要です</p>
                  <p className="text-xs text-amber-700 leading-relaxed mb-3">
                    「音声診断を始める」を押すと、マイクの使用許可を求めるメッセージが表示されます。<strong>「許可」</strong>をタップしてください。
                  </p>
                  <details className="text-xs text-amber-700">
                    <summary className="cursor-pointer font-semibold mb-2">許可が出ない・拒否してしまった方はこちら</summary>
                    <div className="space-y-3 mt-2">
                      <div className="bg-white rounded-xl p-3 border border-amber-100">
                        <p className="font-bold text-amber-800 mb-1">🍎 iPhoneの場合（Safari）</p>
                        <ol className="space-y-0.5 text-amber-700 list-decimal list-inside">
                          <li>iPhoneの「設定」アプリを開く</li>
                          <li>下にスクロールして「Safari」をタップ</li>
                          <li>「マイク」→「許可」に変更</li>
                          <li>このページを再読み込み</li>
                        </ol>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-amber-100">
                        <p className="font-bold text-amber-800 mb-1">🤖 Androidの場合（Chrome）</p>
                        <ol className="space-y-0.5 text-amber-700 list-decimal list-inside">
                          <li>Chromeでこのページを開いた状態で、アドレスバー左端の⚙️または🔒をタップ</li>
                          <li>「権限」をタップ</li>
                          <li>「マイク」→「許可」に変更（※「カメラ」ではなく「マイク」）</li>
                          <li>ページを再読み込み</li>
                        </ol>
                        <p className="text-amber-600 mt-2">※ アドレスバー左にマークが出ない場合は、右上の「⋮」→「サイトの設定」→「マイク」で変更できます</p>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>

            <button onClick={() => setStep("longTone")} className="btn-primary w-full py-4 mb-3">
              音声診断を始める
            </button>
            <button onClick={skipVoice} className="btn-secondary w-full py-4">
              スキップして結果へ
            </button>
          </div>
        )}

        {step === "longTone" && (
          <div className="fade-in">
            <div className="bg-white rounded-3xl p-6 card-shadow-lg mb-6 text-center">
              <p className="text-xs font-semibold text-[#6c4fc0] mb-4 tracking-wide uppercase">テスト 1 / 2</p>
              <h2 className="text-xl font-bold text-gray-800 mb-2">ロングトーン</h2>
              <p className="text-sm text-gray-500 mb-6">
                「あーーー」と声を出して、
                <br />
                できるだけ安定して8〜10秒間のばしてください
              </p>

              <div
                className={`w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center cursor-pointer transition-all ${
                  isRecording
                    ? "bg-red-500 recording-pulse"
                    : "gradient-primary pulse-ring"
                }`}
                onClick={() =>
                  isRecording ? stopRecording() : startRecording(10, handleLongToneStop)
                }
              >
                <span className="text-white text-4xl">{isRecording ? "⏹" : "🎙️"}</span>
              </div>

              {isRecording ? (
                <div>
                  <p className="text-red-500 font-bold text-2xl mb-1">{recordingTime}s</p>
                  <p className="text-sm text-gray-400">録音中... タップで停止</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">マイクをタップして録音開始</p>
              )}
            </div>

            {!isRecording && recordingTime === 0 && (
              <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                <p className="text-xs text-yellow-700 leading-relaxed">
                  💡 静かな環境で録音すると、より正確な診断ができます
                </p>
              </div>
            )}
          </div>
        )}

        {step === "longToneResult" && (
          <div className="fade-in">
            <div className="bg-white rounded-3xl p-6 card-shadow-lg mb-6">
              <div className="text-center mb-4">
                <span className="text-3xl">✅</span>
                <p className="font-bold text-gray-800 mt-2">テスト1 完了</p>
                <p className="text-sm text-gray-500 mt-1">ロングトーンを記録しました</p>
              </div>
              {analysis.longTone && (
                <div className="space-y-3">
                  {[
                    { label: "安定性", value: analysis.longTone.stability },
                    { label: "ピッチの安定", value: 100 - analysis.longTone.pitchVariance },
                    { label: "息の安定", value: 100 - analysis.longTone.breathiness },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full score-fill"
                          style={{
                            width: `${item.value}%`,
                            background: "linear-gradient(90deg, #6c4fc0, #c084fc)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setStep("singing")} className="btn-primary w-full py-4">
              テスト2へ進む
            </button>
          </div>
        )}

        {step === "singing" && (
          <div className="fade-in">
            <div className="bg-white rounded-3xl p-6 card-shadow-lg mb-6 text-center">
              <p className="text-xs font-semibold text-[#6c4fc0] mb-4 tracking-wide uppercase">テスト 2 / 2</p>
              <h2 className="text-xl font-bold text-gray-800 mb-2">アカペラ歌唱</h2>
              <p className="text-sm text-gray-500 mb-6">
                好きな曲を20〜30秒間、
                <br />
                アカペラ（伴奏なし）で歌ってください
              </p>

              <div
                className={`w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center cursor-pointer transition-all ${
                  isRecording
                    ? "bg-red-500 recording-pulse"
                    : "gradient-primary pulse-ring"
                }`}
                onClick={() =>
                  isRecording ? stopRecording() : startRecording(30, handleSingingStop)
                }
              >
                <span className="text-white text-4xl">{isRecording ? "⏹" : "🎶"}</span>
              </div>

              {isRecording ? (
                <div>
                  <p className="text-red-500 font-bold text-2xl mb-1">{recordingTime}s</p>
                  <p className="text-sm text-gray-400">録音中... タップで停止</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">マイクをタップして録音開始</p>
              )}
            </div>
          </div>
        )}

        {step === "singingResult" && (
          <div className="fade-in">
            <div className="bg-white rounded-3xl p-6 card-shadow-lg mb-6">
              <div className="text-center mb-4">
                <span className="text-3xl">✅</span>
                <p className="font-bold text-gray-800 mt-2">テスト2 完了</p>
                <p className="text-sm text-gray-500 mt-1">歌唱を記録しました</p>
              </div>
              {analysis.singing && (
                <div className="space-y-3">
                  {[
                    { label: "音程の正確さ", value: analysis.singing.pitchAccuracy },
                    { label: "リズム感", value: analysis.singing.rhythm },
                    { label: "声量", value: analysis.singing.volume },
                    { label: "表現力", value: analysis.singing.expression },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full score-fill"
                          style={{
                            width: `${item.value}%`,
                            background: "linear-gradient(90deg, #6c4fc0, #c084fc)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={handleFinish} className="btn-primary w-full py-4">
              診断結果を見る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
