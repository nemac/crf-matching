import { Typography, Box, Stack } from '@mui/material';

import Cell from './Cell';

export default function Section({ header = '', type, cards, id }) {
  const cells = cards.map((label, index) => Cell({ label, type, key: `${id}_row${index}` }));
  return (
    <Box
      key={id}
      sx={{ mb: 2 }}
    >
      <Box sx={{ minHeight: '40px', mt: '5px', mb: '5px' }}>
        <Typography variant="body1">{header}</Typography>
      </Box>
      <Stack
        gap={2}
        useFlexGap={true}
      >
        {cells}
      </Stack>
    </Box>
  );
}
