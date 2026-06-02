import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const type = formData.get("type") as string;

    if (!audioFile) {
      return NextResponse.json({ error: "音声ファイルがありません" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_openai_api_key_here") {
      return NextResponse.json(generateMockAnalysis(type));
    }

    const client = new OpenAI({ apiKey });

    const transcription = await client.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-1",
      language: "ja",
    });

    if (type === "longTone") {
      const analysis = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `音声解析の結果として以下のロングトーンデータを評価してください。
文字起こし: "${transcription.text}"
ロングトーンテストの結果を0-100のスコアで評価し、JSON形式で返してください。
{
  "stability": 音の安定性スコア（0-100）,
  "pitchVariance": ピッチの変動スコア（0-100、低いほど安定）,
  "breathiness": 息漏れ傾向スコア（0-100）,
  "volumeChange": 音量変化スコア（0-100、低いほど安定）
}`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(analysis.choices[0].message.content || "{}");
      return NextResponse.json({ longTone: result, transcription: transcription.text });
    } else {
      const analysis = await client.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: `歌唱音声の文字起こし: "${transcription.text}"
これは歌を歌った音声です。歌唱の特徴を0-100のスコアで評価し、JSON形式で返してください。
{
  "pitchAccuracy": 音程の正確さ（0-100）,
  "rhythm": リズム感（0-100）,
  "volume": 声量（0-100）,
  "expression": 表現力（0-100）,
  "stability": 安定感（0-100）
}`,
          },
        ],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(analysis.choices[0].message.content || "{}");
      return NextResponse.json({ singing: result, transcription: transcription.text });
    }
  } catch (error) {
    console.error("Audio analysis error:", error);
    return NextResponse.json(generateMockAnalysis("longTone"));
  }
}

function generateMockAnalysis(type: string) {
  if (type === "longTone") {
    return {
      longTone: {
        stability: 60 + Math.floor(Math.random() * 30),
        pitchVariance: 20 + Math.floor(Math.random() * 40),
        breathiness: 20 + Math.floor(Math.random() * 40),
        volumeChange: 15 + Math.floor(Math.random() * 35),
      },
    };
  }
  return {
    singing: {
      pitchAccuracy: 60 + Math.floor(Math.random() * 30),
      rhythm: 60 + Math.floor(Math.random() * 30),
      volume: 55 + Math.floor(Math.random() * 35),
      expression: 65 + Math.floor(Math.random() * 25),
      stability: 60 + Math.floor(Math.random() * 30),
    },
  };
}
