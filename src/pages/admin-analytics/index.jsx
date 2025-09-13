import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import PrivacyIndicator from '../../components/ui/PrivacyIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import MetricsOverview from './components/MetricsOverview';
import UsageChart from './components/UsageChart';
import DemographicsBreakdown from './components/DemographicsBreakdown';
import PolicyRecommendations from './components/PolicyRecommendations';
import RealTimeMonitoring from './components/RealTimeMonitoring';
import ComparativeAnalytics from './components/ComparativeAnalytics';
import ExportTools from './components/ExportTools';

const AdminAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('monthly');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for analytics
  const metricsData = [
    {
      type: 'users',
      label: 'Total Active Users',
      value: 2847,
      trend: 12.5
    },
    {
      type: 'sessions',
      label: 'Counseling Sessions',
      value: 1234,
      trend: 8.3
    },
    {
      type: 'crisis',
      label: 'Crisis Interventions',
      value: 23,
      trend: -15.2
    },
    {
      type: 'satisfaction',
      label: 'Satisfaction Rate',
      value: 94,
      trend: 3.1
    }
  ];

  const usageChartData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1400 },
    { name: 'Mar', value: 1800 },
    { name: 'Apr', value: 1600 },
    { name: 'May', value: 2100 },
    { name: 'Jun', value: 2400 },
    { name: 'Jul', value: 2200 },
    { name: 'Aug', value: 2600 },
    { name: 'Sep', value: 2800 },
    { name: 'Oct', value: 2500 },
    { name: 'Nov', value: 2900 },
    { name: 'Dec', value: 2847 }
  ];

  const stressLevelData = [
    { name: 'Jan', value: 65 },
    { name: 'Feb', value: 72 },
    { name: 'Mar', value: 78 },
    { name: 'Apr', value: 85 },
    { name: 'May', value: 82 },
    { name: 'Jun', value: 75 },
    { name: 'Jul', value: 68 },
    { name: 'Aug', value: 88 },
    { name: 'Sep', value: 92 },
    { name: 'Oct', value: 87 },
    { name: 'Nov', value: 79 },
    { name: 'Dec', value: 73 }
  ];

  const demographicsData = [
    { name: 'Engineering', value: 1247 },
    { name: 'Arts & Science', value: 856 },
    { name: 'Commerce', value: 423 },
    { name: 'Medicine', value: 321 }
  ];

  const concernCategoriesData = [
    { name: 'Academic Stress', value: 1456 },
    { name: 'Anxiety', value: 987 },
    { name: 'Depression', value: 654 },
    { name: 'Social Issues', value: 432 },
    { name: 'Family Problems', value: 321 },
    { name: 'Career Concerns', value: 234 }
  ];

  const policyRecommendations = [
    {
      title: 'Increase Counselor Availability During Exam Periods',
      description: `Data shows 40% spike in mental health service usage during examination periods. Current counselor capacity is insufficient to meet demand, leading to longer wait times and potential crisis escalations.`,
      category: 'resource',
      priority: 'high',
      impact: [
        'Reduce average wait time from 5 days to 2 days',
        'Prevent 15-20 crisis escalations per semester',
        'Improve student satisfaction by 25%',
        'Better academic performance outcomes'
      ],
      steps: [
        'Hire 3 additional part-time counselors',
        'Implement flexible scheduling system',
        'Create exam-period support protocols',
        'Train peer support volunteers'
      ],
      estimatedCost: 450000,
      timeline: '3 months',
      affectedStudents: 2847
    },
    {
      title: 'Implement Proactive Mental Health Screening',
      description: `Only 23% of students with mental health concerns are currently identified through self-referral. Proactive screening could identify at-risk students earlier and prevent crisis situations.`,
      category: 'intervention',
      priority: 'medium',
      impact: [
        'Early identification of 60% more at-risk students',
        'Reduce crisis interventions by 30%',
        'Improve overall campus mental health climate',
        'Better academic retention rates'
      ],
      steps: [
        'Develop screening questionnaire protocol',
        'Train faculty for early identification',
        'Create referral pathway system',
        'Implement follow-up procedures'
      ],
      estimatedCost: 125000,
      timeline: '6 months',
      affectedStudents: 8500
    },
    {
      title: 'Expand Peer Support Program',
      description: `Peer support shows 85% satisfaction rate but only covers 15% of student population. Expansion could provide culturally-appropriate support and reduce professional counselor load.`,
      category: 'training',
      priority: 'medium',
      impact: [
        'Reach 45% of student population',
        'Reduce professional counselor load by 25%',
        'Improve cultural competency of support',
        'Create sustainable support network'
      ],
      steps: [
        'Recruit and train 50 additional peer volunteers',
        'Develop advanced training modules',
        'Create supervision structure',
        'Implement quality assurance measures'
      ],
      estimatedCost: 275000,
      timeline: '4 months',
      affectedStudents: 3800
    }
  ];

  const realTimeData = {
    activeUsers: 342,
    activeSessions: 28,
    crisisAlerts: 2,
    counselors: [
      { name: 'Dr. Priya Sharma', specialization: 'Anxiety & Depression', status: 'online', currentLoad: 6, maxLoad: 8 },
      { name: 'Dr. Rajesh Kumar', specialization: 'Academic Stress', status: 'busy', currentLoad: 8, maxLoad: 8 },
      { name: 'Dr. Meera Patel', specialization: 'Crisis Intervention', status: 'online', currentLoad: 3, maxLoad: 6 },
      { name: 'Dr. Arjun Singh', specialization: 'Peer Counseling', status: 'offline', currentLoad: 0, maxLoad: 8 }
    ],
    recentAlerts: [
      {
        level: 'critical',
        message: 'Crisis escalation detected',
        details: 'Student expressing suicidal ideation - immediate intervention required',
        timestamp: '2 minutes ago'
      },
      {
        level: 'warning',
        message: 'High stress pattern identified',
        details: 'Engineering department showing 35% increase in anxiety reports',
        timestamp: '15 minutes ago'
      },
      {
        level: 'info',
        message: 'System maintenance scheduled',
        details: 'Planned maintenance window: Tonight 11 PM - 2 AM',
        timestamp: '1 hour ago'
      }
    ]
  };

  const comparativeData = {
    utilization: [
      { period: 'Q1 2024', ourInstitution: 78, peerAverage: 65, nationalAverage: 58 },
      { period: 'Q2 2024', ourInstitution: 82, peerAverage: 68, nationalAverage: 61 },
      { period: 'Q3 2024', ourInstitution: 85, peerAverage: 71, nationalAverage: 63 },
      { period: 'Q4 2024', ourInstitution: 88, peerAverage: 73, nationalAverage: 65 }
    ],
    satisfaction: [
      { period: 'Q1 2024', ourInstitution: 91, peerAverage: 87, nationalAverage: 84 },
      { period: 'Q2 2024', ourInstitution: 93, peerAverage: 88, nationalAverage: 85 },
      { period: 'Q3 2024', ourInstitution: 94, peerAverage: 89, nationalAverage: 86 },
      { period: 'Q4 2024', ourInstitution: 94, peerAverage: 90, nationalAverage: 87 }
    ],
    outcomes: [
      { period: 'Q1 2024', ourInstitution: 76, peerAverage: 72, nationalAverage: 68 },
      { period: 'Q2 2024', ourInstitution: 79, peerAverage: 74, nationalAverage: 70 },
      { period: 'Q3 2024', ourInstitution: 81, peerAverage: 75, nationalAverage: 71 },
      { period: 'Q4 2024', ourInstitution: 83, peerAverage: 77, nationalAverage: 73 }
    ],
    engagement: [
      { period: 'Q1 2024', ourInstitution: 67, peerAverage: 62, nationalAverage: 58 },
      { period: 'Q2 2024', ourInstitution: 71, peerAverage: 64, nationalAverage: 60 },
      { period: 'Q3 2024', ourInstitution: 74, peerAverage: 66, nationalAverage: 62 },
      { period: 'Q4 2024', ourInstitution: 77, peerAverage: 68, nationalAverage: 64 }
    ],
    summary: {
      abovePeerCount: 12,
      needsAttentionCount: 3,
      topPerformerCount: 8
    }
  };

  const timeRanges = [
    { key: 'weekly', label: 'Last 7 Days' },
    { key: 'monthly', label: 'Last 30 Days' },
    { key: 'quarterly', label: 'Last 3 Months' },
    { key: 'yearly', label: 'Last 12 Months' }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleExport = async (config) => {
    console.log('Exporting with config:', config);
    // Simulate export process
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  };

  useEffect(() => {
    // Auto-refresh data every 5 minutes
    const interval = setInterval(() => {
      // Refresh real-time data silently
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 pt-16 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-text-primary mb-2">
                Admin Analytics Dashboard
              </h1>
              <p className="font-body text-text-secondary breathing-space">
                Comprehensive insights for institutional mental health policy development and intervention planning
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Time Range Selector */}
              <div className="flex items-center space-x-2">
                {timeRanges?.map((range) => (
                  <button
                    key={range?.key}
                    onClick={() => setSelectedTimeRange(range?.key)}
                    className={`px-3 py-2 rounded-therapeutic text-sm font-body transition-all duration-200 ${
                      selectedTimeRange === range?.key
                        ? 'bg-primary text-primary-foreground shadow-gentle'
                        : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
                    }`}
                  >
                    {range?.label}
                  </button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
                loading={refreshing}
              >
                <Icon name="RefreshCw" size={16} className="mr-2" />
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
            </div>
          </div>

          {/* Privacy Indicator */}
          <div className="mb-6">
            <PrivacyIndicator 
              level="admin" 
              position="inline" 
              showDetails={true}
            />
          </div>

          {/* Metrics Overview */}
          <MetricsOverview metrics={metricsData} />

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <UsageChart 
              data={usageChartData} 
              type="bar" 
              title="Monthly Service Utilization" 
              height={350}
            />
            <UsageChart 
              data={stressLevelData} 
              type="line" 
              title="Average Stress Levels Trend" 
              height={350}
            />
          </div>

          {/* Demographics and Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DemographicsBreakdown 
              data={demographicsData} 
              title="Department-wise Distribution" 
            />
            <DemographicsBreakdown 
              data={concernCategoriesData} 
              title="Common Concern Categories" 
            />
          </div>

          {/* Real-time Monitoring */}
          <div className="mb-8">
            <RealTimeMonitoring data={realTimeData} />
          </div>

          {/* Comparative Analytics */}
          <div className="mb-8">
            <ComparativeAnalytics data={comparativeData} />
          </div>

          {/* Policy Recommendations */}
          <div className="mb-8">
            <PolicyRecommendations recommendations={policyRecommendations} />
          </div>

          {/* Export Tools */}
          <div className="mb-8">
            <ExportTools onExport={handleExport} />
          </div>

          {/* Footer Information */}
          <div className="mt-12 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm text-text-secondary">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={14} />
                  <span>All data anonymized and HIPAA compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} />
                  <span>Last updated: {new Date()?.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span>© {new Date()?.getFullYear()} MindBridge Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;