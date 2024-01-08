const express = require('express')
const morgan = require('morgan')
const authRoutes = require('./routes/authRoutes')
const bodyParser=require('body-parser')
const app = express()
const port = 8080
app.use(morgan('dev'))
app.use(express.json());
app.use(bodyParser.json());
app.use('/auth',authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
