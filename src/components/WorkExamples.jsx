import React, { useRef, useState, useEffect  } from 'react';
import { Typography, Box, Link, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import SectionHeader from './SectionHeader';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export default function WorkExamples({ practitioner }) {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  const [isClamped1, setIsClamped1] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  const [isClamped2, setIsClamped2] = useState(false);
  const [expanded2, setExpanded2] = useState(false);

  const [isClamped3, setIsClamped3] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  useEffect(() => {
    const el = textRef1.current;
    if (el) {
      setIsClamped1(el.scrollHeight > el.clientHeight);
    }
  }, [practitioner.example1_description ]);

    useEffect(() => {
    const el = textRef1.current;
    if (el) {
      setIsClamped2(el.scrollHeight > el.clientHeight);
    }
  }, [practitioner.example2_description ]);

    useEffect(() => {
    const el = textRef1.current;
    if (el) {
      setIsClamped3(el.scrollHeight > el.clientHeight);
    }
  }, [practitioner.example3_description ]);


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
                      ref={textRef1}
                      sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          maxWidth: { xs: '300px', sm: '300px', md: '400px'},
                          WebkitLineClamp: expanded1 ? 'none' : 4,
                          whiteSpace: expanded1 ? 'normal' : undefined,
                      }}>
                      {practitioner.example1_description}
                    </Typography>
                      {isClamped1 && (
                        <Button
                          onClick={() => setExpanded1((prev) => !prev)}
                          size="small"
                          sx={{ mt: 1, textTransform: 'none' }}
                        >
                          {expanded1 ? 'Less' : 'More'}
                        </Button>
                      )}
                  </Box>
                  <Box sx={{ p: 2 }}>

                    {practitioner.example1_links.length > 0 && (
                      <Link
                        href={practitioner.example1_links}
                        target='_blank'
                        rel="noreferrer"
                      >
                        Explore Example
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
                      ref={textRef2}
                      sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          maxWidth: { xs: '300px', sm: '300px', md: '400px'},
                          WebkitLineClamp: expanded2 ? 'none' : 4,
                          whiteSpace: expanded2 ? 'normal' : undefined,
                      }}>
                      {practitioner.example2_description}
                    </Typography>
                      {isClamped2 && (
                        <Button
                          onClick={() => setExpanded2((prev) => !prev)}
                          size="small"
                          sx={{ mt: 1, textTransform: 'none' }}
                        >
                          {expanded2 ? 'Less' : 'More'}
                        </Button>
                      )}
                  </Box>
                  <Box sx={{ p: 2 }}>

                    {practitioner.example2_links.length > 0 &&  (
                      <Link
                        href={practitioner.example2_links}
                        target='_blank'
                        rel="noreferrer"
                      >
                        Explore Example
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
                      ref={textRef3}
                      sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          maxWidth: { xs: '300px', sm: '300px', md: '400px'},
                          WebkitLineClamp: expanded3 ? 'none' : 4,
                          whiteSpace: expanded3 ? 'normal' : undefined,
                      }}>
                      {practitioner.example3_description}
                    </Typography>
                      {isClamped3 && (
                        <Button
                          onClick={() => setExpanded3((prev) => !prev)}
                          size="small"
                          sx={{ mt: 1, textTransform: 'none' }}
                        >
                          {expanded3 ? 'Less' : 'More'}
                        </Button>
                      )}
                  </Box>
                  <Box sx={{ p: 2 }}>

                    {practitioner.example3_links.length > 0 && (
                      <Link
                        href={practitioner.example3_links}
                        target='_blank'
                        rel="noreferrer"
                      >
                        Explore Example
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

                        