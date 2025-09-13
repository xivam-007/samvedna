import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DiscussionThread = ({ thread, onReply, onLike, onReport }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleReply = () => {
    if (replyText?.trim()) {
      onReply?.(thread?.id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - postTime) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 hover:shadow-therapeutic transition-all duration-200">
      {/* Thread Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            {thread?.isAnonymous ? (
              <Icon name="User" size={20} className="text-primary" />
            ) : (
              <Image
                src={thread?.author?.avatar}
                alt={thread?.author?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            )}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-heading font-medium text-text-primary">
              {thread?.isAnonymous ? 'Anonymous Student' : thread?.author?.name}
            </span>
            {thread?.author?.isVolunteer && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-secondary/10 rounded-full">
                <Icon name="Shield" size={12} className="text-secondary" />
                <span className="text-xs font-body text-secondary font-medium">Volunteer</span>
              </div>
            )}
            {thread?.author?.isVerified && (
              <Icon name="CheckCircle" size={14} className="text-primary" />
            )}
          </div>
          
          <div className="flex items-center space-x-3 text-xs text-text-secondary">
            <span className="font-body">{formatTimeAgo(thread?.timestamp)}</span>
            <div className="flex items-center space-x-1">
              <Icon name="Tag" size={12} />
              <span className="font-body">{thread?.category}</span>
            </div>
            {thread?.institution && (
              <div className="flex items-center space-x-1">
                <Icon name="GraduationCap" size={12} />
                <span className="font-body">{thread?.institution}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onReport?.(thread?.id)}
            className="h-8 w-8"
          >
            <Icon name="Flag" size={14} />
          </Button>
        </div>
      </div>
      {/* Thread Content */}
      <div className="mb-4">
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
          {thread?.title}
        </h3>
        <div className="font-body text-text-primary breathing-space">
          {thread?.content?.split('\n')?.map((paragraph, index) => (
            <p key={index} className="mb-2 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
        
        {thread?.tags && thread?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {thread?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs font-body rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Thread Actions */}
      <div className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike?.(thread?.id)}
            className={`flex items-center space-x-2 ${thread?.isLiked ? 'text-primary' : ''}`}
          >
            <Icon name={thread?.isLiked ? 'Heart' : 'Heart'} size={16} />
            <span className="font-body">{thread?.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center space-x-2"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="font-body">{thread?.replies?.length} replies</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsReplying(!isReplying)}
            className="flex items-center space-x-2"
          >
            <Icon name="Reply" size={16} />
            <span className="font-body">Reply</span>
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Eye" size={12} />
          <span className="font-body">{thread?.views} views</span>
        </div>
      </div>
      {/* Reply Input */}
      {isReplying && (
        <div className="mt-4 p-4 bg-muted rounded-therapeutic animate-gentle-fade">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e?.target?.value)}
            placeholder="Share your thoughts or support..."
            className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Lock" size={12} />
              <span className="font-body">Your reply will be moderated</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleReply}
                disabled={!replyText?.trim()}
              >
                Post Reply
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Replies */}
      {showReplies && thread?.replies?.length > 0 && (
        <div className="mt-4 space-y-4 animate-gentle-fade">
          {thread?.replies?.map((reply) => (
            <div key={reply?.id} className="pl-6 border-l-2 border-border">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                    {reply?.isAnonymous ? (
                      <Icon name="User" size={16} className="text-secondary" />
                    ) : (
                      <Image
                        src={reply?.author?.avatar}
                        alt={reply?.author?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    )}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-body font-medium text-sm text-text-primary">
                      {reply?.isAnonymous ? 'Anonymous Student' : reply?.author?.name}
                    </span>
                    {reply?.author?.isVolunteer && (
                      <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-secondary/10 rounded-full">
                        <Icon name="Shield" size={10} className="text-secondary" />
                        <span className="text-xs font-body text-secondary">Volunteer</span>
                      </div>
                    )}
                    <span className="text-xs text-text-secondary font-body">
                      {formatTimeAgo(reply?.timestamp)}
                    </span>
                  </div>
                  
                  <p className="font-body text-sm text-text-primary breathing-space">
                    {reply?.content}
                  </p>
                  
                  <div className="flex items-center space-x-3 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-xs"
                    >
                      <Icon name="Heart" size={12} />
                      <span className="font-body">{reply?.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-body"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionThread;