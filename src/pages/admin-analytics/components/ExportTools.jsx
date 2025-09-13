import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportTools = ({ onExport }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { key: 'pdf', label: 'PDF Report', icon: 'FileText', description: 'Formatted report for presentations' },
    { key: 'excel', label: 'Excel Spreadsheet', icon: 'Table', description: 'Raw data for analysis' },
    { key: 'csv', label: 'CSV Data', icon: 'Database', description: 'Comma-separated values' },
    { key: 'json', label: 'JSON Data', icon: 'Code', description: 'Structured data format' }
  ];

  const timePeriods = [
    { key: 'weekly', label: 'Weekly Report' },
    { key: 'monthly', label: 'Monthly Report' },
    { key: 'quarterly', label: 'Quarterly Report' },
    { key: 'yearly', label: 'Annual Report' },
    { key: 'custom', label: 'Custom Range' }
  ];

  const reportSections = [
    { key: 'overview', label: 'Executive Summary', checked: true },
    { key: 'metrics', label: 'Key Metrics', checked: true },
    { key: 'demographics', label: 'Demographics Breakdown', checked: true },
    { key: 'trends', label: 'Usage Trends', checked: true },
    { key: 'recommendations', label: 'Policy Recommendations', checked: false },
    { key: 'comparative', label: 'Comparative Analysis', checked: false },
    { key: 'detailed', label: 'Detailed Analytics', checked: false }
  ];

  const [selectedSections, setSelectedSections] = useState(
    reportSections?.reduce((acc, section) => ({
      ...acc,
      [section?.key]: section?.checked
    }), {})
  );

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportConfig = {
      format: selectedFormat,
      period: selectedPeriod,
      sections: Object.keys(selectedSections)?.filter(key => selectedSections?.[key]),
      timestamp: new Date()?.toISOString()
    };

    try {
      await onExport?.(exportConfig);
      // Simulate export delay
      setTimeout(() => {
        setIsExporting(false);
      }, 2000);
    } catch (error) {
      console.error('Export failed:', error);
      setIsExporting(false);
    }
  };

  const toggleSection = (sectionKey) => {
    setSelectedSections(prev => ({
      ...prev,
      [sectionKey]: !prev?.[sectionKey]
    }));
  };

  return (
    <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Export Analytics
        </h3>
      </div>
      <div className="space-y-6">
        {/* Export Format Selection */}
        <div>
          <h4 className="font-heading font-medium text-base text-text-primary mb-3">
            Export Format
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exportFormats?.map((format) => (
              <button
                key={format?.key}
                onClick={() => setSelectedFormat(format?.key)}
                className={`flex items-start space-x-3 p-4 rounded-therapeutic border transition-all duration-200 text-left ${
                  selectedFormat === format?.key
                    ? 'border-primary bg-primary/5 shadow-gentle'
                    : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <Icon 
                  name={format?.icon} 
                  size={20} 
                  className={selectedFormat === format?.key ? 'text-primary' : 'text-text-secondary'} 
                />
                <div className="flex-1">
                  <div className={`font-body font-medium text-sm ${
                    selectedFormat === format?.key ? 'text-primary' : 'text-text-primary'
                  }`}>
                    {format?.label}
                  </div>
                  <div className="font-body text-xs text-text-secondary mt-1">
                    {format?.description}
                  </div>
                </div>
                {selectedFormat === format?.key && (
                  <Icon name="CheckCircle" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Time Period Selection */}
        <div>
          <h4 className="font-heading font-medium text-base text-text-primary mb-3">
            Report Period
          </h4>
          <div className="flex flex-wrap gap-2">
            {timePeriods?.map((period) => (
              <button
                key={period?.key}
                onClick={() => setSelectedPeriod(period?.key)}
                className={`px-4 py-2 rounded-therapeutic text-sm font-body transition-all duration-200 ${
                  selectedPeriod === period?.key
                    ? 'bg-primary text-primary-foreground shadow-gentle'
                    : 'bg-muted text-text-secondary hover:bg-muted/80 hover:text-text-primary'
                }`}
              >
                {period?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Report Sections */}
        <div>
          <h4 className="font-heading font-medium text-base text-text-primary mb-3">
            Include Sections
          </h4>
          <div className="space-y-2">
            {reportSections?.map((section) => (
              <label
                key={section?.key}
                className="flex items-center space-x-3 p-3 rounded-therapeutic hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedSections?.[section?.key]}
                  onChange={() => toggleSection(section?.key)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
                />
                <span className="font-body text-sm text-text-primary flex-1">
                  {section?.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Export Actions */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              <Icon name="Info" size={14} className="inline mr-1" />
              Reports are generated with anonymized data only
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Icon name="Eye" size={14} className="mr-2" />
                Preview
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleExport}
                disabled={isExporting}
                loading={isExporting}
              >
                <Icon name="Download" size={14} className="mr-2" />
                {isExporting ? 'Generating...' : 'Export Report'}
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Exports */}
        <div className="pt-4 border-t border-border">
          <h4 className="font-heading font-medium text-base text-text-primary mb-3">
            Recent Exports
          </h4>
          <div className="space-y-2">
            {[
              { name: 'Monthly Analytics Report - December 2024', format: 'PDF', date: '2025-01-05', size: '2.4 MB' },
              { name: 'Quarterly Data Export - Q4 2024', format: 'Excel', date: '2025-01-03', size: '1.8 MB' },
              { name: 'Annual Summary Report - 2024', format: 'PDF', date: '2025-01-01', size: '5.2 MB' }
            ]?.map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-therapeutic">
                <div className="flex items-center space-x-3">
                  <Icon name="FileText" size={16} className="text-text-secondary" />
                  <div>
                    <div className="font-body text-sm text-text-primary">{export_?.name}</div>
                    <div className="font-body text-xs text-text-secondary">
                      {export_?.format} • {export_?.size} • {export_?.date}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Icon name="Download" size={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportTools;