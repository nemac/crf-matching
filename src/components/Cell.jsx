
import { Box, Typography } from "@mui/material";

import PractMatchSymbol from "./svg/PractMatchSymbol"

import theme from '../theme';

export default function Cell ({ label, type, key }) {
  let content
  if (type === 'community') {
    content = <Typography
      variant="body1"
      sx={{ textAlign: 'left' }}
    >{ label }</Typography>
  } else {
    content = PractMatchSymbol({ label })
  }
  return (
    <Box
      key={ key }
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        padding: 3,
        bgcolor: 'primary.tan',
        height: 50,
        justifyContent: 'center',
      }}
    >
    { content }
  </Box>
  )
}

