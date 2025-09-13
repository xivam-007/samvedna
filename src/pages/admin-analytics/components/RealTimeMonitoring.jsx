import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeMonitoring = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-success bg-success/10';
      case 'busy': return 'text-warning bg-warning/10';
      case 'offline': return 'text-text-secondary bg-muted';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getAlertLevel = (level) => {
    switch (level) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'warning': return 'text-warning bg-warning/10 border-warning/20';
      case 'info': return 'text-primary bg-primary/10 border-primary/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-success rounded-full animate-breathing"></div>
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Real-Time Monitoring
          </h3>
        </div>
        <div className="font-body text-sm text-text-secondary">
          Last updated: {currentTime?.toLocaleTimeString('en-IN')}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <div className="space-y-4">
          <h4 className="font-heading font-medium text-base text-text-primary mb-4">
            System Status
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-therapeutic">
              <div className="flex items-center space-x-3">
                <Icon name="Users" size={16} className="text-primary" />
                <span className="font-body text-sm text-text-primary">Active Users</span>
              </div>
              <span className="font-heading font-semibold text-sm text-text-primary">
                {data?.activeUsers?.toLocaleString('en-IN')}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-therapeutic">
              <div className="flex items-center space-x-3">
                <Icon name="MessageCircle" size={16} className="text-secondary" />
                <span className="font-body text-sm text-text-primary">Active Sessions</span>
              </div>
              <span className="font-heading font-semibold text-sm text-text-primary">
                {data?.activeSessions?.toLocaleString('en-IN')}
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-therapeutic">
              <div className="flex items-center space-x-3">
                <Icon name="AlertTriangle" size={16} className="text-error" />
                <span className="font-body text-sm text-text-primary">Crisis Alerts</span>
              </div>
              <span className="font-heading font-semibold text-sm text-error">
                {data?.crisisAlerts}
              </span>
            </div>
          </div>
        </div>

        {/* Counselor Availability */}
        <div className="space-y-4">
          <h4 className="font-heading font-medium text-base text-text-primary mb-4">
            Counselor Availability
          </h4>
          
          <div className="space-y-3">
            {data?.counselors?.map((counselor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-therapeutic">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(counselor?.status)?.split(' ')?.[1]}`}></div>
                  <div>
                    <div className="font-body text-sm text-text-primary">{counselor?.name}</div>
                    <div className="font-body text-xs text-text-secondary">{counselor?.specialization}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(counselor?.status)}`}>
                    {counselor?.status?.charAt(0)?.toUpperCase() + counselor?.status?.slice(1)}
                  </div>
                  <div className="font-body text-xs text-text-secondary mt-1">
                    {counselor?.currentLoad}/{counselor?.maxLoad} sessions
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Alerts */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-heading font-medium text-base text-text-primary mb-4">
          Recent Alerts
        </h4>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {data?.recentAlerts?.map((alert, index) => (
            <div key={index} className={`p-3 rounded-therapeutic border ${getAlertLevel(alert?.level)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <Icon 
                    name={alert?.level === 'critical' ? 'AlertTriangle' : alert?.level === 'warning' ? 'AlertCircle' : 'Info'} 
                    size={16} 
                    className="mt-0.5 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="font-body text-sm font-medium mb-1">{alert?.message}</div>
                    <div className="font-body text-xs opacity-80">{alert?.details}</div>
                  </div>
                </div>
                <div className="font-body text-xs opacity-60 flex-shrink-0 ml-3">
                  {alert?.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;