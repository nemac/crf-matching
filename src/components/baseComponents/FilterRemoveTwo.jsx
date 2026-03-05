import Chip from '@mui/material/Chip';

const FilterRemoveTwo = props => {
  const { text } = props;
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };
  return (
    <>
      <Chip
        sx={{
          width: '146px',
          height: '40px',
          borderRadius: '9999px',
          pt: '6px',
          pr: '4px',
          pl: '12px',
          pb: '6px',
          gap: '4px',
          backgroundColor: '#F9FAFB',
          border: '1px solid #0066CC',
          '& .MuiChip-label': {
            font: 'roboto',
            fontStyle: 'regular',
            color: '#0066CC',
            fontWeight: 400,
            fontSize: 16,
            overflow: 'visible',
            textOverflow: 'unset',
            whiteSpace: 'nowrap',
          },
          '& .MuiChip-deleteIcon': {
            width: 26,
            height: 26,
            color: '#0066CC',
            borderRadius: '9999px',
            p: '2px',
            gap: '10px',
          },
        }}
        label={text ?? 'Filter Name'}
        onDelete={handleDelete}
      />
    </>
  );
};

export default FilterRemoveTwo;
