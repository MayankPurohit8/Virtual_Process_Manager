const priorityPreemptive = (processes) => {
  const copy = processes.map((p) => ({
    ...p,
    arrival: Number(p.arrival),
    burst: Number(p.burst),
    remaining: Number(p.burst),
    priority: Number(p.priority),
  }));

  const gantt = [];
  const result = [];
  let time = 0,
    complete = 0,
    lastPid = null;

  while (complete < copy.length) {
    const ready = copy.filter((p) => p.arrival <= time && p.remaining > 0);
    if (ready.length === 0) {
      time++;
      continue;
    }

    const current = ready.reduce(
      (min, p) => (p.priority < min.priority ? p : min),
      ready[0]
    );

    if (lastPid !== current.pid) {
      gantt.push({ pid: current.pid, start: time });
      lastPid = current.pid;
    }

    current.remaining--;
    time++;

    if (current.remaining === 0) {
      const startTime = gantt.find((g) => g.pid === current.pid).start;
      const completionTime = time;
      const turnaroundTime = completionTime - current.arrival;
      const waitingTime = turnaroundTime - current.burst;

      gantt[gantt.length - 1].end = completionTime;
      result.push({
        pid: current.pid,
        arrival: current.arrival,
        burst: current.burst,
        priority: current.priority,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime,
      });

      complete++;
    } else {
      gantt[gantt.length - 1].end = time;
    }
  }

  return { ganttChart: gantt, stats: result };
};

export default priorityPreemptive;
