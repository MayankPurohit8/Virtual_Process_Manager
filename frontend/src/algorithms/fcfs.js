const fcfs = (processes) => {
  const sorted = [...processes].sort(
    (a, b) => Number(a.arrival) - Number(b.arrival)
  );

  let currentTime = 0;
  const result = [];

  for (const p of sorted) {
    const arrival = Number(p.arrival);
    const burst = Number(p.burst);
    const pid = p.pid;

    if (currentTime < arrival) currentTime = arrival;

    const startTime = currentTime;
    const completionTime = startTime + burst;
    const turnaroundTime = completionTime - arrival;
    const waitingTime = turnaroundTime - burst;

    result.push({
      pid,
      arrival,
      burst,
      startTime,
      completionTime,
      turnaroundTime,
      waitingTime,
    });

    currentTime = completionTime;
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

export default fcfs;
