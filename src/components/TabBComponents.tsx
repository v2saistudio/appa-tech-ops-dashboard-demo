import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, MessageCircle, Search, ShoppingCart, Star, Crown, ThumbsUp, ThumbsDown, Clock, RefreshCw } from "lucide-react";

// B-2: チャネル別集客 & ROAS
const channelData = [
  { channel: "Google広告", sessions: 125000, cvr: 4.8, cpa: 2800, roas: 420, newUserRate: 68 },
  { channel: "Meta広告", sessions: 98000, cvr: 3.9, cpa: 3200, roas: 380, newUserRate: 72 },
  { channel: "オーガニック", sessions: 215000, cvr: 5.2, cpa: 0, roas: 999, newUserRate: 45 },
  { channel: "SNS", sessions: 42000, cvr: 2.8, cpa: 4500, roas: 210, newUserRate: 85 },
  { channel: "LINE", sessions: 58000, cvr: 6.1, cpa: 1800, roas: 580, newUserRate: 32 }
];

export function ChannelAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>チャネル別集客 & ROAS</CardTitle>
        <CardDescription>マーケティングチャネル別のパフォーマンス分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-3 text-sm">チャネル</th>
                <th className="text-right py-3 px-3 text-sm">セッション数</th>
                <th className="text-right py-3 px-3 text-sm">CVR</th>
                <th className="text-right py-3 px-3 text-sm">CPA</th>
                <th className="text-right py-3 px-3 text-sm">ROAS</th>
                <th className="text-right py-3 px-3 text-sm">新規率</th>
              </tr>
            </thead>
            <tbody>
              {channelData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium">{item.channel}</td>
                  <td className="py-3 px-3 text-right">{item.sessions.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right">{item.cvr}%</td>
                  <td className="py-3 px-3 text-right">
                    {item.cpa === 0 ? "-" : `¥${item.cpa.toLocaleString()}`}
                  </td>
                  <td className={`py-3 px-3 text-right font-medium ${
                    item.roas >= 400 ? 'text-green-600' : item.roas >= 300 ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {item.roas}%
                  </td>
                  <td className="py-3 px-3 text-right">{item.newUserRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// B-3: LINE・CRMパフォーマンス
const lineCampaigns = [
  { title: "夏物クーポン配信", type: "クーポン", sent: 45000, opened: 18900, clicked: 6750, purchased: 1215, openRate: 42.0, ctr: 15.0, cvr: 2.7 },
  { title: "新商品紹介", type: "新商品", sent: 45000, opened: 15750, clicked: 4725, purchased: 708, openRate: 35.0, ctr: 10.5, cvr: 1.6 },
  { title: "睡眠改善コラム", type: "コラム", sent: 45000, opened: 13050, clicked: 2610, purchased: 339, openRate: 29.0, ctr: 5.8, cvr: 0.8 }
];

export function LINEPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-500" />
          LINE・CRMパフォーマンス
        </CardTitle>
        <CardDescription>LINE配信別のファネルと購入率分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lineCampaigns.map((campaign, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{campaign.title}</h4>
                  <Badge>{campaign.type}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm mb-2">
                <div>
                  <p className="text-gray-600">配信数</p>
                  <p className="text-lg font-medium">{campaign.sent.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">開封数</p>
                  <p className="text-lg font-medium">{campaign.opened.toLocaleString()}</p>
                  <p className="text-xs text-green-600">{campaign.openRate}%</p>
                </div>
                <div>
                  <p className="text-gray-600">クリック数</p>
                  <p className="text-lg font-medium">{campaign.clicked.toLocaleString()}</p>
                  <p className="text-xs text-blue-600">CTR {campaign.ctr}%</p>
                </div>
                <div>
                  <p className="text-gray-600">購入数</p>
                  <p className="text-lg font-medium">{campaign.purchased.toLocaleString()}</p>
                  <p className="text-xs text-purple-600">CVR {campaign.cvr}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// B-4: サイト内検索 & ニーズカバレッジ
const searchData = [
  { keyword: "着圧レギンス", searchCount: 18200, resultCount: 78, cvr: 5.2, coverage: "良好" },
  { keyword: "接触冷感", searchCount: 14300, resultCount: 45, cvr: 2.8, coverage: "改善要" },
  { keyword: "メラトニン", searchCount: 8900, resultCount: 12, cvr: 1.9, coverage: "改善要" },
  { keyword: "美容繊維", searchCount: 6800, resultCount: 8, cvr: 1.5, coverage: "不足" },
  { keyword: "マタニティ", searchCount: 8400, resultCount: 9, cvr: 1.8, coverage: "不足" },
  { keyword: "深眠パジャマ", searchCount: 4200, resultCount: 3, cvr: 2.1, coverage: "不足" }
];

export function SiteSearch() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" />
          サイト内検索 & ニーズカバレッジ
        </CardTitle>
        <CardDescription>検索キーワードと商品カバレッジの分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-3 text-sm">検索キーワード</th>
                <th className="text-right py-3 px-3 text-sm">検索回数</th>
                <th className="text-right py-3 px-3 text-sm">結果件数</th>
                <th className="text-right py-3 px-3 text-sm">検索後CVR</th>
                <th className="text-center py-3 px-3 text-sm">カバレッジ</th>
              </tr>
            </thead>
            <tbody>
              {searchData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    item.resultCount < 10 ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-medium">{item.keyword}</td>
                  <td className="py-3 px-3 text-right">{item.searchCount.toLocaleString()}</td>
                  <td className={`py-3 px-3 text-right ${
                    item.resultCount < 10 ? 'text-red-600 font-medium' : ''
                  }`}>
                    {item.resultCount}件
                  </td>
                  <td className="py-3 px-3 text-right">{item.cvr}%</td>
                  <td className="py-3 px-3 text-center">
                    <Badge className={
                      item.coverage === '良好' ? 'bg-green-100 text-green-800 border-green-300' :
                      item.coverage === '改善要' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                      'bg-red-100 text-red-800 border-red-300'
                    }>
                      {item.coverage}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// B-5: 購買ファネル & カートパフォーマンス
const funnelData = [
  { stage: "商品詳細閲覧", count: 538000, rate: 100, dropRate: 0, dropReason: "-" },
  { stage: "カート投入", count: 53800, rate: 10.0, dropRate: 90.0, dropReason: "価格・サイズ不明確" },
  { stage: "決済開始", count: 32280, rate: 6.0, dropRate: 40.0, dropReason: "配送料・決済方法" },
  { stage: "購入完了", count: 25824, rate: 4.8, dropRate: 20.0, dropReason: "入力エラー・不安" }
];

export function PurchaseFunnel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-purple-500" />
          購買ファネル & カートパフォーマンス
        </CardTitle>
        <CardDescription>購入フロー各段階のCVRと離脱要因分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {funnelData.map((step, index) => (
            <div key={index} className="relative">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-white border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{step.stage}</h4>
                  <div className="text-right">
                    <p className="text-2xl font-medium">{step.count.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{step.rate}%</p>
                  </div>
                </div>
                {step.dropRate > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-red-600">離脱率: {step.dropRate}%</span>
                    <span className="text-gray-600">主要原因: {step.dropReason}</span>
                  </div>
                )}
              </div>
              {index < funnelData.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="text-gray-400">↓</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// B-6: レビュー極性 & 星評価トレンド
const starDistribution = [
  { star: "5★", count: 28400, percentage: 45 },
  { star: "4★", count: 19600, percentage: 31 },
  { star: "3★", count: 9800, percentage: 16 },
  { star: "2★", count: 3200, percentage: 5 },
  { star: "1★", count: 2000, percentage: 3 }
];

export function ReviewAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" />
          レビュー極性 & 星評価トレンド
        </CardTitle>
        <CardDescription>レビュー星評価分布とポジティブ/ネガティブ比率</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {starDistribution.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className="w-12 text-sm font-medium">{item.star}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full flex items-center justify-end pr-2 text-xs text-white font-medium"
                  style={{ width: `${item.percentage}%` }}
                >
                  {item.percentage}%
                </div>
              </div>
              <span className="w-20 text-sm text-gray-600 text-right">{item.count.toLocaleString()}件</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-sm text-gray-700">ポジティブ (4-5★)</p>
            <p className="text-2xl text-green-600">76%</p>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-sm text-gray-700">ネガティブ (1-2★)</p>
            <p className="text-2xl text-red-600">8%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// B-9: デモグラ & セグメント別売上
const demographicData = [
  { segment: "20代女性", sales: 185, customerCount: 12400, avgLTV: 32800, mainCategory: "美容・女性向け" },
  { segment: "30代女性", sales: 242, customerCount: 15800, avgLTV: 45200, mainCategory: "疲労回復・女性向け" },
  { segment: "40代女性", sales: 198, customerCount: 13200, avgLTV: 38900, mainCategory: "睡眠改善・疲労回復" },
  { segment: "20代男性", sales: 78, customerCount: 5200, avgLTV: 28400, mainCategory: "疲労回復" },
  { segment: "30代男性", sales: 102, customerCount: 6800, avgLTV: 35600, mainCategory: "疲労回復・温感" },
  { segment: "40代男性", sales: 51, customerCount: 3400, avgLTV: 31200, mainCategory: "温感・疲労回復" }
];

export function DemographicAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-500" />
          デモグラ & セグメント別売上
        </CardTitle>
        <CardDescription>年齢×性別セグメント別の売上・LTV・購入カテゴリ分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-3 text-sm">セグメント</th>
                <th className="text-right py-3 px-3 text-sm">売上</th>
                <th className="text-right py-3 px-3 text-sm">顧客数</th>
                <th className="text-right py-3 px-3 text-sm">平均LTV</th>
                <th className="text-left py-3 px-3 text-sm">主要カテゴリ</th>
              </tr>
            </thead>
            <tbody>
              {demographicData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium">
                    <div className="flex items-center gap-2">
                      {item.avgLTV > 40000 && <Crown className="w-4 h-4 text-yellow-500" />}
                      {item.segment}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">¥{item.sales}M</td>
                  <td className="py-3 px-3 text-right">{item.customerCount.toLocaleString()}</td>
                  <td className={`py-3 px-3 text-right font-medium ${
                    item.avgLTV > 40000 ? 'text-green-600' : ''
                  }`}>
                    ¥{item.avgLTV.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-sm text-gray-700">{item.mainCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

// B-7: レビューワード & 機能マッピング
const positiveWords = [
  { word: "快適", size: 32, count: 1840 },
  { word: "疲れが取れる", size: 28, count: 1520 },
  { word: "涼しい", size: 26, count: 1340 },
  { word: "気持ちいい", size: 24, count: 1180 },
  { word: "よく眠れる", size: 22, count: 980 },
  { word: "すっきり", size: 20, count: 820 },
  { word: "肌触りが良い", size: 18, count: 680 },
  { word: "軽い", size: 16, count: 540 },
  { word: "伸びる", size: 16, count: 520 },
  { word: "おすすめ", size: 16, count: 510 }
];

const negativeWords = [
  { word: "サイズが合わない", size: 28, count: 420 },
  { word: "思ったより薄い", size: 24, count: 340 },
  { word: "値段が高い", size: 22, count: 310 },
  { word: "洗濯で縮む", size: 20, count: 280 },
  { word: "効果がわからない", size: 18, count: 240 },
  { word: "届くまで遅い", size: 16, count: 180 },
  { word: "色が違う", size: 14, count: 140 },
  { word: "すぐ毛玉", size: 14, count: 130 }
];

const wordCategoryHeatmap = [
  { word: "快適", 疲労回復: 92, 睡眠改善: 88, 女性向け: 76, 冷感: 84, 温感: 65, 美容: 58 },
  { word: "涼しい", 疲労回復: 45, 睡眠改善: 42, 女性向け: 68, 冷感: 98, 温感: 12, 美容: 38 },
  { word: "疲れが取れる", 疲労回復: 95, 睡眠改善: 82, 女性向け: 72, 冷感: 58, 温感: 70, 美容: 48 },
  { word: "よく眠れる", 疲労回復: 78, 睡眠改善: 96, 女性向け: 65, 冷感: 52, 温感: 74, 美容: 42 },
  { word: "肌が綺麗", 疲労回復: 28, 睡眠改善: 35, 女性向け: 92, 冷感: 45, 温感: 38, 美容: 98 },
  { word: "暖かい", 疲労回復: 48, 睡眠改善: 68, 女性向け: 58, 冷感: 8, 温感: 96, 美容: 42 }
];

export function ReviewWordMapping() {
  const getHeatmapColor = (value: number) => {
    if (value >= 90) return 'bg-green-600 text-white';
    if (value >= 75) return 'bg-green-500 text-white';
    if (value >= 60) return 'bg-green-300 text-gray-900';
    if (value >= 45) return 'bg-yellow-200 text-gray-900';
    if (value >= 30) return 'bg-orange-200 text-gray-900';
    return 'bg-gray-200 text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-purple-500" />
          レビューワード & 機能マッピング
        </CardTitle>
        <CardDescription>レビューから抽出されたワードと機能カテゴリの関連性分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* ワードクラウド */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ポジティブワードクラウド */}
            <div className="border border-green-200 rounded-lg p-6 bg-green-50">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUp className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">ポジティブワード</h4>
              </div>
              <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
                {positiveWords.map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-100 hover:bg-green-200 border border-green-300 rounded-lg px-3 py-2 transition-all cursor-pointer"
                    style={{ fontSize: `${item.size * 0.5}px` }}
                  >
                    <span className="font-medium text-green-800">{item.word}</span>
                    <span className="text-xs text-green-600 ml-2">({item.count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ネガティブワードクラウド */}
            <div className="border border-red-200 rounded-lg p-6 bg-red-50">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsDown className="w-5 h-5 text-red-600" />
                <h4 className="font-medium text-red-900">ネガティブワード</h4>
              </div>
              <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
                {negativeWords.map((item, index) => (
                  <div
                    key={index}
                    className="bg-red-100 hover:bg-red-200 border border-red-300 rounded-lg px-3 py-2 transition-all cursor-pointer"
                    style={{ fontSize: `${item.size * 0.5}px` }}
                  >
                    <span className="font-medium text-red-800">{item.word}</span>
                    <span className="text-xs text-red-600 ml-2">({item.count})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ワード×機能ヒートマップ */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">ワード × 機能カテゴリ ヒートマップ（出現頻度スコア）</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-r border-gray-300">
                      ワード
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      疲労回復
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      睡眠改善
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      女性向け
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      冷感
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      温感
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      美容
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wordCategoryHeatmap.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="py-3 px-4 font-medium text-gray-900 border-b border-r border-gray-200 bg-gray-50">
                        {row.word}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getHeatmapColor(row.疲労回復)}`}>
                        {row.疲労回復}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getHeatmapColor(row.睡眠改善)}`}>
                        {row.睡眠改善}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getHeatmapColor(row.女性向け)}`}>
                        {row.女性向け}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getHeatmapColor(row.冷感)}`}>
                        {row.冷感}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getHeatmapColor(row.温感)}`}>
                        {row.温感}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getHeatmapColor(row.美容)}`}>
                        {row.美容}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-200 flex items-center justify-end gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>90+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>75-89</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-300 rounded"></div>
                <span>60-74</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                <span>45-59</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-200 rounded"></div>
                <span>30-44</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span>0-29</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// B-8: サポートトピック & 工数分析
const supportData = [
  { category: "サイズ交換", count: 420, avgTime: 12.5, repeatRate: 8.2 },
  { category: "効果の質問", count: 380, avgTime: 18.3, repeatRate: 15.4 },
  { category: "配送遅延", count: 290, avgTime: 8.2, repeatRate: 22.1 },
  { category: "返品・返金", count: 245, avgTime: 25.6, repeatRate: 12.8 },
  { category: "使い方", count: 180, avgTime: 10.4, repeatRate: 6.5 },
  { category: "品質クレーム", count: 125, avgTime: 32.8, repeatRate: 28.4 }
];

const supportBarChartData = supportData.map(item => ({
  name: item.category,
  件数: item.count
}));

export function SupportAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-blue-500" />
          サポートトピック & 工数分析
        </CardTitle>
        <CardDescription>問い合わせカテゴリ別の件数・対応時間・再問い合わせ率分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 棒グラフ */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">問い合わせカテゴリ別件数</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={supportBarChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="件数" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 詳細テーブル */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-3 text-sm">カテゴリ</th>
                  <th className="text-right py-3 px-3 text-sm">月間件数</th>
                  <th className="text-right py-3 px-3 text-sm">
                    <div className="flex items-center justify-end gap-1">
                      <Clock className="w-4 h-4" />
                      平均対応時間
                    </div>
                  </th>
                  <th className="text-right py-3 px-3 text-sm">
                    <div className="flex items-center justify-end gap-1">
                      <RefreshCw className="w-4 h-4" />
                      再問い合わせ率
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {supportData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      item.repeatRate > 20 ? 'bg-red-50' : ''
                    }`}
                  >
                    <td className="py-3 px-3 font-medium">{item.category}</td>
                    <td className="py-3 px-3 text-right">{item.count}件</td>
                    <td className={`py-3 px-3 text-right ${
                      item.avgTime > 25 ? 'text-red-600 font-medium' : ''
                    }`}>
                      {item.avgTime}分
                    </td>
                    <td className={`py-3 px-3 text-right font-medium ${
                      item.repeatRate > 20 ? 'text-red-600' :
                      item.repeatRate > 10 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {item.repeatRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* サマリー */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">総問い合わせ数</p>
              <p className="text-2xl text-blue-600">
                {supportData.reduce((sum, item) => sum + item.count, 0)}件
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-gray-700">平均対応時間</p>
              <p className="text-2xl text-green-600">
                {(supportData.reduce((sum, item) => sum + item.avgTime, 0) / supportData.length).toFixed(1)}分
              </p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-gray-700">全体再問い合わせ率</p>
              <p className="text-2xl text-orange-600">
                {(supportData.reduce((sum, item) => sum + item.repeatRate, 0) / supportData.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// B-10: MAU & コホートリテンション
const mauData = [
  { month: "1月", MAU: 48200, WAU: 28400, DAU: 12800 },
  { month: "2月", MAU: 51300, WAU: 30100, DAU: 13600 },
  { month: "3月", MAU: 54800, WAU: 32200, DAU: 14500 },
  { month: "4月", MAU: 58900, WAU: 34800, DAU: 15800 },
  { month: "5月", MAU: 62400, WAU: 36900, DAU: 16900 },
  { month: "6月", MAU: 64800, WAU: 38200, DAU: 17500 }
];

const cohortData = [
  { cohort: "2024/01", m0: 100, m1: 42, m2: 35, m3: 31, m4: 28, m5: 26 },
  { cohort: "2024/02", m0: 100, m1: 45, m2: 38, m3: 33, m4: 30, m5: null },
  { cohort: "2024/03", m0: 100, m1: 48, m2: 41, m3: 36, m4: null, m5: null },
  { cohort: "2024/04", m0: 100, m1: 52, m2: 44, m3: null, m4: null, m5: null },
  { cohort: "2024/05", m0: 100, m1: 55, m2: null, m3: null, m4: null, m5: null },
  { cohort: "2024/06", m0: 100, m1: null, m2: null, m3: null, m4: null, m5: null }
];

export function MAURetention() {
  const getCohortColor = (value: number | null) => {
    if (value === null) return 'bg-gray-100 text-gray-400';
    if (value === 100) return 'bg-blue-100 text-blue-900 font-medium';
    if (value >= 50) return 'bg-green-600 text-white';
    if (value >= 40) return 'bg-green-400 text-gray-900';
    if (value >= 30) return 'bg-yellow-300 text-gray-900';
    if (value >= 20) return 'bg-orange-300 text-gray-900';
    return 'bg-red-300 text-gray-900';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-green-500" />
          MAU & コホートリテンション
        </CardTitle>
        <CardDescription>月間アクティブユーザー推移とコホート別再購入率分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* MAU/WAU/DAU推移 */}
          <div>
            <h4 className="font-medium text-gray-900 mb-4">アクティブユーザー推移</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mauData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="MAU" stroke="#3b82f6" strokeWidth={3} name="MAU (月間)" />
                <Line type="monotone" dataKey="WAU" stroke="#10b981" strokeWidth={2} name="WAU (週間)" />
                <Line type="monotone" dataKey="DAU" stroke="#f59e0b" strokeWidth={2} name="DAU (日間)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* コホートリテンション表 */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">コホートリテンション表（再購入率 %）</h4>
              <p className="text-sm text-gray-600 mt-1">行=初回購入月、列=経過月数</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 border-b border-r border-gray-300">
                      初回購入月
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      M0
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      M1
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      M2
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      M3
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      M4
                    </th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-700 border-b border-gray-300">
                      M5
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cohortData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="py-3 px-4 font-medium text-gray-900 border-b border-r border-gray-200 bg-gray-50">
                        {row.cohort}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getCohortColor(row.m0)}`}>
                        {row.m0}%
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getCohortColor(row.m1)}`}>
                        {row.m1 !== null ? `${row.m1}%` : '-'}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getCohortColor(row.m2)}`}>
                        {row.m2 !== null ? `${row.m2}%` : '-'}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getCohortColor(row.m3)}`}>
                        {row.m3 !== null ? `${row.m3}%` : '-'}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getCohortColor(row.m4)}`}>
                        {row.m4 !== null ? `${row.m4}%` : '-'}
                      </td>
                      <td className={`py-3 px-3 text-center text-sm font-medium border-b border-gray-200 ${getCohortColor(row.m5)}`}>
                        {row.m5 !== null ? `${row.m5}%` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 p-3 border-t border-gray-200 flex items-center justify-end gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span>50%+</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 rounded"></div>
                <span>40-49%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                <span>30-39%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-300 rounded"></div>
                <span>20-29%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-300 rounded"></div>
                <span>~19%</span>
              </div>
            </div>
          </div>

          {/* インサイト */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-gray-700">M1リテンション平均</p>
              <p className="text-2xl text-green-600">48.4%</p>
              <p className="text-xs text-gray-600 mt-1">業界平均35%を大きく上回る</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">M3リテンション平均</p>
              <p className="text-2xl text-blue-600">33.3%</p>
              <p className="text-xs text-gray-600 mt-1">安定した再購入行動</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// B-11: セグメント別LTV & 商品ミックス
const segmentLTVData = [
  { 
    segment: "30代女性・Google流入", 
    ltv12: 52800, 
    purchaseCount: 4.2, 
    categoryMix: "疲労回復 38% / 女性向け 32% / 美容 30%",
    isTop: true 
  },
  { 
    segment: "20代女性・SNS流入", 
    ltv12: 48900, 
    purchaseCount: 3.8, 
    categoryMix: "女性向け 45% / 美容 35% / 冷感 20%",
    isTop: true 
  },
  { 
    segment: "40代女性・オーガニック", 
    ltv12: 46200, 
    purchaseCount: 3.5, 
    categoryMix: "睡眠改善 42% / 疲労回復 35% / 温感 23%",
    isTop: true 
  },
  { 
    segment: "30代男性・Google流入", 
    ltv12: 38400, 
    purchaseCount: 2.9, 
    categoryMix: "疲労回復 55% / 温感 25% / 冷感 20%",
    isTop: false 
  },
  { 
    segment: "20代女性・LINE", 
    ltv12: 35600, 
    purchaseCount: 3.2, 
    categoryMix: "美容 48% / 女性向け 32% / 疲労回復 20%",
    isTop: false 
  },
  { 
    segment: "40代男性・オーガニック", 
    ltv12: 31200, 
    purchaseCount: 2.4, 
    categoryMix: "温感 45% / 疲労回復 35% / 睡眠改善 20%",
    isTop: false 
  }
];

export function SegmentLTVAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          セグメント別LTV & 商品ミックス
        </CardTitle>
        <CardDescription>顧客セグメント別の12ヶ月LTV・購入回数・主要カテゴリ構成分析</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* セグメントテーブル */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="text-left py-3 px-3 text-sm font-medium text-gray-700">セグメント</th>
                  <th className="text-right py-3 px-3 text-sm font-medium text-gray-700">12ヶ月LTV</th>
                  <th className="text-right py-3 px-3 text-sm font-medium text-gray-700">平均購入回数</th>
                  <th className="text-left py-3 px-3 text-sm font-medium text-gray-700">主な購入カテゴリ構成</th>
                </tr>
              </thead>
              <tbody>
                {segmentLTVData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-100 hover:bg-gray-50 ${
                      item.isTop ? 'bg-yellow-50' : ''
                    }`}
                  >
                    <td className="py-4 px-3 font-medium">
                      <div className="flex items-center gap-2">
                        {item.isTop && <Crown className="w-5 h-5 text-yellow-500" />}
                        <span>{item.segment}</span>
                      </div>
                    </td>
                    <td className={`py-4 px-3 text-right text-lg font-medium ${
                      item.isTop ? 'text-green-600' : 'text-gray-900'
                    }`}>
                      ¥{item.ltv12.toLocaleString()}
                    </td>
                    <td className="py-4 px-3 text-right">
                      <span className="text-lg">{item.purchaseCount}</span>
                      <span className="text-sm text-gray-600 ml-1">回</span>
                    </td>
                    <td className="py-4 px-3 text-sm text-gray-700">
                      {item.categoryMix}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* インサイト */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-5 h-5 text-yellow-600" />
                <p className="text-sm text-gray-700 font-medium">最高LTVセグメント</p>
              </div>
              <p className="text-lg font-medium text-yellow-900">30代女性・Google流入</p>
              <p className="text-2xl text-yellow-600 mt-1">¥52,800</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">全体平均LTV</p>
              <p className="text-2xl text-blue-600 mt-1">
                ¥{(segmentLTVData.reduce((sum, item) => sum + item.ltv12, 0) / segmentLTVData.length).toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-gray-700">平均購入回数</p>
              <p className="text-2xl text-green-600 mt-1">
                {(segmentLTVData.reduce((sum, item) => sum + item.purchaseCount, 0) / segmentLTVData.length).toFixed(1)}回
              </p>
            </div>
          </div>

          {/* 戦略提案 */}
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">💡 戦略的インサイト</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• TOP3セグメントはすべて女性顧客層で、疲労回復・美容・女性向けカテゴリの組み合わせが高LTVに寄与</li>
              <li>• Google流入顧客のLTVが高く、SEO投資の継続が推奨される</li>
              <li>• 30代女性は購入回数も多く、リピートキャンペーンの最優先ターゲット</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
