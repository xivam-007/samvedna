import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionNotesPanel = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const sessionNotes = [
    {
      id: 1,
      studentId: "STU-2024-001",
      studentInitials: "A.K.",
      sessionDate: "2025-01-08",
      sessionType: "Individual Therapy",
      duration: 60,
      status: "completed",
      keyTopics: ["Anxiety Management", "Breathing Techniques", "Academic Stress"],
      mood: "anxious",
      progress: "improving",
      nextSteps: "Practice breathing exercises daily, schedule follow-up in 1 week",
      riskAssessment: "low",
      notes: `Student presented with moderate anxiety symptoms related to upcoming exams. Discussed progressive muscle relaxation techniques and implemented breathing exercises during session.\n\nStudent responded well to CBT approach for challenging catastrophic thinking patterns. Homework assigned: daily mood tracking and breathing practice.\n\nNo immediate safety concerns. Student has good support system and coping strategies are developing effectively.`
    },
    {
      id: 2,
      studentId: "STU-2024-015",
      studentInitials: "R.M.",
      sessionDate: "2025-01-09",
      sessionType: "Crisis Intervention",
      duration: 90,
      status: "urgent_followup",
      keyTopics: ["Suicidal Ideation", "Safety Planning", "Family Support"],
      mood: "depressed",
      progress: "monitoring",
      nextSteps: "Daily check-ins for 1 week, family meeting scheduled, psychiatrist referral",
      riskAssessment: "moderate",
      notes: `Emergency session following crisis alert from AI chatbot. Student expressed passive suicidal ideation without specific plan.\n\nSafety plan developed collaboratively. Student agreed to remove means and contact crisis hotline if thoughts intensify. Family contacted with student consent.\n\nImmediate referral to psychiatrist for medication evaluation. Daily check-ins scheduled. Student demonstrated good engagement despite distress.`
    },
    {
      id: 3,
      studentId: "STU-2024-032",
      studentInitials: "S.P.",
      sessionDate: "2025-01-06",
      sessionType: "Group Therapy",
      duration: 90,
      status: "completed",
      keyTopics: ["Peer Support", "Social Anxiety", "Communication Skills"],
      mood: "neutral",
      progress: "stable",
      nextSteps: "Continue group participation, practice social skills exercises",
      riskAssessment: "low",
      notes: `Group session focused on social anxiety and communication skills. Student participated actively and shared experiences with peers.\n\nDemonstrated improved confidence in group setting. Peer feedback was positive and supportive. Student volunteered to co-facilitate next session.\n\nSocial skills homework assigned. Progress in overcoming perfectionist tendencies noted.`
    },
    {
      id: 4,
      studentId: "STU-2024-008",
      studentInitials: "M.S.",
      sessionDate: "2025-01-04",
      sessionType: "Assessment",
      duration: 75,
      status: "completed",
      keyTopics: ["Sleep Assessment", "Anxiety Screening", "Treatment Planning"],
      mood: "tired",
      progress: "improving",
      nextSteps: "Sleep hygiene implementation, reduce session frequency to bi-weekly",
      riskAssessment: "low",
      notes: `Comprehensive assessment session focusing on sleep patterns and anxiety levels. PHQ-9 score decreased from 12 to 6, GAD-7 from 14 to 7.\n\nSleep hygiene improvements noted. Student implementing recommended strategies effectively. Academic performance stabilizing.\n\nRecommended reducing session frequency to bi-weekly. Student agrees and feels confident in maintaining progress.`
    }
  ];

  const getMoodColor = (mood) => {
    switch (mood) {
      case 'depressed': return 'text-error';
      case 'anxious': return 'text-warning';
      case 'tired': return 'text-accent';
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

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'bg-error text-error-foreground';
      case 'moderate': return 'bg-warning text-warning-foreground';
      default: return 'bg-success text-success-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'urgent_followup': return 'bg-error text-error-foreground';
      case 'completed': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredNotes = sessionNotes?.filter(note => {
    if (filterType === 'all') return true;
    return note?.sessionType?.toLowerCase()?.includes(filterType?.toLowerCase()) ||
           note?.status === filterType;
  });

  return (
    <div className="bg-card rounded-therapeutic border border-border shadow-therapeutic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              Session Notes
            </h2>
            <p className="text-sm font-body text-text-secondary mt-1">
              Secure documentation and progress tracking
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm font-body bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">All Sessions</option>
              <option value="individual">Individual</option>
              <option value="group">Group</option>
              <option value="crisis">Crisis</option>
              <option value="assessment">Assessment</option>
            </select>
            
            <Button variant="outline" size="sm">
              <Icon name="Search" size={16} className="mr-2" />
              Search
            </Button>
            <Button variant="default" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              New Note
            </Button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto divide-y divide-border">
        {filteredNotes?.map((note) => (
          <div
            key={note?.id}
            className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
              selectedNote?.id === note?.id ? 'bg-primary/5 border-l-4 border-l-primary' : ''
            }`}
            onClick={() => setSelectedNote(selectedNote?.id === note?.id ? null : note)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-xs font-heading font-semibold text-primary">
                      {note?.studentInitials}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-heading font-medium text-text-primary">
                        {note?.sessionType}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(note?.status)}`}>
                        {note?.status?.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm font-body text-text-secondary">
                      {new Date(note.sessionDate)?.toLocaleDateString('en-IN', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })} • {note?.duration} minutes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                  <div>
                    <span className="text-xs font-body text-text-secondary">Mood</span>
                    <p className={`text-sm font-medium capitalize ${getMoodColor(note?.mood)}`}>
                      {note?.mood}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-body text-text-secondary">Progress</span>
                    <p className={`text-sm font-medium capitalize ${getProgressColor(note?.progress)}`}>
                      {note?.progress}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-body text-text-secondary">Risk Level</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(note?.riskAssessment)}`}>
                      {note?.riskAssessment}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-body text-text-secondary">Case ID</span>
                    <p className="text-sm font-medium text-text-primary">
                      {note?.studentId}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {note?.keyTopics?.slice(0, 3)?.map((topic, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                  {note?.keyTopics?.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{note?.keyTopics?.length - 3} more
                    </span>
                  )}
                </div>

                <p className="text-sm font-body text-text-secondary line-clamp-2 breathing-space">
                  {note?.nextSteps}
                </p>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Edit" size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Icon name="Share" size={14} />
                </Button>
                <Icon 
                  name={selectedNote?.id === note?.id ? "ChevronUp" : "ChevronDown"} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </div>
            </div>

            {/* Expanded Note View */}
            {selectedNote?.id === note?.id && (
              <div className="mt-4 pt-4 border-t border-border animate-gentle-fade">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
                  <div>
                    <h4 className="font-heading font-medium text-sm text-text-primary mb-3">
                      Session Notes
                    </h4>
                    <div className="bg-muted/30 rounded-lg p-4 max-h-32 overflow-y-auto">
                      <p className="text-sm font-body text-text-primary breathing-space whitespace-pre-line">
                        {note?.notes}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-heading font-medium text-sm text-text-primary mb-3">
                      Next Steps & Follow-up
                    </h4>
                    <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
                      <p className="text-sm font-body text-text-primary breathing-space">
                        {note?.nextSteps}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={14} className="mr-2" />
                      Export
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Copy" size={14} className="mr-2" />
                      Duplicate
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="default" size="sm">
                      <Icon name="Edit" size={14} className="mr-2" />
                      Edit Note
                    </Button>
                    <Button variant="secondary" size="sm">
                      <Icon name="Calendar" size={14} className="mr-2" />
                      Schedule Follow-up
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm font-body text-text-secondary">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Notes encrypted & secure</span>
            </div>
            <span>•</span>
            <span>Last backup: 2 hours ago</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Archive" size={14} className="mr-2" />
              Archive Old
            </Button>
            <Button variant="default" size="sm">
              <Icon name="FileText" size={14} className="mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionNotesPanel;