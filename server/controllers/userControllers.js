const pool = require("../database/db");
const { hashPassword, comparePassword } = require("../utils/index");
const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE _id = $1", [id]);
    if (!result.rows[0]) {
      return res.status(400).json({ message: `User not found with id: ${id}` });
    }
    const [user] = result.rows;
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE _id = $3 RETURNING *",
      [name, email, id]
    );

    if (!result.rows[0]) {
      return res.status(400).json({ message: `User not found with id: ${id}` });
    }

    const updatedUser = result.rows[0];
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE _id = $1 RETURNING *",
      [id]
    );

    if (!result.rows[0]) {
      return res.status(400).json({ message: `User not found with id: ${id}` });
    }

    const deletedUser = result.rows[0];
    return res
      .status(200)
      .json({ user: deletedUser, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    const users = result.rows;
    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updatePassword = async (req, res) => {
  const userId = req.user._id;
  const { currentPassword, newPassword } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE _id = $1", [
      userId,
    ]);

    if (!result.rows[0]) {
      return res
        .status(400)
        .json({ message: `User not found with id: ${userId}` });
    }

    const user = result.rows[0];

    const isPasswordMatch = await comparePassword(
      currentPassword,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedNewPassword = await hashPassword(newPassword);
    const updateResult = await pool.query(
      "UPDATE users SET password = $1 WHERE _id = $2 RETURNING *",
      [hashedNewPassword, userId]
    );

    const updatedUser = updateResult.rows[0];

    return res
      .status(200)
      .json({ user: updatedUser, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  deleteUser,
  updateUser,
  updatePassword,
};
