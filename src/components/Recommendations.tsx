import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, AlertTriangle, Target, DollarSign } from "lucide-react";

const recommendations = [
  {
    type: "opportunity",
    icon: TrendingUp,
    title: "冷感カテゴリーへの技術投資を推奨",
    description: "「接触冷感」キーワードが95%成長で最高値。冷感持続時間への不満が45%あり、長時間持続技術の商品投入で差別化可能。",
    priority: "高",
    expectedReturn: "20-30%"
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "疲労回復機能の効果実証が急務",
    description: "効果実感への不満が42%と最多。着圧テクノロジーが89%成長する中、科学的根拠の強化と効果の見える化が競争力の鍵。",
    priority: "高",
    expectedReturn: "15-25%"
  },
  {
    type: "target",
    icon: Target,
    title: "睡眠改善市場への本格参入",
    description: "「メラトニン誘導」キーワードが84%成長。睡眠効果への不満（38%）があるが、評価は4.5点と高く、技術革新で市場リーダーになれる。",
    priority: "中",
    expectedReturn: "25-35%"
  },
  {
    type: "investment",
    icon: DollarSign,
    title: "美容カテゴリーの繊維技術強化",
    description: "「コスメティック繊維」が91%成長で急拡大。美容効果への不満（38%）を解決する高機能繊維で新市場創出が期待できる。",
    priority: "高",
    expectedReturn: "30-40%"
  },
  {
    type: "opportunity",
    icon: TrendingUp,
    title: "女性向けサイズ展開の拡充",
    description: "サイズ感への不満が35%と最多。マタニティ対応キーワードが82%成長しており、ライフステージ対応商品で市場拡大可能。",
    priority: "中",
    expectedReturn: "12-18%"
  }
];

function getTypeStyles(type: string) {
  switch (type) {
    case "opportunity":
      return { bg: "bg-green-50", border: "border-green-200", icon: "text-green-600" };
    case "warning":
      return { bg: "bg-yellow-50", border: "border-yellow-200", icon: "text-yellow-600" };
    case "target":
      return { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600" };
    case "investment":
      return { bg: "bg-purple-50", border: "border-purple-200", icon: "text-purple-600" };
    default:
      return { bg: "bg-gray-50", border: "border-gray-200", icon: "text-gray-600" };
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "高":
      return "bg-red-500";
    case "中":
      return "bg-yellow-500";
    case "低":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
}

export function Recommendations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>投資判断レコメンデーション</CardTitle>
        <CardDescription>機能性アパレル市場分析に基づく次のアクション提案</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const styles = getTypeStyles(rec.type);
            const IconComponent = rec.icon;
            
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border ${styles.bg} ${styles.border}`}
              >
                <div className="flex items-start gap-3">
                  <IconComponent className={`w-6 h-6 mt-1 ${styles.icon}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4>{rec.title}</h4>
                      <Badge className={`${getPriorityColor(rec.priority)} text-white border-0`}>
                        {rec.priority}優先度
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">期待収益率:</span>
                      <span className="font-medium text-green-600">{rec.expectedReturn}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}