const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();
const { connectToDatabase } = require("./db");
const rateLimiter = require("./middlewares/rateLimiter");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8082;

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Define routes below
app.use("/api", routes);

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });