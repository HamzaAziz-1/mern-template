const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getCurrentUser,
  getSingleUser,
  deleteUser,
  updateUser,
  updatePassword,
} = require("../controllers/userControllers");

const {authenticateUser} = require('../middlewares/authentication')

router.get("/showMe",authenticateUser,getCurrentUser);
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser);
router.get("/", getAllUsers);
router.patch("/update-password",authenticateUser,updatePassword);

module.exports = router;
