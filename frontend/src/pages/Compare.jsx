import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import fcfs from "../algorithms/fcfs";
import sjf from "../algorithms/sjf";
import srtf from "../algorithms/srtf";
import rr from "../algorithms/rr";
import priorityPreemptive from "../algorithms/ps";
import mlfq from "../algorithms/multilevel‑feedback‑queue";
import mlq from "../algorithms/multilevel-queue";

const algoMap = {
  FCFS: fcfs,
  SJF: sjf,
  SRTF: srtf,
  RR: rr,
  Priority: priorityPreemptive,
  MLQ: mlq,
  MLFQ: mlfq,
};

const Compare = () => {
  const [algorithms, setAlgorithms] = useState(["FCFS", "SJF"]);
  const [processes, setProcesses] = useState([]);
  const [newProcess, setNewProcess] = useState({
    pid: "",
    arrival: "",
    burst: "",
    priority: "",
  });

  const [results, setResults] = useState([]); // comparison output

  /* ---------- helpers ---------- */
  const addProcess = () => {
    if (!newProcess.pid || !newProcess.arrival || !newProcess.burst) return;
    setProcesses((prev) => [...prev, { ...newProcess }]);
    setNewProcess({ pid: "", arrival: "", burst: "", priority: "" });
  };

  const toggleAlgo = (algo) =>
    setAlgorithms((prev) =>
      prev.includes(algo) ? prev.filter((a) => a !== algo) : [...prev, algo]
    );

  const calcAverages = (stats) => {
    const n = stats.length;
    const aw = stats.reduce((s, p) => s + p.waitingTime, 0) / n;
    const at = stats.reduce((s, p) => s + p.turnaroundTime, 0) / n;
    const tp = n / stats[stats.length - 1].completionTime; // jobs per time‑unit
    return { avgWaiting: aw, avgTurnaround: at, throughput: tp.toFixed(2) };
  };

  const compare = () => {
    const output = algorithms.map((algo) => {
      const sim = algoMap[algo](processes);
      const avg = calcAverages(sim.stats);
      return { algorithm: algo, ...avg };
    });
    setResults(output);
  };

  /* ---------- render ---------- */
  const algoOptions = Object.keys(algoMap);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Compare Algorithms
        </h2>

        {/* -------- process input -------- */}
        <div className="grid sm:grid-cols-5 gap-4 items-end mb-6">
          {["PID", "Arrival Time", "Burst Time", "Priority"].map((ph, idx) => (
            <input
              key={ph}
              type={idx ? "number" : "text"}
              placeholder={ph}
              value={Object.values(newProcess)[idx]}
              onChange={(e) =>
                setNewProcess({
                  ...newProcess,
                  [Object.keys(newProcess)[idx]]: e.target.value,
                })
              }
              className="p-2 border rounded-xl"
            />
          ))}
          <button
            onClick={addProcess}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl"
          >
            Add Process
          </button>
        </div>
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

        {/* -------- algorithm checkboxes -------- */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Select Algorithms to Compare:
          </label>
          <div className="grid sm:grid-cols-3 gap-3">
            {algoOptions.map((algo) => (
              <label key={algo} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={algorithms.includes(algo)}
                  onChange={() => toggleAlgo(algo)}
                />
                <span>{algo}</span>
              </label>
            ))}
          </div>
        </div>

        {/* -------- compare button -------- */}
        <button
          onClick={compare}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl"
        >
          Compare Algorithms
        </button>

        {/* -------- results -------- */}
        {results.length > 0 && (
          <div className="mt-10 space-y-8">
            {/* table */}
            <table className="w-full text-left border border-gray-300 rounded-xl">
              <thead className="bg-gray-200">
                <tr className="[&>*]:p-2">
                  <th>Algorithm</th>
                  <th>Avg Waiting</th>
                  <th>Avg Turn‑around</th>
                  <th>Throughput</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.algorithm} className="[&>*]:p-2 border-t">
                    <td>{r.algorithm}</td>
                    <td>{r.avgWaiting.toFixed(2)}</td>
                    <td>{r.avgTurnaround.toFixed(2)}</td>
                    <td>{r.throughput}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* bar‑chart */}
            <BarChart width={600} height={300} data={results}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="algorithm" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgWaiting" name="Avg WT" />
              <Bar dataKey="avgTurnaround" name="Avg TAT" />
            </BarChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
