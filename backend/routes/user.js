const express = require("express");
const { updateUser } = require("../controllers/user");
const router = express.Router({ mergeParams: true });
const mapUser = require("../helpers/mapUser");
const verifyToken = require("../middlewares/verifyToken");

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const newUser = await updateUser(req.params.id, {
      email: req.body.email,
      userName: req.body.userName,
      password: req.body.password,
    });

    if (!newUser) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }

    res.send({ data: mapUser(newUser) });
  } catch (error) {
    if (error.code === 11000 || error.message === "Email уже используется") {
      return res.status(400).json({ error: "Email уже используется" });
    }

    if (
      error.message === "Пользователь не найден" ||
      error.message === "Некорректный ID пользователя"
    ) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: error.message || "Ошибка сервера" });
  }
});

module.exports = router;
