import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterCheck from './FilterCheck.jsx';

const PulldownFilter = props => {
  const {
    filterId,
    filterText,
    filterName,
    boxSx,
    onChange,
    availableOptions,
    selectedValues,
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: 250,
        minWidth: 250,
        maxWidth: 250,
        ...boxSx,
      }}
    >
      <FormControl sx={{ width: '100%' }}>
        <Select
          multiple
          displayEmpty
          notched={false}
          renderValue={() => filterText}
          sx={{
            width: '100%',
            height: 36,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderRadius: '12px',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
            '& .MuiSelect-select': {
              padding: '0px 24px',
              display: 'flex',
              alignItems: 'center',
              color: '#6C788D',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '19px',
            },
            '& .MuiSelect-icon': {
              color: '#6C788D',
              opacity: 0.5,
              right: 24,
            },
          }}
          labelId={filterName ?? 'filter-label'}
          id={filterId ?? 'filter-id'}
          value={selectedValues}
          onChange={onChange}
          MenuProps={{
            PaperProps: {
              sx: {
                minWidth: 250,
                maxHeight: 360,
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: 'none',
                padding: '4px',
                mt: 0.5,
              },
            },
          }}
        >
          {availableOptions?.map(option => (
            <MenuItem
              key={option}
              value={option}
              sx={{
                padding: '8px 12px',
                gap: 1,
                backgroundColor: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#F9FAFB',
                },
                '&.Mui-selected': {
                  backgroundColor: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#F9FAFB',
                  },
                },
              }}
            >
              <FilterCheck
                text={option}
                checked={selectedValues.includes(option)}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PulldownFilter;
