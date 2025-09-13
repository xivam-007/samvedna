import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CrisisEscalation from '../../components/ui/CrisisEscalation';
import PrivacyIndicator from '../../components/ui/PrivacyIndicator';
import ForumHeader from './components/ForumHeader';
import TopicCategories from './components/TopicCategories';
import DiscussionThread from './components/DiscussionThread';
import CreatePostModal from './components/CreatePostModal';
import ModeratorPanel from './components/ModeratorPanel';
import ChatWidget from './components/ChatWidget';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PeerSupportForum = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isModeratorPanelOpen, setIsModeratorPanelOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [currentUser] = useState({
    id: 1,
    name: 'Rahul Sharma',
    isVolunteer: false,
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  });

  const mockThreads = [
    {
      id: 1,
      title: "Dealing with exam anxiety - need some support",
      content: `I'm a final year student and I've been struggling with severe anxiety before exams. My heart races, I can't sleep, and sometimes I feel like I can't breathe properly.\n\nI've tried some breathing exercises but they don't seem to help much. Has anyone else experienced this? How did you cope with it?\n\nI'm worried this might affect my final grades and future prospects. Any advice would be really appreciated.`,
      author: {
        name: 'Priya K.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        isVolunteer: false,
        isVerified: true
      },
      category: 'Academic Stress',
      institution: 'Government College',
      timestamp: new Date(Date.now() - 7200000),
      likes: 23,
      isLiked: false,
      views: 156,
      isAnonymous: false,
      tags: ['exam-anxiety', 'final-year', 'breathing-issues'],
      replies: [
        {
          id: 1,
          content: "I completely understand what you\'re going through. I had similar issues last semester. What helped me was the 4-7-8 breathing technique and talking to a counselor.",
          author: {
            name: 'Anonymous Student',
            isVolunteer: true
          },
          timestamp: new Date(Date.now() - 5400000),
          likes: 8,
          isAnonymous: true
        },
        {
          id: 2,
          content: "Have you tried progressive muscle relaxation? There are some good apps that guide you through it. Also, breaking study sessions into smaller chunks really helped reduce my anxiety.",
          author: {
            name: 'Amit R.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            isVolunteer: false
          },
          timestamp: new Date(Date.now() - 3600000),
          likes: 12,
          isAnonymous: false
        }
      ]
    },
    {
      id: 2,
      title: "Feeling isolated in hostel life",
      content: `I moved to the hostel this year and I'm finding it really hard to make friends. Everyone seems to already have their groups and I feel left out.\n\nI'm naturally introverted and it's difficult for me to approach people. Sometimes I spend entire days without having a meaningful conversation with anyone.\n\nThis is affecting my mood and I find myself feeling sad most of the time. How do others deal with loneliness in college?`,
      author: {
        name: 'Anonymous Student',
        isVolunteer: false
      },
      category: 'Social Challenges',
      institution: 'Engineering College',
      timestamp: new Date(Date.now() - 10800000),
      likes: 31,
      isLiked: true,
      views: 203,
      isAnonymous: true,
      tags: ['hostel-life', 'loneliness', 'introvert', 'friendship'],
      replies: [
        {
          id: 1,
          content: "I felt the same way when I first joined. What worked for me was joining clubs and societies. It\'s easier to connect with people who share similar interests.",
          author: {
            name: 'Sneha M.',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            isVolunteer: true
          },
          timestamp: new Date(Date.now() - 9000000),
          likes: 15,
          isAnonymous: false
        }
      ]
    },
    {
      id: 3,
      title: "Family pressure about career choices",
      content: `My parents want me to pursue engineering but I'm really passionate about arts and design. Every conversation at home turns into an argument about my future.\n\nThey keep saying that arts won't provide financial stability and that I'm being impractical. I understand their concerns but I feel like I'm losing myself trying to meet their expectations.\n\nHas anyone else dealt with similar family pressure? How did you handle it?`,
      author: {
        name: 'Kavya S.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        isVolunteer: false,
        isVerified: true
      },
      category: 'Family Issues',
      institution: 'Arts College',
      timestamp: new Date(Date.now() - 14400000),
      likes: 45,
      isLiked: false,
      views: 287,
      isAnonymous: false,
      tags: ['family-pressure', 'career-choice', 'arts', 'engineering'],
      replies: [
        {
          id: 1,
          content: "I went through something similar. What helped was showing my parents successful examples of people in creative fields and gradually involving them in my passion projects.",
          author: {
            name: 'Arjun P.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            isVolunteer: false
          },
          timestamp: new Date(Date.now() - 12600000),
          likes: 18,
          isAnonymous: false
        },
        {
          id: 2,
          content: "Consider having a calm conversation with them about your plans and how you intend to make it financially viable. Sometimes parents just need reassurance about your future security.",
          author: {
            name: 'Anonymous Volunteer',
            isVolunteer: true
          },
          timestamp: new Date(Date.now() - 10800000),
          likes: 22,
          isAnonymous: true
        }
      ]
    },
    {
      id: 4,
      title: "Self-care tips for managing stress",
      content: `I wanted to share some self-care strategies that have really helped me manage stress during college:\n\n1. Morning meditation (even 5 minutes helps)\n2. Regular exercise or walking\n3. Maintaining a sleep schedule\n4. Journaling before bed\n5. Limiting social media time\n\nWhat self-care practices work for you? Let's share ideas to help each other!`,
      author: {
        name: 'Meditation Club',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        isVolunteer: true,
        isVerified: true
      },
      category: 'Self-Care Tips',
      institution: 'Wellness Center',
      timestamp: new Date(Date.now() - 18000000),
      likes: 67,
      isLiked: true,
      views: 412,
      isAnonymous: false,
      tags: ['self-care', 'stress-management', 'meditation', 'wellness'],
      replies: [
        {
          id: 1,
          content: "Great tips! I\'d add that cooking simple meals has been therapeutic for me. It\'s a nice break from studies and gives a sense of accomplishment.",
          author: {
            name: 'Ravi K.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            isVolunteer: false
          },
          timestamp: new Date(Date.now() - 16200000),
          likes: 14,
          isAnonymous: false
        },
        {
          id: 2,
          content: "Reading fiction books before bed instead of scrolling through my phone has improved my sleep quality significantly.",
          author: {
            name: 'Anonymous Student',
            isVolunteer: false
          },
          timestamp: new Date(Date.now() - 14400000),
          likes: 19,
          isAnonymous: true
        }
      ]
    }
  ];

  useEffect(() => {
    setThreads(mockThreads);
    setFilteredThreads(mockThreads);
  }, []);

  useEffect(() => {
    let filtered = threads;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(thread => 
        thread?.category?.toLowerCase()?.replace(/\s+/g, '-') === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(thread =>
        thread?.title?.toLowerCase()?.includes(query) ||
        thread?.content?.toLowerCase()?.includes(query) ||
        thread?.tags?.some(tag => tag?.toLowerCase()?.includes(query))
      );
    }

    setFilteredThreads(filtered);
  }, [selectedCategory, searchQuery, threads]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCreatePost = () => {
    setIsCreatePostOpen(true);
  };

  const handleSubmitPost = (postData) => {
    const newThread = {
      id: threads?.length + 1,
      title: postData?.title,
      content: postData?.content,
      author: {
        name: postData?.isAnonymous ? 'Anonymous Student' : currentUser?.name,
        avatar: postData?.isAnonymous ? null : currentUser?.avatar,
        isVolunteer: currentUser?.isVolunteer,
        isVerified: currentUser?.isVerified
      },
      category: postData?.category,
      institution: 'Your College',
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      views: 1,
      isAnonymous: postData?.isAnonymous,
      tags: postData?.tags ? postData?.tags?.split(',')?.map(tag => tag?.trim()) : [],
      replies: []
    };

    setThreads(prev => [newThread, ...prev]);
  };

  const handleReply = (threadId, replyContent) => {
    setThreads(prev => prev?.map(thread => {
      if (thread?.id === threadId) {
        const newReply = {
          id: thread?.replies?.length + 1,
          content: replyContent,
          author: {
            name: currentUser?.name,
            avatar: currentUser?.avatar,
            isVolunteer: currentUser?.isVolunteer
          },
          timestamp: new Date(),
          likes: 0,
          isAnonymous: false
        };
        return { ...thread, replies: [...thread?.replies, newReply] };
      }
      return thread;
    }));
  };

  const handleLike = (threadId) => {
    setThreads(prev => prev?.map(thread => {
      if (thread?.id === threadId) {
        return {
          ...thread,
          likes: thread?.isLiked ? thread?.likes - 1 : thread?.likes + 1,
          isLiked: !thread?.isLiked
        };
      }
      return thread;
    }));
  };

  const handleReport = (threadId) => {
    console.log('Reporting thread:', threadId);
    // In a real app, this would send a report to moderators
  };

  const handleCrisisEscalation = (type) => {
    console.log('Crisis escalation:', type);
    // In a real app, this would route to appropriate crisis support
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => {}} />
      {/* Privacy Indicator */}
      <PrivacyIndicator 
        level="secure" 
        position="top-right" 
        showDetails={true} 
      />
      {/* Crisis Support */}
      {showCrisisSupport && (
        <CrisisEscalation
          isVisible={showCrisisSupport}
          severity="medium"
          onEscalate={handleCrisisEscalation}
          onDismiss={() => setShowCrisisSupport(false)}
        />
      )}
      {/* Main Content */}
      <div className="pt-16">
        <ForumHeader
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onCreatePost={handleCreatePost}
        />

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Show categories when no specific category is selected */}
          {selectedCategory === 'all' && !searchQuery && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary">
                  Browse Topics
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModeratorPanelOpen(!isModeratorPanelOpen)}
                  iconName="Shield"
                  iconPosition="left"
                  className="hidden lg:flex"
                >
                  Moderator Panel
                </Button>
              </div>
              <TopicCategories
                onCategorySelect={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </div>
          )}

          {/* Discussion Threads */}
          <div className="space-y-6">
            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-1">
                  {selectedCategory === 'all' ? 'Recent Discussions' : `${selectedCategory?.replace('-', ' ')} Discussions`}
                </h2>
                <p className="text-text-secondary font-body">
                  {filteredThreads?.length} {filteredThreads?.length === 1 ? 'discussion' : 'discussions'} found
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              {selectedCategory !== 'all' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to All Topics
                </Button>
              )}
            </div>

            {/* Thread List */}
            {filteredThreads?.length > 0 ? (
              filteredThreads?.map((thread) => (
                <DiscussionThread
                  key={thread?.id}
                  thread={thread}
                  onReply={handleReply}
                  onLike={handleLike}
                  onReport={handleReport}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Icon name="MessageSquare" size={32} className="text-text-secondary" />
                </div>
                <h3 className="text-lg font-heading font-medium text-text-primary mb-2">
                  No discussions found
                </h3>
                <p className="text-text-secondary font-body mb-6">
                  {searchQuery 
                    ? `No discussions match your search for "${searchQuery}"`
                    : 'Be the first to start a discussion in this category'
                  }
                </p>
                <Button
                  variant="primary"
                  onClick={handleCreatePost}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Start New Discussion
                </Button>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredThreads?.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Discussions
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 flex flex-col space-y-3 z-fab">
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setShowCrisisSupport(true)}
          className="w-12 h-12 rounded-full shadow-therapeutic-lg crisis-accessible"
          title="Crisis Support"
        >
          <Icon name="Phone" size={20} />
        </Button>
      </div>
      {/* Modals and Widgets */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handleSubmitPost}
      />
      <ModeratorPanel
        isVisible={isModeratorPanelOpen}
        onToggle={() => setIsModeratorPanelOpen(!isModeratorPanelOpen)}
      />
      <ChatWidget
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
        selectedUser={null}
      />
    </div>
  );
};

export default PeerSupportForum;