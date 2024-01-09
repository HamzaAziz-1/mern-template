const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const authRoutes = require("./routes/authRoutes");

//middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(bodyParser.json());
//routes
app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}...`);
});
