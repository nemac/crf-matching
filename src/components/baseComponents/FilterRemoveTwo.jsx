import Chip from '@mui/material/Chip';

const FilterRemoveTwo = props => {
  const { text, onDelete } = props;
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };
  return (
    <>
      <Chip
        sx={{
          height: '40px',
          borderRadius: '9999px',
          pt: '6px',
          pr: '4px',
          pl: '12px',
          pb: '6px',
          gap: 0.5,
          backgroundColor: 'primary.sectionBg',
          border: '1px solid #0066CC',
          maxWidth: '100%',
          '& .MuiChip-label': {
            color: 'primary.linkBlue',
            fontWeight: 400,
            fontSize: 12,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '& .MuiChip-deleteIcon': {
            width: 26,
            height: 26,
            color: 'primary.linkBlue',
            borderRadius: '9999px',
            p: '2px',
            gap: 1,
          },
        }}
        label={text ?? 'Filter Name'}
        onDelete={handleDelete}
      />
    </>
  );
};

export default FilterRemoveTwo;
