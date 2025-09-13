import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week'); // 'day', 'week', 'month'

  const appointments = [
    {
      id: 1,
      studentId: "STU-2024-001",
      studentInitials: "A.K.",
      time: "09:00",
      duration: 60,
      type: "Initial Consultation",
      status: "confirmed",
      priority: "medium",
      notes: "First session - anxiety concerns"
    },
    {
      id: 2,
      studentId: "STU-2024-015",
      studentInitials: "R.M.",
      time: "10:30",
      duration: 45,
      type: "Follow-up",
      status: "confirmed",
      priority: "high",
      notes: "Crisis follow-up session"
    },
    {
      id: 3,
      studentId: "STU-2024-032",
      studentInitials: "S.P.",
      time: "14:00",
      duration: 60,
      type: "Group Session",
      status: "pending",
      priority: "low",
      notes: "Peer support facilitation"
    },
    {
      id: 4,
      studentId: "STU-2024-008",
      studentInitials: "M.S.",
      time: "15:30",
      duration: 45,
      type: "Assessment",
      status: "confirmed",
      priority: "medium",
      notes: "PHQ-9 follow-up discussion"
    }
  ];

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/10 border-error text-error';
      case 'medium': return 'bg-warning/10 border-warning text-warning';
      default: return 'bg-success/10 border-success text-success';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'cancelled': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Appointment Calendar
            </h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              {formatDate(selectedDate)}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex bg-muted rounded-lg p-1">
              {['day', 'week', 'month']?.map((mode) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode(mode)}
                  className="capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>
            
            <Button variant="outline" size="sm">
              <Icon name="Calendar" size={16} className="mr-2" />
              Today
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 text-sm font-body">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-text-secondary">Confirmed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-text-secondary">Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-error rounded-full"></div>
              <span className="text-text-secondary">High Priority</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Time Column */}
          <div className="lg:col-span-2">
            <div className="space-y-2">
              {timeSlots?.map((time) => (
                <div key={time} className="h-16 flex items-center justify-end pr-4 text-sm font-body text-text-secondary">
                  {time}
                </div>
              ))}
            </div>
          </div>

          {/* Appointments Column */}
          <div className="lg:col-span-10">
            <div className="relative">
              {timeSlots?.map((time, index) => (
                <div key={time} className="h-16 border-b border-border/50 relative">
                  {appointments?.filter(apt => apt?.time === time)?.map((appointment) => (
                      <div
                        key={appointment?.id}
                        className={`absolute left-0 right-0 mx-2 p-3 rounded-lg border-l-4 ${getPriorityColor(appointment?.priority)} bg-card hover:shadow-gentle transition-all duration-200 cursor-pointer`}
                        style={{ 
                          height: `${(appointment?.duration / 60) * 64 - 8}px`,
                          top: '4px'
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment?.status)}`}>
                                {appointment?.status}
                              </span>
                              <span className="text-xs font-body text-text-secondary">
                                {appointment?.duration}min
                              </span>
                            </div>
                            
                            <h4 className="font-heading font-medium text-sm text-text-primary mb-1">
                              {appointment?.studentInitials} - {appointment?.type}
                            </h4>
                            
                            <p className="text-xs font-body text-text-secondary line-clamp-2">
                              {appointment?.notes}
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-2">
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Icon name="MessageCircle" size={12} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Icon name="MoreVertical" size={12} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm font-body text-text-secondary">
            <span>Today: {appointments?.length} appointments</span>
            <span>•</span>
            <span>Next: {appointments?.find(apt => apt?.status === 'confirmed')?.time || 'No upcoming'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Slot
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Calendar" size={16} className="mr-2" />
              Schedule
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCalendar;