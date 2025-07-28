import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  Avatar,
  Container,
  Grid,
} from "@mui/material";
import { Restaurant } from "@mui/icons-material";
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

export const AuthForms = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginFormData>({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { showToast } = useToast();
  const { login, signup } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      showToast("Please fill in all fields", "error");
      return;
    }
    
    const success = login(loginForm.email, loginForm.password);
    if (success) {
      showToast("Welcome back! 🎉", "success");
      setLoginForm({ email: "", password: "" });
    } else {
      showToast("Invalid email or password", "error");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      showToast("Please fill in all fields", "error");
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    
    if (signupForm.password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    
    const success = signup(signupForm.name, signupForm.email, signupForm.password);
    if (success) {
      showToast("Account Created! 🎉 Welcome to TasteHub!", "success");
      setSignupForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      showToast("Email already exists. Please use a different email.", "error");
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-orange-50 to-indigo-50 flex items-center justify-center p-4">
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          className="p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100"
          sx={{
            boxShadow: '0 20px 40px -12px rgb(0 0 0 / 0.1), 0 10px 20px -6px rgb(0 0 0 / 0.05)',
          }}
        >
          <Box className="text-center mb-8">
            <Avatar
              className="mx-auto mb-4 bg-gradient-to-r from-orange-400 to-orange-600"
              sx={{ width: 64, height: 64 }}
            >
              <Restaurant sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography
              variant="h4"
              component="h1"
              className="font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2"
            >
              {isSignup ? "Join TasteHub" : "Welcome Back"}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isSignup ? "Create your account to start ordering" : "Sign in to your account"}
            </Typography>
          </Box>

          {isSignup ? (
            <Box component="form" onSubmit={handleSignup} className="space-y-6">
              <TextField
                fullWidth
                id="name"
                label="Full Name"
                placeholder="Enter your full name"
                value={signupForm.name}
                onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                variant="outlined"
                className="mb-4"
              />
              
              <TextField
                fullWidth
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                variant="outlined"
                className="mb-4"
              />
              
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                placeholder="Create a password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                variant="outlined"
                className="mb-4"
              />
              
              <TextField
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
                variant="outlined"
                className="mb-6"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 py-3"
                sx={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                  },
                }}
              >
                Create Account
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleLogin} className="space-y-6">
              <TextField
                fullWidth
                id="loginEmail"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                variant="outlined"
                className="mb-4"
              />
              
              <TextField
                fullWidth
                id="loginPassword"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                variant="outlined"
                className="mb-6"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 py-3"
                sx={{
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
          )}
          
          <Box className="text-center mt-6">
            <Typography variant="body2" color="text.secondary" component="span">
              {isSignup ? "Already have an account? " : "Don't have an account? "}
            </Typography>
            <Button
              variant="text"
              onClick={() => setIsSignup(!isSignup)}
              className="p-0 text-orange-600 hover:text-orange-700 font-medium"
              sx={{
                textTransform: 'none',
                minWidth: 'auto',
                padding: 0,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              {isSignup ? "Sign In" : "Sign Up"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};