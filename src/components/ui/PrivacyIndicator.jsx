import React, { useState } from 'react';
import Icon from '../AppIcon';

const PrivacyIndicator = ({ 
  level = 'secure', // 'anonymous', 'secure', 'clinical', 'admin'
  isVisible = true,
  position = 'top-right', // 'top-right', 'bottom-left', 'inline'
  showDetails = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPrivacyConfig = () => {
    switch (level) {
      case 'anonymous':
        return {
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20',
          icon: 'EyeOff',
          status: 'Anonymous',
          description: 'Your identity is completely private',
          features: [
            'No personal data collected',
            'Anonymous chat sessions',
            'Temporary session storage'
          ]
        };
      case 'clinical':
        return {
          color: 'text-secondary',
          bgColor: 'bg-secondary/10',
          borderColor: 'border-secondary/20',
          icon: 'ShieldCheck',
          status: 'Clinical Grade',
          description: 'HIPAA compliant secure environment',
          features: [
            'End-to-end encryption',
            'HIPAA compliant storage',
            'Licensed counselor access',
            'Audit trail maintained'
          ]
        };
      case 'admin':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          icon: 'Database',
          status: 'Administrative',
          description: 'Institutional data access level',
          features: [
            'Aggregated data only',
            'No personal identifiers',
            'Institutional compliance',
            'Policy-level insights'
          ]
        };
      default: // secure
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          icon: 'Lock',
          status: 'Secure Session',
          description: 'Your data is encrypted and protected',
          features: [
            'End-to-end encryption',
            'Secure data transmission',
            'Privacy controls active',
            'Session monitoring'
          ]
        };
    }
  };

  const config = getPrivacyConfig();

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'fixed bottom-4 left-4 z-tooltip';
      case 'inline':
        return 'relative';
      default: // top-right
        return 'fixed top-20 right-4 z-tooltip';
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`${getPositionClasses()} max-w-xs`}>
      <div 
        className={`${config?.bgColor} ${config?.borderColor} border rounded-therapeutic p-3 cursor-pointer transition-all duration-200 hover:shadow-gentle ${
          position === 'inline' ? 'w-full' : ''
        }`}
        onClick={() => showDetails && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 ${config?.color?.replace('text-', 'bg-')} rounded-full animate-breathing`}></div>
          <Icon name={config?.icon} size={14} className={config?.color} />
          <span className={`text-xs font-body font-medium ${config?.color}`}>
            {config?.status}
          </span>
          {showDetails && (
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={12} 
              className={config?.color} 
            />
          )}
        </div>

        {/* Always show description for inline */}
        {(position === 'inline' || isExpanded) && (
          <div className="mt-2 animate-gentle-fade">
            <p className={`text-xs ${config?.color} opacity-80 breathing-space`}>
              {config?.description}
            </p>
            
            {showDetails && isExpanded && (
              <div className="mt-3 space-y-2">
                {config?.features?.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={10} className={config?.color} />
                    <span className={`text-xs ${config?.color} opacity-70`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Privacy Controls (for clinical and admin levels) */}
      {(level === 'clinical' || level === 'admin') && isExpanded && (
        <div className="mt-2 space-y-2 animate-gentle-fade">
          <button className="w-full flex items-center justify-between p-2 bg-card border border-border rounded-lg text-xs font-body text-text-secondary hover:bg-muted transition-colors">
            <span>Data sharing preferences</span>
            <Icon name="Settings" size={12} />
          </button>
          <button className="w-full flex items-center justify-between p-2 bg-card border border-border rounded-lg text-xs font-body text-text-secondary hover:bg-muted transition-colors">
            <span>Privacy policy</span>
            <Icon name="ExternalLink" size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default PrivacyIndicator;