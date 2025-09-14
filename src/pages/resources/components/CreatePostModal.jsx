import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const CreatePostModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    isAnonymous: false,
    allowDirectMessages: true
  });

  const categoryOptions = [
    { value: 'academic-stress', label: 'Academic Stress' },
    { value: 'anxiety', label: 'Anxiety & Worry' },
    { value: 'depression', label: 'Depression & Mood' },
    { value: 'social-challenges', label: 'Social Challenges' },
    { value: 'relationships', label: 'Relationships' },
    { value: 'career-concerns', label: 'Career Concerns' },
    { value: 'family-issues', label: 'Family Issues' },
    { value: 'self-care', label: 'Self-Care Tips' }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (formData?.title?.trim() && formData?.content?.trim() && formData?.category) {
      onSubmit?.(formData);
      setFormData({
        title: '',
        content: '',
        category: '',
        tags: '',
        isAnonymous: false,
        allowDirectMessages: true
      });
      onClose?.();
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-therapeutic shadow-therapeutic-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-gentle-fade">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Create New Post
            </h2>
            <p className="text-sm text-text-secondary font-body mt-1">
              Share your thoughts or seek support from the community
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="flex-shrink-0"
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Modal Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Post Title */}
          <Input
            label="Post Title"
            type="text"
            placeholder="What would you like to discuss?"
            value={formData?.title}
            onChange={(e) => handleInputChange('title', e?.target?.value)}
            required
            maxLength={150}
            description="Keep it clear and descriptive (max 150 characters)"
          />

          {/* Category Selection */}
          <Select
            label="Category"
            options={categoryOptions}
            value={formData?.category}
            onChange={(value) => handleInputChange('category', value)}
            placeholder="Choose the most relevant category"
            required
            description="This helps others find your post"
          />

          {/* Post Content */}
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              Your Message <span className="text-error">*</span>
            </label>
            <textarea
              value={formData?.content}
              onChange={(e) => handleInputChange('content', e?.target?.value)}
              placeholder="Share your thoughts, experiences, or questions. Remember to be respectful and supportive..."
              className="w-full p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent font-body breathing-space"
              rows={6}
              required
              maxLength={2000}
            />
            <p className="text-xs text-text-secondary font-body mt-1">
              {formData?.content?.length}/2000 characters
            </p>
          </div>

          {/* Tags */}
          <Input
            label="Tags (Optional)"
            type="text"
            placeholder="e.g., exam-stress, first-year, hostel-life"
            value={formData?.tags}
            onChange={(e) => handleInputChange('tags', e?.target?.value)}
            description="Separate tags with commas to help others find your post"
          />

          {/* Privacy Options */}
          <div className="space-y-4">
            <h3 className="font-heading font-medium text-text-primary">Privacy Settings</h3>
            
            <Checkbox
              label="Post anonymously"
              description="Your name won't be visible, but moderators can still identify you"
              checked={formData?.isAnonymous}
              onChange={(e) => handleInputChange('isAnonymous', e?.target?.checked)}
            />
            
            <Checkbox
              label="Allow direct messages"
              description="Other students can send you private messages about this post"
              checked={formData?.allowDirectMessages}
              onChange={(e) => handleInputChange('allowDirectMessages', e?.target?.checked)}
            />
          </div>

          {/* Community Guidelines Reminder */}
          <div className="bg-primary/5 border border-primary/20 rounded-therapeutic p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-heading font-medium text-primary text-sm mb-1">
                  Community Guidelines
                </h4>
                <ul className="text-xs text-text-secondary font-body space-y-1">
                  <li>• Be respectful and supportive to all community members</li>
                  <li>• Maintain confidentiality and respect others' privacy</li>
                  <li>• Avoid sharing personal contact information publicly</li>
                  <li>• Report any concerning content to moderators</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-2 text-xs text-text-secondary">
              <Icon name="Shield" size={12} />
              <span className="font-body">Your post will be reviewed by moderators</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!formData?.title?.trim() || !formData?.content?.trim() || !formData?.category}
                iconName="Send"
                iconPosition="left"
              >
                Post to Forum
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;