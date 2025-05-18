import React from "react";

const GanttChart = ({ ganttData, algorithm }) => {
  if (!ganttData || ganttData.length === 0)
    return <p>No Gantt data available.</p>;

  return (
    <div className="gantt-chart mt-4">
      <h2 className="text-lg font-semibold mb-2">Gantt Chart ({algorithm})</h2>
      <div className="flex items-center">
        {ganttData.map((item, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white text-sm text-center py-2 border-r border-white"
            style={{ width: (item.end - item.start) * 40 + "px" }}
          >
            {item.pid}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm mt-1">
        {ganttData.map((item, index) => (
          <span key={index}>{item.start}</span>
        ))}
        {/* Add last end time */}
        <span>{ganttData[ganttData.length - 1]?.end}</span>
      </div>
    </div>
  );
};

export default GanttChart;
