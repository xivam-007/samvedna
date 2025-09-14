import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CounselorDashboard from './pages/counselor-dashboard';
import PeerSupportForum from './pages/peer-support-forum';
import AdminAnalytics from './pages/admin-analytics';
import AIChatbotInterface from './pages/ai-chatbot-interface';
import StudentDashboard from './pages/student-dashboard';
import CounselorBooking from './pages/counselor-booking';
import ResourcePage from './pages/resources';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIChatbotInterface />} />
        <Route path="/counselor-dashboard" element={<CounselorDashboard />} />
        <Route path="/peer-support-forum" element={<PeerSupportForum />} />
        <Route path="/admin-analytics" element={<AdminAnalytics />} />
        <Route path="/ai-chatbot-interface" element={<AIChatbotInterface />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/counselor-booking" element={<CounselorBooking />} />
        <Route path="/resources" element={<ResourcePage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
