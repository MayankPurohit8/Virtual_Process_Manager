import { useState } from "react";
import GanttChart from "../Components/GanttChart";

import fcfs from "../algorithms/fcfs";
import sjf from "../algorithms/sjf";
import srtf from "../algorithms/srtf";
import rr from "../algorithms/rr";
import priorityPreemptive from "../algorithms/ps";
import mlfq from "../algorithms/multilevel‑feedback‑queue";
import mlq from "../algorithms/multilevel-queue";
const Visualizer = () => {
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState("FCFS");
  const [newProcess, setNewProcess] = useState({
    pid: "",
    arrival: "",
    burst: "",
    priority: "",
    quantum: "",
  });
  const [simulationResult, setSimulationResult] = useState(null);
  const [quantum, setQuantum] = useState(0);

  const addProcess = () => {
    if (!newProcess.pid || !newProcess.arrival || !newProcess.burst) return;
    setProcesses([...processes, { ...newProcess }]);
    setNewProcess({
      pid: "",
      arrival: "",
      burst: "",
      priority: "",
      quantum: "",
    });
  };

  const simulate = () => {
    let result;
    switch (algorithm) {
      case "FCFS":
        result = fcfs(processes);
        break;
      case "SJF":
        result = sjf(processes);
        break;
      case "SRTF":
        result = srtf(processes);
        break;
      case "RR":
        result = rr(processes, quantum);
        break;
      case "Priority":
        result = priorityPreemptive(processes);
        break;
      case "MLQ":
        result = mlq(processes);
        break;
      case "MLFQ":
        result = mlfq(processes);
        break;

      default:
        alert("Algorithm not implemented yet!");
        return;
    }

    setSimulationResult(result);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          Process Scheduling Visualizer
        </h2>

        {/* Process Input Section */}
        <div className="grid sm:grid-cols-5 gap-4 items-end mb-6">
          <input
            type="text"
            placeholder="PID"
            value={newProcess.pid}
            onChange={(e) =>
              setNewProcess({ ...newProcess, pid: e.target.value })
            }
            className="p-2 border rounded-xl"
          />
          <input
            type="number"
            placeholder="Arrival Time"
            value={newProcess.arrival}
            onChange={(e) =>
              setNewProcess({ ...newProcess, arrival: e.target.value })
            }
            className="p-2 border rounded-xl"
          />
          <input
            type="number"
            placeholder="Burst Time"
            value={newProcess.burst}
            onChange={(e) =>
              setNewProcess({ ...newProcess, burst: e.target.value })
            }
            className="p-2 border rounded-xl"
          />
          <input
            type="number"
            placeholder="Priority (Optional)"
            value={newProcess.priority}
            onChange={(e) =>
              setNewProcess({ ...newProcess, priority: e.target.value })
            }
            className="p-2 border rounded-xl"
          />
          <button
            onClick={addProcess}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl"
          >
            Add Process
          </button>
        </div>

        {/* Process List */}
        {processes.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-2">Process List</h4>
            <table className="w-full text-left border border-gray-300 rounded-xl">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">PID</th>
                  <th className="p-2">Arrival</th>
                  <th className="p-2">Burst</th>
                  <th className="p-2">Priority</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((proc, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{proc.pid}</td>
                    <td className="p-2">{proc.arrival}</td>
                    <td className="p-2">{proc.burst}</td>
                    <td className="p-2">{proc.priority || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Algorithm Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Select Scheduling Algorithm:
          </label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            className="p-2 border rounded-xl w-full sm:w-1/2"
          >
            <option value="FCFS">First Come First Serve (FCFS)</option>
            <option value="SJF">Shortest Job First (SJF)</option>
            <option value="SRTF">
              Shortest Remaining Time First (Preemptive SJF)
            </option>
            <option value="RR">Round Robin</option>
            <option value="Priority">Priority Scheduling</option>
            <option value="MLQ">Multilevel Queue</option>
            <option value="MLFQ">Multilevel Feedback Queue</option>
            <option value="CFS">Completely Fair (CFS)</option>
            <option value="Lottery">Lottery</option>
            <option value="EDF">Earliest‑Deadline‑First</option>
          </select>
          {algorithm === "RR" ? (
            <input
              type="number"
              placeholder="Time Quantum"
              onChange={(e) => setQuantum(e.target.value)}
              className="p-2 ml-3 border rounded-xl"
            />
          ) : null}
        </div>

        {/* Simulate Button */}
        <button
          onClick={simulate}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl"
        >
          Simulate
        </button>

        {/* Placeholder for Gantt Chart and Stats */}
        <div className="mt-10">
          <h4 className="text-xl font-bold mb-4">Simulation Output</h4>
          <div className="space-y-6">
            {simulationResult && (
              <>
                <GanttChart
                  ganttData={simulationResult.ganttChart}
                  algorithm={algorithm}
                />
                {/*Visualization Logic*/}
                {simulationResult != null && (
                  <table className="w-full text-left border border-gray-300 rounded-xl">
                    <thead className="bg-gray-200">
                      <tr className="[&>*]:p-2">
                        <th>PID</th>
                        <th>Arrival Time</th>
                        <th>Burst Time</th>
                        <th>Start Time</th>
                        <th>Completion Time</th>
                        <th>Turnaround Time</th>
                        <th>Waiting Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {simulationResult.stats.map(function (item, i) {
                        return (
                          <tr key={i} className="[&>*]:p-2 border-t">
                            <td>{item.pid}</td>
                            <td>{item.arrival}</td>
                            <td>{item.burst}</td>
                            <td>{item.startTime}</td>
                            <td>{item.completionTime}</td>
                            <td>{item.turnaroundTime}</td>
                            <td>{item.waitingTime}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
