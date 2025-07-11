import React, { useState, useRef, useEffect  } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import SectionHeader from './SectionHeader';
import PersonIcon from '@mui/icons-material/Person';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function RecommendSpecialist({ practitionerSpecialists, filters }) {
  const urlFilters = filters
  const theme = useTheme();
  return (
      <Box
        sx={{
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          px: 6,
          py: 6,
          backgroundColor: theme.palette.primary.cellHoverBg,
        }}
      >
        <SectionHeader title="You also might be interested in these specialists"></SectionHeader>
        
        <Box
          sx={{
            overflowX: 'auto',
            px: 2, // padding inside scroll container
          }}
        >
          <Grid 
            container
            spacing={2}
            gap={2}
            sx={{ 
              p: 2, 
              my: 4,
              // mx: 'auto',
              px: 2,
              flexWrap: 'nowrap',
              width: 'max-content',
            }}>

            {practitionerSpecialists.map((practSpec, index) => {
              const textRef = useRef(null);
              const [isClamped, setIsClamped] = useState(false);
              const [expanded, setExpanded] = useState(false);

              useEffect(() => {
                const el = textRef.current;
                if (el) {
                  setIsClamped(el.scrollHeight > el.clientHeight);
                }
              }, [practSpec.info]);
               return (

                <Grid key={index} sx={{
                  backgroundColor: theme.palette.primary.white,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.primary.purple}`,
                }}>

                  <Box sx={{  width: 'fit-content', mx: 1.25, my: 2, pl: 2, pr: 4, py: 1,  borderRadius: 3, color: theme.palette.purple, backgroundColor: theme.palette.primary.cellHoverBg }}>
                    <Typography variant="subtitle2">
                        <AutoAwesomeIcon sx={{ fontSize: '0.85rem', mr: 0.5, color: theme.palette.purple  }}/> {practSpec.org_registry_category}
                    </Typography>
                  </Box>
                  <Box sx={{ px: 2, mb: 0.5, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' } }}>
                    <Typography variant="h7" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, }}>
                      {practSpec.name}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ 
                      px: 2,
                      width: '350px',
                      height: expanded ? 'unset' : '75px',
                    }}>
                    <Typography
                      variant="body2"
                      ref={textRef}
                      sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: expanded ? 'none' : 4,
                          whiteSpace: expanded ? 'normal' : undefined,                
                      }}>
                      {practSpec.info}
                    </Typography>
                    {isClamped && (
                      <Button
                        size="small"
                        onClick={() => setExpanded(!expanded)}
                        sx={{ mt: 0.5, textTransform: 'none' }}
                      >
                        {expanded ? 'Less' : 'More'}
                      </Button>
                    )}                    
                  </Box>
                  <Box sx={{ p: 2}}>

                    <Button
                      variant="contained"
                      href={`/practitioner/${practSpec.airtableRecId}?${urlFilters}`}
                      rel="noopener noreferrer"
                      startIcon={<PersonIcon />}
                      sx={{
                        color: theme.palette.primary.main,
                        backgroundColor: theme.palette.primary.white,
                        border: `1px solid ${theme.palette.primary.borderGray}`,
                        borderRadius: 8,
                        textTransform: 'none',
                        mt: 6,
                        mb: 2,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.lightBlue,
                        },
                      }}
                    >
                      View Profile
                    </Button>

                  </Box>
                </Grid>

              )
            })}

          </Grid>
        </Box>
      </Box>
  );
}

                        