import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

const data = [
  { category: '疲労回復', 平均評価: 4.3, レビュー数: 8420 },
  { category: '睡眠改善', 平均評価: 4.5, レビュー数: 6230 },
  { category: '女性向け', 平均評価: 4.2, レビュー数: 12580 },
  { category: '冷感', 平均評価: 4.1, レビュー数: 15340 },
  { category: '温感', 平均評価: 4.4, レビュー数: 7820 },
  { category: '美容', 平均評価: 4.0, レビュー数: 5640 }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        <p className="text-blue-600">
          平均評価: {payload[0].value}点
        </p>
        <p className="text-gray-600">
          レビュー数: {payload[0].payload.レビュー数.toLocaleString()}件
        </p>
      </div>
    );
  }
  return null;
};

export function ProductRatingChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>機能別商品評価</CardTitle>
        <CardDescription>各機能カテゴリーの平均評価点とレビュー数</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis domain={[3.5, 5]} label={{ value: '評価点', angle: -90, position: 'insideLeft' }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="平均評価" fill="#8884d8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}