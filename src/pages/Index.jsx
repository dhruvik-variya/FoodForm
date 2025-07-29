import React, { useState } from "react";
import { Box } from "@mui/material";
import { Navigation } from "./components/Navigation";
import { AuthForms } from "./components/AuthForms";
import { FeedbackForm } from "./components/FeedbackForm";
import { useAuth } from "./contexts/AuthContext";

const Index = () => {
  const [currentView, setCurrentView] = useState('auth');
  const { isAuthenticated } = useAuth();

  const handleViewChange = (view) => {
    if (view === 'auth' && isAuthenticated) {
      setCurrentView('feedback');
    } else {
      setCurrentView(view);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      <Box sx={{ paddingTop: '64px' }}>
        {currentView === 'auth' && !isAuthenticated ? <AuthForms /> : <FeedbackForm />}
      </Box>
    </Box>
  );
};

export default Index;
