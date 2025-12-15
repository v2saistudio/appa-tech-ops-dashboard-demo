import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";

// カテゴリーの定義
const categories = [
  { id: 'fatigue', name: '疲労回復', color: '#8884d8' },
  { id: 'sleep', name: '睡眠改善', color: '#82ca9d' },
  { id: 'women', name: '女性向け', color: '#ffc658' },
  { id: 'cooling', name: '冷感', color: '#ff7c7c' },
  { id: 'warming', name: '温感', color: '#8dd1e1' },
  { id: 'beauty', name: '美容', color: '#d084d0' }
];

// 月別評価データ（カテゴリーごと）
const ratingDataByMonth = {
  fatigue: {
    '3months': [
      { month: '4月', rating: 4.1 },
      { month: '5月', rating: 4.2 },
      { month: '6月', rating: 4.3 }
    ],
    '6months': [
      { month: '1月', rating: 4.0 },
      { month: '2月', rating: 4.1 },
      { month: '3月', rating: 4.0 },
      { month: '4月', rating: 4.1 },
      { month: '5月', rating: 4.2 },
      { month: '6月', rating: 4.3 }
    ],
    '12months': [
      { month: '7月', rating: 3.9 },
      { month: '8月', rating: 3.9 },
      { month: '9月', rating: 4.0 },
      { month: '10月', rating: 4.0 },
      { month: '11月', rating: 4.1 },
      { month: '12月', rating: 4.1 },
      { month: '1月', rating: 4.0 },
      { month: '2月', rating: 4.1 },
      { month: '3月', rating: 4.0 },
      { month: '4月', rating: 4.1 },
      { month: '5月', rating: 4.2 },
      { month: '6月', rating: 4.3 }
    ]
  },
  sleep: {
    '3months': [
      { month: '4月', rating: 4.4 },
      { month: '5月', rating: 4.5 },
      { month: '6月', rating: 4.5 }
    ],
    '6months': [
      { month: '1月', rating: 4.3 },
      { month: '2月', rating: 4.3 },
      { month: '3月', rating: 4.4 },
      { month: '4月', rating: 4.4 },
      { month: '5月', rating: 4.5 },
      { month: '6月', rating: 4.5 }
    ],
    '12months': [
      { month: '7月', rating: 4.2 },
      { month: '8月', rating: 4.2 },
      { month: '9月', rating: 4.2 },
      { month: '10月', rating: 4.3 },
      { month: '11月', rating: 4.3 },
      { month: '12月', rating: 4.3 },
      { month: '1月', rating: 4.3 },
      { month: '2月', rating: 4.3 },
      { month: '3月', rating: 4.4 },
      { month: '4月', rating: 4.4 },
      { month: '5月', rating: 4.5 },
      { month: '6月', rating: 4.5 }
    ]
  },
  women: {
    '3months': [
      { month: '4月', rating: 4.1 },
      { month: '5月', rating: 4.2 },
      { month: '6月', rating: 4.2 }
    ],
    '6months': [
      { month: '1月', rating: 4.0 },
      { month: '2月', rating: 4.1 },
      { month: '3月', rating: 4.1 },
      { month: '4月', rating: 4.1 },
      { month: '5月', rating: 4.2 },
      { month: '6月', rating: 4.2 }
    ],
    '12months': [
      { month: '7月', rating: 3.9 },
      { month: '8月', rating: 3.9 },
      { month: '9月', rating: 4.0 },
      { month: '10月', rating: 4.0 },
      { month: '11月', rating: 4.0 },
      { month: '12月', rating: 4.1 },
      { month: '1月', rating: 4.0 },
      { month: '2月', rating: 4.1 },
      { month: '3月', rating: 4.1 },
      { month: '4月', rating: 4.1 },
      { month: '5月', rating: 4.2 },
      { month: '6月', rating: 4.2 }
    ]
  },
  cooling: {
    '3months': [
      { month: '4月', rating: 4.0 },
      { month: '5月', rating: 4.1 },
      { month: '6月', rating: 4.1 }
    ],
    '6months': [
      { month: '1月', rating: 3.8 },
      { month: '2月', rating: 3.8 },
      { month: '3月', rating: 3.9 },
      { month: '4月', rating: 4.0 },
      { month: '5月', rating: 4.1 },
      { month: '6月', rating: 4.1 }
    ],
    '12months': [
      { month: '7月', rating: 4.2 },
      { month: '8月', rating: 4.3 },
      { month: '9月', rating: 4.1 },
      { month: '10月', rating: 3.9 },
      { month: '11月', rating: 3.7 },
      { month: '12月', rating: 3.7 },
      { month: '1月', rating: 3.8 },
      { month: '2月', rating: 3.8 },
      { month: '3月', rating: 3.9 },
      { month: '4月', rating: 4.0 },
      { month: '5月', rating: 4.1 },
      { month: '6月', rating: 4.1 }
    ]
  },
  warming: {
    '3months': [
      { month: '4月', rating: 4.3 },
      { month: '5月', rating: 4.4 },
      { month: '6月', rating: 4.4 }
    ],
    '6months': [
      { month: '1月', rating: 4.5 },
      { month: '2月', rating: 4.5 },
      { month: '3月', rating: 4.4 },
      { month: '4月', rating: 4.3 },
      { month: '5月', rating: 4.4 },
      { month: '6月', rating: 4.4 }
    ],
    '12months': [
      { month: '7月', rating: 3.9 },
      { month: '8月', rating: 3.9 },
      { month: '9月', rating: 4.0 },
      { month: '10月', rating: 4.2 },
      { month: '11月', rating: 4.4 },
      { month: '12月', rating: 4.5 },
      { month: '1月', rating: 4.5 },
      { month: '2月', rating: 4.5 },
      { month: '3月', rating: 4.4 },
      { month: '4月', rating: 4.3 },
      { month: '5月', rating: 4.4 },
      { month: '6月', rating: 4.4 }
    ]
  },
  beauty: {
    '3months': [
      { month: '4月', rating: 3.9 },
      { month: '5月', rating: 4.0 },
      { month: '6月', rating: 4.0 }
    ],
    '6months': [
      { month: '1月', rating: 3.9 },
      { month: '2月', rating: 3.9 },
      { month: '3月', rating: 3.9 },
      { month: '4月', rating: 3.9 },
      { month: '5月', rating: 4.0 },
      { month: '6月', rating: 4.0 }
    ],
    '12months': [
      { month: '7月', rating: 3.8 },
      { month: '8月', rating: 3.8 },
      { month: '9月', rating: 3.8 },
      { month: '10月', rating: 3.9 },
      { month: '11月', rating: 3.9 },
      { month: '12月', rating: 3.9 },
      { month: '1月', rating: 3.9 },
      { month: '2月', rating: 3.9 },
      { month: '3月', rating: 3.9 },
      { month: '4月', rating: 3.9 },
      { month: '5月', rating: 4.0 },
      { month: '6月', rating: 4.0 }
    ]
  }
};

// カテゴリーごとの部位別効果実感率
const effectivenessDataByCategory = {
  fatigue: [
    { bodyPart: '首・肩', value: 78 },
    { bodyPart: '腰', value: 82 },
    { bodyPart: '脚', value: 88 },
    { bodyPart: '全身', value: 75 },
    { bodyPart: '顔・肌', value: 58 }
  ],
  sleep: [
    { bodyPart: '首・肩', value: 72 },
    { bodyPart: '腰', value: 68 },
    { bodyPart: '脚', value: 65 },
    { bodyPart: '全身', value: 81 },
    { bodyPart: '顔・肌', value: 70 }
  ],
  women: [
    { bodyPart: '首・肩', value: 65 },
    { bodyPart: '腰', value: 71 },
    { bodyPart: '脚', value: 74 },
    { bodyPart: '全身', value: 68 },
    { bodyPart: '顔・肌', value: 72 }
  ],
  cooling: [
    { bodyPart: '首・肩', value: 82 },
    { bodyPart: '腰', value: 75 },
    { bodyPart: '脚', value: 79 },
    { bodyPart: '全身', value: 86 },
    { bodyPart: '顔・肌', value: 68 }
  ],
  warming: [
    { bodyPart: '首・肩', value: 85 },
    { bodyPart: '腰', value: 80 },
    { bodyPart: '脚', value: 77 },
    { bodyPart: '全身', value: 88 },
    { bodyPart: '顔・肌', value: 65 }
  ],
  beauty: [
    { bodyPart: '首・肩', value: 58 },
    { bodyPart: '腰', value: 52 },
    { bodyPart: '脚', value: 60 },
    { bodyPart: '全身', value: 71 },
    { bodyPart: '顔・肌', value: 89 }
  ]
};

// 返品率・クレーム率の月別推移データ（カテゴリーごと）
const returnComplaintDataByMonth = {
  fatigue: [
    { month: '7月', 返品率: 9.2, クレーム率: 2.5 },
    { month: '8月', 返品率: 9.0, クレーム率: 2.4 },
    { month: '9月', 返品率: 8.8, クレーム率: 2.4 },
    { month: '10月', 返品率: 8.7, クレーム率: 2.3 },
    { month: '11月', 返品率: 8.6, クレーム率: 2.3 },
    { month: '12月', 返品率: 8.5, クレーム率: 2.3 },
    { month: '1月', 返品率: 8.5, クレーム率: 2.3 },
    { month: '2月', 返品率: 8.4, クレーム率: 2.2 },
    { month: '3月', 返品率: 8.4, クレーム率: 2.2 },
    { month: '4月', 返品率: 8.5, クレーム率: 2.3 },
    { month: '5月', 返品率: 8.5, クレーム率: 2.3 },
    { month: '6月', 返品率: 8.5, クレーム率: 2.3 }
  ],
  sleep: [
    { month: '7月', 返品率: 6.8, クレーム率: 2.0 },
    { month: '8月', 返品率: 6.6, クレーム率: 1.9 },
    { month: '9月', 返品率: 6.5, クレーム率: 1.9 },
    { month: '10月', 返品率: 6.4, クレーム率: 1.9 },
    { month: '11月', 返品率: 6.3, クレーム率: 1.8 },
    { month: '12月', 返品率: 6.2, クレーム率: 1.8 },
    { month: '1月', 返品率: 6.2, クレーム率: 1.8 },
    { month: '2月', 返品率: 6.2, クレーム率: 1.8 },
    { month: '3月', 返品率: 6.1, クレーム率: 1.8 },
    { month: '4月', 返品率: 6.2, クレーム率: 1.8 },
    { month: '5月', 返品率: 6.2, クレーム率: 1.8 },
    { month: '6月', 返品率: 6.2, クレーム率: 1.8 }
  ],
  women: [
    { month: '7月', 返品率: 12.0, クレーム率: 3.3 },
    { month: '8月', 返品率: 11.8, クレーム率: 3.2 },
    { month: '9月', 返品率: 11.6, クレーム率: 3.2 },
    { month: '10月', 返品率: 11.5, クレーム率: 3.1 },
    { month: '11月', 返品率: 11.4, クレーム率: 3.1 },
    { month: '12月', 返品率: 11.3, クレーム率: 3.1 },
    { month: '1月', 返品率: 11.3, クレーム率: 3.1 },
    { month: '2月', 返品率: 11.2, クレーム率: 3.0 },
    { month: '3月', 返品率: 11.3, クレーム率: 3.1 },
    { month: '4月', 返品率: 11.3, クレーム率: 3.1 },
    { month: '5月', 返品率: 11.3, クレーム率: 3.1 },
    { month: '6月', 返品率: 11.3, クレーム率: 3.1 }
  ],
  cooling: [
    { month: '7月', 返品率: 8.5, クレーム率: 2.5 },
    { month: '8月', 返品率: 8.8, クレーム率: 2.6 },
    { month: '9月', 返品率: 9.2, クレーム率: 2.7 },
    { month: '10月', 返品率: 9.5, クレーム率: 2.8 },
    { month: '11月', 返品率: 9.7, クレーム率: 2.8 },
    { month: '12月', 返品率: 9.8, クレーム率: 2.9 },
    { month: '1月', 返品率: 9.8, クレーム率: 2.9 },
    { month: '2月', 返品率: 9.8, クレーム率: 2.9 },
    { month: '3月', 返品率: 9.9, クレーム率: 2.9 },
    { month: '4月', 返品率: 9.8, クレーム率: 2.9 },
    { month: '5月', 返品率: 9.8, クレーム率: 2.9 },
    { month: '6月', 返品率: 9.8, クレーム率: 2.9 }
  ],
  warming: [
    { month: '7月', 返品率: 8.5, クレーム率: 2.4 },
    { month: '8月', 返品率: 8.3, クレーム率: 2.3 },
    { month: '9月', 返品率: 8.0, クレーム率: 2.2 },
    { month: '10月', 返品率: 7.5, クレーム率: 2.1 },
    { month: '11月', 返品率: 7.2, クレーム率: 2.0 },
    { month: '12月', 返品率: 7.1, クレーム率: 2.0 },
    { month: '1月', 返品率: 7.1, クレーム率: 2.0 },
    { month: '2月', 返品率: 7.0, クレーム率: 2.0 },
    { month: '3月', 返品率: 7.1, クレーム率: 2.0 },
    { month: '4月', 返品率: 7.2, クレーム率: 2.0 },
    { month: '5月', 返品率: 7.1, クレーム率: 2.0 },
    { month: '6月', 返品率: 7.1, クレーム率: 2.0 }
  ],
  beauty: [
    { month: '7月', 返品率: 11.2, クレーム率: 2.7 },
    { month: '8月', 返品率: 11.0, クレーム率: 2.6 },
    { month: '9月', 返品率: 10.8, クレーム率: 2.6 },
    { month: '10月', 返品率: 10.6, クレーム率: 2.5 },
    { month: '11月', 返品率: 10.5, クレーム率: 2.5 },
    { month: '12月', 返品率: 10.5, クレーム率: 2.5 },
    { month: '1月', 返品率: 10.5, クレーム率: 2.5 },
    { month: '2月', 返品率: 10.5, クレーム率: 2.5 },
    { month: '3月', 返品率: 10.4, クレーム率: 2.5 },
    { month: '4月', 返品率: 10.5, クレーム率: 2.5 },
    { month: '5月', 返品率: 10.5, クレーム率: 2.5 },
    { month: '6月', 返品率: 10.5, クレーム率: 2.5 }
  ]
};

// 各カテゴリー別の不満要因円グラフデータ
const complaintPieData: { [key: string]: any[] } = {
  fatigue: [
    { name: 'サイズ', value: 18, color: '#3b82f6' },
    { name: '生地', value: 22, color: '#10b981' },
    { name: 'デザイン', value: 12, color: '#f59e0b' },
    { name: '効果不足', value: 42, color: '#ef4444' },
    { name: '価格', value: 6, color: '#8b5cf6' }
  ],
  sleep: [
    { name: 'サイズ', value: 15, color: '#3b82f6' },
    { name: '生地', value: 28, color: '#10b981' },
    { name: 'デザイン', value: 14, color: '#f59e0b' },
    { name: '効果不足', value: 38, color: '#ef4444' },
    { name: '価格', value: 5, color: '#8b5cf6' }
  ],
  women: [
    { name: 'サイズ', value: 35, color: '#3b82f6' },
    { name: '生地', value: 20, color: '#10b981' },
    { name: 'デザイン', value: 28, color: '#f59e0b' },
    { name: '効果不足', value: 12, color: '#ef4444' },
    { name: '価格', value: 5, color: '#8b5cf6' }
  ],
  cooling: [
    { name: 'サイズ', value: 12, color: '#3b82f6' },
    { name: '生地', value: 18, color: '#10b981' },
    { name: 'デザイン', value: 10, color: '#f59e0b' },
    { name: '効果不足', value: 45, color: '#ef4444' },
    { name: '価格', value: 15, color: '#8b5cf6' }
  ],
  warming: [
    { name: 'サイズ', value: 14, color: '#3b82f6' },
    { name: '生地', value: 25, color: '#10b981' },
    { name: 'デザイン', value: 11, color: '#f59e0b' },
    { name: '効果不足', value: 40, color: '#ef4444' },
    { name: '価格', value: 10, color: '#8b5cf6' }
  ],
  beauty: [
    { name: 'サイズ', value: 10, color: '#3b82f6' },
    { name: '生地', value: 25, color: '#10b981' },
    { name: 'デザイン', value: 20, color: '#f59e0b' },
    { name: '効果不足', value: 38, color: '#ef4444' },
    { name: '価格', value: 7, color: '#8b5cf6' }
  ]
};

// カスタムツールチップ
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-blue-600">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

// カテゴリーごとのレビュー
const reviewsByCategory = {
  fatigue: {
    positive: [
      { text: "着圧レギンスを着けて寝たら、翌朝の足のむくみが全然違います！段階圧力設計がすごく効いてる感じがします。", rating: 5 },
      { text: "疲労回復効果を実感できました。仕事���の足の疲れが軽減されています。", rating: 5 }
    ],
    negative: [
      { text: "効果を実感できませんでした。科学的根拠がもっと欲しいです。", rating: 2 },
      { text: "価格の割に効果が薄い気がします。", rating: 2 }
    ]
  },
  sleep: {
    positive: [
      { text: "深眠サポートパジャマを使い始めて2週間。入眠が早くなり、朝まで熟睡できるようになりました。", rating: 5 },
      { text: "睡眠の質が明らかに向上しました。朝の目覚めがスッキリです。", rating: 5 }
    ],
    negative: [
      { text: "期待していたほど効果を感じられませんでした。", rating: 2 },
      { text: "洗濯すると効果が落ちる気がします。", rating: 3 }
    ]
  },
  women: {
    positive: [
      { text: "女性特有の悩みに配慮した設計で、快適に過ごせています。", rating: 5 },
      { text: "デザインも機能性も両立していて満足です。", rating: 4 }
    ],
    negative: [
      { text: "サイズが合わず返品。もっと細かいサイズ展開があれば良かった。", rating: 2 },
      { text: "価格が高めなのが難点です。", rating: 3 }
    ]
  },
  cooling: {
    positive: [
      { text: "夏場の暑い時期でも快適に過ごせます。冷感効果が持続します。", rating: 5 },
      { text: "接触冷感が本当に気持ちいい。夏の必需品です。", rating: 5 }
    ],
    negative: [
      { text: "最初の1時間は冷たいけど、その後は普通の生地と変わらない。8時間冷感は過大広告では？", rating: 2 },
      { text: "洗濯を繰り返すと冷感効果が弱まる気がします。", rating: 3 }
    ]
  },
  warming: {
    positive: [
      { text: "発熱効果がしっかり感じられます。冬の寒い日でも暖かく過ごせました。", rating: 5 },
      { text: "薄手なのに暖かい。重ね着が不要になりました。", rating: 5 }
    ],
    negative: [
      { text: "暖かすぎて汗をかいてしまいました。温度調節が難しい。", rating: 3 },
      { text: "静電気が発生しやすいのが気になります。", rating: 3 }
    ]
  },
  beauty: {
    positive: [
      { text: "コラーゲン配合繊維のフェイスマスクは肌のしっとり感が違います。毎日使いたいです。", rating: 5 },
      { text: "肌触りが良く、美容効果も実感できています。", rating: 5 }
    ],
    negative: [
      { text: "美容効果は感じられませんでした。普通の製品と変わらない。", rating: 2 },
      { text: "価格が高すぎます。コスパが悪いと感じました。", rating: 2 }
    ]
  }
};

// カテゴリー別コンポーネント
function CategorySection({ category }: { category: typeof categories[0] }) {
  const [selectedPeriod, setSelectedPeriod] = useState<'3months' | '6months' | '12months'>('12months');
  
  const categoryKey = category.id as keyof typeof ratingDataByMonth;
  const ratingData = ratingDataByMonth[categoryKey][selectedPeriod];
  const effectivenessData = effectivenessDataByCategory[categoryKey];
  const reviews = reviewsByCategory[categoryKey];
  const returnComplaintData = returnComplaintDataByMonth[categoryKey];
  const complaintData = complaintPieData[categoryKey];

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <h3 className="font-medium text-gray-900 mb-4" style={{ color: category.color }}>
        {category.name}
      </h3>
      
      {/* 左右2カラム：評価グラフとレーダーチャート */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 左：月別評価推移 */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700">機能別商品評価（平均星評価）</h4>
            <div className="flex gap-1 bg-gray-100 rounded-md p-1">
              <button
                onClick={() => setSelectedPeriod('3months')}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  selectedPeriod === '3months'
                    ? 'bg-white shadow-sm font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                3ヶ月
              </button>
              <button
                onClick={() => setSelectedPeriod('6months')}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  selectedPeriod === '6months'
                    ? 'bg-white shadow-sm font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                6ヶ月
              </button>
              <button
                onClick={() => setSelectedPeriod('12months')}
                className={`px-3 py-1 text-xs rounded transition-all ${
                  selectedPeriod === '12months'
                    ? 'bg-white shadow-sm font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                12ヶ月
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[3.5, 5]} label={{ value: '評価点', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Line type="monotone" dataKey="rating" stroke={category.color} strokeWidth={2} dot={{ fill: category.color, r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 右：効果実感率（レーダーチャート） */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">効果実感率（部位別・%）</h4>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={effectivenessData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="bodyPart" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name={category.name} dataKey="value" stroke={category.color} fill={category.color} fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 返品率・クレーム率と不満要因 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 左：返品率・クレーム率の月別推移 */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            返品率・クレーム率の月別推移
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={returnComplaintData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 15]} label={{ value: '率 (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="返品率" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', r: 4 }} />
              <Line type="monotone" dataKey="クレーム率" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 右：不満要因の詳細（円グラフ） */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">不満要因の詳細（円グラフ）</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={complaintData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {complaintData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* レビュー */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-900 mb-3 flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" />
            ポジティブレビュー（代表例）
          </h4>
          <div className="space-y-3">
            {reviews.positive.map((review, index) => (
              <div key={index} className="bg-white p-3 rounded border border-green-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-medium text-red-900 mb-3 flex items-center gap-2">
            <ThumbsDown className="w-4 h-4" />
            ネガティブレビュー（代表例）
          </h4>
          <div className="space-y-3">
            {reviews.negative.map((review, index) => (
              <div key={index} className="bg-white p-3 rounded border border-red-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <span key={i} className="text-gray-300">★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductEvaluationChart() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const currentCategory = categories.find(cat => cat.id === selectedCategory) || categories[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>機能別商品評価 & 効果実感率</CardTitle>
        <CardDescription>星評価・効果実感率・代表レビューのカテゴリー別分析</CardDescription>
      </CardHeader>
      <CardContent>
        {/* セグメンテッドコントロール */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-md transition-all text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                style={{
                  color: selectedCategory === category.id ? category.color : undefined
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* 選択されたカテゴリーのセクション */}
        <CategorySection category={currentCategory} />
      </CardContent>
    </Card>
  );
}
