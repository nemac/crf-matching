import PropTypes from 'prop-types';
import { Typography, Box, Stack } from '@mui/material';
import HeaderBox from './HeaderBox';
import ScoreSection from './ScoreSection';
import Pane from './Pane';
import Section from './Section';
import theme from '../theme';

const getSectionData = (community, isSelectable, availableOptions, onSelectionChange) =>
  [
    {
      header: 'State',
      cards: community.state,
      availableSelections: isSelectable ? availableOptions?.state || [] : [],
    },
    {
      header: 'Activities',
      cards: community.activities,
      availableSelections: isSelectable ? availableOptions?.activities || [] : [],
    },
    {
      header: 'Sectors',
      cards: community.sectors,
      availableSelections: isSelectable ? availableOptions?.sectors || [] : [],
    },
    {
      header: 'Hazards',
      cards: community.hazards,
      availableSelections: isSelectable ? availableOptions?.hazards || [] : [],
    },
    {
      header: 'Size',
      cards: community.size,
      availableSelections: isSelectable ? availableOptions?.size || [] : [],
    },
  ].map((section, index) => ({
    ...section,
    type: 'community',
    id: `section${index}`,
    isSelectable: isSelectable,
    onSelectionChange: onSelectionChange,
  }));

export default function CommunityPane({
  community,
  isSelectable = false,
  availableOptions = {},
  onSelectionChange = () => {},
}) {
  const sectionData = getSectionData(community, isSelectable, availableOptions, onSelectionChange);

  return (
    <Box
      sx={{
        bgcolor: 'primary.white',
        borderRadius: 4,
        border: `0px solid ${theme.palette.primary.white}`,
        pr: 1,
        pl: 1,
        pt: 0,
        pb: 1,
      }}
    >
      <Stack sx={{ width: '100%' }}>
        <HeaderBox>
          <Typography
            color="primary.main"
            fontWeight="700"
            align="center"
            variant="h5"
            sx={{
              fontSize: {
                xs: '1rem',
                lg: '1.5rem',
              },
            }}
          >
            {community.name}
          </Typography>
        </HeaderBox>
        <Box sx={{ height: '40px', width: '100%' }}></Box>
      </Stack>
      <Pane
        boxShadow={2}
        sx={{ pl: 1 }}
      >
        {sectionData.map((section) => (
          <Section
            key={section.id}
            {...section}
          />
        ))}
        <ScoreSection
          sx={{
            pr: 2,
            pl: 1,
            justifyContent: 'space-between',
          }}
        >
          <div>Total</div>
          <div>{community.totalCategories}</div>
        </ScoreSection>
      </Pane>
    </Box>
  );
}
