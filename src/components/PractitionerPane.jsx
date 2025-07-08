import { useRef } from 'react';
import { Typography, Box, styled, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';

import ProfilePopper from './ProfilePopper';
import HeaderBox from './HeaderBox';
import Section from './Section';
import ScoreSection from './ScoreSection';
import Pane from './Pane';
import theme from '../theme';

const matchVals = (commCats, practCats) => {
  return commCats.map((commCat) => practCats.includes(commCat));
};

// Person icon (mobile), school icon (mobile)
const StyledBox = styled(Box)({
  height: 45,
});

function StrTrainedBadge({ isTrained }) {
  if (isTrained === 'Yes') {
    return (
      <StyledBox
        sx={{
          display: 'inline-flex',
          width: '100%',
          bgcolor: {
            xs: 'primary.lightBlue',
            md: 'transparent',
          },
          color: theme.palette.primary.main,
          flexGrow: 'space-around',
          verticalAlign: 'middle',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SchoolIcon sx={{ fontSize: {xs: 'inherit', md: '1rem'}, mr: 0.5 }} />
        <Typography
          sx={{
            display: {
              xs: 'none',
              md: 'inherit',
            },
            fontSize: '0.875rem',
            marginLeft: '10px',
            verticalAlign: 'baseline',
          }}
        >
          StR Trained
        </Typography>
      </StyledBox>
    );
  } else {
    return (
      <StyledBox
        sx={{
          bgcolor: {
            xs: 'primary.main',
            md: 'primary.lightGray',
          },
        }}
      ></StyledBox>
    );
  }
}

function PractitionerHeader({ strTrained, practitioner, poppedPractitioner, setPoppedPractitioner }) {
  const headerRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setPoppedPractitioner(practitioner);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setPoppedPractitioner(null);
    }, 100);
  };

  return (
    <HeaderBox
      sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: '0 auto',
        padding: '8px 1px', // 1px L/R padding to fix Chrome bug where full ellipses don't show
        display: {
          md: 'flex',
          xs: 'block',
        },
      }}
      ref={headerRef}
    >
      <StyledBox
        sx={{
          display: 'flex',
          verticalAlign: 'middle',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'primary.lightGray',
        }}
      >
      </StyledBox>

      {/* Title and info icon container */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '8px 0', // Add margin to increase space between icon and STR trained
          flexDirection: 'column', // Stack title and icon
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: {
              xs: 'none',
              md: '-webkit-box',
            },
            overflow: 'hidden',
            textWrap: 'auto',
            textAlign: 'center',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {practitioner.org}
        </Typography>
        <IconButton
          size="small"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            color: 'primary.main',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Bottom container for badge, popper, and button */}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center STR trained badge
          gap: 1,
        }}
      >
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <StrTrainedBadge isTrained={strTrained} />
        </Box>

        {/* Display popup with hover events depending on if it's mobile or desktop */}
        <ProfilePopper
          headerRef={headerRef}
          practitioner={practitioner}
          poppedPractitioner={poppedPractitioner}
          setPoppedPractitioner={setPoppedPractitioner}
          sx ={{display: { xs: 'inherit', md: 'none' }}}
        />

        <ProfilePopper
          headerRef={headerRef}
          practitioner={practitioner}
          poppedPractitioner={poppedPractitioner}
          setPoppedPractitioner={setPoppedPractitioner}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx ={{display: { xs: 'none', md: 'inherit' }}}
        />

        <Button
          component="a"
          href={`/practitioner/${practitioner.airtableRecId}`}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<PersonIcon sx={{ mr: '-12px' }}/>}
          variant="contained"
          sx={{
            bgcolor: 'primary.midBlue',
            color: 'primary.white',
            textTransform: 'none',
            borderRadius: 2,
            width: '100%',
            gap: '12px',
            '&:hover': {
              bgcolor: 'primary.main',
            },
          }}
        >
          <Typography sx={{ display: { xs: 'none', md: 'inherit' }, fontSize: '.875rem' }}>View Full Profile</Typography>
        </Button>
      </Box>
    </HeaderBox>
  );
}

export default function PractitionerPane({ community, practitioner, poppedPractitioner, setPoppedPractitioner, availableOptions={availableOptions} }) {
  // Determine if we're on SelfServicePage by checking if community.name is "Self Service"
  const isSelfService = community.name === 'My Community' || community.name.includes(',');
  const sections = [
    [availableOptions?.activities, practitioner.activities],
    [availableOptions?.sectors, practitioner.sectors],
    [availableOptions?.hazards, practitioner.hazards],
    [availableOptions?.size, practitioner.size],
    [availableOptions?.state, practitioner.state],
  ]
    .map(([commCats, practCats]) => matchVals(commCats, practCats))
    .map((matches, index) => {
      return {
        type: 'practitioner',
        id: `section${index}`,
        cards: matches,
      };
    });

  return (
    <Box
      style={{
        backgroundColor: theme.palette.primary.lightGray,
      }}
    >
      <PractitionerHeader
        practitioner={practitioner}
        strTrained={practitioner.strTrained}
        poppedPractitioner={poppedPractitioner}
        setPoppedPractitioner={setPoppedPractitioner}
      />
      <Pane boxShadow={2}>
        {sections.map((section, index) => (
          <div key={section.id}>
            <Section {...section} />
            {/* {isSelfService && (
              <Box
                sx={{
                  height: '51px',
                  mb: 2,
                  visibility: 'hidden',
                }}
              />
            )} */}
          </div>
        ))}
        {/* <ScoreSection style={{ justifyContent: 'center' }}>
          <Box>{practitioner.matchScore}</Box>
        </ScoreSection> */}
      </Pane>
    </Box>
  );
}
