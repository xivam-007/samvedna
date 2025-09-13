import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CounselorProfile = ({ counselor, onClose, onBookAppointment }) => {
  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const getSpecializationColor = (specialization) => {
    const colors = {
      'Anxiety & Depression': 'bg-blue-100 text-blue-800',
      'Academic Stress': 'bg-green-100 text-green-800',
      'Relationship Issues': 'bg-purple-100 text-purple-800',
      'Career Counseling': 'bg-orange-100 text-orange-800',
      'Trauma & PTSD': 'bg-red-100 text-red-800',
      'Addiction Recovery': 'bg-yellow-100 text-yellow-800'
    };
    return colors?.[specialization] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-therapeutic max-w-2xl w-full max-h-[90vh] overflow-y-auto therapeutic-shadow-lg">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-xl text-text-primary">
            Counselor Profile
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="flex items-start space-x-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
                <Image
                  src={counselor?.avatar}
                  alt={`Dr. ${counselor?.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center mt-3">
                <div className={`w-3 h-3 rounded-full ${counselor?.isOnline ? 'bg-success' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-text-secondary ml-2 font-body">
                  {counselor?.isOnline ? 'Available Now' : 'Currently Offline'}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-heading font-semibold text-2xl text-text-primary mb-2">
                Dr. {counselor?.name}
              </h3>
              <p className="text-text-secondary font-body mb-2">
                {counselor?.qualification}
              </p>
              <p className="text-text-secondary font-body mb-4">
                {counselor?.experience} years of experience in mental health counseling
              </p>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {getRatingStars(counselor?.rating)}
                  <span className="text-sm text-text-secondary ml-2 font-body">
                    {counselor?.rating}/5 ({counselor?.reviewCount} reviews)
                  </span>
                </div>
                <div className="text-lg font-heading font-semibold text-text-primary">
                  ₹{counselor?.sessionFee}/session
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {counselor?.specializations?.map((spec, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-body ${getSpecializationColor(spec)}`}
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-text-primary mb-3">
              About Dr. {counselor?.name}
            </h4>
            <p className="text-text-secondary font-body breathing-space">
              {counselor?.about}
            </p>
          </div>

          {/* Approach */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-text-primary mb-3">
              Therapeutic Approach
            </h4>
            <p className="text-text-secondary font-body breathing-space">
              {counselor?.approach}
            </p>
          </div>

          {/* Languages & Availability */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-heading font-semibold text-lg text-text-primary mb-3">
                Languages Spoken
              </h4>
              <div className="flex flex-wrap gap-2">
                {counselor?.languages?.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-text-primary rounded-full text-sm font-body"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-semibold text-lg text-text-primary mb-3">
                Availability
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary font-body">
                    Next Available: {counselor?.nextAvailable}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary font-body">
                    Typical Hours: {counselor?.workingHours}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-text-primary mb-3">
              Education & Certifications
            </h4>
            <div className="space-y-3">
              {counselor?.education?.map((edu, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Icon name="GraduationCap" size={16} className="text-text-secondary mt-1" />
                  <div>
                    <p className="font-body font-medium text-text-primary">{edu?.degree}</p>
                    <p className="text-sm text-text-secondary font-body">{edu?.institution}</p>
                    <p className="text-sm text-text-secondary font-body">{edu?.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <h4 className="font-heading font-semibold text-lg text-text-primary mb-3">
              Recent Reviews
            </h4>
            <div className="space-y-4">
              {counselor?.recentReviews?.map((review, index) => (
                <div key={index} className="bg-surface p-4 rounded-therapeutic">
                  <div className="flex items-center space-x-2 mb-2">
                    {getRatingStars(review?.rating)}
                    <span className="text-sm text-text-secondary font-body">
                      {review?.date}
                    </span>
                  </div>
                  <p className="text-text-secondary font-body breathing-space">
                    "{review?.comment}"
                  </p>
                  <p className="text-sm text-text-secondary font-body mt-2">
                    - Anonymous Student
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close Profile
            </Button>
            <Button
              variant="default"
              onClick={() => onBookAppointment(counselor)}
              disabled={!counselor?.isOnline}
              className="crisis-accessible"
            >
              <Icon name="Calendar" size={16} className="mr-2" />
              Book Session
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorProfile;