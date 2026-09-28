const mongoose = require("mongoose");
const User = require("../models/User");
const Task = require("../models/Task");

let mongoReady = false;
let fallbackMode = false;

const fallbackStore = {
  users: [],
  tasks: [],
  nextUserId: 1,
  nextTaskId: 1
};

const connectDB = async () => {
  const uri = process.env.MONGO_URI?.trim();

  if (!uri) {
    mongoReady = false;
    fallbackMode = true;
    console.warn("No MONGO_URI provided, using in-memory fallback store");
    return;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10
    });

    mongoReady = true;
    fallbackMode = false;
    console.log("MongoDB Connected ✅");
  } catch (error) {
    mongoReady = false;
    fallbackMode = true;

    console.error("MongoDB Connection Error:");
    console.error(error.message);
    console.warn("MongoDB unavailable, using in-memory fallback store");
  }
};

connectDB.isMongoReady = () => mongoReady;
connectDB.useFallbackStore = () => fallbackMode || !mongoReady;
connectDB.fallbackStore = fallbackStore;

connectDB.createUserRecord = async ({ name, email, password }) => {
  if (connectDB.isMongoReady()) {
    return User.create({ name, email, password });
  }

  const user = {
    _id: `user_${fallbackStore.nextUserId++}`,
    name,
    email,
    password,
    role: "member",
    createdAt: new Date()
  };

  fallbackStore.users.push(user);
  return user;
};

connectDB.findUserByEmail = async (email) => {
  if (connectDB.isMongoReady()) {
    return User.findOne({ email }).lean();
  }

  return fallbackStore.users.find((user) => user.email === email) || null;
};

connectDB.createTaskRecord = async ({ title, description, priority, dueDate, createdBy, createdByName, status }) => {
  if (connectDB.isMongoReady()) {
    return Task.create({
      title,
      description,
      priority,
      dueDate,
      createdBy,
      createdByName,
      status
    });
  }

  const task = {
    _id: `task_${fallbackStore.nextTaskId++}`,
    title,
    description: description || "",
    priority: priority || "medium",
    dueDate: dueDate || null,
    status: status || "todo",
    createdBy: createdBy || null,
    createdByName: createdByName || "Unknown",
    createdAt: new Date()
  };

  fallbackStore.tasks.push(task);
  return task;
};

connectDB.getAllTaskRecords = async (userId) => {
  if (connectDB.isMongoReady()) {
    return Task.find({ createdBy: userId }).populate("createdBy", "name email").lean();
  }

  return fallbackStore.tasks.filter((task) => {
    if (!userId) return true;
    return task.createdBy && (task.createdBy._id || task.createdBy) === userId;
  }).map((task) => ({
    ...task,
    createdByName: typeof task.createdBy === "string" ? task.createdBy : task.createdBy?.name || "Unknown"
  }));
};

connectDB.updateTaskRecord = async (taskId, updates) => {
  if (connectDB.isMongoReady()) {
    return Task.findByIdAndUpdate(taskId, updates, { new: true }).populate("createdBy", "name email").lean();
  }

  const task = fallbackStore.tasks.find((item) => item._id === taskId);
  if (!task) return null;

  Object.assign(task, updates);
  return task;
};

connectDB.updateTaskStatusRecord = async (taskId, status) => {
  if (connectDB.isMongoReady()) {
    const task = await Task.findById(taskId).populate("createdBy", "name email").lean();
    if (!task) return null;

    return { ...task, status };
  }

  const task = fallbackStore.tasks.find((item) => item._id === taskId);
  if (!task) return null;

  task.status = status;
  return task;
};

connectDB.deleteTaskRecord = async (taskId) => {
  if (connectDB.isMongoReady()) {
    return Task.findByIdAndDelete(taskId).lean();
  }

  const index = fallbackStore.tasks.findIndex((item) => item._id === taskId);
  if (index === -1) return null;

  const removed = fallbackStore.tasks[index];
  fallbackStore.tasks.splice(index, 1);
  return removed;
};

module.exports = connectDB;