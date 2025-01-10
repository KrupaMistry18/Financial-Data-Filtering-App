import React, { useState } from 'react';

const Filters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    start_year: "",
    end_year: "",
    min_revenue: "",
    max_revenue: "",
    min_net_income: "",
    max_net_income: "",
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1966 + 1 }, (_, i) => currentYear - i);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    const startYear = filters.start_year ? parseInt(filters.start_year) : null;
    const endYear = filters.end_year ? parseInt(filters.end_year) : null;
    const minRevenue = filters.min_revenue ? parseFloat(filters.min_revenue) : null;
    const maxRevenue = filters.max_revenue ? parseFloat(filters.max_revenue) : null;
    const minNetIncome = filters.min_net_income ? parseFloat(filters.min_net_income) : null;
    const maxNetIncome = filters.max_net_income ? parseFloat(filters.max_net_income) : null;

    // Alert if Start Year > End Year
    if (startYear && endYear && startYear > endYear) {
      alert("Start Year cannot be greater than End Year.");
      return;
    }

    // Alert for negative values in numeric fields
    if ((minRevenue && minRevenue < 0) || (maxRevenue && maxRevenue < 0) || (minNetIncome && minNetIncome < 0) || (maxNetIncome && maxNetIncome < 0)) {
      alert("Revenue and Net Income values cannot be negative.");
      return;
    }

    const cleanedFilters = {
      start_year: startYear,
      end_year: endYear,
      min_revenue: minRevenue,
      max_revenue: maxRevenue,
      min_net_income: minNetIncome,
      max_net_income: maxNetIncome,
    };

    onFilter(cleanedFilters); // Call parent function with cleaned filters
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Start Year</label>
        <select name="start_year" onChange={handleChange} className="p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-400">
          <option value="">Select Start Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">End Year</label>
        <select name="end_year" onChange={handleChange} className="p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-400">
          <option value="">Select End Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Min Revenue (in B)</label>
        <input type="number" name="min_revenue" placeholder="e.g., 200" onChange={handleChange} className="p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-400" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Max Revenue (in B)</label>
        <input type="number" name="max_revenue" placeholder="e.g., 500" onChange={handleChange} className="p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-400" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Min Net Income (in B)</label>
        <input type="number" name="min_net_income" placeholder="e.g., 100" onChange={handleChange} className="p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-400" />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-semibold mb-1">Max Net Income (in B)</label>
        <input type="number" name="max_net_income" placeholder="e.g., 300" onChange={handleChange} className="p-2 border rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-400" />
      </div>
      <button type="submit" className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-6 p-3 mt-4 w-full text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md font-semibold">
        Apply Filters
      </button>
    </form>
  );
};

export default Filters;
