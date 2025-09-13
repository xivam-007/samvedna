import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WellnessTracker = ({ moodData, upcomingAppointments, progressStats }) => {
  const moodColors = {
    excellent: 'text-success',
    good: 'text-secondary',
    okay: 'text-accent',
    difficult: 'text-warning',
    struggling: 'text-error'
  };

  const moodIcons = {
    excellent: 'Smile',
    good: 'ThumbsUp',
    okay: 'Meh',
    difficult: 'Frown',
    struggling: 'AlertCircle'
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-semibold text-text-primary">
          Wellness Tracker
        </h2>
        <Button variant="ghost" size="sm" iconName="TrendingUp">
          View Details
        </Button>
      </div>
      {/* Recent Mood Check-ins */}
      <div className="mb-6">
        <h3 className="font-heading font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Heart" size={16} className="mr-2 text-primary" />
          Recent Mood Check-ins
        </h3>
        <div className="space-y-3">
          {moodData?.slice(0, 3)?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={moodIcons?.[entry?.mood]} 
                  size={18} 
                  className={moodColors?.[entry?.mood]} 
                />
                <div>
                  <span className="font-body text-sm font-medium text-text-primary capitalize">
                    {entry?.mood}
                  </span>
                  <p className="font-body text-xs text-text-secondary">
                    {formatDate(entry?.date)}
                  </p>
                </div>
              </div>
              {entry?.note && (
                <Icon name="MessageSquare" size={14} className="text-text-secondary" />
              )}
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="w-full mt-3" iconName="Plus">
          Quick Mood Check-in
        </Button>
      </div>
      {/* Upcoming Appointments */}
      <div className="mb-6">
        <h3 className="font-heading font-medium text-text-primary mb-3 flex items-center">
          <Icon name="Calendar" size={16} className="mr-2 text-secondary" />
          Upcoming Sessions
        </h3>
        {upcomingAppointments?.length > 0 ? (
          <div className="space-y-2">
            {upcomingAppointments?.slice(0, 2)?.map((appointment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
                <div>
                  <p className="font-body text-sm font-medium text-text-primary">
                    {appointment?.type}
                  </p>
                  <p className="font-body text-xs text-text-secondary">
                    {formatDate(appointment?.date)} • {appointment?.counselor}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-secondary" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <Icon name="Calendar" size={32} className="text-text-secondary mx-auto mb-2" />
            <p className="font-body text-sm text-text-secondary">No upcoming sessions</p>
            <Button variant="outline" size="sm" className="mt-2" iconName="Plus">
              Book Session
            </Button>
          </div>
        )}
      </div>
      {/* Progress Stats */}
      <div>
        <h3 className="font-heading font-medium text-text-primary mb-3 flex items-center">
          <Icon name="BarChart3" size={16} className="mr-2 text-accent" />
          This Week's Progress
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="font-heading text-2xl font-bold text-primary mb-1">
              {progressStats?.checkIns}
            </div>
            <div className="font-body text-xs text-text-secondary">Check-ins</div>
          </div>
          <div className="text-center p-3 bg-secondary/10 rounded-lg">
            <div className="font-heading text-2xl font-bold text-secondary mb-1">
              {progressStats?.resourcesViewed}
            </div>
            <div className="font-body text-xs text-text-secondary">Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessTracker;