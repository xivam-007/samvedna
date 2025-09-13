import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceSharingPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resourceCategories = [
    { id: 'all', label: 'All Resources', count: 24 },
    { id: 'anxiety', label: 'Anxiety Management', count: 8 },
    { id: 'depression', label: 'Depression Support', count: 6 },
    { id: 'stress', label: 'Stress Relief', count: 5 },
    { id: 'mindfulness', label: 'Mindfulness', count: 3 },
    { id: 'academic', label: 'Academic Support', count: 2 }
  ];

  const resources = [
    {
      id: 1,
      title: "Progressive Muscle Relaxation Guide",
      type: "audio",
      category: "anxiety",
      duration: "15 min",
      language: "English/Hindi",
      description: "Step-by-step audio guide for muscle relaxation techniques to reduce anxiety and physical tension.",
      sharedCount: 12,
      rating: 4.8,
      lastShared: "2025-01-08",
      tags: ["relaxation", "anxiety", "body-mind"]
    },
    {
      id: 2,
      title: "Cognitive Behavioral Therapy Workbook",
      type: "pdf",
      category: "depression",
      duration: "Self-paced",
      language: "English",
      description: "Interactive workbook with CBT exercises for identifying and challenging negative thought patterns.",
      sharedCount: 8,
      rating: 4.9,
      lastShared: "2025-01-07",
      tags: ["CBT", "depression", "self-help"]
    },
    {
      id: 3,
      title: "Exam Stress Management Video Series",
      type: "video",
      category: "academic",
      duration: "45 min",
      language: "Hindi/English",
      description: "Comprehensive video series covering time management, study techniques, and stress reduction for exams.",
      sharedCount: 15,
      rating: 4.7,
      lastShared: "2025-01-09",
      tags: ["academic", "stress", "time-management"]
    },
    {
      id: 4,
      title: "Daily Mindfulness Meditation",
      type: "audio",
      category: "mindfulness",
      duration: "10 min",
      language: "Multiple",
      description: "Guided meditation sessions for daily practice, available in regional languages.",
      sharedCount: 20,
      rating: 4.9,
      lastShared: "2025-01-06",
      tags: ["meditation", "mindfulness", "daily-practice"]
    },
    {
      id: 5,
      title: "Sleep Hygiene Checklist",
      type: "document",
      category: "stress",
      duration: "5 min read",
      language: "English/Hindi",
      description: "Practical checklist for improving sleep quality and establishing healthy sleep routines.",
      sharedCount: 10,
      rating: 4.6,
      lastShared: "2025-01-05",
      tags: ["sleep", "wellness", "routine"]
    },
    {
      id: 6,
      title: "Breathing Exercises for Panic Attacks",
      type: "interactive",
      category: "anxiety",
      duration: "Variable",
      language: "Multiple",
      description: "Interactive breathing exercise app with visual guides and timer for managing panic attacks.",
      sharedCount: 18,
      rating: 4.8,
      lastShared: "2025-01-08",
      tags: ["breathing", "panic", "emergency"]
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'audio': return 'Volume2';
      case 'pdf': return 'FileText';
      case 'interactive': return 'Smartphone';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-error';
      case 'audio': return 'text-success';
      case 'pdf': return 'text-primary';
      case 'interactive': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const filteredResources = resources?.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource?.category === selectedCategory;
    const matchesSearch = resource?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         resource?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         resource?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Resource Library
            </h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Share therapeutic resources with students
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Upload" size={16} className="mr-2" />
              Upload
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Resource
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Search resources, tags, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e?.target?.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {resourceCategories?.map(category => (
              <option key={category?.id} value={category?.id}>
                {category?.label} ({category?.count})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
          {filteredResources?.map((resource) => (
            <div
              key={resource?.id}
              className="border border-border rounded-lg p-4 hover:shadow-gentle transition-all duration-200 bg-background"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  resource?.type === 'video' ? 'bg-error/10' :
                  resource?.type === 'audio' ? 'bg-success/10' :
                  resource?.type === 'pdf'? 'bg-primary/10' : 'bg-accent/10'
                }`}>
                  <Icon 
                    name={getTypeIcon(resource?.type)} 
                    size={18} 
                    className={getTypeColor(resource?.type)}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-heading font-medium text-sm text-text-primary line-clamp-2">
                      {resource?.title}
                    </h3>
                    <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0 ml-2">
                      <Icon name="MoreVertical" size={14} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-2 text-xs font-body text-text-secondary">
                    <span className="capitalize">{resource?.type}</span>
                    <span>•</span>
                    <span>{resource?.duration}</span>
                    <span>•</span>
                    <span>{resource?.language}</span>
                  </div>
                  
                  <p className="text-sm font-body text-text-secondary line-clamp-2 breathing-space mb-3">
                    {resource?.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {resource?.tags?.slice(0, 3)?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource?.tags?.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{resource?.tags?.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs font-body text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Share" size={12} />
                        <span>{resource?.sharedCount} shares</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-accent" />
                        <span>{resource?.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="outline" size="sm" className="text-xs px-2 py-1">
                        <Icon name="Eye" size={12} className="mr-1" />
                        Preview
                      </Button>
                      <Button variant="default" size="sm" className="text-xs px-2 py-1">
                        <Icon name="Share" size={12} className="mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Share Panel */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm font-body text-text-secondary">
            <span>Most shared: Mindfulness Meditation</span>
            <span>•</span>
            <span>New resources: 3 this week</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="TrendingUp" size={14} className="mr-2" />
              Analytics
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Send" size={14} className="mr-2" />
              Bulk Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSharingPanel;