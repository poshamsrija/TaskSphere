import React, { useEffect, useState } from "react";
import API from "../api/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskAnalytics from "../components/TaskAnalytics";
import { normalizeTasksResponse } from "../utils/taskUtils";

function Analytics() {
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
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="mt-3">Task statistics and performance charts.</p>

          <div className="mt-6">
            <TaskAnalytics tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;