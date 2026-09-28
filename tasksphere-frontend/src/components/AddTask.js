import React, { useState } from "react";
import API from "../api/api";

function AddTask({ refreshTasks }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      await API.post("/tasks", {
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate,
        createdBy: createdBy.trim() || "Unknown",
        status: "todo"
      });

      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");
      setCreatedBy("");

      refreshTasks();
    } catch (error) {
      console.log(error);
      alert("Failed to create task");
    }
  };

  return (

    <div className="bg-white p-5 rounded-lg shadow w-80">

      <h3 className="text-lg font-semibold mb-3">
        Add Task
      </h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-2"
          required
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        {/* DUE DATE FIELD */}

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />

        <input
          type="text"
          placeholder="Who created this task?"
          value={createdBy}
          onChange={(e) => setCreatedBy(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded"
        >
          Create Task
        </button>

      </form>

    </div>

  );

}

export default AddTask;