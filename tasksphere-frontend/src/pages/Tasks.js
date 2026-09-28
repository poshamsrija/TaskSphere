import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import API from "../api/api";
import { normalizeTasksResponse, getTaskCreatorName } from "../utils/taskUtils";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get("/tasks");
        setTasks(normalizeTasksResponse(res.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6">
          <h2 className="text-xl font-semibold">My Tasks</h2>

          <div className="mt-4 space-y-3">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white p-4 rounded shadow">
                <div className="font-semibold">{task.title}</div>
                <div className="text-sm text-gray-600">{task.description}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Priority: {task.priority} | Status: {task.status}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Created by: {getTaskCreatorName(task)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;