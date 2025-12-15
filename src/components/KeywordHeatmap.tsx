import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const keywordData = [
  { keyword: "着圧テクノロジー", category: "疲労回復", growth: 89, isNew: true },
  { keyword: "睡眠時着用", category: "睡眠改善", growth: 76, isNew: true },
  { keyword: "マタニティ対応", category: "女性向け", growth: 82, isNew: true },
  { keyword: "接触冷感", category: "冷感", growth: 95, isNew: true },
  { keyword: "蓄熱保温", category: "温感", growth: 68, isNew: false },
  { keyword: "コラーゲン繊維", category: "美容", growth: 73, isNew: true },
  { keyword: "リカバリーウェア", category: "疲労回復", growth: 62, isNew: false },
  { keyword: "メラトニン誘導", category: "睡眠改善", growth: 84, isNew: true },
  { keyword: "骨盤サポート", category: "女性向け", growth: 58, isNew: false },
  { keyword: "遮熱機能", category: "冷感", growth: 71, isNew: false },
  { keyword: "発熱繊維", category: "温感", growth: 45, isNew: false },
  { keyword: "コスメティック繊維", category: "美容", growth: 91, isNew: true }
];

function getIntensityColor(growth: number) {
  if (growth >= 80) return "bg-red-500/80";
  if (growth >= 60) return "bg-orange-500/70";
  if (growth >= 40) return "bg-yellow-500/60";
  return "bg-green-500/50";
}

export function KeywordHeatmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>新機能キーワード検出</CardTitle>
        <CardDescription>検索量増加率の高い機能性アパレル関連キーワード（濃い色ほど高成長）</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {keywordData.map((item, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${getIntensityColor(item.growth)} text-white relative`}
            >
              {item.isNew && (
                <Badge className="absolute -top-2 -right-2 bg-red-600 text-white border-0">
                  NEW
                </Badge>
              )}
              <div className="space-y-1">
                <p className="text-sm">{item.keyword}</p>
                <p className="text-xs opacity-90">{item.category}</p>
                <p>+{item.growth}%</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500/80 rounded"></div>
            <span>80%+</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500/70 rounded"></div>
            <span>60-79%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500/60 rounded"></div>
            <span>40-59%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500/50 rounded"></div>
            <span>40%未満</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}