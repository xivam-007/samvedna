import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = ({ metrics }) => {
  const getMetricIcon = (type) => {
    switch (type) {
      case 'users': return 'Users';
      case 'sessions': return 'MessageCircle';
      case 'crisis': return 'AlertTriangle';
      case 'satisfaction': return 'Heart';
      default: return 'BarChart3';
    }
  };

  const getMetricColor = (type) => {
    switch (type) {
      case 'users': return 'text-primary';
      case 'sessions': return 'text-secondary';
      case 'crisis': return 'text-error';
      case 'satisfaction': return 'text-success';
      default: return 'text-text-primary';
    }
  };

  const getMetricBg = (type) => {
    switch (type) {
      case 'users': return 'bg-primary/10';
      case 'sessions': return 'bg-secondary/10';
      case 'crisis': return 'bg-error/10';
      case 'satisfaction': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics?.map((metric, index) => (
        <div key={index} className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-therapeutic ${getMetricBg(metric?.type)} flex items-center justify-center`}>
              <Icon 
                name={getMetricIcon(metric?.type)} 
                size={24} 
                className={getMetricColor(metric?.type)} 
              />
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              metric?.trend > 0 ? 'bg-success/10 text-success' : 
              metric?.trend < 0 ? 'bg-error/10 text-error': 'bg-muted text-text-secondary'
            }`}>
              {metric?.trend > 0 ? '+' : ''}{metric?.trend}%
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-heading font-semibold text-2xl text-text-primary">
              {metric?.value?.toLocaleString('en-IN')}
            </h3>
            <p className="font-body text-sm text-text-secondary">
              {metric?.label}
            </p>
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon 
                name={metric?.trend > 0 ? 'TrendingUp' : metric?.trend < 0 ? 'TrendingDown' : 'Minus'} 
                size={12} 
              />
              <span>vs last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;