import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities, onViewAll }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'forum': return 'MessageSquare';
      case 'resource': return 'BookOpen';
      case 'session': return 'Calendar';
      case 'mood': return 'Heart';
      case 'assessment': return 'ClipboardCheck';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'forum': return 'text-primary';
      case 'resource': return 'text-secondary';
      case 'session': return 'text-accent';
      case 'mood': return 'text-success';
      case 'assessment': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-semibold text-text-primary">
          Recent Activity
        </h2>
        <Button variant="ghost" size="sm" onClick={onViewAll} iconName="ExternalLink">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.length > 0 ? (
          activities?.slice(0, 5)?.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={14} 
                  className={getActivityColor(activity?.type)} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm text-text-primary breathing-space">
                  {activity?.description}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="font-body text-xs text-text-secondary">
                    {formatTimeAgo(activity?.timestamp)}
                  </span>
                  {activity?.isPrivate && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Lock" size={10} className="text-text-secondary" />
                      <span className="font-body text-xs text-text-secondary">Private</span>
                    </div>
                  )}
                </div>
              </div>
              {activity?.hasDetails && (
                <Icon name="ChevronRight" size={14} className="text-text-secondary" />
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Activity" size={48} className="text-text-secondary mx-auto mb-4 opacity-50" />
            <p className="font-body text-text-secondary mb-4">
              No recent activity to show
            </p>
            <p className="font-body text-sm text-text-secondary breathing-space">
              Start your wellness journey by exploring our services above
            </p>
          </div>
        )}
      </div>
      {/* Privacy Notice */}
      <div className="mt-6 p-3 bg-success/10 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={14} className="text-success" />
          <span className="font-body text-xs text-success font-medium">
            Your activity is private and secure
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;