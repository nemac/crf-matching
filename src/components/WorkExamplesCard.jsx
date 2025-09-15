import React, { useRef, useState, useEffect  } from 'react';
import { Typography, Box, Link, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function WorkExamplesCard({ title, description, exampleLink, workedExampleIndex }) {
  const textRef = useRef(null);
  const urlLink = exampleLink + `&workedExampleIndex=${workedExampleIndex}`;
  const theme = useTheme();
  
  return (
    <React.Fragment>
      { description.length > 0 && description.toLowerCase() !== 'not answered' && (
        <Grid key={title}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',            
            backgroundColor: theme.palette.primary.white,
            borderRadius: 3,
            border: `1px solid ${theme.palette.primary.purple}`,
            minWidth: { xs: '325px', sm: '325px', md: '450px'},
          }}>
          <Box sx={{ px: 2, mb: 0.5 }}>
            <MenuBookIcon sx={{ color: 'primary.main' }}/>
          </Box>
          <Box sx={{ px: 2, mb: 0.5,  maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' }}}>
            <Typography variant="h7" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' } }}>
              {title}
            </Typography>
          </Box>
          <Box
            sx={{ 
              px: 2,
            }}>
            <Typography
              variant="body2"
              component={'span'}
              ref={textRef}
              sx={{
                  display: '-webkit-box',
                  overflow: 'hidden',
                  WebkitBoxOrient: 'vertical',
                  maxWidth: { xs: '300px', sm: '300px', md: '400px'},
                  WebkitLineClamp: 4,
              }}>
              {description}
            </Typography>
          </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', p: 2, mt: 'auto'}}>
          <Button
            variant="contained"
            href={urlLink}
            rel="noopener noreferrer"
            sx={{
              boxShadow: '0px 1px 1px -1px',
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.lightPurple,
              borderRadius: 8,              
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.lightGray,
                boxShadow: '0px 2px 2px -2px',
              },
            }}
          >
            Work Example Details
          </Button>
          </Box>
        </Grid>
      )}
    </React.Fragment>
  )
}

                        