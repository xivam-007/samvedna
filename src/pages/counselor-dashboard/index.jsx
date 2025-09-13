import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CrisisEscalation from '../../components/ui/CrisisEscalation';
import PrivacyIndicator from '../../components/ui/PrivacyIndicator';
import AppointmentCalendar from './components/AppointmentCalendar';
import StudentCasePanel from './components/StudentCasePanel';
import CommunicationHub from './components/CommunicationHub';
import ResourceSharingPanel from './components/ResourceSharingPanel';
import SessionNotesPanel from './components/SessionNotesPanel';
import CounselorAnalytics from './components/CounselorAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CounselorDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [crisisVisible, setCrisisVisible] = useState(false);

  const counselorInfo = {
    name: "Dr. Priya Sharma",
    credentials: "M.A. Clinical Psychology, Ph.D. Counseling",
    specialization: "Anxiety, Depression, Academic Stress",
    experience: "8 years",
    license: "RCI-12345",
    currentLoad: 24,
    maxCapacity: 30,
    nextAppointment: "09:00 AM - A.K. (Initial Consultation)"
  };

  const quickStats = [
    {
      label: "Today\'s Sessions",
      value: "4",
      icon: "Calendar",
      color: "text-primary"
    },
    {
      label: "Active Cases",
      value: "24",
      icon: "Users",
      color: "text-success"
    },
    {
      label: "Pending Notes",
      value: "2",
      icon: "FileText",
      color: "text-warning"
    },
    {
      label: "Crisis Alerts",
      value: "1",
      icon: "AlertTriangle",
      color: "text-error"
    }
  ];

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'calendar', label: 'Calendar', icon: 'Calendar' },
    { id: 'cases', label: 'Cases', icon: 'Users' },
    { id: 'communication', label: 'Messages', icon: 'MessageCircle' },
    { id: 'resources', label: 'Resources', icon: 'BookOpen' },
    { id: 'notes', label: 'Notes', icon: 'FileText' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const handleCrisisEscalation = (action) => {
    console.log('Crisis escalation:', action);
    // Handle crisis escalation based on action type
    setCrisisVisible(false);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'calendar':
        return <AppointmentCalendar />;
      case 'cases':
        return <StudentCasePanel />;
      case 'communication':
        return <CommunicationHub />;
      case 'resources':
        return <ResourceSharingPanel />;
      case 'notes':
        return <SessionNotesPanel />;
      case 'analytics':
        return <CounselorAnalytics />;
      default:
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-6">
              <AppointmentCalendar />
              <CommunicationHub />
            </div>
            <div className="space-y-6">
              <StudentCasePanel />
              <ResourceSharingPanel />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header 
        isCollapsed={sidebarCollapsed}
        onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <main className={`transition-all duration-300 pt-16 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6">
          {/* Counselor Profile Header */}
          <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="UserCheck" size={32} className="text-primary" />
                </div>
                
                <div>
                  <h1 className="text-2xl font-heading font-bold text-text-primary mb-1">
                    {counselorInfo?.name}
                  </h1>
                  <p className="text-sm font-body text-text-secondary mb-2">
                    {counselorInfo?.credentials}
                  </p>
                  <div className="flex items-center space-x-4 text-sm font-body text-text-secondary">
                    <span>Specialization: {counselorInfo?.specialization}</span>
                    <span>•</span>
                    <span>{counselorInfo?.experience} experience</span>
                    <span>•</span>
                    <span>License: {counselorInfo?.license}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-body text-text-secondary">Caseload:</span>
                  <span className="text-lg font-heading font-semibold text-text-primary">
                    {counselorInfo?.currentLoad}/{counselorInfo?.maxCapacity}
                  </span>
                </div>
                <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${(counselorInfo?.currentLoad / counselorInfo?.maxCapacity) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs font-body text-text-secondary mt-2">
                  Next: {counselorInfo?.nextAppointment}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {quickStats?.map((stat, index) => (
              <div key={index} className="bg-card rounded-therapeutic border border-border shadow-therapeutic p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-body text-text-secondary mb-1">
                      {stat?.label}
                    </p>
                    <p className="text-2xl font-heading font-bold text-text-primary">
                      {stat?.value}
                    </p>
                  </div>
                  <Icon name={stat?.icon} size={24} className={stat?.color} />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic mb-6">
            <div className="flex items-center space-x-1 p-2 overflow-x-auto">
              {navigationTabs?.map((tab) => (
                <Button
                  key={tab?.id}
                  variant={activeView === tab?.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveView(tab?.id)}
                  className="flex items-center space-x-2 whitespace-nowrap"
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="space-y-6">
            {renderActiveView()}
          </div>

          {/* Emergency Actions */}
          <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
            <Button
              variant="destructive"
              size="lg"
              onClick={() => setCrisisVisible(true)}
              className="crisis-accessible animate-breathing shadow-therapeutic-lg"
            >
              <Icon name="Phone" size={20} className="mr-2" />
              Crisis Support
            </Button>
            
            <Button
              variant="default"
              size="lg"
              className="shadow-therapeutic-lg"
            >
              <Icon name="Plus" size={20} className="mr-2" />
              Quick Note
            </Button>
          </div>
        </div>
      </main>
      {/* Crisis Escalation Component */}
      <CrisisEscalation
        isVisible={crisisVisible}
        severity="medium"
        onEscalate={handleCrisisEscalation}
        onDismiss={() => setCrisisVisible(false)}
      />
      {/* Privacy Indicator */}
      <PrivacyIndicator
        level="clinical"
        position="bottom-left"
        showDetails={true}
      />
    </div>
  );
};

export default CounselorDashboard;