
import { useContext } from "react";
import { Box, Typography } from "@mui/material";

import { RowHoverContext, SetHoverRowContext } from "./RowHoverContext";

import PractMatchSymbol from "./svg/PractMatchSymbol"

import theme from "../theme";

export default function Cell ({ label, type, key }) {
  const hoverRow = useContext(RowHoverContext);
  const setHoverRow = useContext(SetHoverRowContext);

  let content;
  if (type === 'community') {
    content = <Typography variant="body1" sx={{ textAlign: 'left' }}>
      { label }
    </Typography>
  } else {
    content = PractMatchSymbol({ label })
  }
  return (
    <Box
      onMouseEnter={ e => {
        setHoverRow(key);
      }}
      onMouseLeave={ e => {
        setHoverRow(null);
      }}
      key={ key }
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: type === 'community' ? theme.spacing(2) : 0,
        borderBottomLeftRadius: type === 'community' ? theme.spacing(2) : 0,
        padding: 3,
        bgcolor: key === hoverRow ? 'primary.cellHoverBg' : 'primary.tan',
        height: { xs: 120, md: 50 },
        justifyContent: 'center',
      }}
    >
    { content }
  </Box>
  )
}

