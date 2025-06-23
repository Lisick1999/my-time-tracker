const Project = require("../models/Project");

async function addProject(project) {
  const newProject = await Project.create(project);

  return newProject;
}

async function editProject(id, project) {
  const newProject = await Project.findByIdAndUpdate(id, project, {
    returnDocument: "after",
  });

  return newProject;
}

function deleteProject(id) {
  return Project.deleteOne({ _id: id });
}

async function getProjects(userId, page = 1, limit = 6) {
  try {
    const skip = (page - 1) * limit;
    const projects = await Project.find({ userId })
      .skip(skip)
      .limit(limit)
      .lean();
    const totalProjects = await Project.countDocuments({ userId });
    const lastPage = Math.ceil(totalProjects / limit) || 1;

    return {
      projects: projects.map((project) => ({
        ...project,
        id: project._id,
      })),
      lastPage,
    };
  } catch (error) {
    throw error;
  }
}

function getProject(id) {
  return Project.findById(id);
}

module.exports = {
  addProject,
  editProject,
  getProjects,
  deleteProject,
  getProject,
};
