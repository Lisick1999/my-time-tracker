const express = require("express");
const { updateUser } = require("../controllers/user");
const router = express.Router({ mergeParams: true });
const mapUser = require("../helpers/mapUser");

router.patch("/settings", async (req, res) => {
  const newUser = await updateUser(req.params.id, {
    password: req.body.password,
    userName: req.body.userName,
  });

  res.send({ data: mapUser(newUser) });
});
module.exports = router;
