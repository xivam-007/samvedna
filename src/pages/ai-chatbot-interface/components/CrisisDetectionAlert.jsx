import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CrisisDetectionAlert = ({ isVisible, severity = 'medium', onEscalate, onDismiss }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isVisible) return null;

  const getSeverityConfig = () => {
    switch (severity) {
      case 'high':
        return {
          bgColor: 'bg-destructive',
          textColor: 'text-destructive-foreground',
          borderColor: 'border-destructive',
          icon: 'AlertTriangle',
          title: 'Crisis Support Needed',
          message: 'I notice you might be going through a difficult time. Immediate support is available.',
          animation: 'animate-pulse'
        };
      case 'medium':
        return {
          bgColor: 'bg-warning',
          textColor: 'text-warning-foreground',
          borderColor: 'border-warning',
          icon: 'Heart',
          title: 'Support Available',
          message: 'It sounds like you could benefit from additional support. Would you like to connect with a counselor?',
          animation: 'animate-breathing'
        };
      default:
        return {
          bgColor: 'bg-accent',
          textColor: 'text-accent-foreground',
          borderColor: 'border-accent',
          icon: 'MessageCircle',
          title: 'Additional Resources',
          message: 'I can connect you with helpful resources or a counselor if you\'d like.',
          animation: ''
        };
    }
  };

  const config = getSeverityConfig();

  const supportOptions = [
    {
      icon: 'Phone',
      label: 'Crisis Helpline',
      description: '24/7 immediate support',
      action: () => onEscalate?.('crisis-hotline'),
      variant: 'destructive'
    },
    {
      icon: 'Calendar',
      label: 'Book Counselor',
      description: 'Schedule professional session',
      action: () => onEscalate?.('counselor-booking'),
      variant: 'primary'
    },
    {
      icon: 'Users',
      label: 'Peer Support',
      description: 'Connect with community',
      action: () => onEscalate?.('peer-forum'),
      variant: 'secondary'
    },
    {
      icon: 'BookOpen',
      label: 'Self-Help Resources',
      description: 'Coping strategies & guides',
      action: () => onEscalate?.('resources'),
      variant: 'outline'
    }
  ];

  return (
    <div className={`mb-4 rounded-therapeutic border ${config?.borderColor} ${config?.bgColor} ${config?.textColor} ${config?.animation} animate-gentle-fade`}>
      <div className="p-4">
        <div className="flex items-start space-x-3">
          <Icon name={config?.icon} size={20} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-sm mb-1">
              {config?.title}
            </h3>
            <p className="font-body text-sm opacity-90 breathing-space mb-3">
              {config?.message}
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEscalate?.('immediate-help')}
                className="crisis-accessible"
              >
                <Icon name="Heart" size={14} className="mr-1" />
                Get Help Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-white/10 border-white/20 text-current hover:bg-white/20"
              >
                <Icon name="MoreHorizontal" size={14} className="mr-1" />
                More Options
              </Button>
            </div>

            {/* Expanded Options */}
            {isExpanded && (
              <div className="space-y-2 animate-gentle-fade">
                {supportOptions?.map((option, index) => (
                  <button
                    key={index}
                    onClick={option?.action}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 crisis-accessible text-left"
                  >
                    <Icon name={option?.icon} size={16} className="flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-body font-medium text-sm">
                        {option?.label}
                      </div>
                      <div className="font-body text-xs opacity-80">
                        {option?.description}
                      </div>
                    </div>
                    <Icon name="ArrowRight" size={14} className="opacity-60" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dismiss Button */}
          {onDismiss && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onDismiss}
              className="flex-shrink-0 h-6 w-6 text-current hover:bg-white/20"
            >
              <Icon name="X" size={14} />
            </Button>
          )}
        </div>
      </div>
      {/* Privacy Assurance */}
      <div className="px-4 pb-4 border-t border-white/20">
        <div className="flex items-center space-x-2 text-xs opacity-80 mt-3">
          <Icon name="Shield" size={12} />
          <span className="font-body">
            All conversations are confidential and secure
          </span>
        </div>
      </div>
    </div>
  );
};

export default CrisisDetectionAlert;