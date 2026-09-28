const Project = require("../models/Project");

/*
CREATE PROJECT
POST /api/projects
*/
const createProject = async (req, res) => {

  try {

    const { name, description, workspace } = req.body;

    const project = await Project.create({
      name,
      description,
      workspace,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

};


/*
GET ALL PROJECTS
GET /api/projects
*/
const getAllProjects = async (req, res) => {

  try {

    const projects = await Project.find()
      .populate("workspace", "name")
      .populate("createdBy", "name email");

    res.json(projects);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};


/*
GET PROJECT BY ID
GET /api/projects/:id
*/
const getProjectById = async (req, res) => {

  try {

    const project = await Project.findById(req.params.id)
      .populate("workspace")
      .populate("createdBy", "name");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};


/*
DELETE PROJECT
DELETE /api/projects/:id
*/
const deleteProject = async (req, res) => {

  try {

    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject
};