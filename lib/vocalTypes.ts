import { VocalType, VocalTypeInfo } from "@/types";

export const vocalTypes: Record<VocalType, VocalTypeInfo> = {
  emotional: {
    id: "emotional",
    name: "心を動かすタイプ",
    subtitle: "感情表現型",
    description:
      "あなたの歌には、聴く人の心に直接届く力があります。感情の込め方が自然で、歌詞の世界を体感させる表現力が強みです。",
    icon: "❤️",
  },
  storyteller: {
    id: "storyteller",
    name: "言葉を届けるタイプ",
    subtitle: "ストーリーテラー型",
    description:
      "あなたの歌は、一つひとつの言葉が丁寧に届きます。歌詞の意味を伝える力があり、聴く人を物語の中に引き込む魅力があります。",
    icon: "📖",
  },
  powerVoice: {
    id: "powerVoice",
    name: "エネルギーで魅せるタイプ",
    subtitle: "パワーボイス型",
    description:
      "あなたの歌には、圧倒的なエネルギーと存在感があります。声のパワーで場を支配し、聴く人を引き込む力強さが魅力です。",
    icon: "🔥",
  },
  healing: {
    id: "healing",
    name: "包み込むタイプ",
    subtitle: "ヒーリング型",
    description:
      "あなたの歌声には、人を癒す温かさがあります。柔らかく包み込むような声質で、聴く人に安らぎを与える唯一無二の魅力があります。",
    icon: "🌸",
  },
  technical: {
    id: "technical",
    name: "聴かせるタイプ",
    subtitle: "テクニカル型",
    description:
      "あなたの歌は、技術的な精度が高く、安定感が際立っています。音程やリズムの正確さで聴く人を魅了する、職人気質の歌い手です。",
    icon: "⭐",
  },
};
