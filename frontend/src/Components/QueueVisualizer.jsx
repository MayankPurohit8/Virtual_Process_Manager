const QueueVisualizer = ({ queue, currentProcess, currentTime }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow">
      <h3 className="text-lg font-bold mb-2">
        CPU State at time {currentTime}
      </h3>
      <div className="mb-2">
        <strong>Current Process:</strong> {currentProcess?.pid || "Idle"}
      </div>
      <div>
        <strong>Queue:</strong>
        <ul className="list-disc list-inside">
          {queue.map((p) => (
            <li key={p.pid}>
              {p.pid} (AT: {p.arrival}, BT: {p.burst})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
