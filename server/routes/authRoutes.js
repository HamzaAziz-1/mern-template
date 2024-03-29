const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controllers/authControllers");

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
