import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const CrisisEscalation = ({ 
  isVisible = false, 
  severity = 'low', // 'low', 'medium', 'high', 'critical'
  onEscalate,
  onDismiss 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pulseIntensity, setPulseIntensity] = useState('animate-breathing');

  useEffect(() => {
    // Adjust animation intensity based on severity
    switch (severity) {
      case 'critical': setPulseIntensity('animate-pulse');
        setIsExpanded(true);
        break;
      case 'high': setPulseIntensity('animate-breathing');
        break;
      case 'medium': setPulseIntensity('animate-soft-bounce');
        break;
      default:
        setPulseIntensity('');
    }
  }, [severity]);

  const getSeverityConfig = () => {
    switch (severity) {
      case 'critical':
        return {
          bgColor: 'bg-error',
          textColor: 'text-error-foreground',
          borderColor: 'border-error',
          icon: 'AlertTriangle',
          title: 'Crisis Support Available',
          message: 'Immediate help is available. You are not alone.',
          ctaText: 'Get Help Now'
        };
      case 'high':
        return {
          bgColor: 'bg-warning',
          textColor: 'text-warning-foreground',
          borderColor: 'border-warning',
          icon: 'Heart',
          title: 'Support Available',
          message: 'We\'re here to help when you need us.',
          ctaText: 'Connect Now'
        };
      case 'medium':
        return {
          bgColor: 'bg-accent',
          textColor: 'text-accent-foreground',
          borderColor: 'border-accent',
          icon: 'MessageCircle',
          title: 'Need Someone to Talk?',
          message: 'Professional support is just a click away.',
          ctaText: 'Start Chat'
        };
      default:
        return {
          bgColor: 'bg-primary',
          textColor: 'text-primary-foreground',
          borderColor: 'border-primary',
          icon: 'Phone',
          title: 'Support Available',
          message: 'Professional counselors are available 24/7.',
          ctaText: 'Contact Support'
        };
    }
  };

  const config = getSeverityConfig();

  const supportOptions = [
    {
      icon: 'Phone',
      label: 'Crisis Hotline',
      description: '24/7 immediate support',
      action: () => onEscalate?.('hotline')
    },
    {
      icon: 'MessageCircle',
      label: 'Chat Support',
      description: 'Text-based counseling',
      action: () => onEscalate?.('chat')
    },
    {
      icon: 'Calendar',
      label: 'Book Counselor',
      description: 'Schedule professional session',
      action: () => onEscalate?.('booking')
    },
    {
      icon: 'Users',
      label: 'Peer Support',
      description: 'Connect with community',
      action: () => onEscalate?.('peer')
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-crisis max-w-sm animate-gentle-fade">
      <div className={`${config?.bgColor} ${config?.textColor} rounded-therapeutic shadow-therapeutic-lg border ${config?.borderColor} ${pulseIntensity}`}>
        {/* Main Crisis Banner */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Icon name={config?.icon} size={20} className="mt-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-sm mb-1">
                {config?.title}
              </h3>
              <p className="font-body text-sm opacity-90 breathing-space">
                {config?.message}
              </p>
            </div>
            <div className="flex-shrink-0 flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsExpanded(!isExpanded)}
                className={`h-6 w-6 ${config?.textColor} hover:bg-white/20`}
              >
                <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size={14} />
              </Button>
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onDismiss}
                  className={`h-6 w-6 ${config?.textColor} hover:bg-white/20`}
                >
                  <Icon name="X" size={14} />
                </Button>
              )}
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mt-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEscalate?.('primary')}
              className="w-full crisis-accessible font-medium"
            >
              <Icon name="Heart" size={16} className="mr-2" />
              {config?.ctaText}
            </Button>
          </div>
        </div>

        {/* Expanded Support Options */}
        {isExpanded && (
          <div className="border-t border-white/20 bg-white/10 rounded-b-therapeutic animate-gentle-fade">
            <div className="p-4 space-y-3">
              <h4 className="font-heading font-medium text-sm mb-3">
                Choose Your Support:
              </h4>
              
              {supportOptions?.map((option, index) => (
                <button
                  key={index}
                  onClick={option?.action}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 crisis-accessible text-left"
                >
                  <div className="flex-shrink-0">
                    <Icon name={option?.icon} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-body font-medium text-sm">
                      {option?.label}
                    </div>
                    <div className="font-body text-xs opacity-80 mt-0.5">
                      {option?.description}
                    </div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="opacity-60" />
                </button>
              ))}
            </div>

            {/* Privacy Assurance */}
            <div className="px-4 pb-4">
              <div className="flex items-center space-x-2 text-xs opacity-80">
                <Icon name="Shield" size={12} />
                <span className="font-body">
                  Confidential & secure • Available 24/7
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Floating Quick Actions */}
      {severity === 'critical' && (
        <div className="mt-3 flex space-x-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onEscalate?.('emergency')}
            className="flex-1 crisis-accessible animate-pulse"
          >
            <Icon name="Phone" size={16} className="mr-2" />
            Emergency
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEscalate?.('chat')}
            className="flex-1 crisis-accessible bg-white border-white text-gray-800 hover:bg-gray-50"
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Chat Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default CrisisEscalation;