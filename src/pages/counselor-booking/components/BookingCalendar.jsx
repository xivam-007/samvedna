import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingCalendar = ({ selectedCounselor, onTimeSlotSelect, selectedSlot }) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const generateWeekDates = (weekOffset = 0) => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek?.setDate(today?.getDate() + (weekOffset * 7));
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date?.setDate(startOfWeek?.getDate() + i);
      dates?.push(date);
    }
    return dates;
  };

  const weekDates = generateWeekDates(currentWeek);

  const timeSlots = [
    { time: '09:00', available: true, type: 'morning' },
    { time: '10:00', available: true, type: 'morning' },
    { time: '11:00', available: false, type: 'morning' },
    { time: '12:00', available: true, type: 'afternoon' },
    { time: '14:00', available: true, type: 'afternoon' },
    { time: '15:00', available: true, type: 'afternoon' },
    { time: '16:00', available: false, type: 'afternoon' },
    { time: '17:00', available: true, type: 'evening' },
    { time: '18:00', available: true, type: 'evening' },
    { time: '19:00', available: true, type: 'evening' }
  ];

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short'
    });
  };

  const getDayName = (date) => {
    return date?.toLocaleDateString('en-IN', { weekday: 'short' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date?.toDateString() === today?.toDateString();
  };

  const isPast = (date) => {
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date) => {
    if (isPast(date)) return;
    setSelectedDate(date);
  };

  const handleTimeSlotClick = (slot) => {
    if (!slot?.available || !selectedDate) return;
    
    const slotData = {
      date: selectedDate,
      time: slot?.time,
      counselor: selectedCounselor
    };
    onTimeSlotSelect(slotData);
  };

  const isSlotSelected = (slot) => {
    return selectedSlot && 
           selectedSlot?.time === slot?.time && 
           selectedDate && 
           selectedSlot?.date?.toDateString() === selectedDate?.toDateString();
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Select Date & Time
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
            disabled={currentWeek === 0}
          >
            <Icon name="ChevronLeft" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentWeek(currentWeek + 1)}
            disabled={currentWeek >= 4}
          >
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
      {/* Date Selection */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {weekDates?.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateSelect(date)}
            disabled={isPast(date)}
            className={`p-3 rounded-therapeutic text-center transition-all duration-200 crisis-accessible ${
              isPast(date)
                ? 'bg-muted text-text-secondary cursor-not-allowed opacity-50'
                : selectedDate && selectedDate?.toDateString() === date?.toDateString()
                ? 'bg-primary text-primary-foreground shadow-gentle'
                : isToday(date)
                ? 'bg-accent text-accent-foreground border-2 border-accent'
                : 'bg-surface hover:bg-muted text-text-primary'
            }`}
          >
            <div className="font-body text-xs font-medium">
              {getDayName(date)}
            </div>
            <div className="font-heading text-sm font-semibold mt-1">
              {formatDate(date)}
            </div>
          </button>
        ))}
      </div>
      {/* Time Slots */}
      {selectedDate && (
        <div className="animate-gentle-fade">
          <h4 className="font-heading font-medium text-text-primary mb-4">
            Available Times for {formatDate(selectedDate)}
          </h4>
          
          <div className="space-y-4">
            {/* Morning Slots */}
            <div>
              <h5 className="text-sm font-body font-medium text-text-secondary mb-2 flex items-center">
                <Icon name="Sunrise" size={14} className="mr-2" />
                Morning
              </h5>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots?.filter(slot => slot?.type === 'morning')?.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={!slot?.available}
                    className={`p-3 rounded-therapeutic text-sm font-body transition-all duration-200 crisis-accessible ${
                      !slot?.available
                        ? 'bg-muted text-text-secondary cursor-not-allowed opacity-50'
                        : isSlotSelected(slot)
                        ? 'bg-primary text-primary-foreground shadow-gentle'
                        : 'bg-surface hover:bg-muted text-text-primary border border-border'
                    }`}
                  >
                    {slot?.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Afternoon Slots */}
            <div>
              <h5 className="text-sm font-body font-medium text-text-secondary mb-2 flex items-center">
                <Icon name="Sun" size={14} className="mr-2" />
                Afternoon
              </h5>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots?.filter(slot => slot?.type === 'afternoon')?.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={!slot?.available}
                    className={`p-3 rounded-therapeutic text-sm font-body transition-all duration-200 crisis-accessible ${
                      !slot?.available
                        ? 'bg-muted text-text-secondary cursor-not-allowed opacity-50'
                        : isSlotSelected(slot)
                        ? 'bg-primary text-primary-foreground shadow-gentle'
                        : 'bg-surface hover:bg-muted text-text-primary border border-border'
                    }`}
                  >
                    {slot?.time}
                  </button>
                ))}
              </div>
            </div>

            {/* Evening Slots */}
            <div>
              <h5 className="text-sm font-body font-medium text-text-secondary mb-2 flex items-center">
                <Icon name="Sunset" size={14} className="mr-2" />
                Evening
              </h5>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots?.filter(slot => slot?.type === 'evening')?.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={!slot?.available}
                    className={`p-3 rounded-therapeutic text-sm font-body transition-all duration-200 crisis-accessible ${
                      !slot?.available
                        ? 'bg-muted text-text-secondary cursor-not-allowed opacity-50'
                        : isSlotSelected(slot)
                        ? 'bg-primary text-primary-foreground shadow-gentle'
                        : 'bg-surface hover:bg-muted text-text-primary border border-border'
                    }`}
                  >
                    {slot?.time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {!selectedDate && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-text-secondary mx-auto mb-4" />
          <p className="text-text-secondary font-body">
            Please select a date to view available time slots
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingCalendar;