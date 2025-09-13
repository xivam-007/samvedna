import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import QuickResponseButtons from './components/QuickResponseButtons';
import ChatInput from './components/ChatInput';
import CrisisDetectionAlert from './components/CrisisDetectionAlert';
import ResourceSuggestions from './components/ResourceSuggestions';
import PrivacyIndicator from '../../components/ui/PrivacyIndicator';

const AIChatbotInterface = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [crisisSeverity, setCrisisSeverity] = useState('medium');
  const [resourceSuggestions, setResourceSuggestions] = useState([]);
  const [isOnline, setIsOnline] = useState(true);

  // Mock initial messages
  const initialMessages = [
    {
      id: 1,
      message: `Namaste! I'm MindBridge AI, your personal mental health companion. I'm here to provide support, coping strategies, and connect you with resources whenever you need them.\n\nHow are you feeling today? You can share anything that's on your mind - I'm here to listen and help.`,
      isUser: false,
      timestamp: new Date(Date.now() - 300000)
    }
  ];

  // Mock resource suggestions
  const mockResourceSuggestions = [
    {
      id: 1,
      title: 'Deep Breathing Exercise',
      description: 'A 5-minute guided breathing technique to reduce anxiety and stress',
      type: 'exercise',
      duration: '5 min',
      rating: 4.8,
      language: 'Hindi/English'
    },
    {
      id: 2,
      title: 'Managing Academic Stress',
      description: 'Practical strategies for handling exam pressure and study-related anxiety',
      type: 'article',
      duration: '8 min read',
      rating: 4.6,
      language: 'English'
    },
    {
      id: 3,
      title: 'Mindfulness for Students',
      description: 'Learn mindfulness techniques specifically designed for college students',
      type: 'video',
      duration: '12 min',
      rating: 4.9,
      language: 'Hindi'
    }
  ];

  // Crisis detection keywords
  const crisisKeywords = {
    high: ['suicide', 'kill myself', 'end it all', 'no point living', 'hurt myself'],
    medium: ['hopeless', 'can\'t cope', 'overwhelmed', 'breaking down', 'giving up'],
    low: ['stressed', 'anxious', 'worried', 'sad', 'confused']
  };

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const detectCrisisLevel = (message) => {
    const lowerMessage = message?.toLowerCase();
    
    for (const [level, keywords] of Object.entries(crisisKeywords)) {
      if (keywords?.some(keyword => lowerMessage?.includes(keyword))) {
        return level;
      }
    }
    return null;
  };

  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage?.toLowerCase();
    
    // Crisis responses
    if (lowerMessage?.includes('suicide') || lowerMessage?.includes('kill myself')) {
      return `I'm really concerned about you right now. Your life has value and there are people who want to help. Please know that you're not alone in this.\n\nI'm connecting you with immediate crisis support resources. Would you like me to help you contact a crisis counselor right away?`;
    }
    
    if (lowerMessage?.includes('hopeless') || lowerMessage?.includes('can\'t cope')) {
      return `I hear that you're going through a really difficult time right now. These feelings of hopelessness can be overwhelming, but they are temporary and you can get through this.\n\nLet's work together on some coping strategies. Would you like to try a quick breathing exercise, or would you prefer to talk about what's making you feel this way?`;
    }

    // Academic stress responses
    if (lowerMessage?.includes('academic') || lowerMessage?.includes('studies') || lowerMessage?.includes('exam')) {
      return `Academic pressure is very common among students, and it's completely understandable that you're feeling this way. Many students in India face similar challenges.\n\nHere are some strategies that can help:\n• Break large tasks into smaller, manageable parts\n• Create a realistic study schedule\n• Take regular breaks (try the 25-5 minute technique)\n• Practice relaxation techniques before exams\n\nWould you like me to guide you through a quick stress-relief exercise?`;
    }

    // Anxiety responses
    if (lowerMessage?.includes('anxious') || lowerMessage?.includes('anxiety') || lowerMessage?.includes('worried')) {
      return `Anxiety can feel overwhelming, but there are effective ways to manage it. Let's start with something simple that you can do right now.\n\nTry this breathing technique:\n1. Breathe in slowly for 4 counts\n2. Hold for 4 counts\n3. Breathe out slowly for 6 counts\n4. Repeat 5 times\n\nThis helps activate your body's relaxation response. How are you feeling after trying this?`;
    }

    // Social isolation responses
    if (lowerMessage?.includes('lonely') || lowerMessage?.includes('isolated') || lowerMessage?.includes('friends')) {
      return `Feeling isolated is tough, especially during college years. Building connections takes time, but there are ways to start.\n\nSome suggestions:\n• Join clubs or societies that match your interests\n• Attend college events and activities\n• Consider study groups for your subjects\n• Try our peer support forum to connect with other students\n\nRemember, many students feel the same way. You're not alone in this experience. Would you like me to help you find peer support groups?`;
    }

    // Sleep issues
    if (lowerMessage?.includes('sleep') || lowerMessage?.includes('insomnia') || lowerMessage?.includes('tired')) {
      return `Sleep problems can really affect your mental health and academic performance. Good sleep hygiene is crucial for students.\n\nHere are some tips:\n• Keep a consistent sleep schedule\n• Avoid screens 1 hour before bed\n• Create a relaxing bedtime routine\n• Keep your room cool and dark\n• Avoid caffeine after 2 PM\n\nWould you like me to guide you through a relaxation technique that can help you fall asleep?`;
    }

    // Family pressure
    if (lowerMessage?.includes('family') || lowerMessage?.includes('parents') || lowerMessage?.includes('pressure')) {
      return `Family expectations can create a lot of stress, especially in Indian families where academic and career success is highly valued. It's important to find a balance between respecting family wishes and taking care of your mental health.\n\nSome strategies:\n• Communicate openly about your feelings and challenges\n• Set realistic expectations together\n• Focus on your own growth and progress\n• Seek support when the pressure becomes overwhelming\n\nRemember, your mental health is just as important as academic success. Would you like to talk more about managing family expectations?`;
    }

    // Default supportive response
    return `Thank you for sharing that with me. I'm here to listen and support you through whatever you're experiencing.\n\nIt takes courage to reach out, and I want you to know that your feelings are valid. Everyone faces challenges, and seeking support is a sign of strength, not weakness.\n\nIs there a specific area you'd like to focus on today? I can help with stress management, coping strategies, or connect you with additional resources.`;
  };

  const handleSendMessage = async (message) => {
    // Add user message
    const userMessage = {
      id: Date.now(),
      message,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Check for crisis indicators
    const crisisLevel = detectCrisisLevel(message);
    if (crisisLevel) {
      setCrisisSeverity(crisisLevel);
      setShowCrisisAlert(true);
    }

    // Show resource suggestions for certain topics
    if (message?.toLowerCase()?.includes('stress') || 
        message?.toLowerCase()?.includes('anxiety') || 
        message?.toLowerCase()?.includes('sleep')) {
      setResourceSuggestions(mockResourceSuggestions);
    }

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        message: generateAIResponse(message),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickResponse = (message) => {
    handleSendMessage(message);
  };

  const handleVoiceToggle = (isRecording) => {
    setIsListening(isRecording);
    
    // Simulate voice recognition
    if (isRecording) {
      setTimeout(() => {
        setIsListening(false);
        // You would integrate with actual speech recognition here
      }, 3000);
    }
  };

  const handleClearChat = () => {
    setMessages(initialMessages);
    setShowCrisisAlert(false);
    setResourceSuggestions([]);
  };

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    // In a real app, this would trigger translation of the interface
  };

  const handleCrisisEscalation = (action) => {
    switch (action) {
      case 'crisis-hotline':
        // In a real app, this would open crisis hotline
        alert('Connecting to crisis hotline: 1800-599-0019 (KIRAN)');
        break;
      case 'counselor-booking': navigate('/counselor-booking');
        break;
      case 'peer-forum':
        navigate('/peer-support-forum');
        break;
      case 'immediate-help': alert('Emergency contacts:\n• KIRAN: 1800-599-0019\n• Vandrevala Foundation: 9999 666 555\n• COOJ: +91 83 76 04 02 02');
        break;
      default:
        break;
    }
    setShowCrisisAlert(false);
  };

  const handleResourceClick = (resource) => {
    if (resource?.type === 'browse-all') {
      navigate('/student-dashboard');
    } else {
      // In a real app, this would open the resource
      alert(`Opening resource: ${resource?.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => {}} />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
          {/* Chat Header */}
          <ChatHeader
            onClearChat={handleClearChat}
            onToggleLanguage={handleLanguageChange}
            currentLanguage={currentLanguage}
            isOnline={isOnline}
          />

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Crisis Alert */}
            <CrisisDetectionAlert
              isVisible={showCrisisAlert}
              severity={crisisSeverity}
              onEscalate={handleCrisisEscalation}
              onDismiss={() => setShowCrisisAlert(false)}
            />

            {/* Resource Suggestions */}
            <ResourceSuggestions
              suggestions={resourceSuggestions}
              onResourceClick={handleResourceClick}
              onDismiss={() => setResourceSuggestions([])}
            />

            {/* Quick Response Buttons (show only if no messages from user) */}
            {messages?.length <= 1 && (
              <QuickResponseButtons
                onQuickResponse={handleQuickResponse}
                disabled={isTyping || isListening}
              />
            )}

            {/* Messages */}
            {messages?.map((message) => (
              <ChatMessage
                key={message?.id}
                message={message?.message}
                isUser={message?.isUser}
                timestamp={message?.timestamp}
              />
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <ChatMessage 
                message=""
                isUser={false}
                timestamp={new Date()}
                isTyping={true} 
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isTyping}
            isListening={isListening}
            onVoiceToggle={handleVoiceToggle}
          />
        </div>
      </div>
      {/* Privacy Indicator */}
      <PrivacyIndicator
        level="secure"
        position="bottom-left"
        showDetails={true}
      />
    </div>
  );
};

export default AIChatbotInterface;