import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingForm = ({ selectedSlot, onSubmitBooking, onCancel, isSubmitting }) => {
  const [formData, setFormData] = useState({
    sessionType: '',
    concernCategory: '',
    urgencyLevel: 'normal',
    previousSessions: false,
    shareBackground: false,
    backgroundInfo: '',
    preferredLanguage: 'english',
    reminderPreference: 'email',
    agreedToTerms: false
  });

  const [errors, setErrors] = useState({});

  const sessionTypeOptions = [
    { value: 'video', label: 'Video Call', description: 'Face-to-face online session' },
    { value: 'phone', label: 'Phone Call', description: 'Voice-only session' },
    { value: 'in-person', label: 'In-Person', description: 'Meet at campus counseling center' }
  ];

  const concernCategoryOptions = [
    { value: 'anxiety', label: 'Anxiety & Stress' },
    { value: 'depression', label: 'Depression & Mood' },
    { value: 'academic', label: 'Academic Pressure' },
    { value: 'relationships', label: 'Relationship Issues' },
    { value: 'family', label: 'Family Problems' },
    { value: 'career', label: 'Career Confusion' },
    { value: 'social', label: 'Social Anxiety' },
    { value: 'other', label: 'Other Concerns' }
  ];

  const urgencyLevelOptions = [
    { value: 'low', label: 'Low Priority', description: 'General support needed' },
    { value: 'normal', label: 'Normal Priority', description: 'Regular counseling session' },
    { value: 'high', label: 'High Priority', description: 'Urgent support needed' },
    { value: 'crisis', label: 'Crisis', description: 'Immediate intervention required' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'tamil', label: 'Tamil' }
  ];

  const reminderOptions = [
    { value: 'email', label: 'Email Reminder' },
    { value: 'sms', label: 'SMS Reminder' },
    { value: 'both', label: 'Email & SMS' },
    { value: 'none', label: 'No Reminders' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.sessionType) {
      newErrors.sessionType = 'Please select a session type';
    }

    if (!formData?.concernCategory) {
      newErrors.concernCategory = 'Please select your main concern';
    }

    if (!formData?.agreedToTerms) {
      newErrors.agreedToTerms = 'Please agree to the terms and conditions';
    }

    if (formData?.shareBackground && !formData?.backgroundInfo?.trim()) {
      newErrors.backgroundInfo = 'Please provide background information';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const bookingData = {
      ...formData,
      slot: selectedSlot,
      bookingId: `BK${Date.now()}`,
      status: 'pending'
    };

    onSubmitBooking(bookingData);
  };

  const formatSlotInfo = () => {
    if (!selectedSlot) return '';
    
    const date = selectedSlot?.date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return `${date} at ${selectedSlot?.time}`;
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Book Your Session
        </h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <Icon name="X" size={20} />
        </Button>
      </div>
      {/* Selected Slot Info */}
      <div className="bg-primary/10 border border-primary/20 rounded-therapeutic p-4 mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={20} className="text-primary" />
          <div>
            <h4 className="font-heading font-medium text-text-primary">
              Dr. {selectedSlot?.counselor?.name}
            </h4>
            <p className="text-sm text-text-secondary font-body">
              {formatSlotInfo()}
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Session Type */}
        <Select
          label="Session Type"
          description="Choose how you'd like to attend the session"
          options={sessionTypeOptions}
          value={formData?.sessionType}
          onChange={(value) => handleInputChange('sessionType', value)}
          error={errors?.sessionType}
          required
        />

        {/* Concern Category */}
        <Select
          label="Main Concern"
          description="What would you like to discuss? (This helps the counselor prepare)"
          options={concernCategoryOptions}
          value={formData?.concernCategory}
          onChange={(value) => handleInputChange('concernCategory', value)}
          error={errors?.concernCategory}
          required
        />

        {/* Urgency Level */}
        <Select
          label="Priority Level"
          description="How urgent is your need for support?"
          options={urgencyLevelOptions}
          value={formData?.urgencyLevel}
          onChange={(value) => handleInputChange('urgencyLevel', value)}
        />

        {/* Language Preference */}
        <Select
          label="Preferred Language"
          description="Language you're most comfortable speaking in"
          options={languageOptions}
          value={formData?.preferredLanguage}
          onChange={(value) => handleInputChange('preferredLanguage', value)}
        />

        {/* Previous Sessions */}
        <Checkbox
          label="I have had counseling sessions before"
          description="This helps the counselor understand your experience level"
          checked={formData?.previousSessions}
          onChange={(e) => handleInputChange('previousSessions', e?.target?.checked)}
        />

        {/* Share Background */}
        <Checkbox
          label="I want to share background information"
          description="Provide context to help your counselor prepare (optional but recommended)"
          checked={formData?.shareBackground}
          onChange={(e) => handleInputChange('shareBackground', e?.target?.checked)}
        />

        {/* Background Information */}
        {formData?.shareBackground && (
          <div className="animate-gentle-fade">
            <Input
              label="Background Information"
              type="textarea"
              placeholder="Share any relevant context, previous experiences, or specific concerns you'd like to discuss. This information is confidential and helps your counselor provide better support."
              value={formData?.backgroundInfo}
              onChange={(e) => handleInputChange('backgroundInfo', e?.target?.value)}
              error={errors?.backgroundInfo}
              description="This information is encrypted and only visible to your assigned counselor"
              rows={4}
            />
          </div>
        )}

        {/* Reminder Preference */}
        <Select
          label="Reminder Preference"
          description="How would you like to be reminded about your appointment?"
          options={reminderOptions}
          value={formData?.reminderPreference}
          onChange={(value) => handleInputChange('reminderPreference', value)}
        />

        {/* Terms Agreement */}
        <Checkbox
          label="I agree to the terms and conditions"
          description="By booking this session, you agree to our privacy policy and counseling guidelines"
          checked={formData?.agreedToTerms}
          onChange={(e) => handleInputChange('agreedToTerms', e?.target?.checked)}
          error={errors?.agreedToTerms}
          required
        />

        {/* Privacy Notice */}
        <div className="bg-success/10 border border-success/20 rounded-therapeutic p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-success mt-0.5" />
            <div>
              <h4 className="font-heading font-medium text-success mb-2">
                Your Privacy is Protected
              </h4>
              <ul className="text-sm text-success space-y-1 font-body">
                <li>• All sessions are confidential and HIPAA compliant</li>
                <li>• Your identity remains anonymous in institutional data</li>
                <li>• Session notes are encrypted and secure</li>
                <li>• You can request data deletion at any time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            className="crisis-accessible"
          >
            {isSubmitting ? 'Booking Session...' : 'Book Session'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;