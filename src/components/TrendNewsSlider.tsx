import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { TrendingUp, ExternalLink, ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NewsWeeklySummary } from "./NewsWeeklySummary";

// ニュースデータ型
interface NewsItem {
  id: number;
  originalTitle: string;
  executiveSummary: string;
  source: string;
  date: string;
  url: string;
  category: string;
  impact: "high" | "medium" | "low";
}

// モックニュースデータ（AI要約された経営者向けタイトル）
const trendNews: NewsItem[] = [
  {
    id: 1,
    originalTitle: "スポーツ庁が推進する健康経営施策により機能性ウェアの需要が増加",
    executiveSummary: "健康経営施策で機能性ウェア需要30%増、BtoB市場拡大の好機",
    source: "日経ビジネス",
    date: "2024.06.14",
    url: "#",
    category: "市場トレンド",
    impact: "high"
  },
  {
    id: 2,
    originalTitle: "睡眠改善テクノロジーを活用したウェアラブル製品が世界的に注目",
    executiveSummary: "睡眠改善ウェアの世界市場、2026年まで年率18%成長予測",
    source: "繊維ニュース",
    date: "2024.06.13",
    url: "#",
    category: "技術革新",
    impact: "high"
  },
  {
    id: 3,
    originalTitle: "サステナブル素材への消費者意識が高まり、オーガニックコットン需要が急増",
    executiveSummary: "Z世代の70%がサステナブル素材を購入基準に、価格10%高でも受容",
    source: "WWD Japan",
    date: "2024.06.12",
    url: "#",
    category: "消費者動向",
    impact: "medium"
  },
  {
    id: 4,
    originalTitle: "夏の猛暑対策として冷感素材を使用したビジネスウェアが人気",
    executiveSummary: "冷感ビジネスウェア、前年比2.5倍の売上で夏物の主力商材に浮上",
    source: "繊研新聞",
    date: "2024.06.11",
    url: "#",
    category: "市場トレンド",
    impact: "medium"
  },
  {
    id: 5,
    originalTitle: "遠赤外線繊維の特許技術を持つ国内メーカーが新素材を発表",
    executiveSummary: "新遠赤外線繊維、従来比1.5倍の保温性能で冬物商品の差別化に",
    source: "化学工業日報",
    date: "2024.06.10",
    url: "#",
    category: "技術革新",
    impact: "high"
  },
  {
    id: 6,
    originalTitle: "女性向けフェムテック市場が急拡大、アパレル業界も参入加速",
    executiveSummary: "フェムテック×アパレル市場5年で3倍予測、早期参入で優位性確保",
    source: "日経MJ",
    date: "2024.06.09",
    url: "#",
    category: "新市場",
    impact: "high"
  }
];

export function TrendNewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // 画面幅に応じた表示数
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 自動再生
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovered, itemsPerView]);

  const totalPages = Math.ceil(trendNews.length / itemsPerView);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getImpactLabel = (impact: string) => {
    switch (impact) {
      case "high":
        return "高インパクト";
      case "medium":
        return "中インパクト";
      case "low":
        return "低インパクト";
      default:
        return "中インパクト";
    }
  };

  const visibleNews = trendNews.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  // 現在の週の範囲を計算
  const getCurrentWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const formatDate = (date: Date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}/${month}/${day}`;
    };
    
    return `${formatDate(startOfWeek)} - ${formatDate(endOfWeek)}`;
  };

  return (
    <>
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900">業界トレンドニュース</h3>
            <span className="text-xs text-gray-500 ml-auto">経営判断に影響する最新情報</span>
          </div>

          {/* 週次サマリーボタン */}
          <div className="mb-4">
            <Button
              onClick={() => setIsSummaryOpen(true)}
              variant="outline"
              className="w-full justify-center gap-2 border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700"
            >
              <FileText className="w-4 h-4" />
              今週のニュースサマリーをチェック（{getCurrentWeekRange()}）
            </Button>
          </div>

          <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 前へボタン */}
          {totalPages > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors -translate-x-4"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* ニュースカード */}
          <div className="overflow-hidden px-2">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-4 ${
                itemsPerView === 1 ? "grid-cols-1" : 
                itemsPerView === 2 ? "grid-cols-2" : 
                "grid-cols-3"
              }`}
            >
              {visibleNews.map((news) => (
                <Card key={news.id} className="h-full border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded border ${getImpactColor(news.impact)}`}>
                        {getImpactLabel(news.impact)}
                      </span>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>

                    <h4 className="font-medium text-sm text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem]">
                      {news.executiveSummary}
                    </h4>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {news.category}
                        </span>
                        <span className="text-xs text-gray-500">{news.source}</span>
                      </div>
                      <a
                        href={news.url}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* 次へボタン */}
          {totalPages > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors translate-x-4"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>

        {/* ドットインジケーター */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-blue-600 w-6" 
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>

    {/* 週次サマリーモーダル */}
    <NewsWeeklySummary 
      isOpen={isSummaryOpen} 
      onClose={() => setIsSummaryOpen(false)} 
    />
    </>
  );
}
