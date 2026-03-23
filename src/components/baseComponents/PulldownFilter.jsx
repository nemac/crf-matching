import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterCheck from './FilterCheck.jsx';
import { fetchOptionsFromAirtable } from '../../util/api';
import { useState, useEffect } from 'react';

const PulldownFilter = props => {
  const [selectedValue, setSelectedValue] = useState([]);
  console.log('press the button');
  const { filterId, filterText, filterName, boxSx, onChange } = props;
  console.log('pressed the button');
  // to be uncommented and probably changed for when active filters are to be used
  const [options, setOptions] = useState([
    { id: 1, label: 'one', value: 1 },
    { id: 2, label: 'two', value: 2 },
    { id: 3, label: 'three', value: 3 },
  ]);

  const handleChange = e => {
    const value = e.target.value;
    setSelectedValue(typeof value === 'string' ? value.split(',') : value);
    props.onChange?.(value);
  };
  const [selectedOptions, setSelectedOptions] = useState({
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
  });
  const [availableOptions, setAvailableOptions] = useState({
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
  });

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
        {selectedValue.length === 0 && (
          <InputLabel
            sx={{ transform: 'translate(14px, 6px) scale(1)' }}
            id={filterName ?? 'To be filled'}
          >
            {filterText ?? 'label be filled'}
          </InputLabel>
        )}
        <Select
          multiple
          notched={false}
          renderValue={() => filterText}
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
              <FilterCheck
                text={option.label}
                checked={selectedValue.includes(option.value)}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default PulldownFilter;
