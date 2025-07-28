import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Avatar,
  Chip,
  Container,
} from "@mui/material";
import { Restaurant, LogoutOutlined, PersonOutline } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  currentView: 'auth' | 'feedback';
  onViewChange: (view: 'auth' | 'feedback') => void;
}

export const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    onViewChange('auth');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      className="bg-white/80 backdrop-blur-lg border-b border-gray-200"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 50,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar className="py-3">
          <Box className="flex items-center gap-3 flex-1">
            <Avatar
              className="bg-gradient-to-r from-orange-400 to-orange-600"
              sx={{ 
                width: 40, 
                height: 40,
                background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
              }}
            >
              🍽️
            </Avatar>
            <Typography
              variant="h5"
              component="div"
              className="font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
              sx={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
              }}
            >
              TasteHub
            </Typography>
          </Box>
          
          <Box className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Chip
                  icon={<PersonOutline />}
                  label={user?.name}
                  variant="outlined"
                  sx={{
                    backgroundColor: 'rgba(156, 163, 175, 0.2)',
                    borderColor: '#e5e7eb',
                    borderRadius: '9999px',
                    '& .MuiChip-label': {
                      fontWeight: 500,
                      fontSize: '0.875rem',
                    },
                    '& .MuiChip-icon': {
                      color: '#f97316',
                    },
                  }}
                />
                
                <Button
                  variant={currentView === 'feedback' ? 'contained' : 'text'}
                  onClick={() => onViewChange('feedback')}
                  sx={
                    currentView === 'feedback'
                      ? {
                          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                          color: 'white',
                          border: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                          },
                        }
                      : {
                          color: '#374151',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        }
                  }
                >
                  Feedback
                </Button>
                
                <Button
                  variant="text"
                  onClick={handleLogout}
                  startIcon={<LogoutOutlined />}
                  sx={{
                    color: '#dc2626',
                    '&:hover': {
                      backgroundColor: 'rgba(220, 38, 38, 0.1)',
                      color: '#dc2626',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={currentView === 'auth' ? 'contained' : 'text'}
                  onClick={() => onViewChange('auth')}
                  sx={
                    currentView === 'auth'
                      ? {
                          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                          color: 'white',
                          border: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                          },
                        }
                      : {
                          color: '#374151',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        }
                  }
                >
                  Login
                </Button>
                <Button
                  variant={currentView === 'feedback' ? 'contained' : 'text'}
                  onClick={() => onViewChange('feedback')}
                  sx={
                    currentView === 'feedback'
                      ? {
                          background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                          color: 'white',
                          border: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                          },
                        }
                      : {
                          color: '#374151',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                          },
                        }
                  }
                >
                  Feedback
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};