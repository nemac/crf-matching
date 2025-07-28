import React, { useRef, useState, useEffect  } from 'react';
import { Typography, Box, Link, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';import MenuBookIcon from '@mui/icons-material/MenuBook';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function WorkExamplesCard({ title, description, exampleLink }) {
  const textRef = useRef(null);

  const [isClamped, setIsClamped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight);
    }
  }, [description]);

  const extractUrl = (input) => {
  const match = input.match(/https?:\/\/[^\s]+/);
    return match ? match[0] : '';
  };

  exampleLink = extractUrl(exampleLink);
    // const profileLink = `/practitioner/${specialist.airtableRecId}?${urlFilters}`;


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
                  WebkitLineClamp: expanded ? 'none' : 4,
                  whiteSpace: expanded ? 'normal' : undefined,
              }}>
              {description}
            </Typography>
              {/* {isClamped && (
                <Button
                  onClick={() => setExpanded((prev) => !prev)}
                  size="small"
                  sx={{ 
                    mt: 0.5,
                    px: 2,
                    py: 0.5,
                    borderRadius: 9999,
                    backgroundColor: theme.palette.primary.lightPurple,
                    textTransform: 'none',
                    fontSize: '0.65rem',
                    display: 'flex',
                    justifySelf: 'end',
                    '&:hover': {
                      backgroundColor: theme.palette.primary.lightGray,
                    },
                  }}
                >
                  {expanded ? 'Less' : 'More'}
                  {expanded ? <KeyboardArrowUpIcon sx={{ fontSize: '0.65rem' }} /> : <KeyboardArrowDownIcon sx={{ fontSize: '0.65rem' }} /> }
                </Button>
              )} */}
          </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', p: 2, mt: 'auto'}}>
          <Button
            variant="contained"
            href={exampleLink}
            rel="noopener noreferrer"
            sx={{
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.lightPurple,
              // border: `1px solid ${theme.palette.primary.borderGray}`,
              borderRadius: 8,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.lightGray,
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

                        