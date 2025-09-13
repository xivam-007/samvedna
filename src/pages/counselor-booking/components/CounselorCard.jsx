import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CounselorCard = ({ counselor, onBookAppointment, onViewProfile }) => {
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

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow hover:shadow-therapeutic-lg transition-all duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <Image
              src={counselor?.avatar}
              alt={`Dr. ${counselor?.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            <div className={`w-3 h-3 rounded-full ${counselor?.isOnline ? 'bg-success' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-text-secondary ml-1">
              {counselor?.isOnline ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-heading font-semibold text-lg text-text-primary">
                Dr. {counselor?.name}
              </h3>
              <p className="text-sm text-text-secondary font-body">
                {counselor?.qualification}
              </p>
              <p className="text-sm text-text-secondary font-body">
                {counselor?.experience} years experience
              </p>
            </div>
            <div className="flex items-center space-x-1">
              {getRatingStars(counselor?.rating)}
              <span className="text-sm text-text-secondary ml-1">
                ({counselor?.reviewCount})
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              {counselor?.specializations?.map((spec, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs font-body ${getSpecializationColor(spec)}`}
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Globe" size={14} />
              <span className="font-body">{counselor?.languages?.join(', ')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span className="font-body">Next: {counselor?.nextAvailable}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-heading font-semibold text-text-primary">
                ₹{counselor?.sessionFee}
              </span>
              <span className="text-sm text-text-secondary font-body">/session</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(counselor)}
              >
                View Profile
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onBookAppointment(counselor)}
                disabled={!counselor?.isOnline}
              >
                Book Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounselorCard;