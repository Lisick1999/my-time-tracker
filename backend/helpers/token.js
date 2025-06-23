const jwt = require("jsonwebtoken");

const sign = process.env.JWT_SECRET || "your-secret-key";

module.exports = {
  generate(data) {
    if (!sign) {
      throw new Error("JWT_SECRET не задан");
    }

    return jwt.sign(data, sign, { expiresIn: "30d" });
  },
  verify(token) {
    if (!sign) {
      throw new Error("JWT_SECRET не задан");
    }

    return jwt.verify(token, sign);
  },
};
