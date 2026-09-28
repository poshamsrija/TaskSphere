import React, { useMemo, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import API from "../api/api";
import { getTaskCreatorName } from "../utils/taskUtils";

function TaskCard({ task, index, refreshTasks }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "medium");

  const isOverdue = useMemo(() => task.dueDate && new Date(task.dueDate) < new Date(), [task.dueDate]);

  const getPriorityColor = () => {
    if (priority === "high") return "bg-red-500 text-white";
    if (priority === "medium") return "bg-yellow-400 text-black";
    if (priority === "low") return "bg-green-500 text-white";
    return "bg-gray-300";
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/tasks/${task._id}`, {
        title,
        description,
        priority
      });

      setEditing(false);
      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 rounded-lg shadow mb-3 ${
            isOverdue
              ? "bg-red-100"
              : snapshot.isDragging
              ? "bg-blue-100"
              : "bg-white"
          }`}
        >

          {editing ? (
            <div>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-1 w-full mb-1"
              />

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-1 w-full mb-1"
              />

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border p-1 w-full mb-1"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <button
                onClick={handleUpdate}
                className="text-green-600 text-xs mr-2"
              >
                Save
              </button>

              <button
                onClick={() => setEditing(false)}
                className="text-gray-600 text-xs"
              >
                Cancel
              </button>

            </div>

          ) : (
            <div>

              <h4 className="font-semibold">
                {task.title}
              </h4>

              {task.description && (
                <p className="text-sm text-gray-600">
                  {task.description}
                </p>
              )}

              {task.priority && (
                <span
                  className={`text-xs px-2 py-1 rounded mt-2 inline-block ${getPriorityColor()}`}
                >
                  {task.priority.toUpperCase()} PRIORITY
                </span>
              )}

              {task.dueDate && (
                <p className="text-xs text-gray-500 mt-1">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-1">
                Created by: {getTaskCreatorName(task)}
              </p>

              <div className="mt-2 flex gap-2">

                <button
                  onClick={() => setEditing(true)}
                  className="text-blue-500 text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>

              </div>

            </div>
          )}

        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;