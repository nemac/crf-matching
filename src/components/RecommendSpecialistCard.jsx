import React, { useRef, useState, useEffect  } from 'react';
import { Typography, Box, Link, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import PractitionerTypeChip from '../components/PractitionerTypeChip';

export default function RecommendSpecialistCard({ specialist, urlFilters, index}) {
  const title = specialist.name;
  const description = specialist.info;
  const profileLink = `/practitioner/${specialist.airtableRecId}?${urlFilters}`;
  const category = specialist.org_registry_category;
  const specialty = specialist.org_registry_category_specialist;
  const expertiseArray = specialty ? specialty.split(',') : [];

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
      <Grid 
        key={`${index}-${title}`}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: theme.palette.primary.white,
          borderRadius: 3,
          border: `1px solid ${theme.palette.primary.purple}`,
          minWidth: { xs: '325px', sm: '325px', md: '450px'},
          maxWidth: { xs: '350px', sm: '350px', md: '500px'},
        }}>
          <PractitionerTypeChip 
            type={category} 
            label={category}
            list={specialty}
          size={'small'}/>

        <Box sx={{ px: 2, mb: 0.25, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, minHeight:  { xs: '70px', sm: '70px', md: '60px' } }}>
          <Typography variant="h7" sx={{ fontWeight: 700, color: theme.palette.purple, mb: 1, maxWidth: { xs: '300px', sm: '300px', md: '400px'}, }}>
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
                color: theme.palette.purple,
            }}>
            {description}
          </Typography>
            {isClamped && (
              <Button
                onClick={() => setExpanded((prev) => !prev)}
                size="small"
                sx={{ mt: -0.25, textTransform: 'none', fontSize: '0.65rem' }}
              >
                {expanded ? 'Less' : 'More'}
                {expanded ? <KeyboardArrowUpIcon  sx={{ fontSize: '0.65rem' }} /> : <KeyboardArrowDownIcon  sx={{ fontSize: '0.65rem' }} /> }
              </Button>
            )}
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', p: 1}}>
          {expertiseArray.map((expertise, index) => 
            <Box 
              key={index}
              sx={{ 
                textTransform: 'capitalize', 
                width: 'fit-content',
                my: 0.5, 
                mx: 0.5, 
                px: 2, 
                py: 0.5,
                borderRadius: 9999,
                fontSize: '0.75rem',
                backgroundColor: theme.palette.primary.lightTan }}>
                { expertise }
          </Box>)}
        </Box>  
        <Box sx={{ display: 'flex', alignItems: 'flex-end', p: 2, mt: 'auto'}}>
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
              '&:hover': {
                backgroundColor: theme.palette.primary.lightGray,
              },
            }}
          >
            View Profile
          </Button>
        </Box>
      </Grid>
  )
}

                        