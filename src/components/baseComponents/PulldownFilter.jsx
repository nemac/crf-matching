import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterCheck from './FilterCheck.jsx';
import { fetchOptionsFromAirtable } from '../../util/api';
import { useState, useEffect } from 'react';

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
        px: 1,
        py: 1,
        display: 'flex',
        flexGrow: 1,
        alignItems: 'stretch',
        alignSelf: 'flex-start',
        justifyContent: 'space-between',
        ...boxSx,
      }}
    >
      <FormControl
        sx={{
          flexGrow: 1,
          flexShrink: 0,
          minWidth: 200,
        }}
      >
        {selectedValues.length === 0 && (
          <InputLabel
            sx={{
              transform: 'translate(14px, 6px) scale(1)',
            }}
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
            width: '100%',
            height: 34,
            backgroundColor: '#FFFFFF',
            borderRadius: 9,
          }}
          labelId={filterName ?? 'fil name be filled'}
          id={filterId ?? 'Filter Id to be filled'}
          value={selectedValues}
          label={filterText ?? 'Filters'}
          onChange={onChange}
        >
          {availableOptions?.map(option => (
            <MenuItem key={option} value={option}>
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
