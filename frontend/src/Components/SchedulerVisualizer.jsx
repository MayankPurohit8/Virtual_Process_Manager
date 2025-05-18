import React, { useState } from "react";
import AnimatedTimeDisplay from "./AnimatedTimeDisplay";
import AnimatedQueueVisualizer from "./AnimatedQueueVisualizer";
import AnimatedCPU from "./AnimatedCPU";
import AnimatedCompletedList from "./AnimatedCompletedList";

// Sample input processes for demo
const sampleProcesses = [
  { pid: "P1", arrival: 0, burst: 4 },
  { pid: "P2", arrival: 2, burst: 3 },
  { pid: "P3", arrival: 4, burst: 2 },
];

const SchedulerVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [time, setTime] = useState(0);

  const runSimulation = async () => {
    const processes = [...sampleProcesses].sort(
      (a, b) => a.arrival - b.arrival
    );
    let t = 0;
    let readyQueue = [];

    for (let i = 0; i < processes.length; i++) {
      while (t < processes[i].arrival) {
        await new Promise((res) => setTimeout(res, 500));
        setTime(t++);
      }

      // Add process to queue
      readyQueue.push(processes[i]);
      setQueue([...readyQueue]);

      // Wait a bit for animation
      await new Promise((res) => setTimeout(res, 500));

      // Run process
      const running = readyQueue.shift();
      setCurrent(running);
      setQueue([...readyQueue]);

      for (let j = 0; j < running.burst; j++) {
        await new Promise((res) => setTimeout(res, 500));
        setTime(++t);
      }

      setCompleted((prev) => [...prev, running]);
      setCurrent(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={runSimulation}
      >
        Start Simulation
      </button>

      <AnimatedTimeDisplay currentTime={time} />
      <AnimatedQueueVisualizer queue={queue} />
      <AnimatedCPU currentProcess={current} />
      <AnimatedCompletedList completed={completed} />
    </div>
  );
};

export default SchedulerVisualizer;
