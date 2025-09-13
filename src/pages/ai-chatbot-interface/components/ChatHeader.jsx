import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatHeader = ({ onClearChat, onToggleLanguage, currentLanguage = 'en', isOnline = true }) => {
  const [showMenu, setShowMenu] = useState(false);

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* AI Assistant Info */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full cultural-warmth flex items-center justify-center">
              <Icon name="Brain" size={20} color="white" />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
              isOnline ? 'bg-success' : 'bg-muted'
            }`}></div>
          </div>
          
          <div>
            <h1 className="font-heading font-semibold text-lg text-text-primary">
              MindBridge AI
            </h1>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success animate-breathing' : 'bg-muted'}`}></div>
              <span className="font-body text-sm text-text-secondary">
                {isOnline ? 'Online & Ready to Help' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center space-x-2"
            >
              <Icon name="Globe" size={14} />
              <span className="hidden sm:inline font-body text-sm">
                {currentLang?.nativeName}
              </span>
              <Icon name="ChevronDown" size={12} />
            </Button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-therapeutic shadow-therapeutic-lg z-dropdown animate-gentle-fade">
                {languages?.map((lang) => (
                  <button
                    key={lang?.code}
                    onClick={() => {
                      onToggleLanguage?.(lang?.code);
                      setShowMenu(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-body transition-colors hover:bg-muted ${
                      currentLanguage === lang?.code ? 'bg-muted text-primary' : 'text-text-secondary'
                    }`}
                  >
                    <span className="font-medium">{lang?.nativeName}</span>
                    <span className="text-xs opacity-70">({lang?.name})</span>
                    {currentLanguage === lang?.code && (
                      <Icon name="Check" size={14} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Chat */}
          <Button
            variant="outline"
            size="sm"
            onClick={onClearChat}
            className="flex items-center space-x-2"
          >
            <Icon name="RotateCcw" size={14} />
            <span className="hidden sm:inline font-body text-sm">Clear</span>
          </Button>

          {/* Menu */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
          >
            <Icon name="MoreVertical" size={16} />
          </Button>
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="mt-3 flex items-center space-x-2 text-xs text-text-secondary">
        <Icon name="Shield" size={12} className="text-success" />
        <span className="font-body">
          Your conversations are private and encrypted. Available in multiple Indian languages.
        </span>
      </div>
      {/* Click outside to close menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-50"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default ChatHeader;