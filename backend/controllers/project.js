const Project = require("../models/Project");

// создание
async function addProject(project) {
  const newProject = await Project.create(project);

  return newProject;
}

// редактирование
async function editProject(id, project) {
  const newProject = await Project.findByIdAndUpdate(id, project, {
    returnDocument: "after",
  });

  return newProject;
}

// удаление
function deleteProject(id) {
  return Project.deleteOne({ _id: id });
}

// получение списка постов
async function getProjects(search = "", limit = 6, page = 1) {
  const [posts, count] = await Promise.all([
    Project.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Project.countDocuments({ title: { $regex: search, $options: "i" } }),
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
}

// получение одного поста
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
