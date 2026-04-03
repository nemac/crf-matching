import { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { RowHoverContext, SetHoverRowContext } from './RowHoverContext';
import PractMatchSymbol from './svg/PractMatchSymbol';
import theme from '../theme';

export default function Cell({ label, type, key, isSelectable, onRemove }) {
  const hoverRow = useContext(RowHoverContext);
  const setHoverRow = useContext(SetHoverRowContext);

  let content;
  if (type === 'community') {
    content = (
      <Typography
        sx={{
          fontWeight: 400,
          fontSize: '12px',
          color: 'primary.linkBlue',
        }}
      >
        {label}
      </Typography>
    );
  } else {
    content = PractMatchSymbol({ label });
  }

  const practitionerCellSx = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4px',
    gap: '10px',
    width: '100%',
    height: 34,
    maxHeight: 34,
    bgcolor: key === hoverRow ? 'primary.cellHoverBg' : '#FFFFFF',
    borderWidth: '1px 0px',
    borderStyle: 'solid',
    borderColor: '#66CCFF',
  };

  const communityCellSx = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '6px 12px',
    gap: '4px',
    height: 34,
    minHeight: 34,
    bgcolor: key === hoverRow ? 'primary.cellHoverBg' : '#FFFFFF',
    borderWidth: '1px 0px 1px 1px',
    borderStyle: 'solid',
    borderColor: '#66CCFF',
    borderRadius: '9999px 0px 0px 9999px',
  };

  return (
    <Box
      onMouseEnter={(e) => setHoverRow(key)}
      onMouseLeave={(e) => setHoverRow(null)}
      key={key}
      sx={type === 'practitioner' ? practitionerCellSx : communityCellSx}
    >
      {content}
    </Box>
  );
}
