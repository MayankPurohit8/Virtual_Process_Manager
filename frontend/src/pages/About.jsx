const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          About This Project
        </h1>

        <p className="text-gray-700 text-lg mb-4">
          This project is a visual simulator for{" "}
          <span className="font-semibold text-blue-600">
            CPU Scheduling Algorithms
          </span>
          . It aims to help students and developers understand how different
          algorithms behave under various process loads.
        </p>

        <p className="text-gray-700 mb-4">
          You can simulate classic algorithms like:
          <br />
          <span className="text-sm text-gray-600">
            FCFS, SJF, SRTF, Round Robin, Priority, MLQ, and MLFQ
          </span>
        </p>

        <p className="text-gray-700 mb-6">
          Built using{" "}
          <span className="font-semibold text-green-600">React</span> and styled
          with{" "}
          <span className="font-semibold text-purple-600">Tailwind CSS</span>.
          The algorithms are implemented in pure JavaScript for real-time
          performance.
        </p>

        <div className="text-sm text-gray-500">
          Developed by <span className="font-semibold">Mayank Purohit</span> 💻{" "}
          <br />
          GitHub:{" "}
          <a
            href="https://github.com/MayankPurohit8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            MayankPurohit8
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
