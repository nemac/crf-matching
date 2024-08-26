
import { Typography, Box } from "@mui/material"

import Cell from "./Cell"

export default function Section ({ header='', type, cards, key }) {
  const cells = cards.map((label, index) => Cell({ label, type, key: index }))
  return (
    <Box key={ key }>
      <Box sx={{ minHeight: '40px', mt: '10px', mb: '10px' }}>
        <Typography variant="h5" >{ header }</Typography>
      </Box>
      { cells }
    </Box>
  )
}

