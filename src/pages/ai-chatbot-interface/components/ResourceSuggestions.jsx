import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResourceSuggestions = ({ suggestions, onResourceClick, onDismiss }) => {
  if (!suggestions || suggestions?.length === 0) return null;

  return (
    <div className="bg-surface border border-border rounded-therapeutic p-4 mb-4 animate-gentle-fade">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent" />
          <h3 className="font-heading font-medium text-sm text-text-primary">
            Helpful Resources
          </h3>
        </div>
        {onDismiss && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="h-6 w-6"
          >
            <Icon name="X" size={14} />
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {suggestions?.map((resource, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-card rounded-lg border border-border hover:shadow-gentle transition-all duration-200 cursor-pointer"
            onClick={() => onResourceClick?.(resource)}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              resource?.type === 'video' ? 'bg-destructive/10 text-destructive' :
              resource?.type === 'article' ? 'bg-primary/10 text-primary' :
              resource?.type === 'exercise'? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
            }`}>
              <Icon 
                name={
                  resource?.type === 'video' ? 'Play' :
                  resource?.type === 'article' ? 'FileText' :
                  resource?.type === 'exercise'? 'Activity' : 'BookOpen'
                } 
                size={16} 
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-body font-medium text-sm text-text-primary mb-1">
                {resource?.title}
              </h4>
              <p className="font-body text-xs text-text-secondary breathing-space mb-2">
                {resource?.description}
              </p>
              
              <div className="flex items-center space-x-3 text-xs text-text-secondary">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={10} />
                  <span>{resource?.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={10} />
                  <span>{resource?.rating}/5</span>
                </div>
                {resource?.language && (
                  <div className="flex items-center space-x-1">
                    <Icon name="Globe" size={10} />
                    <span>{resource?.language}</span>
                  </div>
                )}
              </div>
            </div>

            <Icon name="ExternalLink" size={14} className="text-text-secondary flex-shrink-0" />
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-border">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onResourceClick?.({ type: 'browse-all' })}
          className="w-full justify-center"
        >
          <Icon name="Search" size={14} className="mr-2" />
          Browse All Resources
        </Button>
      </div>
    </div>
  );
};

export default ResourceSuggestions;