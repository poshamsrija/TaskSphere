const connectDB = require("../config/db");
const { sendError } = require("../utils/response");

const emitTaskUpdate = (req) => {
  const io = req.app.get("io");
  if (io) io.emit("taskUpdated");
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status, createdBy, createdByName } = req.body;

    if (!title) {
      return sendError(res, 400, "Title is required");
    }

    const task = await connectDB.createTaskRecord({
      title,
      description,
      priority,
      dueDate,
      createdBy: req.user?.id || createdBy || null,
      createdByName: createdByName || createdBy || "Unknown",
      status
    });

    emitTaskUpdate(req);

    return res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    return sendError(res, 500, "Server error", error);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await connectDB.getAllTaskRecords(req.user.id);

    return res.json({
      success: true,
      tasks
    });
  } catch (error) {
    return sendError(res, 500, "Server error", error);
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;

    const task = await connectDB.updateTaskRecord(
      req.params.id,
      { title, description, priority }
    );

    if (!task) {
      return sendError(res, 404, "Task not found");
    }

    emitTaskUpdate(req);

    return res.json({
      success: true,
      task
    });
  } catch (error) {
    return sendError(res, 500, "Server error", error);
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const task = await connectDB.updateTaskStatusRecord(req.params.id, status);

    if (!task) {
      return sendError(res, 404, "Task not found");
    }

    emitTaskUpdate(req);

    return res.json({
      success: true,
      task
    });
  } catch (error) {
    return sendError(res, 500, "Server error", error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await connectDB.deleteTaskRecord(req.params.id);

    if (!task) {
      return sendError(res, 404, "Task not found");
    }

    emitTaskUpdate(req);

    return res.json({
      success: true,
      message: "Task deleted successfully"
    });
  } catch (error) {
    return sendError(res, 500, "Server error", error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  updateTaskStatus,
  deleteTask
};