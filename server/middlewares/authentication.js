const { isTokenValid } = require("../utils/index");

const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;
  try {
    if (!token) {
      return res.status(401).json({ message: "Authentication Invalid" });
    }
    const payload = isTokenValid(token);
    req.user = payload.user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication Invalid" });
  }
};

module.exports = {
  authenticateUser,
};
