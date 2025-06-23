const express = require("express");

const router = express.Router({ mergeParams: true });

router.use("/", require("./auth"));
router.use("/projects", require("./project"));
router.use("/timeEntries", require("./timeEntry"));
router.use("/users", require("./user"));

module.exports = router;
