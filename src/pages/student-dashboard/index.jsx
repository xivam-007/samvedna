import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import CrisisEscalation from '../../components/ui/CrisisEscalation';
import PrivacyIndicator from '../../components/ui/PrivacyIndicator';
import WelcomeSection from './components/WelcomeSection';
import ServiceCard from './components/ServiceCard';
import WellnessTracker from './components/WellnessTracker';
import QuickAccessToolbar from './components/QuickAccessToolbar';
import RecentActivity from './components/RecentActivity';
import PersonalizedRecommendations from './components/PersonalizedRecommendations';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock user data
  const userData = {
    name: "Rahul sharma",
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    anonymityLevel: "secure"
  };

  // Mock mood data
  const moodData = [
    {
      mood: "good",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      note: "Feeling optimistic about exams"
    },
    {
      mood: "okay",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      note: "Stressed about assignments"
    },
    {
      mood: "excellent",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      note: "Great day with friends"
    }
  ];

  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      type: "Individual Counseling",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      counselor: "Dr. Rajesh Kumar",
      duration: "50 minutes"
    },
    {
      type: "Group Therapy",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      counselor: "Ms. Anita Verma",
      duration: "90 minutes"
    }
  ];

  // Mock progress stats
  const progressStats = {
    checkIns: 5,
    resourcesViewed: 12,
    forumPosts: 3,
    sessionsAttended: 2
  };

  // Mock recent activities
  const recentActivities = [
    {
      type: 'mood',
      description: 'Completed daily mood check-in',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isPrivate: true,
      hasDetails: true
    },
    {
      type: 'resource',
      description: 'Viewed "Managing Exam Anxiety" resource',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPrivate: false,
      hasDetails: true
    },
    {
      type: 'forum',
      description: 'Posted in "Study Stress Support" discussion',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isPrivate: false,
      hasDetails: true
    },
    {
      type: 'session',
      description: 'Attended counseling session with Dr. Kumar',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isPrivate: true,
      hasDetails: true
    }
  ];

  // Mock personalized recommendations
  const recommendations = [
    {
      type: 'resource',
      title: 'Mindfulness for Students',
      category: 'Stress Management',
      description: 'Learn practical mindfulness techniques specifically designed for academic stress and daily challenges.',
      priority: 'high',
      duration: '15 min read',
      rating: '4.8'
    },
    {
      type: 'forum',
      title: 'Final Year Support Group',
      category: 'Peer Support',
      description: 'Connect with fellow final year students navigating similar academic and career pressures.',
      priority: 'medium',
      duration: 'Active community',
      rating: '4.6'
    },
    {
      type: 'exercise',
      title: 'Quick Breathing Exercise',
      category: 'Relaxation',
      description: 'A 5-minute guided breathing exercise to help manage anxiety and improve focus.',
      priority: 'high',
      duration: '5 minutes',
      rating: '4.9'
    },
    {
      type: 'session',
      title: 'Academic Stress Counseling',
      category: 'Professional Support',
      description: 'One-on-one session focused on developing healthy study habits and managing academic pressure.',
      priority: 'medium',
      duration: '50 minutes',
      rating: '4.7'
    }
  ];

  // Service cards data
  const services = [
    {
      title: "AI Support Chat",
      description: "Get instant support and coping strategies from our AI counselor trained in mental health first aid.",
      icon: "MessageCircle",
      route: "/ai-chatbot-interface",
      color: "primary",
      badge: "24/7"
    },
    {
      title: "Book Counselor",
      description: "Schedule confidential sessions with licensed mental health professionals at your convenience.",
      icon: "Calendar",
      route: "/counselor-booking",
      color: "secondary"
    },
    {
      title: "Peer Support Forum",
      description: "Connect with fellow students in a safe, moderated environment to share experiences and support.",
      icon: "Users",
      route: "/peer-support-forum",
      color: "accent"
    },
    {
      title: "Crisis Support",
      description: "Immediate help is available. Connect with crisis counselors for urgent mental health support.",
      icon: "Phone",
      route: "/crisis-support",
      color: "error",
      isUrgent: true,
      badge: "Emergency"
    }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Simulate crisis detection (for demo purposes)
    const checkCrisisIndicators = () => {
      const recentMoods = moodData?.slice(0, 3);
      const hasNegativeMoods = recentMoods?.some(mood => 
        mood?.mood === 'difficult' || mood?.mood === 'struggling'
      );
      
      if (hasNegativeMoods) {
        setTimeout(() => setShowCrisisSupport(true), 3000);
      }
    };

    checkCrisisIndicators();
  }, []);

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'resources': navigate('/resources');
        break;
      case 'screening': navigate('/self-assessment');
        break;
      case 'helpline':
        setShowCrisisSupport(true);
        break;
      case 'meditation': navigate('/meditation');
        break;
      default:
        console.log(`Action ${actionId} not implemented`);
    }
  };

  const handleCrisisEscalation = (type) => {
    switch (type) {
      case 'hotline':
        window.open('tel:+911234567890', '_self');
        break;
      case 'chat': navigate('/ai-chatbot-interface');
        break;
      case 'booking': navigate('/counselor-booking');
        break;
      case 'peer': navigate('/peer-support-forum');
        break;
      case 'emergency':
        window.open('tel:112', '_self');
        break;
      default:
        navigate('/crisis-support');
    }
    setShowCrisisSupport(false);
  };

  const handleRecommendationClick = (recommendation) => {
    switch (recommendation?.type) {
      case 'resource': navigate('/resources');
        break;
      case 'forum':
        navigate('/peer-support-forum');
        break;
      case 'session': navigate('/counselor-booking');
        break;
      case 'exercise': navigate('/meditation');
        break;
      default:
        console.log('Recommendation clicked:', recommendation);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Privacy Indicator */}
      <PrivacyIndicator 
        level="secure" 
        position="top-right" 
        showDetails={true}
      />
      {/* Crisis Escalation */}
      <CrisisEscalation
        isVisible={showCrisisSupport}
        severity="medium"
        onEscalate={handleCrisisEscalation}
        onDismiss={() => setShowCrisisSupport(false)}
      />
      {/* Main Content */}
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <WelcomeSection 
            userName={userData?.name}
            lastLogin={userData?.lastLogin}
          />

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Services */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Cards */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-text-primary mb-6">
                  Mental Health Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services?.map((service, index) => (
                    <ServiceCard
                      key={index}
                      title={service?.title}
                      description={service?.description}
                      icon={service?.icon}
                      route={service?.route}
                      color={service?.color}
                      isUrgent={service?.isUrgent}
                      badge={service?.badge}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Access Toolbar */}
              <QuickAccessToolbar onActionClick={handleQuickAction} />

              {/* Recent Activity */}
              <RecentActivity 
                activities={recentActivities}
                onViewAll={() => navigate('/activity-history')}
              />
            </div>

            {/* Right Column - Tracking & Recommendations */}
            <div className="space-y-6">
              {/* Wellness Tracker */}
              <WellnessTracker
                moodData={moodData}
                upcomingAppointments={upcomingAppointments}
                progressStats={progressStats}
              />

              {/* Personalized Recommendations */}
              <PersonalizedRecommendations
                recommendations={recommendations}
                onRecommendationClick={handleRecommendationClick}
              />
            </div>
          </div>

          {/* Support Information */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-therapeutic p-8 text-center">
            <h3 className="font-heading text-xl font-semibold text-text-primary mb-4">
              Remember: You&apos;re Not Alone
            </h3>
            <p className="font-body text-text-secondary breathing-space max-w-2xl mx-auto mb-6">
              Mental health is just as important as physical health. Our services are designed to provide you with the support, resources, and community you need to thrive during your academic journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/about-mental-health')}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-therapeutic font-medium hover:bg-primary/90 transition-colors crisis-accessible"
              >
                Learn About Mental Health
              </button>
              <button 
                onClick={() => setShowCrisisSupport(true)}
                className="px-6 py-3 border border-primary text-primary rounded-therapeutic font-medium hover:bg-primary/10 transition-colors crisis-accessible"
              >
                Need Help Now?
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;