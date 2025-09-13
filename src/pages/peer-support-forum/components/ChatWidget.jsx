import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ChatWidget = ({ isOpen, onToggle, selectedUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const mockMessages = [
    {
      id: 1,
      sender: 'peer',
      content: "Hi! I saw your post about exam anxiety. I\'ve been through something similar.",
      timestamp: new Date(Date.now() - 600000),
      isRead: true
    },
    {
      id: 2,
      sender: 'user',
      content: "Really? It\'s been so overwhelming lately. How did you cope with it?",
      timestamp: new Date(Date.now() - 540000),
      isRead: true
    },
    {
      id: 3,
      sender: 'peer',
      content: "I started using breathing exercises before exams. Also, breaking study sessions into smaller chunks helped a lot.",
      timestamp: new Date(Date.now() - 480000),
      isRead: true
    },
    {
      id: 4,
      sender: 'user',
      content: "That sounds helpful. Do you have any specific breathing techniques you'd recommend?",
      timestamp: new Date(Date.now() - 420000),
      isRead: true
    },
    {
      id: 5,
      sender: 'peer',
      content: "The 4-7-8 technique works well for me. Breathe in for 4, hold for 7, exhale for 8. I can share some resources if you'd like.",
      timestamp: new Date(Date.now() - 360000),
      isRead: false
    }
  ];

  useEffect(() => {
    if (isOpen && messages?.length === 0) {
      setMessages(mockMessages);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message?.trim()) {
      const newMessage = {
        id: messages?.length + 1,
        sender: 'user',
        content: message,
        timestamp: new Date(),
        isRead: false
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      
      // Simulate peer typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const peerResponse = {
          id: messages?.length + 2,
          sender: 'peer',
          content: "Thanks for sharing! I\'m glad we can support each other through this.",
          timestamp: new Date(),
          isRead: false
        };
        setMessages(prev => [...prev, peerResponse]);
      }, 2000);
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) {
    return (
      <Button
        variant="primary"
        size="icon"
        onClick={onToggle}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-therapeutic-lg animate-breathing z-chat"
      >
        <Icon name="MessageCircle" size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-card border border-border rounded-therapeutic shadow-therapeutic-lg z-chat animate-gentle-fade">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5 rounded-t-therapeutic">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
              <Icon name="User" size={16} className="text-secondary" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success border-2 border-card rounded-full"></div>
          </div>
          <div>
            <h3 className="font-heading font-medium text-sm text-text-primary">
              Anonymous Peer
            </h3>
            <p className="text-xs text-text-secondary font-body">Online now</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Icon name="Phone" size={14} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8"
          >
            <Icon name="X" size={14} />
          </Button>
        </div>
      </div>
      {/* Privacy Notice */}
      <div className="px-4 py-2 bg-warning/5 border-b border-warning/20">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={12} className="text-warning" />
          <span className="text-xs text-warning font-body">
            Peer chat is monitored for safety
          </span>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64">
        {messages?.map((msg) => (
          <div
            key={msg?.id}
            className={`flex ${msg?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg?.sender === 'user' ?'bg-primary text-primary-foreground' :'bg-muted text-text-primary'
              }`}
            >
              <p className="text-sm font-body breathing-space">{msg?.content}</p>
              <div className={`flex items-center justify-end mt-1 space-x-1 ${
                msg?.sender === 'user' ? 'text-primary-foreground/70' : 'text-text-secondary'
              }`}>
                <span className="text-xs font-body">{formatTime(msg?.timestamp)}</span>
                {msg?.sender === 'user' && (
                  <Icon 
                    name={msg?.isRead ? 'CheckCheck' : 'Check'} 
                    size={12} 
                    className={msg?.isRead ? 'text-success' : 'opacity-50'}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="border-t border-border p-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
              placeholder="Type a supportive message..."
              className="w-full p-2 pr-10 border border-border rounded-lg text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-6 w-6"
            >
              <Icon name="Smile" size={14} />
            </Button>
          </div>
          <Button
            variant="primary"
            size="icon"
            onClick={handleSendMessage}
            disabled={!message?.trim()}
            className="flex-shrink-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Lock" size={10} />
            <span className="font-body">End-to-end encrypted</span>
          </div>
          <span className="font-body">{message?.length}/500</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;