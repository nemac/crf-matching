
import { Typography } from "@mui/material";

import styles from "../styles"

import HeaderSection from "./HeaderSection";
import CommunityCategoryList from './CommunityCategoryList';


export default function CommunityPanel({ community }) {
  return (
    <div
      style={{
        backgroundColor: styles.colors.white,
        borderRadius: '15px',
        border: `0px solid ${styles.colors.white}`,
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

