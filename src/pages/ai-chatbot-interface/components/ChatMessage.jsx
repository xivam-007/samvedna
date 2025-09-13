import React from 'react';
import Icon from '../../../components/AppIcon';

const ChatMessage = ({ message, isUser, timestamp, isTyping = false }) => {
  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-6">
        <div className="w-8 h-8 rounded-full cultural-warmth flex items-center justify-center flex-shrink-0">
          <Icon name="Brain" size={16} color="white" />
        </div>
        <div className="flex-1">
          <div className="bg-muted rounded-therapeutic p-4 max-w-md">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-6 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-primary' : 'cultural-warmth'
      }`}>
        <Icon name={isUser ? 'User' : 'Brain'} size={16} color="white" />
      </div>
      
      <div className="flex-1 max-w-md">
        <div className={`rounded-therapeutic p-4 ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-muted text-text-primary'
        }`}>
          <div className="font-body text-sm breathing-space whitespace-pre-wrap">
            {message}
          </div>
        </div>
        
        <div className={`text-xs text-text-secondary mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;