const express = require("express");
const router = express.Router();
const { createWorkspace } = require("../controllers/WorkspaceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createWorkspace);

module.exports = router;