import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ExternalLink, Calendar, TrendingUp, AlertTriangle, Lightbulb, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface NewsWeeklySummaryProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ReferenceArticle {
  id: number;
  title: string;
  url: string;
  source: string;
  date: string;
}

const referenceArticles: ReferenceArticle[] = [
  {
    id: 1,
    title: "機能性表示食品の景品表示法改正、アパレルへの適用拡大を検討",
    url: "#",
    source: "消費者庁公式",
    date: "2025.11.25"
  },
  {
    id: 2,
    title: "大手競合A社、睡眠改善ウェア市場に本格参入を発表",
    url: "#",
    source: "日経ビジネス",
    date: "2025.11.24"
  },
  {
    id: 3,
    title: "グローバルスポーツブランド、冷感素材の新技術で特許取得",
    url: "#",
    source: "繊維ニュース",
    date: "2025.11.23"
  },
  {
    id: 4,
    title: "フェムテック市場、2025年度は前年比45%増の見込み",
    url: "#",
    source: "日経MJ",
    date: "2025.11.22"
  },
  {
    id: 5,
    title: "サステナブル素材の調達コスト、前年比15%上昇",
    url: "#",
    source: "繊研新聞",
    date: "2025.11.21"
  }
];

export function NewsWeeklySummary({ isOpen, onClose }: NewsWeeklySummaryProps) {
  const currentWeekRange = "2025.11.21 - 2025.11.27";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <DialogTitle>今週のニュースサマリー</DialogTitle>
          </div>
          <DialogDescription className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {currentWeekRange}
            </Badge>
            <span className="text-xs text-gray-500">AI分析による経営者向けサマリー</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* エグゼクティブサマリー */}
          <Card className="border-l-4 border-l-blue-600 bg-blue-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                今週の重要ポイント
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• 景品表示法改正により、マーケティング手法の選択肢が拡大</li>
                <li>• 大手競合の睡眠改善市場参入により、競争激化の兆し</li>
                <li>• フェムテック市場の急成長、早期参入が優位性確保のカギ</li>
                <li>• サステナブル素材のコスト上昇、価格戦略の見直しが必要</li>
              </ul>
            </CardContent>
          </Card>

          {/* 法規制・制度変更 */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <h3 className="font-semibold text-gray-900">法規制・制度変更</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                今週の最重要ニュースは、<strong>機能性表示に関する景品表示法の改正案</strong>が公表されたことです（※1）。これまで機能性アパレルは「着心地の良さ」「快適性」といった主観的な表現に留まることが多く、具体的な機能効果（疲労回復、睡眠改善など）を訴求する際には慎重な表現が求められていました。
              </p>
              <p>
                今回の改正案では、<strong>科学的根拠に基づく機能性の表示が認められる範囲が拡大</strong>される見込みです。具体的には、第三者機関による試験データや医学論文の引用を明示することで、これまでよりも踏み込んだ効果効能の訴求が可能になります。
              </p>
              <p>
                <strong className="text-blue-600">経営上の影響：</strong>当社の主力カテゴリーである「疲労回復」「睡眠改善」において、よりダイレクトな訴求が可能になることで、顧客の購買意欲を高める効果が期待できます。一方で、科学的根拠の準備には相応のコストと時間がかかるため、<strong>商品開発プロセスに試験・検証フェーズを組み込む必要</strong>があります。
              </p>
              <div className="bg-gray-50 p-3 rounded border border-gray-200 mt-2">
                <p className="text-xs text-gray-600 mb-2">参考記事：</p>
                <a 
                  href={referenceArticles[0].url} 
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  onClick={(e) => e.preventDefault()}
                >
                  <ExternalLink className="w-4 h-4" />
                  ※1: {referenceArticles[0].title} - {referenceArticles[0].source} ({referenceArticles[0].date})
                </a>
              </div>
            </div>
          </section>

          {/* 競合動向 */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">競合動向</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                大手アパレル企業A社が、<strong>睡眠改善ウェア市場への本格参入を発表</strong>しました（※2）。同社は既に大規模な販売網と強いブランド力を持っており、睡眠科学の専門機関と提携して商品開発を進めているとのことです。
              </p>
              <p>
                A社の参入により、睡眠改善カテゴリーは今後<strong>競争が激化</strong>することが予想されます。特に、同社はマーケティング予算が潤沢であるため、認知度向上のスピードが速い可能性があります。
              </p>
              <p>
                <strong className="text-blue-600">経営上の影響：</strong>当社は睡眠改善カテゴリーで既に一定のシェアを確保していますが、競合参入前に<strong>顧客ロイヤルティを高める施策</strong>（リピート購入促進、コミュニティ形成など）を強化する必要があります。また、差別化要素として「国内製造」「オーガニック素材」など、大手が真似しにくい付加価値の訴求を強化すべきです。
              </p>
              <div className="bg-gray-50 p-3 rounded border border-gray-200 mt-2">
                <p className="text-xs text-gray-600 mb-2">参考記事：</p>
                <a 
                  href={referenceArticles[1].url} 
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  onClick={(e) => e.preventDefault()}
                >
                  <ExternalLink className="w-4 h-4" />
                  ※2: {referenceArticles[1].title} - {referenceArticles[1].source} ({referenceArticles[1].date})
                </a>
              </div>
            </div>
          </section>

          {/* 技術革新・新市場機会 */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">技術革新・新市場機会</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                グローバルスポーツブランドが、<strong>次世代冷感素材の特許を取得</strong>しました（※3）。この技術は従来の冷感素材と比較して、冷却効果が約2倍持続し、かつ洗濯耐久性にも優れているとのことです。
              </p>
              <p>
                当社でも冷感カテゴリーは夏季の主力商品ですが、この新技術が市場に広まると、<strong>現行商品の競争力が相対的に低下</strong>するリスクがあります。一方で、特許技術のライセンス供与や、独自の技術開発により対抗することも可能です。
              </p>
              <p>
                また、フェムテック×アパレルの市場が<strong>前年比45%増と急成長</strong>しています（※4）。特に生理周期に合わせた機能性インナーや、妊娠・産後ケア向けウェアなど、女性特有の悩みに寄り添った商品が支持を集めています。
              </p>
              <p>
                <strong className="text-blue-600">経営上の影響：</strong>フェムテック市場は当社がまだ本格参入していない領域ですが、<strong>早期参入により優位性を確保できる可能性</strong>が高いです。女性向けカテゴリーは既存顧客との親和性も高く、クロスセル効果も期待できます。今後6ヶ月以内に商品企画を開始することを推奨します。
              </p>
              <div className="bg-gray-50 p-3 rounded border border-gray-200 mt-2">
                <p className="text-xs text-gray-600 mb-2">参考記事：</p>
                <div className="space-y-2">
                  <a 
                    href={referenceArticles[2].url} 
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    ※3: {referenceArticles[2].title} - {referenceArticles[2].source} ({referenceArticles[2].date})
                  </a>
                  <a 
                    href={referenceArticles[3].url} 
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                    onClick={(e) => e.preventDefault()}
                  >
                    <ExternalLink className="w-4 h-4" />
                    ※4: {referenceArticles[3].title} - {referenceArticles[3].source} ({referenceArticles[3].date})
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* コスト・サプライチェーン */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h3 className="font-semibold text-gray-900">コスト・サプライチェーン</h3>
            </div>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <p>
                サステナブル素材（オーガニックコットン、リサイクルポリエステルなど）の調達コストが<strong>前年比15%上昇</strong>しています（※5）。背景には、需要の急増に対して供給が追いついていないこと、原油価格の高騰、物流コストの増加などがあります。
              </p>
              <p>
                当社はサステナブル素材を積極的に採用していますが、コスト上昇分をそのまま価格転嫁すると顧客離れのリスクがあります。一方で、Z世代を中心に「環境配慮」への支払い意欲は高まっており、<strong>適切なストーリーテリングと価格設定により、10%程度の価格上昇は受容される</strong>という調査結果もあります。
              </p>
              <p>
                <strong className="text-blue-600">経営上の影響：</strong>今後の価格改定において、サステナブル素材の価値を明確に伝えるコミュニケーション戦略が重要です。商品ページやパッケージで「環境負荷削減の具体的な数値」を示すなど、価格上昇の正当性を訴求する必要があります。
              </p>
              <div className="bg-gray-50 p-3 rounded border border-gray-200 mt-2">
                <p className="text-xs text-gray-600 mb-2">参考記事：</p>
                <a 
                  href={referenceArticles[4].url} 
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
                  onClick={(e) => e.preventDefault()}
                >
                  <ExternalLink className="w-4 h-4" />
                  ※5: {referenceArticles[4].title} - {referenceArticles[4].source} ({referenceArticles[4].date})
                </a>
              </div>
            </div>
          </section>

          {/* アクション推奨 */}
          <Card className="border-l-4 border-l-green-600 bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-green-600" />
                今週のアクション推奨
              </h3>
              <ol className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="font-semibold text-green-600">1.</span>
                  <span>法規制改正に向けて、主力商品の科学的根拠データの整備を開始（優先度：高）</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-green-600">2.</span>
                  <span>睡眠改善カテゴリーの顧客ロイヤルティ強化施策を実施（優先度：高）</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-green-600">3.</span>
                  <span>フェムテック市場への参入可能性を検討、商品企画チームでディスカッション（優先度：中）</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-green-600">4.</span>
                  <span>冷感素材の技術動向を継続モニタリング、R&D部門と連携（優先度：中）</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-semibold text-green-600">5.</span>
                  <span>サステナブル素材の価値訴求コンテンツを制作、価格改定の準備（優先度：中）</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
