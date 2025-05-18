// ComparisonChart.jsx
import React from "react";

const ComparisonChart = ({ algorithmResults = [] }) => {
  return (
    <div className="comparison-chart">
      <h2>Comparison Chart</h2>
      {/* Display comparison data for each algorithm */}
      <table>
        <thead>
          <tr>
            <th>Algorithm</th>
            <th>Avg Waiting Time</th>
            <th>Avg Turnaround Time</th>
            <th>Throughput</th>
          </tr>
        </thead>
        <tbody>
          {algorithmResults.map((result, index) => (
            <tr key={index}>
              <td>{result.algorithm}</td>
              <td>{result.avgWaitingTime}</td>
              <td>{result.avgTurnaroundTime}</td>
              <td>{result.throughput}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonChart;
