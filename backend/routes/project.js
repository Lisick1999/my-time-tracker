const express = require("express");
const {
  getProjects,
  addProject,
  editProject,
  deleteProject,
} = require("../controllers/project");
const mapProject = require("../helpers/mapProject");
const router = express.Router({ mergeParams: true });

router.post("/", async (req, res) => {
  const newProject = await addProject({
    // фильтрация полей, которые попадут в контроллер
    name: req.body.name,
    description: req.body.description,
    tag: req.body.description,
  });

  res.send({ data: mapProject(newProject) });
});

router.get("/", async (req, res) => {
  const { projects, lastPage } = await getProjects(
    req.query.search,
    req.query.limit,
    req.query.page
  );

  res.send({ data: { lastPage, projects: projects.map(mapProject) } });
});

router.patch("/:id", async (req, res) => {
  const updateProject = await editProject(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    tag: req.body.tag,
  });

  res.send({ data: mapProject(updateProject) });
});

router.delete("/:id", async (req, res) => {
  await deleteProject(req.params.id);

  res.send({ error: null });
});

module.exports = router;
