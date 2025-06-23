const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate } = require("../helpers/token");

async function register(userName, email, password) {
  try {
    if (!userName || !email || !password) {
      throw new Error("Все поля обязательны");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ userName, email, password: passwordHash });
    const token = generate({ id: user._id });

    return { user, token };
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email уже зарегистрирован");
    }

    if (error.name === "ValidationError") {
      throw new Error(
        "Некорректные данные: " +
          Object.values(error.errors)
            .map((e) => e.message)
            .join(", ")
      );
    }
    throw new Error(error.message || "Ошибка при регистрации");
  }
}
async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Неверный пароль");
  }

  const token = generate({ id: user.id });

  return { token, user };
}

async function updateUser(id, userData) {
  try {
    if (!userData.password) {
      delete userData.password;
    } else {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    if (userData.email) {
      const existingUser = await User.findOne({
        email: userData.email,
        _id: { $ne: id },
      });

      if (existingUser) {
        throw new Error("Email уже используется");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedUser) {
      throw new Error("Пользователь не найден");
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

module.exports = { register, login, updateUser };
