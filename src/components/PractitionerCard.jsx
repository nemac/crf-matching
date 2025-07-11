import React from 'react';
import { Card, CardContent, Typography, Box, Button, Stack, Checkbox, FormControlLabel } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import climatePracLogo from '../assets/climate_prac.png';
import HubIcon from '@mui/icons-material/Hub';
import theme from '../theme';

export default function PractitionerCard({ filters, practitioner, onComparisonSelect, isSelectedForComparison, showBrowseAll }) {
  const urlFilters = filters
  const description = practitioner.info || 'No description available';
  const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;
  const displayedActivities = practitioner.activities.slice(0, 3);

  return (
    <Box sx={{ height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          boxShadow: 3,
          bgcolor: isSelectedForComparison ? 'primary.cellHoverBg' : 'background.paper',
          transition: 'all 0.2s ease',
          border: isSelectedForComparison ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
          boxSizing: 'border-box',
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              width: '100%',
              height: 140,
              mb: 2,
              backgroundColor: '#F5F5F5',
              // display: 'flex',
              display: 'none', // remove this and uncomment flex to get the logo back
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

          <Box sx={{  width: 'fit-content', my: 2, pl: 2, pr: 4, py: 1,  borderRadius: 3, backgroundColor: theme.palette.primary.cellHoverBg }}>
              <Typography variant="subtitle2">
                  <HubIcon sx={{ fontSize: '0.85rem', mr: 0.5, color: 'primary.main' }}/>  {practitioner.org_registry_category || 'Broad service provider'}
              </Typography>
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

          {showBrowseAll && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: 'bold' }}
              >
                Services Provided
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {displayedActivities.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      border: `1px solid ${theme.palette.primary.lightBlue}`,
                      backgroundColor: theme.palette.primary.lightGray,
                      borderRadius: 6,
                      color: theme.palette.primary.main,
                      alignContent: 'center',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      py: 0.75,
                      px: 2,
                      m: 0.5,
                      minWidth: '75px',
                    }}
                  >
                    {activity}
                  </Box>
                ))}
                <Box
                    key={4}
                    sx={{
                      border: `1px solid ${theme.palette.primary.lightBlue}`,
                      backgroundColor: theme.palette.primary.lightGray,
                      borderRadius: 6,
                      color: theme.palette.primary.main,
                      alignContent: 'center',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      p: 1.325,
                      m: 0.5,
                      minWidth: '25px',
                    }}
                  >
                    ...
                  </Box>
              </Box>
            </Box>
          )}
          
          <Box sx={{ mt: 'auto' }}>
            <Button
              variant="contained"
              href={`/practitioner/${practitioner.airtableRecId}?${urlFilters}`}
              rel="noopener noreferrer"
              startIcon={<PersonIcon />}
              sx={{
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.primary.lightBlue,
                borderRadius: 8,
                textTransform: 'none',
                mt: 6,
                mb: 2,
                '&:hover': {
                  backgroundColor: theme.palette.primary.midBlue,
                },
              }}
            >
              Practitioner Profile
            </Button>

            {showBrowseAll && (
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
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
