import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

const PulldownFilter = props => {
  const {
    filterId,
    filterText,
    filterName,
    boxSx,
    handleChange = e => setSelectedValue(e.target.value),
  } = props;
  // to be uncommented and probably changed for when active filters are to be used
  const [options, setOptions] = useState([
    { id: 1, label: 'one', value: 1 },
    { id: 2, label: 'two', value: 2 },
    { id: 3, label: 'three', value: 3 },
  ]);
  const [selectedValue, setSelectedValue] = useState([]);
  // useEffect(() => {
  //   fetch('api/filters')
  //     .then(res => res.json())
  //     .then(data => setFilters(date));
  // }, []);
  return (
    <Box
      sx={{
        px: 1,
        py: 1,
        display: 'inline-flex',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        ...boxSx,
      }}
    >
      <FormControl>
        <InputLabel
          sx={{
            transform: 'translate(14px, 6px) scale(1)',
          }}
          id={filterName ?? 'To be filled'}
        >
          {filterText ?? 'label be filled'}
        </InputLabel>
        <Select
          notched={false}
          sx={{
            width: 248,
            height: 34,
            backgroundColor: '#FFFFFF',
            borderRadius: 9,
          }}
          labelId={filterName ?? 'fil name be filled'}
          id={filterId ?? 'Filter Id to be filled'}
          value={selectedValue}
          label={filterText ?? 'Filters'}
          onChange={handleChange}
        >
          {options.map(option => (
            <MenuItem key={option.id} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PulldownFilter;
