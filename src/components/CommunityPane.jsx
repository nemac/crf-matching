
import { Typography } from "@mui/material";

import HeaderBox from "./HeaderBox";
import ScoreSection from './ScoreSection';
import Pane from './Pane';
import Section from './Section';

import { Box } from '@mui/material';

import theme from '../theme';


const getSectionData = community => [
  {
    header: 'State',
    cards: [ community.state ]
  },
  {
    header: 'Activities',
    cards: community.activities
  },
  {
    header: 'Sectors',
    cards: community.sectors
  },
  {
    header: 'Hazards',
    cards: community.hazards
  },
  {
    header: 'Size',
    cards: [ community.size ]
  }
]
.map(section => {
  section.type = 'community'
  return section
});


export default function CommunityPane({ community }) {
  const sectionData = getSectionData(community);
  return (
    <Box
      sx={{
        bgcolor: 'primary.white',
        borderRadius: 4,
        border: `0px solid ${theme.palette.primary.white}`,
        pr: 1,
        pl: 1,
        pt: 0,
        pb: 0, 
      }}
    >
      <HeaderBox>
        <Typography align="center" variant="h5">{ community.name }</Typography>
      </HeaderBox>
      <Pane>
        {
          sectionData.map((section, index) => {
            section.key=index;
            return Section(section)
          })
        }
        <ScoreSection
          style={{
            justifyContent: 'space-between',
          }} 
        >
          <div>Total</div>
          <div>{ community.totalCategories }</div>
        </ScoreSection>
      </Pane>
    </Box>
  )
}

