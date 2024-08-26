
import { Box } from "@mui/material";

import theme from '../../theme';

export default function PractMatchSymbol({ label }) {
  // label is a boolean
  return (
    <Box sx={{
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {
        label
          ? <PractMatchIcon></PractMatchIcon>
          : <PractNoMatchSvg></PractNoMatchSvg>
      }
    </Box>
  )
}

function PractMatchIcon() {
  // check mark in a circle
  return (
    <svg
      width="25" height="25" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 0C8.064 0 0 8.064 0 18C0 27.936 8.064 36 18 36C27.936 36 36 27.936 36 18C36 8.064 27.936 0 18 0ZM14.4 27L5.4 18L7.938 15.462L14.4 21.906L28.062 8.244L30.6 10.8L14.4 27Z"
        fill={ theme.palette.primary.matchGreen }
      />
    </svg>
  )
}

function PractNoMatchSvg({ length }) {
  // red circle with a hollow dash in the middle
  return (
    <svg width="25" height="25" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 0C6.272 0 0 6.272 0 14C0 21.728 6.272 28 14 28C21.728 28 28 21.728 28 14C28 6.272 21.728 0 14 0ZM21 15.4H7V12.6H21V15.4Z"
      fill={ theme.palette.primary.noMatchRed }
    />
    </svg>
  )
}