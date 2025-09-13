import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CounselorAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('sessions');

  const sessionData = [
    { month: 'Aug', individual: 12, group: 8, crisis: 2, total: 22 },
    { month: 'Sep', individual: 15, group: 10, crisis: 3, total: 28 },
    { month: 'Oct', individual: 18, group: 12, crisis: 1, total: 31 },
    { month: 'Nov', individual: 20, group: 14, crisis: 4, total: 38 },
    { month: 'Dec', individual: 16, group: 11, crisis: 2, total: 29 },
    { month: 'Jan', individual: 22, group: 15, crisis: 3, total: 40 }
  ];

  const outcomeData = [
    { week: 'Week 1', improved: 8, stable: 12, monitoring: 3 },
    { week: 'Week 2', improved: 10, stable: 14, monitoring: 2 },
    { week: 'Week 3', improved: 12, stable: 11, monitoring: 4 },
    { week: 'Week 4', improved: 15, stable: 13, monitoring: 2 }
  ];

  const concernsData = [
    { name: 'Anxiety', value: 35, color: '#EF4444' },
    { name: 'Depression', value: 28, color: '#F59E0B' },
    { name: 'Academic Stress', value: 22, color: '#2563EB' },
    { name: 'Social Issues', value: 10, color: '#059669' },
    { name: 'Other', value: 5, color: '#6B7280' }
  ];

  const keyMetrics = [
    {
      id: 'total_sessions',
      label: 'Total Sessions',
      value: 156,
      change: '+12%',
      trend: 'up',
      icon: 'Calendar',
      color: 'text-primary'
    },
    {
      id: 'active_cases',
      label: 'Active Cases',
      value: 24,
      change: '+3',
      trend: 'up',
      icon: 'Users',
      color: 'text-success'
    },
    {
      id: 'avg_improvement',
      label: 'Avg. Improvement',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: 'TrendingUp',
      color: 'text-success'
    },
    {
      id: 'crisis_interventions',
      label: 'Crisis Interventions',
      value: 8,
      change: '-2',
      trend: 'down',
      icon: 'AlertTriangle',
      color: 'text-warning'
    }
  ];

  const recentAchievements = [
    {
      id: 1,
      title: "High Success Rate",
      description: "Achieved 85% positive outcome rate this month",
      date: "2025-01-08",
      type: "milestone"
    },
    {
      id: 2,
      title: "Crisis Prevention",
      description: "Successfully prevented 3 crisis escalations through early intervention",
      date: "2025-01-06",
      type: "achievement"
    },
    {
      id: 3,
      title: "Student Feedback",
      description: "Received 4.9/5 average rating from student evaluations",
      date: "2025-01-05",
      type: "feedback"
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-error';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Performance Analytics
            </h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Track your counseling effectiveness and student outcomes
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {keyMetrics?.map((metric) => (
            <div key={metric?.id} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <Icon name={metric?.icon} size={20} className={metric?.color} />
                <div className={`flex items-center space-x-1 text-xs font-medium ${getTrendColor(metric?.trend)}`}>
                  <Icon name={getTrendIcon(metric?.trend)} size={12} />
                  <span>{metric?.change}</span>
                </div>
              </div>
              <div className="text-2xl font-heading font-bold text-text-primary mb-1">
                {metric?.value}
              </div>
              <div className="text-sm font-body text-text-secondary">
                {metric?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Analytics */}
        <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Session Analytics
            </h3>
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              <Button
                variant={selectedMetric === 'sessions' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedMetric('sessions')}
              >
                Sessions
              </Button>
              <Button
                variant={selectedMetric === 'outcomes' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedMetric('outcomes')}
              >
                Outcomes
              </Button>
            </div>
          </div>

          <div className="h-64">
            {selectedMetric === 'sessions' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sessionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--color-text-secondary)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-text-secondary)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="individual" fill="var(--color-primary)" name="Individual" />
                  <Bar dataKey="group" fill="var(--color-secondary)" name="Group" />
                  <Bar dataKey="crisis" fill="var(--color-error)" name="Crisis" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={outcomeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="week" 
                    stroke="var(--color-text-secondary)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="var(--color-text-secondary)"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="improved" 
                    stroke="var(--color-success)" 
                    strokeWidth={2}
                    name="Improved"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stable" 
                    stroke="var(--color-primary)" 
                    strokeWidth={2}
                    name="Stable"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="monitoring" 
                    stroke="var(--color-warning)" 
                    strokeWidth={2}
                    name="Monitoring"
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Student Concerns Distribution */}
        <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic p-6">
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
            Primary Concerns Distribution
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={concernsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {concernsData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {concernsData?.map((concern, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: concern?.color }}
                ></div>
                <span className="text-sm font-body text-text-secondary">
                  {concern?.name} ({concern?.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Recent Achievements & Milestones
        </h3>
        
        <div className="space-y-3">
          {recentAchievements?.map((achievement) => (
            <div key={achievement?.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                achievement?.type === 'milestone' ? 'bg-success/10' :
                achievement?.type === 'achievement'? 'bg-primary/10' : 'bg-accent/10'
              }`}>
                <Icon 
                  name={
                    achievement?.type === 'milestone' ? 'Award' :
                    achievement?.type === 'achievement'? 'Star' : 'MessageSquare'
                  }
                  size={16} 
                  className={
                    achievement?.type === 'milestone' ? 'text-success' :
                    achievement?.type === 'achievement'? 'text-primary' : 'text-accent'
                  }
                />
              </div>
              
              <div className="flex-1">
                <h4 className="font-heading font-medium text-sm text-text-primary mb-1">
                  {achievement?.title}
                </h4>
                <p className="text-sm font-body text-text-secondary breathing-space">
                  {achievement?.description}
                </p>
                <span className="text-xs font-body text-text-secondary">
                  {new Date(achievement.date)?.toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounselorAnalytics;