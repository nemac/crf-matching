import React, { useRef, useState, useEffect  } from 'react';
import { Typography, Box, Link, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';

export default function RecommendSpecialistCard({ specialist, urlFilters, index}) {
  const title = specialist.name;
  const description = specialist.info;
  const profileLink = `/practitioner/${specialist.airtableRecId}?${urlFilters}`;
  const category = specialist.org_registry_category;
  const specialty = specialist.org_registry_category_specialist;

  const textRef = useRef(null);
  const [isClamped, setIsClamped] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
  const el = textRef.current;
  if (el) {
    setIsClamped(el.scrollHeight > el.clientHeight);
  }
  }, [description]);
  
  const theme = useTheme();
  return (
      <Grid key={`${index}-${title}`}
        sx={{
          backgroundColor: theme.palette.primary.white,
          borderRadius: 3,
          border: `1px solid ${theme.palette.primary.purple}`,
          minWidth: { xs: '325px', sm: '325px', md: '450px'},
        }}>
        <Box sx={{  width: 'fit-content', mx: 1.25, my: 2, pl: 2, pr: 4, py: 1,  borderRadius: 3, color: theme.palette.purple, backgroundColor: theme.palette.primary.cellHoverBg }}>
          <Typography variant="subtitle2">
              <AutoAwesomeIcon sx={{ fontSize: '0.85rem', mr: 0.5, color: 'primary.main' }}/> {category}
          </Typography>        
        </Box>
        <Box sx={{ px: 2, mb: 0.5, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' } }}>
          <Typography variant="h7" sx={{ fontWeight: 700, color: 'primary.main', mb: 1, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, }}>
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
                WebkitLineClamp: expanded ? 'none' : 3,
                whiteSpace: expanded ? 'normal' : undefined,
            }}>
            {description}
          </Typography>
            {isClamped && (
              <Button
                onClick={() => setExpanded((prev) => !prev)}
                size="small"
                sx={{ mt: -0.25, textTransform: 'none' }}
              >
                {expanded ? 'Less' : 'More'}
                {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon /> }
              </Button>
            )}
        </Box>
        <Box sx={{ maxWidth: { xs: '300px', sm: '300px', md: '400px'}, m: 2, px: 2, py: 1  }}>
          {/* color: theme.palette.purple, backgroundColor: theme.palette.primary.cellHoverBg, borderRadius: 3, backgroundColor: theme.palette.primary.medGray */}
          <Typography variant="subtitle2" component={'div'} sx={{ fontWeight: 600, mb: 1}} >
              Specializes in:
          </Typography>               
          <Typography variant="subtitle2">
              {specialty}
          </Typography>
        </Box>        
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            href={profileLink}
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
}

                        