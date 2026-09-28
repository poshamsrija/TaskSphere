import React, { useEffect, useMemo, useState, useCallback } from "react";
import API from "../api/api";
import AddTask from "./AddTask";
import TaskCard from "./TaskCard";
import TaskAnalytics from "./TaskAnalytics";
import socket from "../socket";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("none");

  const fetchTasks = useCallback(async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks || res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();

    socket.on("taskUpdated", fetchTasks);

    return () => {
      socket.off("taskUpdated", fetchTasks);
    };
  }, [fetchTasks]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      await API.put(`/tasks/${taskId}/status`, {
        status: newStatus
      });
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = useMemo(() => {
    const searchValue = search.toLowerCase();

    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      return title.includes(searchValue) || description.includes(searchValue);
    });
  }, [tasks, search]);

  const sortedTasks = useMemo(() => {
    const nextTasks = [...filteredTasks];

    if (sortBy === "priority") {
      const order = { high: 3, medium: 2, low: 1 };
      nextTasks.sort((a, b) => order[b.priority] - order[a.priority]);
    }

    if (sortBy === "dueDate") {
      nextTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    return nextTasks;
  }, [filteredTasks, sortBy]);

  const todo = sortedTasks.filter((task) => task.status === "todo");
  const inProgress = sortedTasks.filter((task) => task.status === "in_progress");
  const done = sortedTasks.filter((task) => task.status === "done");

  return (

    <div>

      <h2 className="text-xl font-semibold mb-4">
        Kanban Board
      </h2>

      {/* SEARCH + SORT */}

      <div className="flex gap-4 mb-6">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="none">No Sorting</option>
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>

      </div>


      {/* CHART + ADD TASK */}

      <div className="flex gap-10 mb-6">

        <TaskAnalytics tasks={tasks} />

        <AddTask refreshTasks={fetchTasks} />

      </div>


      {/* DRAG BOARD */}

      <DragDropContext onDragEnd={handleDragEnd}>

        <div className="flex gap-5">

          <Droppable droppableId="todo">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-lg w-72 min-h-[300px]"
              >

                <h3 className="font-semibold mb-3">
                  Todo
                </h3>

                {todo.map((task, index) => (
                  <TaskCard key={task._id} task={task} index={index} refreshTasks={fetchTasks} />
                ))}

                {provided.placeholder}

              </div>
            )}
          </Droppable>


          <Droppable droppableId="in_progress">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-lg w-72 min-h-[300px]"
              >

                <h3 className="font-semibold mb-3">
                  In Progress
                </h3>

                {inProgress.map((task, index) => (
                  <TaskCard key={task._id} task={task} index={index} refreshTasks={fetchTasks} />
                ))}

                {provided.placeholder}

              </div>
            )}
          </Droppable>


          <Droppable droppableId="done">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-lg w-72 min-h-[300px]"
              >

                <h3 className="font-semibold mb-3">
                  Done
                </h3>

                {done.map((task, index) => (
                  <TaskCard key={task._id} task={task} index={index} refreshTasks={fetchTasks} />
                ))}

                {provided.placeholder}

              </div>
            )}
          </Droppable>

        </div>

      </DragDropContext>

    </div>

  );

}

export default KanbanBoard;