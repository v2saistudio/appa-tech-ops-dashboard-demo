import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { AlertCircle } from "lucide-react";

const opportunityKeywords = [
  {
    keyword: "接触冷感マスク",
    category: "冷感",
    opportunity: "高",
    reason: "夏場の感染対策需要",
    searchVolume: 13200,
    productCount: 15,
    averageRating: 3.2,
    strategy: "低評価レビューを参考に新商品開発",
    type: "high-demand-low-rating"
  },
  {
    keyword: "美容繊維パジャマ",
    category: "美容",
    opportunity: "高",
    reason: "美容意識向上トレンド",
    searchVolume: 12300,
    productCount: 8,
    averageRating: 3.4,
    strategy: "新しい機能性アパレルの開発",
    type: "high-demand-low-rating"
  },
  {
    keyword: "深眠サポートパジャマ",
    category: "睡眠改善",
    opportunity: "高",
    reason: "睡眠の質改善需要増",
    searchVolume: 14300,
    productCount: 18,
    averageRating: 3.3,
    strategy: "既存商品の機能強化版を開発",
    type: "high-demand-low-rating"
  },
  {
    keyword: "姿勢矯正インナー",
    category: "疲労回復",
    opportunity: "高",
    reason: "テレワーク普及で姿勢問題深刻化",
    searchVolume: 11800,
    productCount: 15,
    averageRating: 3.1,
    strategy: "低評価レビューを参考に新商品開発",
    type: "high-demand-low-rating"
  },
  {
    keyword: "着圧ソックス",
    category: "疲労回復",
    opportunity: "高",
    reason: "商品数は多いが品質不満が多い",
    searchVolume: 15800,
    productCount: 52,
    averageRating: 3.3,
    strategy: "既存商品の品質問題を解決した高品質版を開発",
    type: "high-demand-low-rating"
  },
  {
    keyword: "発熱保温インナー",
    category: "温感",
    opportunity: "高",
    reason: "大手参入も低評価商品多数",
    searchVolume: 16200,
    productCount: 48,
    averageRating: 3.4,
    strategy: "低評価レビュー分析で差別化ポイントを発見",
    type: "high-demand-low-rating"
  },
  {
    keyword: "コスメティック繊維",
    category: "美容",
    opportunity: "中",
    reason: "美容アパレル市場拡大",
    searchVolume: 8400,
    productCount: 8,
    averageRating: 3.8,
    strategy: "新しい機能性アパレルの開発",
    type: "high-demand-low-supply"
  },
  {
    keyword: "産後用着圧レギンス",
    category: "女性向け",
    opportunity: "中",
    reason: "産後ケア市場の成長",
    searchVolume: 7000,
    productCount: 9,
    averageRating: 3.6,
    strategy: "専門性の高い商品開発",
    type: "high-demand-low-supply"
  },
  {
    keyword: "メラトニン誘導パジャマ",
    category: "睡眠改善",
    opportunity: "中",
    reason: "科学的根拠のある商品への関心",
    searchVolume: 6800,
    productCount: 12,
    averageRating: 3.7,
    strategy: "エビデンスベース商品の開発",
    type: "high-demand-low-supply"
  },
  {
    keyword: "静電気防止インナー",
    category: "美容",
    opportunity: "中",
    reason: "乾燥季節の定期需要",
    searchVolume: 5200,
    productCount: 5,
    averageRating: 3.9,
    strategy: "季節商品ラインナップ拡充",
    type: "high-demand-low-supply"
  },
  {
    keyword: "着圧レギンス",
    category: "疲労回復",
    opportunity: "低",
    reason: "既存市場成熟",
    searchVolume: 18200,
    productCount: 78,
    averageRating: 4.5,
    strategy: "差別化戦略でシェア拡大",
    type: "normal"
  },
  {
    keyword: "姿勢補正ベルト",
    category: "女性向け",
    opportunity: "低",
    reason: "競合商品多数",
    searchVolume: 10500,
    productCount: 34,
    averageRating: 4.2,
    strategy: "既存商品の改良継続",
    type: "normal"
  }
];

function getColorByOpportunity(opportunity: string) {
  switch (opportunity) {
    case "高":
      return "#ef4444"; // 赤 - 高機会
    case "中":
      return "#f97316"; // オレンジ - 中機会
    case "低":
      return "#22c55e"; // グリーン - 低機会
    default:
      return "#3b82f6"; // 青
  }
}

// 評価と商品数から色を判定する関数
function getColorByRatingAndSupply(rating: number, productCount: number) {
  // 評価が低い（3.5点未満）場合は赤（品質改善機会）
  if (rating < 3.5) {
    return "#ef4444"; // 赤
  }
  // 評価は高いが商品数が少ない（20件未満）場合はオレンジ（供給不足）
  if (productCount < 20) {
    return "#f97316"; // オレンジ
  }
  // それ以外は青（通常）
  return "#3b82f6"; // 青
}

function getOpportunityBgColor(opportunity: string) {
  switch (opportunity) {
    case "高":
      return "bg-red-50 border-red-200";
    case "中":
      return "bg-orange-50 border-orange-200";
    case "低":
      return "bg-green-50 border-green-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}

function getOpportunityBadgeColor(opportunity: string) {
  switch (opportunity) {
    case "高":
      return "bg-red-500 text-white border-0";
    case "中":
      return "bg-orange-500 text-white border-0";
    case "低":
      return "bg-green-500 text-white border-0";
    default:
      return "bg-gray-500 text-white border-0";
  }
}

const CustomTooltipCVR = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium mb-2">{data.keyword}</p>
        <div className="space-y-1 text-sm">
          <p>検索数: {data.searchVolume.toLocaleString()}回/月</p>
          <p>商品数: {data.productCount}件</p>
          <p>CVR: {data.cvr}%</p>
          <Badge className="mt-1">{data.category}</Badge>
        </div>
      </div>
    );
  }
  return null;
};

const CustomTooltipSupply = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium mb-2">{data.keyword}</p>
        <div className="space-y-1 text-sm">
          <p>検索数: {data.searchVolume.toLocaleString()}回/月</p>
          <p>商品数: {data.productCount}件</p>
          <p>平均評価: {data.averageRating}点</p>
          <Badge className="mt-1">{data.category}</Badge>
        </div>
      </div>
    );
  }
  return null;
};

export function ProductDevelopmentOpportunity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          新商品開発の機会発見
        </CardTitle>
        <CardDescription>
          高需要×低評価 / 高需要×供給薄のキーワード分析
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* グラフ凡例 */}
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>高需要×低評価（品質改善機会）</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span>高需要×供給薄（新商品開発機会）</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>通常</span>
          </div>
        </div>

        {/* 商品開発機会ギャップマップ（全幅） */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">商品開発機会ギャップマップ（供給率）</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="productCount" 
                name="商品数"
                label={{ value: '商品数', position: 'insideBottom', offset: -10 }}
                domain={[0, 80]}
              />
              <YAxis 
                type="number" 
                dataKey="searchVolume" 
                name="検索数"
                label={{ value: '検索数', angle: -90, position: 'insideLeft' }}
                domain={[0, 20000]}
              />
              <ZAxis type="number" dataKey="productCount" range={[100, 800]} />
              <Tooltip content={<CustomTooltipSupply />} />
              <Scatter 
                data={opportunityKeywords}
                cursor="pointer"
              >
                {opportunityKeywords.map((entry, index) => (
                  <Cell key={`cell-supply-${index}`} fill={getColorByRatingAndSupply(entry.averageRating, entry.productCount)} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* 優先対応キーワード */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">優先対応キーワード</h3>
          <div className="space-y-3">
            {opportunityKeywords.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getOpportunityBgColor(item.opportunity)}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                  {/* 商品名とカテゴリー */}
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium">{item.keyword}</h4>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  {/* 機会レベル */}
                  <div className="md:col-span-1">
                    <Badge className={`${getOpportunityBadgeColor(item.opportunity)} text-xs`}>
                      {item.opportunity}機会
                    </Badge>
                  </div>

                  {/* 検索数増加要因 */}
                  <div className="md:col-span-3">
                    <p className="text-sm text-gray-600">{item.reason}</p>
                  </div>

                  {/* KPI指標 */}
                  <div className="md:col-span-5">
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500 block text-xs">検索数</span>
                        <span className="font-medium">{(item.searchVolume / 1000).toFixed(1)}K</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">市場商品数</span>
                        <span className="font-medium">{item.productCount}件</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-xs">平均評価</span>
                        <span className={`font-medium ${item.averageRating < 3.5 ? 'text-red-600' : 'text-green-600'}`}>
                          {item.averageRating}点
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 方針 */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">方針:</span>
                    <p className="text-sm font-medium text-gray-700">{item.strategy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 分析のポイント */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-2">分析のポイント</h4>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>
              <span className="font-medium">🔴 赤色（高機会）：</span>
              平均評価3.5点未満のキーワード。商品数に関わらず、既存商品の品質が需要に追いついていない可能性が高く、品質改善や差別化した新商品開発の優先度が高い。
            </li>
            <li>
              <span className="font-medium">🟠 オレンジ色（中機会）：</span>
              評価は3.5点以上だが商品数が20件未満のキーワード。供給不足のため新商品開発で市場シェアを獲得できる可能性がある。
            </li>
            <li>
              <span className="font-medium">🔵 青色（通常）：</span>
              評価3.5点以上かつ商品数が20件以上のキーワード。市場が成熟しているため、差別化戦略が必要。
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}