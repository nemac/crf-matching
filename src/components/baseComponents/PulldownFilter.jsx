import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

const PulldownFilter = props => {
  const { filterId, filterText, filterName, boxSx } = props;
  // to be uncommented and probably changed for when active filters are to be used
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const handleChange = e => setSelectedValue(e.target.value);
  // useEffect(() => {
  //   fetch('api/filters')
  //     .then(res => res.json())
  //     .then(data => setFilters(date));
  // }, []);
  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        display: 'inline-flex',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        ...boxSx,
      }}
    >
      <FormControl fullWidth>
        <InputLabel
          sx={{
            transform: 'translate(14px, 6px) scale(1)',
          }}
          id={filterName ?? 'To be filled'}
        >
          {filterText ?? 'label be filled'}
        </InputLabel>
        <Select
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
