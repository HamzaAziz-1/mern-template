const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

const comparePassword = async function (canditatePassword, password) {
  const isMatch = await bcrypt.compare(canditatePassword, password);
  return isMatch;
};

const hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: { user } });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: false,
    secure: true,
    signed: true,
    expires: new Date(Date.now() + oneDay),
  });
};

module.exports = {
  comparePassword,
  hashPassword,
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
