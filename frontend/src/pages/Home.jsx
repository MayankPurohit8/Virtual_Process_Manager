import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-3xl bg-white shadow-xl rounded-2xl p-10">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          OS Scheduling Visualizer
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to the Process Scheduling Visualizer — an interactive tool to
          simulate and compare various CPU scheduling algorithms like FCFS, SJF,
          Round Robin, Priority, and more.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 mt-8">
          <Link
            to="/visualizer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Start Simulation
          </Link>
          <Link
            to="/compare"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Compare Algorithms
          </Link>
          <Link
            to="/about"
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl transition-all col-span-full"
          >
            Learn More
          </Link>
        </div>
      </div>

      <footer className="mt-10 text-gray-600 text-sm">
        Made by Mayank Purohit
      </footer>
    </div>
  );
};

export default Home;
