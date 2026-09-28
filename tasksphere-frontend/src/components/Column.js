import React, { useEffect, useState } from "react";
import API from "../api/api";
import Column from "./Column";
import AddTask from "./AddTask";
import { DragDropContext } from "@hello-pangea/dnd";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, status: newStatus } : task
    );

    setTasks(updatedTasks);

    try {
      await API.put(`/tasks/${taskId}/status`, { status: newStatus });
    } catch (error) {
      console.log(error);
    }
  };

  const todo = tasks.filter((t) => t.status === "todo");
  const inProgress = tasks.filter((t) => t.status === "in_progress");
  const done = tasks.filter((t) => t.status === "done");

  return (
    <div className="max-w-6xl mx-auto">
      <AddTask refreshTasks={fetchTasks} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Column title="Todo" tasks={todo} status="todo" />
          <Column title="In Progress" tasks={inProgress} status="in_progress" />
          <Column title="Done" tasks={done} status="done" />
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;