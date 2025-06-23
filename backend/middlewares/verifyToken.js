const { verify } = require("../helpers/token");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ error: "Токен не предоставлен" });
    }

    const tokenData = verify(token);
    const user = await User.findOne({ _id: tokenData.id });

    if (!user) {
      return res.status(401).json({ error: "Пользователь не найден" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Недействительный токен" });
  }
};
