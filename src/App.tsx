import { useState } from "react";
import { Badge } from "./components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

// Tab A Components
import { ProductPortfolio } from "./components/ProductPortfolio";
import { InvestmentRecommendations } from "./components/InvestmentRecommendations";
import { PriorityProductDetail } from "./components/PriorityProductDetail";
import { KeywordHeatmap } from "./components/KeywordHeatmap";
import { ProductDevelopmentOpportunity } from "./components/ProductDevelopmentOpportunity";
import { ProductEvaluationChart } from "./components/ProductEvaluationChart";
import { TrendNewsSlider } from "./components/TrendNewsSlider";
import { ProductMarketDiagnosisForm } from "./components/ProductMarketDiagnosisForm";
import { ProductMarketDiagnosisResultList } from "./components/ProductMarketDiagnosisResultList";

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
  const [showResultList, setShowResultList] = useState(false);
  const [fromResultList, setFromResultList] = useState(false); // 結果一覧からの遷移かどうか

  const handleOpenDetail = (product: any) => {
    setSelectedProduct(product);
    setShowDetailPage(true);
    setFromResultList(false); // 通常の遷移
  };

  const handleCloseDetail = () => {
    setShowDetailPage(false);
    setSelectedProduct(null);
    // 結果一覧から遷移していた場合は結果一覧に戻る
    if (fromResultList) {
      setShowResultList(true);
      setFromResultList(false);
    }
  };

  const handleProductSearch = () => {
    if (searchQuery.trim()) {
      setShowDiagnosisForm(true);
    }
  };

  const handleCloseDiagnosisForm = () => {
    setShowDiagnosisForm(false);
  };

  const handleShowResults = () => {
    setShowDiagnosisForm(false);
    setShowResultList(true);
  };

  const handleCloseResultList = () => {
    setShowResultList(false);
  };

  const handleViewDetailFromResult = (productId: string) => {
    // 商品IDに基づいて適切な商品データを取得
    const productMap: Record<string, any> = {
      "prod-001": {
        productName: "睡眠改善パジャマ",
        category: "睡眠改善",
        sales: 1309523600,
        grossMargin: 45.1,
        growthRate: 450.0,
        rating: 4.7,
        reviewCount: 0,
        actionLabel: "新商品開発"
      },
      "prod-002": {
        productName: "美容繊維フェイスマスク",
        category: "美容",
        sales: 42000000,
        grossMargin: 45.2,
        growthRate: 38.2,
        rating: 4.8,
        reviewCount: 834,
        actionLabel: "新商品開発"
      },
      // 他の商品も必要に応じて追加可能
    };
    
    const mockProduct = productMap[productId] || {
      productName: "美容繊維フェイスマスク",
      category: "美容",
      sales: 42000000,
      grossMargin: 45.2,
      growthRate: 38.2,
      rating: 4.8,
      reviewCount: 834,
      actionLabel: "新商品開発"
    };
    
    setSelectedProduct(mockProduct);
    setFromResultList(true); // 結果一覧からの遷移
    setShowResultList(false);
    setShowDetailPage(true);
  };

  // 診断フォーム表示中
  if (showDiagnosisForm) {
    return (
      <ProductMarketDiagnosisForm
        isOpen={true}
        onClose={handleCloseDiagnosisForm}
        onShowResults={handleShowResults}
        initialQuery={searchQuery}
      />
    );
  }

  // 結果一覧表示中
  if (showResultList) {
    return (
      <ProductMarketDiagnosisResultList
        isOpen={true}
        onClose={handleCloseResultList}
        onViewDetail={handleViewDetailFromResult}
      />
    );
  }

  // 詳細ページ表示中はダッシュボードを非表示
  if (showDetailPage) {
    return (
      <PriorityProductDetail
        isOpen={true}
        onClose={handleCloseDetail}
        product={selectedProduct}
        showAdoptionButtons={fromResultList}
        onAdopt={() => {
          console.log("Product adopted:", selectedProduct);
        }}
        onReject={() => {
          console.log("Product rejected:", selectedProduct);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">APPA-TECH Investment & Growth Insights</h1>
              <p className="text-gray-600 mt-1">管理者専用 - アパテック市場投資判断支援ダッシュボード</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200">
              最終更新: 2024年6月15日
            </Badge>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {/* サマリー統計（全タブ共通：2段構成）- 非表示 */}
        {/* <div className="space-y-6 mb-8">
          {/* 1段目：事業の「稼ぎ」と成長 */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryStats.top.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <p className="text-sm text-gray-900">{stat.title}</p>
                          <p className="text-xs text-gray-500">{stat.subtitle}</p>
                        </div>
                        <p className="text-2xl mt-2">{stat.value}</p>
                        <p className={`text-sm mt-1 ${
                          stat.changeType === 'positive' ? 'text-green-600' : 
                          stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {stat.change}
                        </p>
                        {stat.subInfo && (
                          <p className="text-xs text-gray-500 mt-0.5">{stat.subInfo}</p>
                        )}
                      </div>
                      <IconComponent className="w-8 h-8 text-gray-400 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* 2段目：EC効率とプロダクトポートフォリオの健康 */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {summaryStats.bottom.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <p className="text-sm text-gray-900">{stat.title}</p>
                          <p className="text-xs text-gray-500">{stat.subtitle}</p>
                        </div>
                        <p className="text-2xl mt-2">{stat.value}</p>
                        <p className={`text-sm mt-1 ${
                          stat.changeType === 'positive' ? 'text-green-600' : 
                          stat.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {stat.change}
                        </p>
                        {stat.subInfo && (
                          <p className="text-xs text-gray-500 mt-0.5">{stat.subInfo}</p>
                        )}
                      </div>
                      <IconComponent className="w-8 h-8 text-gray-400 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div> */}

        {/* タブ切り替え */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="products">
              A. Products Invest（商品投資観点）
            </TabsTrigger>
            <TabsTrigger value="ec-growth">
              B. EC-Growth（ECモール改善観点）
            </TabsTrigger>
          </TabsList>

          {/* Tab A: Products Invest */}
          <TabsContent value="products" className="space-y-8">
            {/* 商品検索 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="例）睡眠改善パジャマ"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleProductSearch();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button onClick={handleProductSearch}>
                    この商品の投資予測確認
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* A-ポートフォリオ＆投資判断（ファーストビュー） */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">A-ポートフォリオ＆投資判断</h2>
              <div className="space-y-6">
                <InvestmentRecommendations onOpenDetail={handleOpenDetail} />
              </div>
            </section>

            {/* A-マーケットインサイト */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">A-マーケットインサイト</h2>
              <div className="space-y-6">
                {/* トレンドニュース */}
                <TrendNewsSlider />
                
                <ProductDevelopmentOpportunity />
              </div>
            </section>

            {/* A-プロダクトインサイト */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">A-プロダクトインサイト</h2>
              <div className="space-y-6">
                <ProductEvaluationChart />
              </div>
            </section>
          </TabsContent>

          {/* Tab B: EC-Growth */}
          <TabsContent value="ec-growth" className="space-y-8">
            {/* B-グロースアクション＆実験（ファーストビュー） */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">B-グロースアクション＆実験</h2>
              <Card>
                <CardHeader>
                  <CardTitle>EC-Growth機能は現在開発中です</CardTitle>
                  <CardDescription>
                    ECモール改善観点の分析機能は近日公開予定です。
                  </CardDescription>
                </CardHeader>
              </Card>
            </section>

            {/* 以下、開発中のため一時的にコメントアウト */}
            {/* <GrowthActions /> */}

            {/* B-集客＆ファネル分析 */}
            {/* <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">B-集客＆ファネル分析</h2>
              <div className="space-y-6">
                <ECMallSummary />
                <ChannelAnalysis />
                <LINEPerformance />
                <SiteSearch />
                <PurchaseFunnel />
              </div>
            </section> */}

            {/* B-顧客の声＆体験分析 */}
            {/* <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">B-顧客の声＆体験分析</h2>
              <div className="space-y-6">
                <ReviewAnalysis />
                <ReviewWordMapping />
                <SupportAnalysis />
              </div>
            </section> */}

            {/* B-顧客基盤＆LTV分析 */}
            {/* <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">B-顧客基盤＆LTV分析</h2>
              <div className="space-y-6">
                <DemographicAnalysis />
                <MAURetention />
                <SegmentLTVAnalysis />
              </div>
            </section> */}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}