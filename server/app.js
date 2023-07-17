const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./db");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Middleware Setup
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

// Port Setup
const port = process.env.PORT || 8080;

// Connect to Database
db().then(() => {
  console.log("Connected to the database");
}).catch((error) => {
  console.error("Database connection error:", error);
});

// Import and Mount Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Start the Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
