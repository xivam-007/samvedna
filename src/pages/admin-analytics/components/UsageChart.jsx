import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const UsageChart = ({ data, type = 'bar', title, height = 300 }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-therapeutic p-3 shadow-therapeutic-lg">
          <p className="font-body text-sm text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="font-body text-sm text-text-secondary">
                {entry?.name}: {entry?.value?.toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <h3 className="font-heading font-semibold text-lg text-text-primary mb-6">
        {title}
      </h3>
      
      <div style={{ width: '100%', height: height }}>
        <ResponsiveContainer>
          {type === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                fontFamily="Source Sans 3"
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                fontFamily="Source Sans 3"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'var(--color-primary)', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                fontFamily="Source Sans 3"
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
                fontFamily="Source Sans 3"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UsageChart;