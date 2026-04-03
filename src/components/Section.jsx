import { Typography, Box, Stack } from '@mui/material';
import Cell from './Cell';

export default function Section({
  header = '',
  type,
  cards,
  id,
  isSelectable,
  onSelectionChange,
}) {
  const handleRemove = itemToRemove => {
    const newSelections = cards.filter(item => item !== itemToRemove);
    onSelectionChange(header.toLowerCase(), newSelections);
  };

  const cells = cards.map((label, index) =>
    Cell({
      label,
      type,
      key: `${id}_row${index}`,
      isSelectable,
      onRemove: handleRemove,
    })
  );

  return (
    <Box key={id} sx={{ mb: 2 }}>
      <Box sx={{ minHeight: { xs: '60px', md: '40px' }, mt: '5px', mb: '5px' }}>
        <Typography
          variant="h4"
          sx={{
            color: '#6C788D',
            textAlign: type === 'practitioner' ? 'center' : 'left',
          }}
        >
          {header}
        </Typography>
      </Box>

      <Stack gap={0} useFlexGap>
        {cells}
      </Stack>

      {/* {isSelectable && (
        <Box
          sx={{
            mt: 2,
            backgroundColor: theme.palette.primary.white,
            borderRadius: 2,
          }}
        >
          <DropDownSelector
            availableSelections={availableSelections}
            selections={cards}
            setSelections={(newSelections) => onSelectionChange(header.toLowerCase(), newSelections)}
            option={header}
          />
        </Box>
      )} */}
    </Box>
  );
}
