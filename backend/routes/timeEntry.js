const express = require("express");
const router = express.Router({ mergeParams: true });
const { addTimeEntry, getTimeEntries } = require("../controllers/timeEntry");

router.post("/", async (req, res) => {
  try {
    const { userId, projectId, comment, duration } = req.body;

    if (!userId || !projectId || !duration) {
      return res
        .status(400)
        .json({ error: "userId, projectId, and duration are required" });
    }

    const newTimeEntry = await addTimeEntry({
      userId,
      projectId,
      comment: comment || "",
      duration,
    });

    res.send({ data: newTimeEntry });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const timeEntries = await getTimeEntries(userId);

    res.send({ data: timeEntries });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
