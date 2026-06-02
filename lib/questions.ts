export interface Question {
  id: string;
  category: "highNote" | "breath" | "volume" | "pitch" | "rhythm" | "expression";
  categoryLabel: string;
  text: string;
  options: { label: string; value: number }[];
}

export const questions: Question[] = [
  {
    id: "q1",
    category: "highNote",
    categoryLabel: "高音",
    text: "高音になると苦しくなることがありますか？",
    options: [
      { label: "よくある", value: 3 },
      { label: "たまにある", value: 2 },
      { label: "あまりない", value: 1 },
      { label: "ほとんどない", value: 0 },
    ],
  },
  {
    id: "q2",
    category: "highNote",
    categoryLabel: "高音",
    text: "高音を出すとき、力んでしまうことがありますか？",
    options: [
      { label: "よくある", value: 3 },
      { label: "たまにある", value: 2 },
      { label: "あまりない", value: 1 },
      { label: "ほとんどない", value: 0 },
    ],
  },
  {
    id: "q3",
    category: "highNote",
    categoryLabel: "高音",
    text: "高音で喉が締まる感覚がありますか？",
    options: [
      { label: "よくある", value: 3 },
      { label: "たまにある", value: 2 },
      { label: "あまりない", value: 1 },
      { label: "ほとんどない", value: 0 },
    ],
  },
  {
    id: "q4",
    category: "breath",
    categoryLabel: "呼吸",
    text: "歌っていると息が続かなくなることがありますか？",
    options: [
      { label: "よくある", value: 3 },
      { label: "たまにある", value: 2 },
      { label: "あまりない", value: 1 },
      { label: "ほとんどない", value: 0 },
    ],
  },
  {
    id: "q5",
    category: "breath",
    categoryLabel: "呼吸",
    text: "ロングトーン（伸ばす音）が苦手ですか？",
    options: [
      { label: "とても苦手", value: 3 },
      { label: "やや苦手", value: 2 },
      { label: "まあまあできる", value: 1 },
      { label: "得意", value: 0 },
    ],
  },
  {
    id: "q6",
    category: "breath",
    categoryLabel: "呼吸",
    text: "歌い終わったあと、疲れを感じますか？",
    options: [
      { label: "かなり疲れる", value: 3 },
      { label: "少し疲れる", value: 2 },
      { label: "あまり疲れない", value: 1 },
      { label: "ほとんど疲れない", value: 0 },
    ],
  },
  {
    id: "q7",
    category: "volume",
    categoryLabel: "声量",
    text: "声が小さいと言われることがありますか？",
    options: [
      { label: "よく言われる", value: 3 },
      { label: "たまに言われる", value: 2 },
      { label: "あまり言われない", value: 1 },
      { label: "言われない", value: 0 },
    ],
  },
  {
    id: "q8",
    category: "volume",
    categoryLabel: "声量",
    text: "声が遠くまで届かない（飛ばない）感じがしますか？",
    options: [
      { label: "よく感じる", value: 3 },
      { label: "たまに感じる", value: 2 },
      { label: "あまり感じない", value: 1 },
      { label: "感じない", value: 0 },
    ],
  },
  {
    id: "q9",
    category: "pitch",
    categoryLabel: "音程",
    text: "音が不安定になることがありますか？",
    options: [
      { label: "よくある", value: 3 },
      { label: "たまにある", value: 2 },
      { label: "あまりない", value: 1 },
      { label: "ほとんどない", value: 0 },
    ],
  },
  {
    id: "q10",
    category: "pitch",
    categoryLabel: "音程",
    text: "カラオケの採点が思うように伸びないと感じますか？",
    options: [
      { label: "よく感じる", value: 3 },
      { label: "たまに感じる", value: 2 },
      { label: "あまり感じない", value: 1 },
      { label: "感じない", value: 0 },
    ],
  },
  {
    id: "q11",
    category: "rhythm",
    categoryLabel: "リズム",
    text: "リズム感に自信がありますか？",
    options: [
      { label: "あまり自信がない", value: 3 },
      { label: "少し自信がない", value: 2 },
      { label: "まあまあ自信がある", value: 1 },
      { label: "自信がある", value: 0 },
    ],
  },
  {
    id: "q12",
    category: "expression",
    categoryLabel: "表現",
    text: "歌っていて感情が伝わらないと感じますか？",
    options: [
      { label: "よく感じる", value: 3 },
      { label: "たまに感じる", value: 2 },
      { label: "あまり感じない", value: 1 },
      { label: "感じない", value: 0 },
    ],
  },
  {
    id: "q13",
    category: "expression",
    categoryLabel: "表現",
    text: "歌が単調と言われることがありますか？",
    options: [
      { label: "よく言われる", value: 3 },
      { label: "たまに言われる", value: 2 },
      { label: "あまり言われない", value: 1 },
      { label: "言われない", value: 0 },
    ],
  },
];

export const categoryLabels: Record<string, string> = {
  highNote: "高音",
  breath: "呼吸",
  volume: "声量",
  pitch: "音程",
  rhythm: "リズム",
  expression: "表現",
};
