import { useState } from "react";

const Compare = () => {
  const [algorithms, setAlgorithms] = useState(["FCFS", "SJF"]);
  const [processes, setProcesses] = useState([]);
  const [newProcess, setNewProcess] = useState({
    pid: "",
    arrival: "",
    burst: "",
    priority: "",
  });

  const addProcess = () => {
    if (!newProcess.pid || !newProcess.arrival || !newProcess.burst) return;
    setProcesses([...processes, { ...newProcess }]);
    setNewProcess({ pid: "", arrival: "", burst: "", priority: "" });
  };

  const handleAlgorithmToggle = (algo) => {
    setAlgorithms((prev) =>
      prev.includes(algo) ? prev.filter((a) => a !== algo) : [...prev, algo]
    );
  };

  const compare = () => {
    // Placeholder for actual algorithm comparison
    console.log("Comparing", algorithms, "on", processes);
  };

  const algorithmOptions = [
    "FCFS",
    "SJF",
    "SRTF",
    "RR",
    "Priority",
    "MLQ",
    "MLFQ",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-green-600 mb-6">
          Compare Algorithms
        </h2>

        {/* Process Input */}
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

        {/* Algorithm Selection */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Select Algorithms to Compare:
          </label>
          <div className="grid sm:grid-cols-3 gap-3">
            {algorithmOptions.map((algo) => (
              <label key={algo} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={algorithms.includes(algo)}
                  onChange={() => handleAlgorithmToggle(algo)}
                />
                <span>{algo}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Compare Button */}
        <button
          onClick={compare}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-xl"
        >
          Compare Algorithms
        </button>

        {/* Placeholder for Comparison Output */}
        <div className="mt-10">
          <h4 className="text-xl font-bold mb-4">Comparison Result</h4>
          <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 text-gray-500">
            Comparison charts and metrics will appear here.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
