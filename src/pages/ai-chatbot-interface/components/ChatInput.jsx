import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatInput = ({ onSendMessage, disabled = false, isListening = false, onVoiceToggle }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
      if (textareaRef?.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e?.target?.value);
    
    // Auto-resize textarea
    const textarea = e?.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea?.scrollHeight, 120) + 'px';
  };

  const handleVoiceClick = () => {
    setIsRecording(!isRecording);
    onVoiceToggle?.(!isRecording);
  };

  return (
    <div className="bg-card border-t border-border p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Voice Input Button */}
        <Button
          type="button"
          variant={isRecording ? "destructive" : "outline"}
          size="icon"
          onClick={handleVoiceClick}
          disabled={disabled}
          className="flex-shrink-0 crisis-accessible"
        >
          <Icon 
            name={isRecording ? "MicOff" : "Mic"} 
            size={18} 
            className={isRecording ? "animate-pulse" : ""} 
          />
        </Button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder={isListening ? "Listening..." : "Type your message here... (Press Enter to send, Shift+Enter for new line)"}
            disabled={disabled || isListening}
            className="w-full resize-none rounded-therapeutic border border-border bg-input px-4 py-3 text-sm font-body placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 min-h-[44px] max-h-[120px]"
            rows={1}
          />
          
          {/* Character count */}
          <div className="absolute bottom-1 right-2 text-xs text-text-secondary">
            {message?.length}/500
          </div>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="default"
          size="icon"
          disabled={!message?.trim() || disabled || message?.length > 500}
          className="flex-shrink-0 crisis-accessible"
        >
          <Icon name="Send" size={18} />
        </Button>
      </form>
      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-destructive animate-gentle-fade">
          <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
          <span className="font-body">Recording... Tap mic to stop</span>
        </div>
      )}
      {/* Listening Indicator */}
      {isListening && (
        <div className="mt-2 flex items-center space-x-2 text-sm text-primary animate-gentle-fade">
          <div className="w-2 h-2 bg-primary rounded-full animate-breathing"></div>
          <span className="font-body">AI is processing your message...</span>
        </div>
      )}
    </div>
  );
};

export default ChatInput;