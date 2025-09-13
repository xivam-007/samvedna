import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const DemographicsBreakdown = ({ data, title }) => {
  const COLORS = [
    'var(--color-primary)',
    'var(--color-secondary)', 
    'var(--color-accent)',
    'var(--color-warning)',
    'var(--color-success)',
    'var(--color-error)'
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      return (
        <div className="bg-popover border border-border rounded-therapeutic p-3 shadow-therapeutic-lg">
          <p className="font-body text-sm text-text-primary">
            {data?.name}: {data?.value} ({((data?.value / data?.payload?.total) * 100)?.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            />
            <span className="font-body text-sm text-text-secondary">
              {entry?.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="PieChart" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          {title}
        </h3>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 space-y-3">
        {data?.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-therapeutic">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              />
              <span className="font-body text-sm text-text-primary">{item?.name}</span>
            </div>
            <div className="text-right">
              <span className="font-heading font-semibold text-sm text-text-primary">
                {item?.value?.toLocaleString('en-IN')}
              </span>
              <span className="font-body text-xs text-text-secondary ml-2">
                ({((item?.value / data?.reduce((sum, d) => sum + d?.value, 0)) * 100)?.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemographicsBreakdown;