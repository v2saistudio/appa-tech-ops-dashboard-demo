import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  Check, 
  Send, 
  Mail, 
  Building2, 
  ChevronRight,
  CheckCircle2
} from "lucide-react";

interface ProposalRecruitmentFlowProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  categoryName: string;
}

// メーカーデータ型
interface Manufacturer {
  id: number;
  name: string;
  specialty: string;
  contactPerson: string;
  phone: string;
  email: string;
}

// モックメーカーデータ
const manufacturers: Manufacturer[] = [
  { 
    id: 1, 
    name: "東洋紡株式会社", 
    specialty: "機能性繊維・温度調整素材", 
    contactPerson: "田中 太郎", 
    phone: "03-1234-5678",
    email: "tanaka@toyobo.co.jp"
  },
  { 
    id: 2, 
    name: "帝人フロンティア株式会社", 
    specialty: "高機能ポリエステル・吸湿発熱", 
    contactPerson: "佐藤 花子", 
    phone: "06-2345-6789",
    email: "sato@teijin.co.jp"
  },
  { 
    id: 3, 
    name: "クラボウ", 
    specialty: "オーガニック素材・抗菌加工", 
    contactPerson: "鈴木 一郎", 
    phone: "06-3456-7890",
    email: "suzuki@kurabo.co.jp"
  },
  { 
    id: 4, 
    name: "ユニチカトレーディング株式会社", 
    specialty: "遠赤外線繊維・機能性加工", 
    contactPerson: "山田 美咲", 
    phone: "06-4567-8901",
    email: "yamada@unitika.co.jp"
  },
  { 
    id: 5, 
    name: "小松マテーレ株式会社", 
    specialty: "高級機能素材・スポーツウェア", 
    contactPerson: "高橋 健二", 
    phone: "0761-12-3456",
    email: "takahashi@komatsumatere.co.jp"
  },
  { 
    id: 6, 
    name: "セーレン株式会社", 
    specialty: "吸湿速乾・冷感素材", 
    contactPerson: "中村 良子", 
    phone: "0776-34-5678",
    email: "nakamura@seiren.co.jp"
  },
];

// 企画項目の設定型
interface ProposalItem {
  category: string;
  items: {
    label: string;
    type: "fixed" | "checkbox" | "radio" | "multiCheckbox";
    value?: string;
    options?: string[];
    multiOptions?: { label: string; checked: boolean }[];
    checked?: boolean;
    selectedOption?: string;
  }[];
}

export function ProposalRecruitmentFlow({ 
  isOpen, 
  onClose, 
  productName,
  categoryName 
}: ProposalRecruitmentFlowProps) {
  const [step, setStep] = useState<"select" | "email" | "manufacturer" | "complete">("select");
  
  // 企画項目の選択状態
  const [proposalItems, setProposalItems] = useState<ProposalItem[]>([
    {
      category: "基本情報・ポジショニング",
      items: [
        { label: "商品名", type: "checkbox", checked: false },
        { label: "シーズン", type: "checkbox", value: "オールシーズン", checked: true },
        { label: "機能カテゴリー", type: "fixed", value: categoryName },
        { label: "商品カテゴリー", type: "checkbox", value: "トップス / ボトムス", checked: false },
        { 
          label: "価格レンジ", 
          type: "radio", 
          options: ["ミドル", "ハイ", "プレミアム"],
          selectedOption: "ミドル"
        },
        { 
          label: "発売予定時期", 
          type: "radio", 
          options: ["2026SS", "2026AW", "2027SS", "2027AW"],
          selectedOption: "2026AW"
        },
      ]
    },
    {
      category: "ターゲット & 着用シーン",
      items: [
        { 
          label: "ターゲット", 
          type: "multiCheckbox", 
          multiOptions: [
            { label: "メンズ", checked: false },
            { label: "レディース", checked: false },
            { label: "ユニセックス", checked: false }
          ]
        },
        { 
          label: "主な年齢レンジ", 
          type: "multiCheckbox", 
          multiOptions: [
            { label: "10代後半", checked: false },
            { label: "20代前半", checked: false },
            { label: "20代後半", checked: false },
            { label: "30代前半", checked: false },
            { label: "30代後半", checked: false },
            { label: "40代前半", checked: false },
            { label: "50代前半", checked: false },
            { label: "50代後半", checked: false },
            { label: "60代以上", checked: false }
          ]
        },
        { label: "体型・利用者特徴", type: "fixed", value: "睡眠の質に悩むビジネスパーソン、疲労回復を重視する層" },
        { label: "主な着用シーン", type: "fixed", value: "就寝時 / リラックスタイム" },
        { label: "購買動機", type: "fixed", value: "寝つきが悪い / 夜中に目が覚める / 朝の目覚めがすっきりしない" },
      ]
    },
    {
      category: "機能・素材仕様",
      items: [
        { label: "主要機能", type: "fixed", value: "温度調整 / メラトニン誘導サポート / 血行促進 / 抗菌防臭" },
        { label: "機能性加工", type: "fixed", value: "遠赤外線放出加工 / 吸湿発熱 / 抗菌防臭加工" },
        { 
          label: "機能説明", 
          type: "fixed", 
          value: "特殊鉱石練り込み繊維が遠赤外線を放出し、体温を最適化。深部体温の自然な低下をサポートして入眠を促進"
        },
        { 
          label: "表地素材構成案", 
          type: "fixed", 
          value: "オーガニックコットン 60% / 機能性ポリエステル 35% / ポリウレタン 5%"
        },
        { 
          label: "裏地／別布素材構成", 
          type: "fixed", 
          value: "遠赤外線放出セラミック練り込み繊維"
        },
      ]
    }
  ]);

  // メール本文
  const [emailSubject, setEmailSubject] = useState(
    `新しい機能性アパレル商品のご提案の依頼：${productName}`
  );
  const [emailBody, setEmailBody] = useState("");

  // 選択されたメーカー
  const [selectedManufacturers, setSelectedManufacturers] = useState<number[]>([]);

  // チェックボックスの変更
  const handleCheckboxChange = (categoryIndex: number, itemIndex: number, checked: boolean) => {
    const newItems = [...proposalItems];
    newItems[categoryIndex].items[itemIndex].checked = checked;
    setProposalItems(newItems);
  };

  // ラジオボタンの変更
  const handleRadioChange = (categoryIndex: number, itemIndex: number, value: string) => {
    const newItems = [...proposalItems];
    newItems[categoryIndex].items[itemIndex].selectedOption = value;
    setProposalItems(newItems);
  };

  // 複数チェックボックスの変更
  const handleMultiCheckboxChange = (categoryIndex: number, itemIndex: number, optionIndex: number, checked: boolean) => {
    const newItems = [...proposalItems];
    if (newItems[categoryIndex].items[itemIndex].multiOptions) {
      newItems[categoryIndex].items[itemIndex].multiOptions![optionIndex].checked = checked;
    }
    setProposalItems(newItems);
  };

  // メール文章を生成
  const generateEmailBody = () => {
    let body = `{maker name} ご担当者様

平素大変お世話になっております。
APPA-TECH ECモール運営事務局でございます。

この度、市場分析の結果、新たな機能性アパレル商品の需要が高まっていることが判明いたしました。
つきましては、貴社の技術力とノウハウを活かした新商品のご提案をお願いしたく、ご連絡申し上げました。

以下の要項に基づき、魅力的な商品企画をご提案いただけますと幸いです。

【機能性アパレル企画募集要項】

`;

    proposalItems.forEach(category => {
      body += `■ ${category.category}\n`;
      category.items.forEach(item => {
        if (item.type === "fixed") {
          body += `  - ${item.label}：${item.value}\n`;
        } else if (item.type === "checkbox") {
          if (item.checked) {
            body += `  - ${item.label}：${item.value || "ご提案ください"}\n`;
          } else {
            body += `  - ${item.label}：ご提案ください\n`;
          }
        } else if (item.type === "radio") {
          body += `  - ${item.label}：${item.selectedOption}\n`;
        } else if (item.type === "multiCheckbox") {
          const selectedOptions = item.multiOptions?.filter(opt => opt.checked).map(opt => opt.label);
          if (selectedOptions && selectedOptions.length > 0) {
            body += `  - ${item.label}：${selectedOptions.join(" / ")}\n`;
          } else {
            body += `  - ${item.label}：ご提案ください\n`;
          }
        }
      });
      body += `\n`;
    });

    body += `【ご提案いただきたい内容】
・商品の具体的な仕様（素材、機能性加工の詳細）
・製造ロット数と単価見積もり
・サンプル納品までのリードタイム
・量産体制と納期

【提案締切】
2026年1月31日（金）17:00

【提案方法】
本メールへの返信にて、企画書（PDF形式）をご提出ください。

ご不明点等ございましたら、お気軽にお問い合わせください。
何卒よろしくお願い申し上げます。

---
APPA-TECH ECモール運営事務局
担当：商品企画部
Email: planning@appa-tech.com
Tel: 03-1234-5678`;

    setEmailBody(body);
  };

  // ステップ1→2の遷移
  const handleNextToEmail = () => {
    generateEmailBody();
    setStep("email");
  };

  // メーカーの全選択/全解除
  const handleToggleAllManufacturers = () => {
    if (selectedManufacturers.length === manufacturers.length) {
      setSelectedManufacturers([]);
    } else {
      setSelectedManufacturers(manufacturers.map(m => m.id));
    }
  };

  // メーカーの選択切り替え
  const handleToggleManufacturer = (id: number) => {
    if (selectedManufacturers.includes(id)) {
      setSelectedManufacturers(selectedManufacturers.filter(mId => mId !== id));
    } else {
      setSelectedManufacturers([...selectedManufacturers, id]);
    }
  };

  // メール送信
  const handleSendEmail = () => {
    setStep("complete");
  };

  // モーダルを閉じる
  const handleCloseModal = () => {
    setStep("select");
    setSelectedManufacturers([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        {/* ステップ1: 項目選択 */}
        {step === "select" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">企画提案募集：項目選択</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-2">
                メーカーに確定条件として提示する項目と、自由提案を受け付ける項目を選択してください
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {proposalItems.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="text-base">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                        {item.type === "fixed" && (
                          <>
                            <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.label}</p>
                              <p className="text-sm text-gray-600 mt-0.5">{item.value}</p>
                              <p className="text-xs text-blue-600 mt-1">確定条件として提示</p>
                            </div>
                          </>
                        )}

                        {item.type === "checkbox" && (
                          <>
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={(e) => handleCheckboxChange(categoryIndex, itemIndex, e.target.checked)}
                              className="w-5 h-5 mt-0.5 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.label}</p>
                              {item.value && <p className="text-sm text-gray-600 mt-0.5">{item.value}</p>}
                              <p className="text-xs text-gray-500 mt-1">
                                {item.checked ? "確定条件として提示" : "自由提案を受け付ける"}
                              </p>
                            </div>
                          </>
                        )}

                        {item.type === "radio" && (
                          <div className="flex-1">
                            <p className="font-medium text-sm mb-2">{item.label}</p>
                            <div className="flex flex-wrap gap-3">
                              {item.options?.map((option) => (
                                <label key={option} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`radio-${categoryIndex}-${itemIndex}`}
                                    value={option}
                                    checked={item.selectedOption === option}
                                    onChange={() => handleRadioChange(categoryIndex, itemIndex, option)}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-sm">{option}</span>
                                </label>
                              ))}
                            </div>
                            <p className="text-xs text-blue-600 mt-2">選択した条件を確定条件として提示</p>
                          </div>
                        )}

                        {item.type === "multiCheckbox" && (
                          <div className="flex-1">
                            <p className="font-medium text-sm mb-2">{item.label}</p>
                            <div className="flex flex-wrap gap-3">
                              {item.multiOptions?.map((option, optionIndex) => (
                                <label key={optionIndex} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={option.checked}
                                    onChange={(e) => handleMultiCheckboxChange(categoryIndex, itemIndex, optionIndex, e.target.checked)}
                                    className="w-4 h-4"
                                  />
                                  <span className="text-sm">{option.label}</span>
                                </label>
                              ))}
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              {item.multiOptions?.some(opt => opt.checked) 
                                ? "選択した条件を確定条件として提示" 
                                : "自由提案を受け付ける"}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={handleCloseModal}>
                  キャンセル
                </Button>
                <Button 
                  onClick={handleNextToEmail}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  この条件で新商品提案募集
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ステップ2: メール文章作成 */}
        {step === "email" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">メール文章作成</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-2">
                自動生成されたメール文章を確認・編集してください
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2">件名</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">本文</label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  rows={20}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep("select")}>
                  戻る
                </Button>
                <Button 
                  onClick={() => setStep("manufacturer")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  この内容で新商品提案募集をかける
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ステップ3: メーカー選択 */}
        {step === "manufacturer" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">配信先メーカー選択</DialogTitle>
              <DialogDescription className="text-sm text-gray-600 mt-2">
                企画提案を依頼するメーカーを選択してください
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  {selectedManufacturers.length}社 選択中
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleToggleAllManufacturers}
                >
                  {selectedManufacturers.length === manufacturers.length ? "全て解除" : "全てに一括でチェック"}
                </Button>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-12"></th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">メーカー名</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">得意分野</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">担当者名</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">電話番号</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {manufacturers.map((manufacturer) => (
                      <tr 
                        key={manufacturer.id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedManufacturers.includes(manufacturer.id) ? "bg-blue-50" : ""
                        }`}
                        onClick={() => handleToggleManufacturer(manufacturer.id)}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedManufacturers.includes(manufacturer.id)}
                            onChange={() => handleToggleManufacturer(manufacturer.id)}
                            className="w-5 h-5"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-sm">{manufacturer.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{manufacturer.specialty}</td>
                        <td className="px-4 py-3 text-sm">{manufacturer.contactPerson}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{manufacturer.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep("email")}>
                  戻る
                </Button>
                <Button 
                  onClick={handleSendEmail}
                  disabled={selectedManufacturers.length === 0}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  選択したメーカーにメールを送信（{selectedManufacturers.length}社）
                </Button>
              </div>
            </div>
          </>
        )}

        {/* ステップ4: 完了 */}
        {step === "complete" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">送信完了</DialogTitle>
              <DialogDescription>
                企画提案募集メールの送信が完了しました
              </DialogDescription>
            </DialogHeader>

            <div className="py-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">企画提案募集メールを送信しました</h3>
                <p className="text-gray-600">
                  {selectedManufacturers.length}社のメーカーにメールを送信しました
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <h4 className="font-medium text-sm mb-2">送信先メーカー</h4>
                <ul className="space-y-1">
                  {manufacturers
                    .filter(m => selectedManufacturers.includes(m.id))
                    .map(m => (
                      <li key={m.id} className="text-sm text-gray-700 flex items-center gap-2">
                        <Mail className="w-3 h-3 text-blue-600" />
                        {m.name} ({m.contactPerson})
                      </li>
                    ))}
                </ul>
              </div>

              <p className="text-sm text-gray-600">
                提案の締切は2026年1月31日（金）17:00です。<br />
                各メーカーからの返信をお待ちください。
              </p>

              <Button 
                onClick={handleCloseModal}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                閉じる
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
