import { useState } from "react";
import { Box } from "@mui/material";
import { Navigation } from "@/components/Navigation";
import { AuthForms } from "@/components/AuthForms";
import { FeedbackForm } from "@/components/FeedbackForm";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [currentView, setCurrentView] = useState<'auth' | 'feedback'>('auth');
  const { isAuthenticated } = useAuth();

  // Auto switch to feedback if authenticated and on auth page
  const handleViewChange = (view: 'auth' | 'feedback') => {
    if (view === 'auth' && isAuthenticated) {
      setCurrentView('feedback');
    } else {
      setCurrentView(view);
    }
  };

  return (
    <Box className="min-h-screen">
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      <Box sx={{ paddingTop: '64px' }}>
        {currentView === 'auth' && !isAuthenticated ? <AuthForms /> : <FeedbackForm />}
      </Box>
    </Box>
  );
};

export default Index;