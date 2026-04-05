import { Typography, Box, Stack } from '@mui/material';
import HeaderBox from './HeaderBox';

import Section from './Section';
import theme from '../theme';

const getSectionData = (
  community,
  isSelectable,
  availableOptions,
  onSelectionChange
) =>
  [
    {
      header: 'Services Provided',
      cards: availableOptions?.activities,
      availableSelections: availableOptions?.activities,
    },
    {
      header: 'Climate Hazards',
      cards: availableOptions?.hazards,
      availableSelections: availableOptions?.hazards,
    },
    {
      header: 'Sectors',
      cards: availableOptions?.sectors,
      availableSelections: availableOptions?.sectors,
    },
    {
      header: 'Population Size',
      cards: availableOptions?.size,
      availableSelections: availableOptions?.size,
    },
    {
      header: 'State or Territory',
      cards: availableOptions?.state,
      availableSelections: availableOptions?.state,
    },
  ].map((section, index) => ({
    ...section,
    type: 'community',
    id: `section${index}`,
    isSelectable,
    onSelectionChange,
  }));

export default function CommunityPane(props) {
  const {
    community,
    isSelectable = false,
    availableOptions = {},
    onSelectionChange = () => {},
    showHeader = true,
    headerSpacerHeight = 0,
  } = props;
  const sectionData = getSectionData(
    community,
    isSelectable,
    availableOptions,
    onSelectionChange
  );

  return (
    <Box
      sx={{
        bgcolor: 'primary.sectionBg',
        borderRadius: 4,
        border: `0px solid ${theme.palette.primary.white}`,
        pr: 1,
        pl: 1,
        pt: { xs: 1, sm: 1.5, md:  1.2},
        pb: 1,
      }}
    >
      {showHeader ? (
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
          <Box sx={{ height: '40px', width: '100%' }} />
        </Stack>
      ) : headerSpacerHeight > 0 ? (
        <Box sx={{ height: headerSpacerHeight, width: '100%' }} />
      ) : null}
      <Stack
        sx={{
          pt: 1,
          pb: 1,
          border: `1px solid ${theme.palette.primary.borderGray}`,
          borderRadius: '10px',
          boxShadow: 2,
          pl: 1,
        }}
      >
        {sectionData.map(section => (
          <Section key={section.id} {...section} />
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
      </Stack>
    </Box>
  );
}
