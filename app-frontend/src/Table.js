import React from 'react';

const Table = ({ data, onSort }) => {
  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="bg-blue-100">
            <th className="sticky left-0 bg-blue-100 px-4 py-3 border-b text-sm sm:text-base z-10">
              Date
              <button onClick={() => onSort("date")} className="ml-2 text-sm text-blue-500">⇅</button>
            </th>
            <th className="px-4 py-3 border-b text-sm sm:text-base">
              Revenue (in Billions)
              <button onClick={() => onSort("revenue")} className="ml-2 text-sm text-blue-500">⇅</button>
            </th>
            <th className="px-4 py-3 border-b text-sm sm:text-base">
              Net Income (in Billions)
              <button onClick={() => onSort("net_income")} className="ml-2 text-sm text-blue-500">⇅</button>
            </th>
            <th className="px-4 py-3 border-b text-sm sm:text-base">Gross Profit</th>
            <th className="px-4 py-3 border-b text-sm sm:text-base">EPS</th>
            <th className="px-4 py-3 border-b text-sm sm:text-base">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-4">No data available.</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="sticky left-0 bg-white border px-4 py-2 text-sm sm:text-base">
                  <div className="truncate text-center">{item.date || "N/A"}</div>
                </td>
                <td className="border px-4 py-2 text-sm sm:text-base">
                  <div className="flex items-center justify-center gap-1 truncate whitespace-nowrap">
                    <span>{(item.revenue / 1e9).toFixed(2) || "0"}</span>
                    <span className="text-xs">B</span>
                  </div>
                </td>
                <td className="border px-4 py-2 text-sm sm:text-base">
                  <div className="flex items-center justify-center gap-1 truncate whitespace-nowrap">
                    <span>{(item.netIncome / 1e9).toFixed(2) || "0"}</span>
                    <span className="text-xs">B</span>
                  </div>
                </td>
                <td className="border px-4 py-2 text-sm sm:text-base">
                  <div className="flex items-center justify-center gap-1 truncate whitespace-nowrap">
                    <span>{(item.grossProfit / 1e9).toFixed(2) || "0"}</span>
                    <span className="text-xs">B</span>
                  </div>
                </td>
                <td className="border px-4 py-2 text-sm sm:text-base text-center">
                  <span className="truncate">{item.eps || "N/A"}</span>
                </td>
                <td className="border px-4 py-2 text-sm sm:text-base">
                  <div className="flex items-center justify-center gap-1 truncate whitespace-nowrap">
                    <span>{(item.operatingIncome / 1e9).toFixed(2) || "0"}</span>
                    <span className="text-xs">B</span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
