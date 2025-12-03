import { useState } from 'react';
import { Box, Typography, Button, TextField, Alert, CircularProgress } from '@mui/material';
import { generateMagicLink } from '../../config/api';

export default function RequestMagicLink() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    try {
      const result = await generateMagicLink(email);

      if (result.success) {
        setSuccess(true);
        setEmail(''); // Clear the form
      } else {
        setError(result.error || 'Failed to send magic link');
      }
    } catch (err) {
      if (err.message.includes('No organization found')) {
        setError('No organization found with this email address. Please check your email and try again.');
      } else if (err.message.includes('Invalid email')) {
        setError('Please enter a valid email address.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: '600px' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Request Update Link
      </Typography>

      <Typography
        sx={{
          mb: 4,
          color: 'text.secondary',
          fontSize: '1rem',
          lineHeight: 1.6,
        }}
      >
        Enter your organization contact email to receive a secure link to update your information.
        The link will be valid for 1 hour.
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          <strong>Check your email!</strong>
          <br />
          We've sent a secure link to <strong>{email}</strong>.
          The link will expire in 1 hour.
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <Box
            component="label"
            sx={{
              display: 'block',
              mb: 0.5,
              fontSize: '0.875rem',
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            Email Address
          </Box>
          <TextField
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="organization@example.com"
            required
            fullWidth
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: '#F9FAFB',
                borderRadius: '4px',
                height: '43px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0066CC',
                  borderWidth: '1px',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0066CC',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0066CC',
                  borderWidth: '1px',
                },
                '& input': {
                  padding: '4px 12px',
                  height: '100%',
                  boxSizing: 'border-box',
                },
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading || !email}
          sx={{
            bgcolor: '#003366',
            color: 'white',
            textTransform: 'none',
            px: 6,
            py: 0.5,
            borderRadius: '4px',
            minWidth: '180px',
            height: '38px',
            boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
            '&:hover': {
              bgcolor: '#002244',
            },
            '&:disabled': {
              bgcolor: '#cccccc',
              color: '#666666',
            },
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
              Sending...
            </>
          ) : (
            'Send Magic Link'
          )}
        </Button>
      </form>

      <Box
        sx={{
          mt: 4,
          p: 2,
          bgcolor: '#f0f7ff',
          borderLeft: '4px solid #0066CC',
          borderRadius: '4px',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
          📧 What happens next?
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          1. You'll receive an email with a secure link
          <br />
          2. Click the link to access your organization's information
          <br />
          3. Update your details and submit
          <br />
          4. The link expires after 1 hour for security
        </Typography>
      </Box>
    </Box>
  );
}