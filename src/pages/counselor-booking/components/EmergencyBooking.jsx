import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const EmergencyBooking = ({ onClose, onEmergencyBooking }) => {
  const [formData, setFormData] = useState({
    urgencyLevel: 'crisis',
    contactMethod: 'phone',
    immediateRisk: false,
    description: '',
    contactNumber: '',
    preferredLanguage: 'english'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const urgencyOptions = [
    { value: 'crisis', label: 'Crisis - Immediate Help Needed', description: 'Thoughts of self-harm or suicide' },
    { value: 'urgent', label: 'Urgent - Same Day Support', description: 'Severe distress, cannot wait' },
    { value: 'priority', label: 'Priority - Within 24 Hours', description: 'High anxiety or panic attacks' }
  ];

  const contactMethodOptions = [
    { value: 'phone', label: 'Phone Call - Immediate', description: 'Get connected within 5 minutes' },
    { value: 'video', label: 'Video Call - Immediate', description: 'Face-to-face support right now' },
    { value: 'chat', label: 'Text Chat - Immediate', description: 'Start chatting with a counselor' }
  ];

  const languageOptions = [
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'gujarati', label: 'Gujarati' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    try {
      const emergencyBooking = {
        ...formData,
        timestamp: new Date(),
        bookingId: `EM${Date.now()}`,
        status: 'emergency-pending'
      };

      await onEmergencyBooking(emergencyBooking);
    } catch (error) {
      console.error('Emergency booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const crisisResources = [
    {
      name: 'National Crisis Helpline',
      number: '1800-XXX-XXXX',
      description: '24/7 immediate crisis support',
      icon: 'Phone'
    },
    {
      name: 'Campus Security',
      number: 'XXX-XXX-XXXX',
      description: 'On-campus emergency assistance',
      icon: 'Shield'
    },
    {
      name: 'Emergency Services',
      number: '108',
      description: 'Medical emergency response',
      icon: 'Truck'
    }
  ];

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-therapeutic max-w-2xl w-full max-h-[90vh] overflow-y-auto therapeutic-shadow-lg">
        {/* Emergency Header */}
        <div className="bg-error/10 border-b border-error/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center animate-pulse">
                <Icon name="AlertTriangle" size={24} color="white" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-xl text-text-primary">
                  Emergency Support Request
                </h2>
                <p className="text-sm text-text-secondary font-body">
                  Immediate help is available. You are not alone.
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Crisis Resources */}
          <div className="bg-error/5 border border-error/20 rounded-therapeutic p-4">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4 flex items-center">
              <Icon name="Phone" size={20} className="text-error mr-2" />
              Immediate Crisis Support
            </h3>
            <div className="grid gap-3">
              {crisisResources?.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-3">
                    <Icon name={resource?.icon} size={16} className="text-error" />
                    <div>
                      <p className="font-body font-medium text-text-primary">{resource?.name}</p>
                      <p className="text-sm text-text-secondary font-body">{resource?.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => window.open(`tel:${resource?.number}`)}
                    className="crisis-accessible"
                  >
                    <Icon name="Phone" size={14} className="mr-1" />
                    Call Now
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                Request Immediate Counselor Support
              </h3>
              <p className="text-text-secondary font-body mb-6">
                Fill out this form to get connected with an available counselor immediately. 
                This service is available 24/7.
              </p>
            </div>

            {/* Urgency Level */}
            <Select
              label="Urgency Level"
              description="How urgent is your need for support?"
              options={urgencyOptions}
              value={formData?.urgencyLevel}
              onChange={(value) => handleInputChange('urgencyLevel', value)}
              required
            />

            {/* Contact Method */}
            <Select
              label="Preferred Contact Method"
              description="How would you like to connect with a counselor?"
              options={contactMethodOptions}
              value={formData?.contactMethod}
              onChange={(value) => handleInputChange('contactMethod', value)}
              required
            />

            {/* Contact Number */}
            <Input
              label="Contact Number"
              type="tel"
              placeholder="Enter your phone number"
              value={formData?.contactNumber}
              onChange={(e) => handleInputChange('contactNumber', e?.target?.value)}
              description="We'll use this to contact you immediately"
              required
            />

            {/* Language Preference */}
            <Select
              label="Preferred Language"
              description="Language you're most comfortable speaking in"
              options={languageOptions}
              value={formData?.preferredLanguage}
              onChange={(value) => handleInputChange('preferredLanguage', value)}
            />

            {/* Immediate Risk Assessment */}
            <div className="bg-warning/10 border border-warning/20 rounded-therapeutic p-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData?.immediateRisk}
                  onChange={(e) => handleInputChange('immediateRisk', e?.target?.checked)}
                  className="mt-1 crisis-accessible"
                />
                <div>
                  <p className="font-body font-medium text-text-primary">
                    I am having thoughts of harming myself or others
                  </p>
                  <p className="text-sm text-text-secondary font-body mt-1">
                    If checked, we will prioritize your request and may involve emergency services
                  </p>
                </div>
              </label>
            </div>

            {/* Description */}
            <Input
              label="Brief Description (Optional)"
              type="textarea"
              placeholder="Briefly describe what you're experiencing. This helps us connect you with the right counselor."
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              description="This information is confidential and helps us provide better support"
              rows={3}
            />

            {/* Privacy Notice */}
            <div className="bg-success/10 border border-success/20 rounded-therapeutic p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Shield" size={20} className="text-success mt-0.5" />
                <div>
                  <h4 className="font-heading font-medium text-success mb-2">
                    Emergency Privacy Protocol
                  </h4>
                  <ul className="text-sm text-success space-y-1 font-body">
                    <li>• Your emergency request is encrypted and secure</li>
                    <li>• Only qualified crisis counselors will access your information</li>
                    <li>• We may contact emergency services if there's immediate danger</li>
                    <li>• All interactions follow strict confidentiality guidelines</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                loading={isSubmitting}
                className="crisis-accessible animate-breathing"
              >
                {isSubmitting ? 'Connecting...' : 'Request Immediate Help'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBooking;