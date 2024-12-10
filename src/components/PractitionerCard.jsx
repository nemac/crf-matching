import React from 'react';
import { Card, CardContent, Typography, Box, Button, Stack, Checkbox, FormControlLabel } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import climatePracLogo from '../assets/climate_prac.png';
import theme from '../theme';

export default function PractitionerCard({ practitioner, onComparisonSelect, isSelectedForComparison }) {
  const description = practitioner.info || 'No description available';
  const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;
  const displayedActivities = practitioner.activities.slice(0, 3);

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            width: '100%',
            height: 140,
            mb: 2,
            backgroundColor: '#F5F5F5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
          }}
        >
          <img
            src={climatePracLogo}
            alt="Company Logo"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Typography
          variant="h6"
          component="div"
          sx={{ mb: 2, fontWeight: 'bold' }}
        >
          {practitioner.org}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {truncatedDescription}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ mb: 1, fontWeight: 'bold' }}
          >
            Adaptation Expertise
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: '2px',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {displayedActivities.map((activity, index) => (
              <Box
                key={index}
                sx={{
                  border: `1px solid ${theme.palette.primary.midBlue}`,
                  borderRadius: '20px',
                  px: 1.5,
                  py: 0.75,
                  color: theme.palette.primary.main,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '32px',
                  textAlign: 'center',
                }}
              >
                {activity}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 'auto' }}>
          <Button
            fullWidth
            variant="contained"
            href={`/practitioner/${practitioner.airtableRecId}`}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<PersonIcon />}
            sx={{
              backgroundColor: theme.palette.primary.midBlue,
              borderRadius: 8,
              textTransform: 'none',
              mb: 2,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            Full Practitioner Org Profile
          </Button>

          <FormControlLabel
            control={
              <Checkbox
                checked={isSelectedForComparison}
                onChange={(e) => onComparisonSelect(practitioner.airtableRecId, e.target.checked)}
                sx={{
                  color: theme.palette.primary.main,
                  '&.Mui-checked': {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            }
            label="Compare this practitioner"
            sx={{
              '& .MuiFormControlLabel-label': {
                fontSize: '0.875rem',
                color: theme.palette.primary.main,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
