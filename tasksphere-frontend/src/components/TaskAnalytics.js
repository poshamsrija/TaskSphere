import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

function TaskAnalytics({ tasks = [] }) {

  const todo = tasks.filter((t) => t?.status === "todo").length;
  const progress = tasks.filter((t) => t?.status === "in_progress").length;
  const done = tasks.filter((t) => t?.status === "done").length;

  const data = [
    { name: "Todo", value: todo },
    { name: "In Progress", value: progress },
    { name: "Done", value: done }
  ];

  const COLORS = ["#3b82f6", "#f59e0b", "#22c55e"];

  return (

    <div className="bg-white p-5 rounded shadow">

      <h3 className="font-semibold mb-3">
        Task Distribution
      </h3>

      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </div>

  );

}

export default TaskAnalytics;