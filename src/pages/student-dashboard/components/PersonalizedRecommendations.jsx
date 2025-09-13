import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PersonalizedRecommendations = ({ recommendations, onRecommendationClick }) => {
  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'resource': return 'BookOpen';
      case 'forum': return 'Users';
      case 'session': return 'Calendar';
      case 'exercise': return 'Activity';
      case 'meditation': return 'Brain';
      default: return 'Lightbulb';
    }
  };

  const getRecommendationColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-primary bg-primary/5';
      case 'medium': return 'border-secondary bg-secondary/5';
      default: return 'border-border bg-muted/30';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">Recommended</span>;
      case 'medium':
        return <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">Suggested</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading text-xl font-semibold text-text-primary flex items-center">
          <Icon name="Sparkles" size={20} className="mr-2 text-accent" />
          For You
        </h2>
        <Button variant="ghost" size="sm" iconName="RefreshCw">
          Refresh
        </Button>
      </div>
      <div className="space-y-4">
        {recommendations?.length > 0 ? (
          recommendations?.slice(0, 4)?.map((rec, index) => (
            <div 
              key={index}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-gentle cursor-pointer ${getRecommendationColor(rec?.priority)}`}
              onClick={() => onRecommendationClick(rec)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Icon name={getRecommendationIcon(rec?.type)} size={18} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-body font-medium text-sm text-text-primary">
                      {rec?.title}
                    </h3>
                    <p className="font-body text-xs text-text-secondary mt-1">
                      {rec?.category}
                    </p>
                  </div>
                </div>
                {getPriorityBadge(rec?.priority)}
              </div>
              
              <p className="font-body text-sm text-text-secondary breathing-space mb-3">
                {rec?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  {rec?.duration && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{rec?.duration}</span>
                    </div>
                  )}
                  {rec?.rating && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-accent" />
                      <span>{rec?.rating}</span>
                    </div>
                  )}
                </div>
                <Icon name="ArrowRight" size={14} className="text-text-secondary" />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Icon name="Compass" size={48} className="text-text-secondary mx-auto mb-4 opacity-50" />
            <p className="font-body text-text-secondary mb-2">
              Building your personalized recommendations
            </p>
            <p className="font-body text-sm text-text-secondary breathing-space">
              Use our services to get tailored suggestions for your wellness journey
            </p>
          </div>
        )}
      </div>
      {/* Personalization Notice */}
      <div className="mt-6 p-3 bg-accent/10 border border-accent/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={14} className="text-accent mt-0.5" />
          <div>
            <p className="font-body text-xs text-accent font-medium mb-1">
              Personalized for you
            </p>
            <p className="font-body text-xs text-text-secondary breathing-space">
              Recommendations are based on your interactions, preferences, and wellness goals while maintaining complete privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedRecommendations;