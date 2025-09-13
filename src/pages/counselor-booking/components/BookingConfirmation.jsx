import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, onClose, onGoToDashboard }) => {
  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getSessionTypeIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'phone':
        return 'Phone';
      case 'in-person':
        return 'MapPin';
      default:
        return 'Calendar';
    }
  };

  const getSessionTypeLabel = (type) => {
    switch (type) {
      case 'video':
        return 'Video Call Session';
      case 'phone':
        return 'Phone Call Session';
      case 'in-person':
        return 'In-Person Session';
      default:
        return 'Session';
    }
  };

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'crisis':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'normal':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  const preparationTips = [
    "Find a quiet, private space for your session",
    "Test your internet connection (for video/phone sessions)",
    "Prepare any questions or topics you'd like to discuss",
    "Have a glass of water nearby",
    "Turn off notifications to avoid distractions"
  ];

  const whatToExpect = [
    "Your counselor will introduce themselves and explain the process",
    "You'll discuss your concerns in a safe, judgment-free environment",
    "The session is completely confidential",
    "You can pause or stop the session at any time",
    "Follow-up sessions can be scheduled if needed"
  ];

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-therapeutic max-w-2xl w-full max-h-[90vh] overflow-y-auto therapeutic-shadow-lg">
        {/* Success Header */}
        <div className="bg-success/10 border-b border-success/20 p-6 text-center">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} color="white" />
          </div>
          <h2 className="font-heading font-semibold text-2xl text-text-primary mb-2">
            Session Booked Successfully!
          </h2>
          <p className="text-text-secondary font-body">
            Your counseling session has been confirmed. You'll receive a confirmation email shortly.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Booking Details */}
          <div className="bg-surface border border-border rounded-therapeutic p-6">
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              Session Details
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-body font-medium text-text-primary">
                    Dr. {bookingData?.slot?.counselor?.name}
                  </p>
                  <p className="text-sm text-text-secondary font-body">
                    {bookingData?.slot?.counselor?.qualification}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-accent" />
                </div>
                <div>
                  <p className="font-body font-medium text-text-primary">
                    {formatDate(bookingData?.slot?.date)}
                  </p>
                  <p className="text-sm text-text-secondary font-body">
                    {bookingData?.slot?.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <Icon name={getSessionTypeIcon(bookingData?.sessionType)} size={20} className="text-secondary" />
                </div>
                <div>
                  <p className="font-body font-medium text-text-primary">
                    {getSessionTypeLabel(bookingData?.sessionType)}
                  </p>
                  <p className="text-sm text-text-secondary font-body">
                    Duration: 50 minutes
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <Icon name="AlertCircle" size={20} className="text-warning" />
                </div>
                <div>
                  <p className="font-body font-medium text-text-primary">
                    Priority: <span className={getUrgencyColor(bookingData?.urgencyLevel)}>
                      {bookingData?.urgencyLevel?.charAt(0)?.toUpperCase() + bookingData?.urgencyLevel?.slice(1)}
                    </span>
                  </p>
                  <p className="text-sm text-text-secondary font-body">
                    Main concern: {bookingData?.concernCategory?.replace(/([A-Z])/g, ' $1')?.trim()}
                  </p>
                </div>
              </div>
            </div>

            {/* Booking ID */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary font-body">Booking ID:</span>
                <span className="font-mono text-sm text-text-primary font-medium">
                  {bookingData?.bookingId}
                </span>
              </div>
            </div>
          </div>

          {/* Preparation Tips */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              How to Prepare
            </h3>
            <div className="space-y-3">
              {preparationTips?.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={16} className="text-success mt-1" />
                  <p className="text-text-secondary font-body">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What to Expect */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
              What to Expect
            </h3>
            <div className="space-y-3">
              {whatToExpect?.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon name="Info" size={16} className="text-primary mt-1" />
                  <p className="text-text-secondary font-body">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-warning/10 border border-warning/20 rounded-therapeutic p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="font-heading font-medium text-warning mb-2">
                  Important Reminders
                </h4>
                <ul className="text-sm text-warning space-y-1 font-body">
                  <li>• Please join 5 minutes before your scheduled time</li>
                  <li>• Cancellations must be made at least 2 hours in advance</li>
                  <li>• If you need to reschedule, contact support immediately</li>
                  <li>• In case of emergency, call our crisis helpline: 1800-XXX-XXXX</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Privacy Assurance */}
          <div className="bg-success/10 border border-success/20 rounded-therapeutic p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-success mt-0.5" />
              <div>
                <h4 className="font-heading font-medium text-success mb-2">
                  Your Privacy is Protected
                </h4>
                <ul className="text-sm text-success space-y-1 font-body">
                  <li>• All sessions are confidential and HIPAA compliant</li>
                  <li>• Session recordings are not made without your consent</li>
                  <li>• Your personal information is encrypted and secure</li>
                  <li>• You can request session notes or data deletion anytime</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Close
            </Button>
            <div className="flex items-center space-x-3">
              <Button
                variant="secondary"
                onClick={() => window.print()}
                className="crisis-accessible"
              >
                <Icon name="Printer" size={16} className="mr-2" />
                Print Details
              </Button>
              <Button
                variant="default"
                onClick={onGoToDashboard}
                className="crisis-accessible"
              >
                <Icon name="Home" size={16} className="mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;