import { useState } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import FormTextField from './FormTextField';

export default function UpdateData() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    organizationName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { firstName, lastName, email, phone, organizationName } = formData;
    console.log("submit")
  };

  return (
    <Box sx={{ maxWidth: '1200px' }}>
      {/* Organization Contact Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        Organization Contact
      </Typography>

      {/* First Name and Last Name Row */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <FormTextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormTextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>

      {/* Phone Number Row */}
      <Box sx={{ mb: 2, maxWidth: '578px' }}>
        <FormTextField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="tel"
          fullWidth
        />
      </Box>

      {/* Email Row */}
      <Box sx={{ mb: 2, maxWidth: '578px' }}>
        <FormTextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          fullWidth
        />
      </Box>

      {/* Organization Name Section */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          mb: 3,
          mt: 4,
        }}
      >
        Organization Name
      </Typography>

      <Box sx={{ mb: 4, maxWidth: '350px' }}>
        <FormTextField
          label="Organization Name"
          name="organizationName"
          value={formData.organizationName}
          onChange={handleChange}
          fullWidth
        />
      </Box>

      {/* Submit Button */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          bgcolor: '#003366',
          color: 'white',
          textTransform: 'none',
          px: 6,
          py: 0.5,
          borderRadius: '4px',
          minWidth: '135px',
          height: '29px',
          boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
          '&:hover': {
            bgcolor: '#002244',
          },
        }}
      >
        Save
      </Button>
    </Box>
  );
}