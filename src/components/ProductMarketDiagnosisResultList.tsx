import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, XCircle, FileText } from "lucide-react";
import { useState } from "react";

interface ProductCandidate {
  id: string;
  productName: string;
  mainFunctions: string[];
  investmentSummary: "推奨" | "要検討" | "慎重";
  annualRevenue: number;
  totalInvestment: number;
  predictedROI: number;
  breakEvenPoint: number; // 月数
  priceAssumption: number;
  totalSalesVolume: number;
  expectedImpact: "高" | "中" | "低";
  summaryText: string;
}

interface ProductMarketDiagnosisResultListProps {
  isOpen: boolean;
  onClose: () => void;
  onViewDetail: (productId: string) => void;
}

export function ProductMarketDiagnosisResultList({ 
  isOpen, 
  onClose, 
  onViewDetail 
}: ProductMarketDiagnosisResultListProps) {
  const [candidateStatuses, setCandidateStatuses] = useState<Record<string, "採用" | "不採用" | null>>({});

  // サンプルデータ
  const productCandidates: ProductCandidate[] = [
    {
      id: "prod-001",
      productName: "睡眠改善パジャマ",
      mainFunctions: ["保温・発熱", "吸湿発熱繊維", "調湿機能", "着心地重視"],
      investmentSummary: "推奨",
      annualRevenue: 1310000000,
      totalInvestment: 18180000,
      predictedROI: 3149,
      breakEvenPoint: 3,
      priceAssumption: 26840,
      totalSalesVolume: 57400,
      expectedImpact: "高",
      summaryText: "30〜50代男女の睡眠悩みに対応。BAKUNE同価格帯で12ヶ月目に月1万個以上の販売を見込む。"
    },
    {
      id: "prod-002",
      productName: "高機能スポーツインナー",
      mainFunctions: ["吸汗速乾", "コンプレッション", "抗菌防臭", "UVカット"],
      investmentSummary: "推奨",
      annualRevenue: 120000000,
      totalInvestment: 18000000,
      predictedROI: 267,
      breakEvenPoint: 6,
      priceAssumption: 6000,
      totalSalesVolume: 20000,
      expectedImpact: "高",
      summaryText: "スポーツ市場での需要増。複数機能の組み合わせで差別化可能。"
    },
    {
      id: "prod-003",
      productName: "冷感マスク",
      mainFunctions: ["接触冷感", "吸汗速乾", "抗菌", "UV遮断"],
      investmentSummary: "要検討",
      annualRevenue: 45000000,
      totalInvestment: 8000000,
      predictedROI: 156,
      breakEvenPoint: 9,
      priceAssumption: 1500,
      totalSalesVolume: 30000,
      expectedImpact: "中",
      summaryText: "季節性商品。夏季需要は高いが通年販売が課題。在庫リスク要考慮。"
    },
    {
      id: "prod-004",
      productName: "着圧レギンス",
      mainFunctions: ["段階着圧", "骨盤サポート", "美脚効果", "ストレッチ"],
      investmentSummary: "推奨",
      annualRevenue: 95000000,
      totalInvestment: 15000000,
      predictedROI: 233,
      breakEvenPoint: 7,
      priceAssumption: 4500,
      totalSalesVolume: 21000,
      expectedImpact: "高",
      summaryText: "女性向け美容・健康市場で安定需要。リピート購入率が高い。"
    },
    {
      id: "prod-005",
      productName: "遠赤外線発熱ネックウォーマー",
      mainFunctions: ["遠赤外線", "保温", "血行促進", "肩こり軽減"],
      investmentSummary: "要検討",
      annualRevenue: 38000000,
      totalInvestment: 9000000,
      predictedROI: 122,
      breakEvenPoint: 11,
      priceAssumption: 3800,
      totalSalesVolume: 10000,
      expectedImpact: "中",
      summaryText: "冬季限定商品。健康効果の訴求が鍵。市場規模はやや限定的。"
    },
    {
      id: "prod-006",
      productName: "防水透湿レインポンチョ",
      mainFunctions: ["防水", "透湿", "軽量", "パッカブル"],
      investmentSummary: "慎重",
      annualRevenue: 28000000,
      totalInvestment: 10000000,
      predictedROI: 80,
      breakEvenPoint: 14,
      priceAssumption: 5600,
      totalSalesVolume: 5000,
      expectedImpact: "低",
      summaryText: "競合多数。差別化が困難。投資回収に時間がかかる可能性あり。"
    },
  ];

  const handleAdopt = (productId: string) => {
    setCandidateStatuses(prev => ({ ...prev, [productId]: "採用" }));
  };

  const handleReject = (productId: string) => {
    setCandidateStatuses(prev => ({ ...prev, [productId]: "不採用" }));
  };

  const getSummaryColor = (summary: "推奨" | "要検討" | "慎重") => {
    switch (summary) {
      case "推奨":
        return "bg-green-100 text-green-800 border-green-300";
      case "要検討":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "慎重":
        return "bg-red-100 text-red-800 border-red-300";
    }
  };

  const getSummaryIcon = (summary: "推奨" | "要検討" | "慎重") => {
    switch (summary) {
      case "推奨":
        return <CheckCircle2 className="w-4 h-4" />;
      case "要検討":
        return <AlertCircle className="w-4 h-4" />;
      case "慎重":
        return <XCircle className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: "高" | "中" | "低") => {
    switch (impact) {
      case "高":
        return "text-green-600";
      case "中":
        return "text-yellow-600";
      case "低":
        return "text-gray-600";
    }
  };

  const formatCurrency = (value: number) => {
    return `¥${(value / 10000).toFixed(0)}万`;
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              診断フォームに戻る
            </Button>
            <div className="flex-1">
              <h1 className="text-xl">新商品案の一覧</h1>
              <p className="text-sm text-gray-500 mt-1">
                指定された条件から生成された商品案 {productCandidates.length}件
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {productCandidates.map((product) => {
            const status = candidateStatuses[product.id];
            
            return (
              <Card 
                key={product.id} 
                className={`relative ${status === "採用" ? "border-green-500 border-2" : status === "不採用" ? "opacity-50" : ""}`}
              >
                {status && (
                  <div className="absolute top-4 right-4">
                    <Badge variant={status === "採用" ? "default" : "secondary"}>
                      {status}
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="pr-20">{product.productName}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {product.mainFunctions.map((func, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {func}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* 投資判断サマリー */}
                  <div>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${getSummaryColor(product.investmentSummary)}`}>
                      {getSummaryIcon(product.investmentSummary)}
                      <span className="font-semibold">投資判断：{product.investmentSummary}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{product.summaryText}</p>
                  </div>

                  {/* 財務指標 */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">売上予測（年間）</div>
                      <div className="text-lg mt-1 flex items-center gap-1">
                        {formatCurrency(product.annualRevenue)}
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">総投資額</div>
                      <div className="text-lg mt-1">{formatCurrency(product.totalInvestment)}</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">予測ROI（標準）</div>
                      <div className="text-lg mt-1 flex items-center gap-1">
                        <span className={product.predictedROI >= 200 ? "text-green-600" : product.predictedROI >= 150 ? "text-yellow-600" : "text-gray-600"}>
                          {product.predictedROI}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">損益分岐点</div>
                      <div className="text-lg mt-1">{product.breakEvenPoint}ヶ月</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">価格前提</div>
                      <div className="text-lg mt-1">¥{product.priceAssumption.toLocaleString()}</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500">合計販売数</div>
                      <div className="text-lg mt-1">{product.totalSalesVolume.toLocaleString()}個</div>
                    </div>
                  </div>

                  {/* 期待インパクト */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">期待インパクト：</span>
                      <span className={`font-semibold ${getImpactColor(product.expectedImpact)}`}>
                        {product.expectedImpact}
                      </span>
                    </div>
                  </div>

                  {/* アクションボタン */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => onViewDetail(product.id)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      詳細を見る
                    </Button>
                    <Button 
                      variant="default" 
                      onClick={() => handleAdopt(product.id)}
                      disabled={status === "採用"}
                      className="flex-1"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      採用
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleReject(product.id)}
                      disabled={status === "不採用"}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      不採用
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* サマリー情報 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>診断結果サマリー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-semibold text-green-700">
                  {productCandidates.filter(p => p.investmentSummary === "推奨").length}件
                </div>
                <div className="text-sm text-gray-600 mt-1">投資推奨</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-semibold text-yellow-700">
                  {productCandidates.filter(p => p.investmentSummary === "要検討").length}件
                </div>
                <div className="text-sm text-gray-600 mt-1">要検討</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-semibold text-red-700">
                  {productCandidates.filter(p => p.investmentSummary === "慎重").length}件
                </div>
                <div className="text-sm text-gray-600 mt-1">慎重判断</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}