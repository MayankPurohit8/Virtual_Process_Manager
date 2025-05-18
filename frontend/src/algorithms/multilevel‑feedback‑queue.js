export default function mlfq(processes, maxLevels = 3, baseQuantum = 4) {
  const procs = processes.map((p) => ({
    ...p,
    arrival: +p.arrival,
    burst: +p.burst,
    remaining: +p.burst,
    level: 0,
  }));

  const queueArr = Array.from({ length: maxLevels }, () => []);
  let time = 0;
  const gantt = [];
  const stats = [];

  const admitArrivals = () => {
    procs.forEach((p) => {
      if (
        p.arrival <= time &&
        p.remaining > 0 &&
        !queueArr[p.level].includes(p)
      ) {
        queueArr[p.level].push(p);
      }
    });
  };

  while (procs.some((p) => p.remaining > 0)) {
    admitArrivals();

    const lvl = queueArr.findIndex((q) => q.length);
    if (lvl === -1) {
      time++;
      continue;
    }

    const q = queueArr[lvl];
    const cur = q.shift();
    const quantum = baseQuantum * Math.pow(2, lvl);
    const run = Math.min(quantum, cur.remaining);

    gantt.push({ pid: cur.pid, start: time, end: time + run });

    if (!cur.hasStarted) {
      cur.hasStarted = true;
      cur.startTime = time;
    }

    cur.remaining -= run;
    time += run;

    if (cur.remaining > 0) {
      cur.level = Math.min(cur.level + 1, maxLevels - 1);
    } else {
      stats.push({
        pid: cur.pid,
        arrival: cur.arrival,
        burst: cur.burst,
        startTime: cur.startTime,
        completionTime: time,
        turnaroundTime: time - cur.arrival,
        waitingTime: time - cur.arrival - cur.burst,
        finalLevel: cur.level,
      });
    }
  }

  return { ganttChart: gantt, stats };
}
