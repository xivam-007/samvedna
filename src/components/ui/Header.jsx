import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ isCollapsed = false, onToggleSidebar }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/student-dashboard', label: 'Dashboard', icon: 'Home' },
    { path: '/ai-chatbot-interface', label: 'AI Support', icon: 'MessageCircle' },
    { path: '/counselor-booking', label: 'Book Counselor', icon: 'Calendar' },
    { path: '/peer-support-forum', label: 'Peer Forum', icon: 'Users' },
    { path: '/resources', label: 'Resources', icon: 'Users' },
  ];

  const secondaryItems = [
    { path: '/counselor-dashboard', label: 'Counselor Portal', icon: 'UserCheck' },
    { path: '/admin-analytics', label: 'Analytics', icon: 'BarChart3' },
  ];

  const isActive = (path) => location?.pathname === path;

  const Logo = () => (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-lg cultural-warmth flex items-center justify-center">
        <Icon name="Brain" size={24} color="white" strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-semibold text-lg text-text-primary">
          MindBridge
        </span>
        <span className="font-caption text-xs text-text-secondary -mt-1">
          Mental Health Support
        </span>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-navigation bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            {onToggleSidebar && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSidebar}
                className="lg:hidden"
              >
                <Icon name="Menu" size={20} />
              </Button>
            )}
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-therapeutic text-sm font-body transition-all duration-200 ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-gentle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </a>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-1"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span className="text-sm">More</span>
              </Button>
              
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-therapeutic shadow-therapeutic-lg z-dropdown animate-gentle-fade">
                  {secondaryItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className={`flex items-center space-x-3 px-4 py-3 text-sm font-body transition-colors hover:bg-muted ${
                        isActive(item?.path) ? 'text-primary' : 'text-text-secondary'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </a>
                  ))}
                  <div className="border-t border-border my-1"></div>
                  <a
                    href="/settings"
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-body text-text-secondary hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </a>
                  <a
                    href="/help"
                    className="flex items-center space-x-3 px-4 py-3 text-sm font-body text-text-secondary hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Crisis Support Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="destructive"
              size="sm"
              className="hidden sm:flex items-center space-x-2 crisis-accessible animate-breathing"
            >
              <Icon name="Phone" size={16} />
              <span className="font-medium">Crisis Support</span>
            </Button>
            
            {/* Mobile Crisis Button */}
            <Button
              variant="destructive"
              size="icon"
              className="sm:hidden crisis-accessible animate-breathing"
            >
              <Icon name="Phone" size={18} />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border animate-gentle-fade">
            <nav className="px-6 py-4 space-y-2">
              {navigationItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-therapeutic text-sm font-body transition-all duration-200 crisis-accessible ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-gentle'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </a>
              ))}
              
              <div className="border-t border-border my-3"></div>
              
              {secondaryItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-therapeutic text-sm font-body transition-colors crisis-accessible ${
                    isActive(item?.path) ? 'text-primary' : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </a>
              ))}
              
              <div className="border-t border-border my-3"></div>
              
              <a
                href="/settings"
                className="flex items-center space-x-3 px-4 py-3 rounded-therapeutic text-sm font-body text-text-secondary hover:text-text-primary hover:bg-muted transition-colors crisis-accessible"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name="Settings" size={18} />
                <span>Settings</span>
              </a>
              <a
                href="/help"
                className="flex items-center space-x-3 px-4 py-3 rounded-therapeutic text-sm font-body text-text-secondary hover:text-text-primary hover:bg-muted transition-colors crisis-accessible"
                onClick={() => setIsMenuOpen(false)}
              >
                <Icon name="HelpCircle" size={18} />
                <span>Help & Support</span>
              </a>
            </nav>
          </div>
        )}
      </header>
      {/* Click outside to close menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;