const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject
} = require("../controllers/projectController");

router.post("/", authMiddleware, createProject);

router.get("/", authMiddleware, getAllProjects);

router.get("/:id", authMiddleware, getProjectById);

router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;