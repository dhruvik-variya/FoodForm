import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Home } from "@mui/icons-material";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container maxWidth="sm">
        <Box className="text-center">
          <Typography 
            variant="h1" 
            component="h1" 
            className="text-6xl font-bold mb-4 text-gray-800"
            sx={{ fontSize: '4rem', fontWeight: 700 }}
          >
            404
          </Typography>
          <Typography 
            variant="h4" 
            component="h2" 
            className="text-xl text-gray-600 mb-6"
            sx={{ fontSize: '1.5rem', color: '#6b7280', marginBottom: '1.5rem' }}
          >
            Oops! Page not found
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            href="/"
            sx={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: 'white',
              padding: '12px 24px',
              '&:hover': {
                background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
              },
            }}
          >
            Return to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;