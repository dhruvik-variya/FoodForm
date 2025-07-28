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
  Rating,
} from "@mui/material";
import { Feedback, Star } from "@mui/icons-material";
import { useToast } from "@/contexts/ToastContext";

interface FeedbackFormData {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export const FeedbackForm = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    name: "",
    email: "",
    rating: 0,
    comment: "",
  });
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.rating || !formData.comment) {
      showToast("Please fill in all fields", "error");
      return;
    }
    
    if (formData.rating === 0) {
      showToast("Please provide a rating", "error");
      return;
    }
    
    showToast("Feedback Submitted! 🎉 Thank you for your valuable feedback!", "success");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      rating: 0,
      comment: "",
    });
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-orange-50 to-indigo-50 flex items-center justify-center p-4">
      <Container maxWidth="md">
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
              <Feedback sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography
              variant="h4"
              component="h1"
              className="font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2"
            >
              Share Your Experience
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Help us improve by sharing your feedback
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} className="space-y-6">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Full Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            
            <Box className="space-y-3">
              <Typography variant="body1" className="font-medium text-gray-700">
                Rating
              </Typography>
              <Box className="flex items-center gap-3">
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={(_, newValue) => {
                    setFormData({ ...formData, rating: newValue || 0 });
                  }}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: '#f97316',
                    },
                    '& .MuiRating-iconHover': {
                      color: '#ea580c',
                    },
                  }}
                />
                {formData.rating > 0 && (
                  <Typography variant="body2" className="text-orange-600 font-medium">
                    {formData.rating} star{formData.rating > 1 ? 's' : ''}
                  </Typography>
                )}
              </Box>
            </Box>
            
            <TextField
              fullWidth
              id="comment"
              label="Your Feedback"
              placeholder="Tell us about your experience..."
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              variant="outlined"
              multiline
              rows={5}
              className="resize-none"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 py-3 mt-6"
              sx={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                },
              }}
            >
              Submit Feedback
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};