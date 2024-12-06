import { useState, useEffect } from 'react';
import { fetchPractitionersByFilters, fetchOptionsFromAirtable } from '../util/api';
import ComparisonBoard from '../components/ComparisonBoard';

export default function SelfServicePage() {
  const [selectedOptions, setSelectedOptions] = useState({
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
  });

  const [availableOptions, setAvailableOptions] = useState({
    state: [],
    activities: [],
    sectors: [],
    hazards: [],
    size: [],
  });

  const [practitioners, setPractitioners] = useState([]);
  const [displayCount, setDisplayCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const community = {
    name: 'My Community',
    state: selectedOptions.state,
    activities: selectedOptions.activities,
    sectors: selectedOptions.sectors,
    hazards: selectedOptions.hazards,
    size: selectedOptions.size,
    totalCategories: Object.values(selectedOptions).reduce((sum, arr) => sum + arr.length, 0),
  };

  useEffect(() => {
    const loadOptions = async () => {
      setIsLoading(true);
      await fetchOptionsFromAirtable(setAvailableOptions);
    };

    loadOptions()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  const handleSelectionChange = (category, newSelections) => {
    const updatedOptions = {
      ...selectedOptions,
      [category]: newSelections,
    };
    setSelectedOptions(updatedOptions);
    fetchPractitionersByFilters(updatedOptions, setPractitioners);
  };

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (isLoading) {
    return <div className="p-4">Loading options...</div>;
  }

  return (
    <ComparisonBoard
      community={community}
      practitioners={practitioners}
      isSelectable={true}
      availableOptions={availableOptions}
      onSelectionChange={handleSelectionChange}
      displayCount={displayCount}
      setDisplayCount={setDisplayCount}
    />
  );
}
