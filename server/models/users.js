// models/users.js
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "postgres",
    port: 5432,
});

const createUser = async (username, email) => {
  try {
    const result = await pool.query('INSERT INTO users (email) VALUES ($1) RETURNING *', [email]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

module.exports = {
  createUser,
};
