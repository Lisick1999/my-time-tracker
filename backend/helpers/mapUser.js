module.exports = (user) => {
  if (!user) {
    throw new Error("Пользователь не предоставлен для маппинга");
  }

  return {
    id: user._id || user.id,
    userName: user.userName,
    email: user.email,
  };
};
