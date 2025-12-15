import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";

const data12Months = [
  { month: '7月', 疲労回復: 25, 睡眠改善: 20, 女性向け: 18, 冷感: 10, 温感: 15, 美容: 12 },
  { month: '8月', 疲労回復: 24, 睡眠改善: 19, 女性向け: 19, 冷感: 12, 温感: 14, 美容: 12 },
  { month: '9月', 疲労回復: 23, 睡眠改善: 18, 女性向け: 20, 冷感: 14, 温感: 13, 美容: 12 },
  { month: '10月', 疲労回復: 24, 睡眠改善: 19, 女性向け: 19, 冷感: 13, 温感: 12, 美容: 13 },
  { month: '11月', 疲労回復: 23, 睡眠改善: 19, 女性向け: 20, 冷感: 14, 温感: 11, 美容: 13 },
  { month: '12月', 疲労回復: 22, 睡眠改善: 18, 女性向け: 20, 冷感: 15, 温感: 12, 美容: 13 },
  { month: '1月', 疲労回復: 22, 睡眠改善: 18, 女性向け: 20, 冷感: 15, 温感: 12, 美容: 13 },
  { month: '2月', 疲労回復: 20, 睡眠改善: 20, 女性向け: 19, 冷感: 16, 温感: 14, 美容: 11 },
  { month: '3月', 疲労回復: 23, 睡眠改善: 19, 女性向け: 18, 冷感: 17, 温感: 13, 美容: 10 },
  { month: '4月', 疲労回復: 21, 睡眠改善: 17, 女性向け: 21, 冷感: 19, 温感: 12, 美容: 10 },
  { month: '5月', 疲労回復: 19, 睡眠改善: 16, 女性向け: 22, 冷感: 23, 温感: 10, 美容: 10 },
  { month: '6月', 疲労回復: 18, 睡眠改善: 15, 女性向け: 23, 冷感: 25, 温感: 9, 美容: 10 }
];

const data6Months = data12Months.slice(-6);
const data3Months = data12Months.slice(-3);

export function CategoryShareChart() {
  const [period, setPeriod] = useState<'3' | '6' | '12'>('6');
  
  const data = period === '3' ? data3Months : period === '6' ? data6Months : data12Months;
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>機能別カテゴリー市場シェア推移</CardTitle>
            <CardDescription>各機能カテゴリーの月別市場シェア変動</CardDescription>
          </div>
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
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis label={{ value: 'シェア(%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="疲労回復" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="睡眠改善" stroke="#82ca9d" strokeWidth={2} />
            <Line type="monotone" dataKey="女性向け" stroke="#ffc658" strokeWidth={2} />
            <Line type="monotone" dataKey="冷感" stroke="#ff7c7c" strokeWidth={2} />
            <Line type="monotone" dataKey="温感" stroke="#8dd1e1" strokeWidth={2} />
            <Line type="monotone" dataKey="美容" stroke="#d084d0" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}