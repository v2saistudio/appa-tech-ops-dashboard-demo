import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { TrendingUp, AlertTriangle, Target, DollarSign, Package, Sparkles, ShoppingCart, XCircle, ChevronRight, FileText, CheckCircle2 } from "lucide-react";
import { useState } from "react";

// 最優先投資商品（トップ3）
const topInvestments = [
  {
    type: "opportunity",
    icon: Sparkles,
    actionLabel: "新商品開発",
    target: "美容繊維フェイスマスク",
    description: "「コスメティック繊維」が91%成長で急拡大。美容効果への不満（38%）を解決する高機能繊維で新市場創出が期待できる。",
    priority: "HIGH",
    status: "approved", // 採用済
    keyKPIs: [
      { label: "既存商品成長率", value: "+1637%" },
      { label: "キーワード成長率", value: "+91%" },
      { label: "顧客満足度", value: "4.7★" },
      { label: "粗利率", value: "58%" }
    ],
    expectedImpact: "売上 +30-40% 見込み",
    rationale: "既存商品が高評価（4.7★）で成長率+1637%。上位版投入でさらなる市場拡大が可能"
  },
  {
    type: "opportunity",
    icon: TrendingUp,
    actionLabel: "在庫増",
    target: "深眠サポートパジャマ",
    description: "「メラトニン誘導」キーワードが84%成長。睡眠効果への不満（38%）があるが、評価は4.8点と最高評価で需要急拡大中。",
    priority: "HIGH",
    status: "approved", // 採用済
    keyKPIs: [
      { label: "成長率", value: "+2100%" },
      { label: "顧客評価", value: "4.8★" },
      { label: "粗利率", value: "62%" },
      { label: "在庫回転率", value: "8.2回/月" }
    ],
    expectedImpact: "売上 +25-35% 見込み、在庫切れリスク回避",
    rationale: "導入期で爆発的成長中。機会損失を防ぐため即時在庫増強が必要"
  },
  {
    type: "opportunity",
    icon: Target,
    actionLabel: "プロモ強化",
    target: "リカバリー着圧レギンス Pro",
    description: "「着圧テクノロジー」が89%成長。疲労回復カテゴリで最も効果実感が高く（満足度4.6★）、上位モデルとして市場拡大の期待大。",
    priority: "HIGH",
    status: "approved", // 採用済
    keyKPIs: [
      { label: "カテゴリ成長率", value: "+89%" },
      { label: "顧客満足度", value: "4.6★" },
      { label: "リピート率", value: "48%" },
      { label: "粗利率", value: "55%" }
    ],
    expectedImpact: "売上 +35-45% 見込み、ブランド認知向上",
    rationale: "疲労回復効果の科学的根拠が強く、リピート率48%と高水準。プロモ投資でさらなる認知拡大が可能"
  }
];

const recommendations = [
  {
    type: "investment",
    icon: Target,
    actionLabel: "改良",
    target: "疲労回復カテゴリー全体",
    description: "効果実感への不満が42%と最多。着圧テクノロジーが89%成長する中、科学的根拠の強化と効果の見える化が競争力の鍵。",
    priority: "HIGH",
    status: "approved", // 採用済
    keyKPIs: [
      { label: "不満率", value: "42%" },
      { label: "技術成長率", value: "+89%" },
      { label: "市場シェア", value: "23%" }
    ],
    expectedImpact: "返品率 -8pt、売上 +15-25% 見込み",
    rationale: "体感スコア向上により返品率低減と顧客満足度向上が期待できる"
  },

  {
    type: "warning",
    icon: AlertTriangle,
    actionLabel: "在庫削減",
    target: "基本着圧ソックス",
    description: "成長率+15%と低迷。評価3.8で返品率も高い。衰退期に入っており、在庫コスト削減が急務。",
    priority: "MID",
    status: "pending", // 検討中
    keyKPIs: [
      { label: "成長率", value: "+15%" },
      { label: "評価", value: "3.8★" },
      { label: "粗利率", value: "38%" }
    ],
    expectedImpact: "在庫コスト -12% 削減",
    rationale: "ポートフォリオで「収穫」フェーズ。過剰在庫リスクを低減し資金効率向上"
  },
  {
    type: "target",
    icon: ShoppingCart,
    actionLabel: "プロモ強化",
    target: "冷感カテゴリー",
    description: "「接触冷感」キーワードが95%成長で最高値。冷感持続時間への不満が45%あるが、夏季需要で認知拡大のチャンス。",
    priority: "HIGH",
    status: "pending", // 検討中
    keyKPIs: [
      { label: "キーワード成長率", value: "+95%" },
      { label: "市場シェア", value: "18%" },
      { label: "季節係数", value: "夏季3.2倍" }
    ],
    expectedImpact: "認知度 +40%、売上 +20-30% 見込み",
    rationale: "夏季前のプロモ強化でブランド認知を高め、競合との差別化を図る"
  },
  {
    type: "danger",
    icon: XCircle,
    actionLabel: "撤退検討",
    target: "旧型温感インナー",
    description: "成長率-25%で市場縮小。評価3.5と低く、新型製品に需要が移行。在庫処分と商品整理を推奨。",
    priority: "MID",
    status: "rejected", // 不採用
    keyKPIs: [
      { label: "成長率", value: "-25%" },
      { label: "評価", value: "3.5★" },
      { label: "粗利率", value: "32%" }
    ],
    expectedImpact: "資源最適化、新商品への投資余力創出",
    rationale: "衰退期商品。リソースを成長商品に再配分し、ポートフォリオ最適化"
  },
  {
    type: "opportunity",
    icon: Package,
    actionLabel: "改良",
    target: "女性向けサイズ展開",
    description: "サイズ感への不満が35%と最多。マタニティ対応キーワードが82%成長しており、ライフステージ対応商品で市場拡大可能。",
    priority: "LOW",
    status: "rejected", // 不採用
    keyKPIs: [
      { label: "サイズ不満率", value: "35%" },
      { label: "マタニティ成長", value: "+82%" },
      { label: "女性顧客比率", value: "64%" }
    ],
    expectedImpact: "顧客基盤 +12-18% 拡大見込み",
    rationale: "顧客ライフステージに対応することで顧客生涯価値（LTV）向上が期待"
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
    case "danger":
      return { bg: "bg-red-50", border: "border-red-200", icon: "text-red-600" };
    default:
      return { bg: "bg-gray-50", border: "border-gray-200", icon: "text-gray-600" };
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "HIGH":
      return "bg-red-500 text-white";
    case "MID":
      return "bg-yellow-500 text-white";
    case "LOW":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}

function getActionLabelColor(label: string) {
  switch (label) {
    case "新商品開発":
      return "bg-purple-100 text-purple-800 border-purple-300";
    case "改良":
      return "bg-blue-100 text-blue-800 border-blue-300";
    case "在庫増":
      return "bg-green-100 text-green-800 border-green-300";
    case "在庫削減":
      return "bg-orange-100 text-orange-800 border-orange-300";
    case "プロモ強化":
      return "bg-cyan-100 text-cyan-800 border-cyan-300";
    case "撤退検討":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
}

interface InvestmentRecommendationsProps {
  onOpenDetail: (product: any) => void;
}

export function InvestmentRecommendations({ onOpenDetail }: InvestmentRecommendationsProps) {
  const [statusFilter, setStatusFilter] = useState<'approved' | 'pending' | 'rejected'>('approved');

  const handleOpenDetail = (product: typeof topInvestments[0]) => {
    const productData = {
      productName: product.target,
      category: product.target.includes("美容") ? "美容" : product.target.includes("睡眠") ? "睡眠改善" : "疲労回復",
      sales: product.target.includes("美容") ? 1650 : product.target.includes("睡眠") ? 990 : 2850,
      grossMargin: product.target.includes("美容") ? 58 : product.target.includes("睡眠") ? 62 : 52,
      growthRate: product.target.includes("美容") ? 1637 : product.target.includes("睡眠") ? 2100 : 1483,
      rating: product.target.includes("美容") ? 4.7 : product.target.includes("睡眠") ? 4.8 : 4.6,
      reviewCount: product.target.includes("美容") ? 423 : product.target.includes("睡眠") ? 234 : 892,
      actionLabel: product.actionLabel
    };
    onOpenDetail(productData);
  };

  // フィルタリングされた商品
  const filteredTopInvestments = topInvestments.filter(item => item.status === statusFilter);
  const filteredRecommendations = recommendations.filter(item => item.status === statusFilter);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle>投資判断レコメンデーション</CardTitle>
            <CardDescription>商品投資観点での攻守アクションリスト（優先度順）</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'approved' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('approved')}
              className={statusFilter === 'approved' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              採用済
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('pending')}
              className={statusFilter === 'pending' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
            >
              検討中
            </Button>
            <Button
              variant={statusFilter === 'rejected' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setStatusFilter('rejected')}
              className={statusFilter === 'rejected' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              不採用
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 最優先投資商品（大きく表示） */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-1 bg-red-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-900">最優先投資商品</h3>
              <Badge className="bg-red-500 text-white border-0">TOP 3</Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              {filteredTopInvestments.map((rec, index) => {
                const styles = getTypeStyles(rec.type);
                const IconComponent = rec.icon;
                
                return (
                  <div
                    key={index}
                    className={`p-5 rounded-lg border-2 ${styles.bg} ${styles.border} transition-all hover:shadow-lg`}
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-3 mb-3">
                        <IconComponent className={`w-7 h-7 flex-shrink-0 ${styles.icon}`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-2">
                            <Badge className={`${getActionLabelColor(rec.actionLabel)} border text-xs`}>
                              {rec.actionLabel}
                            </Badge>
                            <Badge className={`${getPriorityColor(rec.priority)} border-0 text-xs`}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <h4 className="text-lg font-medium mb-2">{rec.target}</h4>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4">{rec.description}</p>
                      
                      {/* 主要根拠KPI */}
                      <div className="grid grid-cols-2 gap-3 mb-4 p-3 bg-white/70 rounded border border-gray-200">
                        {rec.keyKPIs.map((kpi, kpiIndex) => (
                          <div key={kpiIndex}>
                            <p className="text-xs text-gray-600 mb-1">{kpi.label}</p>
                            <p className="font-medium">{kpi.value}</p>
                          </div>
                        ))}
                      </div>
                      
                      {/* 期待インパクトと詳細ボタン */}
                      <div className="mt-auto">
                        <div className="mb-3">
                          <p className="text-xs text-gray-600">期待インパクト</p>
                          <p className="font-medium text-green-600">{rec.expectedImpact}</p>
                        </div>
                        
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs text-gray-600 italic flex-1">
                            💡 {rec.rationale}
                          </div>
                        </div>
                        
                        {statusFilter === 'approved' ? (
                          <Button 
                            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                            onClick={() => handleOpenDetail(rec)}
                          >
                            詳細をみる
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        ) : statusFilter === 'pending' ? (
                          <div className="flex justify-between gap-2 mt-3">
                            <Button 
                              variant="outline"
                              className="max-w-[160px]"
                              size="sm"
                              onClick={() => handleOpenDetail(rec)}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              詳細を見る
                            </Button>
                            <div className="flex gap-2">
                              <Button 
                                variant="default"
                                className="max-w-[100px]"
                                size="sm"
                                onClick={() => alert('採用処理（開発中）')}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                採用
                              </Button>
                              <Button 
                                variant="outline"
                                className="max-w-[100px]"
                                size="sm"
                                onClick={() => alert('不採用処理（開発中）')}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                不採用
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button 
                            className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                            onClick={() => handleOpenDetail(rec)}
                          >
                            詳細をみる
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* その他の投資判断 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
              <h3 className="font-semibold text-gray-900">その他の投資判断</h3>
            </div>
            <div className="space-y-4">
              {filteredRecommendations.map((rec, index) => {
                const styles = getTypeStyles(rec.type);
                const IconComponent = rec.icon;
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${styles.bg} ${styles.border} transition-all hover:shadow-md`}
                  >
                    <div className="flex items-start gap-3">
                      <IconComponent className={`w-6 h-6 mt-1 flex-shrink-0 ${styles.icon}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={`${getActionLabelColor(rec.actionLabel)} border text-xs`}>
                              {rec.actionLabel}
                            </Badge>
                            <Badge className={`${getPriorityColor(rec.priority)} border-0 text-xs`}>
                              {rec.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <h4 className="font-medium mb-1">対象: {rec.target}</h4>
                        <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                        
                        {/* 主要根拠KPI */}
                        <div className="grid grid-cols-3 gap-3 mb-3 p-3 bg-white/50 rounded border border-gray-200">
                          {rec.keyKPIs.map((kpi, kpiIndex) => (
                            <div key={kpiIndex}>
                              <p className="text-xs text-gray-600 mb-1">{kpi.label}</p>
                              <p className="text-sm font-medium">{kpi.value}</p>
                            </div>
                          ))}
                        </div>
                        
                        {/* 期待インパクト */}
                        <div className="flex items-start justify-between gap-3 text-sm">
                          <div className="flex-1">
                            <span className="text-gray-600">期待インパクト: </span>
                            <span className="font-medium text-green-600">{rec.expectedImpact}</span>
                          </div>
                        </div>
                        
                        {/* 根拠 */}
                        <div className="mt-2 text-xs text-gray-600 italic">
                          💡 {rec.rationale}
                        </div>
                        
                        {/* アクションボタン */}
                        {statusFilter === 'pending' && (
                          <div className="flex justify-between gap-2 mt-3">
                            <Button 
                              variant="outline"
                              className="max-w-[160px]"
                              size="sm"
                              onClick={() => alert('詳細を見る（開発中）')}
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              詳細を見る
                            </Button>
                            <div className="flex gap-2">
                              <Button 
                                variant="default"
                                className="max-w-[100px]"
                                size="sm"
                                onClick={() => alert('採用処理（開発中）')}
                              >
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                採用
                              </Button>
                              <Button 
                                variant="outline"
                                className="max-w-[100px]"
                                size="sm"
                                onClick={() => alert('不採用処理（開発中）')}
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                不採用
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}