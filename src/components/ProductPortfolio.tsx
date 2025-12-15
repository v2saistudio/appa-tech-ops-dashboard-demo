import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, Star, Package, Target, Filter } from "lucide-react";
import { useState } from "react";

const portfolioProducts = [
  {
    productName: "美容繊維フェイスマスク",
    category: "美容",
    sales: 1650,
    grossMargin: 58,
    growthRate: 1637,
    rating: 4.7,
    reviewCount: 423,
    portfolioTag: "スター",
    lifecycleStage: "成長期",
    investmentPriority: 1
  },
  {
    productName: "深眠サポートパジャマ",
    category: "睡眠改善",
    sales: 990,
    grossMargin: 62,
    growthRate: 2100,
    rating: 4.8,
    reviewCount: 234,
    portfolioTag: "成長期待",
    lifecycleStage: "導入期",
    investmentPriority: 2
  },
  {
    productName: "リカバリー着圧レギンス Pro",
    category: "疲労回復",
    sales: 2850,
    grossMargin: 52,
    growthRate: 1483,
    rating: 4.6,
    reviewCount: 892,
    portfolioTag: "スター",
    lifecycleStage: "成長期",
    investmentPriority: 3
  },
  {
    productName: "発熱保温アンダーシャツ",
    category: "温感",
    sales: 1280,
    grossMargin: 48,
    growthRate: 753,
    rating: 4.5,
    reviewCount: 678,
    portfolioTag: "成長期待",
    lifecycleStage: "成長期",
    investmentPriority: 4
  },
  {
    productName: "クール睡眠インナー MAX",
    category: "冷感",
    sales: 1920,
    grossMargin: 45,
    growthRate: 700,
    rating: 4.4,
    reviewCount: 567,
    portfolioTag: "収穫",
    lifecycleStage: "成熟期",
    investmentPriority: 5
  },
  {
    productName: "姿勢サポートブラトップ",
    category: "女性向け",
    sales: 1480,
    grossMargin: 50,
    growthRate: 363,
    rating: 4.3,
    reviewCount: 1205,
    portfolioTag: "収穫",
    lifecycleStage: "成熟期",
    investmentPriority: 6
  },
  {
    productName: "基本着圧ソックス",
    category: "疲労回復",
    sales: 850,
    grossMargin: 38,
    growthRate: 15,
    rating: 3.8,
    reviewCount: 2341,
    portfolioTag: "撤退候補",
    lifecycleStage: "衰退期",
    investmentPriority: 7
  },
  {
    productName: "旧型温感インナー",
    category: "温感",
    sales: 420,
    grossMargin: 32,
    growthRate: -25,
    rating: 3.5,
    reviewCount: 1876,
    portfolioTag: "撤退候補",
    lifecycleStage: "衰退期",
    investmentPriority: 8
  }
];

function getPortfolioTagColor(tag: string) {
  switch (tag) {
    case "スター":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "成長期待":
      return "bg-green-100 text-green-800 border-green-300";
    case "収穫":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "撤退候補":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

function getLifecycleStageColor(stage: string) {
  switch (stage) {
    case "導入期":
      return "bg-blue-500 text-white";
    case "成長期":
      return "bg-green-500 text-white";
    case "成熟期":
      return "bg-gray-500 text-white";
    case "衰退期":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-400 text-white";
  }
}

export function ProductPortfolio() {
  const [stageFilter, setStageFilter] = useState<string>("全て");
  
  const stages = ["全て", "導入期", "成長期", "成熟期", "衰退期"];
  
  const filteredProducts = stageFilter === "全て" 
    ? portfolioProducts 
    : portfolioProducts.filter(p => p.lifecycleStage === stageFilter);

  return (
    <div className="space-y-6">
      {/* 商品一覧テーブル */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                成長商品ポートフォリオ
              </CardTitle>
              <CardDescription>
                商品別売上・粗利・成長率・ライフサイクルステージ分析
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex gap-1">
                {stages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setStageFilter(stage)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      stageFilter === stage
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm">タグ</th>
                  <th className="text-left py-3 px-2 text-sm">商品名</th>
                  <th className="text-left py-3 px-2 text-sm">カテゴリ</th>
                  <th className="text-right py-3 px-2 text-sm">売上</th>
                  <th className="text-right py-3 px-2 text-sm">粗利率</th>
                  <th className="text-right py-3 px-2 text-sm">成長率</th>
                  <th className="text-center py-3 px-2 text-sm">評価</th>
                  <th className="text-center py-3 px-2 text-sm">ステージ</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2">
                      <Badge className={`${getPortfolioTagColor(product.portfolioTag)} border text-xs`}>
                        {product.portfolioTag}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        {product.investmentPriority <= 3 && (
                          <Target className="w-4 h-4 text-purple-500" />
                        )}
                        <span className="font-medium">{product.productName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-sm text-gray-600">{product.category}</td>
                    <td className="py-3 px-2 text-right">{product.sales.toLocaleString()}個</td>
                    <td className="py-3 px-2 text-right">
                      <span className={product.grossMargin >= 50 ? "text-green-600" : ""}>
                        {product.grossMargin}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right">
                      <span className={`${
                        product.growthRate > 500 ? "text-green-600" : 
                        product.growthRate > 0 ? "text-blue-600" : "text-red-600"
                      }`}>
                        {product.growthRate > 0 ? "+" : ""}{product.growthRate}%
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{product.rating}</span>
                        <span className="text-xs text-gray-500">({product.reviewCount})</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex justify-center">
                        <Badge className={`${getLifecycleStageColor(product.lifecycleStage)} border-0 text-xs`}>
                          {product.lifecycleStage}
                        </Badge>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              該当する商品がありません
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
