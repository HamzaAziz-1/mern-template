// controllers/usersController.js
const express = require('express');
const userModel = require('../models/users');
const login = async (req, res) => {
    console.log(req.body);
  const { username, email } = req.body;

  try {
    // Validate input
    if (!username || !email) {
      throw new Error('Bad Request - Missing required fields');
    }

    const createdUser = await userModel.createUser(username, email);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ error: error.message || 'Bad Request' });
  }
}

module.exports = login;
