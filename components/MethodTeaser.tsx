"use client";

import { useState } from "react";

const singers = [
  {
    name: "ASKA",
    group: "CHAGE and ASKA",
    label: "技術で感情を支えるタイプ",
    labelColor: "bg-blue-100 text-blue-700",
    description: "「言葉を音楽にする」細部の技術が他の追随を許さない。",
    points: [
      { icon: "🎯", tech: "ミックスボイス", detail: "地声感を保ちながら高音（E4〜G5）を力まずに出す。胸声と頭声のブレンドが音色の一貫性を生む。" },
      { icon: "🌬️", tech: "ブレスコントロール", detail: "フレーズが非常に長く、息の配分が緻密。腹式呼吸を基盤に、句またぎを多用して歌詞の世界を途切れさせない。" },
      { icon: "✨", tech: "フォルマント操作", detail: "高音では咽頭腔を広げてブライトな響きを作り、中低音では口腔〜鼻腔共鳴で温かみと厚みを出す。" },
    ],
    methodLink: "「呼吸」「共鳴」「高音はバランス」の柱が集約されたスタイル",
  },
  {
    name: "玉置浩二",
    group: "安全地帯",
    label: "感情が技術を超えるタイプ",
    labelColor: "bg-orange-100 text-orange-700",
    description: "技術の完成形は「技術が見えなくなること」を体現する存在。",
    points: [
      { icon: "🖐️", tech: "完全な脱力", detail: "高音でも低音でも、筋肉的な緊張感が聴こえない。この脱力が「声が自然に出てくる」という奇跡的な印象を生む。" },
      { icon: "🌊", tech: "自然発生型ビブラート", detail: "横隔膜ではなく喉・胸腔全体から湧き出るような揺れ。かかるタイミングが遅く、フレーズ末尾で自然に現れる。" },
      { icon: "💫", tech: "息が歌そのものになる", detail: "息継ぎの場所が歌詞の意味・感情と完全に一致。フレーズの終わりまで息圧を維持し、失速しない。" },
    ],
    methodLink: "「技術を消すこと」という最終目的を、現在進行形で示している",
  },
  {
    name: "宮本浩次",
    group: "エレファントカシマシ",
    label: "基礎が崩せる強さを持つタイプ",
    labelColor: "bg-red-100 text-red-700",
    description: "あれだけ暴れて歌っているのに、なぜ声が潰れないのか——答えは「上半身」ではなく「下」にある。",
    points: [
      { icon: "🏋️", tech: "骨盤底筋85%：腹筋15%", detail: "前屈してもハイトーンが出るのは骨盤底筋で下を締めているから。腹筋に頼りすぎると横隔膜の動きが止まり声がひっくり返る。下が固まっているから、上は脱力できる。" },
      { icon: "🎯", tech: "支持は後ろ・響きは前", detail: "首の下に圧をかけながら、その音を「上の前歯付近（口腔外）」に持ってくる。下に叩きつけた瞬間に前歯で鳴らすから、歌詞がハキハキ刺さる。桑田佳祐が「奥」で鳴らすのに対し、宮本浩次は「前」。" },
      { icon: "🌊", tech: "「飲むように」歌う咽頭洞", detail: "軟口蓋を上げようとするのではなく、下に広げる感覚。口を縦に・下に開ける合唱の基礎が根っこにある。咽頭洞（喉の奥の空間）を筒のように広く保ったまま前に鳴らすから、男っぽさと明瞭さが両立する。" },
    ],
    methodLink: "「基礎があるから、崩せる」——NHK合唱団出身の土台が、あの自由を生んでいる",
  },
];

const pillars = [
  {
    icon: "🌬️",
    title: "呼吸",
    tagline: "「吸う」のをやめると、声が変わる",
    teaser:
      "一宮式では腹式呼吸より「横隔膜の垂直運動」を重視します。横隔膜が正しく下降すると、その圧力は骨盤底筋まで伝わります。お腹をベコベコさせるだけでは不十分——骨盤底筋85%・腹筋15%のバランスが、声の支えを生む本当の呼吸です。",
    hint: "「しゃっくりの逆動き」という感覚が、横隔膜への近道です",
  },
  {
    icon: "✨",
    title: "共鳴",
    tagline: "「響かせる」ではなく「通った結果、響く」",
    teaser:
      "声を鼻腔に「当てよう」とするとエネルギーがロスします。一宮式では、軟口蓋が正しく閉じた結果として声が前方（マスケラ）に飛ぶと考えます。響きは作るものではなく、声の通り道が整ったときに自然に生まれるものです。",
    hint: "軟口蓋・喉頭蓋の位置が、響きを決める鍵です",
  },
  {
    icon: "🎯",
    title: "高音",
    tagline: "高音は力ではなく、「喉を開ける」問題",
    teaser:
      "「喉を開ける」とは、喉頭蓋が立ち上がった状態のこと。舌根が後ろに引かれると喉頭蓋が倒れ、高音が出にくくなります。あくびをするときの感覚に近い、喉の奥が広がる状態——これが高音への入り口です。",
    hint: "「舌根を前に向ける」感覚が、喉頭蓋を立てる鍵です",
  },
  {
    icon: "🖐️",
    title: "身体感覚",
    tagline: "発声は「喉」ではなく「全身」の問題",
    teaser:
      "大腰筋→腰椎→胸椎→頸椎→頸長筋→舌。この連鎖が整うと、舌は自然に正しい位置に収まります。一宮式では小指・薬指の感覚も活用します——末端の感覚が脱力と神経系の覚醒を促し、喉の余計な力みを取り除きます。",
    hint: "骨盤・背骨から整えると、喉への介入が不要になります",
  },
  {
    icon: "💫",
    title: "最終目的",
    tagline: "「技術を消すこと」が、本当のゴール",
    teaser:
      "理想の声には「シンガーズフォルマント（3kHz帯）」が豊かに含まれます。これが声の飛距離と存在感を決めます。高い倍音と低い倍音のバランスが整ったとき、技術は消え、感情だけが届く声になります。",
    hint: "１音の中に「高い成分と低い成分」を同時に感じる感覚が入口です",
  },
];

export default function MethodTeaser() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSingerIndex, setOpenSingerIndex] = useState<number | null>(null);
  const [openPointIndex, setOpenPointIndex] = useState<Record<number, number | null>>({});

  return (
    <div className="bg-white rounded-3xl p-6 card-shadow slide-up">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="inline-block bg-[#6c4fc0]/10 text-[#6c4fc0] text-xs font-bold px-3 py-1 rounded-full mb-3 tracking-wide uppercase">
          一宮式メソッドとは
        </span>
        <h2 className="text-lg font-bold text-gray-800 leading-snug">
          解剖学・呼吸・共鳴・感覚・音楽性を
          <br />
          統合した実践型ボーカルメソッド
        </h2>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          目的は「大きな声」でも「高音」でもない。
          <br />
          <span className="font-semibold text-[#6c4fc0]">
            "感情が届く声"
          </span>
          を作ることです。
        </p>
      </div>

      {/* Core Concept */}
      <div className="gradient-primary rounded-2xl p-5 mb-5 text-white text-center">
        <p className="text-xs font-bold tracking-widest opacity-80 mb-2 uppercase">
          Core Concept
        </p>
        <p className="text-xl font-bold mb-2">１音の中に２音を感じる</p>
        <p className="text-xs leading-relaxed opacity-85">
          音には「上方向」「下方向」「倍音」「息の流れ」が存在する。
          <br />
          この複数の情報を感じることで、音程が安定し、感情が乗り、
          <br />
          響きが立体化します。
        </p>
      </div>

      {/* Pillars */}
      <div className="space-y-3 mb-4">
        {pillars.map((pillar, i) => (
          <div
            key={i}
            className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
              openIndex === i
                ? "border-[#6c4fc0] bg-[#f8f7ff]"
                : "border-gray-100 bg-gray-50"
            }`}
          >
            <button
              className="w-full text-left px-4 py-3 flex items-center gap-3"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <span className="text-2xl flex-shrink-0">{pillar.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-bold text-[#6c4fc0]">
                    {pillar.title}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-700 leading-snug">
                  {pillar.tagline}
                </p>
              </div>
              <span
                className={`text-[#6c4fc0] transition-transform duration-200 flex-shrink-0 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            {openIndex === i && (
              <div className="px-4 pb-4">
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  {pillar.teaser}
                </p>
                <div className="flex items-start gap-2 bg-[#6c4fc0]/5 rounded-xl px-3 py-2">
                  <span className="text-[#6c4fc0] text-xs mt-0.5 flex-shrink-0">
                    💡
                  </span>
                  <p className="text-xs text-[#6c4fc0] font-medium leading-relaxed">
                    {pillar.hint}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Teaser footer */}
      <div className="bg-gray-50 rounded-2xl p-4 text-center border border-dashed border-gray-200 mb-6">
        <p className="text-xs text-gray-500 leading-relaxed">
          各メソッドの詳細・実践トレーニング（ハミング・リップロール・エッジボイスなど）は
          <br />
          <span className="font-semibold text-gray-700">
            体験レッスンでご説明します
          </span>
        </p>
      </div>

      {/* Song Lab Section */}
      <div className="border-t border-gray-100 pt-6">
        <div className="text-center mb-4">
          <span className="inline-block bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-2 border border-yellow-200">
            🎬 歌ラボ分析より
          </span>
          <h3 className="font-bold text-gray-800 text-base">
            プロ歌手の発声から見る一宮式
          </h3>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            YouTube「歌ラボ」で一宮光輝が分析した3名の発声から、
            <br />
            メソッドの核心を垣間見る
          </p>
        </div>

        <div className="space-y-3">
          {singers.map((singer, si) => (
            <div
              key={si}
              className={`rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                openSingerIndex === si
                  ? "border-[#6c4fc0] bg-[#f8f7ff]"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <button
                className="w-full text-left px-4 py-3 flex items-center gap-3"
                onClick={() => setOpenSingerIndex(openSingerIndex === si ? null : si)}
              >
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-lg flex-shrink-0">
                  🎤
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="font-bold text-gray-800 text-sm">{singer.name}</span>
                    <span className="text-xs text-gray-400">{singer.group}</span>
                  </div>
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${singer.labelColor}`}>
                    {singer.label}
                  </span>
                </div>
                <span
                  className={`text-[#6c4fc0] transition-transform duration-200 flex-shrink-0 ${
                    openSingerIndex === si ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {openSingerIndex === si && (
                <div className="px-4 pb-4 space-y-3">
                  <p className="text-xs text-gray-500 italic leading-relaxed">
                    「{singer.description}」
                  </p>

                  {singer.points.map((point, pi) => (
                    <div
                      key={pi}
                      className="bg-white rounded-xl overflow-hidden border border-gray-100"
                    >
                      <button
                        className="w-full text-left px-3 py-2.5 flex items-center gap-2"
                        onClick={() =>
                          setOpenPointIndex((prev) => ({
                            ...prev,
                            [si]: prev[si] === pi ? null : pi,
                          }))
                        }
                      >
                        <span>{point.icon}</span>
                        <span className="text-sm font-semibold text-gray-700 flex-1">
                          {point.tech}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {openPointIndex[si] === pi ? "▲" : "▼"}
                        </span>
                      </button>
                      {openPointIndex[si] === pi && (
                        <div className="px-3 pb-3">
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {point.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="flex items-start gap-2 bg-[#6c4fc0]/5 rounded-xl px-3 py-2 mt-1">
                    <span className="text-[#6c4fc0] text-xs mt-0.5 flex-shrink-0">🔗</span>
                    <p className="text-xs text-[#6c4fc0] font-medium leading-relaxed">
                      {singer.methodLink}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
          歌ラボの詳細分析はYouTube「一宮光輝」チャンネルでご覧いただけます
        </p>
      </div>

      {/* 発声理論キーワード */}
      <div className="border-t border-gray-100 pt-6 mt-2">
        <div className="text-center mb-4">
          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full mb-2">
            🔬 発声理論キーワード
          </span>
          <p className="text-xs text-gray-500 leading-relaxed">
            一宮式が参照する解剖学・音響学の核心ワード
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {[
            {
              term: "骨盤底筋",
              reading: "こつばんていきん",
              summary: "横隔膜の「相棒」。横隔膜が下がるとき、骨盤底筋も連動して下降する。ここが働かないと呼吸の圧力が声に伝わらない。",
            },
            {
              term: "喉頭蓋",
              reading: "こうとうがい",
              summary: "喉の奥にある「フタ」。立ち上がると喉腔が広がり高音が出やすくなる。舌根が後退すると倒れ、詰まった声の原因になる。",
            },
            {
              term: "軟口蓋 / マスケラ",
              reading: "なんこうがい",
              summary: "軟口蓋が正しく閉じると声は「マスケラ（仮面の領域）」に自然と集まる。意識的に「当てる」と逆効果になる。",
            },
            {
              term: "シンガーズフォルマント",
              reading: "3kHz帯の倍音",
              summary: "プロの歌手が持つ「声の飛距離」の正体。3kHz付近の倍音が豊富な声はオーケストラを突き抜ける。訓練で獲得できる。",
            },
            {
              term: "頸長筋 / 大腰筋",
              reading: "けいちょうきん / だいようきん",
              summary: "骨盤から始まる大腰筋と、頸椎の深層にある頸長筋が連動。このラインが整うと舌根の力みが消え、発声の土台が生まれる。",
            },
          ].map((kw) => (
            <div key={kw.term} className="bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-sm text-gray-800">{kw.term}</span>
                <span className="text-xs text-gray-400">{kw.reading}</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{kw.summary}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-gray-400 mt-3 leading-relaxed">
          これらの詳細と実践的な使い方は体験レッスンでお伝えします
        </p>
      </div>
    </div>
  );
}
