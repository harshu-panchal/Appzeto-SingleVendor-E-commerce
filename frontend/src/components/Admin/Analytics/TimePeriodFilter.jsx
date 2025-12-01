import { useState } from 'react';
import { FiCalendar } from 'react-icons/fi';

const TimePeriodFilter = ({ onPeriodChange, selectedPeriod = 'month' }) => {
  const periods = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
  ];

  return (
    <div className="flex items-center gap-2">
      <FiCalendar className="text-gray-500" />
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        {periods.map((period) => (
          <button
            key={period.value}
            onClick={() => onPeriodChange(period.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period.value
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {period.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimePeriodFilter;

