'use client';

import { useState } from 'react';

const Filter = ({ onFilterChange }) => {
  const [selectedOption, setSelectedOption] = useState('date_desc');

  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSelectedOption(newSortOption);
    if (onFilterChange && typeof onFilterChange === 'function') {
      onFilterChange(newSortOption);
    } else {
      console.error('onFilterChange is not a function');
    }
  };

  return (
    <div className="p-4">
      <label htmlFor="sort" className="mr-2">Sort by:</label>
      <select
        id="sort"
        value={selectedOption}
        onChange={handleSortChange}
        className="border rounded p-2"
      >
        <option value="date_desc">Date (Newest First)</option>
        <option value="date_asc">Date (Oldest First)</option>
        {/* Add more sorting options if needed */}
      </select>
    </div>
  );
};

export default Filter;
