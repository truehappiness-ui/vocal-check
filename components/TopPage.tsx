"use client";

interface Props {
  onStart: () => void;
}

export default function TopPage({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <div className="gradient-primary text-white px-6 pt-16 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-32 h-32 rounded-full bg-white" />
          <div className="absolute bottom-8 right-8 w-48 h-48 rounded-full bg-white" />
        </div>
        <div className="relative z-10 max-w-md mx-auto">
          <p className="text-sm font-medium tracking-widest opacity-80 mb-3 uppercase">
            True Happiness Music School
          </p>
          <h1 className="text-3xl font-bold leading-tight mb-4">
            AIボーカル診断
          </h1>
          <div className="text-5xl mb-6">🎤</div>
          <p className="text-xl font-semibold mb-2">
            あなたの歌の現在地を知ろう
          </p>
          <p className="text-sm opacity-80 leading-relaxed">
            強み・課題・成長の方向性を
            <br />
            AIが丁寧に分析します
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white px-6 py-10 max-w-md mx-auto w-full">
        {/* Steps */}
        <div className="mb-10">
          <p className="text-center text-sm font-semibold text-gray-500 mb-6 tracking-wide uppercase">
            診断の流れ
          </p>
          <div className="space-y-4">
            {[
              { step: "01", icon: "📝", title: "質問診断", desc: "13問の選択式アンケートに回答（約3分）" },
              { step: "02", icon: "🎙️", title: "音声診断", desc: "2つの短い録音テスト（約2分）" },
              { step: "03", icon: "✨", title: "診断結果", desc: "あなたのボーカルタイプと成長プランを表示" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 p-4 rounded-2xl bg-[#f8f7ff]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white text-sm font-bold">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{item.icon}</span>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supervisor */}
        <div className="card-shadow rounded-2xl p-5 mb-8 border border-gray-100">
          <p className="text-xs text-gray-400 mb-3 font-medium">監修</p>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center text-2xl text-white flex-shrink-0">
              👨‍🎤
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">一宮光輝</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                シンガーソングライター / ボイストレーナー
                <br />
                音楽スクールTrue Happiness代表
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { num: "2,000名+", label: "指導実績" },
              { num: "2,000本+", label: "ライブ本数" },
              { num: "520万+", label: "YouTube再生" },
              { num: "47都道府県", label: "ツアー完走" },
            ].map((s) => (
              <div key={s.label} className="bg-[#f8f7ff] rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-[#6c4fc0]">{s.num}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 space-y-1.5">
            {[
              "🎬 YouTube「歌ラボ」ASKA本人から高評価",
              "🎵 日本マクドナルドCM歌唱 / NHKテーマソング制作",
              "🏆 吉本興業主催オーディション優勝",
            ].map((item) => (
              <p key={item} className="text-xs text-gray-500 text-center">{item}</p>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button onClick={onStart} className="btn-primary w-full text-lg py-4 mb-4">
          無料で診断スタート
        </button>
        <p className="text-center text-xs text-gray-400">
          所要時間：約5分 ・ 無料 ・ 登録不要
        </p>
      </div>
    </div>
  );
}
