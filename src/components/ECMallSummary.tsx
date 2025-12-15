import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingCart, TrendingUp, Percent } from "lucide-react";
import { useState } from "react";

const kpiData = [
  { label: "GMV", value: "¥856.3M", change: "+18.5%", icon: DollarSign, changeType: "positive" },
  { label: "粗利", value: "¥428.1M", change: "+22.3%", icon: TrendingUp, changeType: "positive" },
  { label: "客単価", value: "¥12,840", change: "+8.2%", icon: ShoppingCart, changeType: "positive" },
  { label: "CVR", value: "4.8%", change: "+0.5pt", icon: Percent, changeType: "positive" }
];

const trendData12Months = [
  { month: '7月', GMV: 620, 粗利: 298, 客単価: 11200, CVR: 3.8 },
  { month: '8月', GMV: 640, 粗利: 310, 客単価: 11400, CVR: 3.9 },
  { month: '9月', GMV: 680, 粗利: 328, 客単価: 11600, CVR: 4.0 },
  { month: '10月', GMV: 710, 粗利: 345, 客単価: 11800, CVR: 4.1 },
  { month: '11月', GMV: 740, 粗利: 358, 客単価: 12000, CVR: 4.2 },
  { month: '12月', GMV: 780, 粗利: 378, 客単価: 12200, CVR: 4.3 },
  { month: '1月', GMV: 720, 粗利: 350, 客単価: 12000, CVR: 4.2 },
  { month: '2月', GMV: 750, 粗利: 368, 客単価: 12300, CVR: 4.4 },
  { month: '3月', GMV: 790, 粗利: 388, 客単価: 12500, CVR: 4.5 },
  { month: '4月', GMV: 820, 粗利: 405, 客単価: 12700, CVR: 4.7 },
  { month: '5月', GMV: 840, 粗利: 418, 客単価: 12800, CVR: 4.8 },
  { month: '6月', GMV: 856, 粗利: 428, 客単価: 12840, CVR: 4.8 }
];

const trendData6Months = trendData12Months.slice(-6);
const trendData3Months = trendData12Months.slice(-3);

export function ECMallSummary() {
  const [period, setPeriod] = useState<'3' | '6' | '12'>('6');
  const [metric, setMetric] = useState<'GMV' | '粗利' | '客単価' | 'CVR'>('GMV');
  
  const data = period === '3' ? trendData3Months : period === '6' ? trendData6Months : trendData12Months;

  return (
    <div className="space-y-6">
      {/* KPIカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{kpi.label}</p>
                    <p className="text-2xl mt-1">{kpi.value}</p>
                    <p className={`text-sm mt-1 ${
                      kpi.changeType === 'positive' ? 'text-green-600' : 
                      kpi.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {kpi.change} 前月比
                    </p>
                  </div>
                  <IconComponent className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* トレンドグラフ */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>ECモール主要指標トレンド</CardTitle>
              <CardDescription>GMV・粗利・客単価・CVRの時系列推移</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="flex gap-1">
                <button
                  onClick={() => setPeriod('3')}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    period === '3'
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  3ヶ月
                </button>
                <button
                  onClick={() => setPeriod('6')}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    period === '6'
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  6ヶ月
                </button>
                <button
                  onClick={() => setPeriod('12')}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    period === '12'
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  12ヶ月
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-2">
            {(['GMV', '粗利', '客単価', 'CVR'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  metric === m
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey={metric} 
                stroke={metric === 'GMV' ? '#8884d8' : metric === '粗利' ? '#82ca9d' : metric === '客単価' ? '#ffc658' : '#ff7c7c'} 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
