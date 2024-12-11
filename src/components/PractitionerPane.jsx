import { useRef } from 'react';
import { Typography, Box, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

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
          borderRadius: {
            xs: 0,
            md: 2,
          },
          bgcolor: {
            xs: 'primary.lightBlue',
            md: 'transparent',
          },
          color: {
            xs: 'primary.main',
            md: 'primary.main',
          },
          border: {
            xs: 'none',
            md: `1px solid ${theme.palette.primary.main}`,
          },
          flexGrow: 'space-around',
          verticalAlign: 'middle',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          py: 1,
        }}
      >
        <SchoolIcon sx={{ fontSize: '1.2rem' }} />
        <Typography
          sx={{
            display: {
              xs: 'none',
              md: 'inherit',
            },
            fontSize: '0.875rem',
            marginLeft: '8px',
            fontWeight: 'normal',
          }}
        >
          STR Trained
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

  const onMouseEnter = (e) => {
    setPoppedPractitioner(practitioner);
  };

  return (
    <HeaderBox
      sx={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        // width: '80%',
        margin: '0 auto',
        padding: '8px 0',
        display: {
          md: 'flex',
          xs: 'block',
        },
      }}
      ref={headerRef}
      onMouseEnter={onMouseEnter}
    >
      <StyledBox
        sx={{
          display: 'flex',
          verticalAlign: 'middle',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: {
            xs: 'primary.main',
            md: 'primary.lightGray',
          },
        }}
      >
        <PersonIcon
          sx={{
            display: {
              xs: 'inherit',
              md: 'none',
            },
            color: 'primary.lightBlue',
          }}
        />
      </StyledBox>
      {/* practitioner label - hidden on xs */}
      <Typography
        variant="h5"
        sx={{
          display: {
            xs: 'none',
            md: '-webkit-box',
          },
          overflow: 'hidden',
          paddingRight: '10px', //chrome bug where full ellipses won't show without padding
          textWrap: 'auto',
          textAlign: 'center',
          WebkitLineClamp: '3',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {practitioner.org}
      </Typography>
      <StrTrainedBadge isTrained={strTrained}></StrTrainedBadge>
      <ProfilePopper
        headerRef={headerRef}
        practitioner={practitioner}
        poppedPractitioner={poppedPractitioner}
        setPoppedPractitioner={setPoppedPractitioner}
      ></ProfilePopper>
    </HeaderBox>
  );
}

export default function PractitionerPane({ community, practitioner, poppedPractitioner, setPoppedPractitioner }) {
  // Determine if we're on SelfServicePage by checking if community.name is "Self Service"
  const isSelfService = community.name === 'My Community' || community.name.includes(',');

  const sections = [
    [community.state, practitioner.state],
    [community.activities, practitioner.activities],
    [community.sectors, practitioner.sectors],
    [community.hazards, practitioner.hazards],
    [community.size, practitioner.size],
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
        // flex: '1 1 33%',
        backgroundColor: theme.palette.primary.lightGray,
      }}
    >
      <PractitionerHeader
        practitioner={practitioner}
        linkPath={`/practitioner/${practitioner.airtableRecId}`}
        strTrained={practitioner.strTrained}
        poppedPractitioner={poppedPractitioner}
        setPoppedPractitioner={setPoppedPractitioner}
      />
      <Pane boxShadow={2}>
        {sections.map((section, index) => (
          <div key={section.id}>
            <Section {...section} />
            {/* Add invisible spacer that matches "Add another" button if on SelfServicePage */}
            {isSelfService && (
              <Box
                sx={{
                  height: '51px', // Match button height
                  mb: 2, // Match button margin
                  visibility: 'hidden',
                }}
              >
                {/* Empty box with same dimensions as Add Another button */}
              </Box>
            )}
          </div>
        ))}
        <ScoreSection style={{ justifyContent: 'center' }}>
          <Box>{practitioner.matchScore}</Box>
        </ScoreSection>
      </Pane>
    </Box>
  );
}
