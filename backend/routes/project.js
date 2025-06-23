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
  try {
    const { userId, name, description, tag } = req.body;

    if (!userId || !name) {
      return res.status(400).json({ error: "userId and name are required" });
    }

    const newProject = await addProject({
      userId,
      name,
      description: description || "",
      tag: tag || "",
    });

    res.send({ data: mapProject(newProject) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId, page = 1, limit = 6 } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const projectData = await getProjects(
      userId,
      parseInt(page),
      parseInt(limit)
    );

    res.send({ data: projectData });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch("/:id", async (req, res) => {
  const updateProject = await editProject(req.params.id, {
    userId: req.body.userId,
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
