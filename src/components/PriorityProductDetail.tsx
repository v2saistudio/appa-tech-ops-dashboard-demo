import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X, Download, FileText, FileSpreadsheet, TrendingUp, AlertTriangle, Package, ShoppingBag, Ruler, Factory, Shield, Target, DollarSign, BarChart3, LineChart, Calendar, Sparkles, Send, CheckCircle2, XCircle, Users } from "lucide-react";
import { useState } from "react";
import { ProposalRecruitmentFlow } from "./ProposalRecruitmentFlow";

interface ProductDetailData {
  productName: string;
  category: string;
  sales: number;
  grossMargin: number;
  growthRate: number;
  rating: number;
  reviewCount: number;
  actionLabel: string;
}

interface PriorityProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetailData | null;
  showAdoptionButtons?: boolean; // 採用・不採用ボタンの表示制御
  onAdopt?: () => void;
  onReject?: () => void;
}

// モックデータ：商品企画書
const productSpecs = {
  "美容繊維フェイスマスク": {
    // 基本情報
    basic: {
      productId: "APT-BT-FM-001",
      brand: "APPA-TECH Beauty",
      line: "コスメティック繊維",
      season: "オールシーズン",
      category: "アクセサリー",
      functionCategory: "美容",
      priceRange: "プレミアム",
      status: "量産決定",
      releaseDate: "2025年2月"
    },
    // ターゲット
    target: {
      gender: "女性",
      ageRange: "25-45歳",
      userType: "美容意識の高いオフィスワーカー、就寝時の肌ケアを重視する層",
      scenes: ["就寝時", "リラックスタイム", "スキンケア後"],
      motivation: [
        "夜間の肌乾燥が気になる",
        "スキンケア効果を高めたい",
        "寝ている間に美容ケアしたい"
      ],
      competitors: "一般的な保湿マスク、シルクマスク"
    },
    // 機能・素材
    function: {
      mainFunctions: ["保湿", "美容成分放出", "抗菌防臭", "通気性"],
      description: "特殊コスメティック繊維がスキンケア成分を徐々に放出し、就寝中の肌ケアをサポート",
      fabricOuter: "ポリエステル 65% / コスメティック繊維 30% / ポリウレタン 5%",
      fabricInner: "シルクプロテイン加工綿 100%",
      processing: ["ヒアルロン酸マイクロカプセル加工", "セラミド含浸加工", "抗菌防臭加工"],
      weight: "80 g/m²",
      thickness: "薄手",
      stretch: "縦・横ともに適度なストレッチ",
      evidence: [
        { test: "保湿性試験 ISO○○", result: "8時間後も肌水分量+15%維持" },
        { test: "成分放出試験", result: "6時間持続放出確認" }
      ],
      evidenceLevel: "外部検証済み"
    },
    // デザイン
    design: {
      silhouette: "フェイスフィット",
      designPoints: "耳掛けゴム調整可能、鼻部分ワイヤー入りで密着性向上",
      details: {
        neck: "-",
        sleeve: "-",
        waist: "耳掛けゴム：調整可能",
        pocket: "なし"
      },
      colors: [
        { name: "ラベンダーグレー", hex: "#C4B5D8" },
        { name: "ローズピンク", hex: "#F5D5E0" },
        { name: "シルバーホワイト", hex: "#F0F0F5" }
      ],
      graphics: "ブランドロゴ刺繍（左下部分）",
      images: 3
    },
    // サイズ
    size: {
      range: ["フリーサイズ（調整可能）"],
      specs: [
        { size: "Free", width: "18cm", height: "12cm", ear: "12-16cm調整可" }
      ]
    },
    // 生産
    production: {
      country: "日本",
      factory: "信州テキスタイル（長野）",
      moq: "500枚",
      leadTime: "45日",
      initialQty: "2,000枚",
      method: "横編み＋縫製",
      package: "化粧箱入り（個別OPP袋）",
      caseQty: "50枚/ケース",
      care: "手洗い推奨、ネット使用、陰干し"
    },
    // リスク
    risk: {
      regulation: "美容効果の医薬品的表現は禁止。「美容成分配合繊維」「保湿サポート」等の表現に限定",
      risks: [
        "肌に合わない場合のアレルギー反応",
        "洗濯による成分減少（30回洗濯後50%程度）"
      ],
      actions: [
        "パッケージに成分表示・パッチテスト推奨を記載",
        "洗濯回数と効果持続の目安を明記",
        "14日間返品保証"
      ]
    }
  },
  "睡眠改善パジャマ": {
    // 基本情報
    basic: {
      productId: "APT-SL-PJ-005",
      brand: "APPA-TECH Sleep",
      line: "スリープウェルネス",
      season: "オールシーズン",
      category: "トップス / ボトムス",
      functionCategory: "睡眠改善",
      priceRange: "プレミアム",
      status: "企画中",
      releaseDate: "2025年3月"
    },
    // ターゲット
    target: {
      gender: "男女両方（ユニセックス）",
      ageRange: "30-50歳",
      userType: "睡眠の質に悩むビジネスパーソン、疲労回復を重視する働く男女",
      scenes: ["就寝時", "リラックスタイム", "休日の昼寝"],
      motivation: [
        "寝ても疲れが取れない",
        "朝起きても体が重い",
        "睡眠の質を改善したい",
        "温度調節がうまくいかず夜中に目が覚める"
      ],
      competitors: "高級パジャマブランド、リカバリーウェア、一般的な機能性パジャマ"
    },
    // 機能・素材
    function: {
      mainFunctions: ["保温・発熱", "吸湿発熱繊維", "調湿機能", "着心地重視"],
      description: "吸湿発熱繊維とセラミック練り込み素材により、体温を最適に保ちながら快適な睡眠環境を実現。肌触りの良いオーガニックコットンをベースに、体温調節機能を付加",
      fabricOuter: "オーガニックコットン 55% / 吸湿発熱ポリエステル 40% / ポリウレタン 5%",
      fabricInner: "遠赤外線セラミック練り込み繊維",
      processing: ["吸湿発熱加工", "遠赤外線放出加工", "調湿機能", "抗菌防臭加工"],
      weight: "240 g/m²",
      thickness: "中肉",
      stretch: "縦・横ともに適度なストレッチ",
      evidence: [
        { test: "吸湿発熱性試験", result: "最大温度上昇+3.5℃" },
        { test: "遠赤外線放射率試験", result: "放射率 0.88（高水準）" },
        { test: "睡眠質評価モニター調査", result: "被験者の82%が睡眠の質向上を実感" }
      ],
      evidenceLevel: "外部検証済み"
    },
    // デザイン
    design: {
      silhouette: "ゆったりリラックス",
      designPoints: "縫い目フラット仕様で肌ストレス軽減、袖口・裾はリブ仕様で熱を逃がさない",
      details: {
        neck: "クルーネック",
        sleeve: "長袖（リブ仕様）",
        waist: "総ゴム＋ドローコード",
        pocket: "パンツ両脇ポケット"
      },
      colors: [
        { name: "ラベンダーミスト", hex: "#D8C8E0" },
        { name: "ウォームグレー", hex: "#B8B8B0" },
        { name: "ソフトネイビー", hex: "#4A5568" }
      ],
      graphics: "胸元に小さなスリープロゴ刺繍",
      images: 4
    },
    // サイズ
    size: {
      range: ["S", "M", "L", "XL"],
      specs: [
        { size: "S", length: "66cm", width: "48cm", shoulder: "40cm", sleeve: "56cm" },
        { size: "M", length: "68cm", width: "52cm", shoulder: "43cm", sleeve: "58cm" },
        { size: "L", length: "70cm", width: "56cm", shoulder: "46cm", sleeve: "60cm" },
        { size: "XL", length: "72cm", width: "60cm", shoulder: "49cm", sleeve: "62cm" }
      ]
    },
    // 生産
    production: {
      country: "日本",
      factory: "播州織物工房（兵庫）",
      moq: "800セット",
      leadTime: "55日",
      initialQty: "2,500セット",
      method: "丸編み＋カットソー縫製",
      package: "化粧箱入り（上下セット・個別OPP袋）",
      caseQty: "25セット/ケース",
      care: "洗濯機可（ネット使用推奨）、タンブラー乾燥不可、陰干し推奨"
    },
    // リスク
    risk: {
      regulation: "睡眠改善を医学的に保証する表現は禁止。「快適な睡眠環境をサポート」等の表現に限定",
      risks: [
        "個人差による効果実感の違い",
        "洗濯による機能性の低下（30回洗濯後70%程度維持）",
        "競合製品との差別化が難しい"
      ],
      actions: [
        "「個人の感想であり効果を保証するものではありません」を明記",
        "30日間返品保証制度",
        "洗濯方法の詳細ガイド提供",
        "エビデンスデータのLP掲載で信頼性向上"
      ]
    },
    // 競合分析
    competitive: {
      competitors: [
        {
          brand: "BAKUNE",
          product: "BAKUNEパジャマ",
          price: 26840,
          strengths: [
            "特殊機能繊維「SELFLAME®」による保温性",
            "一般医療機器認定（血行促進・疲労回復）",
            "豊富なカラーバリエーション",
            "著名アスリートの推薦"
          ],
          weaknesses: [
            "価格が高め",
            "デザインがスポーティ寄りで万人向けではない",
            "洗濯による機能低下の情報が不明確"
          ],
          marketShare: "リカバリーウェア市場シェア約35%"
        },
        {
          brand: "VENEX",
          product: "リチャージ+ パジャマ",
          price: 24200,
          strengths: [
            "PHT繊維による血流改善エビデンス",
            "医療・介護施設での採用実績",
            "幅広いサイズ展開",
            "落ち着いたデザイン"
          ],
          weaknesses: [
            "価格が高め",
            "若年層への認知度が低い",
            "オンライン販売が中心で試着が難しい"
          ],
          marketShare: "リカバリーウェア市場シェア約25%"
        },
        {
          brand: "無印良品",
          product: "オーガニックコットン 脇に縫い目のないパジャマ",
          price: 4990,
          strengths: [
            "圧倒的な価格競争力",
            "高い品質とコスパ",
            "店舗数が多く試着しやすい",
            "シンプルで飽きのこないデザイン"
          ],
          weaknesses: [
            "機能性が低い",
            "睡眠改善効果のエビデンスなし",
            "ブランドイメージが「普通」"
          ],
          marketShare: "一般パジャマ市場シェア約15%"
        }
      ],
      ourStrengths: [
        "BAKUNEと同価格帯で競争力あり",
        "オーガニックコットン使用で肌触りが良い",
        "吸湿発熱+遠赤外線のダブル機能",
        "男女両方に訴求できるデザイン",
        "日本製で品質への信頼性が高い"
      ],
      differentiationPoints: [
        "BAKUNEとの差別化：より自然な素材感と肌触り重視",
        "VENEXとの差別化：若年層にも受け入れられるモダンデザイン",
        "無印良品との差別化：科学的エビデンスに基づく機能性"
      ],
      pricingStrategy: "プレミアム市場で競合と同等価格。機能性とデザイン性で差別化し、BAKUNEユーザーの取り込みを狙う"
    }
  },
  "深眠サポートパジャマ": {
    basic: {
      productId: "APT-SL-PJ-002",
      brand: "APPA-TECH Sleep",
      line: "リカバリー",
      season: "オールシーズン",
      category: "トップス / ボトムス",
      functionCategory: "睡眠改善",
      priceRange: "ミドル〜プレミアム",
      status: "販売中（拡大生産予定）",
      releaseDate: "2024年11月"
    },
    target: {
      gender: "ユニセックス",
      ageRange: "30-50歳",
      userType: "睡眠の質に悩むビジネスパーソン、疲労回復を重視する層",
      scenes: ["就寝時", "リラックスタイム"],
      motivation: [
        "寝つきが悪い",
        "夜中に目が覚める",
        "朝の目覚めがすっきりしない"
      ],
      competitors: "高級パジャマブランド、リカバリーウェア"
    },
    function: {
      mainFunctions: ["温度調整", "メラトニン誘導サポート", "血行促進", "抗菌防臭"],
      description: "特殊鉱石練り込み繊維が遠赤外線を放出し、体温を最適化。深部体温の自然な低下をサポートして入眠を促進",
      fabricOuter: "オーガニックコットン 60% / 機能性ポリエステル 35% / ポリウレタン 5%",
      fabricInner: "遠赤外線放出セラミック練り込み繊維",
      processing: ["遠赤外線放出加工", "吸湿発熱", "抗菌防臭加工"],
      weight: "220 g/m²",
      thickness: "中肉",
      stretch: "縦・横ともに適度なストレッチ",
      evidence: [
        { test: "深部体温測定試験", result: "入眠時の体温低下が平均18分早い" },
        { test: "睡眠質評価", result: "被験者の78%が睡眠の質向上を実感" }
      ],
      evidenceLevel: "外部検証＋学術論文あり"
    },
    design: {
      silhouette: "リラックス",
      designPoints: "ゆったりシルエット、縫い目フラット仕様で肌ストレス軽減",
      details: {
        neck: "クルーネック",
        sleeve: "長袖",
        waist: "総ゴム＋ドローコード",
        pocket: "パンツ両脇ポケット"
      },
      colors: [
        { name: "ミッドナイトネイビー", hex: "#2C3E50" },
        { name: "モーニンググレー", hex: "#95A5A6" },
        { name: "クラウドホワイト", hex: "#ECF0F1" }
      ],
      graphics: "胸元小ロゴ刺繍",
      images: 4
    },
    size: {
      range: ["S", "M", "L", "XL"],
      specs: [
        { size: "S", length: "68cm", width: "50cm", shoulder: "42cm", sleeve: "58cm" },
        { size: "M", length: "70cm", width: "54cm", shoulder: "45cm", sleeve: "60cm" },
        { size: "L", length: "72cm", width: "58cm", shoulder: "48cm", sleeve: "62cm" },
        { size: "XL", length: "74cm", width: "62cm", shoulder: "51cm", sleeve: "64cm" }
      ]
    },
    production: {
      country: "ベトナム",
      factory: "Thanh Cong Textile",
      moq: "1,000セット",
      leadTime: "60日",
      initialQty: "3,000セット",
      method: "丸編み＋カットソー縫製",
      package: "化粧箱入り（上下セット）",
      caseQty: "20セット/ケース",
      care: "洗濯機可（ネット使用）、タンブラー乾燥不可"
    },
    risk: {
      regulation: "睡眠効果を医学的に保証する表現は禁止。「睡眠環境サポート」等の表現に限定",
      risks: [
        "個人差による効果実感の違い",
        "洗濯による機能低下"
      ],
      actions: [
        "「個人差があります」を明記",
        "30日間返品保証",
        "洗濯方法の詳細ガイド提供"
      ]
    }
  },
  "リカバリー着圧レギンス Pro": {
    basic: {
      productId: "APT-RC-LG-003",
      brand: "APPA-TECH Recovery",
      line: "リカバリー Pro",
      season: "オールシーズン",
      category: "ボトムス",
      functionCategory: "疲労回復",
      priceRange: "プレミアム",
      status: "企画中（サンプル段階）",
      releaseDate: "2025年4月"
    },
    target: {
      gender: "女性",
      ageRange: "25-45歳",
      userType: "立ち仕事、デスクワーク、運動後のリカバリーを重視する層",
      scenes: ["就寝時", "リカバリータイム", "デスクワーク中", "運動後"],
      motivation: [
        "脚のむくみがつらい",
        "立ち仕事で脚が疲れる",
        "運動後の疲労を早く取りたい"
      ],
      competitors: "医療用着圧ストッキング、スポーツリカバリーウェア"
    },
    function: {
      mainFunctions: ["段階着圧", "血行促進", "疲労回復サポート", "姿勢サポート"],
      description: "医療用レベルの段階着圧設計により、足首から太ももまで最適な圧力を加え、血流を促進。疲労物質の排出をサポート",
      fabricOuter: "ナイロン 75% / ポリウレタン 25%",
      fabricInner: "吸湿速乾メッシュ構造",
      processing: ["段階着圧設計（足首20hPa→ふくらはぎ15hPa→太もも10hPa）", "抗菌防臭加工", "UV加工"],
      weight: "180 g/m²",
      thickness: "中肉",
      stretch: "縦20% / 横40%（高ストレッチ）",
      evidence: [
        { test: "着圧測定試験 JIS L 1096", result: "段階着圧20-10hPa達成" },
        { test: "血流促進試験", result: "着用2時間後、血流速度+28%向上" },
        { test: "疲労回復試験", result: "筋疲労マーカー（CK値）が24時間後-35%低下" }
      ],
      evidenceLevel: "外部検証＋学術論文あり"
    },
    design: {
      silhouette: "タイト（着圧仕様）",
      designPoints: "段階着圧設計、ハイウエスト仕様で腹部サポート",
      details: {
        neck: "-",
        sleeve: "-",
        waist: "ハイウエスト・ワイドゴム",
        pocket: "なし"
      },
      colors: [
        { name: "マットブラック", hex: "#1C1C1C" },
        { name: "チャコールグレー", hex: "#4A4A4A" },
        { name: "ディープネイビー", hex: "#1A237E" }
      ],
      graphics: "サイド縦ライン（着圧部分を可視化）、太もも部分にロゴプリント",
      images: 5
    },
    size: {
      range: ["S", "M", "L", "XL"],
      specs: [
        { size: "S", waist: "58-64cm", hip: "82-90cm", length: "88cm", ankle: "19-21cm" },
        { size: "M", waist: "64-70cm", hip: "87-95cm", length: "90cm", ankle: "21-23cm" },
        { size: "L", waist: "69-77cm", hip: "92-100cm", length: "92cm", ankle: "23-25cm" },
        { size: "XL", waist: "77-85cm", hip: "97-105cm", length: "94cm", ankle: "25-27cm" }
      ]
    },
    production: {
      country: "台湾",
      factory: "Eclat Textile",
      moq: "800枚",
      leadTime: "55日",
      initialQty: "2,500枚",
      method: "丸編み（ホールガーメント）",
      package: "化粧箱入り（個別OPP袋＋ハンガー）",
      caseQty: "30枚/ケース",
      care: "手洗い推奨、ネット使用必須、陰干し"
    },
    risk: {
      regulation: "医療用着圧の効果を謳うことは禁止。「段階着圧設計」「血行サポート」等の表現に限定",
      risks: [
        "着圧が強すぎる場合の不快感・血行障害",
        "サイズ選択ミスによる効果不足",
        "長時間着用による肌トラブル"
      ],
      actions: [
        "パッケージに着用時間ガイドライン（1日8時間以内推奨）を明記",
        "サイズ選択ガイドの充実",
        "14日間サイズ交換保証"
      ]
    }
  }
};

// モックデータ：投資回収予測
const investmentData = {
  "美容繊維フェイスマスク": {
    sales: {
      period: 12,
      startMonth: "2025年2月",
      channels: [
        { name: "APPA-TECHモール", ratio: 60 },
        { name: "直営EC", ratio: 30 },
        { name: "他社ECモール", ratio: 10 }
      ],
      monthlySales: [150, 200, 250, 300, 320, 340, 360, 380, 400, 420, 440, 460],
      totalUnits: 4020,
      listPrice: 3980,
      avgPrice: 3582,
      discountRate: 10,
      taxRate: 10
    },
    variable: {
      fob: 1200,
      packaging: 180,
      totalCost: 1380,
      costRatio: 34.7,
      logistics: 250,
      shipping: 180,
      delivery: 320,
      paymentFee: 3.5,
      platformFee: 12,
      returnRate: 8
    },
    fixed: {
      pattern: 180000,
      sample: 320000,
      fitting: 150000,
      photo: 280000,
      content: 420000,
      launchCampaign: 800000,
      monthlyAd: 350000,
      personnelMonthly: 280000,
      systemMonthly: 45000
    },
    simulation: {
      totalRevenue: 14409840,
      netRevenue: 13247856,
      productCost: 5548800,
      variableCost: 3014400,
      grossProfit: 4684656,
      grossMarginRate: 35.4,
      fixedCost: 7580000,
      operatingProfit: -2895344,
      contributionMarginRate: -20.1,
      breakEvenUnits: 5280,
      breakEvenMonth: 15
    },
    scenarios: [
      {
        name: "保守",
        units: 3216,
        revenue: 11527872,
        grossProfit: 3747725,
        operatingProfit: -3832275,
        roi: -50.5,
        breakEvenMonth: 18
      },
      {
        name: "標準",
        units: 4020,
        revenue: 14409840,
        grossProfit: 4684656,
        operatingProfit: -2895344,
        roi: -38.2,
        breakEvenMonth: 15
      },
      {
        name: "攻め",
        units: 4824,
        revenue: 17291808,
        grossProfit: 5621587,
        operatingProfit: -1958413,
        roi: -25.8,
        breakEvenMonth: 13
      }
    ]
  },
  "睡眠改善パジャマ": {
    sales: {
      period: 12,
      startMonth: "2025年3月",
      channels: [
        { name: "APPA-TECHモール", ratio: 58 },
        { name: "直営EC", ratio: 32 },
        { name: "他社ECモール", ratio: 10 }
      ],
      monthlySales: [200, 400, 800, 1500, 2500, 4000, 5500, 6500, 7500, 8500, 9500, 10500],
      totalUnits: 57400,
      listPrice: 26840,
      avgPrice: 22814,
      discountRate: 15,
      taxRate: 10
    },
    variable: {
      fob: 8500,
      packaging: 600,
      totalCost: 9100,
      costRatio: 39.9,
      logistics: 480,
      shipping: 350,
      delivery: 580,
      paymentFee: 3.5,
      platformFee: 11,
      returnRate: 5
    },
    fixed: {
      pattern: 280000,
      sample: 520000,
      fitting: 230000,
      photo: 420000,
      content: 580000,
      launchCampaign: 1500000,
      monthlyAd: 480000,
      personnelMonthly: 350000,
      systemMonthly: 60000
    },
    simulation: {
      totalRevenue: 1540616000,
      netRevenue: 1309523600,
      productCost: 522340000,
      variableCost: 196428540,
      grossProfit: 590755060,
      grossMarginRate: 45.1,
      fixedCost: 18180000,
      operatingProfit: 572575060,
      contributionMarginRate: 3149.0,
      breakEvenUnits: 950,
      breakEvenMonth: 3
    },
    scenarios: [
      {
        name: "保守",
        units: 45920,
        revenue: 1047618880,
        grossProfit: 472604048,
        operatingProfit: 454424048,
        roi: 2500.0,
        breakEvenMonth: 3
      },
      {
        name: "標準",
        units: 57400,
        revenue: 1309523600,
        grossProfit: 590755060,
        operatingProfit: 572575060,
        roi: 3149.0,
        breakEvenMonth: 3
      },
      {
        name: "攻め",
        units: 68880,
        revenue: 1571428320,
        grossProfit: 708906072,
        operatingProfit: 690726072,
        roi: 3799.0,
        breakEvenMonth: 2
      }
    ]
  },
  "深眠サポートパジャマ": {
    sales: {
      period: 12,
      startMonth: "2025年1月",
      channels: [
        { name: "APPA-TECHモール", ratio: 55 },
        { name: "直営EC", ratio: 35 },
        { name: "他社ECモール", ratio: 10 }
      ],
      monthlySales: [200, 280, 350, 420, 450, 480, 510, 540, 570, 600, 630, 660],
      totalUnits: 5690,
      listPrice: 8900,
      avgPrice: 7565,
      discountRate: 15,
      taxRate: 10
    },
    variable: {
      fob: 2800,
      packaging: 420,
      totalCost: 3220,
      costRatio: 42.6,
      logistics: 380,
      shipping: 250,
      delivery: 450,
      paymentFee: 3.5,
      platformFee: 10,
      returnRate: 6
    },
    fixed: {
      pattern: 250000,
      sample: 480000,
      fitting: 220000,
      photo: 380000,
      content: 520000,
      launchCampaign: 1200000,
      monthlyAd: 480000,
      personnelMonthly: 350000,
      systemMonthly: 55000
    },
    simulation: {
      totalRevenue: 43044850,
      netRevenue: 40462159,
      productCost: 18321800,
      variableCost: 6139400,
      grossProfit: 16000959,
      grossMarginRate: 39.5,
      fixedCost: 9695000,
      operatingProfit: 6305959,
      contributionMarginRate: 15.6,
      breakEvenUnits: 3420,
      breakEvenMonth: 7
    },
    scenarios: [
      {
        name: "保守",
        units: 4552,
        revenue: 34435880,
        grossProfit: 12800767,
        operatingProfit: 3105767,
        roi: 32.0,
        breakEvenMonth: 8
      },
      {
        name: "標準",
        units: 5690,
        revenue: 43044850,
        grossProfit: 16000959,
        operatingProfit: 6305959,
        roi: 65.0,
        breakEvenMonth: 7
      },
      {
        name: "攻め",
        units: 6828,
        revenue: 51653820,
        grossProfit: 19201151,
        operatingProfit: 9506151,
        roi: 98.0,
        breakEvenMonth: 6
      }
    ]
  },
  "リカバリー着圧レギンス Pro": {
    sales: {
      period: 12,
      startMonth: "2025年4月",
      channels: [
        { name: "APPA-TECHモール", ratio: 50 },
        { name: "直営EC", ratio: 40 },
        { name: "他社ECモール", ratio: 10 }
      ],
      monthlySales: [180, 250, 320, 400, 450, 500, 550, 600, 650, 700, 750, 800],
      totalUnits: 6150,
      listPrice: 6980,
      avgPrice: 6282,
      discountRate: 10,
      taxRate: 10
    },
    variable: {
      fob: 2200,
      packaging: 280,
      totalCost: 2480,
      costRatio: 39.5,
      logistics: 320,
      shipping: 220,
      delivery: 380,
      paymentFee: 3.5,
      platformFee: 11,
      returnRate: 7
    },
    fixed: {
      pattern: 220000,
      sample: 420000,
      fitting: 180000,
      photo: 350000,
      content: 480000,
      launchCampaign: 1000000,
      monthlyAd: 420000,
      personnelMonthly: 320000,
      systemMonthly: 50000
    },
    simulation: {
      totalRevenue: 38634300,
      netRevenue: 35929839,
      productCost: 15252000,
      variableCost: 5658000,
      grossProfit: 15019839,
      grossMarginRate: 41.8,
      fixedCost: 8480000,
      operatingProfit: 6539839,
      contributionMarginRate: 18.2,
      breakEvenUnits: 3680,
      breakEvenMonth: 7
    },
    scenarios: [
      {
        name: "保守",
        units: 4920,
        revenue: 30907440,
        grossProfit: 12015871,
        operatingProfit: 3535871,
        roi: 41.7,
        breakEvenMonth: 8
      },
      {
        name: "標準",
        units: 6150,
        revenue: 38634300,
        grossProfit: 15019839,
        operatingProfit: 6539839,
        roi: 77.1,
        breakEvenMonth: 7
      },
      {
        name: "攻め",
        units: 7380,
        revenue: 46361160,
        grossProfit: 18023807,
        operatingProfit: 9543807,
        roi: 112.5,
        breakEvenMonth: 6
      }
    ]
  }
};

export function PriorityProductDetail({ 
  isOpen, 
  onClose, 
  product, 
  showAdoptionButtons = false,
  onAdopt,
  onReject
}: PriorityProductDetailProps) {
  const [activeScenario, setActiveScenario] = useState<"保守" | "標準" | "攻め">("標準");
  const [isRecruitmentModalOpen, setIsRecruitmentModalOpen] = useState(false);
  const [adoptionStatus, setAdoptionStatus] = useState<"採用" | "不採用" | null>(null);

  if (!isOpen || !product) return null;

  const specs = productSpecs[product.productName as keyof typeof productSpecs];
  const investment = investmentData[product.productName as keyof typeof investmentData];

  if (!specs || !investment) return null;

  const handleDownloadPDF = () => {
    alert("企画書PDFをダウンロードします（実装はモックです）");
  };

  const handleDownloadExcel = () => {
    alert("投資計画Excelをダウンロードします（実装はモックです）");
  };

  const handleAdoptProduct = () => {
    setAdoptionStatus("採用");
    if (onAdopt) {
      onAdopt();
    }
    alert(`「${product.productName}」を採用候補に追加しました。`);
  };

  const handleRejectProduct = () => {
    setAdoptionStatus("不採用");
    if (onReject) {
      onReject();
    }
    alert(`「${product.productName}」を不採用にしました。`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white w-full relative">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl">{product.productName}</h2>
                <Badge className="bg-white/20 text-white border-white/30">
                  {specs.basic.productId}
                </Badge>
                <Badge className={`${product.actionLabel === "新商品開発" ? "bg-purple-100 text-purple-800" : product.actionLabel === "在庫増" ? "bg-green-100 text-green-800" : "bg-cyan-100 text-cyan-800"} border-0`}>
                  {product.actionLabel}
                </Badge>
              </div>
              <p className="text-blue-100">{specs.basic.brand} - {specs.basic.line}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 主要KPI */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-blue-100 mb-1">売上予測（年間）</p>
              <p className="text-xl">¥{(investment.simulation.totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-blue-100 mb-1">総投資額</p>
              <p className="text-xl">¥{(investment.simulation.fixedCost / 1000000).toFixed(1)}M</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-blue-100 mb-1">予測ROI（標準）</p>
              <p className={`text-xl ${investment.scenarios[1].roi > 0 ? "text-green-300" : "text-red-300"}`}>
                {investment.scenarios[1].roi > 0 ? "+" : ""}{investment.scenarios[1].roi}%
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <p className="text-sm text-blue-100 mb-1">損益分岐点</p>
              <p className="text-xl">{investment.simulation.breakEvenMonth}ヶ月目</p>
            </div>
          </div>

          {/* ダウンロードボタン */}
          <div className="flex gap-3 mt-4 justify-between">
            <div className="flex gap-3">
              <Button
                onClick={handleDownloadPDF}
                className="bg-white text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                size="sm"
              >
                <FileText className="w-4 h-4" />
                企画書PDF（A4横）ダウンロード
              </Button>
              <Button
                onClick={handleDownloadExcel}
                className="bg-white text-green-600 hover:bg-green-50 flex items-center gap-2"
                size="sm"
              >
                <FileSpreadsheet className="w-4 h-4" />
                投資計画Excelダウンロード
              </Button>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setIsRecruitmentModalOpen(true)}
                className="bg-white text-purple-600 hover:bg-purple-50 flex items-center gap-2"
                size="sm"
              >
                <Send className="w-4 h-4" />
                企画提案を一斉募集
              </Button>
              {showAdoptionButtons && (
                <>
                  <Button
                    onClick={handleAdoptProduct}
                    disabled={adoptionStatus === "採用"}
                    className={`bg-white ${adoptionStatus === "採用" ? "text-green-600 border-green-600 border-2" : "text-green-600 hover:bg-green-50"} flex items-center gap-2`}
                    size="sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {adoptionStatus === "採用" ? "採用済み" : "採用"}
                  </Button>
                  <Button
                    onClick={handleRejectProduct}
                    disabled={adoptionStatus === "不採用"}
                    className={`bg-white ${adoptionStatus === "不採用" ? "text-red-600 border-red-600 border-2" : "text-red-600 hover:bg-red-50"} flex items-center gap-2`}
                    size="sm"
                  >
                    <XCircle className="w-4 h-4" />
                    {adoptionStatus === "不採用" ? "不採用済み" : "不採用"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* コンテンツ */}
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {/* === 上カラム：商品企画書 === */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold">新商品のアパレル商品企画書</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* 1-1. 基本情報・ポジショニング */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    基本情報・ポジショニング
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">商品名</p>
                      <p className="font-medium">{product.productName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">商品ID</p>
                      <p className="font-medium">{specs.basic.productId}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ブランド名</p>
                      <p className="font-medium">{specs.basic.brand}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ライン名</p>
                      <p className="font-medium">{specs.basic.line}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">シーズン</p>
                      <p className="font-medium">{specs.basic.season}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">カテゴリー</p>
                      <p className="font-medium">{specs.basic.category}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">機能カテゴリ</p>
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">{specs.basic.functionCategory}</Badge>
                    </div>
                    <div>
                      <p className="text-gray-600">価格レンジ</p>
                      <p className="font-medium">{specs.basic.priceRange}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">企画ステータス</p>
                      <Badge className="bg-green-100 text-green-800 border-green-300">{specs.basic.status}</Badge>
                    </div>
                    <div>
                      <p className="text-gray-600">発売予定時期</p>
                      <p className="font-medium">{specs.basic.releaseDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 1-2. ターゲット & 着用シーン */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    ターゲット & 着用シーン
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">ターゲット性別</p>
                    <p className="font-medium">{specs.target.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">主な年齢レンジ</p>
                    <p className="font-medium">{specs.target.ageRange}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">体型・利用者特徴</p>
                    <p className="font-medium">{specs.target.userType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">主な着用シーン</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {specs.target.scenes.map((scene, i) => (
                        <Badge key={i} className="bg-cyan-100 text-cyan-800 border-cyan-300 text-xs">{scene}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">購買動機</p>
                    <ul className="list-disc list-inside space-y-1">
                      {specs.target.motivation.map((m, i) => (
                        <li key={i} className="text-sm">{m}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">想定競合商品</p>
                    <p className="text-sm">{specs.target.competitors}</p>
                  </div>
                </CardContent>
              </Card>

              {/* 1-3. 機能・素材仕様 */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-green-600" />
                    機能・素材仕様
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-gray-600 mb-2">主要機能</p>
                    <div className="flex flex-wrap gap-2">
                      {specs.function.mainFunctions.map((fn, i) => (
                        <Badge key={i} className="bg-green-100 text-green-800 border-green-300">{fn}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">機能説明</p>
                    <p className="text-sm">{specs.function.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">表地素材構成</p>
                      <p className="font-medium">{specs.function.fabricOuter}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">裏地／別布素材構成</p>
                      <p className="font-medium">{specs.function.fabricInner}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">機能性加工</p>
                    <div className="flex flex-wrap gap-1">
                      {specs.function.processing.map((proc, i) => (
                        <Badge key={i} className="bg-blue-100 text-blue-800 border-blue-300 text-xs">{proc}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">目付</p>
                      <p className="font-medium">{specs.function.weight}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">厚み</p>
                      <p className="font-medium">{specs.function.thickness}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">ストレッチ性</p>
                      <p className="font-medium">{specs.function.stretch}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">証明データ・エビデンス</p>
                    <div className="space-y-2 bg-green-50 p-3 rounded border border-green-200">
                      {specs.function.evidence.map((ev, i) => (
                        <div key={i} className="text-sm">
                          <p className="font-medium">{ev.test}</p>
                          <p className="text-gray-700">→ {ev.result}</p>
                        </div>
                      ))}
                      <p className="text-xs text-gray-600 mt-2">エビデンスレベル: {specs.function.evidenceLevel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 1-4. デザイン仕様 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-purple-600" />
                    デザイン仕様
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600">シルエット</p>
                    <p className="font-medium">{specs.design.silhouette}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">デザインポイント</p>
                    <p className="text-sm">{specs.design.designPoints}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">デザインディテール</p>
                    <div className="bg-gray-50 p-2 rounded space-y-1 text-xs">
                      {specs.design.details.neck !== "-" && <p>• ネック: {specs.design.details.neck}</p>}
                      {specs.design.details.sleeve !== "-" && <p>• 袖: {specs.design.details.sleeve}</p>}
                      <p>• ウエスト: {specs.design.details.waist}</p>
                      <p>• ポケット: {specs.design.details.pocket}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2">カラー展開</p>
                    <div className="space-y-1">
                      {specs.design.colors.map((color, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: color.hex }}></div>
                          <span className="text-sm">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">グラフィック・ロゴ仕様</p>
                    <p className="text-sm">{specs.design.graphics}</p>
                  </div>
                </CardContent>
              </Card>

              {/* 1-5. サイズ展開・寸法 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-orange-600" />
                    サイズ展開・寸法
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2 text-sm">サイズ展開</p>
                  <div className="flex gap-2 mb-3">
                    {specs.size.range.map((size, i) => (
                      <Badge key={i} className="bg-orange-100 text-orange-800 border-orange-300">{size}</Badge>
                    ))}
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-2">サイズ</th>
                          {Object.keys(specs.size.specs[0]).filter(k => k !== "size").map((key, i) => (
                            <th key={i} className="text-right py-2 px-2">{key}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {specs.size.specs.map((spec, i) => (
                          <tr key={i} className="border-b">
                            <td className="py-2 px-2 font-medium">{spec.size}</td>
                            {Object.entries(spec).filter(([k]) => k !== "size").map(([k, v], j) => (
                              <td key={j} className="text-right py-2 px-2">{v}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* 1-6. 生産・ロジスティクス条件 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="w-5 h-5 text-gray-600" />
                    生��・ロジスティクス条件
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">生産国</p>
                    <p className="font-medium">{specs.production.country}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">主要工場名</p>
                    <p className="font-medium">{specs.production.factory}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">最小ロット数（MOQ）</p>
                    <p className="font-medium">{specs.production.moq}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">生産リードタイム</p>
                    <p className="font-medium">{specs.production.leadTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">初回生産予定数量</p>
                    <p className="font-medium">{specs.production.initialQty}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">製造方法</p>
                    <p className="font-medium">{specs.production.method}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">パッケージ仕様</p>
                    <p className="text-sm">{specs.production.package}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">梱包単位・ケース入数</p>
                    <p className="font-medium">{specs.production.caseQty}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">ケアラベル表示内容</p>
                    <p className="text-sm">{specs.production.care}</p>
                  </div>
                </CardContent>
              </Card>

              {/* 1-7. エビデンス・リスク情報 */}
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    エビデンス・リスク情報
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">表現上の注意事項</p>
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                      <p>{specs.risk.regulation}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">想定されるリスク</p>
                    <ul className="list-disc list-inside space-y-1 bg-red-50 p-3 rounded border border-red-200">
                      {specs.risk.risks.map((risk, i) => (
                        <li key={i}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">対応方針</p>
                    <ul className="list-disc list-inside space-y-1 bg-green-50 p-3 rounded border border-green-200">
                      {specs.risk.actions.map((action, i) => (
                        <li key={i}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* === 競合分析 === */}
          {specs.competitive && (
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-6 h-6 text-orange-600" />
                <h3 className="text-xl font-semibold">競合分析</h3>
              </div>

              <div className="space-y-6">
                {/* 競合製品比較 */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-orange-600" />
                      主要競合製品の比較
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {specs.competitive.competitors.map((competitor: any, index: number) => (
                        <div key={index} className="border-l-4 border-orange-300 pl-4 pb-4 border-b last:border-b-0">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{competitor.brand}</h4>
                              <p className="text-sm text-gray-600">{competitor.product}</p>
                            </div>
                            <Badge className="bg-orange-100 text-orange-800 border-0">
                              ¥{competitor.price.toLocaleString()}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <p className="text-sm font-semibold text-green-700 mb-2">強み</p>
                              <ul className="text-sm space-y-1">
                                {competitor.strengths.map((strength: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-green-600 mt-0.5">✓</span>
                                    <span>{strength}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-red-700 mb-2">弱み</p>
                              <ul className="text-sm space-y-1">
                                {competitor.weaknesses.map((weakness: string, i: number) => (
                                  <li key={i} className="flex items-start gap-2">
                                    <span className="text-red-600 mt-0.5">×</span>
                                    <span>{weakness}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {competitor.marketShare && (
                            <p className="text-sm text-gray-600 mt-3 bg-gray-50 p-2 rounded">
                              <strong>市場シェア：</strong>{competitor.marketShare}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* 自社の優位性と差別化戦略 */}
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-blue-50 border-blue-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        自社の優位性
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {specs.competitive.ourStrengths.map((strength: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-blue-600 mt-0.5 font-bold">●</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50 border-purple-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="w-5 h-5 text-purple-600" />
                        差別化ポイント
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {specs.competitive.differentiationPoints.map((point: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-purple-600 mt-0.5 font-bold">▶</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* 価格戦略 */}
                <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-orange-600" />
                      価格戦略
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{specs.competitive.pricingStrategy}</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* === 下カラム：投資回収予測 === */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-semibold">投資回収予測</h3>
            </div>

            <div className="space-y-6">
              {/* 2-6. 投資判断サマリー・推奨アクション（結論ファースト） */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    投資判断サマリー・推奨アクション
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">投資総額</p>
                      <p className="text-xl font-medium">¥{(investment.simulation.fixedCost / 1000000).toFixed(1)}M</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">標準シナリオROI</p>
                      <p className={`text-xl font-medium ${investment.scenarios[1].roi > 0 ? "text-green-600" : "text-red-600"}`}>
                        {investment.scenarios[1].roi > 0 ? "+" : ""}{investment.scenarios[1].roi}%
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-sm text-gray-600 mb-1">攻めシナリオROI</p>
                      <p className={`text-xl font-medium ${investment.scenarios[2].roi > 0 ? "text-green-600" : "text-red-600"}`}>
                        {investment.scenarios[2].roi > 0 ? "+" : ""}{investment.scenarios[2].roi}%
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <h4 className="font-medium mb-2">推奨アクション</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {investment.scenarios[1].roi > 50 ? (
                        <>
                          <li className="text-green-700">✅ 高ROI商品です。積極投資を推奨します。</li>
                          <li className="text-blue-700">プロモーション予算を増額し、攻めシナリオを目指す価値があります。</li>
                          <li className="text-blue-700">初回生産数を増やし、在庫切れリスクを回避してください。</li>
                        </>
                      ) : investment.scenarios[1].roi > 0 ? (
                        <>
                          <li className="text-blue-700">✅ 標準シナリオでプラスROI。投資実行を推奨します。</li>
                          <li className="text-blue-700">広告効率を高め、攻めシナリオへのシフトを検討してくださ���。</li>
                          <li className="text-yellow-700">⚠️ 固定費を抑えつつ、販売数増加施策に注力してください。</li>
                        </>
                      ) : (
                        <>
                          <li className="text-red-700">⚠️ 標準シナリオでマイナスROI。慎重な判断が必要です。</li>
                          <li className="text-orange-700">販売数を{investment.simulation.breakEvenUnits.toLocaleString()}個以上確保するか、固定費削減が必須です。</li>
                          <li className="text-orange-700">市場テストを実施し、需要を検証してから本格投資を検討してください。</li>
                        </>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* 2-1. 販売前提 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    販売前提
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">期間・販売チャネル</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600">計画期間</p>
                          <p className="font-medium">{investment.sales.period}ヶ月</p>
                        </div>
                        <div>
                          <p className="text-gray-600">販売開始月</p>
                          <p className="font-medium">{investment.sales.startMonth}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">販売チャネル構成比</p>
                          {investment.sales.channels.map((ch, i) => (
                            <div key={i} className="flex justify-between text-xs">
                              <span>{ch.name}</span>
                              <span className="font-medium">{ch.ratio}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">販売ボリューム前提</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600">合計販売数</p>
                          <p className="text-xl font-medium">{investment.sales.totalUnits.toLocaleString()}個</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">月別販売数（標準）</p>
                          <div className="bg-gray-50 p-2 rounded text-xs space-y-1">
                            {investment.sales.monthlySales.map((sales, i) => (
                              <div key={i} className="flex justify-between">
                                <span>{i + 1}月目</span>
                                <span className="font-medium">{sales}個</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">価格前提</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-gray-600">定価（税抜）</p>
                          <p className="font-medium">¥{investment.sales.listPrice.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">標準販売価格（平均）</p>
                          <p className="font-medium">¥{investment.sales.avgPrice.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">平均値引き率</p>
                          <p className="font-medium">{investment.sales.discountRate}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">消費税率</p>
                          <p className="font-medium">{investment.sales.taxRate}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2-2. 変動費・原価構造 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    変動費・原価構造
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">製品原価（1個あたり）</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">工場出荷価格（FOB）</span>
                          <span className="font-medium">¥{investment.variable.fob.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">付属・パッケージ原価</span>
                          <span className="font-medium">¥{investment.variable.packaging.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">合計製品原価</span>
                          <span className="font-medium">¥{investment.variable.totalCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">売価に対する原価率</span>
                          <span className="font-medium text-orange-600">{investment.variable.costRatio}%</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">物流・フルフィルメント（1個）</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">国際輸送・関税</span>
                          <span className="font-medium">¥{investment.variable.logistics.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">倉庫保管・出荷費</span>
                          <span className="font-medium">¥{investment.variable.shipping.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">配送運賃</span>
                          <span className="font-medium">¥{investment.variable.delivery.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">販売関連変動費（売上対比）</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">決済手数料率</span>
                          <span className="font-medium">{investment.variable.paymentFee}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">モール手数料率</span>
                          <span className="font-medium">{investment.variable.platformFee}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">返品・値引き調整率</span>
                          <span className="font-medium">{investment.variable.returnRate}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2-3. 固定費・立ち上げ投資 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                    固定費・立ち上げ投資
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">商品開発・生産立ち上げ費用</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">パターン作成費</span>
                          <span className="font-medium">¥{investment.fixed.pattern.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">サンプル作成費</span>
                          <span className="font-medium">¥{investment.fixed.sample.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">フィッティング・検証費</span>
                          <span className="font-medium">¥{investment.fixed.fitting.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">撮影費</span>
                          <span className="font-medium">¥{investment.fixed.photo.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">コンテンツ制作費</span>
                          <span className="font-medium">¥{investment.fixed.content.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">プロモーション・運営費</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">初期ローンチキャンペーン</span>
                          <span className="font-medium">¥{investment.fixed.launchCampaign.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">月次広告費（平均）</span>
                          <span className="font-medium">¥{investment.fixed.monthlyAd.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">担当者人件費配賦（月額）</span>
                          <span className="font-medium">¥{investment.fixed.personnelMonthly.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">システム利用料（月額）</span>
                          <span className="font-medium">¥{investment.fixed.systemMonthly.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">総固定費（{investment.sales.period}ヶ月）</span>
                          <span className="font-medium text-purple-600">¥{(investment.simulation.fixedCost / 1000000).toFixed(1)}M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2-4. 収益シミュレーション */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    収益シミュレーション（損益・損益分岐点）
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">損益計算（標準シナリオ）</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">総売上高（税抜）</span>
                          <span className="font-medium">¥{(investment.simulation.totalRevenue / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">返品・値引き控除後売上</span>
                          <span className="font-medium">¥{(investment.simulation.netRevenue / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">製品原価合計</span>
                          <span className="font-medium text-orange-600">-¥{(investment.simulation.productCost / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">物流・変動費合計</span>
                          <span className="font-medium text-orange-600">-¥{(investment.simulation.variableCost / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">売上総利益（粗利）</span>
                          <span className="font-medium text-blue-600">¥{(investment.simulation.grossProfit / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">粗利率</span>
                          <span className="font-medium">{investment.simulation.grossMarginRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm border-t pt-2">
                          <span className="text-gray-600">プロジェクト固定費</span>
                          <span className="font-medium text-purple-600">-¥{(investment.simulation.fixedCost / 1000000).toFixed(2)}M</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium text-lg">営業利益（貢献利益）</span>
                          <span className={`font-medium text-lg ${investment.simulation.operatingProfit > 0 ? "text-green-600" : "text-red-600"}`}>
                            {investment.simulation.operatingProfit > 0 ? "+" : ""}¥{(investment.simulation.operatingProfit / 1000000).toFixed(2)}M
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">貢献利益率</span>
                          <span className={`font-medium ${investment.simulation.contributionMarginRate > 0 ? "text-green-600" : "text-red-600"}`}>
                            {investment.simulation.contributionMarginRate > 0 ? "+" : ""}{investment.simulation.contributionMarginRate}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">損益分岐点分析</h4>
                      <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">損益分岐点販売数</p>
                            <p className="text-2xl font-medium text-blue-600">{investment.simulation.breakEvenUnits.toLocaleString()}個</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-1">損益分岐点到達予測月</p>
                            <p className="text-2xl font-medium text-green-600">{investment.simulation.breakEvenMonth}ヶ月目</p>
                          </div>
                          <div className="pt-3 border-t border-blue-200">
                            <p className="text-xs text-gray-600 mb-2">進捗イメージ（標準シナリオ）</p>
                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-green-500"
                                style={{ width: `${Math.min((investment.sales.totalUnits / investment.simulation.breakEvenUnits) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              現計画: {investment.sales.totalUnits.toLocaleString()}個 / 分岐点: {investment.simulation.breakEvenUnits.toLocaleString()}個
                              ({((investment.sales.totalUnits / investment.simulation.breakEvenUnits) * 100).toFixed(0)}%)
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                        <p className="text-xs text-gray-700">
                          <AlertTriangle className="w-4 h-4 inline mr-1 text-yellow-600" />
                          {investment.simulation.operatingProfit > 0
                            ? "標準シナリオで利益が見込まれます。さらなる拡大施策を検討してください。"
                            : "標準シナリオでは赤字予測です。販売数増加または固定費削減が必要です。"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 2-5. シナリオ比較 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    シナリオ比較（保守／標準／攻め）
                  </CardTitle>
                  <CardDescription>3つのシナリオで投資回収の可能性を比較</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* シナリオ切り替え */}
                  <div className="flex gap-2 mb-4">
                    {(["保守", "標準", "攻め"] as const).map((scenario) => (
                      <button
                        key={scenario}
                        onClick={() => setActiveScenario(scenario)}
                        className={`px-4 py-2 rounded transition-colors ${
                          activeScenario === scenario
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {scenario}シナリオ
                      </button>
                    ))}
                  </div>

                  {/* 比較テーブル */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">シナリオ</th>
                          <th className="text-right py-3 px-2">販売数</th>
                          <th className="text-right py-3 px-2">総売上</th>
                          <th className="text-right py-3 px-2">粗利</th>
                          <th className="text-right py-3 px-2">営業利益</th>
                          <th className="text-right py-3 px-2">ROI</th>
                          <th className="text-right py-3 px-2">分岐点到達月</th>
                        </tr>
                      </thead>
                      <tbody>
                        {investment.scenarios.map((scenario, i) => (
                          <tr key={i} className={`border-b ${activeScenario === scenario.name ? "bg-blue-50" : ""}`}>
                            <td className="py-3 px-2">
                              <Badge className={
                                scenario.name === "保守" ? "bg-orange-100 text-orange-800 border-orange-300" :
                                scenario.name === "標準" ? "bg-blue-100 text-blue-800 border-blue-300" :
                                "bg-green-100 text-green-800 border-green-300"
                              }>
                                {scenario.name}
                              </Badge>
                            </td>
                            <td className="text-right py-3 px-2 font-medium">{scenario.units.toLocaleString()}個</td>
                            <td className="text-right py-3 px-2">¥{(scenario.revenue / 1000000).toFixed(1)}M</td>
                            <td className="text-right py-3 px-2">¥{(scenario.grossProfit / 1000000).toFixed(1)}M</td>
                            <td className={`text-right py-3 px-2 font-medium ${scenario.operatingProfit > 0 ? "text-green-600" : "text-red-600"}`}>
                              {scenario.operatingProfit > 0 ? "+" : ""}¥{(scenario.operatingProfit / 1000000).toFixed(1)}M
                            </td>
                            <td className={`text-right py-3 px-2 font-medium ${scenario.roi > 0 ? "text-green-600" : "text-red-600"}`}>
                              {scenario.roi > 0 ? "+" : ""}{scenario.roi}%
                            </td>
                            <td className="text-right py-3 px-2">{scenario.breakEvenMonth}ヶ月目</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* グラフビジュアライゼーション */}
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">営業利益比較（棒グラフ）</h4>
                    <div className="space-y-3">
                      {investment.scenarios.map((scenario, i) => {
                        const maxProfit = Math.max(...investment.scenarios.map(s => Math.abs(s.operatingProfit)));
                        const width = (Math.abs(scenario.operatingProfit) / maxProfit) * 100;
                        const isPositive = scenario.operatingProfit > 0;
                        
                        return (
                          <div key={i}>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium w-16">{scenario.name}</span>
                              <div className="flex-1 h-8 bg-gray-100 rounded relative">
                                <div
                                  className={`h-full rounded ${isPositive ? "bg-green-500" : "bg-red-500"}`}
                                  style={{ width: `${width}%` }}
                                ></div>
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-medium text-white">
                                  {scenario.operatingProfit > 0 ? "+" : ""}¥{(scenario.operatingProfit / 1000000).toFixed(1)}M
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        {/* フッター */}
        <div className="bg-gray-100 border-t border-gray-200 p-6 mt-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <p className="text-sm text-gray-600">APPA-TECH 優先投資商品詳細 - {product.productName}</p>
            <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white">
              ダッシュボードに戻る
            </Button>
          </div>
        </div>
      </div>

      {/* 企画提案募集フローモーダル */}
      <ProposalRecruitmentFlow
        isOpen={isRecruitmentModalOpen}
        onClose={() => setIsRecruitmentModalOpen(false)}
        productName={product.productName}
        categoryName={product.category}
      />
    </div>
  );
}
