import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  route, 
  color = "primary", 
  isUrgent = false,
  badge = null 
}) => {
  const navigate = useNavigate();

  const getColorClasses = () => {
    switch (color) {
      case 'secondary':
        return {
          bg: 'bg-secondary/10',
          border: 'border-secondary/20',
          icon: 'text-secondary',
          hover: 'hover:bg-secondary/15'
        };
      case 'accent':
        return {
          bg: 'bg-accent/10',
          border: 'border-accent/20',
          icon: 'text-accent',
          hover: 'hover:bg-accent/15'
        };
      case 'error':
        return {
          bg: 'bg-error/10',
          border: 'border-error/20',
          icon: 'text-error',
          hover: 'hover:bg-error/15'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          icon: 'text-primary',
          hover: 'hover:bg-primary/15'
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div 
      className={`${colorClasses?.bg} ${colorClasses?.border} ${colorClasses?.hover} border rounded-therapeutic p-6 transition-all duration-200 cursor-pointer therapeutic-shadow hover:therapeutic-shadow-lg ${
        isUrgent ? 'animate-breathing' : ''
      }`}
      onClick={() => navigate(route)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${colorClasses?.bg} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses?.icon} />
        </div>
        {badge && (
          <span className="bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
        {title}
      </h3>
      <p className="font-body text-text-secondary text-sm breathing-space mb-4">
        {description}
      </p>
      <Button
        variant={isUrgent ? "destructive" : "outline"}
        size="sm"
        className="w-full crisis-accessible"
        iconName="ArrowRight"
        iconPosition="right"
      >
        {isUrgent ? "Get Help Now" : "Access Service"}
      </Button>
    </div>
  );
};

export default ServiceCard;