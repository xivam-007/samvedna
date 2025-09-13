import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ForumHeader = ({ onSearch, onFilterChange, onCreatePost }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { value: 'all', label: 'All Topics' },
    { value: 'academic-stress', label: 'Academic Stress' },
    { value: 'anxiety', label: 'Anxiety & Worry' },
    { value: 'depression', label: 'Depression & Mood' },
    { value: 'social-challenges', label: 'Social Challenges' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'career-concerns', label: 'Career Concerns' },
    { value: 'family-issues', label: 'Family Issues' },
    { value: 'self-care', label: 'Self-Care Tips' }
  ];

  const handleSearch = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilterChange?.(value);
  };

  return (
    <div className="bg-card border-b border-border sticky top-16 z-10">
      <div className="p-6">
        {/* Header Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
              Peer Support Forum
            </h1>
            <p className="text-text-secondary font-body">
              Connect with fellow students in a safe, moderated community space
            </p>
          </div>
          <Button
            variant="primary"
            onClick={onCreatePost}
            iconName="Plus"
            iconPosition="left"
            className="crisis-accessible"
          >
            New Post
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search discussions, topics, or keywords..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full"
            />
          </div>
          <div className="sm:w-64">
            <Select
              options={filterOptions}
              value={selectedFilter}
              onChange={handleFilterChange}
              placeholder="Filter by topic"
            />
          </div>
        </div>

        {/* Community Guidelines Banner */}
        <div className="mt-4 bg-primary/5 border border-primary/20 rounded-therapeutic p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-heading font-medium text-primary mb-1">
                Safe Space Guidelines
              </h3>
              <p className="text-sm text-text-secondary font-body breathing-space">
                This is a moderated community. Be respectful, supportive, and maintain confidentiality. 
                Trained volunteers monitor discussions to ensure a safe environment for all students.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;