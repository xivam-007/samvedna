import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModeratorPanel = ({ isVisible, onToggle }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const pendingPosts = [
    {
      id: 1,
      title: "Struggling with exam anxiety",
      author: "Anonymous Student",
      category: "anxiety",
      timestamp: new Date(Date.now() - 300000),
      flagged: false,
      content: "I've been having panic attacks before every exam. Has anyone else experienced this?"
    },
    {
      id: 2,
      title: "Family pressure about career choices",
      author: "Priya K.",
      category: "family-issues",
      timestamp: new Date(Date.now() - 600000),
      flagged: true,
      content: "My parents want me to pursue engineering but I\'m passionate about arts..."
    }
  ];

  const reportedContent = [
    {
      id: 1,
      type: 'post',
      title: "Inappropriate language in discussion",
      reporter: "Student #1234",
      reason: "Offensive language",
      timestamp: new Date(Date.now() - 900000),
      status: 'pending'
    },
    {
      id: 2,
      type: 'reply',
      title: "Sharing personal contact information",
      reporter: "Student #5678",
      reason: "Privacy violation",
      timestamp: new Date(Date.now() - 1200000),
      status: 'reviewed'
    }
  ];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-4 top-20 w-80 bg-card border border-border rounded-therapeutic shadow-therapeutic-lg z-dropdown animate-gentle-fade">
      {/* Panel Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={18} className="text-secondary" />
          <h3 className="font-heading font-semibold text-text-primary">
            Moderator Panel
          </h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          <Icon name="X" size={16} />
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex-1 px-4 py-3 text-sm font-body transition-colors ${
            activeTab === 'pending' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Pending ({pendingPosts?.length})
        </button>
        <button
          onClick={() => setActiveTab('reported')}
          className={`flex-1 px-4 py-3 text-sm font-body transition-colors ${
            activeTab === 'reported' ?'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
          }`}
        >
          Reports ({reportedContent?.length})
        </button>
      </div>
      {/* Panel Content */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'pending' && (
          <div className="p-4 space-y-4">
            {pendingPosts?.map((post) => (
              <div key={post?.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-medium text-sm text-text-primary line-clamp-1">
                      {post?.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-text-secondary">
                      <span className="font-body">{post?.author}</span>
                      <span>•</span>
                      <span className="font-body">{formatTimeAgo(post?.timestamp)}</span>
                    </div>
                  </div>
                  {post?.flagged && (
                    <Icon name="Flag" size={14} className="text-warning flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-xs text-text-secondary font-body line-clamp-2 mb-3">
                  {post?.content}
                </p>
                
                <div className="flex items-center space-x-2">
                  <Button variant="success" size="xs">
                    <Icon name="Check" size={12} className="mr-1" />
                    Approve
                  </Button>
                  <Button variant="destructive" size="xs">
                    <Icon name="X" size={12} className="mr-1" />
                    Reject
                  </Button>
                  <Button variant="ghost" size="xs">
                    <Icon name="Eye" size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reported' && (
          <div className="p-4 space-y-4">
            {reportedContent?.map((report) => (
              <div key={report?.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-medium text-sm text-text-primary line-clamp-1">
                      {report?.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1 text-xs text-text-secondary">
                      <span className="font-body">{report?.reporter}</span>
                      <span>•</span>
                      <span className="font-body">{formatTimeAgo(report?.timestamp)}</span>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-body ${
                    report?.status === 'pending' ?'bg-warning/10 text-warning' :'bg-success/10 text-success'
                  }`}>
                    {report?.status}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="AlertTriangle" size={12} className="text-warning" />
                  <span className="text-xs text-warning font-body">{report?.reason}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="primary" size="xs">
                    <Icon name="Eye" size={12} className="mr-1" />
                    Review
                  </Button>
                  <Button variant="destructive" size="xs">
                    <Icon name="Trash2" size={12} className="mr-1" />
                    Remove
                  </Button>
                  <Button variant="ghost" size="xs">
                    <Icon name="MessageCircle" size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Quick Actions */}
      <div className="border-t border-border p-4">
        <div className="flex items-center justify-between text-xs text-text-secondary mb-3">
          <span className="font-body">Quick Actions</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full animate-breathing"></div>
            <span className="font-body">Online</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="xs" className="justify-start">
            <Icon name="Users" size={12} className="mr-1" />
            Active Users
          </Button>
          <Button variant="outline" size="xs" className="justify-start">
            <Icon name="BarChart3" size={12} className="mr-1" />
            Analytics
          </Button>
          <Button variant="outline" size="xs" className="justify-start">
            <Icon name="Settings" size={12} className="mr-1" />
            Settings
          </Button>
          <Button variant="outline" size="xs" className="justify-start">
            <Icon name="HelpCircle" size={12} className="mr-1" />
            Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModeratorPanel;