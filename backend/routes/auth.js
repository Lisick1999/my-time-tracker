const express = require("express");
const { register, login } = require("../controllers/user");
const router = express.Router({ mergeParams: true });
const mapUser = require("../helpers/mapUser");

router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(
      req.body.userName,
      req.body.email,
      req.body.password
    );
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send({
        error: null,
        user: mapUser(user),
      });
  } catch (error) {
    res.status(400).json({ error: error.message || "Ошибка при регистрации" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true }).send({
      error: null,
      user: mapUser(user),
    });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

module.exports = router;
