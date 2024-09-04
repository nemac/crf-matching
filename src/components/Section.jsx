
import { Typography, Box, Stack } from "@mui/material"

import Cell from "./Cell"

export default function Section ({ header='', type, cards, key }) {
  const cells = cards.map((label, index) => Cell({ label, type, key: `${key}_row${index}` }))
  return (
    <Box key={ key } sx={{ mb: 2 }}>
      <Box sx={{ minHeight: '40px', mt: '5px', mb: '5px' }}>
        <Typography variant="body1" >{ header }</Typography>
      </Box>
      <Stack gap={2} useFlexGap={true}>
        { cells }
      </Stack>
    </Box>
  )
}
