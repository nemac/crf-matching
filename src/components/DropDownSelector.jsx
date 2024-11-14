import React, { useState } from 'react';
import theme from '../theme';

const DropDownSelector = ({ availableSelections, selections, setSelections, option }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAdd = (itemToAdd) => {
    if (!selections.includes(itemToAdd)) {
      setSelections([...selections, itemToAdd]);
    }
    setIsDropdownOpen(false);
  };

  return (
    <div>
      {/* Add Button & Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 12px',
            color: theme.palette.primary.midBlue,
            backgroundColor: theme.palette.primary.lightBlue,
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          <span style={{ fontSize: '20px' }}>+</span>
          Add another {option}
        </button>

        {isDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              width: '100%',
              marginTop: '4px',
              backgroundColor: theme.palette.primary.white,
              border: `1px solid ${theme.palette.primary.borderGray}`,
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              maxHeight: '240px',
              overflowY: 'auto',
            }}
          >
            {availableSelections
              .filter((item) => !selections.includes(item))
              .map((item) => (
                <button
                  key={item}
                  onClick={() => handleAdd(item)}
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    textAlign: 'left',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: theme.palette.primary.main,
                    ':hover': {
                      backgroundColor: theme.palette.primary.lightGray,
                    },
                  }}
                >
                  {item}
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownSelector;
