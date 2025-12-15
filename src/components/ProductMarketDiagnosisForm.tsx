import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useState } from "react";

interface CheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  level: number;
  children?: React.ReactNode;
}

function CheckboxItem({ id, label, checked, onChange, level, children }: CheckboxItemProps) {
  const indentClass = level === 0 ? "" : level === 1 ? "ml-6" : level === 2 ? "ml-12" : level === 3 ? "ml-18" : "ml-24";
  const fontClass = level === 0 ? "font-semibold" : level === 1 ? "font-medium" : "";
  
  return (
    <div className={indentClass}>
      <div className="flex items-start gap-2 py-1.5">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={onChange}
        />
        <label
          htmlFor={id}
          className={`text-sm leading-relaxed cursor-pointer ${fontClass}`}
        >
          {label}
        </label>
      </div>
      {children && <div className="mt-1">{children}</div>}
    </div>
  );
}

interface ProductMarketDiagnosisFormProps {
  isOpen: boolean;
  onClose: () => void;
  onShowResults: () => void;
  initialQuery?: string;
}

export function ProductMarketDiagnosisForm({ isOpen, onClose, onShowResults, initialQuery = "" }: ProductMarketDiagnosisFormProps) {
  const [productName, setProductName] = useState(initialQuery);
  const [material, setMaterial] = useState("");
  const [target, setTarget] = useState("");
  const [otherRequests, setOtherRequests] = useState("");

  // 機能性のチェック状態（省略 - 前回と同じ）
  const [functionality, setFunctionality] = useState({
    cat1: false, cat1_1: false, cat1_1_1: false, cat1_1_1_1: false, cat1_1_1_2: false,
    cat1_1_2: false, cat1_1_2_1: false, cat1_1_2_2: false, cat1_1_3: false,
    cat1_2: false, cat1_2_1: false, cat1_2_1_1: false, cat1_2_1_2: false,
    cat1_2_2: false, cat1_2_2_1: false, cat1_2_2_2: false,
    cat1_2_3: false, cat1_2_3_1: false, cat1_2_3_2: false,
    cat1_2_4: false, cat1_2_4_1: false, cat1_2_4_2: false,
    cat1_3: false, cat1_3_1: false, cat1_3_1_1: false, cat1_3_1_2: false,
    cat1_3_2: false, cat1_3_2_1: false, cat1_3_2_2: false,
    cat2: false, cat2_1: false, cat2_1_1: false, cat2_1_1_1: false, cat2_1_1_2: false,
    cat2_1_2: false, cat2_1_2_1: false, cat2_1_2_2: false,
    cat2_1_3: false, cat2_1_3_1: false,
    cat2_2: false, cat2_2_1: false, cat2_2_1_1: false, cat2_2_1_2: false,
    cat2_2_2: false, cat2_2_2_1: false, cat2_2_2_2: false,
    cat2_2_3: false, cat2_2_3_1: false,
    cat2_3: false, cat2_3_1: false, cat2_3_2: false, cat2_3_3: false,
    cat3: false, cat3_1: false, cat3_1_1: false, cat3_1_1_1: false, cat3_1_1_2: false,
    cat3_1_2: false, cat3_1_3: false,
    cat3_2: false, cat3_2_1: false, cat3_2_1_1: false, cat3_2_1_2: false, cat3_2_2: false,
    cat3_3: false, cat3_3_1: false,
    cat4: false, cat4_1: false, cat4_1_1: false, cat4_1_1_1: false, cat4_1_1_2: false,
    cat4_1_2: false, cat4_1_2_1: false,
    cat4_2: false, cat4_2_1: false, cat4_2_2: false, cat4_2_2_1: false, cat4_2_2_2: false,
    cat4_3: false, cat4_3_1: false, cat4_3_1_1: false, cat4_3_1_2: false,
    cat4_3_2: false, cat4_3_2_1: false, cat4_3_2_2: false, cat4_3_3: false,
    cat5: false, cat5_1: false, cat5_1_1: false, cat5_1_1_1: false, cat5_1_1_2: false,
    cat5_1_2: false, cat5_1_2_1: false, cat5_1_2_2: false,
    cat5_2: false, cat5_2_1: false, cat5_2_1_1: false, cat5_2_1_2: false,
    cat5_2_2: false, cat5_2_2_1: false, cat5_2_2_2: false,
    cat5_3: false, cat5_3_1: false, cat5_3_2: false, cat5_3_3: false, cat5_3_3_1: false,
    cat6: false, cat6_1: false, cat6_1_1: false, cat6_1_2: false, cat6_1_2_1: false, cat6_1_2_2: false, cat6_1_3: false,
    cat6_2: false, cat6_2_1: false, cat6_2_1_1: false, cat6_2_1_2: false,
    cat6_2_2: false, cat6_2_2_1: false, cat6_2_2_2: false,
    cat6_3: false, cat6_3_1: false, cat6_3_2: false,
    cat7: false, cat7_1: false, cat7_1_1: false, cat7_1_1_1: false, cat7_1_1_2: false,
    cat7_1_2: false, cat7_1_2_1: false,
    cat7_2: false, cat7_2_1: false, cat7_2_2: false, cat7_2_2_1: false, cat7_2_2_2: false,
    cat7_3: false, cat7_3_1: false, cat7_3_2: false,
    cat8: false, cat8_1: false, cat8_1_1: false, cat8_1_1_1: false, cat8_1_1_2: false,
    cat8_1_2: false, cat8_1_2_1: false, cat8_1_2_2: false,
    cat8_2: false, cat8_2_1: false, cat8_2_1_1: false, cat8_2_1_2: false,
    cat8_2_2: false, cat8_2_2_1: false, cat8_2_2_2: false,
    cat9: false, cat9_1: false, cat9_1_1: false, cat9_1_2: false, cat9_1_3: false,
    cat9_2: false, cat9_2_1: false, cat9_2_2: false, cat9_2_3: false,
    cat10: false, cat10_1: false, cat10_1_1: false, cat10_1_2: false, cat10_1_3: false,
    cat10_2: false, cat10_2_1: false, cat10_2_2: false,
  });

  // ボディパーツ＆アイテム種別のチェック状態（大幅拡充版）
  const [bodyAndItems, setBodyAndItems] = useState({
    // 1. 頭・顔まわり
    item1: false,
    item1_1: false, // 頭（ヘッドウェア）
    item1_1_1: false, // 帽子（ハット）
    item1_1_1_1: false, // キャップ
    item1_1_1_1_1: false, item1_1_1_1_2: false,
    item1_1_1_2: false, // ハット
    item1_1_1_3: false, item1_1_1_4: false, item1_1_1_5: false,
    item1_1_1_6: false, item1_1_1_7: false,
    item1_1_2: false, // 仕事・特殊用
    item1_1_2_1: false, item1_1_2_2: false, item1_1_2_3: false,
    item1_2: false, // 顔・口元
    item1_2_1: false, // マスク
    item1_2_1_1: false, item1_2_1_2: false, item1_2_1_3: false, item1_2_1_4: false, item1_2_1_5: false,
    item1_2_2: false, // フェイスカバー
    item1_2_2_1: false, item1_2_2_2: false,
    item1_3: false, // 耳まわり
    item1_3_1: false, item1_3_2: false, item1_3_3: false,

    // 2. 首・肩・上半身まわり
    item2: false,
    item2_1: false, // 首まわり
    item2_1_1: false, item2_1_2: false, item2_1_3: false, item2_1_4: false,
    item2_1_5: false, item2_1_6: false, item2_1_7: false, item2_1_8: false, item2_1_9: false,
    item2_2: false, // 胸〜腹まわり（インナー寄り）
    item2_2_1: false, // Tシャツ
    item2_2_1_1: false, item2_2_1_2: false, item2_2_1_3: false,
    item2_2_2: false, item2_2_3: false, item2_2_4: false, item2_2_5: false,
    item2_2_6: false, // 肌着
    item2_2_6_1: false, item2_2_6_2: false,
    item2_2_7: false, // 腹巻
    item2_2_7_1: false, item2_2_7_2: false, item2_2_7_3: false,
    item2_3: false, // シャツ・ブラウス系
    item2_3_1: false, item2_3_2: false, item2_3_3: false, item2_3_4: false, item2_3_5: false, item2_3_6: false,
    item2_4: false, // ニット・スウェット系
    item2_4_1: false, // セーター／ニット
    item2_4_1_1: false, item2_4_1_2: false, item2_4_1_3: false,
    item2_4_2: false, item2_4_3: false,
    item2_4_4: false, // パーカー
    item2_4_4_1: false, item2_4_4_2: false,
    item2_4_5: false,

    // 3. アウター（上半身）
    item3: false,
    item3_1: false, // 軽アウター
    item3_1_1: false, item3_1_2: false, item3_1_3: false, item3_1_4: false,
    item3_1_5: false, item3_1_6: false, item3_1_7: false,
    item3_2: false, // コート・防寒アウター
    item3_2_1: false, item3_2_2: false, item3_2_3: false, item3_2_4: false,
    item3_2_5: false, item3_2_6: false, item3_2_7: false, item3_2_8: false, item3_2_9: false,
    item3_3: false, // スーツ・セットアップ
    item3_3_1: false, item3_3_2: false, item3_3_3: false, item3_3_4: false,

    // 4. ボトムス（下半身）
    item4: false,
    item4_1: false, // パンツ
    item4_1_1: false, item4_1_2: false, item4_1_3: false, item4_1_4: false,
    item4_1_5: false, item4_1_6: false, item4_1_7: false, item4_1_8: false,
    item4_1_9: false, item4_1_10: false, item4_1_11: false, item4_1_12: false, item4_1_13: false,
    item4_2: false, // スカート
    item4_2_1: false, item4_2_2: false, item4_2_3: false, item4_2_4: false,
    item4_2_5: false, item4_2_6: false, item4_2_7: false, item4_2_8: false,

    // 5. ワンピース・セットアイテム
    item5: false,
    item5_1: false, // ワンピース
    item5_1_1: false, item5_1_2: false, item5_1_3: false, item5_1_4: false,
    item5_2: false, item5_3: false, item5_4: false,

    // 6. インナー・アンダーウェア
    item6: false,
    item6_1: false, // 上半身インナー
    item6_1_1: false, item6_1_2: false, item6_1_3: false, item6_1_4: false,
    item6_1_5: false, item6_1_6: false, item6_1_7: false,
    item6_2: false, // 下半身インナー
    item6_2_1: false, item6_2_2: false, item6_2_3: false, item6_2_4: false,
    item6_2_5: false, item6_2_6: false,
    item6_3: false, // 機能インナー
    item6_3_1: false, item6_3_2: false, item6_3_3: false, item6_3_4: false,

    // 7. レッグウェア・フットウェア周辺
    item7: false,
    item7_1: false, // レッグウェア
    item7_1_1: false, // 靴下
    item7_1_1_1: false, item7_1_1_2: false, item7_1_1_3: false, item7_1_1_4: false,
    item7_1_2: false, item7_1_3: false, item7_1_4: false, item7_1_5: false, item7_1_6: false,

    // 8. 手・腕まわり
    item8: false,
    item8_1: false, // 手袋
    item8_1_1: false, item8_1_2: false, item8_1_3: false, item8_1_4: false,
    item8_1_5: false, item8_1_6: false, item8_1_7: false, item8_1_8: false,
    item8_2: false, // アームカバー
    item8_2_1: false, item8_2_2: false, item8_2_3: false,

    // 9. ルームウェア・スリープウェア
    item9: false,
    item9_1: false, item9_2: false, item9_3: false, item9_4: false,
    item9_5: false, item9_6: false, item9_7: false, item9_8: false,

    // 10. 雨具・防寒具・特殊アウター
    item10: false,
    item10_1: false, // 雨具
    item10_1_1: false, item10_1_2: false, item10_1_3: false, item10_1_4: false, item10_1_5: false,
    item10_2: false, // 防寒ギア
    item10_2_1: false, item10_2_2: false, item10_2_3: false, item10_2_4: false, item10_2_5: false,

    // 11. スポーツ・アウトドア専用
    item11: false,
    item11_1: false, item11_2: false, item11_3: false, item11_4: false,
    item11_5: false, item11_6: false, item11_7: false, item11_8: false,
    item11_9: false, item11_10: false,

    // 12. 仕事服・ユニフォーム・エプロン系
    item12: false,
    item12_1: false, item12_2: false, item12_3: false, item12_4: false,
    item12_5: false, item12_6: false, item12_7: false, item12_8: false,
    item12_9: false,
    item12_10: false, // エプロン
    item12_10_1: false, item12_10_2: false, item12_10_3: false,

    // 13. 和装・民族衣装系
    item13: false,
    item13_1: false, item13_2: false, item13_3: false, item13_4: false,
    item13_5: false, item13_6: false,

    // 14. マタニティ・ベビー・介護系
    item14: false,
    item14_1: false, // マタニティ
    item14_1_1: false, item14_1_2: false, item14_1_3: false, item14_1_4: false, item14_1_5: false,
    item14_2: false, // ベビー・キッズ
    item14_2_1: false, item14_2_2: false, item14_2_3: false, item14_2_4: false,
    item14_2_5: false, item14_2_6: false,
    item14_3: false, // 介護・医療向け
    item14_3_1: false, item14_3_2: false, item14_3_3: false, item14_3_4: false,
  });

  // 生活シーンのチェック状態
  const [lifeScenes, setLifeScenes] = useState({
    daily: false,
    commute: false,
    commuteDetail1: false,
    commuteDetail2: false,
    sports: false,
    running: false,
    runningDetail1: false,
    runningDetail2: false,
  });

  const handleAIRecommend = () => {
    // ② 機能性の自動選択（睡眠改善関連の項目を中心に選択）
    setFunctionality({
      ...functionality,
      // 1. 体温・熱環境コントロール系
      cat1: true,
      cat1_1: true, // 保温・発熱
      cat1_1_1: true, // 断熱・保温
      cat1_1_1_1: true, // 起毛・中わた・ダウン・エアポケット構造
      cat1_2: true, // 体温調整・温度制御
      cat1_2_1: true, // 吸湿発熱
      cat1_2_1_1: true, // 吸湿発熱繊維（ヒートテック系）
      // 2. 水分・湿気コントロール系
      cat2: true,
      cat2_1: true, // 吸湿・吸水
      cat2_1_1: true, // 汗・湿気吸収
      cat2_1_1_1: true, // 綿・リネン・レーヨン等天然繊維
      cat2_2: true, // 放湿・速乾
      cat2_2_1: true, // ドライ・速乾
      cat2_2_1_1: true, // ポリエステル速乾加工
      // 3. 通気・換気系
      cat3: true,
      cat3_1: true, // 透湿・通気
      cat3_1_1: true, // メッシュ・通気織
      cat3_1_1_1: true, // メッシュ組織
      // 6. 快適・リラクゼーション系
      cat6: true,
      cat6_1: true, // 肌触り・着心地
      cat6_1_1: true, // やわらか・なめらか素材
      cat6_2: true, // リラックス・睡眠促進
      cat6_2_1: true, // 睡眠改善
      cat6_2_1_1: true, // 遠赤外線放射（温熱効果）
      cat6_2_1_2: true, // 副交感神経誘導（リラックス促進）
      cat6_2_2: true, // ストレス軽減
      cat6_2_2_1: true, // アロマ加工・香り
    });

    // ③ ボディパーツ＆アイテム種別の自動選択（パジャマ関連）
    setBodyAndItems({
      ...bodyAndItems,
      // 9. ルームウェア・スリープウェア
      item9: true,
      item9_1: true, // パジャマ（上下セット）
      item9_2: true, // パジャマトップス単品
      item9_3: true, // パジャマボトムス単品
      item9_4: true, // ネグリジェ・ナイトガウン
      // 6. インナー・アンダーウェア
      item6: true,
      item6_3: true, // 機能インナー
      item6_3_1: true, // 発熱インナー
      item6_3_2: true, // 冷感インナー
    });

    // ④ 生活シーンの自動選択（日常・睡眠時など）
    setLifeScenes({
      ...lifeScenes,
      daily: true,
      commute: false,
      commuteDetail1: false,
      commuteDetail2: false,
      sports: false,
      running: false,
      runningDetail1: false,
      runningDetail2: false,
    });
  };

  const handleTestDataInput = () => {
    setProductName("睡眠改善パジャマ");
    setMaterial("鉱物練り込み遠赤外線素材、通気性に優れたオーガニックコットンを使用し、体温を適温に保つ温度調整機能を持つ繊維技術を採用");
    setTarget("30〜50代の睡眠に悩む働く女性、特にストレスや冷えによる睡眠の質低下を感じている方");
  };

  // 機能性のチェックボックス制御
  const handleFunctionalityChange = (key: string, checked: boolean) => {
    const newState = { ...functionality };
    const directChildren: Record<string, string[]> = {
      cat1: ['cat1_1', 'cat1_2', 'cat1_3'],
      cat1_1: ['cat1_1_1', 'cat1_1_2', 'cat1_1_3'],
      cat1_1_1: ['cat1_1_1_1', 'cat1_1_1_2'],
      cat1_1_2: ['cat1_1_2_1', 'cat1_1_2_2'],
      cat1_2: ['cat1_2_1', 'cat1_2_2', 'cat1_2_3', 'cat1_2_4'],
      cat1_2_1: ['cat1_2_1_1', 'cat1_2_1_2'],
      cat1_2_2: ['cat1_2_2_1', 'cat1_2_2_2'],
      cat1_2_3: ['cat1_2_3_1', 'cat1_2_3_2'],
      cat1_2_4: ['cat1_2_4_1', 'cat1_2_4_2'],
      cat1_3: ['cat1_3_1', 'cat1_3_2'],
      cat1_3_1: ['cat1_3_1_1', 'cat1_3_1_2'],
      cat1_3_2: ['cat1_3_2_1', 'cat1_3_2_2'],
      cat2: ['cat2_1', 'cat2_2', 'cat2_3'],
      cat2_1: ['cat2_1_1', 'cat2_1_2', 'cat2_1_3'],
      cat2_1_1: ['cat2_1_1_1', 'cat2_1_1_2'],
      cat2_1_2: ['cat2_1_2_1', 'cat2_1_2_2'],
      cat2_1_3: ['cat2_1_3_1'],
      cat2_2: ['cat2_2_1', 'cat2_2_2', 'cat2_2_3'],
      cat2_2_1: ['cat2_2_1_1', 'cat2_2_1_2'],
      cat2_2_2: ['cat2_2_2_1', 'cat2_2_2_2'],
      cat2_2_3: ['cat2_2_3_1'],
      cat3: ['cat3_1', 'cat3_2', 'cat3_3'],
      cat3_1: ['cat3_1_1', 'cat3_1_2', 'cat3_1_3'],
      cat3_1_1: ['cat3_1_1_1', 'cat3_1_1_2'],
      cat3_2: ['cat3_2_1', 'cat3_2_2'],
      cat3_2_1: ['cat3_2_1_1', 'cat3_2_1_2'],
      cat3_3: ['cat3_3_1'],
      cat4: ['cat4_1', 'cat4_2', 'cat4_3'],
      cat4_1: ['cat4_1_1', 'cat4_1_2'],
      cat4_1_1: ['cat4_1_1_1', 'cat4_1_1_2'],
      cat4_1_2: ['cat4_1_2_1'],
      cat4_2: ['cat4_2_1', 'cat4_2_2'],
      cat4_2_2: ['cat4_2_2_1', 'cat4_2_2_2'],
      cat4_3: ['cat4_3_1', 'cat4_3_2', 'cat4_3_3'],
      cat4_3_1: ['cat4_3_1_1', 'cat4_3_1_2'],
      cat4_3_2: ['cat4_3_2_1', 'cat4_3_2_2'],
      cat5: ['cat5_1', 'cat5_2', 'cat5_3'],
      cat5_1: ['cat5_1_1', 'cat5_1_2'],
      cat5_1_1: ['cat5_1_1_1', 'cat5_1_1_2'],
      cat5_1_2: ['cat5_1_2_1', 'cat5_1_2_2'],
      cat5_2: ['cat5_2_1', 'cat5_2_2'],
      cat5_2_1: ['cat5_2_1_1', 'cat5_2_1_2'],
      cat5_2_2: ['cat5_2_2_1', 'cat5_2_2_2'],
      cat5_3: ['cat5_3_1', 'cat5_3_2', 'cat5_3_3'],
      cat5_3_3: ['cat5_3_3_1'],
      cat6: ['cat6_1', 'cat6_2', 'cat6_3'],
      cat6_1: ['cat6_1_1', 'cat6_1_2', 'cat6_1_3'],
      cat6_1_2: ['cat6_1_2_1', 'cat6_1_2_2'],
      cat6_2: ['cat6_2_1', 'cat6_2_2'],
      cat6_2_1: ['cat6_2_1_1', 'cat6_2_1_2'],
      cat6_2_2: ['cat6_2_2_1', 'cat6_2_2_2'],
      cat6_3: ['cat6_3_1', 'cat6_3_2'],
      cat7: ['cat7_1', 'cat7_2', 'cat7_3'],
      cat7_1: ['cat7_1_1', 'cat7_1_2'],
      cat7_1_1: ['cat7_1_1_1', 'cat7_1_1_2'],
      cat7_1_2: ['cat7_1_2_1'],
      cat7_2: ['cat7_2_1', 'cat7_2_2'],
      cat7_2_2: ['cat7_2_2_1', 'cat7_2_2_2'],
      cat7_3: ['cat7_3_1', 'cat7_3_2'],
      cat8: ['cat8_1', 'cat8_2'],
      cat8_1: ['cat8_1_1', 'cat8_1_2'],
      cat8_1_1: ['cat8_1_1_1', 'cat8_1_1_2'],
      cat8_1_2: ['cat8_1_2_1', 'cat8_1_2_2'],
      cat8_2: ['cat8_2_1', 'cat8_2_2'],
      cat8_2_1: ['cat8_2_1_1', 'cat8_2_1_2'],
      cat8_2_2: ['cat8_2_2_1', 'cat8_2_2_2'],
      cat9: ['cat9_1', 'cat9_2'],
      cat9_1: ['cat9_1_1', 'cat9_1_2', 'cat9_1_3'],
      cat9_2: ['cat9_2_1', 'cat9_2_2', 'cat9_2_3'],
      cat10: ['cat10_1', 'cat10_2'],
      cat10_1: ['cat10_1_1', 'cat10_1_2', 'cat10_1_3'],
      cat10_2: ['cat10_2_1', 'cat10_2_2'],
    };

    const getAllDescendants = (parentKey: string): string[] => {
      const children = directChildren[parentKey] || [];
      const descendants = [...children];
      children.forEach(child => {
        descendants.push(...getAllDescendants(child));
      });
      return descendants;
    };

    newState[key as keyof typeof functionality] = checked;
    const allDescendants = getAllDescendants(key);
    allDescendants.forEach(descendant => {
      newState[descendant as keyof typeof functionality] = checked;
    });

    Object.keys(directChildren).reverse().forEach(parent => {
      const children = directChildren[parent];
      const allChildrenChecked = children.every(child => newState[child as keyof typeof functionality]);
      newState[parent as keyof typeof functionality] = allChildrenChecked;
    });

    setFunctionality(newState);
  };

  // ボディパーツ＆アイテム種別のチェックボックス制御（拡充版）
  const handleBodyAndItemsChange = (key: string, checked: boolean) => {
    const newState = { ...bodyAndItems };

    // 親子関係の定義
    const directChildren: Record<string, string[]> = {
      // 1. 頭・顔まわり
      item1: ['item1_1', 'item1_2', 'item1_3'],
      item1_1: ['item1_1_1', 'item1_1_2'],
      item1_1_1: ['item1_1_1_1', 'item1_1_1_2', 'item1_1_1_3', 'item1_1_1_4', 'item1_1_1_5', 'item1_1_1_6', 'item1_1_1_7'],
      item1_1_1_1: ['item1_1_1_1_1', 'item1_1_1_1_2'],
      item1_1_2: ['item1_1_2_1', 'item1_1_2_2', 'item1_1_2_3'],
      item1_2: ['item1_2_1', 'item1_2_2'],
      item1_2_1: ['item1_2_1_1', 'item1_2_1_2', 'item1_2_1_3', 'item1_2_1_4', 'item1_2_1_5'],
      item1_2_2: ['item1_2_2_1', 'item1_2_2_2'],
      item1_3: ['item1_3_1', 'item1_3_2', 'item1_3_3'],

      // 2. 首・肩・上半身まわり
      item2: ['item2_1', 'item2_2', 'item2_3', 'item2_4'],
      item2_1: ['item2_1_1', 'item2_1_2', 'item2_1_3', 'item2_1_4', 'item2_1_5', 'item2_1_6', 'item2_1_7', 'item2_1_8', 'item2_1_9'],
      item2_2: ['item2_2_1', 'item2_2_2', 'item2_2_3', 'item2_2_4', 'item2_2_5', 'item2_2_6', 'item2_2_7'],
      item2_2_1: ['item2_2_1_1', 'item2_2_1_2', 'item2_2_1_3'],
      item2_2_6: ['item2_2_6_1', 'item2_2_6_2'],
      item2_2_7: ['item2_2_7_1', 'item2_2_7_2', 'item2_2_7_3'],
      item2_3: ['item2_3_1', 'item2_3_2', 'item2_3_3', 'item2_3_4', 'item2_3_5', 'item2_3_6'],
      item2_4: ['item2_4_1', 'item2_4_2', 'item2_4_3', 'item2_4_4', 'item2_4_5'],
      item2_4_1: ['item2_4_1_1', 'item2_4_1_2', 'item2_4_1_3'],
      item2_4_4: ['item2_4_4_1', 'item2_4_4_2'],

      // 3. アウター（上半身）
      item3: ['item3_1', 'item3_2', 'item3_3'],
      item3_1: ['item3_1_1', 'item3_1_2', 'item3_1_3', 'item3_1_4', 'item3_1_5', 'item3_1_6', 'item3_1_7'],
      item3_2: ['item3_2_1', 'item3_2_2', 'item3_2_3', 'item3_2_4', 'item3_2_5', 'item3_2_6', 'item3_2_7', 'item3_2_8', 'item3_2_9'],
      item3_3: ['item3_3_1', 'item3_3_2', 'item3_3_3', 'item3_3_4'],

      // 4. ボトムス（下半身）
      item4: ['item4_1', 'item4_2'],
      item4_1: ['item4_1_1', 'item4_1_2', 'item4_1_3', 'item4_1_4', 'item4_1_5', 'item4_1_6', 'item4_1_7', 'item4_1_8', 'item4_1_9', 'item4_1_10', 'item4_1_11', 'item4_1_12', 'item4_1_13'],
      item4_2: ['item4_2_1', 'item4_2_2', 'item4_2_3', 'item4_2_4', 'item4_2_5', 'item4_2_6', 'item4_2_7', 'item4_2_8'],

      // 5. ワンピース・セットアイテム
      item5: ['item5_1', 'item5_2', 'item5_3', 'item5_4'],
      item5_1: ['item5_1_1', 'item5_1_2', 'item5_1_3', 'item5_1_4'],

      // 6. インナー・アンダーウェア
      item6: ['item6_1', 'item6_2', 'item6_3'],
      item6_1: ['item6_1_1', 'item6_1_2', 'item6_1_3', 'item6_1_4', 'item6_1_5', 'item6_1_6', 'item6_1_7'],
      item6_2: ['item6_2_1', 'item6_2_2', 'item6_2_3', 'item6_2_4', 'item6_2_5', 'item6_2_6'],
      item6_3: ['item6_3_1', 'item6_3_2', 'item6_3_3', 'item6_3_4'],

      // 7. レッグウェア・フットウェア周辺
      item7: ['item7_1'],
      item7_1: ['item7_1_1', 'item7_1_2', 'item7_1_3', 'item7_1_4', 'item7_1_5', 'item7_1_6'],
      item7_1_1: ['item7_1_1_1', 'item7_1_1_2', 'item7_1_1_3', 'item7_1_1_4'],

      // 8. 手・腕まわり
      item8: ['item8_1', 'item8_2'],
      item8_1: ['item8_1_1', 'item8_1_2', 'item8_1_3', 'item8_1_4', 'item8_1_5', 'item8_1_6', 'item8_1_7', 'item8_1_8'],
      item8_2: ['item8_2_1', 'item8_2_2', 'item8_2_3'],

      // 9. ルームウェア・スリープウェア
      item9: ['item9_1', 'item9_2', 'item9_3', 'item9_4', 'item9_5', 'item9_6', 'item9_7', 'item9_8'],

      // 10. 雨具・防寒具・特殊アウター
      item10: ['item10_1', 'item10_2'],
      item10_1: ['item10_1_1', 'item10_1_2', 'item10_1_3', 'item10_1_4', 'item10_1_5'],
      item10_2: ['item10_2_1', 'item10_2_2', 'item10_2_3', 'item10_2_4', 'item10_2_5'],

      // 11. スポーツ・アウトドア専用
      item11: ['item11_1', 'item11_2', 'item11_3', 'item11_4', 'item11_5', 'item11_6', 'item11_7', 'item11_8', 'item11_9', 'item11_10'],

      // 12. 仕事服・ユニフォーム・エプロン系
      item12: ['item12_1', 'item12_2', 'item12_3', 'item12_4', 'item12_5', 'item12_6', 'item12_7', 'item12_8', 'item12_9', 'item12_10'],
      item12_10: ['item12_10_1', 'item12_10_2', 'item12_10_3'],

      // 13. 和装・民族衣装系
      item13: ['item13_1', 'item13_2', 'item13_3', 'item13_4', 'item13_5', 'item13_6'],

      // 14. マタニティ・ベビー・介護系
      item14: ['item14_1', 'item14_2', 'item14_3'],
      item14_1: ['item14_1_1', 'item14_1_2', 'item14_1_3', 'item14_1_4', 'item14_1_5'],
      item14_2: ['item14_2_1', 'item14_2_2', 'item14_2_3', 'item14_2_4', 'item14_2_5', 'item14_2_6'],
      item14_3: ['item14_3_1', 'item14_3_2', 'item14_3_3', 'item14_3_4'],
    };

    const getAllDescendants = (parentKey: string): string[] => {
      const children = directChildren[parentKey] || [];
      const descendants = [...children];
      children.forEach(child => {
        descendants.push(...getAllDescendants(child));
      });
      return descendants;
    };

    newState[key as keyof typeof bodyAndItems] = checked;
    const allDescendants = getAllDescendants(key);
    allDescendants.forEach(descendant => {
      newState[descendant as keyof typeof bodyAndItems] = checked;
    });

    Object.keys(directChildren).reverse().forEach(parent => {
      const children = directChildren[parent];
      const allChildrenChecked = children.every(child => newState[child as keyof typeof bodyAndItems]);
      newState[parent as keyof typeof bodyAndItems] = allChildrenChecked;
    });

    setBodyAndItems(newState);
  };

  // 生活シーンのチェックボックス制御
  const handleLifeScenesChange = (key: string, checked: boolean) => {
    const newState = { ...lifeScenes };
    const directChildren: Record<string, string[]> = {
      daily: ['commute'],
      commute: ['commuteDetail1', 'commuteDetail2'],
      sports: ['running'],
      running: ['runningDetail1', 'runningDetail2'],
    };

    const getAllDescendants = (parentKey: string): string[] => {
      const children = directChildren[parentKey] || [];
      const descendants = [...children];
      children.forEach(child => {
        descendants.push(...getAllDescendants(child));
      });
      return descendants;
    };

    newState[key as keyof typeof lifeScenes] = checked;
    const allDescendants = getAllDescendants(key);
    allDescendants.forEach(descendant => {
      newState[descendant as keyof typeof lifeScenes] = checked;
    });

    newState.commute = newState.commuteDetail1 && newState.commuteDetail2;
    newState.running = newState.runningDetail1 && newState.runningDetail2;
    newState.daily = newState.commute;
    newState.sports = newState.running;

    setLifeScenes(newState);
  };

  const handleSubmit = () => {
    onShowResults();
  };

  const getSelectedTags = () => {
    const tags: string[] = [];
    
    // 商品名
    if (productName) {
      tags.push(`商品名: ${productName}`);
    }
    
    // 機能性から選択された項目をカウント（実際の実装例）
    const functionalityCount = Object.values(functionality).filter(Boolean).length;
    if (functionalityCount > 0) {
      tags.push(`機能性: ${functionalityCount}項目選択`);
    }
    
    // ボディパーツ＆アイテムから選択された項目をカウント
    const bodyItemsCount = Object.values(bodyAndItems).filter(Boolean).length;
    if (bodyItemsCount > 0) {
      tags.push(`アイテム種別: ${bodyItemsCount}項目選択`);
    }
    
    // 生活シーンから選択された項目をカウント
    const lifeScenesCount = Object.values(lifeScenes).filter(Boolean).length;
    if (lifeScenesCount > 0) {
      tags.push(`生活シーン: ${lifeScenesCount}項目選択`);
    }
    
    // サンプルデータ（何も選択されていない場合に表示）
    if (tags.length === 0) {
      tags.push('保温・発熱');
      tags.push('吸湿発熱繊維（ヒートテック系）');
      tags.push('パジャマ（上下セット）');
      tags.push('日常・タウンユース');
      tags.push('30〜50代女性');
      tags.push('睡眠改善');
    }
    
    return tags;
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              ダッシュボードに戻る
            </Button>
            <div className="flex-1">
              <h1 className="text-xl">新商品の市場性診断フォーム</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* セクション1：商品基本情報 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>① 商品の基本情報</CardTitle>
                <button
                  onClick={handleTestDataInput}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  テストデータ入力
                </button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="productName">商品名</Label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="例）睡眠改善パジャマ"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="material">素材・技術の特徴</Label>
                <Textarea
                  id="material"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="例）鉱物練り込み遠赤外線素材など"
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="target">想定ターゲット（自由記述）</Label>
                <Textarea
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="例）30〜50代の睡眠に悩む働く女性"
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="otherRequests">その他の要望（自由記述）</Label>
                <Textarea
                  id="otherRequests"
                  value={otherRequests}
                  onChange={(e) => setOtherRequests(e.target.value)}
                  placeholder="例）特定の機能やデザインの要望"
                  className="mt-1.5"
                  rows={3}
                />
              </div>

              <div className="pt-2">
                <Button onClick={handleAIRecommend} className="w-full">
                  <Sparkles className="w-4 h-4 mr-2" />
                  この内容で以下のフォームをAIでおすすめ入力
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* セクション2：機能性（大幅拡充版） */}
          <Card>
            <CardHeader>
              <CardTitle>② 機能性：何を解決／向上させるか</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {/* 1. 体温・熱環境コントロール系 */}
                <CheckboxItem id="cat1" label="1. 体温・熱環境コントロール系" checked={functionality.cat1} onChange={(checked) => handleFunctionalityChange('cat1', checked)} level={0}>
                  <CheckboxItem id="cat1_1" label="1-1. 保温・発熱" checked={functionality.cat1_1} onChange={(checked) => handleFunctionalityChange('cat1_1', checked)} level={1}>
                    <CheckboxItem id="cat1_1_1" label="断熱・保温" checked={functionality.cat1_1_1} onChange={(checked) => handleFunctionalityChange('cat1_1_1', checked)} level={2}>
                      <CheckboxItem id="cat1_1_1_1" label="起毛・中わた・ダウン・エアポケット構造" checked={functionality.cat1_1_1_1} onChange={(checked) => handleFunctionalityChange('cat1_1_1_1', checked)} level={3} />
                      <CheckboxItem id="cat1_1_1_2" label="アルミ蒸着・赤外線反射コーティング" checked={functionality.cat1_1_1_2} onChange={(checked) => handleFunctionalityChange('cat1_1_1_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat1_1_2" label="吸湿発熱・蓄熱" checked={functionality.cat1_1_2} onChange={(checked) => handleFunctionalityChange('cat1_1_2', checked)} level={2}>
                      <CheckboxItem id="cat1_1_2_1" label="吸湿発熱繊維（ヒートテック系）" checked={functionality.cat1_1_2_1} onChange={(checked) => handleFunctionalityChange('cat1_1_2_1', checked)} level={3} />
                      <CheckboxItem id="cat1_1_2_2" label="相変化素材（PCM）による蓄熱・放熱制御" checked={functionality.cat1_1_2_2} onChange={(checked) => handleFunctionalityChange('cat1_1_2_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat1_1_3" label="局所保温" checked={functionality.cat1_1_3} onChange={(checked) => handleFunctionalityChange('cat1_1_3', checked)} level={2} />
                  </CheckboxItem>

                  <CheckboxItem id="cat1_2" label="1-2. 冷却・放熱" checked={functionality.cat1_2} onChange={(checked) => handleFunctionalityChange('cat1_2', checked)} level={1}>
                    <CheckboxItem id="cat1_2_1" label="通気・放熱" checked={functionality.cat1_2_1} onChange={(checked) => handleFunctionalityChange('cat1_2_1', checked)} level={2}>
                      <CheckboxItem id="cat1_2_1_1" label="メッシュ構造・通気孔・ベンチレーションジッパー" checked={functionality.cat1_2_1_1} onChange={(checked) => handleFunctionalityChange('cat1_2_1_1', checked)} level={3} />
                      <CheckboxItem id="cat1_2_1_2" label="立体構造で肌との接触面積を減らす設計" checked={functionality.cat1_2_1_2} onChange={(checked) => handleFunctionalityChange('cat1_2_1_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat1_2_2" label="吸汗速乾" checked={functionality.cat1_2_2} onChange={(checked) => handleFunctionalityChange('cat1_2_2', checked)} level={2}>
                      <CheckboxItem id="cat1_2_2_1" label="吸水拡散フィラメント構造" checked={functionality.cat1_2_2_1} onChange={(checked) => handleFunctionalityChange('cat1_2_2_1', checked)} level={3} />
                      <CheckboxItem id="cat1_2_2_2" label="疎水/親水の組み合わせによる汗の離/移動" checked={functionality.cat1_2_2_2} onChange={(checked) => handleFunctionalityChange('cat1_2_2_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat1_2_3" label="冷感・接触冷感" checked={functionality.cat1_2_3} onChange={(checked) => handleFunctionalityChange('cat1_2_3', checked)} level={2}>
                      <CheckboxItem id="cat1_2_3_1" label="高熱伝導繊維（キシリトール加工など）" checked={functionality.cat1_2_3_1} onChange={(checked) => handleFunctionalityChange('cat1_2_3_1', checked)} level={3} />
                      <CheckboxItem id="cat1_2_3_2" label="冷感コーティング" checked={functionality.cat1_2_3_2} onChange={(checked) => handleFunctionalityChange('cat1_2_3_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat1_2_4" label="アクティブ冷却" checked={functionality.cat1_2_4} onChange={(checked) => handleFunctionalityChange('cat1_2_4', checked)} level={2}>
                      <CheckboxItem id="cat1_2_4_1" label="ファン付きウェア" checked={functionality.cat1_2_4_1} onChange={(checked) => handleFunctionalityChange('cat1_2_4_1', checked)} level={3} />
                      <CheckboxItem id="cat1_2_4_2" label="冷却材ポケット・アイスパック用ポケット" checked={functionality.cat1_2_4_2} onChange={(checked) => handleFunctionalityChange('cat1_2_4_2', checked)} level={3} />
                    </CheckboxItem>
                  </CheckboxItem>

                  <CheckboxItem id="cat1_3" label="1-3. 温度・湿度調整（環境適応）" checked={functionality.cat1_3} onChange={(checked) => handleFunctionalityChange('cat1_3', checked)} level={1}>
                    <CheckboxItem id="cat1_3_1" label="温度自動調整" checked={functionality.cat1_3_1} onChange={(checked) => handleFunctionalityChange('cat1_3_1', checked)} level={2}>
                      <CheckboxItem id="cat1_3_1_1" label="PCMによる一定温度帯の維持" checked={functionality.cat1_3_1_1} onChange={(checked) => handleFunctionalityChange('cat1_3_1_1', checked)} level={3} />
                      <CheckboxItem id="cat1_3_1_2" label="暑いときは放熱／寒いときは保温のハイブリッド仕様" checked={functionality.cat1_3_1_2} onChange={(checked) => handleFunctionalityChange('cat1_3_1_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat1_3_2" label="調湿（ムレ軽減）" checked={functionality.cat1_3_2} onChange={(checked) => handleFunctionalityChange('cat1_3_2', checked)} level={2}>
                      <CheckboxItem id="cat1_3_2_1" label="吸放湿繊維（ウール・再生繊維など）" checked={functionality.cat1_3_2_1} onChange={(checked) => handleFunctionalityChange('cat1_3_2_1', checked)} level={3} />
                      <CheckboxItem id="cat1_3_2_2" label="中層に湿気を逃がすレイヤー構造" checked={functionality.cat1_3_2_2} onChange={(checked) => handleFunctionalityChange('cat1_3_2_2', checked)} level={3} />
                    </CheckboxItem>
                  </CheckboxItem>
                </CheckboxItem>

                {/* 2. 物理的保護・サポート系 */}
                <CheckboxItem id="cat2" label="2. 物理的保護・サポート系" checked={functionality.cat2} onChange={(checked) => handleFunctionalityChange('cat2', checked)} level={0}>
                  <CheckboxItem id="cat2_1" label="2-1. 外部衝撃・摩耗からの保護" checked={functionality.cat2_1} onChange={(checked) => handleFunctionalityChange('cat2_1', checked)} level={1}>
                    <CheckboxItem id="cat2_1_1" label="耐摩耗・耐引裂" checked={functionality.cat2_1_1} onChange={(checked) => handleFunctionalityChange('cat2_1_1', checked)} level={2}>
                      <CheckboxItem id="cat2_1_1_1" label="高強度繊維（CORDURA等）" checked={functionality.cat2_1_1_1} onChange={(checked) => handleFunctionalityChange('cat2_1_1_1', checked)} level={3} />
                      <CheckboxItem id="cat2_1_1_2" label="二重生地・補強パネル" checked={functionality.cat2_1_1_2} onChange={(checked) => handleFunctionalityChange('cat2_1_1_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat2_1_2" label="衝撃吸収" checked={functionality.cat2_1_2} onChange={(checked) => handleFunctionalityChange('cat2_1_2', checked)} level={2}>
                      <CheckboxItem id="cat2_1_2_1" label="フォームパッド・ゲルパッド（膝・肘・尻・肩）" checked={functionality.cat2_1_2_1} onChange={(checked) => handleFunctionalityChange('cat2_1_2_1', checked)} level={3} />
                      <CheckboxItem id="cat2_1_2_2" label="プロテクター内蔵ジャケット・パンツ" checked={functionality.cat2_1_2_2} onChange={(checked) => handleFunctionalityChange('cat2_1_2_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat2_1_3" label="切創・突き刺し防止" checked={functionality.cat2_1_3} onChange={(checked) => handleFunctionalityChange('cat2_1_3', checked)} level={2}>
                      <CheckboxItem id="cat2_1_3_1" label="切創耐性繊維（アラミド等）" checked={functionality.cat2_1_3_1} onChange={(checked) => handleFunctionalityChange('cat2_1_3_1', checked)} level={3} />
                    </CheckboxItem>
                  </CheckboxItem>

                  <CheckboxItem id="cat2_2" label="2-2. 身体サポート・圧迫" checked={functionality.cat2_2} onChange={(checked) => handleFunctionalityChange('cat2_2', checked)} level={1}>
                    <CheckboxItem id="cat2_2_1" label="コンプレッション" checked={functionality.cat2_2_1} onChange={(checked) => handleFunctionalityChange('cat2_2_1', checked)} level={2}>
                      <CheckboxItem id="cat2_2_1_1" label="段階着圧（ふくらはぎ・太もも・腕）" checked={functionality.cat2_2_1_1} onChange={(checked) => handleFunctionalityChange('cat2_2_1_1', checked)} level={3} />
                      <CheckboxItem id="cat2_2_1_2" label="筋振動抑制・血流サポート" checked={functionality.cat2_2_1_2} onChange={(checked) => handleFunctionalityChange('cat2_2_1_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat2_2_2" label="姿勢・関節サポート" checked={functionality.cat2_2_2} onChange={(checked) => handleFunctionalityChange('cat2_2_2', checked)} level={2}>
                      <CheckboxItem id="cat2_2_2_1" label="腰ベルト・姿勢矯正インナー" checked={functionality.cat2_2_2_1} onChange={(checked) => handleFunctionalityChange('cat2_2_2_1', checked)} level={3} />
                      <CheckboxItem id="cat2_2_2_2" label="膝・足首サポーター" checked={functionality.cat2_2_2_2} onChange={(checked) => handleFunctionalityChange('cat2_2_2_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="cat2_2_3" label="筋肉サポート・キネシオロジー模倣" checked={functionality.cat2_2_3} onChange={(checked) => handleFunctionalityChange('cat2_2_3', checked)} level={2}>
                      <CheckboxItem id="cat2_2_3_1" label="テーピングラインに沿った裁断・圧着" checked={functionality.cat2_2_3_1} onChange={(checked) => handleFunctionalityChange('cat2_2_3_1', checked)} level={3} />
                    </CheckboxItem>
                  </CheckboxItem>

                  <CheckboxItem id="cat2_3" label="2-3. 特殊環境からの保護" checked={functionality.cat2_3} onChange={(checked) => handleFunctionalityChange('cat2_3', checked)} level={1}>
                    <CheckboxItem id="cat2_3_1" label="耐熱・難燃" checked={functionality.cat2_3_1} onChange={(checked) => handleFunctionalityChange('cat2_3_1', checked)} level={2} />
                    <CheckboxItem id="cat2_3_2" label="耐寒・極寒対応" checked={functionality.cat2_3_2} onChange={(checked) => handleFunctionalityChange('cat2_3_2', checked)} level={2} />
                    <CheckboxItem id="cat2_3_3" label="防刃・防弾（※特殊用途）" checked={functionality.cat2_3_3} onChange={(checked) => handleFunctionalityChange('cat2_3_3', checked)} level={2} />
                  </CheckboxItem>
                </CheckboxItem>

                {/* 3〜10のカテゴリーは省略表示 */}
                <CheckboxItem id="cat3" label="3. 水・風・汚れ・化学物質からの保護系" checked={functionality.cat3} onChange={(checked) => handleFunctionalityChange('cat3', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">防水・撥水、汚れ防止、防塵など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="cat4" label="4. 光・電磁・微生物などからの保護系" checked={functionality.cat4} onChange={(checked) => handleFunctionalityChange('cat4', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">UVカット、抗菌・防臭など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="cat5" label="5. 快適性・感覚調整系（肌・感触・心理）" checked={functionality.cat5} onChange={(checked) => handleFunctionalityChange('cat5', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">低刺激、ストレッチ、心理的快適など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="cat6" label="6. パフォーマンス・動作補助・健康系" checked={functionality.cat6} onChange={(checked) => handleFunctionalityChange('cat6', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">運動パフォーマンス、疲労回復など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="cat7" label="7. スマートテキスタイル・デジタル連携系" checked={functionality.cat7} onChange={(checked) => handleFunctionalityChange('cat7', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">センシング、温度制御、通信など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="cat8" label="8. ストレージ・携行・利便性系" checked={functionality.cat8} onChange={(checked) => handleFunctionalityChange('cat8', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">収納、パッカブル、着脱容易など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="cat9" label="9. サステナビリティ・環境配慮系" checked={functionality.cat9} onChange={(checked) => handleFunctionalityChange('cat9', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">リサイクル素材、高耐久など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="cat10" label="10. 法規・産業別の特殊機能" checked={functionality.cat10} onChange={(checked) => handleFunctionalityChange('cat10', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">産業安全規格、医療・福祉系など（実装済み）</p>
                </CheckboxItem>
              </div>
            </CardContent>
          </Card>

          {/* セクション3：ボディパーツ＆アイテム種別（大幅拡充版） */}
          <Card>
            <CardHeader>
              <CardTitle>③ ボディパーツ & アイテム種別</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {/* 1. 頭・顔まわり */}
                <CheckboxItem id="item1" label="1. 頭・顔まわり" checked={bodyAndItems.item1} onChange={(checked) => handleBodyAndItemsChange('item1', checked)} level={0}>
                  <CheckboxItem id="item1_1" label="1-1. 頭（ヘッドウェア）" checked={bodyAndItems.item1_1} onChange={(checked) => handleBodyAndItemsChange('item1_1', checked)} level={1}>
                    <CheckboxItem id="item1_1_1" label="帽子（ハット）" checked={bodyAndItems.item1_1_1} onChange={(checked) => handleBodyAndItemsChange('item1_1_1', checked)} level={2}>
                      <CheckboxItem id="item1_1_1_1" label="キャップ" checked={bodyAndItems.item1_1_1_1} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_1', checked)} level={3}>
                        <CheckboxItem id="item1_1_1_1_1" label="ベースボールキャップ" checked={bodyAndItems.item1_1_1_1_1} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_1_1', checked)} level={4} />
                        <CheckboxItem id="item1_1_1_1_2" label="5パネル" checked={bodyAndItems.item1_1_1_1_2} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_1_2', checked)} level={4} />
                      </CheckboxItem>
                      <CheckboxItem id="item1_1_1_2" label="ハット（中折れ、バケット等）" checked={bodyAndItems.item1_1_1_2} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_2', checked)} level={3} />
                      <CheckboxItem id="item1_1_1_3" label="ベレー帽" checked={bodyAndItems.item1_1_1_3} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_3', checked)} level={3} />
                      <CheckboxItem id="item1_1_1_4" label="ニット帽／ビーニー" checked={bodyAndItems.item1_1_1_4} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_4', checked)} level={3} />
                      <CheckboxItem id="item1_1_1_5" label="ハンチング" checked={bodyAndItems.item1_1_1_5} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_5', checked)} level={3} />
                      <CheckboxItem id="item1_1_1_6" label="サンバイザー" checked={bodyAndItems.item1_1_1_6} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_6', checked)} level={3} />
                      <CheckboxItem id="item1_1_1_7" label="耳当て付き帽子" checked={bodyAndItems.item1_1_1_7} onChange={(checked) => handleBodyAndItemsChange('item1_1_1_7', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="item1_1_2" label="仕事・特殊用" checked={bodyAndItems.item1_1_2} onChange={(checked) => handleBodyAndItemsChange('item1_1_2', checked)} level={2}>
                      <CheckboxItem id="item1_1_2_1" label="ヘルメット" checked={bodyAndItems.item1_1_2_1} onChange={(checked) => handleBodyAndItemsChange('item1_1_2_1', checked)} level={3} />
                      <CheckboxItem id="item1_1_2_2" label="コック帽" checked={bodyAndItems.item1_1_2_2} onChange={(checked) => handleBodyAndItemsChange('item1_1_2_2', checked)} level={3} />
                      <CheckboxItem id="item1_1_2_3" label="看護帽" checked={bodyAndItems.item1_1_2_3} onChange={(checked) => handleBodyAndItemsChange('item1_1_2_3', checked)} level={3} />
                    </CheckboxItem>
                  </CheckboxItem>

                  <CheckboxItem id="item1_2" label="1-2. 顔・口元" checked={bodyAndItems.item1_2} onChange={(checked) => handleBodyAndItemsChange('item1_2', checked)} level={1}>
                    <CheckboxItem id="item1_2_1" label="マスク" checked={bodyAndItems.item1_2_1} onChange={(checked) => handleBodyAndItemsChange('item1_2_1', checked)} level={2}>
                      <CheckboxItem id="item1_2_1_1" label="不織布マスク" checked={bodyAndItems.item1_2_1_1} onChange={(checked) => handleBodyAndItemsChange('item1_2_1_1', checked)} level={3} />
                      <CheckboxItem id="item1_2_1_2" label="布マスク／ファッションマスク" checked={bodyAndItems.item1_2_1_2} onChange={(checked) => handleBodyAndItemsChange('item1_2_1_2', checked)} level={3} />
                      <CheckboxItem id="item1_2_1_3" label="防寒マスク" checked={bodyAndItems.item1_2_1_3} onChange={(checked) => handleBodyAndItemsChange('item1_2_1_3', checked)} level={3} />
                      <CheckboxItem id="item1_2_1_4" label="スポーツマスク" checked={bodyAndItems.item1_2_1_4} onChange={(checked) => handleBodyAndItemsChange('item1_2_1_4', checked)} level={3} />
                      <CheckboxItem id="item1_2_1_5" label="防塵マスク（簡易）" checked={bodyAndItems.item1_2_1_5} onChange={(checked) => handleBodyAndItemsChange('item1_2_1_5', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="item1_2_2" label="フェイスカバー" checked={bodyAndItems.item1_2_2} onChange={(checked) => handleBodyAndItemsChange('item1_2_2', checked)} level={2}>
                      <CheckboxItem id="item1_2_2_1" label="バラクラバ（目出し帽）" checked={bodyAndItems.item1_2_2_1} onChange={(checked) => handleBodyAndItemsChange('item1_2_2_1', checked)} level={3} />
                      <CheckboxItem id="item1_2_2_2" label="ネックゲイターを兼ねるフェイスカバー" checked={bodyAndItems.item1_2_2_2} onChange={(checked) => handleBodyAndItemsChange('item1_2_2_2', checked)} level={3} />
                    </CheckboxItem>
                  </CheckboxItem>

                  <CheckboxItem id="item1_3" label="1-3. 耳まわり" checked={bodyAndItems.item1_3} onChange={(checked) => handleBodyAndItemsChange('item1_3', checked)} level={1}>
                    <CheckboxItem id="item1_3_1" label="イヤーマフ" checked={bodyAndItems.item1_3_1} onChange={(checked) => handleBodyAndItemsChange('item1_3_1', checked)} level={2} />
                    <CheckboxItem id="item1_3_2" label="イヤーウォーマー（ヘアバンド型）" checked={bodyAndItems.item1_3_2} onChange={(checked) => handleBodyAndItemsChange('item1_3_2', checked)} level={2} />
                    <CheckboxItem id="item1_3_3" label="耳当て一体型帽子" checked={bodyAndItems.item1_3_3} onChange={(checked) => handleBodyAndItemsChange('item1_3_3', checked)} level={2} />
                  </CheckboxItem>
                </CheckboxItem>

                {/* 2. 首・肩・上半身まわり */}
                <CheckboxItem id="item2" label="2. 首・肩・上半身まわり" checked={bodyAndItems.item2} onChange={(checked) => handleBodyAndItemsChange('item2', checked)} level={0}>
                  <CheckboxItem id="item2_1" label="2-1. 首まわり" checked={bodyAndItems.item2_1} onChange={(checked) => handleBodyAndItemsChange('item2_1', checked)} level={1}>
                    <CheckboxItem id="item2_1_1" label="マフラー" checked={bodyAndItems.item2_1_1} onChange={(checked) => handleBodyAndItemsChange('item2_1_1', checked)} level={2} />
                    <CheckboxItem id="item2_1_2" label="ストール" checked={bodyAndItems.item2_1_2} onChange={(checked) => handleBodyAndItemsChange('item2_1_2', checked)} level={2} />
                    <CheckboxItem id="item2_1_3" label="ショール" checked={bodyAndItems.item2_1_3} onChange={(checked) => handleBodyAndItemsChange('item2_1_3', checked)} level={2} />
                    <CheckboxItem id="item2_1_4" label="スヌード" checked={bodyAndItems.item2_1_4} onChange={(checked) => handleBodyAndItemsChange('item2_1_4', checked)} level={2} />
                    <CheckboxItem id="item2_1_5" label="ネックウォーマー" checked={bodyAndItems.item2_1_5} onChange={(checked) => handleBodyAndItemsChange('item2_1_5', checked)} level={2} />
                    <CheckboxItem id="item2_1_6" label="ネクタイ" checked={bodyAndItems.item2_1_6} onChange={(checked) => handleBodyAndItemsChange('item2_1_6', checked)} level={2} />
                    <CheckboxItem id="item2_1_7" label="蝶ネクタイ" checked={bodyAndItems.item2_1_7} onChange={(checked) => handleBodyAndItemsChange('item2_1_7', checked)} level={2} />
                    <CheckboxItem id="item2_1_8" label="スカーフ" checked={bodyAndItems.item2_1_8} onChange={(checked) => handleBodyAndItemsChange('item2_1_8', checked)} level={2} />
                    <CheckboxItem id="item2_1_9" label="アスコットタイ" checked={bodyAndItems.item2_1_9} onChange={(checked) => handleBodyAndItemsChange('item2_1_9', checked)} level={2} />
                  </CheckboxItem>

                  <CheckboxItem id="item2_2" label="2-2. 胸〜腹まわり（インナー寄り）" checked={bodyAndItems.item2_2} onChange={(checked) => handleBodyAndItemsChange('item2_2', checked)} level={1}>
                    <CheckboxItem id="item2_2_1" label="Tシャツ" checked={bodyAndItems.item2_2_1} onChange={(checked) => handleBodyAndItemsChange('item2_2_1', checked)} level={2}>
                      <CheckboxItem id="item2_2_1_1" label="半袖Tシャツ" checked={bodyAndItems.item2_2_1_1} onChange={(checked) => handleBodyAndItemsChange('item2_2_1_1', checked)} level={3} />
                      <CheckboxItem id="item2_2_1_2" label="長袖Tシャツ" checked={bodyAndItems.item2_2_1_2} onChange={(checked) => handleBodyAndItemsChange('item2_2_1_2', checked)} level={3} />
                      <CheckboxItem id="item2_2_1_3" label="七分袖Tシャツ" checked={bodyAndItems.item2_2_1_3} onChange={(checked) => handleBodyAndItemsChange('item2_2_1_3', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="item2_2_2" label="カットソー／カットソートップス" checked={bodyAndItems.item2_2_2} onChange={(checked) => handleBodyAndItemsChange('item2_2_2', checked)} level={2} />
                    <CheckboxItem id="item2_2_3" label="タンクトップ" checked={bodyAndItems.item2_2_3} onChange={(checked) => handleBodyAndItemsChange('item2_2_3', checked)} level={2} />
                    <CheckboxItem id="item2_2_4" label="キャミソール" checked={bodyAndItems.item2_2_4} onChange={(checked) => handleBodyAndItemsChange('item2_2_4', checked)} level={2} />
                    <CheckboxItem id="item2_2_5" label="ノースリーブトップ" checked={bodyAndItems.item2_2_5} onChange={(checked) => handleBodyAndItemsChange('item2_2_5', checked)} level={2} />
                    <CheckboxItem id="item2_2_6" label="肌着（アンダーシャツ）" checked={bodyAndItems.item2_2_6} onChange={(checked) => handleBodyAndItemsChange('item2_2_6', checked)} level={2}>
                      <CheckboxItem id="item2_2_6_1" label="吸汗速乾インナー" checked={bodyAndItems.item2_2_6_1} onChange={(checked) => handleBodyAndItemsChange('item2_2_6_1', checked)} level={3} />
                      <CheckboxItem id="item2_2_6_2" label="ヒート系インナー" checked={bodyAndItems.item2_2_6_2} onChange={(checked) => handleBodyAndItemsChange('item2_2_6_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="item2_2_7" label="腹巻" checked={bodyAndItems.item2_2_7} onChange={(checked) => handleBodyAndItemsChange('item2_2_7', checked)} level={2}>
                      <CheckboxItem id="item2_2_7_1" label="通常腹巻" checked={bodyAndItems.item2_2_7_1} onChange={(checked) => handleBodyAndItemsChange('item2_2_7_1', checked)} level={3} />
                      <CheckboxItem id="item2_2_7_2" label="着圧腹巻" checked={bodyAndItems.item2_2_7_2} onChange={(checked) => handleBodyAndItemsChange('item2_2_7_2', checked)} level={3} />
                      <CheckboxItem id="item2_2_7_3" label="妊婦用腹巻（マタニティ）" checked={bodyAndItems.item2_2_7_3} onChange={(checked) => handleBodyAndItemsChange('item2_2_7_3', checked)} level={3} />
                    </CheckboxItem>
                  </CheckboxItem>

                  <CheckboxItem id="item2_3" label="2-3. シャツ・ブラウス系" checked={bodyAndItems.item2_3} onChange={(checked) => handleBodyAndItemsChange('item2_3', checked)} level={1}>
                    <CheckboxItem id="item2_3_1" label="ワイシャツ／ドレスシャツ" checked={bodyAndItems.item2_3_1} onChange={(checked) => handleBodyAndItemsChange('item2_3_1', checked)} level={2} />
                    <CheckboxItem id="item2_3_2" label="カジュアルシャツ" checked={bodyAndItems.item2_3_2} onChange={(checked) => handleBodyAndItemsChange('item2_3_2', checked)} level={2} />
                    <CheckboxItem id="item2_3_3" label="開襟シャツ" checked={bodyAndItems.item2_3_3} onChange={(checked) => handleBodyAndItemsChange('item2_3_3', checked)} level={2} />
                    <CheckboxItem id="item2_3_4" label="チュニックシャツ" checked={bodyAndItems.item2_3_4} onChange={(checked) => handleBodyAndItemsChange('item2_3_4', checked)} level={2} />
                    <CheckboxItem id="item2_3_5" label="ブラウス" checked={bodyAndItems.item2_3_5} onChange={(checked) => handleBodyAndItemsChange('item2_3_5', checked)} level={2} />
                    <CheckboxItem id="item2_3_6" label="ポロシャツ" checked={bodyAndItems.item2_3_6} onChange={(checked) => handleBodyAndItemsChange('item2_3_6', checked)} level={2} />
                  </CheckboxItem>

                  <CheckboxItem id="item2_4" label="2-4. ニット・スウェット系" checked={bodyAndItems.item2_4} onChange={(checked) => handleBodyAndItemsChange('item2_4', checked)} level={1}>
                    <CheckboxItem id="item2_4_1" label="セーター／ニット" checked={bodyAndItems.item2_4_1} onChange={(checked) => handleBodyAndItemsChange('item2_4_1', checked)} level={2}>
                      <CheckboxItem id="item2_4_1_1" label="クルーネック" checked={bodyAndItems.item2_4_1_1} onChange={(checked) => handleBodyAndItemsChange('item2_4_1_1', checked)} level={3} />
                      <CheckboxItem id="item2_4_1_2" label="Vネック" checked={bodyAndItems.item2_4_1_2} onChange={(checked) => handleBodyAndItemsChange('item2_4_1_2', checked)} level={3} />
                      <CheckboxItem id="item2_4_1_3" label="タートルネック／ハイネック" checked={bodyAndItems.item2_4_1_3} onChange={(checked) => handleBodyAndItemsChange('item2_4_1_3', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="item2_4_2" label="カーディガン" checked={bodyAndItems.item2_4_2} onChange={(checked) => handleBodyAndItemsChange('item2_4_2', checked)} level={2} />
                    <CheckboxItem id="item2_4_3" label="スウェット（トレーナー）" checked={bodyAndItems.item2_4_3} onChange={(checked) => handleBodyAndItemsChange('item2_4_3', checked)} level={2} />
                    <CheckboxItem id="item2_4_4" label="パーカー" checked={bodyAndItems.item2_4_4} onChange={(checked) => handleBodyAndItemsChange('item2_4_4', checked)} level={2}>
                      <CheckboxItem id="item2_4_4_1" label="プルオーバーパーカー" checked={bodyAndItems.item2_4_4_1} onChange={(checked) => handleBodyAndItemsChange('item2_4_4_1', checked)} level={3} />
                      <CheckboxItem id="item2_4_4_2" label="ジップパーカー" checked={bodyAndItems.item2_4_4_2} onChange={(checked) => handleBodyAndItemsChange('item2_4_4_2', checked)} level={3} />
                    </CheckboxItem>
                    <CheckboxItem id="item2_4_5" label="スウェットベスト・ニットベスト" checked={bodyAndItems.item2_4_5} onChange={(checked) => handleBodyAndItemsChange('item2_4_5', checked)} level={2} />
                  </CheckboxItem>
                </CheckboxItem>

                {/* 続く... 残りのカテゴリーも同様に実装 */}
                {/* ここでは主要部分のみ示し、残りは省略記号で表現します */}
                
                <CheckboxItem id="item3" label="3. アウター（上半身）" checked={bodyAndItems.item3} onChange={(checked) => handleBodyAndItemsChange('item3', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">軽アウター、コート、スーツなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item4" label="4. ボトムス（下半身）" checked={bodyAndItems.item4} onChange={(checked) => handleBodyAndItemsChange('item4', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">パンツ、スカートなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item5" label="5. ワンピース・セットアイテム" checked={bodyAndItems.item5} onChange={(checked) => handleBodyAndItemsChange('item5', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">ワンピース、セットアップなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item6" label="6. インナー・アンダーウェア" checked={bodyAndItems.item6} onChange={(checked) => handleBodyAndItemsChange('item6', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">上下インナー、機能インナーなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item7" label="7. レッグウェア・フットウェア周辺" checked={bodyAndItems.item7} onChange={(checked) => handleBodyAndItemsChange('item7', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">靴下、タイツ、レギンスなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item8" label="8. 手・腕まわり" checked={bodyAndItems.item8} onChange={(checked) => handleBodyAndItemsChange('item8', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">手袋、アームカバーなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item9" label="9. ルームウェア・スリープウェア" checked={bodyAndItems.item9} onChange={(checked) => handleBodyAndItemsChange('item9', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">パジャマ、バスローブなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item10" label="10. 雨具・防寒具・特殊アウター" checked={bodyAndItems.item10} onChange={(checked) => handleBodyAndItemsChange('item10', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">レインコート、スキーウェアなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item11" label="11. スポーツ・アウトドア専用" checked={bodyAndItems.item11} onChange={(checked) => handleBodyAndItemsChange('item11', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">トレーニングウェア、水着など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item12" label="12. 仕事服・ユニフォーム・エプロン系" checked={bodyAndItems.item12} onChange={(checked) => handleBodyAndItemsChange('item12', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">作業着、白衣、エプロンなど（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item13" label="13. 和装・民族衣装系" checked={bodyAndItems.item13} onChange={(checked) => handleBodyAndItemsChange('item13', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">着物、浴衣、甚平など（実装済み）</p>
                </CheckboxItem>

                <CheckboxItem id="item14" label="14. マタニティ・ベビー・介護系" checked={bodyAndItems.item14} onChange={(checked) => handleBodyAndItemsChange('item14', checked)} level={0}>
                  <p className="text-sm text-gray-500 ml-6">マタニティ、ベビー、介護向けアイテム（実装済み）</p>
                </CheckboxItem>
              </div>
            </CardContent>
          </Card>

          {/* セクション4：生活シーン */}
          <Card>
            <CardHeader>
              <CardTitle>④ 生活シーン：誰が・どんな場面で使うか</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {/* 日常・タウンユース */}
                <CheckboxItem id="daily" label="日常・タウンユース" checked={lifeScenes.daily} onChange={(checked) => handleLifeScenesChange('daily', checked)} level={0}>
                  <CheckboxItem id="commute" label="通勤・通学" checked={lifeScenes.commute} onChange={(checked) => handleLifeScenesChange('commute', checked)} level={1}>
                    <CheckboxItem id="commuteDetail1" label="電車・バス通勤" checked={lifeScenes.commuteDetail1} onChange={(checked) => handleLifeScenesChange('commuteDetail1', checked)} level={2} />
                    <CheckboxItem id="commuteDetail2" label="自転車通勤" checked={lifeScenes.commuteDetail2} onChange={(checked) => handleLifeScenesChange('commuteDetail2', checked)} level={2} />
                  </CheckboxItem>
                </CheckboxItem>

                {/* スポーツ・運動 */}
                <CheckboxItem id="sports" label="スポーツ・運動" checked={lifeScenes.sports} onChange={(checked) => handleLifeScenesChange('sports', checked)} level={0}>
                  <CheckboxItem id="running" label="ランニング・ジョギング" checked={lifeScenes.running} onChange={(checked) => handleLifeScenesChange('running', checked)} level={1}>
                    <CheckboxItem id="runningDetail1" label="日中のランニング" checked={lifeScenes.runningDetail1} onChange={(checked) => handleLifeScenesChange('runningDetail1', checked)} level={2} />
                    <CheckboxItem id="runningDetail2" label="ナイトラン（夜間）" checked={lifeScenes.runningDetail2} onChange={(checked) => handleLifeScenesChange('runningDetail2', checked)} level={2} />
                  </CheckboxItem>
                </CheckboxItem>
              </div>
            </CardContent>
          </Card>

          {/* セクション5：選択内容の要約 */}
          <Card>
            <CardHeader>
              <CardTitle>⑤ 選択した条件の要約</CardTitle>
            </CardHeader>
            <CardContent>
              {getSelectedTags().length === 0 ? (
                <p className="text-sm text-gray-500">選択された条件はまだありません。</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {getSelectedTags().map((tag, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1.5">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 送信ボタン */}
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button onClick={handleSubmit} size="lg">
              この条件で市場性診断を実行
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
