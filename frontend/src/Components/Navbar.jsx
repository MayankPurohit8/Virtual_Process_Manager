import { NavLink } from "react-router-dom";

const navItem =
  "px-4 py-2 rounded-lg font-medium transition-colors duration-200";
const active = "bg-blue-600 text-white";
const inactive =
  "text-gray-700 hover:bg-blue-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-blue-800";

const NavBar = () => (
  <nav className="w-full bg-white dark:bg-gray-900 shadow-md">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex gap-3 items-center">
          <img src="icon.png" className="h-10 w-10" />
          <NavLink to="/" className="text-2xl font-bold text-blue-600">
            Virtual Process Manager
          </NavLink>
        </div>

        {/* Links */}
        <div className="flex gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/visualizer"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            Visualize
          </NavLink>

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `${navItem} ${isActive ? active : inactive}`
            }
          >
            Compare
          </NavLink>
        </div>
      </div>
    </div>
  </nav>
);

export default NavBar;
