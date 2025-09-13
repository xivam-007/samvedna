import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickResponseButtons = ({ onQuickResponse, disabled = false }) => {
  const quickResponses = [
    {
      id: 'academic-stress',
      text: 'Academic Stress',
      icon: 'BookOpen',
      message: "I\'m feeling overwhelmed with my studies and academic pressure. Can you help me?"
    },
    {
      id: 'anxiety',
      text: 'Feeling Anxious',
      icon: 'Heart',
      message: "I've been feeling anxious lately and it's affecting my daily life. What should I do?"
    },
    {
      id: 'social-isolation',
      text: 'Social Issues',
      icon: 'Users',
      message: "I\'m having trouble connecting with others and feel isolated. Can you suggest some ways to cope?"
    },
    {
      id: 'sleep-issues',
      text: 'Sleep Problems',
      icon: 'Moon',
      message: "I\'m having trouble sleeping and it\'s affecting my concentration. Any advice?"
    },
    {
      id: 'family-pressure',
      text: 'Family Pressure',
      icon: 'Home',
      message: "I\'m dealing with family expectations and pressure. How can I manage this stress?"
    },
    {
      id: 'career-confusion',
      text: 'Career Worries',
      icon: 'Briefcase',
      message: "I\'m confused about my career path and future. Can you help me think through this?"
    }
  ];

  return (
    <div className="bg-surface rounded-therapeutic p-4 mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="Zap" size={16} className="text-accent" />
        <h3 className="font-heading font-medium text-sm text-text-primary">
          Quick Start Topics
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {quickResponses?.map((response) => (
          <Button
            key={response?.id}
            variant="outline"
            size="sm"
            disabled={disabled}
            onClick={() => onQuickResponse(response?.message)}
            className="flex items-center space-x-2 justify-start h-auto py-3 px-3 text-left"
          >
            <Icon name={response?.icon} size={14} className="flex-shrink-0" />
            <span className="font-body text-xs">{response?.text}</span>
          </Button>
        ))}
      </div>
      <div className="mt-3 text-xs text-text-secondary font-body">
        Select a topic to start the conversation, or type your own message below.
      </div>
    </div>
  );
};

export default QuickResponseButtons;