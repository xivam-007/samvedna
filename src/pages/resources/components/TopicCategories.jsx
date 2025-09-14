import React from 'react';
import Icon from '../../../components/AppIcon';

const TopicCategories = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    {
      id: 'academic-stress',
      name: 'Academic Stress',
      icon: 'BookOpen',
      description: 'Exam anxiety, study pressure, academic performance',
      postCount: 234,
      recentActivity: '2 hours ago',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'anxiety',
      name: 'Anxiety & Worry',
      icon: 'Heart',
      description: 'General anxiety, panic attacks, worry management',
      postCount: 189,
      recentActivity: '45 minutes ago',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      id: 'depression',
      name: 'Depression & Mood',
      icon: 'Cloud',
      description: 'Low mood, motivation issues, emotional support',
      postCount: 156,
      recentActivity: '1 hour ago',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'social-challenges',
      name: 'Social Challenges',
      icon: 'Users',
      description: 'Making friends, social anxiety, loneliness',
      postCount: 142,
      recentActivity: '3 hours ago',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      id: 'relationships',
      name: 'Relationships',
      icon: 'HeartHandshake',
      description: 'Dating, friendships, family relationships',
      postCount: 98,
      recentActivity: '4 hours ago',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'career-concerns',
      name: 'Career Concerns',
      icon: 'Briefcase',
      description: 'Job search, career planning, internships',
      postCount: 87,
      recentActivity: '5 hours ago',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'family-issues',
      name: 'Family Issues',
      icon: 'Home',
      description: 'Family conflicts, expectations, support',
      postCount: 76,
      recentActivity: '6 hours ago',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'self-care',
      name: 'Self-Care Tips',
      icon: 'Sparkles',
      description: 'Wellness tips, coping strategies, healthy habits',
      postCount: 123,
      recentActivity: '30 minutes ago',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {categories?.map((category) => (
        <button
          key={category?.id}
          onClick={() => onCategorySelect(category?.id)}
          className={`p-4 rounded-therapeutic border-2 transition-all duration-200 text-left hover:shadow-therapeutic crisis-accessible ${
            selectedCategory === category?.id
              ? `${category?.bgColor} ${category?.borderColor} shadow-therapeutic`
              : 'bg-card border-border hover:border-primary/30'
          }`}
        >
          <div className="flex items-start space-x-3 mb-3">
            <div className={`p-2 rounded-lg ${category?.bgColor}`}>
              <Icon name={category?.icon} size={20} className={category?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-heading font-medium text-sm mb-1 ${
                selectedCategory === category?.id ? category?.color : 'text-text-primary'
              }`}>
                {category?.name}
              </h3>
              <p className="text-xs text-text-secondary font-body breathing-space line-clamp-2">
                {category?.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={12} />
              <span className="font-body">{category?.postCount} posts</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span className="font-body">{category?.recentActivity}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TopicCategories;