const express = require('express')
const morgan = require('morgan')
const { Pool } = require('pg');
const app = express()
const port = 8080
app.use(morgan('dev'))
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
  });
  
  app.use(express.json());
  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to PostgreSQL:', err);
    } else {
      console.log('Connected to PostgreSQL at:', res.rows[0].now);
    }
  });
  
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
