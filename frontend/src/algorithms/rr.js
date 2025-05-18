const rr = (processes, quantum) => {
  console.log(quantum);
  const queue = [];
  const copy = processes.map((p) => ({
    ...p,
    arrival: Number(p.arrival),
    burst: Number(p.burst),
    remaining: Number(p.burst),
  }));

  const gantt = [];
  const result = [];
  let time = 0,
    i = 0,
    lastPid = null;

  while (i < copy.length || queue.length) {
    while (i < copy.length && copy[i].arrival <= time) {
      queue.push(copy[i]);
      i++;
    }

    if (!queue.length) {
      time++;
      continue;
    }

    const current = queue.shift();
    if (lastPid !== current.pid) {
      gantt.push({ pid: current.pid, start: time });
      lastPid = current.pid;
    }

    const exec = Math.min(quantum, current.remaining);
    time += exec;
    current.remaining -= exec;

    while (i < copy.length && copy[i].arrival <= time) {
      queue.push(copy[i]);
      i++;
    }

    if (current.remaining > 0) {
      queue.push(current);
      gantt[gantt.length - 1].end = time;
    } else {
      const startTime = gantt.find((g) => g.pid === current.pid).start;
      const completionTime = time;
      const turnaroundTime = completionTime - current.arrival;
      const waitingTime = turnaroundTime - current.burst;

      gantt[gantt.length - 1].end = completionTime;
      result.push({
        pid: current.pid,
        arrival: current.arrival,
        burst: current.burst,
        startTime,
        completionTime,
        turnaroundTime,
        waitingTime,
      });
    }
  }

  return { ganttChart: gantt, stats: result };
};

export default rr;
