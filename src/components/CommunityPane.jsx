import { Typography, Box, Stack } from '@mui/material';
import HeaderBox from './HeaderBox';
import ScoreSection from './ScoreSection';
import Pane from './Pane';
import Section from './Section';
import theme from '../theme';

const getSectionData = (community, isSelectable, availableOptions, onSelectionChange) =>
  [
    {
      header: 'Activities',
      cards: availableOptions?.activities,
      // availableSelections: isSelectable ? availableOptions?.activities || [] : [],
      availableSelections: availableOptions?.activities // || [],
    },
    {
      header: 'Sectors',
      cards: availableOptions?.sectors,
      // availableSelections: isSelectable ? availableOptions?.sectors || [] : [],
      availableSelections: availableOptions?.sectors // || [],
    },
    {
      header: 'Hazards',
      cards: availableOptions?.hazards,
      // availableSelections: isSelectable ? availableOptions?.hazards || [] : [],
      availableSelections: availableOptions?.hazards // || [],
    },
    {
      header: 'Community Population',
      cards: availableOptions?.size,
      // availableSelections: isSelectable ? availableOptions?.size || [] : [],
      availableSelections: availableOptions?.size // || [],
    },
    {
      header: 'State',
      cards: availableOptions?.state,
      // availableSelections: isSelectable ? availableOptions?.state || [] : [],
      availableSelections: availableOptions?.state // || [],
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

  console.log(availableOptions)
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
            {/* {community.name} */}
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
        {/* <ScoreSection
          sx={{
            pr: 2,
            pl: 1,
            justifyContent: 'space-between',
          }}
        >
          <div>Total</div>
          <div>{community.totalCategories}</div>
        </ScoreSection> */}
      </Pane>
    </Box>
  );
}
