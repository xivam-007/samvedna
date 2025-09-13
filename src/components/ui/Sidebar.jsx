import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isPrivacyVisible, setIsPrivacyVisible] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      path: '/student-dashboard', 
      label: 'Dashboard', 
      icon: 'Home',
      description: 'Your personal wellness hub'
    },
    { 
      path: '/ai-chatbot-interface', 
      label: 'AI Support', 
      icon: 'MessageCircle',
      description: 'Chat with our AI counselor'
    },
    { 
      path: '/counselor-booking', 
      label: 'Book Counselor', 
      icon: 'Calendar',
      description: 'Schedule professional sessions'
    },
    { 
      path: '/peer-support-forum', 
      label: 'Peer Forum', 
      icon: 'Users',
      description: 'Connect with community'
    },
  ];

  const professionalItems = [
    { 
      path: '/counselor-dashboard', 
      label: 'Counselor Portal', 
      icon: 'UserCheck',
      description: 'Professional workspace'
    },
    { 
      path: '/admin-analytics', 
      label: 'Analytics', 
      icon: 'BarChart3',
      description: 'Institutional insights'
    },
  ];

  const isActive = (path) => location?.pathname === path;

  const Logo = () => (
    <div className={`flex items-center transition-all duration-300 ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
      <div className="w-10 h-10 rounded-lg cultural-warmth flex items-center justify-center flex-shrink-0">
        <Icon name="Brain" size={24} color="white" strokeWidth={2} />
      </div>
      {!isCollapsed && (
        <div className="flex flex-col animate-gentle-fade">
          <span className="font-heading font-semibold text-lg text-text-primary">
            MindBridge
          </span>
          <span className="font-caption text-xs text-text-secondary -mt-1">
            Mental Health Support
          </span>
        </div>
      )}
    </div>
  );

  const PrivacyIndicator = () => (
    <div className={`transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
      <div 
        className={`bg-success/10 border border-success/20 rounded-therapeutic p-3 cursor-pointer transition-all duration-200 hover:bg-success/15 ${
          isCollapsed ? 'flex justify-center' : ''
        }`}
        onClick={() => setIsPrivacyVisible(!isPrivacyVisible)}
      >
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-breathing"></div>
          {!isCollapsed && (
            <>
              <span className="text-xs font-body text-success font-medium">Secure Session</span>
              <Icon name={isPrivacyVisible ? 'ChevronUp' : 'ChevronDown'} size={14} color="var(--color-success)" />
            </>
          )}
        </div>
        
        {!isCollapsed && isPrivacyVisible && (
          <div className="mt-3 pt-3 border-t border-success/20 animate-gentle-fade">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Shield" size={12} color="var(--color-success)" />
              <span className="text-xs text-success">End-to-end encrypted</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Lock" size={12} color="var(--color-success)" />
              <span className="text-xs text-success">HIPAA compliant</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <aside className={`fixed left-0 top-0 h-full bg-card border-r border-border z-navigation transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`flex items-center justify-between h-16 border-b border-border transition-all duration-300 ${
            isCollapsed ? 'px-2' : 'px-4'
          }`}>
            <Logo />
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="flex-shrink-0"
              >
                <Icon name="PanelLeftClose" size={18} />
              </Button>
            )}
          </div>

          {/* Privacy Indicator */}
          <div className="py-4">
            <PrivacyIndicator />
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className={`space-y-1 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
              {/* Student Navigation */}
              {!isCollapsed && (
                <div className="mb-4">
                  <h3 className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider mb-2">
                    Support Services
                  </h3>
                </div>
              )}
              
              {navigationItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`group flex items-center rounded-therapeutic transition-all duration-200 crisis-accessible ${
                    isCollapsed ? 'p-3 justify-center' : 'p-3 space-x-3'
                  } ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-gentle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                  title={isCollapsed ? item?.label : ''}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className="flex-shrink-0"
                  />
                  {!isCollapsed && (
                    <div className="flex-1 animate-gentle-fade">
                      <div className="font-body font-medium text-sm">{item?.label}</div>
                      <div className={`text-xs mt-0.5 ${
                        isActive(item?.path) ? 'text-primary-foreground/80' : 'text-text-secondary'
                      }`}>
                        {item?.description}
                      </div>
                    </div>
                  )}
                </a>
              ))}

              {/* Professional Navigation */}
              {!isCollapsed && (
                <div className="mt-8 mb-4">
                  <h3 className="text-xs font-heading font-medium text-text-secondary uppercase tracking-wider mb-2">
                    Professional Tools
                  </h3>
                </div>
              )}
              
              {professionalItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`group flex items-center rounded-therapeutic transition-all duration-200 crisis-accessible ${
                    isCollapsed ? 'p-3 justify-center' : 'p-3 space-x-3'
                  } ${
                    isActive(item?.path)
                      ? 'bg-secondary text-secondary-foreground shadow-gentle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                  title={isCollapsed ? item?.label : ''}
                >
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className="flex-shrink-0"
                  />
                  {!isCollapsed && (
                    <div className="flex-1 animate-gentle-fade">
                      <div className="font-body font-medium text-sm">{item?.label}</div>
                      <div className={`text-xs mt-0.5 ${
                        isActive(item?.path) ? 'text-secondary-foreground/80' : 'text-text-secondary'
                      }`}>
                        {item?.description}
                      </div>
                    </div>
                  )}
                </a>
              ))}
            </div>
          </nav>

          {/* Crisis Support */}
          <div className={`border-t border-border p-4 transition-all duration-300 ${isCollapsed ? 'px-2' : ''}`}>
            <Button
              variant="destructive"
              className={`w-full crisis-accessible animate-breathing ${
                isCollapsed ? 'px-0' : 'justify-start space-x-2'
              }`}
            >
              <Icon name="Phone" size={18} />
              {!isCollapsed && <span className="font-medium">Crisis Support</span>}
            </Button>
          </div>

          {/* Collapse Toggle (when collapsed) */}
          {isCollapsed && (
            <div className="border-t border-border p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="w-full"
              >
                <Icon name="PanelLeftOpen" size={18} />
              </Button>
            </div>
          )}
        </div>
      </aside>
      {/* Collapsed sidebar tooltip overlay */}
      {isCollapsed && (
        <style jsx>{`
          .group:hover::after {
            content: attr(title);
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            margin-left: 8px;
            padding: 8px 12px;
            background: var(--color-popover);
            border: 1px solid var(--color-border);
            border-radius: 6px;
            font-size: 12px;
            white-space: nowrap;
            z-index: 1000;
            box-shadow: var(--shadow-therapeutic);
          }
        `}</style>
      )}
    </>
  );
};

export default Sidebar;