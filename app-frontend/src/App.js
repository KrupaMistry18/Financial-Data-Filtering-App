import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import Filters from './Filter';

const App = () => {
  const [data, setData] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  const [sortParams, setSortParams] = useState({ sort_by: "", sort_order: "" });

  // const allDataApiUrl = 'http://127.0.0.1:8000/all-financial-data/';
  // const filterApiUrl = 'http://127.0.0.1:8000/filtered-financial-data/';
  // const sortApiUrl = 'http://127.0.0.1:8000/sorted-financial-data/';

  const allDataApiUrl = 'https://financial-data-filtering-app-xs0u.onrender.com/all-financial-data/';
  const filterApiUrl = 'https://financial-data-filtering-app-xs0u.onrender.com/filtered-financial-data/';
  const sortApiUrl = 'https://financial-data-filtering-app-xs0u.onrender.com/sorted-financial-data/';
  
  const fetchAllData = async () => {
    try {
      const response = await axios.get(allDataApiUrl);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching all data:', error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleFilter = async (filters) => {
    setFilterParams(filters);
    try {
      const response = await axios.get(filterApiUrl, { params: filters });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  const handleSort = async (key) => {
    const newOrder = sortParams.sort_by === key && sortParams.sort_order === "asc" ? "desc" : "asc";
    setSortParams({ sort_by: key, sort_order: newOrder });
    try {
      const response = await axios.get(sortApiUrl, { params: { sort_by: key, sort_order: newOrder } });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching sorted data:', error);
    }
  };

  return (
    <div className="p-4 max-w-full md:max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">📊 Financial Data App</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <Filters onFilter={handleFilter} />
      </div>
      <div className="overflow-x-auto">
        <Table data={data} onSort={handleSort}/>
      </div>
    </div>
  );
};

export default App;
