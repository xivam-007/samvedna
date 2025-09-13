import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessToolbar = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'resources',
      label: 'Resources',
      icon: 'BookOpen',
      description: 'Psychoeducational content',
      color: 'text-primary'
    },
    {
      id: 'screening',
      label: 'Self-Assessment',
      icon: 'ClipboardCheck',
      description: 'Mental health screening',
      color: 'text-secondary'
    },
    {
      id: 'helpline',
      label: 'Helpline',
      icon: 'Phone',
      description: '24/7 crisis support',
      color: 'text-error'
    },
    {
      id: 'meditation',
      label: 'Meditation',
      icon: 'Brain',
      description: 'Guided relaxation',
      color: 'text-accent'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <h2 className="font-heading text-xl font-semibold text-text-primary mb-4">
        Quick Access
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onActionClick(action?.id)}
            className="flex flex-col items-center p-4 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-200 crisis-accessible group"
          >
            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Icon name={action?.icon} size={20} className={action?.color} />
            </div>
            <span className="font-body font-medium text-sm text-text-primary mb-1">
              {action?.label}
            </span>
            <span className="font-body text-xs text-text-secondary text-center">
              {action?.description}
            </span>
          </button>
        ))}
      </div>
      {/* Emergency Contact */}
      <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center">
              <Icon name="AlertTriangle" size={16} className="text-error" />
            </div>
            <div>
              <p className="font-body font-medium text-sm text-text-primary">
                Need immediate help?
              </p>
              <p className="font-body text-xs text-text-secondary">
                Crisis support available 24/7
              </p>
            </div>
          </div>
          <Button 
            variant="destructive" 
            size="sm"
            className="crisis-accessible animate-breathing"
            iconName="Phone"
          >
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessToolbar;