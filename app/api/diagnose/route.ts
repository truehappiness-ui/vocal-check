import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { QuestionAnswer, VoiceAnalysis, DiagnosisResult, VocalType } from "@/types";

function calculateScores(answers: QuestionAnswer[]) {
  const categoryScores: Record<string, number[]> = {
    highNote: [],
    breath: [],
    volume: [],
    pitch: [],
    rhythm: [],
    expression: [],
  };

  const questionCategories: Record<string, string> = {
    q1: "highNote", q2: "highNote", q3: "highNote",
    q4: "breath", q5: "breath", q6: "breath",
    q7: "volume", q8: "volume",
    q9: "pitch", q10: "pitch",
    q11: "rhythm",
    q12: "expression", q13: "expression",
  };

  for (const answer of answers) {
    const cat = questionCategories[answer.questionId];
    if (cat) categoryScores[cat].push(answer.score);
  }

  const avg = (arr: number[]) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  return {
    highNote: Math.round(avg(categoryScores.highNote) * 33.3),
    breath: Math.round(avg(categoryScores.breath) * 33.3),
    volume: Math.round(avg(categoryScores.volume) * 33.3),
    pitch: Math.round(avg(categoryScores.pitch) * 33.3),
    rhythm: Math.round(avg(categoryScores.rhythm) * 33.3),
    expression: Math.round(avg(categoryScores.expression) * 33.3),
  };
}

function determineVocalType(
  scores: ReturnType<typeof calculateScores>,
  voiceAnalysis: VoiceAnalysis
): VocalType {
  const expressionScore = 100 - scores.expression;
  const technicalScore =
    (100 - scores.pitch + (100 - scores.rhythm)) / 2;
  const powerScore = 100 - scores.volume;
  const breathScore = 100 - scores.breath;

  const voiceStability = voiceAnalysis.longTone?.stability ?? 50;
  const expressionFromVoice = voiceAnalysis.singing?.expression ?? 50;

  const adjustedExpression = (expressionScore + expressionFromVoice) / 2;
  const adjustedTechnical = (technicalScore + voiceStability) / 2;

  const typeScores = [
    { type: "emotional" as VocalType, score: adjustedExpression },
    { type: "storyteller" as VocalType, score: (adjustedExpression + breathScore) / 2 },
    { type: "powerVoice" as VocalType, score: powerScore },
    { type: "healing" as VocalType, score: breathScore },
    { type: "technical" as VocalType, score: adjustedTechnical },
  ];

  typeScores.sort((a, b) => b.score - a.score);
  return typeScores[0].type;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers, voiceAnalysis }: { answers: QuestionAnswer[]; voiceAnalysis: VoiceAnalysis } = body;

    const scores = calculateScores(answers);
    const vocalType = determineVocalType(scores, voiceAnalysis);

    const answersText = answers
      .map((a) => `問${a.questionId}: スコア${a.score}`)
      .join(", ");

    const voiceText = voiceAnalysis.longTone
      ? `ロングトーン安定性: ${voiceAnalysis.longTone.stability}%, ピッチ変動: ${voiceAnalysis.longTone.pitchVariance}%`
      : "音声診断なし";

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_openai_api_key_here") {
      return NextResponse.json(generateFallbackResult(scores, vocalType));
    }

    const client = new OpenAI({ apiKey });

    const prompt = `
あなたはボイストレーナーの一宮光輝です。2000名以上を指導してきた経験を持ち、生徒の可能性を信じて指導することで有名です。

以下の診断データを元に、ユーザーへのフィードバックを生成してください。

【診断データ】
ボーカルタイプ: ${vocalType}
カテゴリ別スコア（0-100、高いほど課題が大きい）:
- 高音: ${scores.highNote}
- 呼吸: ${scores.breath}
- 声量: ${scores.volume}
- 音程: ${scores.pitch}
- リズム: ${scores.rhythm}
- 表現: ${scores.expression}
${voiceText}

【出力形式（JSON）】
{
  "catchCopy": "あなたの歌は「〇〇」が強いタイプです（20文字以内）",
  "strengths": ["強み1", "強み2", "強み3"],
  "challenges": ["課題1", "課題2", "課題3"],
  "roadmap": ["ステップ1", "ステップ2", "ステップ3", "ステップ4", "ステップ5"],
  "aiAdvice": "200〜300文字のアドバイス。必ず希望を持てる内容にすること。否定的な表現は禁止。ユーザーの可能性と強みを前面に出すこと。"
}

重要: 必ずJSON形式のみで返答してください。説明文は不要です。
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const generated = JSON.parse(response.choices[0].message.content || "{}");

    const result: DiagnosisResult = {
      vocalType,
      catchCopy: generated.catchCopy || `あなたの歌は「${vocalType}」タイプです`,
      strengths: generated.strengths || [],
      challenges: generated.challenges || [],
      roadmap: generated.roadmap || [],
      aiAdvice: generated.aiAdvice || "",
      scores,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Diagnosis error:", error);
    return NextResponse.json({ error: "診断中にエラーが発生しました" }, { status: 500 });
  }
}

function generateFallbackResult(
  scores: ReturnType<typeof calculateScores>,
  vocalType: VocalType
): DiagnosisResult {
  const typeData: Record<VocalType, { catchCopy: string; strengths: string[]; challenges: string[] }> = {
    emotional: {
      catchCopy: "あなたの歌は「心を動かす力」が強いタイプです",
      strengths: ["感情表現の豊かさ", "声質の温かみ", "歌詞への共感力"],
      challenges: ["呼吸のコントロール", "声の支え", "高音域の安定"],
    },
    storyteller: {
      catchCopy: "あなたの歌は「言葉を届ける力」が強いタイプです",
      strengths: ["言葉の丁寧な表現", "フレーズの流れ", "聴き手への伝達力"],
      challenges: ["声量のダイナミクス", "高音の伸び", "リズムの安定"],
    },
    powerVoice: {
      catchCopy: "あなたの歌は「エネルギーで魅せる」タイプです",
      strengths: ["声のパワー", "存在感", "エネルギーの発散"],
      challenges: ["細かい音程コントロール", "繊細な表現", "息のコントロール"],
    },
    healing: {
      catchCopy: "あなたの歌は「包み込む温かさ」が強いタイプです",
      strengths: ["声の柔らかさ", "聴く人を癒す声質", "自然な発声"],
      challenges: ["声量のアップ", "高音域の開放", "リズムの力強さ"],
    },
    technical: {
      catchCopy: "あなたの歌は「正確さで魅せる」タイプです",
      strengths: ["音程の正確さ", "リズム感", "安定した歌唱"],
      challenges: ["感情表現の幅", "声の個性", "表現のダイナミクス"],
    },
  };

  const data = typeData[vocalType];
  const roadmap = ["現在地の確認", "呼吸の基礎", "声の支え", "共鳴の習得", "表現の深化"];

  const advice =
    "あなたには素晴らしい可能性があります。今回の診断は現在地を知るためのものです。どんなに上手い歌い手も、最初は同じ課題を持っていました。大切なのは、自分の強みを活かしながら、一つひとつ丁寧に積み上げていくこと。あなたの歌声には、すでに人を引きつける魅力があります。その魅力をさらに磨くことで、歌の世界がもっと広がっていきます。一緒に成長していきましょう！";

  return {
    vocalType,
    catchCopy: data.catchCopy,
    strengths: data.strengths,
    challenges: data.challenges,
    roadmap,
    aiAdvice: advice,
    scores,
  };
}
