// SchedulerInputForm.jsx
import React, { useState } from "react";

const SchedulerInputForm = ({ addProcess }) => {
  const [process, setProcess] = useState({
    pid: "",
    arrivalTime: "",
    burstTime: "",
    priority: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProcess({ ...process, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProcess(process);
    setProcess({ pid: "", arrivalTime: "", burstTime: "", priority: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="pid"
        value={process.pid}
        onChange={handleChange}
        placeholder="Process ID"
      />
      <input
        type="number"
        name="arrivalTime"
        value={process.arrivalTime}
        onChange={handleChange}
        placeholder="Arrival Time"
      />
      <input
        type="number"
        name="burstTime"
        value={process.burstTime}
        onChange={handleChange}
        placeholder="Burst Time"
      />
      <input
        type="number"
        name="priority"
        value={process.priority}
        onChange={handleChange}
        placeholder="Priority (Optional)"
      />
      <button type="submit">Add Process</button>
    </form>
  );
};

export default SchedulerInputForm;
