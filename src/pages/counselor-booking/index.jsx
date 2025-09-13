import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Header from '../../components/ui/Header';
import CrisisEscalation from '../../components/ui/CrisisEscalation';
import PrivacyIndicator from '../../components/ui/PrivacyIndicator';

// Import components
import CounselorCard from './components/CounselorCard';
import BookingCalendar from './components/BookingCalendar';
import BookingForm from './components/BookingForm';
import CounselorProfile from './components/CounselorProfile';
import BookingConfirmation from './components/BookingConfirmation';
import EmergencyBooking from './components/EmergencyBooking';

const CounselorBooking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('browse'); // browse, calendar, form, confirmation
  const [selectedCounselor, setSelectedCounselor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingData, setBookingData] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showEmergencyBooking, setShowEmergencyBooking] = useState(false);
  const [showCrisisEscalation, setShowCrisisEscalation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState({
    specialization: '',
    language: '',
    availability: 'all',
    sessionType: '',
    sortBy: 'rating'
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock counselors data
  const counselors = [
    {
      id: 1,
      name: "Priya Sharma",
      qualification: "M.Phil Clinical Psychology, Ph.D. Counseling",
      experience: 8,
      specializations: ["Anxiety & Depression", "Academic Stress", "Relationship Issues"],
      languages: ["English", "Hindi", "Marathi"],
      rating: 4.8,
      reviewCount: 127,
      sessionFee: 800,
      isOnline: true,
      nextAvailable: "Today 2:00 PM",
      workingHours: "9:00 AM - 7:00 PM",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      about: `Dr. Priya Sharma is a licensed clinical psychologist with over 8 years of experience in student mental health. She specializes in anxiety disorders, depression, and academic stress management. Dr. Sharma has worked extensively with college students from rural and semi-urban backgrounds, understanding the unique challenges they face.\n\nShe believes in creating a safe, non-judgmental space where students can explore their thoughts and feelings freely. Her approach combines evidence-based therapies with culturally sensitive practices.`,
      approach: `Dr. Sharma uses a combination of Cognitive Behavioral Therapy (CBT) and mindfulness-based interventions. She incorporates culturally relevant examples and understands the family dynamics common in Indian households. Her sessions focus on practical coping strategies that students can implement in their daily lives.`,
      education: [
        { degree: "Ph.D. in Counseling Psychology", institution: "University of Mumbai", year: "2018" },
        { degree: "M.Phil Clinical Psychology", institution: "NIMHANS, Bangalore", year: "2015" },
        { degree: "M.A. Psychology", institution: "Delhi University", year: "2013" }
      ],
      recentReviews: [
        { rating: 5, comment: "Dr. Sharma helped me overcome my exam anxiety. Her techniques really work!", date: "2 weeks ago" },
        { rating: 5, comment: "Very understanding and patient. Made me feel comfortable discussing personal issues.", date: "1 month ago" },
        { rating: 4, comment: "Good counselor, practical advice. Sessions were helpful for my depression.", date: "1 month ago" }
      ]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      qualification: "M.A. Psychology, Certified Family Therapist",
      experience: 12,
      specializations: ["Career Counseling", "Family Issues", "Academic Stress"],
      languages: ["English", "Hindi", "Bengali"],
      rating: 4.7,
      reviewCount: 203,
      sessionFee: 1000,
      isOnline: true,
      nextAvailable: "Tomorrow 10:00 AM",
      workingHours: "8:00 AM - 6:00 PM",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      about: `Dr. Rajesh Kumar brings over 12 years of experience in counseling psychology with a special focus on career guidance and family therapy. He has helped hundreds of students navigate career confusion, family pressure, and academic challenges.\n\nDr. Kumar understands the pressure students face from family expectations and societal norms. He works with students to find their own path while maintaining family relationships.`,
      approach: `Dr. Kumar uses solution-focused brief therapy combined with career assessment tools. He helps students identify their strengths, interests, and values to make informed career decisions. His family therapy background helps him address conflicts between personal aspirations and family expectations.`,
      education: [
        { degree: "M.A. Psychology", institution: "Jadavpur University", year: "2011" },
        { degree: "Diploma in Family Therapy", institution: "TISS Mumbai", year: "2013" },
        { degree: "Certificate in Career Counseling", institution: "NCERT", year: "2014" }
      ],
      recentReviews: [
        { rating: 5, comment: "Helped me choose the right career path despite family pressure. Very grateful!", date: "3 weeks ago" },
        { rating: 4, comment: "Good at understanding family dynamics. Practical solutions for career confusion.", date: "1 month ago" },
        { rating: 5, comment: "Patient listener, gave me confidence to pursue my dreams.", date: "2 months ago" }
      ]
    },
    {
      id: 3,
      name: "Anita Desai",
      qualification: "M.Phil Clinical Psychology, Trauma Specialist",
      experience: 6,
      specializations: ["Trauma & PTSD", "Anxiety & Depression", "Relationship Issues"],
      languages: ["English", "Hindi", "Gujarati"],
      rating: 4.9,
      reviewCount: 89,
      sessionFee: 900,
      isOnline: false,
      nextAvailable: "Today 4:00 PM",
      workingHours: "11:00 AM - 8:00 PM",
      avatar: "https://images.unsplash.com/photo-1594824388853-d0c2e5e1b9e5?w=400&h=400&fit=crop&crop=face",
      about: `Dr. Anita Desai is a trauma specialist with 6 years of focused experience in helping students recover from traumatic experiences. She has extensive training in EMDR and trauma-focused cognitive behavioral therapy.\n\nDr. Desai creates a particularly safe environment for students who have experienced trauma, abuse, or significant life stressors. She understands the impact of trauma on academic performance and relationships.`,
      approach: `Dr. Desai specializes in trauma-informed care using EMDR (Eye Movement Desensitization and Reprocessing) and trauma-focused CBT. She helps students process difficult experiences while building resilience and coping skills. Her approach is gentle and patient-centered.`,
      education: [
        { degree: "M.Phil Clinical Psychology", institution: "Christ University, Bangalore", year: "2018" },
        { degree: "Certificate in EMDR Therapy", institution: "EMDR International Association", year: "2019" },
        { degree: "Trauma-Focused CBT Training", institution: "Beck Institute", year: "2020" }
      ],
      recentReviews: [
        { rating: 5, comment: "Dr. Desai helped me heal from a traumatic experience. Her approach is very gentle.", date: "2 weeks ago" },
        { rating: 5, comment: "Excellent trauma therapist. Made me feel safe to share difficult experiences.", date: "3 weeks ago" },
        { rating: 5, comment: "EMDR sessions were life-changing. Highly recommend for trauma recovery.", date: "1 month ago" }
      ]
    },
    {
      id: 4,
      name: "Vikram Singh",
      qualification: "M.A. Psychology, Addiction Counselor",
      experience: 10,
      specializations: ["Addiction Recovery", "Anxiety & Depression", "Academic Stress"],
      languages: ["English", "Hindi", "Punjabi"],
      rating: 4.6,
      reviewCount: 156,
      sessionFee: 750,
      isOnline: true,
      nextAvailable: "Today 6:00 PM",
      workingHours: "2:00 PM - 10:00 PM",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      about: `Dr. Vikram Singh has 10 years of experience in addiction counseling and mental health support. He specializes in helping students overcome substance abuse, behavioral addictions, and related mental health challenges.\n\nDr. Singh understands the stigma around addiction and creates a non-judgmental environment for students to seek help. He has experience with various forms of addiction common among college students.`,
      approach: `Dr. Singh uses motivational interviewing and cognitive-behavioral approaches for addiction recovery. He focuses on harm reduction, relapse prevention, and building healthy coping mechanisms. His approach addresses both the addiction and underlying mental health issues.`,
      education: [
        { degree: "M.A. Psychology", institution: "Punjab University", year: "2013" },
        { degree: "Certificate in Addiction Counseling", institution: "AIIMS Delhi", year: "2015" },
        { degree: "Motivational Interviewing Training", institution: "MINT", year: "2016" }
      ],
      recentReviews: [
        { rating: 5, comment: "Helped me overcome my addiction without judgment. Very supportive approach.", date: "1 week ago" },
        { rating: 4, comment: "Good understanding of addiction issues. Practical strategies for recovery.", date: "2 weeks ago" },
        { rating: 5, comment: "Non-judgmental and understanding. Made recovery feel possible.", date: "3 weeks ago" }
      ]
    }
  ];

  const specializationOptions = [
    { value: '', label: 'All Specializations' },
    { value: 'anxiety', label: 'Anxiety & Depression' },
    { value: 'academic', label: 'Academic Stress' },
    { value: 'relationships', label: 'Relationship Issues' },
    { value: 'career', label: 'Career Counseling' },
    { value: 'trauma', label: 'Trauma & PTSD' },
    { value: 'addiction', label: 'Addiction Recovery' }
  ];

  const languageOptions = [
    { value: '', label: 'All Languages' },
    { value: 'english', label: 'English' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'punjabi', label: 'Punjabi' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'All Counselors' },
    { value: 'online', label: 'Available Now' },
    { value: 'today', label: 'Available Today' },
    { value: 'tomorrow', label: 'Available Tomorrow' }
  ];

  const sessionTypeOptions = [
    { value: '', label: 'All Session Types' },
    { value: 'video', label: 'Video Call' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'in-person', label: 'In-Person' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'experience', label: 'Most Experienced' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'availability', label: 'Available First' }
  ];

  // Filter and sort counselors
  const filteredCounselors = counselors?.filter(counselor => {
      if (searchQuery && !counselor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
          !counselor?.specializations?.some(spec => spec?.toLowerCase()?.includes(searchQuery?.toLowerCase()))) {
        return false;
      }
      
      if (filters?.specialization && !counselor?.specializations?.some(spec => 
        spec?.toLowerCase()?.includes(filters?.specialization))) {
        return false;
      }
      
      if (filters?.language && !counselor?.languages?.some(lang => 
        lang?.toLowerCase()?.includes(filters?.language))) {
        return false;
      }
      
      if (filters?.availability === 'online' && !counselor?.isOnline) {
        return false;
      }
      
      return true;
    })?.sort((a, b) => {
      switch (filters?.sortBy) {
        case 'rating':
          return b?.rating - a?.rating;
        case 'experience':
          return b?.experience - a?.experience;
        case 'price-low':
          return a?.sessionFee - b?.sessionFee;
        case 'price-high':
          return b?.sessionFee - a?.sessionFee;
        case 'availability':
          return b?.isOnline - a?.isOnline;
        default:
          return 0;
      }
    });

  // Handle counselor selection
  const handleBookAppointment = (counselor) => {
    setSelectedCounselor(counselor);
    setCurrentStep('calendar');
  };

  const handleViewProfile = (counselor) => {
    setSelectedCounselor(counselor);
    setShowProfile(true);
  };

  // Handle time slot selection
  const handleTimeSlotSelect = (slotData) => {
    setSelectedSlot(slotData);
    setCurrentStep('form');
  };

  // Handle booking submission
  const handleSubmitBooking = async (formData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBookingData(formData);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle emergency booking
  const handleEmergencyBooking = async (emergencyData) => {
    try {
      // Simulate emergency booking API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setShowEmergencyBooking(false);
      setShowCrisisEscalation(true);
    } catch (error) {
      console.error('Emergency booking failed:', error);
    }
  };

  // Handle crisis escalation
  const handleCrisisEscalation = (action) => {
    switch (action) {
      case 'hotline':
        window.open('tel:1800-XXX-XXXX');
        break;
      case 'chat': navigate('/ai-chatbot-interface');
        break;
      case 'booking':
        setShowEmergencyBooking(true);
        break;
      case 'peer': navigate('/peer-support-forum');
        break;
      default:
        setShowEmergencyBooking(true);
    }
    setShowCrisisEscalation(false);
  };

  // Reset to browse step
  const handleBackToBrowse = () => {
    setCurrentStep('browse');
    setSelectedCounselor(null);
    setSelectedSlot(null);
  };

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Check for crisis indicators
  useEffect(() => {
    const checkCrisisIndicators = () => {
      const crisisKeywords = ['suicide', 'self-harm', 'emergency', 'crisis'];
      if (crisisKeywords?.some(keyword => searchQuery?.toLowerCase()?.includes(keyword))) {
        setShowCrisisEscalation(true);
      }
    };

    if (searchQuery) {
      checkCrisisIndicators();
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-3xl text-text-primary mb-2">
                  Book a Counseling Session
                </h1>
                <p className="text-text-secondary font-body breathing-space">
                  Connect with licensed mental health professionals for confidential support
                </p>
              </div>
              
              {/* Emergency Button */}
              <Button
                variant="destructive"
                onClick={() => setShowEmergencyBooking(true)}
                className="crisis-accessible animate-breathing"
              >
                <Icon name="AlertTriangle" size={16} className="mr-2" />
                Emergency Support
              </Button>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 mt-4 text-sm text-text-secondary">
              <button
                onClick={() => navigate('/student-dashboard')}
                className="hover:text-text-primary transition-colors"
              >
                Dashboard
              </button>
              <Icon name="ChevronRight" size={14} />
              <span>Counselor Booking</span>
              {currentStep !== 'browse' && (
                <>
                  <Icon name="ChevronRight" size={14} />
                  <span className="capitalize">{currentStep}</span>
                </>
              )}
            </div>
          </div>

          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[
                { step: 'browse', label: 'Browse Counselors', icon: 'Users' },
                { step: 'calendar', label: 'Select Time', icon: 'Calendar' },
                { step: 'form', label: 'Book Session', icon: 'FileText' },
                { step: 'confirmation', label: 'Confirmation', icon: 'CheckCircle' }
              ]?.map((item, index) => (
                <div key={item?.step} className="flex items-center">
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-therapeutic transition-all duration-200 ${
                    currentStep === item?.step
                      ? 'bg-primary text-primary-foreground'
                      : index < ['browse', 'calendar', 'form', 'confirmation']?.indexOf(currentStep)
                      ? 'bg-success text-success-foreground' : 'bg-muted text-text-secondary'
                  }`}>
                    <Icon name={item?.icon} size={16} />
                    <span className="font-body text-sm font-medium">{item?.label}</span>
                  </div>
                  {index < 3 && (
                    <Icon name="ChevronRight" size={16} className="text-text-secondary mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Browse Counselors Step */}
          {currentStep === 'browse' && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="bg-card border border-border rounded-therapeutic p-6 therapeutic-shadow">
                <div className="grid lg:grid-cols-6 gap-4">
                  <div className="lg:col-span-2">
                    <Input
                      type="search"
                      placeholder="Search counselors or specializations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <Select
                    placeholder="Specialization"
                    options={specializationOptions}
                    value={filters?.specialization}
                    onChange={(value) => handleFilterChange('specialization', value)}
                  />
                  
                  <Select
                    placeholder="Language"
                    options={languageOptions}
                    value={filters?.language}
                    onChange={(value) => handleFilterChange('language', value)}
                  />
                  
                  <Select
                    placeholder="Availability"
                    options={availabilityOptions}
                    value={filters?.availability}
                    onChange={(value) => handleFilterChange('availability', value)}
                  />
                  
                  <Select
                    placeholder="Sort by"
                    options={sortOptions}
                    value={filters?.sortBy}
                    onChange={(value) => handleFilterChange('sortBy', value)}
                  />
                </div>
              </div>

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-text-secondary font-body">
                  Showing {filteredCounselors?.length} counselor{filteredCounselors?.length !== 1 ? 's' : ''}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setFilters({
                      specialization: '',
                      language: '',
                      availability: 'all',
                      sessionType: '',
                      sortBy: 'rating'
                    });
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              </div>

              {/* Counselors Grid */}
              <div className="space-y-6">
                {filteredCounselors?.map(counselor => (
                  <CounselorCard
                    key={counselor?.id}
                    counselor={counselor}
                    onBookAppointment={handleBookAppointment}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>

              {filteredCounselors?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                    No counselors found
                  </h3>
                  <p className="text-text-secondary font-body mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        specialization: '',
                        language: '',
                        availability: 'all',
                        sessionType: '',
                        sortBy: 'rating'
                      });
                      setSearchQuery('');
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Calendar Step */}
          {currentStep === 'calendar' && selectedCounselor && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-semibold text-xl text-text-primary">
                    Select Date & Time
                  </h2>
                  <p className="text-text-secondary font-body">
                    Choose a convenient time slot with Dr. {selectedCounselor?.name}
                  </p>
                </div>
                <Button variant="outline" onClick={handleBackToBrowse}>
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Back to Counselors
                </Button>
              </div>

              <BookingCalendar
                selectedCounselor={selectedCounselor}
                onTimeSlotSelect={handleTimeSlotSelect}
                selectedSlot={selectedSlot}
              />
            </div>
          )}

          {/* Booking Form Step */}
          {currentStep === 'form' && selectedSlot && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading font-semibold text-xl text-text-primary">
                    Complete Your Booking
                  </h2>
                  <p className="text-text-secondary font-body">
                    Provide session details to complete your booking
                  </p>
                </div>
                <Button variant="outline" onClick={() => setCurrentStep('calendar')}>
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Change Time
                </Button>
              </div>

              <BookingForm
                selectedSlot={selectedSlot}
                onSubmitBooking={handleSubmitBooking}
                onCancel={handleBackToBrowse}
                isSubmitting={isSubmitting}
              />
            </div>
          )}

          {/* Confirmation Step */}
          {currentStep === 'confirmation' && bookingData && (
            <BookingConfirmation
              bookingData={bookingData}
              onClose={handleBackToBrowse}
              onGoToDashboard={() => navigate('/student-dashboard')}
            />
          )}
        </div>
      </main>
      {/* Modals */}
      {showProfile && selectedCounselor && (
        <CounselorProfile
          counselor={selectedCounselor}
          onClose={() => setShowProfile(false)}
          onBookAppointment={(counselor) => {
            setShowProfile(false);
            handleBookAppointment(counselor);
          }}
        />
      )}
      {showEmergencyBooking && (
        <EmergencyBooking
          onClose={() => setShowEmergencyBooking(false)}
          onEmergencyBooking={handleEmergencyBooking}
        />
      )}
      {/* Crisis Escalation */}
      <CrisisEscalation
        isVisible={showCrisisEscalation}
        severity="high"
        onEscalate={handleCrisisEscalation}
        onDismiss={() => setShowCrisisEscalation(false)}
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

export default CounselorBooking;