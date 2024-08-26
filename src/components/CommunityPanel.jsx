
import { Typography } from "@mui/material";

import HeaderBox from "./HeaderBox";
import ScoreSection from './ScoreSection';
import Pane from './Pane';
import Section from './Section';

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


export default function CommunityPanel({ community }) {
  const sectionData = getSectionData(community);
  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.white,
        borderRadius: '15px',
        border: `0px solid ${theme.palette.primary.white}`,
        paddingBottom: '10px',
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
    </div>
  )
}

