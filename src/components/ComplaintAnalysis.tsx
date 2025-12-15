import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const fatigueRecoveryComplaints = [
  { name: '効果実感', value: 42, color: '#ff6b6b' },
  { name: '着心地', value: 25, color: '#4ecdc4' },
  { name: '価格', value: 18, color: '#45b7d1' },
  { name: '耐久性', value: 10, color: '#96ceb4' },
  { name: 'その他', value: 5, color: '#ffeaa7' }
];

const sleepImprovementComplaints = [
  { name: '睡眠効果', value: 38, color: '#ff6b6b' },
  { name: '肌触り', value: 28, color: '#4ecdc4' },
  { name: '通気性', value: 20, color: '#45b7d1' },
  { name: '価格', value: 9, color: '#96ceb4' },
  { name: 'その他', value: 5, color: '#ffeaa7' }
];

const womenSpecificComplaints = [
  { name: 'サイズ感', value: 35, color: '#ff6b6b' },
  { name: 'デザイン', value: 28, color: '#4ecdc4' },
  { name: '機能性', value: 22, color: '#45b7d1' },
  { name: '価格', value: 10, color: '#96ceb4' },
  { name: 'その他', value: 5, color: '#ffeaa7' }
];

const coolingComplaints = [
  { name: '冷感持続時間', value: 45, color: '#ff6b6b' },
  { name: '冷感強度', value: 22, color: '#4ecdc4' },
  { name: '素材の質感', value: 18, color: '#45b7d1' },
  { name: '洗濯耐性', value: 10, color: '#96ceb4' },
  { name: 'その他', value: 5, color: '#ffeaa7' }
];

const warmingComplaints = [
  { name: '保温効果', value: 40, color: '#ff6b6b' },
  { name: '重量感', value: 25, color: '#4ecdc4' },
  { name: '動きやすさ', value: 20, color: '#45b7d1' },
  { name: '価格', value: 10, color: '#96ceb4' },
  { name: 'その他', value: 5, color: '#ffeaa7' }
];

const beautyComplaints = [
  { name: '美容効果', value: 38, color: '#ff6b6b' },
  { name: '肌への優しさ', value: 25, color: '#4ecdc4' },
  { name: '見た目', value: 20, color: '#45b7d1' },
  { name: '価格', value: 12, color: '#96ceb4' },
  { name: 'その他', value: 5, color: '#ffeaa7' }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-blue-600">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

function ComplaintPieChart({ data, title }: { data: any[], title: string }) {
  return (
    <div>
      <h4 className="mb-4 text-center">{title}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ComplaintAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>機能別不満要因分析</CardTitle>
        <CardDescription>各機能カテゴリーで多い不満要因の割合</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="fatigue">
          <TabsList className="grid grid-cols-3 w-full mb-2">
            <TabsTrigger value="fatigue">疲労回復</TabsTrigger>
            <TabsTrigger value="sleep">睡眠改善</TabsTrigger>
            <TabsTrigger value="women">女性向け</TabsTrigger>
          </TabsList>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="cooling">冷感</TabsTrigger>
            <TabsTrigger value="warming">温感</TabsTrigger>
            <TabsTrigger value="beauty">美容</TabsTrigger>
          </TabsList>
          <TabsContent value="fatigue">
            <ComplaintPieChart data={fatigueRecoveryComplaints} title="疲労回復カテゴリー" />
          </TabsContent>
          <TabsContent value="sleep">
            <ComplaintPieChart data={sleepImprovementComplaints} title="睡眠改善カテゴリー" />
          </TabsContent>
          <TabsContent value="women">
            <ComplaintPieChart data={womenSpecificComplaints} title="女性向けカテゴリー" />
          </TabsContent>
          <TabsContent value="cooling">
            <ComplaintPieChart data={coolingComplaints} title="冷感カテゴリー" />
          </TabsContent>
          <TabsContent value="warming">
            <ComplaintPieChart data={warmingComplaints} title="温感カテゴリー" />
          </TabsContent>
          <TabsContent value="beauty">
            <ComplaintPieChart data={beautyComplaints} title="美容カテゴリー" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}