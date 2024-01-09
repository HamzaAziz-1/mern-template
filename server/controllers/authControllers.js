const pool = require("../database/db");
const {
  comparePassword,
  hashPassword,
  attachCookiesToResponse,
} = require("../utils/index");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      throw new Error("Missing required fields");
    }

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result && result.rows.length > 0) {
      const [user] = result.rows;
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      attachCookiesToResponse({ res, user });

      res.status(200).json({ message: "Logged In successfully!", user });
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message || "Bad Request" });
  }
};

const logout = async(req,res)=>{
res.cookie("token", "logout", {
  httpOnly: true,
  expires: new Date(Date.now()),
});
res.status(200).json({ message: "user logged out!" });
}
module.exports = { login, register,logout };
