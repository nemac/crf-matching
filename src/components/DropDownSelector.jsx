import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

// Styled components
const AddButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  color: '#fff',
  backgroundColor: '#2196f3',
  borderRadius: '4px',
  textTransform: 'none',
  justifyContent: 'flex-start',
  width: '400px',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
  '& .MuiButton-startIcon': {
    marginRight: 4,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: '400px',
    maxHeight: '240px',
    marginTop: '4px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    border: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    padding: '8px', // Add padding around the menu items
  },
  '& .MuiList-root': {
    padding: '4px',
  },
  '& .MuiMenuItem-root': {
    fontSize: '14px',
    padding: '8px 12px',
    margin: '4px 0', // Add vertical margin between items
    borderRadius: '20px', // Make items pill-shaped
    backgroundColor: '#e3f2fd', // Light blue background
    color: '#1976d2', // Darker blue text
    '&:hover': {
      backgroundColor: '#bbdefb', // Slightly darker on hover
    },
  },
}));

const PlusIcon = styled('span')({
  fontSize: '20px',
  marginRight: '8px',
  fontWeight: 'normal',
});

const DropDownSelector = ({ availableSelections, selections, setSelections, option }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAdd = (itemToAdd) => {
    if (!selections.includes(itemToAdd)) {
      setSelections([...selections, itemToAdd]);
    }
    handleClose();
  };

  // Filter out already selected items
  const availableItems = availableSelections.filter((item) => !selections.includes(item));

  // Trim the option name for better display
  let trimmedOption = option;
  if (option === 'Activities') {
    trimmedOption = 'activity';
  } else if (option.endsWith('s')) {
    trimmedOption = option.slice(0, -1);
  }

  return (
    <div>
      <AddButton
        id="dropdown-button"
        aria-controls={open ? 'dropdown-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<PlusIcon>+</PlusIcon>}
        sx={{ width: '100%' }}
      >
        <Typography sx={{ display: { xs: 'none', md: 'inherit' }, fontSize: '.875rem', whiteSpace: 'nowrap', }}>Add another {trimmedOption.toLowerCase()}</Typography>
        {/* <Typography sx={{ display: { xs: 'inherit', md: 'none' }, fontSize: '.875rem', textTransform: 'capitalize', whiteSpace: 'nowrap', }}>{trimmedOption}</Typography> */}
      </AddButton>

      <StyledMenu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'dropdown-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {availableItems.map((item) => (
          <MenuItem
            key={item}
            onClick={() => handleAdd(item)}
          >
            {item}
          </MenuItem>
        ))}
        {availableItems.length === 0 && <MenuItem disabled>No more options available</MenuItem>}
      </StyledMenu>
    </div>
  );
};

export default DropDownSelector;
