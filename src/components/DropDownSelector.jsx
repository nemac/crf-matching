import React, { useState } from 'react';

const DropDownSelector = (props) => {
  const { availableSelections, selections, setSelections, option } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAdd = (itemToAdd) => {
    if (!selections.includes(itemToAdd)) {
      setSelections([...selections, itemToAdd]);
    }
    setIsDropdownOpen(false);
  };

  const handleRemove = (itemToRemove) => {
    setSelections(selections.filter((item) => item !== itemToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="font-medium text-gray-700">{option}</div>

      {/* Selected States */}
      <div className="flex flex-col gap-2">
        {selections.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between px-3 py-2 bg-amber-50 rounded"
          >
            <span>{item}</span>
            <button
              onClick={() => handleRemove(item)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Add State Button & Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-3 py-2 text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
        >
          <span className="text-lg">+</span>
          Add another {option}
        </button>

        {isDropdownOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {availableSelections
              .filter((item) => !selections.includes(item))
              .map((item) => (
                <button
                  key={item}
                  onClick={() => handleAdd(item)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
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
