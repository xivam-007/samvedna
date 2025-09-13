import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PolicyRecommendations = ({ recommendations }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-text-secondary bg-muted border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Clock';
      case 'low': return 'CheckCircle';
      default: return 'Info';
    }
  };

  const getImpactIcon = (category) => {
    switch (category) {
      case 'resource': return 'Package';
      case 'policy': return 'FileText';
      case 'intervention': return 'Target';
      case 'training': return 'GraduationCap';
      default: return 'Lightbulb';
    }
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-lg text-text-primary">
            Policy Recommendations
          </h3>
        </div>
        <Button variant="outline" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Export Report
        </Button>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec, index) => (
          <div key={index} className="border border-border rounded-therapeutic p-4 hover:shadow-gentle transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex-shrink-0 mt-1">
                  <Icon name={getImpactIcon(rec?.category)} size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-heading font-semibold text-base text-text-primary mb-2">
                    {rec?.title}
                  </h4>
                  <p className="font-body text-sm text-text-secondary breathing-space">
                    {rec?.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                <div className={`px-3 py-1 rounded-full border text-xs font-medium ${getPriorityColor(rec?.priority)}`}>
                  <Icon name={getPriorityIcon(rec?.priority)} size={12} className="mr-1 inline" />
                  {rec?.priority?.charAt(0)?.toUpperCase() + rec?.priority?.slice(1)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                >
                  <Icon name={expandedCard === index ? 'ChevronUp' : 'ChevronDown'} size={16} />
                </Button>
              </div>
            </div>

            {expandedCard === index && (
              <div className="mt-4 pt-4 border-t border-border animate-gentle-fade">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-heading font-medium text-sm text-text-primary mb-3">
                      Expected Impact
                    </h5>
                    <div className="space-y-2">
                      {rec?.impact?.map((impact, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Icon name="ArrowRight" size={12} className="text-success" />
                          <span className="font-body text-sm text-text-secondary">{impact}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-heading font-medium text-sm text-text-primary mb-3">
                      Implementation Steps
                    </h5>
                    <div className="space-y-2">
                      {rec?.steps?.map((step, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-medium">{idx + 1}</span>
                          </div>
                          <span className="font-body text-sm text-text-secondary">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between p-3 bg-muted rounded-therapeutic">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="font-heading font-semibold text-sm text-text-primary">
                        ₹{rec?.estimatedCost?.toLocaleString('en-IN')}
                      </div>
                      <div className="font-body text-xs text-text-secondary">Estimated Cost</div>
                    </div>
                    <div className="text-center">
                      <div className="font-heading font-semibold text-sm text-text-primary">
                        {rec?.timeline}
                      </div>
                      <div className="font-body text-xs text-text-secondary">Timeline</div>
                    </div>
                    <div className="text-center">
                      <div className="font-heading font-semibold text-sm text-text-primary">
                        {rec?.affectedStudents?.toLocaleString('en-IN')}
                      </div>
                      <div className="font-body text-xs text-text-secondary">Students Affected</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Icon name="MessageSquare" size={14} className="mr-2" />
                      Discuss
                    </Button>
                    <Button variant="default" size="sm">
                      <Icon name="CheckCircle" size={14} className="mr-2" />
                      Approve
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PolicyRecommendations;