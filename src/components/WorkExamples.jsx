import React, { useState  } from 'react';
import { Typography, Box, Link } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import SectionHeader from './SectionHeader';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function WorkExamples({ practitioner }) {

  const extractUrl = (input) => {
  const match = input.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : '';
  };

  practitioner.example1_links = extractUrl(practitioner.example1_links);
  practitioner.example2_links = extractUrl(practitioner.example2_links);
  practitioner.example3_links = extractUrl(practitioner.example3_links);

  // const notAnswered = 'not answered';
  // const numExamples = (practitioner.example1_title.trim().length > 0 && practitioner.example1_title.trim().toLowerCase() != notAnswered ? 1 : 0) + 
  //                     (practitioner.example2_title.trim().length > 0 && practitioner.example2_title.trim().toLowerCase() != notAnswered ? 1 : 0) +
  //                     (practitioner.example3_title.trim().length > 0 && practitioner.example3_title.trim().toLowerCase() != notAnswered ? 1 : 0);

  // const workExampleWidth = numExamples === 0 ? 12 : numExamples/12;

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
          py: 4,
          my: 8,
          backgroundColor: theme.palette.primary.cellHoverBg,
        }}
      >
        <SectionHeader title="Examples of Our Work"></SectionHeader>
        
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
              px: 2,
              flexWrap: 'nowrap',
              width: 'max-content',
            }}>


              {/* start work example 1 */}
              {practitioner.example1_description.length > 0 && practitioner.example1_description.toLowerCase() !== 'not answered' && (
                <Grid key={'workExample1'} sx={{
                  backgroundColor: theme.palette.primary.white,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.primary.lightBlue}`,
                  minWidth: { xs: '325px', sm: '325px', md: '450px'},
                }}>
                  <Box sx={{ px: 2, mb: 0.5 }}>
                    <MenuBookIcon sx={{ color: 'primary.main' }}/>
                  </Box>
                  <Box sx={{ px: 2, mb: 0.5,  maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' }}}>
                    <Typography variant="h7" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' } }}>
                      {practitioner.example1_title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ 
                      px: 2,
                    }}>
                    <Typography
                      variant="body2"
                      sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 4,
                          maxWidth: { xs: '300px', sm: '300px', md: '400px'},
                      }}>
                      {practitioner.example1_description}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>

                    {practitioner.example1_links.length > 0 && (
                      <Link
                        href={practitioner.example1_links}
                        target='_blank'
                        rel="noreferrer"
                      >
                        Learn More
                      </Link>
                    )}


                  </Box>
                </Grid>
              )}
              {/* end work example 1 */}



               {/* start work example 2 */}
              {practitioner.example2_description.length > 0 && practitioner.example2_description.toLowerCase() !== 'not answered' && (
                <Grid key={'workExample2'} sx={{
                  backgroundColor: theme.palette.primary.white,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.primary.lightBlue}`,
                  minWidth: { xs: '325px', sm: '325px', md: '450px'},
                }}>
                  <Box sx={{ px: 2, mb: 0.5 }}>
                    <MenuBookIcon sx={{ color: 'primary.main' }}/>
                  </Box>
                  <Box sx={{ px: 2, mb: 0.5, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' } } }>
                    <Typography variant="h7" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' }  }}>
                      {practitioner.example2_title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ 
                      px: 2,
                    }}>
                    <Typography
                      variant="body2"
                      sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 4,
                          maxWidth: { xs: '300px', sm: '300px', md: '400px'},
                      }}>
                      {practitioner.example2_description}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>

                    {practitioner.example2_links.length > 0 &&  (
                      <Link
                        href={practitioner.example2_links}
                        target='_blank'
                        rel="noreferrer"
                      >
                        Learn More
                      </Link>
                    )}


                  </Box>
                </Grid>
              )}
              {/* end work example 2 */}

               {/* start work example 3 */}
              {practitioner.example3_description.length > 0 && practitioner.example3_description.toLowerCase() !== 'not answered' && (
                <Grid key={'workExample3'} sx={{
                  backgroundColor: theme.palette.primary.white,
                  borderRadius: 3,
                  border: `1px solid ${theme.palette.primary.lightBlue}`,
                  minWidth: { xs: '325px', sm: '325px', md: '450px'},
                }}>
                  <Box sx={{ px: 2, mb: 0.5 }}>
                    <MenuBookIcon sx={{ color: 'primary.main' }}/>
                  </Box>
                  <Box sx={{ px: 2, mb: 0.5, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' } }}>
                    <Typography variant="h7" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' } }}>
                      {practitioner.example3_title}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ 
                      px: 2,
                    }}>
                    <Typography
                      variant="body2"
                      sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 4,
                          maxWidth: { xs: '300px', sm: '300px', md: '400px'},     
                      }}>
                      {practitioner.example3_description}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>

                    {practitioner.example3_links.length > 0 && (
                      <Link
                        href={practitioner.example3_links}
                        target='_blank'
                        rel="noreferrer"
                      >
                        Learn More
                      </Link>
                    )}

                  </Box>
                </Grid>
              )}
              {/* end work example 3 */}


          </Grid>
        </Box>
      </Box>
  );
}

                        