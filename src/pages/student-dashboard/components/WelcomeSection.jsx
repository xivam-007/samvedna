import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ userName = "Student", lastLogin }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatLastLogin = (date) => {
    if (!date) return "Welcome back!";
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Active now";
    if (diffInHours < 24) return `Last seen ${diffInHours}h ago`;
    return `Last seen ${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-therapeutic p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-semibold mb-2">
            {getCurrentGreeting()}, {userName}! 👋
          </h1>
          <p className="font-body text-primary-foreground/90 breathing-space">
            Your mental wellness journey continues here. Take a moment to check in with yourself today.
          </p>
          <div className="flex items-center space-x-2 mt-3 text-sm text-primary-foreground/80">
            <Icon name="Clock" size={14} />
            <span className="font-body">{formatLastLogin(lastLogin)}</span>
          </div>
        </div>
        <div className="hidden md:block">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Heart" size={32} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;