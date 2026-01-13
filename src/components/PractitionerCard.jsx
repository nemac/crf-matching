import React from 'react';
import { Card, CardContent, Typography, Box, Button, Stack, Checkbox, FormControlLabel } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import climatePracLogo from '../assets/climate_prac.png';
import theme from '../theme';
import PractitionerTypeChip from '../components/PractitionerTypeChip';

export default function PractitionerCard({ filters, practitioner, onComparisonSelect, isSelectedForComparison, showBrowseAll }) {
  const urlFilters = filters
  const description = practitioner.info || 'No description available';
  const truncatedDescription = description.length > 200 ? description.substring(0, 200) + '...' : description;
  const displayedActivities = practitioner.activities.slice(0, 3);
  const specialty = practitioner.org_registry_category_specialist;
 
  return (
    <Box sx={{ height: '100%' }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          boxShadow: 3,
          bgcolor: isSelectedForComparison ? 'primary.cellHoverBg' : practitioner.org_registry_category === 'Specialist' ? 'primary.lightGray' : 'background.paper',
          transition: 'all 0.2s ease',
          border: isSelectedForComparison  ?  `1px solid ${theme.palette.primary.main}` : practitioner.org_registry_category === 'Specialist' ? `1px solid ${theme.palette.primary.lightTan}` : '1px solid transparent',
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

        <PractitionerTypeChip 
          type={practitioner.org_registry_category} 
          label={practitioner.org_registry_category}
          list={practitioner.org_registry_category_specialist}
          size={'small'}/>
          
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

          {/* {showBrowseAll && ( */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 0.5, fontWeight: 'bold' }}
              >
                 {practitioner.org_registry_category === 'Specialist' && ( 'Specialty')}
                 {practitioner.org_registry_category === 'Broad service provider' && ( 'Services Provided' )}
                
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >

                {practitioner.org_registry_category === 'Specialist' && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 1}}>
                            <Box 
                              sx={{ 
                                border: `1px solid ${theme.palette.primary.tan}`,
                                backgroundColor: theme.palette.primary.lightTan,
                                borderRadius: 1,
                                color: theme.palette.primary.main,
                                alignContent: 'start',
                                textAlign: 'start',
                                fontSize: '0.75rem',
                                py: 0.75,
                                px: 2,
                                m: 0.5,
                                minWidth: '75px',                                
                                }}>
                                { specialty }
                      </Box> 
                    </Box>  
                )}
                {practitioner.org_registry_category === 'Broad service provider' && displayedActivities && displayedActivities.map((activity, index) => (
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
                {practitioner.org_registry_category === 'Broad service provider' && (
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
                )}
              </Box>
            </Box>
          {/* )} */}
          
          <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ mt: 'auto', width:'100%'}} >
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
                  mt: 1,
                  mb: 2,
                  width: 'fit-content',
                  '&:hover': {
                    backgroundColor: theme.palette.primary.lightBlueHover,
                  },
                }}
              >
                Practitioner Profile
              </Button>            
            </Box>

            {/* {!showBrowseAll && 
              <Box sx={{ mt: 'auto',  width:'100%', alignContent: 'flex-end', justifyContent: 'flex-end'}} >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1, mr: 2,  mb: 2, display: 'flex', justifyContent: 'flex-end', fontSize: '0.875rem' }}
                >
                  Matched filters: <strong> {practitioner.matchCount}</strong>
                </Typography>
              </Box>
            } */}
           
            {showBrowseAll && (
              <Box sx={{ mt: 'auto',  width:'100%', alignContent: 'flex-end', justifyContent: 'flex-end'}} >
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
                labelPlacement="start"
                sx={{
                   mt: 1, mb: 2,
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.875rem',
                    color: theme.palette.primary.main,
                  },
                }}
              />
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
