import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, Star, Package } from "lucide-react";

const rapidGrowthProducts = [
  {
    productName: "リカバリー着圧レギンス Pro",
    category: "疲労回復",
    currentSales: 2850,
    previousSales: 180,
    growthRate: 1483,
    rating: 4.6,
    reviewCount: 892,
    keyFeature: "段階圧力設計",
    trend: "急上昇"
  },
  {
    productName: "クール睡眠インナー MAX",
    category: "冷感",
    currentSales: 1920,
    previousSales: 240,
    growthRate: 700,
    rating: 4.4,
    reviewCount: 567,
    keyFeature: "8時間冷感持続",
    trend: "急上昇"
  },
  {
    productName: "美容繊維フェイスマスク",
    category: "美容",
    currentSales: 1650,
    previousSales: 95,
    growthRate: 1637,
    rating: 4.7,
    reviewCount: 423,
    keyFeature: "コラーゲン配合繊維",
    trend: "爆発的"
  },
  {
    productName: "姿勢サポートブラトップ",
    category: "女性向け",
    currentSales: 1480,
    previousSales: 320,
    growthRate: 363,
    rating: 4.3,
    reviewCount: 1205,
    keyFeature: "背筋矯正機能",
    trend: "上昇"
  },
  {
    productName: "発熱保温アンダーシャツ",
    category: "温感",
    currentSales: 1280,
    previousSales: 150,
    growthRate: 753,
    rating: 4.5,
    reviewCount: 678,
    keyFeature: "体温+3℃キープ",
    trend: "急上昇"
  },
  {
    productName: "深眠サポートパジャマ",
    category: "睡眠改善",
    currentSales: 990,
    previousSales: 45,
    growthRate: 2100,
    rating: 4.8,
    reviewCount: 234,
    keyFeature: "メラトニン誘導繊維",
    trend: "爆発的"
  }
];

function getTrendColor(trend: string) {
  switch (trend) {
    case "爆発的":
      return "bg-red-500";
    case "急上昇":
      return "bg-orange-500";
    case "上昇":
      return "bg-yellow-500";
    default:
      return "bg-green-500";
  }
}

function getTrendBgColor(trend: string) {
  switch (trend) {
    case "爆発的":
      return "bg-red-50 border-red-200";
    case "急上昇":
      return "bg-orange-50 border-orange-200";
    case "上昇":
      return "bg-yellow-50 border-yellow-200";
    default:
      return "bg-green-50 border-green-200";
  }
}

export function RapidGrowthProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          急成長商品一覧
        </CardTitle>
        <CardDescription>
          前月比売上成長率300%以上の商品（成長要因分析付き）
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {rapidGrowthProducts.map((product, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getTrendBgColor(product.trend)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{product.productName}</h4>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <Badge className={`${getTrendColor(product.trend)} text-white border-0 text-xs`}>
                      {product.trend}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    特徴: {product.keyFeature}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm mb-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{product.rating}</span>
                    <span className="text-gray-500">({product.reviewCount})</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Package className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">現在売上:</span>
                  </div>
                  <p className="font-medium">{product.currentSales.toLocaleString()}個/月</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">前月売上:</span>
                  </div>
                  <p className="font-medium text-gray-600">{product.previousSales.toLocaleString()}個/月</p>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">成長率:</span>
                  </div>
                  <p className="font-medium text-green-600">+{product.growthRate}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">成長トレンド分析</h4>
          <div className="space-y-2 text-sm text-green-800">
            <p>• <strong>爆発的成長(1000%+)</strong>: 新技術や機能の市場受容が高い商品</p>
            <p>• <strong>急上昇(500-999%)</strong>: 季節要因や話題性による急成長商品</p>
            <p>• <strong>上昇(300-499%)</strong>: 安定した需要増加を示す商品</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}