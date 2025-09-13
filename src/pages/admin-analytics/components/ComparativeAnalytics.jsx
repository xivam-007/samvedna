import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparativeAnalytics = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState('utilization');
  const [viewType, setViewType] = useState('line');

  const metrics = [
    { key: 'utilization', label: 'Service Utilization', icon: 'TrendingUp' },
    { key: 'satisfaction', label: 'Satisfaction Scores', icon: 'Heart' },
    { key: 'outcomes', label: 'Intervention Outcomes', icon: 'Target' },
    { key: 'engagement', label: 'Student Engagement', icon: 'Users' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-therapeutic p-3 shadow-therapeutic-lg">
          <p className="font-body text-sm text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="font-body text-sm text-text-secondary">{entry?.name}</span>
              </div>
              <span className="font-heading font-semibold text-sm text-text-primary">
                {entry?.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentData = data?.[selectedMetric] || [];

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Comparative Analytics
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'line' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('line')}
          >
            <Icon name="TrendingUp" size={14} className="mr-2" />
            Trend
          </Button>
          <Button
            variant={viewType === 'bar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('bar')}
          >
            <Icon name="BarChart3" size={14} className="mr-2" />
            Compare
          </Button>
        </div>
      </div>
      {/* Metric Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics?.map((metric) => (
          <button
            key={metric?.key}
            onClick={() => setSelectedMetric(metric?.key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-therapeutic text-sm font-body transition-all duration-200 ${
              selectedMetric === metric?.key
                ? 'bg-primary text-primary-foreground shadow-gentle'
                : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
            }`}
          >
            <Icon name={metric?.icon} size={14} />
            <span>{metric?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart */}
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          {viewType === 'line' ? (
            <LineChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="period" 
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
                dataKey="ourInstitution" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                name="Our Institution"
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="peerAverage" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Peer Average"
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 3 }}
              />
              <Line 
                type="monotone" 
                dataKey="nationalAverage" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                strokeDasharray="10 5"
                name="National Average"
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          ) : (
            <BarChart data={currentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="period" 
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
              <Bar dataKey="ourInstitution" fill="var(--color-primary)" name="Our Institution" radius={[2, 2, 0, 0]} />
              <Bar dataKey="peerAverage" fill="var(--color-secondary)" name="Peer Average" radius={[2, 2, 0, 0]} />
              <Bar dataKey="nationalAverage" fill="var(--color-accent)" name="National Average" radius={[2, 2, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Performance Summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-heading font-medium text-base text-text-primary mb-4">
          Performance Summary
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-therapeutic">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-primary" />
              <span className="font-body text-sm font-medium text-primary">Above Peer Average</span>
            </div>
            <div className="font-heading text-2xl font-semibold text-primary mb-1">
              {data?.summary?.abovePeerCount || 0}
            </div>
            <div className="font-body text-xs text-primary/80">metrics performing better</div>
          </div>
          
          <div className="p-4 bg-warning/5 border border-warning/20 rounded-therapeutic">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="AlertCircle" size={16} className="text-warning" />
              <span className="font-body text-sm font-medium text-warning">Needs Attention</span>
            </div>
            <div className="font-heading text-2xl font-semibold text-warning mb-1">
              {data?.summary?.needsAttentionCount || 0}
            </div>
            <div className="font-body text-xs text-warning/80">areas for improvement</div>
          </div>
          
          <div className="p-4 bg-success/5 border border-success/20 rounded-therapeutic">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Award" size={16} className="text-success" />
              <span className="font-body text-sm font-medium text-success">Top Performer</span>
            </div>
            <div className="font-heading text-2xl font-semibold text-success mb-1">
              {data?.summary?.topPerformerCount || 0}
            </div>
            <div className="font-body text-xs text-success/80">national top 10% metrics</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalytics;