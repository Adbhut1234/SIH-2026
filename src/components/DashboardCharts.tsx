'use client';

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
  Legend
} from 'recharts';

const accuracyData = [
  { month: 'Jan', accuracy: 92.4, confidence: 94.1 },
  { month: 'Feb', accuracy: 93.8, confidence: 95.0 },
  { month: 'Mar', accuracy: 95.2, confidence: 96.2 },
  { month: 'Apr', accuracy: 96.7, confidence: 97.4 },
  { month: 'May', accuracy: 97.5, confidence: 98.1 },
  { month: 'Jun', accuracy: 98.4, confidence: 99.2 },
];

const stateData = [
  { state: 'Maharashtra', records: 42500 },
  { state: 'Karnataka', records: 38200 },
  { state: 'Gujarat', records: 29100 },
  { state: 'Uttar Pradesh', records: 22400 },
  { state: 'Telangana', records: 18900 },
];

const statusData = [
  { name: 'Auto-Verified', value: 78, color: '#006c4a' },
  { name: 'Pending Review', value: 15, color: '#ffb400' },
  { name: 'Flagged (Low Confidence)', value: 7, color: '#ba1a1a' },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg w-full">
      
      {/* Chart 1: State-wise Progress */}
      <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm border border-surface-container flex flex-col h-[380px]">
        <div className="mb-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">State-wise Digitization</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Total legacy records processed</p>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stateData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" opacity={0.2} />
              <XAxis type="number" tick={{ fill: '#76777d', fontSize: 12 }} />
              <YAxis dataKey="state" type="category" tick={{ fill: '#76777d', fontSize: 12 }} width={80} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#85f8c4' }}
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
              />
              <Bar dataKey="records" fill="#006c4a" radius={[0, 4, 4, 0]} barSize={24} name="Records" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Accuracy Trends */}
      <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm border border-surface-container flex flex-col h-[380px]">
        <div className="mb-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">AI Extraction Accuracy</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Model confidence vs verified accuracy</p>
        </div>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={accuracyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006c4a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#006c4a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.2} />
              <XAxis dataKey="month" tick={{ fill: '#76777d', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={['auto', 'auto']} tick={{ fill: '#76777d', fontSize: 12 }} axisLine={false} tickLine={false} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Area type="monotone" dataKey="accuracy" stroke="#006c4a" strokeWidth={3} fillOpacity={1} fill="url(#colorAcc)" name="Accuracy %" />
              <Area type="monotone" dataKey="confidence" stroke="#85f8c4" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Confidence %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 3: Validation Status */}
      <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm border border-surface-container flex flex-col h-[380px]">
        <div className="mb-4">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Validation Status</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Distribution of processed records</p>
        </div>
        <div className="flex-1 w-full min-h-0 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: number) => [`${value}%`, 'Records']}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px' }}/>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Inner circle text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
            <span className="font-headline-lg text-headline-lg text-on-surface font-bold">151k</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Total</span>
          </div>
        </div>
      </div>

    </div>
  );
}
