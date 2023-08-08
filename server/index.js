const express = require("express");
const aiRoute = require("./ai.route");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");

const router = express.Router();

router.use("/ai", aiRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);

module.exports = router;
