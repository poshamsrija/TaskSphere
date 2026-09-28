import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-60 bg-white shadow h-screen p-5">

      <h2 className="text-xl font-bold mb-6">
        TaskSphere
      </h2>

      <ul className="space-y-4 text-gray-700">

        <li>
          <Link to="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/tasks" className="hover:text-blue-500">
            My Tasks
          </Link>
        </li>

        <li>
          <Link to="/analytics" className="hover:text-blue-500">
            Analytics
          </Link>
        </li>

        <li>
          <Link to="/settings" className="hover:text-blue-500">
            Settings
          </Link>
        </li>

      </ul>

    </div>

  );

}

export default Sidebar;