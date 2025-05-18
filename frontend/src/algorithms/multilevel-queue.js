// algorithms/mlq.js
import fcfs from "./fcfs.js";
import rr from "./rr.js";

const mlq = (processes) => {
  const q0 = processes.filter((p) => (p.queue ?? 2) === 0);
  const q1 = processes.filter((p) => (p.queue ?? 2) === 1);
  const q2 = processes.filter((p) => (p.queue ?? 2) === 2);

  let globalTime = 0;
  let gantt = [];
  let stats = [];

  const runAndShift = (runner, plist, ...extraArgs) => {
    if (plist.length === 0) return;
    const res = runner(plist, ...extraArgs, globalTime);
    gantt = gantt.concat(res.ganttChart);
    stats = stats.concat(res.stats);
    globalTime = res.endTime;
  };

  runAndShift(fcfs, q0);
  runAndShift(rr, q1, 4);
  runAndShift(fcfs, q2);

  return { ganttChart: gantt, stats };
};

export default mlq;
