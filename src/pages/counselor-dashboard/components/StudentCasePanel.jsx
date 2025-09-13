import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentCasePanel = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const activeCases = [
    {
      id: "STU-2024-001",
      initials: "A.K.",
      age: 20,
      year: "2nd Year",
      department: "Computer Science",
      status: "active",
      priority: "medium",
      lastSession: "2025-01-08",
      nextSession: "2025-01-15",
      sessionsCount: 4,
      primaryConcerns: ["Anxiety", "Academic Stress"],
      riskLevel: "low",
      progress: "improving",
      assessmentScores: {
        phq9: 8,
        gad7: 12,
        lastUpdated: "2025-01-05"
      },
      recentNotes: `Student showing positive response to CBT techniques. Anxiety levels decreased from initial assessment. Implementing stress management strategies effectively.`
    },
    {
      id: "STU-2024-015",
      initials: "R.M.",
      age: 19,
      year: "1st Year",
      department: "Psychology",
      status: "crisis",
      priority: "high",
      lastSession: "2025-01-09",
      nextSession: "2025-01-10",
      sessionsCount: 2,
      primaryConcerns: ["Depression", "Social Isolation"],
      riskLevel: "moderate",
      progress: "monitoring",
      assessmentScores: {
        phq9: 16,
        gad7: 8,
        lastUpdated: "2025-01-09"
      },
      recentNotes: `Crisis intervention initiated. Student expressing suicidal ideation. Safety plan established. Family contacted with consent. Requires daily check-ins.`
    },
    {
      id: "STU-2024-032",
      initials: "S.P.",
      age: 21,
      year: "3rd Year",
      department: "Engineering",
      status: "active",
      priority: "low",
      lastSession: "2025-01-06",
      nextSession: "2025-01-13",
      sessionsCount: 8,
      primaryConcerns: ["Career Anxiety", "Perfectionism"],
      riskLevel: "low",
      progress: "stable",
      assessmentScores: {
        phq9: 5,
        gad7: 9,
        lastUpdated: "2025-01-06"
      },
      recentNotes: `Consistent progress in managing perfectionist tendencies. Career counseling integrated with therapy. Student actively participating in peer support groups.`
    },
    {
      id: "STU-2024-008",
      initials: "M.S.",
      age: 22,
      year: "4th Year",
      department: "Commerce",
      status: "followup",
      priority: "medium",
      lastSession: "2025-01-04",
      nextSession: "2025-01-11",
      sessionsCount: 12,
      primaryConcerns: ["Exam Anxiety", "Sleep Issues"],
      riskLevel: "low",
      progress: "improving",
      assessmentScores: {
        phq9: 6,
        gad7: 7,
        lastUpdated: "2025-01-04"
      },
      recentNotes: `Sleep hygiene improvements noted. Exam anxiety management techniques showing effectiveness. Considering session frequency reduction.`
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'crisis': return 'bg-error text-error-foreground';
      case 'active': return 'bg-primary text-primary-foreground';
      case 'followup': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-error';
      case 'moderate': return 'text-warning';
      default: return 'text-success';
    }
  };

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'improving': return 'text-success';
      case 'stable': return 'text-primary';
      case 'monitoring': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const filteredCases = activeCases?.filter(caseItem => {
    if (filterStatus === 'all') return true;
    return caseItem?.status === filterStatus;
  });

  return (
    <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Active Cases
            </h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              {filteredCases?.length} students under care
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Cases</option>
              <option value="crisis">Crisis</option>
              <option value="active">Active</option>
              <option value="followup">Follow-up</option>
            </select>
            
            <Button variant="outline" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredCases?.map((caseItem) => (
          <div
            key={caseItem?.id}
            className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
              selectedCase?.id === caseItem?.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => setSelectedCase(selectedCase?.id === caseItem?.id ? null : caseItem)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-heading font-semibold text-primary">
                      {caseItem?.initials}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-heading font-medium text-text-primary">
                        Case {caseItem?.id}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(caseItem?.status)}`}>
                        {caseItem?.status}
                      </span>
                    </div>
                    <p className="text-sm font-body text-text-secondary">
                      {caseItem?.year} • {caseItem?.department}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-xs font-body text-text-secondary">Risk Level</span>
                    <p className={`text-sm font-medium ${getRiskColor(caseItem?.riskLevel)}`}>
                      {caseItem?.riskLevel}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-body text-text-secondary">Progress</span>
                    <p className={`text-sm font-medium ${getProgressColor(caseItem?.progress)}`}>
                      {caseItem?.progress}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-body text-text-secondary">Sessions</span>
                    <p className="text-sm font-medium text-text-primary">
                      {caseItem?.sessionsCount}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-body text-text-secondary">Next Session</span>
                    <p className="text-sm font-medium text-text-primary">
                      {new Date(caseItem.nextSession)?.toLocaleDateString('en-IN', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {caseItem?.primaryConcerns?.map((concern, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                    >
                      {concern}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="MessageCircle" size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="FileText" size={14} />
                </Button>
                <Icon 
                  name={selectedCase?.id === caseItem?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </div>
            </div>

            {/* Expanded Details */}
            {selectedCase?.id === caseItem?.id && (
              <div className="mt-4 pt-4 border-t border-border animate-gentle-fade">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-heading font-medium text-sm text-text-primary mb-3">
                      Assessment Scores
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-body text-text-secondary">PHQ-9</span>
                        <span className="text-sm font-medium text-text-primary">
                          {caseItem?.assessmentScores?.phq9}/27
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-body text-text-secondary">GAD-7</span>
                        <span className="text-sm font-medium text-text-primary">
                          {caseItem?.assessmentScores?.gad7}/21
                        </span>
                      </div>
                      <p className="text-xs font-body text-text-secondary mt-2">
                        Last updated: {new Date(caseItem.assessmentScores.lastUpdated)?.toLocaleDateString('en-IN')}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-heading font-medium text-sm text-text-primary mb-3">
                      Recent Notes
                    </h4>
                    <p className="text-sm font-body text-text-secondary breathing-space">
                      {caseItem?.recentNotes}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="FileText" size={14} className="mr-2" />
                      View Notes
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="BarChart3" size={14} className="mr-2" />
                      Progress
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="default" size="sm">
                      <Icon name="MessageCircle" size={14} className="mr-2" />
                      Message
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Icon name="Calendar" size={14} className="mr-2" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Summary Footer */}
      <div className="px-6 py-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm font-body">
          <div className="flex items-center space-x-4 text-text-secondary">
            <span>Crisis: {activeCases?.filter(c => c?.status === 'crisis')?.length}</span>
            <span>•</span>
            <span>Active: {activeCases?.filter(c => c?.status === 'active')?.length}</span>
            <span>•</span>
            <span>Follow-up: {activeCases?.filter(c => c?.status === 'followup')?.length}</span>
          </div>
          
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-2" />
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentCasePanel;