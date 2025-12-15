import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Rocket, TestTube, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";

const growthActions = [
  {
    title: "商品詳細ページのCVR改善",
    targetPage: "全商品詳細ページ",
    kpi: "CVR +1.5pt",
    status: "進行中",
    priority: "HIGH",
    expectedImpact: "月間売上 +¥12M 見込み",
    dueDate: "2024/07/15"
  },
  {
    title: "カート離脱防止ポップアップ導入",
    targetPage: "カートページ",
    kpi: "カート離脱率 -15%",
    status: "予定",
    priority: "HIGH",
    expectedImpact: "月間売上 +¥8M 見込み",
    dueDate: "2024/07/30"
  },
  {
    title: "LINE配信セグメント最適化",
    targetPage: "LINE CRM",
    kpi: "開封率 +10pt、CVR +2pt",
    status: "進行中",
    priority: "MID",
    expectedImpact: "LINE経由売上 +25% 見込み",
    dueDate: "2024/07/20"
  },
  {
    title: "サイト内検索結果の精度向上",
    targetPage: "検索結果ページ",
    kpi: "検索後CVR +0.8pt",
    status: "予定",
    priority: "MID",
    expectedImpact: "検索経由売上 +18% 見込み",
    dueDate: "2024/08/10"
  },
  {
    title: "新規顧客向けクーポン施策",
    targetPage: "全ページ（ファーストビュー）",
    kpi: "新規CVR +2pt",
    status: "完了",
    priority: "HIGH",
    expectedImpact: "新規売上 +30% 達成",
    dueDate: "2024/06/30"
  }
];

const abTests = [
  {
    testName: "商品画像枚数テスト",
    targetPage: "商品詳細ページ",
    variants: "A: 5枚 vs B: 10枚",
    result: "勝ち: B",
    mainMetric: "CVR +0.8pt (4.2% → 5.0%)",
    status: "完了"
  },
  {
    testName: "レビュー表示位置テスト",
    targetPage: "商品詳細ページ",
    variants: "A: ページ下部 vs B: 商品説明直後",
    result: "勝ち: B",
    mainMetric: "CVR +0.5pt (4.2% → 4.7%)",
    status: "完了"
  },
  {
    testName: "カート追加ボタン色テスト",
    targetPage: "商品詳細ページ",
    variants: "A: 青 vs B: オレンジ",
    result: "差なし",
    mainMetric: "CVR 差異なし (4.2% vs 4.3%)",
    status: "完了"
  },
  {
    testName: "配送料無料ライン表示テスト",
    targetPage: "カートページ",
    variants: "A: なし vs B: プログレスバー表示",
    result: "進行中",
    mainMetric: "測定中（目標: 離脱率 -10%）",
    status: "進行中"
  },
  {
    testName: "ファーストビュー訴求テスト",
    targetPage: "トップページ",
    variants: "A: 商品画像 vs B: ベネフィット訴求",
    result: "進行中",
    mainMetric: "測定中（目標: 直帰率 -5%）",
    status: "進行中"
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case "完了":
      return "bg-green-500 text-white";
    case "進行中":
      return "bg-blue-500 text-white";
    case "予定":
      return "bg-gray-400 text-white";
    default:
      return "bg-gray-300 text-gray-700";
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

function getStatusIcon(status: string) {
  switch (status) {
    case "完了":
      return CheckCircle;
    case "進行中":
      return Clock;
    case "予定":
      return AlertCircle;
    default:
      return Clock;
  }
}

function getResultColor(result: string) {
  if (result.startsWith("勝ち")) return "text-green-600 font-medium";
  if (result === "差なし") return "text-gray-600";
  return "text-blue-600";
}

export function GrowthActions() {
  return (
    <div className="space-y-6">
      {/* グロースアクション */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-purple-500" />
            グロースアクション
          </CardTitle>
          <CardDescription>今月実施すべきEC改善アクション一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {growthActions.map((action, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="font-medium">{action.title}</h4>
                      <Badge className={`${getPriorityColor(action.priority)} border-0 text-xs`}>
                        {action.priority}
                      </Badge>
                      <Badge className={`${getStatusColor(action.status)} border-0 text-xs`}>
                        {action.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">対象: </span>
                        <span className="font-medium">{action.targetPage}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">目標KPI: </span>
                        <span className="font-medium text-blue-600">{action.kpi}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">期待インパクト: </span>
                        <span className="font-medium text-green-600">{action.expectedImpact}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">期限: </span>
                        <span className="font-medium">{action.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  {(() => {
                    const StatusIcon = getStatusIcon(action.status);
                    return <StatusIcon className="w-6 h-6 text-gray-400 flex-shrink-0" />;
                  })()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ABテストボード */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="w-5 h-5 text-blue-500" />
            ABテストボード
          </CardTitle>
          <CardDescription>実施中・完了済みのABテスト結果一覧</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-3 text-sm">テスト名</th>
                  <th className="text-left py-3 px-3 text-sm">対象ページ</th>
                  <th className="text-left py-3 px-3 text-sm">変数</th>
                  <th className="text-left py-3 px-3 text-sm">結果</th>
                  <th className="text-left py-3 px-3 text-sm">主指標変化</th>
                  <th className="text-center py-3 px-3 text-sm">状態</th>
                </tr>
              </thead>
              <tbody>
                {abTests.map((test, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-3">
                      <span className="font-medium text-sm">{test.testName}</span>
                    </td>
                    <td className="py-3 px-3 text-sm text-gray-700">{test.targetPage}</td>
                    <td className="py-3 px-3 text-sm text-gray-600">{test.variants}</td>
                    <td className="py-3 px-3">
                      <span className={`text-sm ${getResultColor(test.result)}`}>
                        {test.result}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-sm">{test.mainMetric}</td>
                    <td className="py-3 px-3 text-center">
                      <Badge className={`${getStatusColor(test.status)} border-0 text-xs`}>
                        {test.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              テスト結果サマリー
            </h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-700">完了テスト数</p>
                <p className="text-xl text-blue-900">3件</p>
              </div>
              <div>
                <p className="text-gray-700">有意差あり</p>
                <p className="text-xl text-green-600">2件</p>
              </div>
              <div>
                <p className="text-gray-700">累計CVR改善</p>
                <p className="text-xl text-purple-600">+1.3pt</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
