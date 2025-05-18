const sjf = (processes) => {
  const sorted = [...processes].sort((a, b) => {
    if (a.arrival === b.arrival) return a.burst - b.burst;
    return a.arrival - b.arrival;
  });

  let time = 0;
  const result = [];
  const readyQueue = [];
  const completed = new Set();

  while (completed.size < processes.length) {
    for (const p of sorted) {
      if (
        !completed.has(p.pid) &&
        p.arrival <= time &&
        !readyQueue.includes(p)
      ) {
        readyQueue.push(p);
      }
    }

    if (readyQueue.length === 0) {
      time++;
      continue;
    }

    readyQueue.sort((a, b) => a.burst - b.burst);
    const p = readyQueue.shift();

    const startTime = Math.max(time, p.arrival);
    const completionTime = startTime + Number(p.burst);
    const turnaroundTime = completionTime - p.arrival;
    const waitingTime = turnaroundTime - p.burst;

    result.push({
      pid: p.pid,
      arrival: p.arrival,
      burst: p.burst,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    completed.add(p.pid);
    time = completionTime;
  }

  return {
    ganttChart: result.map((p) => ({
      pid: p.pid,
      start: p.startTime,
      end: p.completionTime,
    })),
    stats: result,
  };
};

export default sjf;
