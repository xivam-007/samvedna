import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunicationHub = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messages = [
    {
      id: 1,
      studentId: "STU-2024-001",
      studentInitials: "A.K.",
      subject: "Session Preparation Question",
      preview: "I wanted to ask about the breathing exercises we discussed...",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: "unread",
      priority: "normal",
      type: "question"
    },
    {
      id: 2,
      studentId: "STU-2024-015",
      studentInitials: "R.M.",
      subject: "Crisis Support Request",
      preview: "I\'m feeling overwhelmed again and need to talk...",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: "urgent",
      priority: "high",
      type: "crisis"
    },
    {
      id: 3,
      studentId: "STU-2024-032",
      studentInitials: "S.P.",
      subject: "Appointment Reschedule",
      preview: "Can we move tomorrow\'s session to later in the day?",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: "read",
      priority: "normal",
      type: "scheduling"
    },
    {
      id: 4,
      studentId: "STU-2024-008",
      studentInitials: "M.S.",
      subject: "Resource Feedback",
      preview: "The mindfulness app you recommended is really helpful...",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      status: "read",
      priority: "normal",
      type: "feedback"
    }
  ];

  const crisisAlerts = [
    {
      id: 1,
      studentId: "STU-2024-015",
      studentInitials: "R.M.",
      alertType: "high_risk_keywords",
      severity: "high",
      timestamp: new Date(Date.now() - 1800000),
      context: "AI chatbot conversation",
      action: "immediate_review"
    },
    {
      id: 2,
      studentId: "STU-2024-027",
      studentInitials: "K.L.",
      alertType: "missed_appointments",
      severity: "medium",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      context: "3 consecutive missed sessions",
      action: "welfare_check"
    }
  ];

  const getMessageTypeIcon = (type) => {
    switch (type) {
      case 'crisis': return 'AlertTriangle';
      case 'scheduling': return 'Calendar';
      case 'feedback': return 'MessageSquare';
      default: return 'MessageCircle';
    }
  };

  const getMessageTypeColor = (type, priority) => {
    if (priority === 'high' || type === 'crisis') return 'text-error';
    return 'text-primary';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent': return 'bg-error text-error-foreground';
      case 'unread': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Communication Hub
            </h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Secure messaging and crisis monitoring
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Search
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              New Message
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <Button
            variant={activeTab === 'messages' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('messages')}
            className="flex-1"
          >
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Messages ({messages?.filter(m => m?.status === 'unread')?.length})
          </Button>
          <Button
            variant={activeTab === 'alerts' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('alerts')}
            className="flex-1"
          >
            <Icon name="AlertTriangle" size={16} className="mr-2" />
            Crisis Alerts ({crisisAlerts?.length})
          </Button>
        </div>
      </div>
      <div className="h-96 overflow-y-auto">
        {activeTab === 'messages' && (
          <div className="divide-y divide-border">
            {messages?.map((message) => (
              <div
                key={message?.id}
                className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
                  selectedMessage?.id === message?.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                } ${message?.status === 'unread' ? 'bg-accent/5' : ''}`}
                onClick={() => setSelectedMessage(selectedMessage?.id === message?.id ? null : message)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-heading font-semibold text-primary">
                      {message?.studentInitials}
                    </span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={getMessageTypeIcon(message?.type)} 
                          size={14} 
                          className={getMessageTypeColor(message?.type, message?.priority)}
                        />
                        <span className="font-heading font-medium text-text-primary">
                          {message?.subject}
                        </span>
                        {message?.status === 'unread' && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-body text-text-secondary">
                          {formatTimestamp(message?.timestamp)}
                        </span>
                        {message?.status === 'urgent' && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message?.status)}`}>
                            Urgent
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm font-body text-text-secondary line-clamp-2 breathing-space">
                      {message?.preview}
                    </p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-body text-text-secondary">
                        Case: {message?.studentId}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Icon name="Reply" size={12} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Icon name="Archive" size={12} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Message View */}
                {selectedMessage?.id === message?.id && (
                  <div className="mt-4 pt-4 border-t border-border animate-gentle-fade">
                    <div className="bg-muted/30 rounded-lg p-4 mb-4">
                      <p className="text-sm font-body text-text-primary breathing-space">
                        {message?.preview} I've been practicing them daily but sometimes I feel like I'm not doing them correctly. Could you clarify the proper technique during our next session? Also, I wanted to mention that my sleep has improved since we started working together.
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button variant="default" size="sm">
                        <Icon name="Reply" size={14} className="mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="Calendar" size={14} className="mr-2" />
                        Schedule Call
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="FileText" size={14} className="mr-2" />
                        Add to Notes
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="divide-y divide-border">
            {crisisAlerts?.map((alert) => (
              <div key={alert?.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    alert?.severity === 'high' ? 'bg-error/10' : 'bg-warning/10'
                  }`}>
                    <Icon 
                      name="AlertTriangle" 
                      size={16} 
                      className={alert?.severity === 'high' ? 'text-error' : 'text-warning'}
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-heading font-medium text-text-primary">
                          {alert?.studentInitials} - Crisis Alert
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          alert?.severity === 'high' ? 'bg-error text-error-foreground' : 'bg-warning text-warning-foreground'
                        }`}>
                          {alert?.severity} risk
                        </span>
                      </div>
                      
                      <span className="text-xs font-body text-text-secondary">
                        {formatTimestamp(alert?.timestamp)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm font-body">
                      <div>
                        <span className="text-text-secondary">Alert Type:</span>
                        <p className="text-text-primary capitalize">
                          {alert?.alertType?.replace('_', ' ')}
                        </p>
                      </div>
                      <div>
                        <span className="text-text-secondary">Context:</span>
                        <p className="text-text-primary">{alert?.context}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={alert?.severity === 'high' ? 'destructive' : 'warning'} 
                        size="sm"
                      >
                        <Icon name="Phone" size={14} className="mr-2" />
                        {alert?.action === 'immediate_review' ? 'Immediate Contact' : 'Welfare Check'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Icon name="FileText" size={14} className="mr-2" />
                        View Case
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="X" size={14} className="mr-2" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Actions Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm font-body text-text-secondary">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Secure messaging active</span>
            </div>
            <span>•</span>
            <span>Response time: &lt; 2 hours</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={14} className="mr-2" />
              Preferences
            </Button>
            <Button variant="default" size="sm">
              <Icon name="MessageCircle" size={14} className="mr-2" />
              Broadcast
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationHub;