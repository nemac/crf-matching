
import { Typography } from "@mui/material";

import HeaderSection from "./HeaderBox";
import CommunityCategoryList from './CommunityCategoryList';

import theme from '../theme';

export default function CommunityPanel({ community }) {
  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.white,
        borderRadius: '15px',
        border: `0px solid ${theme.palette.primary.white}`,
        paddingBottom: '10px',
      }} 
    >
      <HeaderSection>
        <Typography align="center" variant="h4">{ community.name }</Typography>
      </HeaderSection>
      <CommunityCategoryList
        community={ community } 
      ></CommunityCategoryList>
    </div>
  )
}

